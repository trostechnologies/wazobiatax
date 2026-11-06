import { motion } from 'motion/react';
import { ArrowLeft, Clock, Monitor, Smartphone, Globe, RefreshCw, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoginHistory, type LoginHistoryEntry } from '../services/auth';

interface LoginHistoryProps {
  language?: string;
}

function parseUserAgent(ua: string): { icon: typeof Monitor; label: string } {
  const lower = ua.toLowerCase();
  if (lower.includes('mobile') || lower.includes('android') || lower.includes('iphone')) {
    return { icon: Smartphone, label: 'Mobile Device' };
  }
  if (lower.includes('postman')) {
    return { icon: Globe, label: 'API Client (Postman)' };
  }
  if (lower.includes('chrome')) return { icon: Monitor, label: 'Chrome Browser' };
  if (lower.includes('firefox')) return { icon: Monitor, label: 'Firefox Browser' };
  if (lower.includes('safari')) return { icon: Monitor, label: 'Safari Browser' };
  if (lower.includes('edge')) return { icon: Monitor, label: 'Edge Browser' };
  return { icon: Monitor, label: ua.length > 30 ? ua.slice(0, 30) + '…' : ua };
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatFullDate(iso: string): string {
  return new Date(iso).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function LoginHistory({ language = 'english' }: LoginHistoryProps) {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<LoginHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLoginHistory();
      setEntries(data.login_history || []);
    } catch (err: any) {
      console.error('Failed to load login history:', err);
      setError(
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        'Unable to load login history. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Status Bar */}
      <div className="h-11 bg-emerald-600 flex items-center justify-between px-6 text-white text-sm" />

      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 px-6 pt-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/security-and-privacy')}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-lg flex-1 text-center">Login History</h1>
          <button
            onClick={fetchHistory}
            disabled={loading}
            className="p-2 hover:bg-white/10 rounded-lg transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 text-white ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        <p className="text-emerald-100 text-center text-sm">
          Review recent sign-in activity on your account
        </p>
      </div>

      {/* Content */}
      <div className="px-6 -mt-4">
        {/* Loading */}
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center"
          >
            <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin mb-3" />
            <p className="text-sm text-gray-500">Loading login history…</p>
          </motion.div>
        )}

        {/* Error */}
        {!loading && error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center"
          >
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-7 h-7 text-red-500" />
            </div>
            <p className="text-sm text-gray-700 mb-4">{error}</p>
            <button
              onClick={fetchHistory}
              className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm hover:bg-emerald-700 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* Empty */}
        {!loading && !error && entries.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center"
          >
            <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-7 h-7 text-emerald-500" />
            </div>
            <p className="text-sm text-gray-600">No login activity found</p>
          </motion.div>
        )}

        {/* Entries */}
        {!loading && !error && entries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-xs text-gray-500 uppercase tracking-wide">
                {entries.length} {entries.length === 1 ? 'Session' : 'Sessions'}
              </h3>
            </div>

            {entries.map((entry, index) => {
              const { icon: DeviceIcon, label: deviceLabel } = parseUserAgent(entry.user_agent);
              const isExpanded = expandedId === entry.id;

              return (
                <motion.button
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                  className={`w-full px-6 py-4 flex items-start gap-4 hover:bg-gray-50 transition-all text-left ${
                    index !== entries.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    index === 0 ? 'bg-emerald-100' : 'bg-gray-100'
                  }`}>
                    <DeviceIcon className={`w-5 h-5 ${
                      index === 0 ? 'text-emerald-600' : 'text-gray-500'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{deviceLabel}</h4>
                      <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                        {formatDate(entry.created_at)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">
                      IP: {entry.ip_address}
                    </p>

                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-2 pt-2 border-t border-gray-100 space-y-1"
                      >
                        <p className="text-xs text-gray-400">
                          <span className="text-gray-500">Full User Agent:</span>{' '}
                          {entry.user_agent}
                        </p>
                        <p className="text-xs text-gray-400">
                          <span className="text-gray-500">Date:</span>{' '}
                          {formatFullDate(entry.created_at)}
                        </p>
                      </motion.div>
                    )}

                    {index === 0 && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] rounded-full font-medium">
                        Most recent
                      </span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
