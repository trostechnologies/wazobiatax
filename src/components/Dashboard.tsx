import { motion } from 'motion/react';
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
import { useState } from 'react';

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [notificationCount] = useState(3);
  const complianceScore = 50;
  const pendingTasks = 3;

  const quickActions = [
    { id: 'file', label: 'File Return', icon: FileText, color: 'bg-blue-50 text-blue-600', screen: 'fileReturns' },
    { id: 'pay', label: 'Pay Tax', icon: CreditCard, color: 'bg-emerald-50 text-emerald-600', screen: 'payTax' },
    { id: 'log', label: 'Log Transaction', icon: PlusCircle, color: 'bg-gray-50 text-gray-600', screen: 'ledger' },
    { id: 'scan', label: 'Scan Receipt', icon: Camera, color: 'bg-purple-50 text-purple-600', screen: 'ledger' },
    { id: 'voice', label: 'Voice Add', icon: Mic, color: 'bg-blue-50 text-blue-600', screen: 'ledger' },
    { id: 'reports', label: 'View Reports', icon: BarChart3, color: 'bg-amber-50 text-amber-600', screen: 'recentActivity' },
  ];

  const recentActivity = [
    { id: 1, type: 'expense', amount: '₦5,000', desc: 'Food Supplies', status: 'complete', time: '2h ago' },
    { id: 2, type: 'income', amount: '₦25,000', desc: 'Sales Revenue', status: 'complete', time: '5h ago' },
    { id: 3, type: 'payment', amount: '₦10,000', desc: 'VAT Payment', status: 'pending', time: '1d ago' },
  ];

  const upcomingDeadlines = [
    { id: 1, title: 'VAT Return Due', days: 2, priority: 'high' },
    { id: 2, title: 'Income Tax Filing', days: 15, priority: 'medium' },
    { id: 3, title: 'Quarterly Review', days: 28, priority: 'low' },
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
      <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg">wazobiatax.ng</h1>
            <p className="text-xs text-gray-500">Bukka Restaurant</p>
          </div>
        </div>
        <button 
          onClick={() => onNavigate('notifications')}
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
              <h2 className="text-lg mb-1">Compliance Score</h2>
              <p className="text-sm text-gray-600">Your current tax compliance status</p>
            </div>
            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">
              Needs Attention
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
                <span className="text-sm text-red-600">-2% this month</span>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Complete <span className="text-emerald-600">{pendingTasks} pending tasks</span> to reach 70%
              </p>
              <div className="flex items-center gap-2">
                <div className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs">
                  {pendingTasks} tasks pending
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => onNavigate('upcomingDeadlines')}
            className="w-full py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all text-sm"
          >
            View Action Items
          </button>
        </motion.div>

        {/* Upcoming Deadlines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg">Upcoming Deadlines</h3>
            <button 
              onClick={() => onNavigate('upcomingDeadlines')}
              className="text-sm text-emerald-600 hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-2">
            {upcomingDeadlines.slice(0, 3).map((deadline, index) => (
              <motion.div
                key={deadline.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className={`bg-white rounded-xl p-4 border-l-4 ${
                  deadline.priority === 'high' ? 'border-red-500' : 
                  deadline.priority === 'medium' ? 'border-amber-500' : 
                  'border-blue-500'
                } shadow-sm hover:shadow-md transition-all cursor-pointer`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      deadline.priority === 'high' ? 'bg-red-500' : 
                      deadline.priority === 'medium' ? 'bg-amber-500' : 
                      'bg-blue-500'
                    }`} />
                    <div>
                      <p className="text-sm">{deadline.title}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <p className="text-xs text-gray-500">{deadline.days} days left</p>
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
          <h3 className="text-lg mb-3">Quick Actions</h3>
          <p className="text-sm text-gray-600 mb-4">Manage your tax obligations</p>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(action.screen)}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-2 border border-gray-100"
              >
                <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <span className="text-xs text-center text-gray-700">{action.label}</span>
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
            <h3 className="text-lg">Recent Activity</h3>
            <button 
              onClick={() => onNavigate('recentActivity')}
              className="text-sm text-emerald-600 hover:underline"
            >
              View All
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
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      activity.type === 'expense' ? 'bg-red-50' : 
                      activity.type === 'income' ? 'bg-emerald-50' : 
                      'bg-blue-50'
                    }`}>
                      {activity.status === 'complete' ? (
                        <CheckCircle2 className={`w-5 h-5 ${
                          activity.type === 'expense' ? 'text-red-600' : 
                          activity.type === 'income' ? 'text-emerald-600' : 
                          'text-blue-600'
                        }`} />
                      ) : (
                        <Clock className="w-5 h-5 text-amber-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm">{activity.desc}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm ${
                      activity.type === 'income' ? 'text-emerald-600' : 'text-gray-900'
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
