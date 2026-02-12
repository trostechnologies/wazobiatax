import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Search,
  Filter,
  Plus,
  Pencil,
  Trash2,
  Camera,
  Mic,
  Download,
  TrendingUp,
  TrendingDown,
  Zap,
  RefreshCw,
  Check,
  Save,
  Square,
  CameraIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { addLedgerEntry, deleteLedgerEntry, getLedgerRecords, updateLedgerEntry } from "@/services/ledger";
import { ToastContainer, toast } from 'react-toastify';
import { profileTranslations, type LanguageKey } from "../translations/profile";
import { useCameraPermissions } from "@/hooks/useCameraPermissions";

const translations = {
  english: {
    income: "Income",
    expense: "Expense",

    synced: "Synced",
    pending: "Pending",
    exempt: "Tax Exempt",

    salesRevenue: "Sales Revenue",
    otherIncome: "Other Income",
    foodSupplies: "Food Supplies",
    equipment: "Equipment",
    serviceIncome: "Service Income",
    transportation: "Transportation",

    isExempt: "Exempt",
    pendingSync: "Pending sync",
    downloadCsvReport: "Download CSV Report",

    digitalLedger: "Digital Ledger",
    searchTransactions: "Search transactions...",
    pendingSyncInfo: "3 entries pending sync - Will sync when online",

    filterAll: "All",
    filterIncome: "Income",
    filterExpense: "Expense",

    addEntry: "Add Entry",
    manualEntry: "Manual Entry",
    manualEntryDesc: "Enter details manually",
    scanReceipt: "Scan Receipt",
    scanReceiptDesc: "Use camera to scan",
    voiceEntry: "Voice Entry",

    speakToAdd: "Speak to add entry",
    type: "Type",
    amount: "Amount",
    category: "Category",
    selectCategory: "Select category",
    date: "Date",
    notesOptional: "Notes (Optional)",
    addNotes: "Add notes...",
    saveEntry: "Save Entry",
  },

  pidgin: {
    income: "Income",
    expense: "Expense",

    synced: "Don Sync",
    pending: "Still Dey Wait",
    exempt: "No Tax",

    salesRevenue: "Sales Money",
    foodSupplies: "Food Stuff",
    equipment: "Equipment",
    serviceIncome: "Service Money",
    transportation: "Transport",

    isExempt: "No Tax",
    pendingSync: "Never Sync",
    downloadCsvReport: "Download CSV Report",

    digitalLedger: "Digital Ledger",
    searchTransactions: "Search transactions...",
    pendingSyncInfo: "3 entries never sync - E go sync when network dey",

    filterAll: "All",
    filterIncome: "Income",
    filterExpense: "Expense",

    addEntry: "Add Entry",
    manualEntry: "Manual Entry",
    manualEntryDesc: "Enter details by yourself",
    scanReceipt: "Scan Receipt",
    scanReceiptDesc: "Use camera scan am",
    voiceEntry: "Voice Entry",

    speakToAdd: "Talk to add entry",
    type: "Type",
    amount: "Amount",
    category: "Category",
    selectCategory: "Choose category",
    date: "Date",
    notesOptional: "Notes (Optional)",
    addNotes: "Add notes...",
    saveEntry: "Save Entry",
  },

  hausa: {
    income: "Kuɗin Shiga",
    expense: "Kuɗin Fita",

    synced: "An Daidaita",
    pending: "Ana Jira",
    exempt: "Ba a Caji Haraji",

    salesRevenue: "Kuɗin Talla",
    foodSupplies: "Kayan Abinci",
    equipment: "Kayan Aiki",
    serviceIncome: "Kuɗin Sabis",
    transportation: "Sufuri",

    isExempt: "No Tax",
    pendingSync: "Never Sync",
    downloadCsvReport: "Sauke Rahoton CSV",

    digitalLedger: "Littafin Dijital",
    searchTransactions: "Nemo ma'amaloli...",
    pendingSyncInfo:
      "Akwai bayanai 3 da ba su daidaita ba – Za su daidaita idan an samu intanet",

    filterAll: "Duka",
    filterIncome: "Kuɗin Shiga",
    filterExpense: "Kuɗin Fita",

    addEntry: "Ƙara Shigarwa",
    manualEntry: "Shigarwa da Hannu",
    manualEntryDesc: "Shigar da bayanai da hannu",
    scanReceipt: "Duba Rasiti",
    scanReceiptDesc: "Yi amfani da kyamara don dubawa",
    voiceEntry: "Shigar da Murya",

    speakToAdd: "Yi magana don ƙara shigarwa",
    type: "Nau'i",
    amount: "Adadi",
    category: "Rukuni",
    selectCategory: "Zaɓi rukuni",
    date: "Kwanan Wata",
    notesOptional: "Bayani (Na zaɓi)",
    addNotes: "Ƙara bayani...",
    saveEntry: "Ajiye Shigarwa",
  },

  yoruba: {
    income: "Ìní",
    expense: "Ìnáwọ́",

    synced: "Ti Darapọ̀",
    pending: "Ń Dúró",
    exempt: "Kò Ní Owó-ori",

    salesRevenue: "Owó Títà",
    foodSupplies: "Ohun Èlò Oúnjẹ",
    equipment: "Ẹ̀rọ Iṣẹ́",
    serviceIncome: "Owó Iṣẹ́",
    transportation: "Gbigbe",

    isExempt: "Kò Ní Owó-ori",
    pendingSync: "Ń Dúró Fún ìṣọ̀kan",
    downloadCsvReport: "Gba Iroyin CSV",

    digitalLedger: "Ledger Ayelujara",
    searchTransactions: "Wa awọn ìṣúná...",
    pendingSyncInfo:
      "Àwọn ìforúkọsílẹ̀ 3 ń dúró fún ìṣọ̀kan – Yóò darapọ̀ nígbà tí intanẹẹti bá wà",

    filterAll: "Gbogbo",
    filterIncome: "Ìní",
    filterExpense: "Ìnáwọ́",

    addEntry: "Fikun-un Ìforúkọsílẹ̀",
    manualEntry: "Ìforúkọsílẹ̀ Ọwọ́",
    manualEntryDesc: "Tẹ̀síwájú kí o tẹ̀ alaye lọ́wọ́",
    scanReceipt: "Ṣàyẹ̀wò Rẹ́sítì",
    scanReceiptDesc: "Lo kaamera láti ṣàyẹ̀wò",
    voiceEntry: "Ìforúkọsílẹ̀ Ohùn",

    speakToAdd: "Sọ láti fikun ìforúkọsílẹ̀",
    type: "Iru",
    amount: "Iye",
    category: "Ẹ̀ka",
    selectCategory: "Yan ẹ̀ka",
    date: "Ọjọ́",
    notesOptional: "Àkọsílẹ̀ (Kíkọ̀ọ́)",
    addNotes: "Ṣàfikún àkọsílẹ̀...",
    saveEntry: "Fipamọ́ Ìforúkọsílẹ̀",
  },

  igbo: {
    income: "Ego Mbata",
    expense: "Mmefu Ego",

    synced: "Ejikọtala",
    pending: "Na-echere",
    exempt: "Enweghị Ụtụ",

    salesRevenue: "Ego Ahịa",
    foodSupplies: "Ngwa Oriri",
    equipment: "Ngwa Ọrụ",
    serviceIncome: "Ego Ọrụ",
    transportation: "Njem",

    isExempt: "Enweghị Ụtụ",
    pendingSync: "Na-echere Njikọ",
    downloadCsvReport: "Budata Akụkọ CSV",

    digitalLedger: "Ledger Dijitalụ",
    searchTransactions: "Chọọ azụmahịa...",
    pendingSyncInfo:
      "Enwere ndekọ 3 na-echere njikọ – Ha ga-ejikọ mgbe ịntanetị dị",

    filterAll: "Niile",
    filterIncome: "Ego Mbata",
    filterExpense: "Mmefu Ego",

    addEntry: "Tinye Ndekọ",
    manualEntry: "Ntinye Aka",
    manualEntryDesc: "Tinye nkọwa n'aka gi",
    scanReceipt: "Lelee Rẹsịtụ",
    scanReceiptDesc: "Jiri kamera lelee",
    voiceEntry: "Ntinye Olu",

    speakToAdd: "Kwuo ka itinye ndekọ",
    type: "Ụdị",
    amount: "Ego",
    category: "Ngalaba",
    selectCategory: "Họrọ ngalaba",
    date: "Ụbọchị",
    notesOptional: "Nkọwa (M'Ichọọ)",
    addNotes: "Tinye nkọwa...",
    saveEntry: "Chekwaa Ndekọ",
  },
};

type ExtractedLedgerData = {
  entryType: "expense" | "income";
  amount: string;
  category: string;
  date: string;
  description: string;
};

interface LedgerProps {
  onNavigate: (screen: string) => void;
  language?: LanguageKey;
}

export function Ledger({ onNavigate, language = "english" }: LedgerProps) {
  const scanT = profileTranslations[language].scanReceipt;
  const voiceT = profileTranslations[language].voiceEntry;

  const [showAddModal, setShowAddModal] = useState(false);
  const [addMode, setAddMode] = useState(""); // manual, scan, voice
  const [scanState, setScanState] = useState("camera");
  const [capturedImage, setCapturedImage] = useState<File | null>(null);
  const [capturedPreview, setCapturedPreview] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [entryType, setEntryType] = useState<"income" | "expense">("income");

  const [selectedLedger, setSelectedLedger] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);  

  const [updating, setUpdating] = useState(false);


  // Scan Receipt States
  const [scanStep, setScanStep] = useState<
    "permission" | "camera" | "preview" | "extracted"
  >("camera");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState({
    vendor: "Fresh Foods Market",
    date: "2026-02-02",
    amount: "5,000",
    category: "Food Supplies",
  });

  // Voice Entry States
  const [recordingStep, setRecordingStep] = useState<
    "ready" | "listening" | "processing" | "review"
  >("ready");
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [detectedData, setDetectedData] = useState({
    amount: "5,000",
    type: "Expense",
    category: "Food Supplies",
    description: "Food supplies purchase",
  });

  // const { language } = useLanguage();
  // const t = translations[language];
  const t = profileTranslations[language].scanReceipt;
  const navigate = useNavigate();
  const { permissionState, requestPermission } = useCameraPermissions();

  const handleAddClick = (mode: string) => {
    if (!selectedLedger) {
      // only reset form if NOT editing
      setAmount("");
      setCategory("");
      setDescription("");
      setDate("");
      setEntryType("income");
    }

    setAddMode(mode);
    setShowAddModal(false);
    if (mode === 'scan' && permissionState !== 'granted') {
      requestPermission();
    }
  };


  // Scan Receipt Handlers
  // const handleCapture = () => {
  //   setIsProcessing(true);
  //   setTimeout(() => {
  //     setIsProcessing(false);
  //     setScanStep('preview');
  //   }, 1500);
  // };

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsProcessing(true);
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setCapturedImage(file);        // for OCR upload
    setCapturedPreview(previewUrl); // for UI
    setIsProcessing(false);
    setScanState("preview");
  };

  const handleExtract = async () => {
    if (!capturedImage) return;

    setScanState("processing");
    setIsExtracting(true);

    // Simulate AI processing delay
    setTimeout(() => {
      // Pretend this came from AI
      const extractedData: ExtractedLedgerData = {
        entryType: "expense",
        amount: "8500",
        category: "food",
        date: "2026-02-04",
        description: "Chicken Republic",
      };

      // Populate shared ledger states
      setEntryType(extractedData.entryType);
      setAmount(extractedData.amount);
      setCategory(extractedData.category);
      setDate(extractedData.date);
      setDescription(extractedData.description);

      setIsExtracting(false);
      setScanState("confirm");
    }, 1500);
  };

  const handleConfirmAndExtract = () => {
    setIsExtracting(true);
    setTimeout(() => {
      setIsExtracting(false);
      setScanStep("extracted");
    }, 2000);
  };

  const handleSaveScan = () => {
    toast.success(scanT.saved);
    setTimeout(() => {
      setAddMode("");
      setScanStep("camera");
    }, 1000);
  };

  const handleRetake = () => {
    setScanStep("camera");
  };

  // Voice Entry Handlers
  const handleStartListening = () => {
    setIsListening(true);
    setRecordingStep("listening");

    setTimeout(() => {
      setTranscription("I spent 5000 naira on food supplies today");
      setIsListening(false);
      setRecordingStep("processing");

      setTimeout(() => {
        setRecordingStep("review");
      }, 1500);
    }, 3000);
  };

  const handleStopListening = () => {
    setIsListening(false);
    if (transcription) {
      setRecordingStep("processing");
      setTimeout(() => {
        setRecordingStep("review");
      }, 1500);
    } else {
      setRecordingStep("ready");
      toast.error(voiceT.noSpeech);
    }
  };

  const handleTryAgain = () => {
    setTranscription("");
    setRecordingStep("ready");
  };

  const handleSaveVoice = () => {
    toast.success(voiceT.saved);
    setTimeout(() => {
      setAddMode("");
      setRecordingStep("ready");
      setTranscription("");
    }, 1000);
  };

  const CATEGORY_MAP = {
    income: [
      { labelKey: "salesRevenue", value: "sales revenue" },
      { labelKey: "serviceIncome", value: "service income" },
    ],
    expense: [
      // { labelKey: 'foodSupplies', value: 'food supplies expense' },
      // { labelKey: 'equipment', value: 'office equipment' },
      { labelKey: "otherIncome", value: "other income" },
      // { labelKey: 'transportation', value: 'transportation expense' },
    ],
  };

  // const entries = [
  //   { id: 1, date: 'Dec 13, 2025', amount: 25000, categoryKey: 'salesRevenue', type: 'income', status: 'synced' },
  //   { id: 2, date: 'Dec 12, 2025', amount: 5000, categoryKey: 'foodSupplies', type: 'expense', status: 'synced' },
  //   { id: 3, date: 'Dec 11, 2025', amount: 15000, categoryKey: 'equipment', type: 'expense', status: 'pending' },
  //   { id: 4, date: 'Dec 10, 2025', amount: 30000, categoryKey: 'serviceIncome', type: 'income', status: 'synced' },
  //   { id: 5, date: 'Dec 9, 2025', amount: 8000, categoryKey: 'transportation', type: 'expense', status: 'synced' },
  //   { id: 6, date: 'Dec 8, 2025', amount: 20000, categoryKey: 'salesRevenue', type: 'income', status: 'synced', exempt: true },
  // ];

  const [entries, setEntries] = useState<any[]>([]);
  const [isLoadingLedger, setIsLoadingLedger] = useState(false);
  const [ledgerError, setLedgerError] = useState("");

  const incomeCategories = [
    translations[language].salesRevenue,
    translations[language].serviceIncome,
  ];

  const expenseCategories = [
    translations[language].foodSupplies,
    translations[language].equipment,
    translations[language].transportation,
  ];

  useEffect(() => {
    if (scanState === "camera" && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => { videoRef.current!.srcObject = stream; })
        .catch((err) => console.error("Camera error:", err));
    }
  }, [scanState]);

  const fetchLedgerRecords = async () => {
    try {
      setIsLoadingLedger(true);
      setLedgerError("");

      const res = await getLedgerRecords();
      console.log("ledger entries", res);

      setEntries(res.data || []);
    } catch (err: any) {
      setLedgerError(err.message || "Failed to load ledger records");
    } finally {
      setIsLoadingLedger(false);
    }
  };

  const handleUpdateLedger = async () => {
    if (!selectedLedger) return;

    try {
      setIsProcessing(true);

      await updateLedgerEntry(selectedLedger.id || selectedLedger.entry_id, {
        amount: Number(amount),
        ledger_type: entryType,
        date,
        category,
        description,
      });

      toast.success("Ledger updated successfully");

      await fetchLedgerRecords();

      setAddMode("");
      setAmount("");
      setCategory("");
      setDescription("");
      setDate("");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
  
    try {
      await deleteLedgerEntry(deleteId);
  
      setEntries((prev: any[]) =>
        prev.filter((entry) => entry.id !== deleteId)
      );
  
      setShowDeleteConfirm(false);
      setDeleteId(null);
  
      toast.success("Ledger deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete ledger");
    }
  };
  
  

  useEffect(() => {
    if (selectedLedger && addMode === "manual") {
      setEntryType(selectedLedger.ledger_type);
      setAmount(String(selectedLedger.amount));
      setCategory(selectedLedger.category);
      setDate(selectedLedger.date);
      setDescription(selectedLedger.description || "");
    }
  }, [selectedLedger, addMode]);

  const handleAddLedger = async () => {
    if (!amount || !category || !date) return;

    try {
      setIsProcessing(true);

      const response = await addLedgerEntry({
        amount: Number(amount),
        ledger_type: entryType, // 'income' | 'expense'
        date,
        category,
        description,
      });

      console.log("LEDGER CREATED:", response);
      alert("LEDGER CREATED.");

      // ✅ Optional: add immediately to UI list
      // setEntries((prev) => [response.data, ...prev]);

      // ✅ Re-fetch ledger list from API
      await fetchLedgerRecords();

      // ✅ Reset form
      setAmount("");
      setCategory("");
      setDescription("");
      setDate("");
    } catch (error: any) {
      console.error(error);

      const message =
        error?.response?.data?.message || "Failed to add ledger entry";

      alert(message);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    fetchLedgerRecords();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Status Bar */}
      <div className="h-11 bg-emerald-600 flex items-center justify-between px-6 text-white text-sm">
        <span>21:41</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-3 border border-white rounded-sm" />
          <div className="w-4 h-3 border border-white rounded-sm" />
          <span className="text-xs">70</span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-lg">{translations[language].digitalLedger}</h1>
        </div>


        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"  // opens back camera on phones
          style={{ display: 'none' }} // hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const previewUrl = URL.createObjectURL(file);
            setCapturedImage(file);       // for OCR upload
            setCapturedPreview(previewUrl); // for UI display
            setScanState('preview');      // move to preview state
          }}
        />

        {/* Search & Filter */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={translations[language].searchTransactions}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm"
            />
          </div>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {["all", "income", "expense"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${filterType === type
                ? "bg-emerald-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {
                translations[language][
                type === "all"
                  ? "filterAll"
                  : type === "income"
                    ? "filterIncome"
                    : "filterExpense"
                ]
              }
            </button>
          ))}
        </div>
      </div>

      {/* Offline Sync Banner */}
      <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex items-center gap-2 text-sm text-amber-900">
        <Zap className="w-4 h-4" />
        <span>{translations[language].pendingSyncInfo}</span>
      </div>

      {isLoadingLedger && (
        <p className="text-center text-sm text-gray-500">Loading records...</p>
      )}

      {!isLoadingLedger && entries.length === 0 && (
        <p className="text-center text-sm text-gray-500">
          No ledger records yet
        </p>
      )}

      {/* Ledger Entries */}
      <div className="p-6 space-y-3">
        {entries.map((entry, index) => {
          const isIncome = entry.ledger_type === "income";

          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100"
            >
              <div className="flex items-start justify-between gap-3">
                {/* LEFT SIDE */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${isIncome ? "bg-emerald-50" : "bg-red-50"
                      }`}
                  >
                    {isIncome ? (
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    )}
                  </div>

                  <div>
                    <p className="text-sm mb-0.5 capitalize">{entry.category}</p>

                    <p className="text-xs text-gray-500">
                      {new Date(entry.date).toLocaleDateString()}
                    </p>

                    {entry.description && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        {entry.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-3">
                  {/* Amount */}
                  <p
                    className={`text-sm font-medium ${isIncome ? "text-emerald-600" : "text-gray-900"
                      }`}
                  >
                    {isIncome ? "+" : "-"}₦
                    {Number(entry.amount).toLocaleString()}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2 opacity-80 hover:opacity-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLedger(entry);
                        setAddMode("manual"); // reuse manual modal
                      }}
                      className="p-1.5 rounded-lg hover:bg-gray-100"
                    >
                      <Pencil className="w-4 h-4 text-gray-600" />
                    </button>

                    <button
  onClick={(e) => {
    e.stopPropagation();
    console.log("Clicked delete icon");
    setDeleteId(entry.id);
    setShowDeleteConfirm(true);
  }}
  className="p-1.5 rounded-lg hover:bg-red-50"
>
  <Trash2 className="w-4 h-4 text-red-500" />
</button>

                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Export Button */}
      <div className="px-6 pb-6">
        <button className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
          <Download className="w-5 h-5" />
          {translations[language].downloadCsvReport}
        </button>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-6 z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowAddModal(true)}
          className="w-14 h-14 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-emerald-700 transition-all"
        >
          <Plus className="w-7 h-7" />
        </motion.button>
      </div>

      {/* Add Entry Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ y: 400 }}
              animate={{ y: 0 }}
              exit={{ y: 400 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl w-full max-w-[390px] mx-auto p-6"
            >
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />

              <h3 className="text-lg mb-4">
                {translations[language].addEntry}
              </h3>

              <div className="space-y-3">
                <button
                  onClick={() => handleAddClick("manual")}
                  className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center gap-4 transition-all text-left"
                >
                  <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <Plus className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm">
                      {translations[language].manualEntry}
                    </p>
                    <p className="text-xs text-gray-600">
                      {translations[language].manualEntryDesc}
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => handleAddClick("scan")}
                  className="w-full p-4 bg-purple-50 hover:bg-purple-100 rounded-xl flex items-center gap-4 transition-all text-left"
                >
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                    <Camera className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm">
                      {translations[language].scanReceipt}
                    </p>
                    <p className="text-xs text-gray-600">
                      {translations[language].scanReceiptDesc}
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => handleAddClick("voice")}
                  className="w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl flex items-center gap-4 transition-all text-left"
                >
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                    <Mic className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm">
                      {translations[language].voiceEntry}
                    </p>
                    <p className="text-xs text-gray-600">
                      {translations[language].speakToAdd}
                    </p>
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manual Entry Modal */}
      <AnimatePresence>
        {addMode === "manual" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end"
            onClick={() => {
              setAddMode("");
              setSelectedLedger(null);
            }}
          >
            <motion.div
              initial={{ y: 900 }}
              animate={{ y: 0 }}
              exit={{ y: 900 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl w-full max-w-[390px] mx-auto p-6 max-h-[80vh] overflow-y-auto"
            >
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />

              <h3 className="text-lg mb-4">
                {translations[language].manualEntry}
              </h3>

              <div className="space-y-4">
                {/* TYPE */}
                <div>
                  <label className="block mb-2 text-sm text-gray-700">
                    {translations[language].type}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setEntryType("income")}
                      className={`py-2 px-4 rounded-lg text-sm border-2 ${entryType === "income"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-600"
                        : "bg-gray-100 text-gray-600 border-transparent"
                        }`}
                    >
                      {translations[language].income}
                    </button>

                    <button
                      type="button"
                      onClick={() => setEntryType("expense")}
                      className={`py-2 px-4 rounded-lg text-sm border-2 ${entryType === "expense"
                        ? "bg-red-50 text-red-600 border-red-600"
                        : "bg-gray-100 text-gray-600 border-transparent"
                        }`}
                    >
                      {translations[language].expense}
                    </button>
                  </div>
                </div>

                {/* AMOUNT */}
                <div>
                  <label className="block mb-2 text-sm text-gray-700">
                    {translations[language].amount}
                  </label>
                  <div className="relative">
                    <span
                      className={`absolute left-4 top-1/2 -translate-y-1/2 ${entryType === "income"
                        ? "text-emerald-600"
                        : "text-red-600"
                        }`}
                    >
                      ₦
                    </span>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                {/* CATEGORY */}
                <div>
                  <label className="block mb-2 text-sm text-gray-700">
                    {translations[language].category}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="">
                      {translations[language].selectCategory}
                    </option>

                    {CATEGORY_MAP[entryType].map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {translations[language][cat.labelKey]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* DATE */}
                <div>
                  <label className="block mb-2 text-sm text-gray-700">
                    {translations[language].date}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                {/* DESCRIPTION */}
                <div>
                  <label className="block mb-2 text-sm text-gray-700">
                    {translations[language].notesOptional}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={translations[language].addNotes}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                  />
                </div>

                {/* SAVE */}
                <button
                  onClick={() => {
                    console.log("Selected Ledger:", selectedLedger);
                  
                    if (selectedLedger) {
                      console.log("Running UPDATE");
                      handleUpdateLedger();
                    } else {
                      console.log("Running CREATE");
                      handleAddLedger();
                    }
                  }}                  
                  disabled={isProcessing}
                  className="w-full py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-lg transition-all disabled:opacity-60"
                >
                  {isProcessing
                    ? "Saving..."
                    : selectedLedger
                      ? "Update Entry"
                      : translations[language].saveEntry}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {addMode === "scan" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50"
            onClick={() => {
              setAddMode("");
              setSelectedLedger(null);
            }}
          >
            <motion.div
              initial={{ y: 900 }}
              animate={{ y: 0 }}
              exit={{ y: 900 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl w-full max-w-[390px] mx-auto h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="text-lg font-medium">Scan Receipt</h3>
                <button
                  onClick={() => {
                    setAddMode("");
                    setSelectedLedger(null);
                  }}
                  className="text-gray-500"
                >
                  ✕
                </button>
              </div>

              {scanState === "camera" && (
                <div className="flex-1 flex flex-col justify-between bg-gradient-to-b from-gray-900 to-gray-800 relative rounded-2xl overflow-hidden">
                  {/* Overlay gradient for subtle effect */}
                  <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                  {/* Camera Preview / Instruction */}
                  <div className="flex-1 flex flex-col items-center justify-center px-6">
                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-4 animate-pulse">
                      <Camera className="w-10 h-10 text-white/80" />
                    </div>
                    <p className="text-center text-[#222] text-sm opacity-80">
                      Point your camera at the receipt to capture details
                    </p>
                  </div>

                  {/* Capture Button */}
                  <div className="p-6 flex justify-center">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-20 h-20 cursor-pointer rounded-full bg-emerald-600 shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200"
                    >
                      <Camera className="w-10 h-10 text-white" />
                    </button>
                  </div>
                </div>
              )}

              {/* {scanState === "camera" && (
  <video ref={videoRef} autoPlay className="flex-1 w-full bg-black" />
)} */}


              {scanState === "preview" && capturedPreview && (
                <div className="flex-1 flex flex-col">
                  <img
                    src={capturedPreview!}
                    alt="Receipt preview"
                    className="flex-1 object-contain bg-black"
                  />

                  <div className="p-4 space-y-3">
                    <button
                      onClick={handleRetake}
                      className="w-full py-3 border rounded-xl"
                    >
                      Retake
                    </button>

                    <button
                      onClick={handleExtract}
                      className="w-full py-3 bg-emerald-600 text-white rounded-xl"
                    >
                      Extract Details
                    </button>
                  </div>
                </div>
              )}

              {scanState === "processing" && (
                <div className="flex-1 flex flex-col items-center justify-center px-6 text-center bg-gray-50">
                  {/* Animated loader */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full border-4 border-emerald-100" />
                    <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin" />
                  </div>

                  {/* Main text */}
                  <h4 className="text-base font-medium text-gray-900">
                    Scanning receipt
                  </h4>

                  {/* Sub text */}
                  <p className="mt-2 text-sm text-gray-500 max-w-[240px]">
                    We’re extracting the amount, date, and category from your receipt.
                  </p>

                  {/* Progress hint */}
                  <div className="mt-6 w-full max-w-xs">
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-1/2 bg-emerald-600 animate-pulse rounded-full" />
                    </div>
                  </div>
                </div>
              )}

              {scanState === "confirm" && (
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  <div className="text-sm text-gray-500">
                    Review and confirm details
                  </div>

                  {/* Amount */}
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-3 border rounded-xl"
                  />

                  {/* Category */}
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 border rounded-xl"
                  >
                    {CATEGORY_MAP[entryType].map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {translations[language][cat.labelKey]}
                      </option>
                    ))}
                  </select>

                  {/* Date */}
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 border rounded-xl"
                  />

                  {/* Notes */}
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 border rounded-xl"
                  />

                  <button
                    // onClick={handleAddLedger}
                    onClick={selectedLedger ? handleUpdateLedger : handleAddLedger}
                    className="w-full py-4 bg-emerald-600 text-white rounded-xl"
                  >
                    Save Entry
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {addMode === "voice" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end"
            onClick={() => {
              setAddMode("");
              setSelectedLedger(null);
            }}
          >
            <motion.div
              initial={{ y: 800 }}
              animate={{ y: 0 }}
              exit={{ y: 800 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl w-full max-w-[390px] mx-auto h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="text-lg font-medium">Voice Entry</h3>
                <button onClick={() => {
                  setAddMode("");
                  setSelectedLedger(null);
                }}
                  className="text-gray-500">
                  ✕
                </button>
              </div>

              {/* CONTENT */}
              <div className="flex-1 flex flex-col justify-center px-6 text-center">

                {/* READY / LISTENING */}
                {recordingStep === "ready" || recordingStep === "listening" ? (
                  <>
                    {/* Animated Mic */}
                    <div className="relative mx-auto mb-6">
                      <div
                        className={`w-24 h-24 rounded-full flex items-center justify-center
                ${isListening ? "bg-emerald-100 animate-pulse" : "bg-gray-100"}`}
                      >
                        <Mic
                          className={`w-10 h-10 ${isListening ? "text-emerald-600" : "text-gray-500"
                            }`}
                        />
                      </div>
                    </div>

                    <h4 className="text-base font-medium text-gray-900">
                      {isListening ? "Listening…" : "Add ledger with your voice"}
                    </h4>

                    <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto">
                      Say something like:
                      <br />
                      <span className="italic text-gray-400">
                        “I spent 5,000 naira on food”
                      </span>
                    </p>

                    {/* Action */}
                    <button
                      onClick={
                        isListening ? handleStopListening : handleStartListening
                      }
                      className={`mt-8 w-full py-4 rounded-xl text-white transition-all
              ${isListening ? "bg-red-600" : "bg-emerald-600 hover:bg-emerald-700"}`}
                    >
                      {isListening ? "Stop Listening" : "Start Speaking"}
                    </button>
                  </>
                ) : null}

                {/* PROCESSING */}
                {recordingStep === "processing" && (
                  <div className="flex flex-col items-center space-y-5">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full border-4 border-emerald-100" />
                      <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin" />
                    </div>

                    <h4 className="text-base font-medium text-gray-900">
                      Processing voice input
                    </h4>

                    <p className="text-sm text-gray-500 max-w-xs">
                      We’re extracting the amount, category, and type from what you said.
                    </p>
                  </div>
                )}

                {/* REVIEW */}
                {recordingStep === "review" && (
                  <div className="flex-1 overflow-y-auto text-left">
                    <h4 className="text-base font-medium text-gray-900 mb-1">
                      Review & confirm
                    </h4>

                    <p className="text-xs text-gray-500 mb-4">
                      Edit anything before saving
                    </p>

                    <div className="space-y-4">
                      {/* TYPE */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setEntryType("income")}
                          className={`py-2 rounded-lg text-sm border ${entryType === "income"
                            ? "bg-emerald-50 border-emerald-600 text-emerald-600"
                            : "bg-gray-100 border-transparent text-gray-600"
                            }`}
                        >
                          Income
                        </button>
                        <button
                          onClick={() => setEntryType("expense")}
                          className={`py-2 rounded-lg text-sm border ${entryType === "expense"
                            ? "bg-red-50 border-red-600 text-red-600"
                            : "bg-gray-100 border-transparent text-gray-600"
                            }`}
                        >
                          Expense
                        </button>
                      </div>

                      {/* AMOUNT */}
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount"
                        className="w-full px-4 py-3 border rounded-xl"
                      />

                      {/* CATEGORY */}
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-3 border rounded-xl"
                      >
                        <option value="">Select category</option>
                        {CATEGORY_MAP[entryType].map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {translations[language][cat.labelKey]}
                          </option>
                        ))}
                      </select>

                      {/* DATE */}
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 border rounded-xl"
                      />

                      {/* NOTES */}
                      <textarea
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Notes"
                        className="w-full px-4 py-3 border rounded-xl resize-none"
                      />

                      {/* ACTIONS */}
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={handleTryAgain}
                          className="flex-1 py-3 border rounded-xl text-sm"
                        >
                          Try again
                        </button>

                        <button
                          onClick={selectedLedger ? handleUpdateLedger : handleAddLedger}
                          className="flex-1 py-3 bg-emerald-600 text-white rounded-xl"
                        >
                          Save Entry
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-6"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 w-full max-w-sm"
            >
              <h3 className="text-lg mb-2">Delete ledger?</h3>
              <p className="text-sm text-gray-600 mb-6">
                This action cannot be undone.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-3 border rounded-xl"
                >
                  Cancel
                </button>
                <button
  onClick={handleConfirmDelete}
  className="flex-1 py-3 bg-red-600 text-white rounded-xl"
>
  Delete
</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer />
    </div>
  );
}
