import { motion } from 'motion/react';
import {
    ArrowLeft,
    Download,
    Filter,
    CreditCard,
    CheckCircle2,
    Clock,
    XCircle,
    RefreshCw,
    Calendar,
    Receipt,
    TrendingUp
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileTranslations, type LanguageKey } from '../translations/profile';
import { getTransactionHistory, type Transaction } from '../services/subscriptions';

interface SubscriptionHistoryProps {
    language?: LanguageKey;
}

export function SubscriptionHistory({ language = 'english' }: SubscriptionHistoryProps) {
    const t = profileTranslations[language].subscriptionHistory;
    const [filterStatus, setFilterStatus] = useState<'all' | 'success' | 'pending' | 'failed'>('all');
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                const response = await getTransactionHistory();
                setTransactions(response.data);
                setError(null);
            } catch (err: any) {
                console.error('Error fetching transaction history:', err);
                setError(err.message || 'Failed to load transaction history');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const filteredTransactions = transactions.filter(transaction => {
        if (filterStatus === 'all') return true;
        return transaction.status === filterStatus;
    });

    const totalPaid = transactions
        .filter(t => t.status === 'success')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'success':
                return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
            case 'pending':
                return 'bg-amber-100 text-amber-700 border border-amber-200';
            case 'failed':
                return 'bg-red-100 text-red-700 border border-red-200';
            default:
                return 'bg-gray-100 text-gray-700 border border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'success':
                return <CheckCircle2 className="w-3 h-3" />;
            case 'pending':
                return <Clock className="w-3 h-3" />;
            case 'failed':
                return <XCircle className="w-3 h-3" />;
            default:
                return <RefreshCw className="w-3 h-3" />;
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'success':
                return t.paid;
            case 'pending':
                return t.pending;
            case 'failed':
                return t.failed;
            default:
                return status;
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const months = [t.jan, t.feb, t.mar, t.apr, t.may, t.jun, t.jul, t.aug, t.sep, t.oct, t.nov, t.dec];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Status Bar */}
            <div className="h-11 bg-emerald-600 flex items-center justify-between px-6 text-white text-sm">

            </div>

            {/* Header */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 px-6 pt-4 pb-8">
                <div className="flex items-center gap-4 mb-6 pt-6">
                    <button
                        onClick={() => navigate('/profile')}
                        className="p-2 hover:bg-white/10 rounded-lg transition-all"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-white text-xl">{t.title}</h1>
                        <p className="text-emerald-100 text-sm mt-1">{t.subtitle}</p>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-3">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-4"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-white" />
                            <p className="text-xs text-emerald-100">{t.totalPaid}</p>
                        </div>
                        <p className="text-2xl text-white">₦{totalPaid.toLocaleString()}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-4"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Receipt className="w-4 h-4 text-white" />
                            <p className="text-xs text-emerald-100">{t.allPayments}</p>
                        </div>
                        <p className="text-2xl text-white">{transactions.length}</p>
                    </motion.div>
                </div>
            </div>

            {/* Filter Buttons */}
            <div className="px-6 mt-4 mb-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl p-1 shadow-lg flex items-center gap-1 border border-gray-100"
                >
                    <button
                        onClick={() => setFilterStatus('all')}
                        className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${filterStatus === 'all'
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'text-gray-500 hover:bg-gray-50'
                            }`}
                    >
                        {t.filterAll}
                    </button>
                    <button
                        onClick={() => setFilterStatus('success')}
                        className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${filterStatus === 'success'
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'text-gray-500 hover:bg-gray-50'
                            }`}
                    >
                        {t.filterPaid}
                    </button>
                    <button
                        onClick={() => setFilterStatus('pending')}
                        className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${filterStatus === 'pending'
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'text-gray-500 hover:bg-gray-50'
                            }`}
                    >
                        {t.filterPending}
                    </button>
                    <button
                        onClick={() => setFilterStatus('failed')}
                        className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${filterStatus === 'failed'
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'text-gray-500 hover:bg-gray-50'
                            }`}
                    >
                        {t.filterFailed}
                    </button>
                </motion.div>
            </div>

            {/* Payment History List */}
            <div className="px-6 space-y-4">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mb-4" />
                        <p className="text-gray-500 text-sm">Loading history...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-600 p-6 rounded-2xl text-center border border-red-100 shadow-sm transition-all">
                        <XCircle className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm font-medium">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 text-xs bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : filteredTransactions.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl px-10 py-6 text-center shadow-sm border border-gray-100"
                    >
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Receipt className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{t.noPayments}</h3>
                        <p className="text-sm text-gray-500 max-w-[200px] mx-auto leading-relaxed">{t.noPaymentsDesc}</p>
                    </motion.div>
                ) : (
                    filteredTransactions.map((transaction, index) => (
                        <motion.div
                            key={transaction.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-100 transition-all group"
                        >
                            <div className="flex p-4 items-start justify-between mb-4">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${transaction.status === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-gray-400'
                                        }`}>
                                        {transaction.payment_method === 'card' ? (
                                            <CreditCard className="w-6 h-6" />
                                        ) : (
                                            <Receipt className="w-6 h-6" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="text-lg font-bold text-gray-800">
                                                ₦{parseFloat(transaction.amount).toLocaleString()}
                                            </h3>
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${getStatusColor(transaction.status)}`}>
                                                {getStatusIcon(transaction.status)}
                                                {getStatusText(transaction.status)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                            <Calendar className="w-3 h-3" />
                                            <span>{formatDate(transaction.paid_at)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 mb-4 bg-gray-50/50 p-3 rounded-xl border border-gray-100/50">
                                <div className="flex justify-between items-center text-[11px]">
                                    <span className="text-gray-500">Plan</span>
                                    <span className="text-gray-800 font-semibold">{transaction.plan_name}</span>
                                </div>
                                <div className="flex justify-between items-center text-[11px]">
                                    <span className="text-gray-500">Billing</span>
                                    <span className="text-gray-800 font-semibold capitalize">{transaction.plan_billing_interval}</span>
                                </div>
                                <div className="flex justify-between items-center text-[11px]">
                                    <span className="text-gray-500">Reference</span>
                                    <span className="text-gray-400 font-mono tracking-tighter">{transaction.reference}</span>
                                </div>
                            </div>

                            {/* Payment Method & Download */}
                            <div className="flex items-center justify-between py-4 border-t border-gray-50">
                                <div className="flex items-center gap-2">
                                    <div className="px-2 py-1 bg-gray-100 rounded text-[10px] text-gray-600 font-bold uppercase border border-gray-200">
                                        {transaction.payment_method || 'N/A'}
                                    </div>
                                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                                    <div className="text-[10px] text-gray-500 font-medium uppercase tracking-tight">
                                        via {transaction.payment_provider}
                                    </div>
                                </div>
                                {transaction.status === 'success' && (
                                    <button
                                        className="flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg transition-all hover:bg-emerald-600 hover:text-white border border-emerald-100 group/btn"
                                        aria-label={t.downloadReceipt}
                                    >
                                        <Download className="w-3 h-3" />
                                        <span className="text-xs font-bold">PDF</span>
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Export Button */}
            {filteredTransactions.length > 0 && (
                <div className="px-6 mt-6">
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="w-full py-4 bg-white border-2 border-emerald-600 text-emerald-600 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm font-bold active:scale-[0.98]"
                        aria-label={t.exportHistory}
                    >
                        <Download className="w-5 h-5" />
                        {t.exportHistory}
                    </motion.button>
                </div>
            )}
        </div>
    );
}
