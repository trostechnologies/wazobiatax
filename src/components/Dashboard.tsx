import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '@/utils/storage';
import { getUserProfile } from '../services/auth';
import {
  Bell,
  Calculator,
  TrendingDown,
  FileText,
  CreditCard,
  PlusCircle,
  Camera,
  Mic,
  BarChart3,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  english: {
    complianceScore: "Compliance Score",
    complianceStatus: "Your current tax compliance status",
    needsAttention: "Needs Attention",
    percentageThisMonth: "-2% this month",
    completePendingTasks: "Complete {pendingTasks} pending tasks to reach 70%",
    tasksPending: "{pendingTasks} tasks pending",
    viewActionItems: "View Action Items",
    // Quick Actions
    fileReturn: "File Return",
    payTax: "Pay Tax",
    logTransaction: "Log Transaction",
    scanReceipt: "Scan Receipt",
    voiceAdd: "Voice Add",
    viewReports: "View Reports",

    // Recent Activity descriptions
    foodSupplies: "Food Supplies",
    salesRevenue: "Sales Revenue",
    vatPayment: "VAT Payment",

    // Time labels
    hoursAgo: "{time}h ago",
    daysAgo: "{time}d ago",

    // Deadlines
    vatReturnDue: "VAT Return Due",
    incomeTaxFiling: "Income Tax Filing",
    quarterlyReview: "Quarterly Review",
    daysLeft: "{days} days left",
    upcomingDeadlines: "Upcoming Deadlines",
    viewAll: "View All",
    quickActions: "Quick Actions",
    manageTaxObligations: "Manage your tax obligations",
    recentActivity: "Recent Activity",
  },
  pidgin: {
    complianceScore: "Compliance Score",
    complianceStatus: "How your tax dey currently",
    needsAttention: "Need Small Check",
    percentageThisMonth: "-2% dis month",
    completePendingTasks: "Finish {pendingTasks} pending task make reach 70%",
    tasksPending: "{pendingTasks} task still dey",
    viewActionItems: "See Wetin You Get Do",
    fileReturn: "File Return",
    payTax: "Pay Tax",
    logTransaction: "Log Transaction",
    scanReceipt: "Scan Receipt",
    voiceAdd: "Voice Add",
    viewReports: "View Reports",

    foodSupplies: "Food Supply",
    salesRevenue: "Sales Money",
    vatPayment: "VAT Payment",

    hoursAgo: "{time}h ago",
    daysAgo: "{time}d ago",

    vatReturnDue: "VAT Return Dey Due",
    incomeTaxFiling: "Income Tax Filing",
    quarterlyReview: "Quarterly Review",
    daysLeft: "{days} days remain",
    upcomingDeadlines: "Upcoming Deadlines",
    viewAll: "See Everything",
    quickActions: "Quick Actions",
    manageTaxObligations: "Manage your tax matter",
    recentActivity: "New Activity",
  },
  hausa: {
    complianceScore: "Matsayin Bin Ka'ida",
    complianceStatus: "Matsayin bin ka'idojin haraji na yanzu",
    needsAttention: "Na Bukatar Kulawa",
    percentageThisMonth: "-2% wannan wata",
    completePendingTasks: "Kammala {pendingTasks} ayyuka masu jiran aiki don kai 70%",
    tasksPending: "{pendingTasks} ayyuka na jiran aiki",
    viewActionItems: "Duba Ayyukan da Za a Yi",
    fileReturn: "Gabatar da Rahoton Haraji",
    payTax: "Biya Haraji",
    logTransaction: "Rubuta Ma'amala",
    scanReceipt: "Duba Rasiti",
    voiceAdd: "Shigar da Murya",
    viewReports: "Duba Rahotanni",

    foodSupplies: "Kayan Abinci",
    salesRevenue: "Kuɗin Tallace-tallace",
    vatPayment: "Biyan VAT",

    hoursAgo: "Awanni {time} da suka wuce",
    daysAgo: "Kwanaki {time} da suka wuce",

    vatReturnDue: "Lokacin VAT Ya Yi",
    incomeTaxFiling: "Gabatar da Harajin Kuɗin Shiga",
    quarterlyReview: "Binciken Kwata",
    daysLeft: "Kwanaki {days} sun rage",
    upcomingDeadlines: "Lokutan Ƙarshe Masu Zuwa",
    viewAll: "Duba Duka",
    quickActions: "Ayyuka Masu Sauri",
    manageTaxObligations: "Gudanar da wajibcin haraji naka",
    recentActivity: "Ayyukan Kwanan Nan",
  },
  igbo: {
    complianceScore: "Mkpọtụrụ Iwu",
    complianceStatus: "Ozi gbasara otú ị na-eso ụtụ isi ugbu a",
    needsAttention: "Chọrọ Nlebara Anya",
    percentageThisMonth: "-2% n’ọnwa a",
    completePendingTasks: "Mecha ọrụ {pendingTasks} ndị ka nọ iji ruo 70%",
    tasksPending: "ọrụ {pendingTasks} ka dị",
    viewActionItems: "Lee Ihe Ndị A Ga-eme",
    fileReturn: "Tinye Akwụkwọ Ụtụ",
    payTax: "Kwụ Ụtụ",
    logTransaction: "Debe Mmefu",
    scanReceipt: "Lelee Rẹsịtụ",
    voiceAdd: "Tinye Olu",
    viewReports: "Lee Akụkọ",

    foodSupplies: "Ngwa Nri",
    salesRevenue: "Ego Ahịa",
    vatPayment: "Ịkwụ VAT",

    hoursAgo: "awa {time} gara aga",
    daysAgo: "ụbọchị {time} gara aga",

    vatReturnDue: "VAT Erugo Oge",
    incomeTaxFiling: "Ntinye Ụtụ Ego",
    quarterlyReview: "Nyocha Kwaatọ",
    daysLeft: "Ụbọchị {days} fọdụrụ",
    upcomingDeadlines: "Ụbọchị Mmechi Na-abịa",
    viewAll: "Lee Ha Nille",
    quickActions: "Omume Ngwa Ngwa",
    manageTaxObligations: "Jikwaa ọrụ ụtụ isi gị",
    recentActivity: "Ihe Omume Na-adịbeghị Anya",
  },
  yoruba: {
    complianceScore: "Àwọ̀n Ìfarahan Ìbámu",
    complianceStatus: "Ìpò ìbámu owo-ori rẹ lónìí",
    needsAttention: "Nílò Ìtójú",
    percentageThisMonth: "-2% oṣù yìí",
    completePendingTasks: "Parí iṣẹ́ {pendingTasks} tó kù láti dé 70%",
    tasksPending: "iṣẹ́ {pendingTasks} tó kù",
    viewActionItems: "Wo Àwọn Ìṣe Látàrí",
    fileReturn: "Fí Iroyin Owo-ori",
    payTax: "San Owo-ori",
    logTransaction: "Forúkọ Ìdúnáwò",
    scanReceipt: "Ṣàyẹ̀wò Rẹ́sítì",
    voiceAdd: "Fikun-un Ohùn",
    viewReports: "Wo Àwọn Iroyin",

    foodSupplies: "Ohun Èlò Oúnjẹ",
    salesRevenue: "Owó Títà",
    vatPayment: "Sísan VAT",

    hoursAgo: "wákàtí {time} sẹ́yìn",
    daysAgo: "ọjọ́ {time} sẹ́yìn",

    vatReturnDue: "VAT Gbọdọ̀ Wáyé",
    incomeTaxFiling: "Ìforúkọsílẹ̀ Owo-ori",
    quarterlyReview: "Àyẹ̀wò Kọ́tà",
    daysLeft: "Ọjọ́ {days} kù",
    upcomingDeadlines: "Àwọn Ọjọ́ Ìparí Tó ń Bọ̀",
    viewAll: "Wo Gbogbo",
    quickActions: "Àwọn Ìṣe Kíákíá",
    manageTaxObligations: "Ṣàkóso àwọn ojúṣe owó-ori rẹ",
    recentActivity: "Ìṣe Tó ṣẹ̀ṣẹ̀",
  },
};

export function Dashboard() {
  const [notificationCount] = useState(3);
  const complianceScore = 50;
  const pendingTasks = 3;
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();
  const user = getUser();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const quickActions = [
    { id: 'file', labelKey: 'fileReturn', icon: FileText, color: 'bg-blue-50 text-blue-600', screen: '/file-returns' },
    { id: 'pay', labelKey: 'payTax', icon: CreditCard, color: 'bg-emerald-50 text-emerald-600', screen: '/pay-tax' },
    { id: 'log', labelKey: 'logTransaction', icon: PlusCircle, color: 'bg-gray-50 text-gray-600', screen: '/ledger' },
    { id: 'scan', labelKey: 'scanReceipt', icon: Camera, color: 'bg-purple-50 text-purple-600', screen: '/ledger' },
    { id: 'voice', labelKey: 'voiceAdd', icon: Mic, color: 'bg-blue-50 text-blue-600', screen: '/ledger' },
    { id: 'reports', labelKey: 'viewReports', icon: BarChart3, color: 'bg-amber-50 text-amber-600', screen: '/activity' },
  ];

  const recentActivity = [
    { id: 1, type: 'expense', amount: '₦5,000', descKey: 'foodSupplies', status: 'complete', time: { value: 2, unit: 'hours' } },
    { id: 2, type: 'income', amount: '₦25,000', descKey: 'salesRevenue', status: 'complete', time: { value: 5, unit: 'hours' } },
    { id: 3, type: 'payment', amount: '₦10,000', descKey: 'vatPayment', status: 'pending', time: { value: 1, unit: 'days' } },
  ];

  const upcomingDeadlines = [
    { id: 1, titleKey: 'vatReturnDue', days: 2, priority: 'high' },
    { id: 2, titleKey: 'incomeTaxFiling', days: 15, priority: 'medium' },
    { id: 3, titleKey: 'quarterlyReview', days: 28, priority: 'low' },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile();
        setCurrentUser(res.data); // <-- API response shape
        console.log('user data', res.data)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // if (loading) return <p className='italic'>Loading...</p>;

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
      <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg">wazobiatax.ng</h1>
            <p className="text-xs text-gray-500">{loading ? "Loading..." : user?.business_name || currentUser.business_name}</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/notifications')}
          className="relative p-2 hover:bg-gray-100 rounded-lg transition-all"
        >
          <Bell className="w-6 h-6 text-gray-700" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Compliance Score Card - Improved */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <AnimatePresence mode="wait">
                <motion.h2
                  key={language} // re-animate on language change or step change
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="text-lg mb-1"
                >
                  {translations[language].complianceScore}
                </motion.h2>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.p
                  key={language}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="text-sm text-gray-600"
                >
                  {translations[language].complianceStatus}
                </motion.p>
              </AnimatePresence>
            </div>
            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">
              {translations[language].needsAttention}
            </span>
          </div>

          <div className="flex items-center gap-6 mb-4">
            {/* Circular Progress */}
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <motion.circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#F59E0B"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - complianceScore / 100) }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl text-gray-900">{complianceScore}%</span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-600">
                  {translations[language].percentageThisMonth}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                {translations[language].completePendingTasks.replace("{pendingTasks}", String(pendingTasks))}
              </p>
              <div className="flex items-center gap-2">
                <div className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs">
                  {translations[language].tasksPending.replace("{pendingTasks}", String(pendingTasks))}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/deadlines')}
            className="w-full py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all text-sm"
          >
            {translations[language].viewActionItems}
          </button>
        </motion.div>

        {/* Upcoming Deadlines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg">{translations[language].upcomingDeadlines}</h3>
            <button
              onClick={() => navigate('/deadlines')}
              className="text-sm text-emerald-600 hover:underline"
            >
              {translations[language].viewAll}
            </button>
          </div>
          <div className="space-y-2">
            {upcomingDeadlines.slice(0, 3).map((deadline, index) => (
              <motion.div
                key={deadline.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className={`bg-white rounded-xl p-4 border-l-4 ${deadline.priority === 'high' ? 'border-red-500' :
                  deadline.priority === 'medium' ? 'border-amber-500' :
                    'border-blue-500'
                  } shadow-sm hover:shadow-md transition-all cursor-pointer`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${deadline.priority === 'high' ? 'bg-red-500' :
                      deadline.priority === 'medium' ? 'bg-amber-500' :
                        'bg-blue-500'
                      }`} />
                    <div>
                      <p className="text-sm">{translations[language][deadline.titleKey]}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <p className="text-xs text-gray-500">{translations[language].daysLeft.replace('{days}', String(deadline.days))}</p>
                      </div>
                    </div>
                  </div>
                  {deadline.days <= 3 && (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions - Expanded */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg mb-3">{translations[language].quickActions}</h3>
          <p className="text-sm text-gray-600 mb-4">{translations[language].manageTaxObligations}</p>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(action.screen)}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-2 border border-gray-100"
              >
                <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center`}>
                  <action.icon className="w-6 h-6" />
                </div>

                <span className="text-xs text-center text-gray-700">
                  {translations[language][action.labelKey]}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg">{translations[language].recentActivity}</h3>
            <button
              onClick={() => navigate('/activity')}
              className="text-sm text-emerald-600 hover:underline"
            >
              {translations[language].viewAll}
            </button>
          </div>
          <div className="space-y-2">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity.type === 'expense' ? 'bg-red-50' :
                      activity.type === 'income' ? 'bg-emerald-50' :
                        'bg-blue-50'
                      }`}>
                      {activity.status === 'complete' ? (
                        <CheckCircle2 className={`w-5 h-5 ${activity.type === 'expense' ? 'text-red-600' :
                          activity.type === 'income' ? 'text-emerald-600' :
                            'text-blue-600'
                          }`} />
                      ) : (
                        <Clock className="w-5 h-5 text-amber-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm">{translations[language][activity.descKey]}</p>
                      <p className="text-xs text-gray-500">{translations[language][
                        activity.time.unit === 'hours' ? 'hoursAgo' : 'daysAgo'
                      ].replace('{time}', String(activity.time.value))}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm ${activity.type === 'income' ? 'text-emerald-600' : 'text-gray-900'
                      }`}>
                      {activity.amount}
                    </p>
                    {activity.status === 'complete' && (
                      <span className="text-xs text-emerald-600">✓</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
