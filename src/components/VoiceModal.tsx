
import { useTranslation } from "react-i18next"; // Import useTranslation

type Props = {
  listening: boolean;
  transcript: string;
  onStart: () => void;
  onStop: () => void;
  onClose: () => void;
};

export default function VoiceModal({
  listening,
  transcript,
  onStart,
  onStop,
  onClose,
}: Props) {
  const { t } = useTranslation(); // Use useTranslation hook

  const buttonPrimaryClass = "flex-1 py-3 px-4 rounded-lg bg-[#1D4ED8] text-white font-semibold hover:bg-[#1E40AF] transition-colors duration-200 shadow-md";
  const buttonDangerClass = "flex-1 py-3 px-4 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors duration-200 shadow-md";
  const buttonSecondaryClass = "flex-1 py-2 rounded-lg border border-gray-300 text-gray-800 font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-sm";


  return (
    <div className="fixed z-50 inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 space-y-4 relative">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{t("voice_entry_title")}</h2>

        <p className="text-sm text-gray-600 mb-4">
          {t("voice_entry_description")}{" "}
          <span className="italic font-medium">
            {t("voice_entry_example")}
          </span>
        </p>

        {/* Status bubble */}
        <div className="w-full py-6 flex flex-col items-center">
          {listening ? (
            <>
              <div className="h-16 w-16 rounded-full bg-red-500 animate-pulse flex items-center justify-center mb-3">
                <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 4a3 3 0 016 0v6a3 3 0 01-6 0V4z"></path>
                  <path fillRule="evenodd" d="M3 8a4 4 0 014-4V3a5 5 0 00-5 5h1zm10 0a4 4 0 004-4V3a5 5 0 01-5 5h1zM5 8a5 5 0 018 0v6a5 5 0 01-8 0V8zm4 11a1 1 0 01-1-1v-3a1 1 0 112 0v3a1 1 0 01-1 1z" clipRule="evenodd"></path>
                </svg>
              </div>
              <p className="text-red-600 font-medium text-lg">{t("listening_status")}</p>
            </>
          ) : (
            <>
              <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center mb-3">
                <svg className="h-8 w-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 4a3 3 0 016 0v6a3 3 0 01-6 0V4z"></path>
                  <path fillRule="evenodd" d="M3 8a4 4 0 014-4V3a5 5 0 00-5 5h1zm10 0a4 4 0 004-4V3a5 5 0 01-5 5h1zM5 8a5 5 0 018 0v6a5 5 0 01-8 0V8zm4 11a1 1 0 01-1-1v-3a1 1 0 112 0v3a1 1 0 01-1 1z" clipRule="evenodd"></path>
                </svg>
              </div>
              <p className="text-gray-600 text-lg font-medium">{t("not_recording_status")}</p>
            </>
          )}
        </div>

        {/* Display transcript */}
        {transcript && (
          <div className="p-4 mb-4 rounded-lg bg-gray-100 text-gray-800 text-base max-h-24 overflow-y-auto border border-gray-200">
            <strong>{t("transcript_label")}:</strong> {transcript}
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-5">
          {!listening ? (
            <button
              onClick={onStart}
              className={buttonPrimaryClass}
              aria-label={t("start_recording_button_label")}
            >
              {t("Start")}
            </button>
          ) : (
            <button
              onClick={onStop}
              className={buttonDangerClass}
              aria-label={t("stop_recording_button_label")}
            >
              {t("Stop")}
            </button>
          )}

          <button
            onClick={onClose}
            className={buttonSecondaryClass}
            aria-label={t("close_button_label")}
          >
            {t("Close")}
          </button>
        </div>
      </div>
    </div>
  );
}
