import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';
import { forgotPasswordTranslations, type ForgotPasswordLanguageKey } from '../translations/forgotPassword';
import { useNavigate } from 'react-router-dom';
import Logo from '@/assets/wazobiatax-logo.png'

interface ForgotPasswordSuccessProps {
  onNavigate: (screen: string) => void;
  language: ForgotPasswordLanguageKey;
}

export function ForgotPasswordSuccess({ onNavigate, language }: ForgotPasswordSuccessProps) {
  const t = forgotPasswordTranslations[language];

  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to login after 3 seconds
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

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
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-4 flex items-center justify-center">
      <div className="flex items-center justify-center gap-2">
                    <div className="flex justify-center items-center">
                        <img src={Logo} alt="logo" className='h-8 pointer-events-none select-none' />
                    </div>
                </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6 max-w-md"
        >
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2 
            }}
            className="relative"
          >
            <div className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center mx-auto relative">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <CheckCircle2 className="w-16 h-16 text-emerald-600" />
              </motion.div>
              
              {/* Confetti effect */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{ 
                    scale: [0, 1, 0],
                    x: Math.cos(i * Math.PI / 4) * 60,
                    y: Math.sin(i * Math.PI / 4) * 60,
                  }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 bg-emerald-400 rounded-full"
                  style={{ transformOrigin: 'center' }}
                />
              ))}
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <h1 className="text-2xl">{t.success.title}</h1>
            <p className="text-gray-600">{t.success.subtitle}</p>
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <p className="text-emerald-700">{t.success.message}</p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <button
              onClick={() => navigate('/onboarding')}
              className="w-full py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-300 shadow-lg"
            >
              {t.success.goToLogin}
            </button>

            {/* Auto-redirect notice */}
            <div className="flex items-center justify-center gap-2">
              <div className="flex gap-1">
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 bg-emerald-600 rounded-full"
                />
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-emerald-600 rounded-full"
                />
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 bg-emerald-600 rounded-full"
                />
              </div>
              <p className="text-sm text-gray-600">{t.success.redirecting}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
