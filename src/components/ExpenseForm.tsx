import { useState } from "react";
import { useLedger } from "../context/LedgerContext";
import { useTranslation } from "react-i18next";
import { FaKeyboard, FaCamera, FaMicrophone } from "react-icons/fa";

export default function ExpenseForm({
  onOpenOCR,
  onStartVoice,
}: {
  onOpenOCR: () => void;
  onStartVoice: () => void;
}) {
  const { addEntry } = useLedger();
  const { t } = useTranslation();

  const [amount, setAmount] = useState<number | "">("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [vendor, setVendor] = useState("");
  const [category, setCategory] = useState("food");

  const submitManual = async () => {
    if (!amount || Number(amount) <= 0) {
      alert("Enter valid amount");
      return;
    }

    await addEntry({
      amount: Number(amount),
      date,
      vendor,
      category,
      method: "manual",
    });

    setAmount("");
    setVendor("");
  };

  const labelClass = "block text-sm font-semibold text-gray-700 mb-1";
  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all";

  const primaryButton =
    "flex-1 py-3 rounded-xl cursor-pointer bg-[#3A8857] text-white font-semibold hover:bg-[#3A8857ee] transition-all shadow-md text-center";

  const secondaryButton =
    "flex-1 py-3 rounded-xl cursor-pointer border border-gray-300 bg-white text-gray-800 font-semibold hover:bg-gray-100 transition-all shadow-sm text-center";

  return (
    <div className="p-6 border space-y-6 bg-white rounded-2xl shadow-sm w-full mx-auto my-6">
      {/* Form fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Amount */}
        <div>
          <label htmlFor="amount-input" className={labelClass}>
            {t("amount")}
          </label>
          <input
            id="amount-input"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value === "" ? "" : Number(e.target.value))
            }
            type="number"
            className={inputClass}
            placeholder="e.g., 5000"
            aria-label={t("amount_label")}
          />
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date-input" className={labelClass}>
            {t("date")}
          </label>
          <input
            id="date-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
            aria-label={t("date_label")}
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category-select" className={labelClass}>
            {t("category")}
          </label>
          <select
            id="category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
            aria-label={t("category_label")}
          >
           <option value="food">Food</option>
<option value="transport">Transport</option>
<option value="airtime">Airtime & Data</option>
<option value="rent">Rent</option>
<option value="utilities">Utilities (Electricity, Water)</option>
<option value="internet">Internet Services</option>
<option value="fuel">Fuel</option>
<option value="maintenance">Maintenance & Repairs</option>
<option value="office">Office Supplies</option>
<option value="misc">Miscellaneous</option>
          </select>
        </div>

        {/* Vendor */}
        <div>
          <label htmlFor="vendor-input" className={labelClass}>
            {t("vendor")}
          </label>
          <input
            id="vendor-input"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            className={inputClass}
            aria-label={t("vendor_label")}
            placeholder="e.g., Local Market"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-col md:flex-row gap-4 pt-2">
        <button
          onClick={submitManual}
          className={primaryButton}
          aria-label={t("manual_add_label")}
        >
          <FaKeyboard className="inline mr-2 -mt-1" />
          {t("manual_add")}
        </button>

        <button
          onClick={onOpenOCR}
          className={secondaryButton}
          aria-label={t("scan_receipt_label")}
        >
          <FaCamera className="inline mr-2 -mt-1" />
          {t("scan_receipt")}
        </button>

        <button
          onClick={onStartVoice}
          className={secondaryButton}
          aria-label={t("voice_add_label")}
        >
          <FaMicrophone className="inline mr-2 -mt-1" />
          {t("voice_add")}
        </button>
      </div>
    </div>
  );
}
