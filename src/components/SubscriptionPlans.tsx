import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
    ChevronLeft,
    Crown,
    Check,
    ArrowRight,
    Sparkles,
    ShieldCheck,
    Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getPlans, subscribeUser, Plan } from '../services/subscriptions';

interface SubscriptionPlansProps {
    language?: string;
}

export const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ language = 'english' }) => {
    const navigate = useNavigate();
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [subscribing, setSubscribing] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

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

    const handleSubscribe = async (planId: string) => {
        setSubscribing(planId);
        setError(null);
        try {
            const res = await subscribeUser(planId);
            if (res.authorization_url) {
                // Redirect to Paystack
                window.location.href = res.authorization_url;
            } else {
                setError('Subscription failed. No payment URL received.');
            }
        } catch (err: any) {
            console.error('Subscription error:', err);
            setError(err.response?.data?.message || 'Failed to initiate subscription. Please check your connection.');
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
                    <p className="text-gray-500">Choose a plan that fits your business needs and unlock powerful features.</p>
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
                        {plans.map((plan, index) => (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative bg-white rounded-3xl p-6 shadow-sm border-2 transition-all ${plan.name.toLowerCase().includes('premium')
                                    ? 'border-emerald-500 bg-emerald-50/10'
                                    : 'border-gray-100'
                                    }`}
                            >
                                {plan.name.toLowerCase().includes('premium') && (
                                    <div className="absolute -top-3 right-6 px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                                        Most Popular
                                    </div>
                                )}

                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
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
                                    disabled={subscribing !== null}
                                    className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${plan.name.toLowerCase().includes('premium')
                                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700'
                                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                        } ${subscribing === plan.id ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {subscribing === plan.id ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <span>Get Started</span>
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
        </div>
    );
};
