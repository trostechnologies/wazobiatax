import { motion } from 'motion/react';
import { ArrowLeft, Bell, AlertCircle, CheckCircle2, Info, Settings } from 'lucide-react';
import { useState } from 'react';

interface NotificationsProps {
  onNavigate: (screen: string) => void;
}

export function Notifications({ onNavigate }: NotificationsProps) {
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      type: 'alert', 
      title: 'Deadline Alert: VAT Return', 
      message: 'Your VAT return is due in 2 days. File now to avoid penalties.', 
      time: '2h ago',
      read: false,
      action: 'fileReturns'
    },
    { 
      id: 2, 
      type: 'success', 
      title: 'Payment Confirmed', 
      message: 'Your tax payment of ₦13,000 has been successfully processed.', 
      time: '5h ago',
      read: false,
      action: 'payTax'
    },
    { 
      id: 3, 
      type: 'info', 
      title: 'New Tax Education Content', 
      message: 'Learn about the latest NTAA 2025 compliance requirements.', 
      time: '1d ago',
      read: true,
      action: 'education'
    },
    { 
      id: 4, 
      type: 'alert', 
      title: 'Compliance Score Update', 
      message: 'Your compliance score decreased by 2%. Complete pending tasks.', 
      time: '2d ago',
      read: true,
      action: 'upcomingDeadlines'
    },
    { 
      id: 5, 
      type: 'success', 
      title: 'TIN Verified', 
      message: 'Your Tax Identification Number has been verified by FIRS.', 
      time: '3d ago',
      read: true,
      action: 'profile'
    },
  ]);

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert': return AlertCircle;
      case 'success': return CheckCircle2;
      case 'info': return Info;
      default: return Bell;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'alert': return 'bg-red-50 text-red-600 border-red-100';
      case 'success': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'info': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all -ml-2"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-lg">Notifications</h1>
          </div>
          <button 
            onClick={handleMarkAllRead}
            className="text-sm text-emerald-600 hover:underline"
          >
            Mark all read
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <button className="flex-1 py-2 px-4 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-all">
            All
          </button>
          <button className="flex-1 py-2 px-4 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-all">
            Unread
          </button>
          <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-6 space-y-3">
        {notifications.map((notification, index) => {
          const Icon = getIcon(notification.type);
          const colorClass = getColor(notification.type);
          
          return (
            <motion.button
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onNavigate(notification.action)}
              className={`w-full p-4 rounded-xl transition-all text-left ${
                notification.read 
                  ? 'bg-white border border-gray-200 hover:shadow-md' 
                  : 'bg-white border-2 border-emerald-200 shadow-md hover:shadow-lg'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border ${colorClass}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm pr-2">{notification.title}</h3>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-emerald-600 rounded-full flex-shrink-0 mt-1" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                  <p className="text-xs text-gray-400">{notification.time}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Notification Preferences */}
      <div className="px-6 pb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="text-sm mb-3 flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600" />
            Notification Preferences
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Push Notifications</span>
              <div className="w-12 h-6 bg-emerald-600 rounded-full relative">
                <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">SMS Alerts</span>
              <div className="w-12 h-6 bg-emerald-600 rounded-full relative">
                <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Email Notifications</span>
              <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
