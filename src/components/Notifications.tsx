import { motion } from 'motion/react';
import { ArrowLeft, Bell, AlertCircle, CheckCircle2, Info, Settings, RefreshCw, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { type LanguageKey } from '../translations/profile';
import { getNotifications, type Notification } from '../services/notifications';

interface NotificationsProps {
  language?: LanguageKey;
}

const translations = {
  english: {
    notifications: 'Notifications',
    markAllRead: 'Mark all read',
    all: 'All',
    unread: 'Unread',
    notificationPreferences: 'Notification Preferences',
    pushNotifications: 'Push Notifications',
    smsAlerts: 'SMS Alerts',
    emailNotifications: 'Email Notifications',
    loading: 'Loading notifications...',
    errorLoading: 'Failed to load notifications',
    retry: 'Retry',
    noNotifications: 'No notifications yet',
    noUnread: 'No unread notifications',
  },
  pidgin: {
    notifications: 'Notifications',
    markAllRead: 'Mark all as read',
    all: 'All',
    unread: 'Unread',
    notificationPreferences: 'Notification Preferences',
    pushNotifications: 'Push Notifications',
    smsAlerts: 'SMS Alerts',
    emailNotifications: 'Email Notifications',
    loading: 'Dey load notifications...',
    errorLoading: 'E no fit load notifications',
    retry: 'Try again',
    noNotifications: 'No notification dey yet',
    noUnread: 'No unread notification dey',
  },
  hausa: {
    notifications: 'Sanarwa',
    markAllRead: 'Alama duka an karanta',
    all: 'Duka',
    unread: 'Ba a karanta ba',
    notificationPreferences: 'Zaɓuɓɓukan Sanarwa',
    pushNotifications: 'Sanarwar Turawa',
    smsAlerts: 'Faɗakarwar SMS',
    emailNotifications: 'Sanarwar Imel',
    loading: 'Ana loda sanarwa...',
    errorLoading: 'An kasa loda sanarwa',
    retry: 'Sake gwadawa',
    noNotifications: 'Babu sanarwa tukuna',
    noUnread: 'Babu sanarwa da ba a karanta ba',
  },
  yoruba: {
    notifications: 'Ìkìlọ̀',
    markAllRead: 'Samisi gbogbo wọn gẹ́gẹ́ bí a ti ka',
    all: 'Gbogbo',
    unread: 'Tí a kò tíì ka',
    notificationPreferences: 'Àyànfẹ́ Ìkìlọ̀',
    pushNotifications: 'Ìkìlọ̀ Fífi Ránṣẹ́',
    smsAlerts: 'Ìkìlọ̀ SMS',
    emailNotifications: 'Ìkìlọ̀ Ímẹ́lì',
    loading: 'Ìkìlọ̀ ń gbé wọlé...',
    errorLoading: 'Kò lè gbé ìkìlọ̀ wọlé',
    retry: 'Gbìyànjú lẹ́ẹ̀kan sí',
    noNotifications: 'Kò sí ìkìlọ̀ kankan',
    noUnread: 'Kò sí ìkìlọ̀ tí a kò tíì ka',
  },
  igbo: {
    notifications: 'Ọkwa',
    markAllRead: 'Kaa ha niile',
    all: 'Niile',
    unread: 'A gụghị',
    notificationPreferences: 'Nhọrọ Ọkwa',
    pushNotifications: 'Ọkwa Ntughari',
    smsAlerts: 'Ọkwa SMS',
    emailNotifications: 'Ọkwa Email',
    loading: 'Na-ebubata ọkwa...',
    errorLoading: 'Enweghị ike ibubata ọkwa',
    retry: 'Nwaa ọzọ',
    noNotifications: 'Ọ dịghị ọkwa ọ bụla',
    noUnread: 'Ọ dịghị ọkwa a gụghị',
  },
};

/**
 * Compute a human-friendly relative time string from an ISO timestamp.
 */
function getRelativeTime(isoDate: string): string {
  const now = new Date();
  const then = new Date(isoDate);
  const diffMs = now.getTime() - then.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 30) return `${diffDay}d ago`;
  return then.toLocaleDateString();
}

/**
 * Map notification_type from the API to an icon type for styling.
 */
function mapNotificationType(notificationType: string): 'alert' | 'success' | 'info' | 'system' {
  switch (notificationType) {
    case 'subscription':
    case 'payment':
      return 'success';
    case 'alert':
    case 'deadline':
      return 'alert';
    case 'system':
      return 'info';
    default:
      return 'info';
  }
}

export function Notifications({ language = 'english' }: NotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const t = translations[language];
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNotifications();
      setNotifications(data.notifications);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
      setError(t.errorLoading);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, is_read: true })));
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

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.is_read)
    : notifications;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Status Bar */}
      <div className="h-11 bg-emerald-600 flex items-center justify-between px-6 text-white text-sm">

      </div>

      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all -ml-2"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-lg">{t.notifications}</h1>
          </div>
          <button
            onClick={handleMarkAllRead}
            className="text-sm text-emerald-600 hover:underline"
          >
            {t.markAllRead}
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm transition-all ${filter === 'all'
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {t.all}
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm transition-all ${filter === 'unread'
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {t.unread}
          </button>
          <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-6 space-y-3">
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
            <p className="text-sm text-gray-500">{t.loading}</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <AlertCircle className="w-10 h-10 text-red-400" />
            <p className="text-sm text-gray-600">{error}</p>
            <button
              onClick={fetchNotifications}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              {t.retry}
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredNotifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Bell className="w-10 h-10 text-gray-300" />
            <p className="text-sm text-gray-500">
              {filter === 'unread' ? t.noUnread : t.noNotifications}
            </p>
          </div>
        )}

        {/* Notification Items */}
        {!loading && !error && filteredNotifications.map((notification, index) => {
          const uiType = mapNotificationType(notification.notification_type);
          const Icon = getIcon(uiType);
          const colorClass = getColor(uiType);

          return (
            <motion.button
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => notification.action_url ? navigate(notification.action_url) : undefined}
              className={`w-full p-4 rounded-xl transition-all text-left ${notification.is_read
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
                    {!notification.is_read && (
                      <div className="w-2 h-2 bg-emerald-600 rounded-full flex-shrink-0 mt-1" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                  <p className="text-xs text-gray-400">{getRelativeTime(notification.created_at)}</p>
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
            {t.notificationPreferences}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{t.pushNotifications}</span>
              <div className="w-12 h-6 bg-emerald-600 rounded-full relative">
                <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{t.smsAlerts}</span>
              <div className="w-12 h-6 bg-emerald-600 rounded-full relative">
                <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{t.emailNotifications}</span>
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
