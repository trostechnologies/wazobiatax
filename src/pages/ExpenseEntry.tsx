import { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import OCRModal from "../components/OCRModal";
import VoiceModal from "../components/VoiceModal";
import LedgerList from "../components/LedgerList";
import { Toast } from "../components/Toast"; // Import Toast component

import { useOCR } from "../hooks/useOCR";
import { useVoice } from "../hooks/useVoice";
import { useLedger } from "../context/LedgerContext";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ExpenseEntry() {
  const { runOCR, loading: ocrLoading } = useOCR();
  const { start, stop, listening, transcript, parseExpenseFromTranscript } = useVoice();
  const { addEntry } = useLedger();

  const [showOCR, setShowOCR] = useState(false);
  const [showVoice, setShowVoice] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info');

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToastMessage(message);
    setToastType(type);
  };

  const closeToast = () => {
    setToastMessage(null);
  };

  // -------------------------------
  //  OCR HANDLER
  // -------------------------------
  const onFileSelected = async (file: File) => {
    showToast("Processing receipt...", "info");
    const result = await runOCR(file);

    if (result) {
      const amount = result.amount ?? 0;
      const date = result.date ?? new Date().toISOString().slice(0, 10);
      const vendor = result.vendor ?? "Unknown";

      // simple auto-category
      const category = /food|restaurant/i.test(result.text)
        ? "food"
        : "misc";

      await addEntry({
        amount,
        date,
        vendor,
        category,
        method: "ocr",
      });
      showToast("Expense added via OCR!", "success");
    } else {
      showToast("Could not extract data. Please fill manually.", "error");
    }

    setShowOCR(false);
  };

  // -------------------------------
  //  VOICE HANDLING (KEY IMPROVEMENT)
  // -------------------------------
  const handleVoiceStart = () => {
    setShowVoice(true);
    start();
  };

  const handleVoiceStop = () => {
    stop();

    // Wait a bit for transcript to finalize
    setTimeout(() => {
      if (transcript) {
        const parsed = parseExpenseFromTranscript(transcript);

        if (parsed.amount) {
          addEntry({
            amount: parsed.amount,
            vendor: parsed.vendor,
            category: parsed.category,
            date: new Date().toISOString().slice(0, 10),
            method: "voice",
          });
          showToast("Expense added via Voice!", "success");
        } else {
          showToast("Could not parse voice input.", "error");
        }
      } else {
        showToast("No voice input detected.", "error");
      }
    }, 300); // Give a small delay for transcript to update after stop

    setShowVoice(false);
  };

  const router = useNavigate();

  return (
    <div>
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Transaction Ledger</h1>
            <Button size="sm" className="gap-2" onClick={() => {
              router("/expense-entry")
            }}>
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>
        </div>
      </header>

      <div className="mt-6 px-4 container max-w-4xl mx-auto pb-6 rounded-md">
        <Header />
        <div className="">
          {/* Expense Form */}
          <ExpenseForm
            onOpenOCR={() => setShowOCR(true)}
            onStartVoice={handleVoiceStart}
          />

          {/* OCR Modal */}
          {showOCR && (
            <OCRModal
              onFileSelected={onFileSelected}
              onClose={() => setShowOCR(false)}
              loading={ocrLoading}
            />
          )}

          {/* Voice Modal */}
          {showVoice && (
            <VoiceModal
              listening={listening}
              transcript={transcript}
              onStart={start}
              onStop={handleVoiceStop}
              onClose={() => {
                stop();
                setShowVoice(false);
              }}
            />
          )}

          {/* Ledger */}
          <LedgerList />

          {/* Toast */}
          <Toast message={toastMessage} type={toastType} onClose={closeToast} />
        </div>
      </div>
    </div>
  );
}
