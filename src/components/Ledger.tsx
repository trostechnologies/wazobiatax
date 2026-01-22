import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Search, Filter, Plus, Camera, Mic, Download, TrendingUp, TrendingDown, Zap } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from 'react-router-dom';

const translations = {
  english: {
    income: "Income",
    expense: "Expense",

    synced: "Synced",
    pending: "Pending",
    exempt: "Tax Exempt",

    salesRevenue: "Sales Revenue",
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

export function Ledger() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [addMode, setAddMode] = useState(''); // manual, scan, voice
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [entryType, setEntryType] = useState<'income' | 'expense'>('income');

  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  const entries = [
    { id: 1, date: 'Dec 13, 2025', amount: 25000, categoryKey: 'salesRevenue', type: 'income', status: 'synced' },
    { id: 2, date: 'Dec 12, 2025', amount: 5000, categoryKey: 'foodSupplies', type: 'expense', status: 'synced' },
    { id: 3, date: 'Dec 11, 2025', amount: 15000, categoryKey: 'equipment', type: 'expense', status: 'pending' },
    { id: 4, date: 'Dec 10, 2025', amount: 30000, categoryKey: 'serviceIncome', type: 'income', status: 'synced' },
    { id: 5, date: 'Dec 9, 2025', amount: 8000, categoryKey: 'transportation', type: 'expense', status: 'synced' },
    { id: 6, date: 'Dec 8, 2025', amount: 20000, categoryKey: 'salesRevenue', type: 'income', status: 'synced', exempt: true },
  ];

  const handleAddClick = (mode: string) => {
    setAddMode(mode);
  };

  const incomeCategories = [
    translations[language].salesRevenue,
    translations[language].serviceIncome,
  ];

  const expenseCategories = [
    translations[language].foodSupplies,
    translations[language].equipment,
    translations[language].transportation,
  ];

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

      {/* Ledger Entries */}
      <div className="p-6 space-y-3">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${entry.type === 'income' ? 'bg-emerald-50' : 'bg-red-50'
                  }`}>
                  {entry.type === 'income' ? (
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm mb-0.5">{translations[language][entry.categoryKey]}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-500">{entry.date}</p>
                    {entry.exempt && (
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">
                        {translations[language].isExempt}
                      </span>
                    )}
                    {entry.status === 'pending' && (
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded text-xs">
                        {translations[language].pendingSync}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm ${entry.type === 'income' ? 'text-emerald-600' : 'text-gray-900'
                  }`}>
                  {entry.type === 'income' ? '+' : '-'}₦{entry.amount.toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
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
                <div>
                  <label className="block mb-2 text-sm text-gray-700">{translations[language].type}</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setEntryType('income')}
                      className={`py-2 px-4 rounded-lg text-sm border-2 ${entryType === 'income'
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-600'
                        : 'bg-gray-100 text-gray-600 border-transparent'}`}>
                      {translations[language].income}
                    </button>
                    <button
                      onClick={() => setEntryType('expense')}
                      className={`py-2 px-4 rounded-lg text-sm border-2 ${entryType === 'expense'
                        ? 'bg-red-50 text-red-600 border-red-600'
                        : 'bg-gray-100 text-gray-600 border-transparent'}`}>
                      {translations[language].expense}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-700">{translations[language].amount}</label>
                  <div className="relative">
                    <span className={`absolute left-4 top-1/2 -translate-y-1/2 ${entryType === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
                      ₦
                    </span>                    
                    <input
                      type="text"
                      placeholder="0.00"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-700">{translations[language].category}</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                    <option>{translations[language].selectCategory}</option>
                    {(entryType === 'income' ? incomeCategories : expenseCategories).map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-700">{translations[language].date}</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-700">{translations[language].notesOptional}</label>
                  <textarea
                    rows={3}
                    placeholder={translations[language].addNotes}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
                  />
                </div>

                <button className="w-full py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-lg transition-all">
                  {translations[language].saveEntry}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
      {addMode === 'scan' && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black z-50 flex flex-col"
  >
    {/* Header */}
    <div className="p-4 text-white text-center">
      <h3 className="text-lg">Scan Receipt</h3>
      <p className="text-sm text-gray-300">
        Align receipt within the frame
      </p>
    </div>

    {/* Camera Preview */}
    <div className="flex-1 flex items-center justify-center relative">
      <div className="w-[85%] h-[70%] border-2 border-dashed border-white/60 rounded-xl" />
      <p className="absolute bottom-4 text-xs text-white/80">
        Auto capture enabled
      </p>
    </div>

    {/* Controls */}
    <div className="p-6 flex items-center justify-between">
      <button
        onClick={() => setAddMode('')}
        className="text-white text-sm"
      >
        Cancel
      </button>

      <button className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
        <Camera className="w-7 h-7 text-black" />
      </button>

      <div className="w-10" />
    </div>
  </motion.div>
)}
      </AnimatePresence>


      <AnimatePresence>
      {addMode === 'voice' && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-gradient-to-b from-emerald-600 to-emerald-800 z-50 flex flex-col items-center justify-center text-white px-6"
  >
    <h3 className="text-lg mb-2">Voice Entry</h3>
    <p className="text-sm text-emerald-100 mb-10 text-center">
      Speak naturally to add a transaction
    </p>

    {/* Mic Animation */}
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center mb-6"
    >
      <Mic className="w-10 h-10 text-white" />
    </motion.div>

    <p className="text-xs text-emerald-200 mb-10">
      Listening...
    </p>

    {/* Controls */}
    <div className="flex gap-6">
      <button
        onClick={() => setAddMode('')}
        className="px-6 py-3 bg-white/20 rounded-full text-sm"
      >
        Cancel
      </button>
      <button className="px-6 py-3 bg-white text-emerald-700 rounded-full text-sm">
        Done
      </button>
    </div>
  </motion.div>
)}
      </AnimatePresence>
    </div>
  );
}
