import { motion } from 'motion/react';
import { ArrowLeft, Crown, Check, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface SettingsProps {
  onNavigate: (screen: string) => void;
}

export function Settings({ onNavigate }: SettingsProps) {
  const [selectedPlan, setSelectedPlan] = useState('basic');

  const plans = {
    basic: {
      name: 'Basic',
      price: 0,
      period: 'Free Forever',
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
      name: 'Premium',
      price: 500,
      period: 'per month',
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
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('profile')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all -ml-2"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg">Subscription Plans</h1>
        </div>
      </div>

      {/* Current Plan Banner */}
      <div className="px-6 py-6">
        <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Current Plan</p>
              <p className="text-lg">Basic</p>
            </div>
            <div className="px-4 py-2 bg-white rounded-lg border border-gray-200">
              <p className="text-sm">Free</p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="px-6 space-y-4 pb-6">
        {/* Basic Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-white rounded-2xl p-6 border-2 transition-all ${
            selectedPlan === 'basic' 
              ? 'border-emerald-600 shadow-lg' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setSelectedPlan('basic')}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg mb-1">{plans.basic.name}</h3>
              <p className="text-2xl">₦{plans.basic.price}</p>
              <p className="text-sm text-gray-600">{plans.basic.period}</p>
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
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          <button className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl text-sm">
            Current Plan
          </button>
        </motion.div>

        {/* Premium Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 transition-all relative overflow-hidden ${
            selectedPlan === 'premium' 
              ? 'border-amber-600 shadow-2xl' 
              : 'border-amber-200 hover:border-amber-300'
          }`}
          onClick={() => setSelectedPlan('premium')}
        >
          {/* Badge */}
          <div className="absolute top-4 right-4">
            <div className="px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full text-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {plans.premium.badge}
            </div>
          </div>

          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Crown className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg">{plans.premium.name}</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <p className="text-2xl">₦{plans.premium.price}</p>
                <p className="text-sm text-gray-600">{plans.premium.period}</p>
              </div>
            </div>
            {selectedPlan === 'premium' && (
              <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          <div className="space-y-2 mb-4">
            <p className="text-xs text-amber-900 uppercase tracking-wide">Premium Features</p>
            {plans.premium.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setSelectedPlan('premium')}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:shadow-lg transition-all text-sm"
          >
            Upgrade to Premium
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
            <div className="px-3 py-1 bg-white rounded-lg text-xs text-gray-700 border border-blue-200">
              Bank Transfer
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
