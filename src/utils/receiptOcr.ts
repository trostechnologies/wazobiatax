import { createWorker } from 'tesseract.js';

/**
 * Client-side receipt scanning: preprocesses the captured image, runs OCR with
 * Tesseract.js, and extracts amount/date/vendor with simple parsing rules.
 * There is no backend OCR/AI service for this — everything runs in the browser,
 * no API keys required. Results are always meant to be reviewed/edited by the
 * user before saving, never auto-saved.
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
 * Draws the image onto a canvas, downscales very large images, converts to
 * grayscale and boosts contrast — this materially improves Tesseract accuracy
 * on photographed receipts compared to feeding it the raw photo.
 */
async function preprocessImage(file: File): Promise<HTMLCanvasElement> {
  const imageBitmap = await createImageBitmap(file);

  const MAX_DIMENSION = 1600;
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
  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    // Simple contrast boost around mid-gray.
    const contrasted = Math.min(255, Math.max(0, (gray - 128) * 1.4 + 128));
    data[i] = data[i + 1] = data[i + 2] = contrasted;
  }
  ctx.putImageData(imageData, 0, 0);

  return canvas;
}

function parseAmount(text: string): string | null {
  // Prefer a line that mentions "total" and has a number on it.
  const lines = text.split('\n');
  const numberPattern = /(\d{1,3}(?:[,.]\d{3})*(?:\.\d{2})?|\d+(?:\.\d{2})?)/;

  const totalLine = lines.find((line) => /total/i.test(line) && numberPattern.test(line));
  const source = totalLine ?? text;

  const matches = [...source.matchAll(new RegExp(numberPattern, 'g'))]
    .map((m) => m[1])
    .map((raw) => Number(raw.replace(/,/g, '')))
    .filter((n) => !Number.isNaN(n) && n > 0);

  if (matches.length === 0) return null;

  const amount = totalLine ? matches[0] : Math.max(...matches);
  return String(amount);
}

function parseDate(text: string): string | null {
  const patterns: { regex: RegExp; toIso: (m: RegExpMatchArray) => string | null }[] = [
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
  ];

  for (const { regex, toIso } of patterns) {
    const match = text.match(regex);
    if (match) {
      const iso = toIso(match);
      if (iso && !Number.isNaN(new Date(iso).getTime())) return iso;
    }
  }
  return null;
}

function parseVendor(text: string): string | null {
  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  // Heuristic: the vendor name is usually one of the first few lines, is mostly
  // letters, and isn't just a number/date/total line.
  const candidate = lines
    .slice(0, 5)
    .find((line) => /[a-zA-Z]{3,}/.test(line) && !/total|date|receipt|invoice|tel|vat/i.test(line));

  return candidate || null;
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
