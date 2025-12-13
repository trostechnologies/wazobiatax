import { useLedger } from "../context/LedgerContext";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function LedgerList() {
  const { entries, clearAll } = useLedger();
  const { t } = useTranslation();
  return (
    <div className="mt-6 p-4 bg-white rounded-xl shadow-sm border w-full mx-auto">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Ledger</h2>
        <button
          onClick={clearAll}
          aria-label={t("clear_all_entries")}
          className="px-3 py-1 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
        >
          {t("clear_all")}
        </button>
      </div>
      <div className="space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2" role="region" aria-label={t("expense_ledger_list")}>
        <AnimatePresence>
          {entries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 py-8"
            >
              No expenses added yet.
            </motion.div>
          ) : (
            entries.map(e => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="p-4 bg-gray-50 rounded-lg shadow-sm flex justify-between items-center border border-gray-100"
                role="listitem"
                aria-label={`${e.amount.toLocaleString()} ${t("naira")} for ${e.vendor || "Unknown"} on ${new Date(e.date).toLocaleDateString()} in ${e.category} via ${e.method}`}
              >
                <div>
                  <div className="font-bold text-lg text-[#3A8857]">₦{e.amount.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">{e.vendor || "—"}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-700">{new Date(e.date).toLocaleDateString()}</div>
                  <div className="text-xs text-gray-500 capitalize">{e.category} • {e.method}</div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
