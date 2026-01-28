import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Smartphone, Copy, Check, Download, Printer, Lock, X } from 'lucide-react';
import { useState } from 'react';
import { profileTranslations, type LanguageKey } from '../translations/profile';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface TwoFactorAuthProps {
  language?: LanguageKey;
}

export function TwoFactorAuth({ language = 'english' }: TwoFactorAuthProps) {
  const t = profileTranslations[language].twoFactor;
  const [currentStep, setCurrentStep] = useState<'setup' | 'backup' | 'disable'>('setup');
  const [verificationCode, setVerificationCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const navigate = useNavigate();

  // Mock QR code and manual code
  const manualCode = 'JBSW Y3DP EHPK 3PXP';
  const backupCodes = [
    '8274-9362',
    '5491-7283',
    '3728-1945',
    '9164-5837',
    '2847-6194',
    '7392-4618'
  ];

  const handleCopyCode = () => {
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
    toast.success(t.codeCopied);
  };

  const handleVerify = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsEnabled(true);
      setCurrentStep('backup');
      toast.success(t.success);
    }, 1500);
  };

  const handleDisable = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsEnabled(false);
      toast.success(t.disableSuccess);
      navigate('/security-and-privacy');
    }, 1500);
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
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 px-6 pt-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/security-and-privacy')}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-lg flex-1 text-center mr-10">{t.title}</h1>
        </div>
        <p className="text-emerald-100 text-center text-sm">{t.subtitle}</p>
      </div>

      {/* Content */}
      <div className="px-6 -mt-4">
        <AnimatePresence mode="wait">
          {currentStep === 'setup' && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Step 1: Download App */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm mb-2">{t.step1Title}</h3>
                    <p className="text-xs text-gray-500 mb-4">{t.step1Desc}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-50 rounded-lg p-3 flex items-center justify-center gap-2">
                        <Smartphone className="w-5 h-5 text-emerald-600" />
                        <span className="text-xs text-gray-600">Google Authenticator</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Scan QR Code */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm mb-2">{t.step2Title}</h3>
                    <p className="text-xs text-gray-500 mb-4">{t.step2Desc}</p>
                    
                    {/* Mock QR Code */}
                    <div className="bg-gray-100 rounded-xl p-6 flex items-center justify-center mb-4">
                      <div className="w-48 h-48 bg-white border-4 border-gray-300 rounded-lg flex items-center justify-center">
                        <div className="text-center text-gray-400 text-xs">
                          QR Code
                          <br />
                          (Scan with app)
                        </div>
                      </div>
                    </div>

                    {/* Manual Code */}
                    <div className="space-y-2">
                      <p className="text-xs text-gray-600">{t.manualCode}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-50 rounded-lg px-4 py-3 tracking-wider text-center">
                          {manualCode}
                        </div>
                        <button
                          onClick={handleCopyCode}
                          className="p-3 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-all"
                        >
                          {codeCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Verify */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm mb-2">{t.step3Title}</h3>
                    <p className="text-xs text-gray-500 mb-4">{t.step3Desc}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-gray-600 mb-2 block">{t.verificationCode}</label>
                        <input
                          type="text"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          placeholder={t.placeholder}
                          maxLength={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-center tracking-widest text-lg"
                        />
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => navigate('/security-and-privacy')}
                          className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
                        >
                          {t.cancel}
                        </button>
                        <button
                          onClick={handleVerify}
                          disabled={verificationCode.length !== 6 || isProcessing}
                          className={`flex-1 py-3 rounded-xl transition-all ${
                            verificationCode.length === 6 && !isProcessing
                              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {isProcessing ? t.verifying : t.verify}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 'backup' && (
            <motion.div
              key="backup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className="text-lg mb-2">{t.backupCodes}</h2>
                <p className="text-sm text-gray-600">{t.backupCodesDesc}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="grid grid-cols-2 gap-3">
                  {backupCodes.map((code, index) => (
                    <div
                      key={index}
                      className="bg-white px-4 py-3 rounded-lg text-center tracking-wider"
                    >
                      {code}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mb-4">
                <button className="flex-1 py-3 border border-emerald-600 text-emerald-600 rounded-xl hover:bg-emerald-50 transition-all flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  {t.downloadCodes}
                </button>
                <button className="flex-1 py-3 border border-emerald-600 text-emerald-600 rounded-xl hover:bg-emerald-50 transition-all flex items-center justify-center gap-2">
                  <Printer className="w-5 h-5" />
                  {t.printCodes}
                </button>
              </div>

              <button
                onClick={() => navigate('/security-and-privacy')}
                className="w-full py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all"
              >
                {t.done}
              </button>
            </motion.div>
          )}

          {currentStep === 'disable' && (
            <motion.div
              key="disable"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-lg mb-2">{t.disableTitle}</h2>
                <p className="text-sm text-gray-600">{t.disableDesc}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-600 mb-2 block">{t.password}</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate('/security-and-privacy')}
                    className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
                  >
                    {t.cancel}
                  </button>
                  <button
                    onClick={handleDisable}
                    className="flex-1 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all"
                  >
                    {isProcessing ? t.disabling : t.disable}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
