import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
    ChevronLeft,
    Crown,
    Check,
    ArrowRight,
    Sparkles,
    ShieldCheck,
    Zap,
    Loader2,
    X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { getPlans, subscribeUser, changePlan, Plan, getUserSubscription, UserSubscriptionResponse, getTransactionHistory } from '../services/subscriptions';
import { type LanguageKey } from '../translations/profile';


interface SubscriptionPlansProps {
    language?: LanguageKey;
}

export const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ language = 'english' }) => {
    const navigate = useNavigate();
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [subscribing, setSubscribing] = useState<string | null>(null);
    const [isPolling, setIsPolling] = useState(false);
    const [pollCount, setPollCount] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [apiPlans, setApiPlans] = useState<Plan[]>([]);
    const [selectedPlan, setSelectedPlan] = useState('basic');
    const [userSubscription, setUserSubscription] = useState<UserSubscriptionResponse | null>(null);
    const [subscriptionLoading, setSubscriptionLoading] = useState(true);
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await getPlans();
                setPlans(res.data);
            } catch (err) {
                console.error('Failed to fetch plans:', err);
                setError('Could not load subscription plans. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    useEffect(() => {
        const fetchSubscription = async () => {
            try {
                const res = await getUserSubscription();
                console.log(res);
                setUserSubscription(res);
                if (res.plan) {
                    const isPremium = res.plan.name.toLowerCase().includes('premium');
                    setSelectedPlan(isPremium ? 'premium' : 'basic');
                    setBillingCycle(res.plan.billing_interval === 'year' ? 'yearly' : 'monthly');
                }
            } catch (err) {
                console.error('Failed to fetch subscription:', err);
            } finally {
                setSubscriptionLoading(false);
            }
        };

        fetchSubscription();
    }, []);

    const filteredPlans = plans
        .filter(plan => {
            const name = plan.name.toLowerCase();
            if (billingCycle === 'yearly') {
                return name.includes('annual') || plan.billing_interval === 'year';
            } else {
                return !name.includes('annual') && plan.billing_interval !== 'year';
            }
        })
        .sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();

            const getRank = (name: string) => {
                if (name.includes('basic')) return 1;
                if (name.includes('premium')) return 2;
                return 3;
            };

            return getRank(nameA) - getRank(nameB);
        });

    const getDynamicPrice = (planType: 'basic' | 'premium', defaultPrice: number) => {
        const plan = apiPlans.find(p => p.name.toLowerCase().includes(planType));
        return plan ? parseFloat(plan.price) : defaultPrice;
    };

    const getDynamicPeriod = (planType: 'basic' | 'premium', defaultPeriod: string) => {
        const plan = apiPlans.find(p => p.name.toLowerCase().includes(planType));
        if (!plan) return defaultPeriod;
        return plan.billing_interval === 'free' ? 'Free Forever' : `per ${plan.billing_interval}`;
    };

    const handleSubscribe = async (planId: string) => {
        setSubscribing(planId);
        setError(null);
        try {
            if (userSubscription?.has_subscription) {
                // Determine if it's an upgrade or downgrade
                const currentPlan = userSubscription.plan;
                const newPlan = plans.find(p => p.id === planId);

                // Call change plan API
                const res = await changePlan(planId);

                // Show success message and refresh subscription details
                toast.success(res.message || 'Plan updated successfully!');
                console.log(res);

                // Fetch updated subscription details
                const updatedSub = await getUserSubscription();
                setUserSubscription(updatedSub);
            } else {
                // New subscription
                const callbackUrl = `${window.location.origin}/payment-success`;
                const res = await subscribeUser(planId, callbackUrl);

                if (res.authorization_url) {
                    setIsPolling(true);
                    setError(null);
                    const startTime = Date.now();

                    // Manually append callback_url to the authorization_url as a final attempt to override defaults
                    const separator = res.authorization_url.includes('?') ? '&' : '?';
                    const forcedUrl = `${res.authorization_url}${separator}callback_url=${encodeURIComponent(callbackUrl)}`;

                    // Open Paystack in a popup with specific features to avoid a new tab
                    const width = 500;
                    const height = 700;
                    const left = window.screenX + (window.outerWidth - width) / 2;
                    const top = window.screenY + (window.outerHeight - height) / 2;

                    // 'popup=yes' and specifying exact dimensions often forces a window instead of a tab
                    const popup = window.open(
                        forcedUrl,
                        'PaystackPayment',
                        `width=${width},height=${height},left=${left},top=${top},status=no,menubar=no,toolbar=no,location=no`
                    );

                    if (popup) {
                        setPollCount(0);
                        // Start polling for transaction success
                        const pollInterval = setInterval(async () => {
                            setPollCount(prev => prev + 1);
                            if (popup.closed) {
                                clearInterval(pollInterval);
                                // Give it one last check in case they closed it right after success
                                try {
                                    const history = await getTransactionHistory();
                                    const latestTx = history.data[0];
                                    if (latestTx && latestTx.status.toLowerCase() === 'success') {
                                        const txTime = new Date(latestTx.paid_at).getTime();
                                        if (txTime > startTime - 30000) {
                                            setIsPolling(false);
                                            navigate(`/payment-success?reference=${latestTx.reference}`);
                                            return;
                                        }
                                    }
                                } catch (e) { }
                                setIsPolling(false);
                                return;
                            }

                            try {
                                const history = await getTransactionHistory();
                                // Check for a recent successful transaction
                                const latestTx = history.data[0];

                                if (latestTx && latestTx.status.toLowerCase() === 'success') {
                                    // If we have a reference match from API response
                                    const isReferenceMatch = res.reference && latestTx.reference === res.reference;

                                    // Or if the transaction time is newer than when we started (with 30s buffer for safety)
                                    const txTime = new Date(latestTx.paid_at).getTime();
                                    const isRecentMatch = txTime > startTime - 30000;

                                    if (isReferenceMatch || isRecentMatch) {
                                        clearInterval(pollInterval);
                                        if (!popup.closed) popup.close();
                                        setIsPolling(false);
                                        navigate(`/payment-success?reference=${latestTx.reference}`);
                                    }
                                }
                            } catch (err) {
                                console.error('Polling error:', err);
                            }
                        }, 3000);

                        // Fallback: Clear interval after 10 minutes
                        setTimeout(() => {
                            clearInterval(pollInterval);
                            setIsPolling(false);
                        }, 600000);
                    } else {
                        // If popup is blocked, fallback to direct redirect
                        setIsPolling(false);
                        window.location.href = res.authorization_url;
                    }
                } else {
                    setError('Subscription failed. No payment URL received.');
                }
            }
        } catch (err: any) {
            console.error('Subscription error:', err);
            setError(err.response?.data?.error || err.message || 'Failed to process request. Please check your connection.');
        } finally {
            setSubscribing(null);
        }
    };

    const features = [
        { icon: Zap, text: "Faster tax processing" },
        { icon: ShieldCheck, text: "Priority support" },
        { icon: Sparkles, text: "Advanced tax optimization" }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white px-6 py-4 flex items-center gap-4 border-b border-gray-100">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-all">
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                </button>
                <h1 className="text-xl font-bold text-gray-900">Subscription Plans</h1>
            </div>

            <div className="flex-1 px-6 py-8 overflow-y-auto">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-2xl mb-4">
                        <Crown className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Upgrade to Premium</h2>
                    <p className="text-gray-500 mb-8">Choose a plan that fits your business needs and unlock powerful features.</p>
                </div>

                {/* Billing Toggle */}
                <div className="flex justify-center mb-[20px]">
                    <div className="bg-gray-200/50 p-1.5 rounded-2xl flex items-center gap-1 w-full max-w-[300px]">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all relative ${billingCycle === 'monthly'
                                ? 'bg-white text-emerald-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('yearly')}
                            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all relative ${billingCycle === 'yearly'
                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Annual
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex flex-col items-center gap-2">
                        <p className="text-sm text-red-600 font-medium text-center">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="text-xs text-red-700 font-bold hover:underline"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <div className="w-8 h-8 border-3 border-gray-200 border-t-emerald-600 rounded-full animate-spin" />
                        <p className="text-sm text-gray-500">Fetching latest plans...</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredPlans.map((plan, index) => (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative bg-white rounded-3xl p-6 shadow-sm border-2 transition-all ${plan.name.toLowerCase().includes('premium')
                                    ? 'border-emerald-100 bg-emerald-50/10'
                                    : 'border-gray-100'
                                    }`}
                            >
                                {plan.name.toLowerCase().includes('premium') && (
                                    <div className="absolute top-1 right-1 px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                                        Most Popular
                                    </div>
                                )}

                                <div className="flex justify-between items-start mt-6 mb-6">
                                    <div className="flex-1 pr-4">
                                        <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                                        <p className="text-xs leading-relaxed text-gray-500 mt-1">{plan.description}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-2xl font-bold text-gray-900">₦{parseFloat(plan.price).toLocaleString()}</span>
                                        <p className="text-xs text-gray-400 capitalize">/{plan.billing_interval}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    {features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                                                <Check className="w-3 h-3 text-emerald-600" />
                                            </div>
                                            <span className="text-sm text-gray-600">{feature.text}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handleSubscribe(plan.id)}
                                    disabled={subscribing !== null || (userSubscription?.has_subscription === true && parseFloat(plan.price) === parseFloat(userSubscription.plan?.price?.toString() || '0'))}
                                    className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${plan.name.toLowerCase().includes('premium')
                                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700'
                                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                        } ${(userSubscription?.has_subscription === true && parseFloat(plan.price) === parseFloat(userSubscription.plan?.price?.toString() || '0')) ? 'opacity-70 cursor-not-allowed ' : ''} ${subscribing === plan.id ? 'opacity-70 cursor-wait' : ''}`}
                                >
                                    {subscribing === plan.id ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (userSubscription?.has_subscription === true && parseFloat(plan.price) === parseFloat(userSubscription.plan?.price?.toString() || '0')) ? (
                                        <>
                                            <span className='text-sm font-medium'>Current Plan</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    ) : userSubscription?.has_subscription ? (
                                        <>
                                            <span className='text-sm font-medium'>
                                                {parseFloat(plan.price) > (parseFloat(userSubscription.plan?.price?.toString() || '0')) ? 'Upgrade to this Plan' : 'Downgrade to this Plan'}
                                            </span>
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    ) : (
                                        <>
                                            <span className='text-sm font-medium'>Get Started</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <div className="p-6 bg-white border-t border-gray-100">
                <p className="text-xs text-gray-400 text-center">
                    Secure payments powered by Paystack. Cancel anytime.
                </p>
            </div>

            {/* Modal-like Overlay Loader */}
            {isPolling && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center"
                    >
                        <div className="relative w-20 h-20 mx-auto mb-6">
                            <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-25"></div>
                            <div className="relative flex items-center justify-center w-20 h-20 bg-emerald-50 rounded-full">
                                <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {pollCount > 10 ? "Verifying Payment..." : "Payment in Progress"}
                        </h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            {pollCount > 10
                                ? "We're still waiting for the bank to confirm... Don't worry, you can close the payment window if you've already finished."
                                : "A secure payment window has been opened. Please complete your transaction there."
                            }
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-xl text-sm text-left">
                                <Zap className="w-5 h-5 flex-shrink-0" />
                                <span>This window will automatically refresh once your payment is confirmed.</span>
                            </div>

                            <button
                                onClick={() => setIsPolling(false)}
                                className="w-full py-3 text-gray-500 hover:text-gray-700 font-medium transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};
