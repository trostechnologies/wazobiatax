import { motion } from 'motion/react';
import {
    CheckCircle2,
    Download,
    FileText,
    Calendar,
    CreditCard,
    Crown,
    Sparkles,
    TrendingUp,
    Shield,
    Zap,
    BarChart3,
    Globe
} from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { profileTranslations, type LanguageKey } from '../translations/profile';
import { getTransactionHistory, Transaction } from '../services/subscriptions';
import { useState, useEffect } from 'react';

interface PaymentSuccessProps {
    language?: LanguageKey;
}

export function PaymentSuccess({
    language = 'english'
}: PaymentSuccessProps) {
    const [searchParams] = useSearchParams();
    const reference = searchParams.get('reference') || searchParams.get('trxref');
    const [transaction, setTransaction] = useState<Transaction | null>(null);
    const [loading, setLoading] = useState(!!reference);
    const [error, setError] = useState<string | null>(null);

    const t = profileTranslations[language].paymentSuccess;
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        // Hide confetti after animation
        const timer = setTimeout(() => setShowConfetti(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchTransactionDetails = async () => {
            if (!reference) return;

            try {
                setLoading(true);
                const res = await getTransactionHistory();
                const found = res.data.find(tx => tx.reference === reference);
                if (found) {
                    setTransaction(found);
                } else {
                    // If not found in history yet (might take a second for backend to sync)
                    // We could retry or just show a message. For now, let's try one more time after a delay if not found.
                    setTimeout(async () => {
                        const retryRes = await getTransactionHistory();
                        const retryFound = retryRes.data.find(tx => tx.reference === reference);
                        if (retryFound) {
                            setTransaction(retryFound);
                        } else {
                            setError('Transaction details not found. Please check your history later.');
                        }
                        setLoading(false);
                    }, 2000);
                    return;
                }
            } catch (err) {
                console.error('Failed to fetch transaction:', err);
                setError('Could not verify transaction details.');
            } finally {
                if (transaction || error) setLoading(false);
            }
        };

        fetchTransactionDetails();
    }, [reference]);

    const features = [
        { icon: Zap, text: t.feature1 },
        { icon: BarChart3, text: t.feature2 },
        { icon: Shield, text: t.feature3 },
        { icon: TrendingUp, text: t.feature4 },
        { icon: FileText, text: t.feature5 },
        { icon: Globe, text: t.feature6 }
    ];

    const navigate = useNavigate();
    const today = new Date();

    // Use transaction data if available, otherwise fallback to defaults/today
    const displayDate = transaction ? new Date(transaction.paid_at) : today;
    const validUntilDate = new Date(displayDate);

    const isAnnual = transaction ? transaction.plan_billing_interval === 'year' : false;
    validUntilDate.setMonth(validUntilDate.getMonth() + (isAnnual ? 12 : 1));

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Verifying Payment</h2>
                <p className="text-gray-500">Please wait while we confirm your subscription details...</p>
            </div>
        );
    }

    if (error && !transaction) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
                    <Shield className="w-8 h-8 text-red-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Payment Verification Failed</h2>
                <p className="text-gray-500 mb-6">{error}</p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full max-w-xs py-4 bg-emerald-600 text-white rounded-2xl font-bold"
                >
                    Go to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 pb-20">
            {/* Status Bar */}
            <div className="h-11 bg-emerald-600 flex items-center justify-between px-6 text-white text-sm">
                <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <div className="flex items-center gap-1">
                    <div className="w-4 h-3 border border-white rounded-sm" />
                    <div className="w-4 h-3 border border-white rounded-sm" />
                    <span className="text-xs">100</span>
                </div>
            </div>

            {/* Confetti Effect */}
            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                    {[...Array(50)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                                background: ['#10B981', '#F59E0B', '#3B82F6', '#EF4444', '#8B5CF6'][i % 5],
                                left: `${Math.random() * 100}%`,
                                top: -20,
                            }}
                            initial={{ y: -20, opacity: 1, rotate: 0 }}
                            animate={{
                                y: window.innerHeight + 20,
                                opacity: 0,
                                rotate: 360 * (Math.random() > 0.5 ? 1 : -1)
                            }}
                            transition={{
                                duration: 2 + Math.random() * 2,
                                delay: Math.random() * 0.5,
                                ease: "easeOut"
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="px-6 pt-8">
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.2
                    }}
                    className="flex justify-center mb-6"
                >
                    <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                            <CheckCircle2 className="w-14 h-14 text-white" strokeWidth={2.5} />
                        </div>
                        {/* Pulse Ring */}
                        <motion.div
                            className="absolute inset-0 bg-emerald-500 rounded-full"
                            initial={{ scale: 1, opacity: 0.6 }}
                            animate={{ scale: 1.5, opacity: 0 }}
                            transition={{
                                duration: 1.5,
                                repeat: 2,
                                ease: "easeOut"
                            }}
                        />
                    </div>
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl mb-2 bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                        {t.title}
                    </h1>
                    <p className="text-gray-600">{t.subtitle}</p>
                </motion.div>

                {/* Premium Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-6"
                >
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-6 text-white shadow-xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                    <Crown className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm opacity-90">{t.planActivated}</p>
                                    <h2 className="text-2xl">{transaction?.plan_name || t.premium}</h2>
                                </div>
                            </div>
                            <Sparkles className="w-8 h-8 opacity-80" />
                        </div>
                    </div>
                </motion.div>

                {/* Thank You Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100"
                >
                    <h3 className="text-lg mb-2">{t.thankYou}</h3>
                    <p className="text-sm text-gray-600">{t.paymentConfirmed}</p>
                    {transaction && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
                            <p className="text-xs text-blue-700">
                                Your account has been upgraded to <span className="font-bold">{transaction.plan_name}</span>.
                            </p>
                        </div>
                    )}
                </motion.div>

                {/* Payment Details */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100"
                >
                    <h3 className="text-base mb-4 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-emerald-600" />
                        {t.paymentDetails}
                    </h3>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-600">{t.transactionRef}</span>
                            <span className="text-sm font-medium">{transaction?.reference || reference}</span>
                        </div>

                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-600">{t.amountPaid}</span>
                            <span className="text-lg font-medium text-emerald-600">
                                ₦{transaction ? parseFloat(transaction.amount).toLocaleString() : '...'}
                            </span>
                        </div>

                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-600">{t.paymentDate}</span>
                            <span className="text-sm font-medium">{formatDate(displayDate)}</span>
                        </div>

                        <div className="flex justify-between items-center py-2">
                            <span className="text-sm text-gray-600">{t.paymentMethod}</span>
                            <span className="text-sm font-medium capitalize">{transaction?.payment_method || t.card}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Subscription Details */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100"
                >
                    <h3 className="text-base mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-emerald-600" />
                        {t.subscriptionDetails}
                    </h3>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-600">{t.billingCycle}</span>
                            <span className="text-sm font-medium capitalize">
                                {isAnnual ? t.annual : t.monthly}
                            </span>
                        </div>

                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-600">{t.validUntil}</span>
                            <span className="text-sm font-medium">{formatDate(validUntilDate)}</span>
                        </div>

                        <div className="flex justify-between items-center py-2">
                            <span className="text-sm text-gray-600">{t.nextBilling}</span>
                            <span className="text-sm font-medium">{formatDate(validUntilDate)}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Features */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100"
                >
                    <h3 className="text-base mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-amber-500" />
                        {t.features}
                    </h3>

                    <div className="grid grid-cols-1 gap-3">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1 + index * 0.1 }}
                                className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100"
                            >
                                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <feature.icon className="w-4 h-4 text-emerald-600" />
                                </div>
                                <span className="text-sm text-gray-700">{feature.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    className="space-y-3"
                >
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        aria-label={t.goToDashboard}
                    >
                        <CheckCircle2 className="w-5 h-5" />
                        {t.goToDashboard}
                    </button>

                    <button
                        className="w-full py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                        aria-label={t.downloadReceipt}
                    >
                        <Download className="w-5 h-5" />
                        {t.downloadReceipt}
                    </button>

                    <button
                        onClick={() => navigate('/subscription-history')}
                        className="w-full py-3 text-sm text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all flex items-center justify-center gap-2"
                        aria-label={t.viewReceipt}
                    >
                        <FileText className="w-4 h-4" />
                        {t.viewReceipt}
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
