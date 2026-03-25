import { motion } from 'motion/react';
import { ArrowLeft, Crown, Check, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { getPlans, Plan, getUserSubscription, UserSubscriptionResponse } from '../services/subscriptions';
import { useNavigate } from 'react-router-dom';
import { profileTranslations, type LanguageKey } from '../translations/profile';

interface SettingsProps {
  language?: LanguageKey;
}

const translations = {
  english: {

  },
  pidgin: {

  },
  hausa: {

  },
  yoruba: {

  },
  igbo: {

  }
}

export function Settings({ language = 'english' }: SettingsProps) {
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [apiPlans, setApiPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [userSubscription, setUserSubscription] = useState<UserSubscriptionResponse | null>(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await getPlans();
        setApiPlans(res.data);
      } catch (err) {
        console.error('Failed to fetch plans:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchSubscription = async () => {
      try {
        const res = await getUserSubscription();
        console.log(res);
        setUserSubscription(res);
        if (res.plan && res.plan.name) {
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

    fetchPlans();
    fetchSubscription();
  }, []);

  const getDynamicPrice = (planType: 'basic' | 'premium', defaultPrice: number) => {
    const plan = apiPlans.find(p => {
      const name = p.name.toLowerCase();
      const isTypeMatch = name.includes(planType);
      const isAnnualMatch = name.includes('annual') || p.billing_interval === 'year';
      return isTypeMatch && (billingCycle === 'yearly' ? isAnnualMatch : !isAnnualMatch);
    });
    return plan ? parseFloat(plan.price) : defaultPrice;
  };

  const getDynamicPeriod = (planType: 'basic' | 'premium', defaultPeriod: string) => {
    const plan = apiPlans.find(p => {
      const name = p.name.toLowerCase();
      const isTypeMatch = name.includes(planType);
      const isAnnualMatch = name.includes('annual') || p.billing_interval === 'year';
      return isTypeMatch && (billingCycle === 'yearly' ? isAnnualMatch : !isAnnualMatch);
    });
    if (!plan) return defaultPeriod;
    return plan.billing_interval === 'free' ? 'Free Forever' : `${plan.billing_interval}`;
  };

  const plans = {
    basic: {
      name: billingCycle === 'yearly' ? 'Basic Annual' : 'Basic',
      price: getDynamicPrice('basic', billingCycle === 'yearly' ? 5000 : 500),
      period: getDynamicPeriod('basic', billingCycle === 'yearly' ? 'yearly' : 'Free Forever'),
      features: [
        'Unlimited ledger entries',
        'Basic tax calculations',
        'File up to 5 returns/year',
        'Email support',
        'Standard reports',
      ],
      limitations: [
        'No priority support',
        'No advanced analytics',
        'No bulk uploads',
      ]
    },
    premium: {
      name: billingCycle === 'yearly' ? 'Premium Annual' : 'Premium',
      price: getDynamicPrice('premium', billingCycle === 'yearly' ? 25000 : 2500),
      period: getDynamicPeriod('premium', billingCycle === 'yearly' ? 'yearly' : 'monthly'),
      features: [
        'Everything in Basic',
        'Unlimited tax returns',
        'Advanced analytics & insights',
        'Priority 24/7 support',
        'Bulk CSV uploads',
        'Custom report generation',
        'Tax optimization tips',
        'Dedicated account manager',
        'Early access to new features',
      ],
      badge: 'Most Popular'
    }
  };

  // const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  const currentPlan = userSubscription?.plan?.name?.toLowerCase().includes('premium')
    ? 'premium'
    : 'basic';

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Status Bar */}
      <div className="h-11 bg-emerald-600 flex items-center justify-between px-6 text-white text-sm">

      </div>

      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/profile')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all -ml-2"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg">Subscription Plans</h1>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="px-6 pt-8 flex justify-center">
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

      {/* Current Plan Banner */}
      <div className="px-6 py-6">
        <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Current Plan</p>
              <p className="text-lg">{userSubscription?.plan?.name || 'Free Trial'}</p>
            </div>
            <div className="px-4 py-2 bg-white rounded-lg border border-gray-200 min-w-[80px] flex items-center justify-center">
              {subscriptionLoading || loading ? (
                <div className="w-4 h-4 border-2 border-gray-200 border-t-emerald-600 rounded-full animate-spin" />
              ) : (
                <p className="text-sm">₦{(userSubscription?.plan?.price || 0).toLocaleString('en-NG')}</p>
              )}
            </div>
          </div>
          {userSubscription?.subscription?.status === 'past_due' && (
            <div className="mt-3 px-3 py-2 bg-red-50 text-red-600 text-xs rounded-lg flex items-center gap-2 border border-red-100">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              Subscription past due. Please update payment.
            </div>
          )}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="px-6 space-y-4 pb-6">
        {/* Basic Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-white rounded-2xl p-6 border-2 transition-all ${selectedPlan === 'basic'
            ? 'border-emerald-600 shadow-lg'
            : 'border-gray-200 hover:border-gray-300'
            }`}
          onClick={() => setSelectedPlan('basic')}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg mb-1">{plans.basic.name}</h3>
              {loading ? (
                <div className="h-8 w-24 bg-gray-100 animate-pulse rounded-lg mb-1" />
              ) : (
                <p className="text-2xl">₦{plans.basic.price.toLocaleString('en-NG')}</p>
              )}
              <p className="text-sm text-gray-600 capitalize">{plans.basic.period}</p>
            </div>
            {selectedPlan === 'basic' && (
              <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          <div className="space-y-2 mb-4">
            <p className="text-xs text-gray-600 uppercase tracking-wide">Features</p>
            {plans.basic.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: index * 0.05 }}>
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                </motion.div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          <button
            disabled={subscriptionLoading || loading || (userSubscription?.has_subscription === true && plans.basic.price === parseFloat(userSubscription.plan?.price?.toString() || '0'))}
            onClick={() => navigate('/subscriptions')}
            className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${(userSubscription?.has_subscription === true && plans.basic.price === parseFloat(userSubscription.plan?.price?.toString() || '0'))
              ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
              : 'bg-white border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 shadow-sm'
              }`}
          >
            {(userSubscription?.has_subscription === true && plans.basic.price === parseFloat(userSubscription.plan?.price?.toString() || '0'))
              ? 'Current Plan'
              : (userSubscription?.has_subscription && plans.basic.price < parseFloat(userSubscription.plan?.price?.toString() || '0'))
                ? 'Downgrade to this Plan'
                : (userSubscription?.has_subscription === false)
                  ? 'Get Started'
                  : 'Upgrade to this Plan'
            }
          </button>
        </motion.div>

        {/* Premium Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`bg-white rounded-2xl p-6 border-2 transition-all relative overflow-hidden ${selectedPlan === 'premium'
            ? 'border-emerald-600 shadow-xl'
            : 'border-gray-100 hover:border-gray-200'
            }`}
          onClick={() => setSelectedPlan('premium')}
        >
          {/* Badge */}
          <div className="absolute top-1 right-1">
            <div className="px-3 py-1 bg-emerald-500 text-white rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {plans.premium.badge}
            </div>
          </div>

          <div className="flex items-start justify-between my-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Crown className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold">{plans.premium.name}</h3>
              </div>
              <div className="flex items-baseline gap-1">
                {loading ? (
                  <div className="h-8 w-32 bg-emerald-50 animate-pulse rounded-lg mb-1" />
                ) : (
                  <>
                    <p className="text-2xl font-bold">₦{plans.premium.price.toLocaleString('en-NG')}</p>
                    <p className="text-sm text-gray-400 capitalize">{plans.premium.period}</p>
                  </>
                )}
              </div>
            </div>
            {selectedPlan === 'premium' && (
              <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          <div className="space-y-2 mb-4">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Premium Features</p>
            {plans.premium.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: index * 0.05 + 0.1 }}>
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                </motion.div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          <button
            disabled={subscriptionLoading || loading || (userSubscription?.has_subscription === true && plans.premium.price === parseFloat(userSubscription.plan?.price?.toString() || '0'))}
            onClick={() => navigate('/subscriptions')}
            className={`w-full py-4 rounded-2xl font-bold transition-all text-sm ${(userSubscription?.has_subscription === true && plans.premium.price === parseFloat(userSubscription.plan?.price?.toString() || '0'))
              ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
              : 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700'
              }`}
          >
            {(userSubscription?.has_subscription === true && plans.premium.price === parseFloat(userSubscription.plan?.price?.toString() || '0'))
              ? 'Current Plan'
              : (userSubscription?.has_subscription && plans.premium.price > parseFloat(userSubscription.plan?.price?.toString() || '0'))
                ? 'Upgrade to this Plan'
                : (userSubscription?.has_subscription === false)
                  ? 'Get Started'
                  : 'Downgrade to this Plan'
            }
          </button>
        </motion.div>
      </div>

      {/* Payment Integration Info */}
      <div className="px-6 pb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-900 mb-3">
            💳 Secure payment via Paystack or Flutterwave
          </p>
          <div className="flex gap-2">
            <div className="px-3 py-1 bg-white rounded-lg text-xs text-gray-700 border border-blue-200">
              Paystack
            </div>
            <div className="px-3 py-1 bg-white rounded-lg text-xs text-gray-700 border border-blue-200">
              Flutterwave
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Highlight */}
      <div className="px-6 pb-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="text-sm mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            Why Upgrade to Premium?
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-lg">⚡</span>
              </div>
              <div>
                <p className="text-sm mb-1">Save Time</p>
                <p className="text-xs text-gray-600">Bulk uploads and automation save hours monthly</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-lg">💡</span>
              </div>
              <div>
                <p className="text-sm mb-1">Optimize Taxes</p>
                <p className="text-xs text-gray-600">AI-powered tips to reduce your tax burden legally</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🎯</span>
              </div>
              <div>
                <p className="text-sm mb-1">Priority Support</p>
                <p className="text-xs text-gray-600">Get help from tax experts within minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
