import { motion } from 'motion/react';
import { ArrowLeft, TrendingUp, TrendingDown, CreditCard, FileText, Search, Filter, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  english: {
    salesRevenue: 'Sales Revenue',
    serviceIncome: 'Service Income',
    foodSupplies: 'Food Supplies',
    transportation: 'Transportation',
    taxPayment: 'Tax Payment',
    vatReturnFiled: 'VAT Return Filed',
    recentActivity: 'Recent Activity',
    searchTransactions: 'Search transactions...',

    all: 'All',
    income: 'Income',
    expense: 'Expense',
    payment: 'Payment',
    filing: 'Filing',

    totalIncome: 'Total Income',
  thisWeek: 'This Week',
  totalExpenses: 'Total Expenses',
  loadMoreActivity: 'Load More Activity',
  },
  pidgin: {
    salesRevenue: 'Sales Money',
    serviceIncome: 'Service Money',
    foodSupplies: 'Food Stuff',
    transportation: 'Transport',
    taxPayment: 'Tax Payment',
    vatReturnFiled: 'VAT Return Filed',

    recentActivity: 'New Activity',
    searchTransactions: 'Search transactions...',

    all: 'All',
    income: 'Money wey enter',
    expense: 'Money wey comot',
    payment: 'Payment',
    filing: 'Filing',

    totalIncome: 'Total Money wey enter',
  thisWeek: 'This Week',
  totalExpenses: 'Total Money wey comot',
  loadMoreActivity: 'Load More Things',
  },
  hausa: {
    salesRevenue: 'Kuɗin Talla',
    serviceIncome: 'Kuɗin Ayyuka',
    foodSupplies: 'Kayan Abinci',
    transportation: 'Sufuri',
    taxPayment: 'Biyan Haraji',
    vatReturnFiled: 'An Miƙa Rahoton VAT',

    recentActivity: 'Ayyukan Kwanan Nan',
    searchTransactions: 'Nemo mu’amaloli...',

    all: 'Duka',
    income: 'Kuɗin Shiga',
    expense: 'Kuɗin Fita',
    payment: 'Biya',
    filing: 'Miƙa Takardu',

    totalIncome: 'Jimillar Kuɗin Shiga',
  thisWeek: 'Wannan Makon',
  totalExpenses: 'Jimillar Kuɗin Fita',
  loadMoreActivity: 'Loda Ƙarin Ayyuka',
  },
  yoruba: {
    salesRevenue: 'Owó Títà',
    serviceIncome: 'Owó Iṣẹ́',
    foodSupplies: 'Ohun Èlò Oúnjẹ',
    transportation: 'Irinna',
    taxPayment: 'Sísan Owó-ori',
    vatReturnFiled: 'A Ti Fọwọ́sí VAT',

    recentActivity: 'Àwọn Iṣe Tó ṣẹ̀ṣẹ̀ Ṣẹlẹ̀',
  searchTransactions: 'Ṣàwárí ìṣúná...',

  all: 'Gbogbo rẹ̀',
  income: 'Owó wọlé',
  expense: 'Owó jáde',
  payment: 'Ìsanwó',
  filing: 'Ìfọwọ́silẹ̀',

  totalIncome: 'Lapapọ̀ Owó wọlé',
  thisWeek: 'Ọ̀sẹ̀ Yìí',
  totalExpenses: 'Lapapọ̀ Owó jáde',
  loadMoreActivity: 'Gbé Àwọn Iṣe Miíràn Wá',
  },
  igbo: {
    salesRevenue: 'Ego Ahịa',
    serviceIncome: 'Ego Ọrụ',
    foodSupplies: 'Ngwa Nri',
    transportation: 'Mbupu',
    taxPayment: 'Ịkwụ Ụtụ Isi',
    vatReturnFiled: 'Etinyela VAT',

    recentActivity: 'Ihe Omume Na-adịbeghị Anya',
  searchTransactions: 'Chọọ azụmahịa...',

  all: 'Niile',
  income: 'Ego Mbata',
  expense: 'Ego Mmefu',
  payment: 'Ịkwụ Ụgwọ',
  filing: 'Ntinye Akwụkwọ',

  totalIncome: 'Ngụkọta Ego Mbata',
  thisWeek: 'Izu A',
  totalExpenses: 'Ngụkọta Ego Mmefu',
  loadMoreActivity: 'Bulite Ihe Omume Ọzọ',
  }
}

interface RecentActivityProps {
  onNavigate: (screen: string) => void;
}

export function RecentActivity({ onNavigate }: RecentActivityProps) {
  const [filter, setFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'income',
      categoryKey: 'salesRevenue',
      amount: 25000,
      date: 'Dec 13, 2025',
      time: '2:30 PM',
      status: 'complete',
      icon: TrendingUp,
      reference: 'INV-2025-001',
    },
    {
      id: 2,
      type: 'payment',
      categoryKey: 'taxPayment',
      amount: 13000,
      date: 'Dec 13, 2025',
      time: '11:15 AM',
      status: 'complete',
      icon: CreditCard,
      reference: 'TXN-54321',
    },
    {
      id: 3,
      type: 'expense',
      categoryKey: 'foodSupplies',
      amount: 5000,
      date: 'Dec 12, 2025',
      time: '4:20 PM',
      status: 'complete',
      icon: TrendingDown,
      reference: 'EXP-2025-042',
    },
    {
      id: 4,
      type: 'filing',
      categoryKey: 'vatReturnFiled',
      amount: 0,
      date: 'Dec 12, 2025',
      time: '10:00 AM',
      status: 'complete',
      icon: FileText,
      reference: 'VAT-Q4-2025',
    },
    {
      id: 5,
      type: 'income',
      categoryKey: 'serviceIncome',
      amount: 30000,
      date: 'Dec 10, 2025',
      time: '1:45 PM',
      status: 'complete',
      icon: TrendingUp,
      reference: 'INV-2025-002',
    },
    {
      id: 6,
      type: 'expense',
      categoryKey: 'transportation',
      amount: 8000,
      date: 'Dec 9, 2025',
      time: '9:30 AM',
      status: 'complete',
      icon: TrendingDown,
      reference: 'EXP-2025-041',
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'income': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'expense': return 'bg-red-50 text-red-600 border-red-100';
      case 'payment': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'filing': return 'bg-purple-50 text-purple-600 border-purple-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const filteredActivities = filter === 'all'
    ? activities
    : activities.filter(a => a.type === filter);

  const { language } = useLanguage();
  const t = translations[language];

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
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all -ml-2"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg">{translations[language].recentActivity}</h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={translations[language].searchTransactions}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2">
  {['all', 'income', 'expense', 'payment', 'filing'].map((type) => (
    <button
      key={type}
      onClick={() => setFilter(type)}
      className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
        filter === type
          ? 'bg-emerald-600 text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {translations[language][type]}
    </button>
  ))}
</div>
      </div>

      {/* Summary Cards */}
      <div className="px-6 py-6 grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-50 rounded-xl p-4 border border-emerald-200"
        >
          <p className="text-xs text-emerald-700 mb-1">{translations[language].totalIncome}</p>
          <p className="text-xl text-emerald-600">₦55,000</p>
          <p className="text-xs text-emerald-600 mt-1">{translations[language].thisWeek}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-red-50 rounded-xl p-4 border border-red-200"
        >
          <p className="text-xs text-red-700 mb-1">{translations[language].totalExpenses}</p>
          <p className="text-xl text-red-600">₦13,000</p>
          <p className="text-xs text-red-600 mt-1">{translations[language].thisWeek}</p>
        </motion.div>
      </div>

      {/* Activity Timeline */}
      <div className="px-6 space-y-4 pb-6">
        {filteredActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative"
          >
            {/* Timeline line */}
            {index !== filteredActivities.length - 1 && (
              <div className="absolute left-6 top-16 bottom-0 w-px bg-gray-200 -mb-4" />
            )}

            {/* Activity Card */}
            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 border ${getTypeColor(activity.type)}`}>
                  <activity.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1">
                      <h3 className="text-sm mb-0.5">{activity.categoryKey}</h3>
                      <p className="text-xs text-gray-500">{activity.reference}</p>
                    </div>
                    {activity.amount > 0 && (
                      <p className={`text-sm ${activity.type === 'income' ? 'text-emerald-600' : 'text-gray-900'
                        }`}>
                        {activity.type === 'income' ? '+' : '-'}₦{activity.amount.toLocaleString()}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{activity.date}</span>
                    </div>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-xs">
                      ✓ {activity.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="px-6 pb-6">
        <button className="w-full py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-sm text-gray-600">
        {translations[language].loadMoreActivity}
        </button>
      </div>
    </div>
  );
}
