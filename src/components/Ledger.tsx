import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Search, Filter, Plus, Camera, Mic, Download, TrendingUp, TrendingDown, Zap } from 'lucide-react';
import { useState } from 'react';

interface LedgerProps {
  onNavigate: (screen: string) => void;
}

export function Ledger({ onNavigate }: LedgerProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [addMode, setAddMode] = useState(''); // manual, scan, voice
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const entries = [
    { id: 1, date: 'Dec 13, 2025', amount: 25000, category: 'Sales Revenue', type: 'income', status: 'synced' },
    { id: 2, date: 'Dec 12, 2025', amount: 5000, category: 'Food Supplies', type: 'expense', status: 'synced' },
    { id: 3, date: 'Dec 11, 2025', amount: 15000, category: 'Equipment', type: 'expense', status: 'pending' },
    { id: 4, date: 'Dec 10, 2025', amount: 30000, category: 'Service Income', type: 'income', status: 'synced' },
    { id: 5, date: 'Dec 9, 2025', amount: 8000, category: 'Transportation', type: 'expense', status: 'synced' },
    { id: 6, date: 'Dec 8, 2025', amount: 20000, category: 'Sales Revenue', type: 'income', status: 'synced', exempt: true },
  ];

  const handleAddClick = (mode: string) => {
    setAddMode(mode);
  };

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
          <h1 className="text-lg">Digital Ledger</h1>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
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
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
                filterType === type
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Offline Sync Banner */}
      <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex items-center gap-2 text-sm text-amber-900">
        <Zap className="w-4 h-4" />
        <span>3 entries pending sync - Will sync when online</span>
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
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  entry.type === 'income' ? 'bg-emerald-50' : 'bg-red-50'
                }`}>
                  {entry.type === 'income' ? (
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm mb-0.5">{entry.category}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-500">{entry.date}</p>
                    {entry.exempt && (
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">
                        Exempt
                      </span>
                    )}
                    {entry.status === 'pending' && (
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded text-xs">
                        Pending sync
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm ${
                  entry.type === 'income' ? 'text-emerald-600' : 'text-gray-900'
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
          Download CSV Report
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
              
              <h3 className="text-lg mb-4">Add Entry</h3>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleAddClick('manual')}
                  className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center gap-4 transition-all text-left"
                >
                  <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <Plus className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm">Manual Entry</p>
                    <p className="text-xs text-gray-600">Enter details manually</p>
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
                    <p className="text-sm">Scan Receipt</p>
                    <p className="text-xs text-gray-600">Use camera to scan</p>
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
                    <p className="text-sm">Voice Entry</p>
                    <p className="text-xs text-gray-600">Speak to add entry</p>
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
              
              <h3 className="text-lg mb-4">Manual Entry</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm text-gray-700">Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="py-2 px-4 bg-emerald-50 text-emerald-600 border-2 border-emerald-600 rounded-lg text-sm">
                      Income
                    </button>
                    <button className="py-2 px-4 bg-gray-100 text-gray-600 border-2 border-transparent rounded-lg text-sm">
                      Expense
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-700">Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
                    <input
                      type="text"
                      placeholder="0.00"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-700">Category</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                    <option>Select category</option>
                    <option>Sales Revenue</option>
                    <option>Service Income</option>
                    <option>Food Supplies</option>
                    <option>Equipment</option>
                    <option>Transportation</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-700">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-700">Notes (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Add notes..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
                  />
                </div>

                <button className="w-full py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-lg transition-all">
                  Save Entry
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
