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
  Calculator,
  Upload,
} from "lucide-react";
import { useEffect, useRef, useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { addLedgerEntry, deleteLedgerEntry, getLedgerRecords, updateLedgerEntry } from "@/services/ledger";
import { getTaxCalculation, type TaxCalculationResponse } from "@/services/tax";
import { downloadCsv } from "@/utils/download";
import { extractReceiptDetails, MAX_RECEIPT_IMAGE_BYTES } from "@/utils/receiptOcr";
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
    pendingSyncInfo: "You're offline - changes will sync when you're back online",

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
    vatAmount: "VAT Amount",
    category: "Category",
    selectCategory: "Select category",
    date: "Date",
    description: "Description",
    addNotes: "Add description...",
    saveEntry: "Save Entry",
  },

  pidgin: {
    income: "Income",
    expense: "Expense",

    synced: "Don Sync",
    pending: "Still Dey Wait",
    exempt: "No Tax",

    salesRevenue: "Sales Money",
    otherIncome: "Other Money",
    foodSupplies: "Food Stuff",
    equipment: "Equipment",
    serviceIncome: "Service Money",
    transportation: "Transport",

    isExempt: "No Tax",
    pendingSync: "Never Sync",
    downloadCsvReport: "Download CSV Report",

    digitalLedger: "Digital Ledger",
    searchTransactions: "Search transactions...",
    pendingSyncInfo: "You dey offline - changes go sync when network come back",

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
    vatAmount: "VAT Amount",
    category: "Category",
    selectCategory: "Choose category",
    date: "Date",
    description: "Description",
    addNotes: "Add description...",
    saveEntry: "Save Entry",
  },

  hausa: {
    income: "Kuɗin Shiga",
    expense: "Kuɗin Fita",

    synced: "An Daidaita",
    pending: "Ana Jira",
    exempt: "Ba a Caji Haraji",

    salesRevenue: "Kuɗin Talla",
    otherIncome: "Sauran Kuɗin Shiga",
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
      "Ba ka da intanet - canje-canje za su daidaita idan an sake samun intanet",

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
    vatAmount: "Adadi VAT",
    category: "Rukuni",
    selectCategory: "Zaɓi rukuni",
    date: "Kwanan Wata",
    description: "Bayani",
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
    otherIncome: "Ìní Mìíràn",
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
      "O ò sí lórí ayelujara - àwọn àyípadà yóò darapọ̀ nígbà tí intanẹẹti bá padà wá",

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
    vatAmount: "Iye VAT",
    category: "Ẹ̀ka",
    selectCategory: "Yan ẹ̀ka",
    date: "Ọjọ́",
    description: "Àkọsílẹ̀",
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
    otherIncome: "Ego Mbata Ọzọ",
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
      "Ị nọghị n'ịntanetị - mgbanwe ga-ejikọ mgbe ịntanetị laghachiri",

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
    vatAmount: "Ego VAT",
    category: "Ngalaba",
    selectCategory: "Họrọ ngalaba",
    date: "Ụbọchị",
    description: "Nkọwa",
    addNotes: "Tinye nkọwa...",
    saveEntry: "Chekwaa Ndekọ",
  },
};

interface LedgerProps {
  onNavigate: (screen: string) => void;
  language?: LanguageKey;
}

export function Ledger({ onNavigate, language = "english" }: LedgerProps) {
  const voiceT = profileTranslations[language].voiceEntry;

  const [showAddModal, setShowAddModal] = useState(false);
  const [addMode, setAddMode] = useState(""); // manual, scan, voice
  const [scanState, setScanState] = useState("camera");
  const [capturedImage, setCapturedImage] = useState<File | null>(null);
  const [capturedPreview, setCapturedPreview] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(() => typeof navigator === "undefined" || navigator.onLine);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [amount, setAmount] = useState("");
  const [vatAmount, setVatAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [entryType, setEntryType] = useState<"income" | "expense">("income");

  const [selectedLedger, setSelectedLedger] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [updating, setUpdating] = useState(false);
  const [taxData, setTaxData] = useState<TaxCalculationResponse['data'] | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);


  // Scan Receipt States
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);

  // Voice Entry States
  const [recordingStep, setRecordingStep] = useState<
    "ready" | "listening" | "processing" | "review"
  >("ready");
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState("");
  const recognitionRef = useRef<any>(null);
  const [voiceSupported, setVoiceSupported] = useState(false);

  // Initialise browser SpeechRecognition once
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceSupported(false);
      return;
    }

    setVoiceSupported(true);
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-NG"; // Nigerian English for better Naira-context accuracy
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = 0; i < event.results.length; i++) {
        const item = event.results[i];
        if (item.isFinal) {
          finalTranscript += item[0].transcript + " ";
        } else {
          interimTranscript += item[0].transcript;
        }
      }

      const combined = (finalTranscript + interimTranscript).trim();
      if (combined) {
        setTranscription(combined);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === "no-speech") {
        toast.error(voiceT.noSpeech);
      } else if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        toast.error("Microphone access denied. Please allow microphone permissions in your browser settings.");
      } else if (event.error !== "aborted") {
        toast.error("Voice recognition error. Please try again.");
      }
      setIsListening(false);
      if (!transcription) {
        setRecordingStep("ready");
      }
    };

    recognition.onend = () => {
      // When recognition ends naturally (or via stop()), move to processing if we have text
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      try { recognition.abort(); } catch (_) { /* ignore */ }
    };
  }, []);

  // const { language } = useLanguage();
  // const t = translations[language];
  const t = profileTranslations[language].scanReceipt;
  const navigate = useNavigate();
  const { permissionState, requestPermission } = useCameraPermissions();

  const handleAddClick = (mode: string) => {
    if (!selectedLedger) {
      // only reset form if NOT editing
      setAmount("");
      setVatAmount("");
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
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [scanError, setScanError] = useState("");

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_RECEIPT_IMAGE_BYTES) {
      setScanError(`That image is too large (max ${Math.round(MAX_RECEIPT_IMAGE_BYTES / (1024 * 1024))}MB). Please choose a smaller photo.`);
      e.target.value = "";
      return;
    }

    setIsProcessing(true);
    const previewUrl = URL.createObjectURL(file);

    setCapturedImage(file);        // for OCR upload
    setCapturedPreview(previewUrl); // for UI
    setScanError("");
    setIsProcessing(false);
    setScanState("preview");
  };

  const handleExtract = async () => {
    if (!capturedImage) return;

    setScanState("processing");
    setIsExtracting(true);
    setScanError("");

    try {
      const result = await extractReceiptDetails(capturedImage);

      if (!result.success) {
        setScanError("We couldn't clearly read all details from this receipt. We've filled in what we could — please review or edit below.");
      } else {
        toast.success("Receipt details extracted successfully!");
      }

      // Prefill whatever we found — every field stays editable, and the user
      // reviews and confirms before saving
      setEntryType("expense");
      if (result.amount) {
        setAmount(result.amount);
      }
      setDate(result.date || new Date().toISOString().slice(0, 10));
      setDescription(result.vendor || "Receipt Expense");

      // Auto-detect category from OCR text and vendor name
      const combined = `${result.vendor || ""} ${result.rawText || ""}`.toLowerCase();
      if (/food|restaurant|cafe|eatery|supermarket|grocery|groceries|buka|kitchen|chops|bread|drink|provisions|snacks|canteen|market|bakery|fast\s*food/i.test(combined)) {
        setCategory("food supplies expense");
      } else if (/fuel|petrol|diesel|filling\s*station|transport|transportation|uber|bolt|taxi|fare|flight|airline|logistics|mechanic|car|vehicle|conoil|totalenergies|oando|nnpc/i.test(combined)) {
        setCategory("transportation expense");
      } else if (/computer|laptop|phone|equipment|hardware|office|electronics|gadget|printer|machinery|stationery|paper|desk|chair/i.test(combined)) {
        setCategory("office equipment");
      } else {
        setCategory("food supplies expense");
      }
    } catch (err) {
      console.error("Receipt OCR failed:", err);
      setScanError("We couldn't scan this receipt photo. Please enter the details manually below, or retake the photo with better lighting.");
      setEntryType("expense");
      setDate(new Date().toISOString().slice(0, 10));
      setCategory("food supplies expense");
      setDescription("Receipt Expense");
    } finally {
      setIsExtracting(false);
      setScanState("confirm");
    }
  };

  const handleRetake = () => {
    setScanError("");
    setScanState("camera");
  };

  // Voice Entry Handlers
  // NOTE: there is no real speech-to-text here — the browser never records
  // audio, this simulates recognizing a fixed phrase. What was broken is that
  // the "recognized" amount/type/description never made it into the Add Entry
  // form fields below, so the review screen was always blank. This parses the
  // (still simulated) transcript and populates the real, shared form state so
  // Save Entry actually has something to save.
  const applyVoiceTranscript = (text: string) => {
    const lower = text.toLowerCase();

    // ── 1. Extract amount ──
    // Handles "5000", "5,000", "₦5000", "5k", "10k", "fifty thousand naira", etc.
    let extractedAmount = "";

    // Check for "5k", "10.5k" shorthand
    const kMatch = lower.match(/\b(\d+(?:\.\d+)?)\s*k\b/i);
    if (kMatch) {
      extractedAmount = String(Math.round(parseFloat(kMatch[1]) * 1000));
    }

    if (!extractedAmount) {
      // Try numeric patterns: ₦5,000.50, $5000, 5000 naira, amount 5000, etc.
      const numericPatterns = [
        /[₦$]\s*(\d{1,3}(?:[,]\d{3})*(?:\.\d+)?)/,
        /(\d{1,3}(?:[,]\d{3})*(?:\.\d+)?)\s*(?:naira|dollars?)/i,
        /(?:amount|spent|paid|received|earned|got|cost|is)\s+(?:[₦$])?\s*(\d{1,3}(?:[,]\d{3})*(?:\.\d+)?)/i,
        /(\d{1,3}(?:[,]\d{3})*(?:\.\d+)?)/,
      ];

      for (const pattern of numericPatterns) {
        const match = lower.match(pattern);
        if (match) {
          extractedAmount = match[1].replace(/,/g, "");
          break;
        }
      }
    }

    // If no numeric match, try word-based numbers: "five thousand", "twenty thousand"
    if (!extractedAmount) {
      const numberWords: Record<string, number> = {
        one: 1, two: 2, three: 3, four: 4, five: 5,
        six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
        eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15,
        sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19,
        twenty: 20, thirty: 30, forty: 40, fifty: 50,
        sixty: 60, seventy: 70, eighty: 80, ninety: 90,
      };
      const multiplierWords: Record<string, number> = {
        hundred: 100, thousand: 1000, million: 1000000,
      };

      const words = lower.split(/[\s-]+/);
      let total = 0;
      let current = 0;
      let foundNumber = false;

      for (const word of words) {
        if (numberWords[word] !== undefined) {
          current += numberWords[word];
          foundNumber = true;
        } else if (multiplierWords[word] !== undefined) {
          current = (current || 1) * multiplierWords[word];
          foundNumber = true;
          if (multiplierWords[word] >= 1000) {
            total += current;
            current = 0;
          }
        }
      }
      total += current;
      if (foundNumber && total > 0) {
        extractedAmount = String(total);
      }
    }

    if (extractedAmount) setAmount(extractedAmount);

    // ── 2. Determine income vs expense ──
    const isIncome = /\b(earned|received|income|sold|sale|sales|revenue|got\s*paid|payment\s*received|credited|turnover)\b/i.test(lower);
    const isExpense = /\b(spent|paid|bought|purchased|expense|cost|debited|used|transport|rent|bill|fee|subscription|food)\b/i.test(lower);

    let resolvedType: "income" | "expense" = "expense";
    if (isIncome && !isExpense) {
      resolvedType = "income";
    } else if (isExpense) {
      resolvedType = "expense";
    }
    setEntryType(resolvedType);

    // ── 3. Detect category from keywords ──
    const categoryKeywords: Record<string, { type: "income" | "expense"; value: string }> = {
      // Income
      "sales": { type: "income", value: "sales revenue" },
      "sale": { type: "income", value: "sales revenue" },
      "sold": { type: "income", value: "sales revenue" },
      "revenue": { type: "income", value: "sales revenue" },
      "service": { type: "income", value: "service income" },
      "services": { type: "income", value: "service income" },
      "consulting": { type: "income", value: "service income" },
      "contract": { type: "income", value: "service income" },
      "freelance": { type: "income", value: "service income" },
      "grant": { type: "income", value: "other income" },
      "gift": { type: "income", value: "other income" },
      "interest": { type: "income", value: "other income" },
      "bonus": { type: "income", value: "other income" },

      // Expense
      "food": { type: "expense", value: "food supplies expense" },
      "supplies": { type: "expense", value: "food supplies expense" },
      "groceries": { type: "expense", value: "food supplies expense" },
      "restaurant": { type: "expense", value: "food supplies expense" },
      "lunch": { type: "expense", value: "food supplies expense" },
      "dinner": { type: "expense", value: "food supplies expense" },
      "drink": { type: "expense", value: "food supplies expense" },
      "drinks": { type: "expense", value: "food supplies expense" },
      "water": { type: "expense", value: "food supplies expense" },
      "provisions": { type: "expense", value: "food supplies expense" },
      "transport": { type: "expense", value: "transportation expense" },
      "transportation": { type: "expense", value: "transportation expense" },
      "uber": { type: "expense", value: "transportation expense" },
      "bolt": { type: "expense", value: "transportation expense" },
      "taxi": { type: "expense", value: "transportation expense" },
      "fuel": { type: "expense", value: "transportation expense" },
      "petrol": { type: "expense", value: "transportation expense" },
      "diesel": { type: "expense", value: "transportation expense" },
      "fare": { type: "expense", value: "transportation expense" },
      "flight": { type: "expense", value: "transportation expense" },
      "equipment": { type: "expense", value: "office equipment" },
      "office": { type: "expense", value: "office equipment" },
      "laptop": { type: "expense", value: "office equipment" },
      "computer": { type: "expense", value: "office equipment" },
      "phone": { type: "expense", value: "office equipment" },
      "printer": { type: "expense", value: "office equipment" },
      "generator": { type: "expense", value: "office equipment" },
    };

    let matchedCategory = "";
    for (const [keyword, catInfo] of Object.entries(categoryKeywords)) {
      if (new RegExp(`\\b${keyword}\\b`, "i").test(lower)) {
        matchedCategory = catInfo.value;
        if (!isIncome && !isExpense) {
          resolvedType = catInfo.type;
          setEntryType(catInfo.type);
        }
        break;
      }
    }

    if (!matchedCategory) {
      matchedCategory = resolvedType === "income" ? "sales revenue" : "food supplies expense";
    }
    setCategory(matchedCategory);

    // ── 4. Clean up description ──
    let cleanDesc = text
      .replace(/[₦$]\s*\d[\d,.]*/g, "")
      .replace(/\b\d{1,3}(?:,\d{3})*(?:\.\d+)?\s*(?:naira|dollars?|k)\b/gi, "")
      .replace(/\b(?:amount\s+(?:is\s+)?|i\s+(?:spent|paid|received|earned|got)\s*)/gi, "")
      .replace(/\s{2,}/g, " ")
      .trim();

    if (cleanDesc) {
      cleanDesc = cleanDesc.charAt(0).toUpperCase() + cleanDesc.slice(1);
    }

    setDescription(cleanDesc || text);
    setDate(new Date().toISOString().slice(0, 10));
  };

  const handleStartListening = () => {
    if (!voiceSupported || !recognitionRef.current) {
      toast.error("Voice recognition is not supported in this browser. Please use Chrome or Edge.");
      return;
    }

    setTranscription("");
    setIsListening(true);
    setRecordingStep("listening");

    try {
      recognitionRef.current.start();
    } catch (err: any) {
      // If already started, stop and restart
      if (err.name === "InvalidStateError") {
        recognitionRef.current.stop();
        setTimeout(() => {
          try {
            recognitionRef.current.start();
          } catch (_) {
            toast.error("Could not start voice recognition. Please try again.");
            setIsListening(false);
            setRecordingStep("ready");
          }
        }, 200);
      } else {
        toast.error("Could not start voice recognition. Please try again.");
        setIsListening(false);
        setRecordingStep("ready");
      }
    }
  };

  const handleStopListening = () => {
    setIsListening(false);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) { /* ignore if not started */ }
    }

    if (transcription && transcription.trim()) {
      setRecordingStep("processing");
      // Brief processing delay for UX, then parse
      setTimeout(() => {
        applyVoiceTranscript(transcription.trim());
        setRecordingStep("review");
      }, 800);
    } else {
      setRecordingStep("ready");
      toast.error(voiceT.noSpeech);
    }
  };

  const handleTryAgain = () => {
    setTranscription("");
    setRecordingStep("ready");
  };

  const handleCalculateTax = async () => {
    if (!amount) {
      toast.info("Please enter an amount first");
      return;
    }

    setIsCalculating(true);
    try {
      // Fetch current tax status
      const res = await getTaxCalculation();
      setTaxData(res.data);

      // Nigeria VAT is 7.5% as of 2024/2025
      // If the API supports params in the future, we'd pass 'amount' here.
      // For now, we calculate it locally based on standard 7.5% rate
      // or 10% as suggested in FileReturns.tsx
      const calculatedVat = (Number(amount) * 0.075).toFixed(2);
      setVatAmount(calculatedVat);

      toast.success("Tax calculation updated");
    } catch (err) {
      console.error("Tax calculation failed:", err);
      toast.error("Failed to fetch tax data");
    } finally {
      setIsCalculating(false);
    }
  };

  const CATEGORY_MAP = {
    income: [
      { labelKey: "salesRevenue", value: "sales revenue" },
      { labelKey: "serviceIncome", value: "service income" },
      { labelKey: "otherIncome", value: "other income" },
    ],
    expense: [
      { labelKey: "foodSupplies", value: "food supplies expense" },
      { labelKey: "equipment", value: "office equipment" },
      { labelKey: "transportation", value: "transportation expense" },
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

    if (!amount || !category || !date || !description) {
      toast.error("Please fill all required fields (Amount, Category, Date, Description)");
      return;
    }

    try {
      setIsProcessing(true);

      await updateLedgerEntry(selectedLedger.id || selectedLedger.entry_id, {
        amount: Number(amount),
        vat_amount: Number(vatAmount),
        ledger_type: entryType,
        date,
        category,
        description,
      });

      toast.success("Ledger updated successfully");

      await fetchLedgerRecords();

      setAddMode("");
      setAmount("");
      setVatAmount("");
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
      setVatAmount(String(selectedLedger.vat_amount || ""));
      setCategory(selectedLedger.category);
      setDate(selectedLedger.date);
      setDescription(selectedLedger.description || "");
    }
  }, [selectedLedger, addMode]);

  const handleAddLedger = async () => {
    if (!amount || !category || !date || !description) {
      toast.error("Please fill all required fields (Amount, Category, Date, Description)");
      return;
    }

    try {
      setIsProcessing(true);

      const response = await addLedgerEntry({
        amount: Number(amount),
        vat_amount: Number(vatAmount),
        ledger_type: entryType, // 'income' | 'expense'
        date,
        category,
        description,
      });

      console.log("LEDGER CREATED:", response);
      toast.success("LEDGER CREATED.");

      // ✅ Optional: add immediately to UI list
      // setEntries((prev) => [response.data, ...prev]);

      // ✅ Re-fetch ledger list from API
      await fetchLedgerRecords();

      // ✅ Reset form
      setAddMode("");
      setAmount("");
      setVatAmount("");
      setCategory("");
      setDescription("");
      setDate("");
    } catch (error: any) {
      console.error(error);

      const message =
        error?.response?.data?.message || "Failed to add ledger entry";

      toast.error(message);
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredEntries = useMemo(() => {
    return entries.filter((entry: any) => {
      // Handle both ledger_type and type, and make case-insensitive
      const entryType = (entry.ledger_type || entry.type || "").toLowerCase();
      const matchesType = filterType === "all" || entryType === filterType.toLowerCase();

      const category = (entry.category || "").toLowerCase();
      const description = (entry.description || "").toLowerCase();
      const query = searchQuery.toLowerCase();

      const matchesSearch =
        category.includes(query) ||
        description.includes(query) ||
        String(entry.amount).includes(query);

      return matchesType && matchesSearch;
    });
  }, [entries, filterType, searchQuery]);

  useEffect(() => {
    fetchLedgerRecords();
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleDownloadCsv = () => {
    downloadCsv(
      `wazobiatax-ledger-${new Date().toISOString().slice(0, 10)}.csv`,
      ['Date', 'Type', 'Category', 'Description', 'Amount', 'VAT Amount'],
      filteredEntries.map((entry: any) => [
        entry.date,
        entry.ledger_type || entry.type || '',
        entry.category || '',
        entry.description || '',
        entry.amount,
        entry.vat_amount ?? '',
      ])
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Status Bar */}
      <div className="h-11 bg-emerald-600 flex items-center justify-between px-6 text-white text-sm">

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
          onChange={handleCapture}
        />
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleCapture}
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
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu((prev) => !prev)}
              className={`p-2 border rounded-lg transition-all ${showFilterMenu || filterType !== "all"
                ? "border-emerald-300 bg-emerald-50"
                : "border-gray-300 hover:bg-gray-50"
                }`}
            >
              <Filter className={`w-5 h-5 ${filterType !== "all" ? "text-emerald-600" : "text-gray-600"}`} />
            </button>
            {showFilterMenu && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                {["all", "income", "expense"].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setFilterType(type);
                      setShowFilterMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-all ${filterType === type ? "bg-emerald-50 text-emerald-600" : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    {
                      translations[language][
                      type === "all" ? "filterAll" : type === "income" ? "filterIncome" : "filterExpense"
                      ]
                    }
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => handleAddClick("manual")}
            className="p-2 border border-emerald-200 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-all"
            title="Tax Calculator"
          >
            <Calculator className="w-5 h-5 text-emerald-600" />
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {["all", "income", "expense"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${filterType === type
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

      {/* Offline Sync Banner — only shown when actually offline */}
      {!isOnline && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex items-center gap-2 text-sm text-amber-900">
          <Zap className="w-4 h-4" />
          <span>{translations[language].pendingSyncInfo}</span>
        </div>
      )}

      {isLoadingLedger && (
        <p className="text-center text-sm text-gray-500">Loading records...</p>
      )}

      {!isLoadingLedger && filteredEntries.length === 0 && (
        <p className="text-center text-sm text-gray-500 py-10">
          {searchQuery || filterType !== 'all'
            ? "No matches found for your current filters"
            : "No ledger records yet"}
        </p>
      )}

      {/* Ledger Entries */}
      <div className="p-6 space-y-3 pb-32">
        {filteredEntries.map((entry: any, index: number) => {
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
                    <p className="text-sm mb-1 capitalize">{entry.category}</p>

                    <p className="text-xs text-gray-500">
                      {new Date(entry.date).toLocaleDateString()}
                    </p>

                    {entry.description && (
                      <p className="text-xs text-gray-400 mt-1">
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
                      className="p-2 rounded-lg hover:bg-gray-100"
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
                      className="p-2 rounded-lg hover:bg-red-50"
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
        <button
          onClick={handleDownloadCsv}
          disabled={entries.length === 0}
          className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Download className="w-5 h-5" />
          {translations[language].downloadCsvReport}
        </button>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 left-6 z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-full shadow-2xl hover:bg-emerald-700 transition-all font-semibold"
        >
          <Plus className="w-5 h-5" />
          <span>{translations[language].addEntry}</span>
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

                {/* VAT AMOUNT */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm text-gray-700">
                      {translations[language].vatAmount} <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <button
                      onClick={handleCalculateTax}
                      disabled={isCalculating}
                      className="px-3 py-1 bg-emerald-600 text-white text-[10px] rounded-full font-bold shadow-sm hover:bg-emerald-700 transition-all flex items-center gap-1"
                    >
                      {isCalculating ? (
                        <RefreshCw className="w-3 h-3 animate-spin" />
                      ) : (
                        <Zap className="w-3 h-3" />
                      )}
                      CALCULATE
                    </button>
                  </div>
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
                      value={vatAmount}
                      onChange={(e) => setVatAmount(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                {/* TAX IMPACT PREVIEW */}
                {taxData && (
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Tax Impact Preview</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Current Net VAT</span>
                        <span className="font-medium text-gray-900">₦{taxData.net_vat.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-gray-600">New Entry VAT</span>
                        <span className={entryType === 'income' ? 'text-emerald-600' : 'text-red-600'}>
                          {entryType === 'income' ? '+' : '-'} ₦{Number(vatAmount).toLocaleString()}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-emerald-200 mt-2 flex justify-between text-sm font-bold">
                        <span className="text-gray-900">Projected Net VAT</span>
                        <span className="text-emerald-700">
                          ₦{(taxData.net_vat + (entryType === 'income' ? Number(vatAmount) : -Number(vatAmount))).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

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
                    {translations[language].description}
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
                <div className="flex-1 flex flex-col justify-between bg-gradient-to-b from-gray-900 to-gray-800 relative rounded-2xl overflow-hidden p-6">
                  {/* Viewfinder frame guide */}
                  <div className="flex-1 flex flex-col items-center justify-center relative">
                    <div className="w-64 h-72 border-2 border-dashed border-emerald-400/60 rounded-2xl relative flex flex-col items-center justify-center p-4 bg-black/30">
                      {/* Corner marks */}
                      <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg" />
                      <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-emerald-400 rounded-tr-lg" />
                      <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-emerald-400 rounded-bl-lg" />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br-lg" />

                      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-3">
                        <Camera className="w-8 h-8 text-white/90" />
                      </div>
                      <p className="text-center text-white text-sm font-medium">
                        Fit receipt inside this frame
                      </p>
                      <p className="text-center text-gray-300 text-xs mt-1">
                        Good lighting & flat surface give best results
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons: Take Photo & Upload */}

                  <div className="flex flex-col gap-3 pt-4">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white rounded-xl shadow-lg flex items-center justify-center gap-2 font-medium transition-all"
                    >
                      <Camera className="w-5 h-5" />
                      <span>Take Receipt Photo</span>
                    </button>

                    <button
                      onClick={() => galleryInputRef.current?.click()}
                      className="w-full py-3 bg-slate-700 hover:bg-slate-600 active:scale-[0.99] text-white rounded-xl shadow-md flex items-center justify-center gap-2 text-sm font-medium transition-all border border-slate-500"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload from Gallery / Files</span>
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
                    {scanError && (
                      <p className="text-sm text-red-600">{scanError}</p>
                    )}
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
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
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

                  {scanError && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <p className="text-sm text-amber-900 mb-2">{scanError}</p>
                      <button
                        onClick={() => {
                          setAddMode("manual");
                          setScanState("camera");
                          setScanError("");
                        }}
                        className="text-sm text-emerald-700 underline"
                      >
                        Enter manually instead
                      </button>
                    </div>
                  )}

                  {/* Amount */}
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    className="w-full px-4 py-3 border rounded-xl"
                  />

                  {/* VAT Amount */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold">VAT Amount <span className="text-gray-400 text-[10px] lowercase">(optional)</span></label>
                      <button
                        onClick={handleCalculateTax}
                        disabled={isCalculating}
                        className="px-3 py-1 bg-emerald-600 text-white text-[10px] rounded-full font-bold shadow-sm hover:bg-emerald-700 transition-all flex items-center gap-1"
                      >
                        {isCalculating ? (
                          <RefreshCw className="w-3 h-3 animate-spin" />
                        ) : (
                          <Zap className="w-3 h-3" />
                        )}
                        CALCULATE
                      </button>
                    </div>
                    <input
                      type="number"
                      value={vatAmount}
                      onChange={(e) => setVatAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-4 py-3 border rounded-xl"
                    />
                  </div>

                  {/* TAX IMPACT PREVIEW */}
                  {taxData && (
                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-emerald-600" />
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Tax Impact Preview</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-gray-600">Current Net VAT</span>
                          <span className="font-medium text-gray-900">₦{taxData.net_vat.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-[10px] font-medium">
                          <span className="text-gray-600">New Entry VAT</span>
                          <span className={entryType === 'income' ? 'text-emerald-600' : 'text-red-600'}>
                            {entryType === 'income' ? '+' : '-'} ₦{Number(vatAmount).toLocaleString()}
                          </span>
                        </div>
                        <div className="pt-1 border-t border-emerald-200 mt-1 flex justify-between text-xs font-bold">
                          <span className="text-gray-900">Projected Net VAT</span>
                          <span className="text-emerald-700">
                            ₦{(taxData.net_vat + (entryType === 'income' ? Number(vatAmount) : -Number(vatAmount))).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

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
                      {isListening && (
                        <div className="absolute -inset-2 rounded-full border-2 border-emerald-400 animate-ping opacity-30" />
                      )}
                    </div>

                    <h4 className="text-base font-medium text-gray-900">
                      {isListening ? "Listening…" : "Add ledger with your voice"}
                    </h4>

                    {/* Live transcript preview */}
                    {isListening && transcription && (
                      <div className="mt-3 mx-auto max-w-xs bg-gray-50 rounded-xl p-3 border border-gray-200">
                        <p className="text-sm text-gray-700 italic">"{transcription}"</p>
                      </div>
                    )}

                    <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto">
                      {isListening ? (
                        <span className="text-emerald-600 font-medium">Speak now — tap "Stop Listening" when done</span>
                      ) : !voiceSupported ? (
                        <span className="text-amber-600">
                          Voice recognition is not supported in this browser. Please use Chrome or Edge.
                        </span>
                      ) : (
                        <>
                          Say something like:
                          <br />
                          <span className="italic text-gray-400">
                            “I spent 5,000 naira on food”
                          </span>
                        </>
                      )}
                    </p>

                    {/* Action */}
                    <button
                      onClick={
                        isListening ? handleStopListening : handleStartListening
                      }
                      disabled={!voiceSupported}
                      className={`mt-8 w-full py-4 rounded-xl text-white transition-all
              ${isListening ? "bg-red-600" : voiceSupported ? "bg-emerald-600 hover:bg-emerald-700" : "bg-gray-400 cursor-not-allowed"}`}
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

                      {/* VAT AMOUNT */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold">VAT Amount <span className="text-gray-400 text-[10px] lowercase">(optional)</span></label>
                          <button
                            onClick={handleCalculateTax}
                            disabled={isCalculating}
                            className="px-3 py-1 bg-emerald-600 text-white text-[10px] rounded-full font-bold shadow-sm hover:bg-emerald-700 transition-all flex items-center gap-1"
                          >
                            {isCalculating ? (
                              <RefreshCw className="w-3 h-3 animate-spin" />
                            ) : (
                              <Zap className="w-3 h-3" />
                            )}
                            CALCULATE
                          </button>
                        </div>
                        <input
                          type="number"
                          value={vatAmount}
                          onChange={(e) => setVatAmount(e.target.value)}
                          placeholder="0.00"
                          className="w-full px-4 py-3 border rounded-xl"
                        />
                      </div>

                      {/* TAX IMPACT PREVIEW */}
                      {taxData && (
                        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4 text-emerald-600" />
                            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Tax Impact Preview</span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px]">
                              <span className="text-gray-600">Current Net VAT</span>
                              <span className="font-medium text-gray-900">₦{taxData.net_vat.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-medium">
                              <span className="text-gray-600">New Entry VAT</span>
                              <span className={entryType === 'income' ? 'text-emerald-600' : 'text-red-600'}>
                                {entryType === 'income' ? '+' : '-'} ₦{Number(vatAmount).toLocaleString()}
                              </span>
                            </div>
                            <div className="pt-1 border-t border-emerald-200 mt-1 flex justify-between text-xs font-bold">
                              <span className="text-gray-900">Projected Net VAT</span>
                              <span className="text-emerald-700">
                                ₦{(taxData.net_vat + (entryType === 'income' ? Number(vatAmount) : -Number(vatAmount))).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

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
