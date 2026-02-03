import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Search, Filter, Plus, Camera, Mic, Download, TrendingUp, TrendingDown, Zap, RefreshCw, Check, Save, Square } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from 'react-router-dom';
import { addLedgerEntry, getLedgerRecords } from '@/services/ledger';
import { toast } from 'sonner';
import { profileTranslations, type LanguageKey } from '../translations/profile';

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
    pendingSyncInfo: "Akwai bayanai 3 da ba su daidaita ba – Za su daidaita idan an samu intanet",

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
    pendingSyncInfo: "Àwọn ìforúkọsílẹ̀ 3 ń dúró fún ìṣọ̀kan – Yóò darapọ̀ nígbà tí intanẹẹti bá wà",

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
    pendingSyncInfo: "Enwere ndekọ 3 na-echere njikọ – Ha ga-ejikọ mgbe ịntanetị dị",

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

interface LedgerProps {
  onNavigate: (screen: string) => void;
  language?: LanguageKey;
}

export function Ledger({ onNavigate, language = 'english' }: LedgerProps) {
  const scanT = profileTranslations[language].scanReceipt;
  const voiceT = profileTranslations[language].voiceEntry;

  const [showAddModal, setShowAddModal] = useState(false);
  const [addMode, setAddMode] = useState(''); // manual, scan, voice
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [entryType, setEntryType] = useState<'income' | 'expense'>('income');

  // Scan Receipt States
  const [scanStep, setScanStep] = useState<'permission' | 'camera' | 'preview' | 'extracted'>('camera');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState({
    vendor: 'Fresh Foods Market',
    date: '2026-02-02',
    amount: '5,000',
    category: 'Food Supplies'
  });
  
  // Voice Entry States
  const [recordingStep, setRecordingStep] = useState<'ready' | 'listening' | 'processing' | 'review'>('ready');
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [detectedData, setDetectedData] = useState({
    amount: '5,000',
    type: 'Expense',
    category: 'Food Supplies',
    description: 'Food supplies purchase'
  });

  // const { language } = useLanguage();
  // const t = translations[language];
  const t = profileTranslations[language].scanReceipt;
  const navigate = useNavigate();

  const handleAddClick = (mode: string) => {
    setAddMode(mode);
    setShowAddModal(false);
  };
  
  // Scan Receipt Handlers
  const handleCapture = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setScanStep('preview');
    }, 1500);
  };

  const handleConfirmAndExtract = () => {
    setIsExtracting(true);
    setTimeout(() => {
      setIsExtracting(false);
      setScanStep('extracted');
    }, 2000);
  };

  const handleSaveScan = () => {
    toast.success(scanT.saved);
    setTimeout(() => {
      setAddMode('');
      setScanStep('camera');
    }, 1000);
  };

  const handleRetake = () => {
    setScanStep('camera');
  };
  
  // Voice Entry Handlers
  const handleStartListening = () => {
    setIsListening(true);
    setRecordingStep('listening');
    
    setTimeout(() => {
      setTranscription('I spent 5000 naira on food supplies today');
      setIsListening(false);
      setRecordingStep('processing');
      
      setTimeout(() => {
        setRecordingStep('review');
      }, 1500);
    }, 3000);
  };

  const handleStopListening = () => {
    setIsListening(false);
    if (transcription) {
      setRecordingStep('processing');
      setTimeout(() => {
        setRecordingStep('review');
      }, 1500);
    } else {
      setRecordingStep('ready');
      toast.error(voiceT.noSpeech);
    }
  };

  const handleTryAgain = () => {
    setTranscription('');
    setRecordingStep('ready');
  };

  const handleSaveVoice = () => {
    toast.success(voiceT.saved);
    setTimeout(() => {
      setAddMode('');
      setRecordingStep('ready');
      setTranscription('');
    }, 1000);
  };

  const CATEGORY_MAP = {
    income: [
      { labelKey: 'salesRevenue', value: 'sales revenue' },
      { labelKey: 'serviceIncome', value: 'service income' },
    ],
    expense: [
      // { labelKey: 'foodSupplies', value: 'food supplies expense' },
      // { labelKey: 'equipment', value: 'office equipment' },
      { labelKey: 'otherIncome', value: 'other income' },
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
const [ledgerError, setLedgerError] = useState('');

  const incomeCategories = [
    translations[language].salesRevenue,
    translations[language].serviceIncome,
  ];

  const expenseCategories = [
    translations[language].foodSupplies,
    translations[language].equipment,
    translations[language].transportation,
  ];

  const fetchLedgerRecords = async () => {
    try {
      setIsLoadingLedger(true);
      setLedgerError('');
  
      const res = await getLedgerRecords();
      console.log('ledger entries', res);
  
      setEntries(res.data || []);
    } catch (err: any) {
      setLedgerError(err.message || 'Failed to load ledger records');
    } finally {
      setIsLoadingLedger(false);
    }
  };  

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

      console.log('LEDGER CREATED:', response);
      alert('LEDGER CREATED.')

      // ✅ Optional: add immediately to UI list
      // setEntries((prev) => [response.data, ...prev]);

          // ✅ Re-fetch ledger list from API
    await fetchLedgerRecords();

      // ✅ Reset form
      setAmount('');
      setCategory('');
      setDescription('');
      setDate('');

    } catch (error: any) {
      console.error(error);

      const message =
        error?.response?.data?.message ||
        'Failed to add ledger entry';

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
          {['all', 'income', 'expense'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${filterType === type
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {translations[language][
                type === 'all'
                  ? 'filterAll'
                  : type === 'income'
                    ? 'filterIncome'
                    : 'filterExpense'
              ]}
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
    const isIncome = entry.ledger_type === 'income';

    return (
      <motion.div
        key={entry.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isIncome ? 'bg-emerald-50' : 'bg-red-50'
              }`}
            >
              {isIncome ? (
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-600" />
              )}
            </div>

            <div>
              <p className="text-sm mb-0.5 capitalize">
                {entry.category}
              </p>

              <div className="flex items-center gap-2">
                <p className="text-xs text-gray-500">
                  {new Date(entry.date).toLocaleDateString()}
                </p>
              </div>

              {entry.description && (
                <p className="text-xs text-gray-400 mt-0.5">
                  {entry.description}
                </p>
              )}
            </div>
          </div>

          <div className="text-right">
            <p
              className={`text-sm font-medium ${
                isIncome ? 'text-emerald-600' : 'text-gray-900'
              }`}
            >
              {isIncome ? '+' : '-'}₦
              {Number(entry.amount).toLocaleString()}
            </p>
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

              <h3 className="text-lg mb-4">{translations[language].addEntry}</h3>

              <div className="space-y-3">
                <button
                  onClick={() => handleAddClick('manual')}
                  className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center gap-4 transition-all text-left"
                >
                  <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <Plus className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm">{translations[language].manualEntry}</p>
                    <p className="text-xs text-gray-600">{translations[language].manualEntryDesc}</p>
                  </div>
                </button>

                <button
                  onClick={() => handleAddClick('scan')}
                  className="w-full p-4 bg-purple-50 hover:bg-purple-100 rounded-xl flex items-center gap-4 transition-all text-left"
                >
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                    <Camera className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm">{translations[language].scanReceipt}</p>
                    <p className="text-xs text-gray-600">{translations[language].scanReceiptDesc}</p>
                  </div>
                </button>

                <button
                  onClick={() => handleAddClick('voice')}
                  className="w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl flex items-center gap-4 transition-all text-left"
                >
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                    <Mic className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm">{translations[language].voiceEntry}</p>
                    <p className="text-xs text-gray-600">{translations[language].speakToAdd}</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manual Entry Modal */}
      <AnimatePresence>
        {addMode === 'manual' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end"
            onClick={() => setAddMode('')}
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

              <h3 className="text-lg mb-4">{translations[language].manualEntry}</h3>

              <div className="space-y-4">
                {/* TYPE */}
                <div>
                  <label className="block mb-2 text-sm text-gray-700">
                    {translations[language].type}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setEntryType('income')}
                      className={`py-2 px-4 rounded-lg text-sm border-2 ${entryType === 'income'
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-600'
                          : 'bg-gray-100 text-gray-600 border-transparent'
                        }`}
                    >
                      {translations[language].income}
                    </button>

                    <button
                      type="button"
                      onClick={() => setEntryType('expense')}
                      className={`py-2 px-4 rounded-lg text-sm border-2 ${entryType === 'expense'
                          ? 'bg-red-50 text-red-600 border-red-600'
                          : 'bg-gray-100 text-gray-600 border-transparent'
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
                      className={`absolute left-4 top-1/2 -translate-y-1/2 ${entryType === 'income' ? 'text-emerald-600' : 'text-red-600'
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
                  onClick={handleAddLedger}
                  disabled={isProcessing}
                  className="w-full py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-lg transition-all disabled:opacity-60"
                >
                  {isProcessing
                    ? 'Saving...'
                    : translations[language].saveEntry}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scan Receipt Modal */}
      <AnimatePresence>
        {addMode === 'scan' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900 z-50"
          >
            <motion.div
              initial={{ y: 900 }}
              animate={{ y: 0 }}
              exit={{ y: 900 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="min-h-screen bg-gray-900 pb-6"
            >
              {/* Header */}
              <div className="bg-gray-900 px-6 pt-6 pb-8">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setAddMode('')}
                    className="p-2 hover:bg-white/10 rounded-lg transition-all"
                  >
                    <ArrowLeft className="w-6 h-6 text-white" />
                  </button>
                  <h1 className="text-white text-lg flex-1 text-center mr-10">{scanT.title}</h1>
                </div>
                <p className="text-gray-300 text-center text-sm">{scanT.subtitle}</p>
              </div>

              <AnimatePresence mode="wait">
                {scanStep === 'camera' && (
                  <motion.div
                    key="camera"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-6"
                  >
                    {/* Camera Viewfinder */}
                    <div className="relative aspect-[3/4] bg-black rounded-2xl overflow-hidden mb-6 border-2 border-purple-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p className="text-sm">Camera View</p>
                          <p className="text-xs mt-2">Position receipt here</p>
                        </div>
                      </div>

                      {/* Scanning Frame */}
                      <div className="absolute inset-8 border-2 border-dashed border-purple-400 rounded-xl">
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-purple-500 rounded-tl-lg" />
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-purple-500 rounded-tr-lg" />
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-purple-500 rounded-bl-lg" />
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-purple-500 rounded-br-lg" />
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-gray-800 rounded-2xl p-6 mb-6">
                      <h3 className="text-white text-sm mb-4">{scanT.instructions}</h3>
                      <div className="space-y-3">
                        {[scanT.step1, scanT.step2, scanT.step3, scanT.step4].map((step, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs">
                              {index + 1}
                            </div>
                            <p className="text-gray-300 text-sm flex-1">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Capture Button */}
                    <button
                      onClick={handleCapture}
                      disabled={isProcessing}
                      className={`w-full py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                        isProcessing
                          ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                    >
                      <Camera className="w-5 h-5" />
                      {isProcessing ? scanT.processingButton : scanT.captureButton}
                    </button>

                    {/* Tip */}
                    <div className="mt-4 p-4 bg-purple-900/30 border border-purple-500/30 rounded-xl">
                      <p className="text-purple-200 text-xs">{scanT.scanTip}</p>
                    </div>
                  </motion.div>
                )}

                {scanStep === 'preview' && (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="px-6"
                  >
                    {/* Preview Image */}
                    <div className="relative aspect-[3/4] bg-white rounded-2xl overflow-hidden mb-6 border-2 border-emerald-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <Check className="w-16 h-16 mx-auto mb-4" />
                          <p className="text-sm">Receipt Captured</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mb-4">
                      <button
                        onClick={handleRetake}
                        className="flex-1 py-4 border border-gray-600 text-white rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                      >
                        <RefreshCw className="w-5 h-5" />
                        {scanT.retakeButton}
                      </button>
                      <button
                        onClick={handleConfirmAndExtract}
                        disabled={isExtracting}
                        className={`flex-1 py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                          isExtracting
                            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                      >
                        <Check className="w-5 h-5" />
                        {isExtracting ? scanT.extracting : scanT.confirmButton}
                      </button>
                    </div>
                  </motion.div>
                )}

                {scanStep === 'extracted' && (
                  <motion.div
                    key="extracted"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="px-6"
                  >
                    {/* Success Indicator */}
                    <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-2xl p-6 mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                          <Check className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white text-sm">{scanT.detectedFields}</h3>
                          <p className="text-emerald-200 text-xs">{scanT.editDetails}</p>
                        </div>
                      </div>
                    </div>

                    {/* Extracted Data */}
                    <div className="bg-gray-800 rounded-2xl p-6 space-y-4 mb-6">
                      <div>
                        <label className="text-xs text-gray-400 mb-2 block">{scanT.vendor}</label>
                        <input
                          type="text"
                          value={extractedData.vendor}
                          onChange={(e) => setExtractedData({ ...extractedData, vendor: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-gray-400 mb-2 block">{scanT.date}</label>
                        <input
                          type="date"
                          value={extractedData.date}
                          onChange={(e) => setExtractedData({ ...extractedData, date: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-gray-400 mb-2 block">{scanT.amount}</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white">₦</span>
                          <input
                            type="text"
                            value={extractedData.amount}
                            onChange={(e) => setExtractedData({ ...extractedData, amount: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-gray-400 mb-2 block">{scanT.category}</label>
                        <select
                          value={extractedData.category}
                          onChange={(e) => setExtractedData({ ...extractedData, category: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        >
                          <option>Food Supplies</option>
                          <option>Equipment</option>
                          <option>Transportation</option>
                          <option>Utilities</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex gap-3">
                      <button
                        onClick={handleRetake}
                        className="flex-1 py-4 border border-gray-600 text-white rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                      >
                        <RefreshCw className="w-5 h-5" />
                        {scanT.retakeButton}
                      </button>
                      <button
                        onClick={handleSaveScan}
                        className="flex-1 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                      >
                        <Save className="w-5 h-5" />
                        {scanT.saveEntry}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice Entry Modal */}
      <AnimatePresence>
        {addMode === 'voice' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 z-50"
          >
            <motion.div
              initial={{ y: 900 }}
              animate={{ y: 0 }}
              exit={{ y: 900 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="min-h-screen pb-6"
            >
              {/* Header */}
              <div className="bg-blue-900 px-6 pt-6 pb-8">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setAddMode('')}
                    className="p-2 hover:bg-white/10 rounded-lg transition-all"
                  >
                    <ArrowLeft className="w-6 h-6 text-white" />
                  </button>
                  <h1 className="text-white text-lg flex-1 text-center mr-10">{voiceT.title}</h1>
                </div>
                <p className="text-blue-200 text-center text-sm">{voiceT.subtitle}</p>
              </div>

              <div className="px-6">
                <AnimatePresence mode="wait">
                  {recordingStep === 'ready' && (
                    <motion.div
                      key="ready"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      {/* Microphone Visual */}
                      <div className="flex justify-center mb-8">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="relative"
                        >
                          <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-2xl">
                            <Mic className="w-20 h-20 text-blue-600" />
                          </div>
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 0, 0.5]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="absolute inset-0 bg-blue-400 rounded-full -z-10"
                          />
                        </motion.div>
                      </div>

                      {/* Instructions */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                        <h3 className="text-white text-sm mb-4">{voiceT.instructions}</h3>
                        <div className="space-y-3">
                          {[voiceT.step1, voiceT.step2, voiceT.step3, voiceT.step4].map((step, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs">
                                {index + 1}
                              </div>
                              <p className="text-blue-100 text-sm flex-1">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Example */}
                      <div className="bg-blue-800/50 border border-blue-400/30 rounded-2xl p-6">
                        <h4 className="text-blue-200 text-xs mb-2">{voiceT.example}</h4>
                        <p className="text-white text-sm italic">{voiceT.exampleText}</p>
                      </div>

                      {/* Tips */}
                      <div className="bg-white/5 rounded-2xl p-6">
                        <h4 className="text-blue-200 text-xs mb-3">{voiceT.tips}</h4>
                        <div className="space-y-2">
                          {[voiceT.tip1, voiceT.tip2, voiceT.tip3, voiceT.tip4].map((tip, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <span className="text-blue-400 text-sm">•</span>
                              <p className="text-blue-100 text-xs">{tip}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Start Button */}
                      <button
                        onClick={handleStartListening}
                        className="w-full py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Mic className="w-5 h-5" />
                        {voiceT.startListening}
                      </button>
                    </motion.div>
                  )}

                  {recordingStep === 'listening' && (
                    <motion.div
                      key="listening"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="space-y-6"
                    >
                      {/* Animated Microphone */}
                      <div className="flex justify-center mb-8">
                        <div className="relative">
                          <motion.div
                            animate={{
                              scale: [1, 1.1, 1],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-2xl"
                          >
                            <Mic className="w-20 h-20 text-red-600" />
                          </motion.div>
                          
                          {/* Pulsing rings */}
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{
                                scale: [1, 2.5],
                                opacity: [0.6, 0]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.4,
                                ease: "easeOut"
                              }}
                              className="absolute inset-0 bg-red-400 rounded-full"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Listening Indicator */}
                      <div className="bg-red-900/30 border border-red-400/30 rounded-2xl p-6 text-center">
                        <h3 className="text-white text-lg mb-2">{voiceT.listening}</h3>
                        <p className="text-red-200 text-sm">Speak clearly and naturally...</p>
                        
                        {/* Waveform Animation */}
                        <div className="flex justify-center items-center gap-1 mt-6 h-12">
                          {[...Array(20)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{
                                height: ['20%', '100%', '20%']
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.05,
                                ease: "easeInOut"
                              }}
                              className="w-1 bg-white rounded-full"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Live Transcription */}
                      {transcription && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
                        >
                          <h4 className="text-blue-200 text-xs mb-2">{voiceT.transcription}</h4>
                          <p className="text-white text-sm">{transcription}</p>
                        </motion.div>
                      )}

                      {/* Stop Button */}
                      <button
                        onClick={handleStopListening}
                        className="w-full py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Square className="w-5 h-5" />
                        {voiceT.stopListening}
                      </button>
                    </motion.div>
                  )}

                  {recordingStep === 'processing' && (
                    <motion.div
                      key="processing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center min-h-[60vh]"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-20 h-20 border-4 border-white/20 border-t-white rounded-full mb-6"
                      />
                      <h3 className="text-white text-lg mb-2">{voiceT.processing}</h3>
                      <p className="text-blue-200 text-sm">Analyzing your voice input...</p>
                    </motion.div>
                  )}

                  {recordingStep === 'review' && (
                    <motion.div
                      key="review"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      {/* Success Indicator */}
                      <div className="bg-emerald-900/30 border border-emerald-400/30 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                            <Check className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white text-sm">{voiceT.detectedInfo}</h3>
                            <p className="text-emerald-200 text-xs">Review and confirm</p>
                          </div>
                        </div>

                        {/* Transcription Display */}
                        <div className="bg-white/10 rounded-xl p-4">
                          <h4 className="text-blue-200 text-xs mb-2">{voiceT.transcription}</h4>
                          <p className="text-white text-sm italic">"{transcription}"</p>
                        </div>
                      </div>

                      {/* Detected Data Form */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                        <div>
                          <label className="text-xs text-blue-200 mb-2 block">{voiceT.amount}</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white">₦</span>
                            <input
                              type="text"
                              value={detectedData.amount}
                              onChange={(e) => setDetectedData({ ...detectedData, amount: e.target.value })}
                              className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none placeholder-blue-200"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs text-blue-200 mb-2 block">{voiceT.type}</label>
                          <select
                            value={detectedData.type}
                            onChange={(e) => setDetectedData({ ...detectedData, type: e.target.value })}
                            className="w-full px-4 py-3 bg-white/20 border border-white/30 text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                          >
                            <option className="bg-blue-900">Income</option>
                            <option className="bg-blue-900">Expense</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-xs text-blue-200 mb-2 block">{voiceT.category}</label>
                          <select
                            value={detectedData.category}
                            onChange={(e) => setDetectedData({ ...detectedData, category: e.target.value })}
                            className="w-full px-4 py-3 bg-white/20 border border-white/30 text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                          >
                            <option className="bg-blue-900">Food Supplies</option>
                            <option className="bg-blue-900">Equipment</option>
                            <option className="bg-blue-900">Transportation</option>
                            <option className="bg-blue-900">Utilities</option>
                            <option className="bg-blue-900">Sales Revenue</option>
                            <option className="bg-blue-900">Service Income</option>
                            <option className="bg-blue-900">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-xs text-blue-200 mb-2 block">{voiceT.description}</label>
                          <textarea
                            value={detectedData.description}
                            onChange={(e) => setDetectedData({ ...detectedData, description: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 bg-white/20 border border-white/30 text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none placeholder-blue-200 resize-none"
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={handleTryAgain}
                          className="flex-1 py-4 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                        >
                          <RefreshCw className="w-5 h-5" />
                          {voiceT.tryAgain}
                        </button>
                        <button
                          onClick={handleSaveVoice}
                          className="flex-1 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg"
                        >
                          <Save className="w-5 h-5" />
                          {voiceT.saveEntry}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
