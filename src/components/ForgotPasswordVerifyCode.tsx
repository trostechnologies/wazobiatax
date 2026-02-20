import { motion } from 'motion/react';
import { ArrowLeft, Loader2, Mail, CheckCircle2, XCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { forgotPasswordTranslations, type ForgotPasswordLanguageKey } from '../translations/forgotPassword';
import { useNavigate } from 'react-router-dom';
import Logo from '@/assets/wazobiatax-logo.png'

interface ForgotPasswordVerifyCodeProps {
  onNavigate: (screen: string) => void;
  language: ForgotPasswordLanguageKey;
  email: string;
}

export function ForgotPasswordVerifyCode({ onNavigate, language, email }: ForgotPasswordVerifyCodeProps) {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const t = forgotPasswordTranslations[language];

  const navigate = useNavigate();

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0];
    }

    if (!/^\d*$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
    setVerificationCode(newCode);
    
    const nextEmptyIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextEmptyIndex]?.focus();
  };

  const handleVerify = () => {
    const code = verificationCode.join('');
    if (code.length !== 6) return;

    setIsProcessing(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      // For demo, accept code "123456" as valid
      if (code === '123456') {
        navigate('/forgot-password-reset');
      } else {
        setError(t.verifyCode.invalidCode);
      }
    }, 2000);
  };

  const handleResend = () => {
    setIsResending(true);
    setResendSuccess(false);
    
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      setResendSuccess(true);
      setVerificationCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setResendSuccess(false);
      }, 3000);
    }, 1500);
  };

  const isCodeComplete = verificationCode.every(digit => digit !== '');

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

      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-4 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-white/10 rounded-lg transition-all"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <div className="flex items-center justify-center gap-2">
          <div className="flex justify-center items-center">
            <img src={Logo} alt="logo" className='h-8 pointer-events-none select-none' />
          </div>
        </div>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Icon and Title */}
          <div className="text-center py-4">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-2xl mb-2">{t.verifyCode.title}</h1>
            <p className="text-gray-600 mb-2">{t.verifyCode.subtitle}</p>
            <p className="text-emerald-600">{email}</p>
          </div>

          {/* Verification Code Input */}
          <div className="space-y-4">
            <label className="block text-center text-gray-700">{t.verifyCode.codeLabel}</label>
            <div className="flex justify-center gap-2">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}                  
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`w-12 h-14 text-center text-xl border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all ${
                    error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  } ${digit ? 'border-emerald-500 bg-emerald-50' : ''}`}
                />
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl"
              >
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </motion.div>
            )}

            {/* Success Message */}
            {resendSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <p className="text-sm text-emerald-600">{t.verifyCode.resent}</p>
              </motion.div>
            )}
          </div>

          {/* Spam Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-amber-800">{t.verifyCode.spamNotice}</p>
          </div>

          {/* Resend Code */}
          <div className="text-center space-y-3">
            <p className="text-sm text-gray-600">{t.verifyCode.didntReceive}</p>
            <button
              onClick={handleResend}
              disabled={isResending}
              className="text-emerald-600 hover:underline disabled:text-gray-400 flex items-center justify-center gap-2 mx-auto"
            >
              {isResending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t.verifyCode.resending}
                </>
              ) : (
                t.verifyCode.resend
              )}
            </button>
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={isProcessing || !isCodeComplete}
            className={`w-full py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
              !isProcessing && isCodeComplete
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t.verifyCode.submitting}
              </>
            ) : (
              t.verifyCode.submit
            )}
          </button>

          {/* Back to Email Link */}
          <div className="text-center">
            <button
              onClick={() => navigate('/forgot-password-email')}
              className="text-emerald-600 hover:underline text-sm"
            >
              {t.verifyCode.backToEmail}
            </button>
          </div>

          {/* Demo Hint */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm text-blue-800 text-center">
              <strong>Demo:</strong> Use code <strong>123456</strong> to verify
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
