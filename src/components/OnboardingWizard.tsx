import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Check, 
  Loader2, 
  Shield,
  Crown,
  Sparkles,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { useState } from 'react';
import { onboardingTranslations, type LanguageKey } from '../translations/onboarding';

interface OnboardingWizardProps {
  onComplete: () => void;
}

export function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState('language');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageKey>('english');
  const [authType, setAuthType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [paymentError, setPaymentError] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    taxId: '',
    businessName: '',
    phone: '',
  });

  const languages = [
    { id: 'english' as LanguageKey, name: 'English', flag: '🇬🇧', nativeName: 'English' },
    { id: 'pidgin' as LanguageKey, name: 'Pidgin', flag: '🇳🇬', nativeName: 'Nigerian Pidgin' },
    { id: 'hausa' as LanguageKey, name: 'Hausa', flag: '🇳🇬', nativeName: 'Hausa' },
    { id: 'yoruba' as LanguageKey, name: 'Yoruba', flag: '🇳🇬', nativeName: 'Yorùbá' },
    { id: 'igbo' as LanguageKey, name: 'Igbo', flag: '🇳🇬', nativeName: 'Igbo' },
  ];

  // Get current translation
  const t = onboardingTranslations[selectedLanguage];

  const plans = [
    {
      id: 'basic',
      name: t.subscription.basic,
      price: 0,
      period: t.subscription.freeForever,
      badge: 'gray',
      features: t.subscription.basicFeatures
    },
    {
      id: 'premium',
      name: t.subscription.premium,
      price: 500,
      period: t.subscription.perMonth,
      badge: 'gold',
      popular: true,
      features: t.subscription.premiumFeatures
    }
  ];

  // Handler functions
  const handleLanguageSelect = (langId: LanguageKey) => {
    setSelectedLanguage(langId);
  };

  const handleLanguageProceed = () => {
    if (selectedLanguage) {
      setCurrentStep('authPath');
    }
  };

  const handleAuthPathSelect = (type: string) => {
    setAuthType(type);
    if (type === 'login') {
      setCurrentStep('login');
    } else if (type === 'register') {
      setCurrentStep('register');
    } else if (type === 'google') {
      setCurrentStep('googleAuth');
    }
  };

  const handleLogin = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep('subscription');
    }, 2000);
  };

  const handleRegister = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep('emailVerify');
    }, 2000);
  };

  const handleGoogleAuth = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep('subscription');
    }, 2000);
  };

  const handleVerifyEmail = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep('subscription');
    }, 2000);
  };

  const handleResendCode = () => {
    // Resend verification code logic
  };

  const handleSubscriptionSelect = (planId: string) => {
    setSelectedPlan(planId);
    if (planId === 'basic') {
      setCurrentStep('success');
    } else {
      setCurrentStep('payment');
    }
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setPaymentError(false);
    setTimeout(() => {
      setIsProcessing(false);
      if (Math.random() > 0.2) {
        setCurrentStep('success');
      } else {
        setPaymentError(true);
      }
    }, 2500);
  };

  const handleRetryPayment = () => {
    setPaymentError(false);
    handlePayment();
  };

  const handleComplete = () => {
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  const getProgressPercentage = () => {
    const steps = ['language', 'authPath', authType, 'emailVerify', 'subscription', 'payment', 'success'];
    const currentIndex = steps.indexOf(currentStep);
    return Math.round((currentIndex / (steps.length - 1)) * 100);
  };

  return (
    <div className="h-screen w-full bg-white flex flex-col">
      {/* Status Bar */}
      <div className="h-11 bg-emerald-600 flex items-center justify-between px-6 text-white text-sm">
        <span>21:41</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-3 border border-white rounded-sm" />
          <div className="w-4 h-3 border border-white rounded-sm" />
          <span className="text-xs">70</span>
        </div>
      </div>

      {/* Header with Logo */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-4 flex items-center justify-between">
        {currentStep !== 'language' && currentStep !== 'authPath' && (
          <button 
            onClick={() => {
              if (currentStep === 'login' || currentStep === 'register' || currentStep === 'googleAuth') {
                setCurrentStep('authPath');
              } else if (currentStep === 'emailVerify') {
                setCurrentStep('register');
              } else if (currentStep === 'subscription') {
                setCurrentStep('emailVerify');
              } else if (currentStep === 'payment') {
                setCurrentStep('subscription');
              }
            }}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
        )}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-emerald-600 text-xl">📊</span>
          </div>
          <span className="text-white text-lg">WazobiaTax.ng</span>
        </div>
        <div className="w-10" />
      </div>

      {/* Progress Bar */}
      {currentStep !== 'language' && currentStep !== 'success' && (
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600">{t.common.progress}</span>
            <span className="text-xs text-emerald-600">{getProgressPercentage()}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${getProgressPercentage()}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
            />
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {/* Step 1: Language Selection */}
          {currentStep === 'language' && (
            <motion.div
              key="language"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 space-y-6"
            >
              <div className="text-center py-4">
                <h1 className="text-2xl mb-2">{t.welcome.title}</h1>
                <p className="text-gray-600">{t.welcome.subtitle}</p>
              </div>

              <div className="space-y-3">
                {languages.map((lang, index) => (
                  <motion.button
                    key={lang.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLanguageSelect(lang.id)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 ${
                      selectedLanguage === lang.id
                        ? 'border-emerald-600 bg-emerald-50 shadow-lg scale-105'
                        : 'border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{lang.flag}</span>
                        <div className="text-left">
                          <p className="text-lg">{lang.name}</p>
                          <p className="text-sm text-gray-600">{lang.nativeName}</p>
                        </div>
                      </div>
                      {selectedLanguage === lang.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center"
                        >
                          <Check className="w-5 h-5 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              <button
                onClick={handleLanguageProceed}
                disabled={!selectedLanguage}
                className={`w-full py-4 rounded-xl transition-all duration-300 ${
                  selectedLanguage
                    ? 'bg-emerald-600 text-white shadow-lg hover:bg-emerald-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {t.welcome.proceed}
              </button>
            </motion.div>
          )}

          {/* Step 2: Authentication Path Selection */}
          {currentStep === 'authPath' && (
            <motion.div
              key="authPath"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 space-y-6"
            >
              <div className="text-center py-4">
                <h2 className="text-2xl mb-2">{t.authPath.title}</h2>
                <p className="text-gray-600">{t.authPath.subtitle}</p>
              </div>

              <div className="space-y-3">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  onClick={() => handleAuthPathSelect('google')}
                  className="w-full p-4 rounded-2xl border-2 border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                      <span className="text-2xl">🔵</span>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-lg mb-1">{t.authPath.google}</p>
                      <p className="text-sm text-gray-600">{t.authPath.googleDesc}</p>
                    </div>
                    <div className="text-2xl text-gray-400">›</div>
                  </div>
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => handleAuthPathSelect('register')}
                  className="w-full p-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50 hover:border-emerald-300 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <User className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-lg mb-1">{t.authPath.register}</p>
                      <p className="text-sm text-gray-600">{t.authPath.registerDesc}</p>
                    </div>
                    <div className="text-2xl text-gray-400">›</div>
                  </div>
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => handleAuthPathSelect('login')}
                  className="w-full p-4 rounded-2xl border-2 border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                      <Lock className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-lg mb-1">{t.authPath.login}</p>
                      <p className="text-sm text-gray-600">{t.authPath.loginDesc}</p>
                    </div>
                    <div className="text-2xl text-gray-400">›</div>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 3a: Login Form */}
          {currentStep === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 space-y-6"
            >
              <div className="text-center py-4">
                <h2 className="text-2xl mb-2">{t.login.title}</h2>
                <p className="text-gray-600">{t.login.subtitle}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-gray-700">{t.login.email}</label>
                  <div className="relative">
                    <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.login.emailPlaceholder}
                      className="w-full px-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">{t.login.password}</label>
                  <div className="relative">
                    <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder={t.login.passwordPlaceholder}
                      className="w-full px-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button className="text-sm text-emerald-600 hover:underline">
                  {t.login.forgotPassword}
                </button>
              </div>

              <button
                onClick={handleLogin}
                disabled={isProcessing || !formData.email || !formData.password}
                className={`w-full py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  !isProcessing && formData.email && formData.password
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t.login.submitting}
                  </>
                ) : (
                  t.login.submit
                )}
              </button>
            </motion.div>
          )}

          {/* Step 3b: Register Form */}
          {currentStep === 'register' && (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 space-y-6"
            >
              <div className="text-center py-4">
                <h2 className="text-2xl mb-2">{t.register.title}</h2>
                <p className="text-gray-600">{t.register.subtitle}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-gray-700">{t.register.firstName} <span className="text-red-500">{t.common.required}</span></label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder={t.register.firstNamePlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">{t.register.lastName} <span className="text-red-500">{t.common.required}</span></label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder={t.register.lastNamePlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">{t.register.taxId} <span className="text-red-500">{t.common.required}</span></label>
                  <input
                    type="text"
                    value={formData.taxId}
                    onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                    placeholder={t.register.taxIdPlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                  <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-xs text-amber-900 mb-1">
                      ℹ️ {t.register.taxIdHelp}
                    </p>
                    <p className="text-xs text-amber-800">
                      {t.common.visit}{' '}
                      <a 
                        href="https://taxid.nrs.gov.ng/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-emerald-700 underline hover:text-emerald-800"
                      >
                        {t.register.taxIdPortal}
                      </a>
                      {' '}{t.register.taxIdHelpText}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">{t.register.businessName}</label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder={t.register.businessNamePlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">{t.register.email} <span className="text-red-500">{t.common.required}</span></label>
                  <div className="relative">
                    <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.register.emailPlaceholder}
                      className="w-full px-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">{t.register.phone} <span className="text-red-500">{t.common.required}</span></label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t.register.phonePlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">{t.register.password} <span className="text-red-500">{t.common.required}</span></label>
                  <div className="relative">
                    <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder={t.register.passwordPlaceholder}
                      className="w-full px-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-gray-700">{t.register.confirmPassword} <span className="text-red-500">{t.common.required}</span></label>
                  <div className="relative">
                    <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder={t.register.confirmPasswordPlaceholder}
                      className="w-full px-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-xs text-blue-900">
                  {t.register.terms}
                </p>
              </div>

              <button
                onClick={handleRegister}
                disabled={isProcessing || !formData.firstName || !formData.lastName || !formData.taxId || !formData.email || !formData.phone || !formData.password}
                className={`w-full py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  !isProcessing && !formData.firstName && !formData.lastName && formData.taxId && formData.email && formData.phone && formData.password
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t.register.submitting}
                  </>
                ) : (
                  t.register.submit
                )}
              </button>
            </motion.div>
          )}

          {/* Step 3c: Google OAuth */}
          {currentStep === 'googleAuth' && (
            <motion.div
              key="googleAuth"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 space-y-6"
            >
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-white border-2 border-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-5xl">🔵</span>
                </div>
                <h2 className="text-2xl mb-2">{t.googleAuth.title}</h2>
                <p className="text-gray-600">{t.googleAuth.subtitle}</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h3 className="text-sm mb-4">{t.googleAuth.willReceive}</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm text-gray-700">{t.googleAuth.permission1}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm text-gray-700">{t.googleAuth.permission2}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm text-gray-700">{t.googleAuth.permission3}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-xs text-blue-900">
                  🔒 {t.googleAuth.security}
                </p>
              </div>

              <button
                onClick={handleGoogleAuth}
                disabled={isProcessing}
                className={`w-full py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  !isProcessing
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t.googleAuth.submitting}
                  </>
                ) : (
                  <>
                    <span className="text-xl">🔵</span>
                    {t.googleAuth.submit}
                  </>
                )}
              </button>
            </motion.div>
          )}

          {/* Step 4: Email Verification */}
          {currentStep === 'emailVerify' && (
            <motion.div
              key="emailVerify"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 space-y-6"
            >
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-2xl mb-2">{t.emailVerify.title}</h2>
                <p className="text-gray-600 mb-2">{t.emailVerify.subtitle}</p>
                <p className="text-emerald-600">{formData.email}</p>
              </div>

              <div>
                <label className="block mb-3 text-center text-gray-700">{t.emailVerify.codeLabel}</label>
                <div className="flex gap-2 justify-center">
                  {verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const newCode = [...verificationCode];
                        newCode[index] = e.target.value;
                        setVerificationCode(newCode);
                        if (e.target.value && index < 5) {
                          const nextInput = e.target.parentElement?.children[index + 1] as HTMLInputElement;
                          nextInput?.focus();
                        }
                      }}
                      className="w-12 h-14 text-center text-xl border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                  ))}
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">{t.emailVerify.didntReceive}</p>
                <button 
                  onClick={handleResendCode}
                  className="text-sm text-emerald-600 hover:underline"
                >
                  {t.emailVerify.resend}
                </button>
              </div>

              <button
                onClick={handleVerifyEmail}
                disabled={isProcessing || verificationCode.some(d => !d)}
                className={`w-full py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  !isProcessing && verificationCode.every(d => d)
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t.emailVerify.submitting}
                  </>
                ) : (
                  t.emailVerify.submit
                )}
              </button>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-xs text-amber-900">
                  ⚠️ {t.emailVerify.spamNotice}
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 5: Subscription Selection */}
          {currentStep === 'subscription' && (
            <motion.div
              key="subscription"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 space-y-6"
            >
              <div className="text-center py-4">
                <h2 className="text-2xl mb-2">{t.subscription.title}</h2>
                <p className="text-gray-600">{t.subscription.subtitle}</p>
              </div>

              <div className="space-y-4">
                {plans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`rounded-2xl p-6 border-2 transition-all relative ${
                      plan.id === 'premium'
                        ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <div className="px-4 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full text-xs flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {t.subscription.popular}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {plan.id === 'premium' && <Crown className="w-6 h-6 text-amber-600" />}
                        <h3 className="text-xl">{plan.name}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl">₦{plan.price}</p>
                        <p className="text-xs text-gray-600">{plan.period}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                            plan.id === 'premium' ? 'text-amber-600' : 'text-emerald-600'
                          }`} />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handleSubscriptionSelect(plan.id)}
                      className={`w-full py-3 rounded-xl transition-all ${
                        plan.id === 'premium'
                          ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:shadow-lg'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      {plan.id === 'premium' ? t.subscription.startPremium : t.subscription.startBasic}
                    </button>
                  </motion.div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-xs text-blue-900 text-center">
                  💡 {t.subscription.notice}
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 6: Payment Processing */}
          {currentStep === 'payment' && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 space-y-6"
            >
              <div className="text-center py-4">
                <h2 className="text-2xl mb-2">{t.payment.title}</h2>
                <p className="text-gray-600">{t.payment.subtitle}</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white">
                <p className="text-emerald-100 text-sm mb-2">{t.payment.planLabel}</p>
                <p className="text-3xl mb-2">₦500</p>
                <p className="text-emerald-100 text-sm">{t.payment.billingNote}</p>
              </div>

              {paymentError ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
                    <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
                    <h3 className="text-lg mb-2 text-red-900">{t.payment.failed}</h3>
                    <p className="text-sm text-red-700">
                      {t.payment.failedMessage}
                    </p>
                  </div>

                  <button
                    onClick={handleRetryPayment}
                    className="w-full py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 shadow-lg transition-all"
                  >
                    {t.payment.retry}
                  </button>

                  <button
                    onClick={() => setCurrentStep('subscription')}
                    className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
                  >
                    {t.payment.choosePlan}
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2 text-gray-700">{t.payment.cardNumber}</label>
                      <div className="relative">
                        <CreditCard className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder={t.payment.cardPlaceholder}
                          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block mb-2 text-gray-700 text-sm">{t.payment.expiry}</label>
                        <input
                          type="text"
                          placeholder={t.payment.expiryPlaceholder}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-gray-700 text-sm">{t.payment.cvv}</label>
                        <input
                          type="text"
                          placeholder={t.payment.cvvPlaceholder}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
                    <Shield className="w-8 h-8 text-blue-600 flex-shrink-0" />
                    <p className="text-xs text-blue-900">
                      🔒 {t.payment.security}
                    </p>
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className={`w-full py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                      !isProcessing
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {t.payment.submitting}
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        {t.payment.submit}
                      </>
                    )}
                  </button>
                </>
              )}
            </motion.div>
          )}

          {/* Step 7: Success & Complete */}
          {currentStep === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 text-center py-12"
              onAnimationComplete={handleComplete}
            >
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -100, x: Math.random() * 390, opacity: 1 }}
                    animate={{ y: 900, opacity: 0 }}
                    transition={{ duration: 2, delay: i * 0.05 }}
                    className={`absolute w-2 h-2 rounded-full ${
                      i % 3 === 0 ? 'bg-emerald-500' : i % 3 === 1 ? 'bg-amber-500' : 'bg-blue-500'
                    }`}
                  />
                ))}
              </div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-600" />
              </motion.div>

              <h2 className="text-2xl mb-2">{t.success.title}</h2>
              <p className="text-gray-600 mb-8">{t.success.subtitle}</p>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
                <h3 className="text-sm mb-3 text-emerald-900">{t.success.allSet}</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-emerald-800">
                    <Check className="w-4 h-4" />
                    <span>{t.success.verified}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-emerald-800">
                    <Check className="w-4 h-4" />
                    <span>{selectedPlan === 'premium' ? t.subscription.premium : t.subscription.basic} {t.success.planActivated}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-emerald-800">
                    <Check className="w-4 h-4" />
                    <span>{t.success.ready}</span>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-600 mb-2" />
                <p className="text-sm text-gray-600">{t.success.redirecting}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
