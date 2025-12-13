import React, { useRef } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation

type Props = {
  onFileSelected: (file: File) => void;
  onClose: () => void;
  loading: boolean;
};

export default function OCRModal({ onFileSelected, onClose, loading }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation(); // Use useTranslation hook

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelected(file);
  };

  const buttonPrimaryClass = "w-full py-3 rounded-lg bg-[#3A8857] text-white font-semibold hover:bg-[#3A8857ee] transition-colors duration-200 shadow-md";
  const buttonSecondaryClass = "w-full py-2 rounded-lg border border-gray-300 text-gray-800 font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-sm";


  return (
    <div className="fixed z-50 inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 space-y-4 relative">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{t("scan_receipt_title")}</h2>

        {loading ? (
          <div className="py-10 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1D4ED8] border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg font-medium">{t("processing_receipt")}</p>
            <p className="text-sm text-gray-500 mt-1">{t("ocr_progress_info")}</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-4">
              {t("scan_receipt_description")}
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleSelect}
              className="hidden"
              aria-label={t("choose_image_input_label")}
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className={buttonPrimaryClass}
              aria-label={t("choose_image_button_label")}
            >
              {t("choose_image_take_photo")}
            </button>

            <button
              onClick={onClose}
              className={buttonSecondaryClass}
              aria-label={t("cancel_button_label")}
            >
              {t("Cancel")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
