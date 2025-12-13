import { useCallback, useState, useEffect, useRef } from "react";
// Import types only, actual import will be dynamic
import type { Worker, LoggerMessage } from "tesseract.js";

export function useOCR() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'initializing' | 'loading_language' | 'recognizing' | 'complete' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const workerRef = useRef<Worker | null>(null);

  // Function to initialize the worker dynamically
  const initializeWorker = useCallback(async () => {
    setStatus('initializing');
    setError(null);
    try {
      // Dynamic import of tesseract.js
      const { createWorker } = await import("tesseract.js");
      const worker: Worker = await createWorker();
      (worker as any).logger = (m: LoggerMessage) => {
        if (m.status === 'recognizing text') {
          setProgress(m.progress);
          setStatus('recognizing');
        } else if (m.status === 'loading tesseract core') {
          setStatus('initializing');
        } else if (m.status === 'loading language traineddata') {
          setStatus('loading_language');
        }
      };
      await worker.load();
      await worker.reinitialize("eng");
      workerRef.current = worker;
      setStatus('idle');
    } catch (err: any) {
      setError(err.message || "Failed to initialize OCR worker.");
      setStatus('error');
    }
  }, []);


  useEffect(() => {
    // Terminate worker on unmount
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  const runOCR = useCallback(async (file: File) => {
    if (!workerRef.current) {
      // Initialize worker if not already done
      await initializeWorker();
      if (!workerRef.current) {
        setError("OCR worker could not be initialized.");
        return null;
      }
    }

    setLoading(true);
    setError(null);
    setProgress(0);
    setStatus('recognizing');

    try {
      const { data } = await workerRef.current.recognize(file);
      const text = data.text;

      const amountRegexes = [
        /₦\s?([\d,]+\.\d{2})/,
        /₦\s?([\d,]+)/,
        /(\d[\d,\.]+)[\s]?(?:NGN|naira)/i,
        /([\d,]+\.\d{2})\s?$/,
        /([\d,]+)\s?$/
      ];
      let amount: number | null = null;
      for (const regex of amountRegexes) {
        const match = text.match(regex);
        if (match) {
          amount = Number(match[1].replace(/,/g, ""));
          break;
        }
      }

      const dateRegexes = [
        /\b(\d{2}[\/\-]\d{2}[\/\-]\d{4})\b/,
        /\b(\d{4}[\/\-]\d{2}[\/\-]\d{2})\b/,
        /\b(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4})\b/i,
        /\b((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},\s+\d{4})\b/i
      ];
      let date: string | null = null;
      for (const regex of dateRegexes) {
        const match = text.match(regex);
        if (match) {
          date = match[1];
          break;
        }
      }

      const vendorLine = text.split("\n").find(l => l.trim().length > 3 && !/invoice|receipt|tax/i.test(l)) || "";
      const vendor = vendorLine.trim();

      setStatus('complete');
      return { text, amount, date, vendor };
    } catch (err: any) {
      setError(err.message || "OCR failed");
      setStatus('error');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { runOCR, loading, error, status, progress };
}
