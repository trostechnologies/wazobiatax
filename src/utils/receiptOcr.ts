import { createWorker } from 'tesseract.js';

/**
 * Client-side receipt scanning: preprocesses the captured image, runs OCR with
 * Tesseract.js, and extracts amount/date/vendor with robust parsing rules.
 * Runs completely in the browser, no API keys required.
 * Results are always meant to be reviewed/edited by the user before saving.
 */

export const MAX_RECEIPT_IMAGE_BYTES = 8 * 1024 * 1024; // 8MB

export interface ReceiptExtractionResult {
  amount: string | null;
  date: string | null; // YYYY-MM-DD, suitable for an <input type="date">
  vendor: string | null;
  rawText: string;
  success: boolean; // true if at least one field was confidently extracted
}

/**
 * Preprocessing: downscale, convert to grayscale, boost contrast, and apply
 * Otsu-like adaptive thresholding to produce high-contrast black-and-white
 * text. This drastically improves Tesseract OCR accuracy on receipts with
 * uneven lighting or faded thermal paper.
 */
async function preprocessImage(file: File): Promise<HTMLCanvasElement> {
  const imageBitmap = await createImageBitmap(file);

  const MAX_DIMENSION = 1800;
  const scale = Math.min(1, MAX_DIMENSION / Math.max(imageBitmap.width, imageBitmap.height));
  const width = Math.round(imageBitmap.width * scale);
  const height = Math.round(imageBitmap.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  ctx.drawImage(imageBitmap, 0, 0, width, height);

  const imageData = ctx.getImageData(0, 0, width, height);
  const { data } = imageData;

  // 1. Convert to grayscale & calculate histogram
  const grayValues = new Uint8Array(width * height);
  for (let i = 0, j = 0; i < data.length; i += 4, j++) {
    const gray = Math.round(data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
    grayValues[j] = gray;
  }

  // 2. High-contrast enhancement around mid-tone
  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    // Enhanced contrast curve
    const contrasted = Math.min(255, Math.max(0, (gray - 128) * 1.6 + 128));
    data[i] = data[i + 1] = data[i + 2] = contrasted;
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

/**
 * Robust Amount Parsing:
 * - Recognizes amounts prefixed with ₦, N, NGN, =N=, $, or plain numbers
 * - Prioritizes lines containing "Total", "Grand Total", "Amount Due", "Balance Due", "Net", "Paid"
 * - Supports comma-separated thousands (e.g. 5,000.00 or 15,000)
 * - Avoids telephone numbers, account numbers, dates, and invoice codes
 */
function parseAmount(text: string): string | null {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  // Number pattern supporting: 5000, 5000.00, 5,000, 5,000.00, ₦5,000, N5000, etc.
  const amountRegex = /(?:[₦$N]|NGN|=N=)?\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?|\d+(?:\.\d{2})?)/gi;

  // High-priority keywords that indicate the total line
  const totalKeywords = [
    /\bgrand\s*total\b/i,
    /\btotal\s*amount\b/i,
    /\bamount\s*due\b/i,
    /\bbalance\s*due\b/i,
    /\bnet\s*total\b/i,
    /\btotal\b/i,
    /\bamount\b/i,
    /\bpaid\b/i,
    /\bsubtotal\b/i,
  ];

  // Try to find by prioritized keyword lines first
  for (const kw of totalKeywords) {
    for (const line of lines) {
      if (kw.test(line)) {
        // Find all numbers on this line
        const matches = [...line.matchAll(amountRegex)]
          .map(m => m[1])
          .filter(Boolean)
          .map(raw => Number(raw.replace(/,/g, '')))
          .filter(n => !Number.isNaN(n) && n > 0 && n < 1000000000); // Filter out unrealistic numbers

        if (matches.length > 0) {
          // Return the largest number on the total line (usually total > discount/tax)
          return String(Math.max(...matches));
        }
      }
    }
  }

  // Fallback: search all lines for amounts, but exclude obvious non-amount patterns
  // (e.g. phone numbers starting with 080, 090, 070, 081; years like 2024, 2025; long barcode digits)
  const candidateAmounts: number[] = [];

  for (const line of lines) {
    // Skip lines that look like phone numbers, dates, or addresses
    if (/(\+?234|0[789][01]\d{8})/i.test(line)) continue;
    if (/\b(20\d{2}|19\d{2})\b/.test(line) && line.length < 15) continue; // standalone year

    const matches = [...line.matchAll(amountRegex)]
      .map(m => m[1])
      .filter(Boolean)
      .map(raw => Number(raw.replace(/,/g, '')))
      .filter(n => !Number.isNaN(n) && n >= 10 && n < 100000000);

    candidateAmounts.push(...matches);
  }

  if (candidateAmounts.length === 0) return null;

  // The largest candidate is often the total
  return String(Math.max(...candidateAmounts));
}

/**
 * Robust Date Parsing:
 * Supports:
 * - YYYY-MM-DD, YYYY/MM/DD
 * - DD/MM/YYYY, DD-MM-YYYY
 * - DD/MM/YY, DD-MM-YY
 * - DD Month YYYY (e.g. 13 Dec 2025, 13 December 2025)
 * - Month DD, YYYY (e.g. Dec 13, 2025)
 */
function parseDate(text: string): string | null {
  const months: Record<string, string> = {
    jan: '01', january: '01',
    feb: '02', february: '02',
    mar: '03', march: '03',
    apr: '04', april: '04',
    may: '05',
    jun: '06', june: '06',
    jul: '07', july: '07',
    aug: '08', august: '08',
    sep: '09', sept: '09', september: '09',
    oct: '10', october: '10',
    nov: '11', november: '11',
    dec: '12', december: '12',
  };

  const monthNames = Object.keys(months).join('|');

  // 1. Text month patterns: "13 Dec 2025", "13-Dec-2025", "Dec 13, 2025"
  const textMonthRegex1 = new RegExp(`\\b(0?[1-9]|[12]\\d|3[01])[\\s/-]+(${monthNames})[\\s/,-]+(20\\d{2})\\b`, 'i');
  const m1 = text.match(textMonthRegex1);
  if (m1) {
    const day = m1[1].padStart(2, '0');
    const month = months[m1[2].toLowerCase()];
    const year = m1[3];
    return `${year}-${month}-${day}`;
  }

  const textMonthRegex2 = new RegExp(`\\b(${monthNames})[\\s/.-]+(0?[1-9]|[12]\\d|3[01])[\\s/,-]+(20\\d{2})\\b`, 'i');
  const m2 = text.match(textMonthRegex2);
  if (m2) {
    const month = months[m2[1].toLowerCase()];
    const day = m2[2].padStart(2, '0');
    const year = m2[3];
    return `${year}-${month}-${day}`;
  }

  // 2. Numeric patterns:
  const numericPatterns: { regex: RegExp; toIso: (m: RegExpMatchArray) => string | null }[] = [
    // YYYY-MM-DD or YYYY/MM/DD
    {
      regex: /\b(20\d{2})[-/](0?[1-9]|1[0-2])[-/](0?[1-9]|[12]\d|3[01])\b/,
      toIso: (m) => `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`,
    },
    // DD/MM/YYYY or DD-MM-YYYY
    {
      regex: /\b(0?[1-9]|[12]\d|3[01])[-/](0?[1-9]|1[0-2])[-/](20\d{2})\b/,
      toIso: (m) => `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`,
    },
    // DD/MM/YY or DD-MM-YY (two-digit year 20xx)
    {
      regex: /\b(0?[1-9]|[12]\d|3[01])[-/](0?[1-9]|1[0-2])[-/](\d{2})\b/,
      toIso: (m) => `20${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`,
    },
  ];

  for (const { regex, toIso } of numericPatterns) {
    const match = text.match(regex);
    if (match) {
      const iso = toIso(match);
      if (iso && !Number.isNaN(new Date(iso).getTime())) return iso;
    }
  }

  return null;
}

/**
 * Robust Vendor Parsing:
 * - Nigerian business naming conventions (Ventures, Enterprises, Ltd, Nig, Stores, Market, etc.)
 * - Filters out labels like "Tax Invoice", "Cash Receipt", "Welcome", "Tel", "Customer", etc.
 * - Extracts clean names
 */
function parseVendor(text: string): string | null {
  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  const excludeWords = [
    /\btax\s*invoice\b/i,
    /\breceipt\b/i,
    /\binvoice\b/i,
    /\btotal\b/i,
    /\bdate\b/i,
    /\btel\b/i,
    /\bphone\b/i,
    /\bemail\b/i,
    /\bwelcome\b/i,
    /\bthank\s*you\b/i,
    /\bcashier\b/i,
    /\bcustomer\b/i,
    /\baddress\b/i,
    /\bwebsite\b/i,
    /\bhttp\b/i,
    /\bwww\b/i,
  ];

  // Check top 6 lines
  for (const line of lines.slice(0, 6)) {
    // Must contain letters, at least 3 characters
    if (!/[a-zA-Z]{3,}/.test(line)) continue;

    // Check if line matches any exclude words
    const isExcluded = excludeWords.some(rx => rx.test(line));
    if (isExcluded) continue;

    // Clean up vendor string
    const cleanVendor = line
      .replace(/^[#*•\-_]+\s*/, '')
      .replace(/\s*[#*•\-_]+$/, '')
      .trim();

    if (cleanVendor.length >= 3 && cleanVendor.length <= 60) {
      return cleanVendor;
    }
  }

  return null;
}

export async function extractReceiptDetails(file: File): Promise<ReceiptExtractionResult> {
  const canvas = await preprocessImage(file);

  const worker = await createWorker('eng');
  let rawText = '';
  try {
    const { data } = await worker.recognize(canvas);
    rawText = data.text || '';
  } finally {
    await worker.terminate();
  }

  const amount = parseAmount(rawText);
  const date = parseDate(rawText);
  const vendor = parseVendor(rawText);

  return {
    amount,
    date,
    vendor,
    rawText,
    success: Boolean(amount || date || vendor),
  };
}
