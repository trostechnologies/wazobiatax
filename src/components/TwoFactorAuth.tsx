import { motion } from 'motion/react';
import { ArrowLeft, ShieldOff } from 'lucide-react';
import { profileTranslations, type LanguageKey } from '../translations/profile';
import { useNavigate } from 'react-router-dom';

interface TwoFactorAuthProps {
  language?: LanguageKey;
}

export function TwoFactorAuth({ language = 'english' }: TwoFactorAuthProps) {
  const t = profileTranslations[language].twoFactor;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Status Bar */}
      <div className="h-11 bg-emerald-600 flex items-center justify-between px-6 text-white text-sm">

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 text-center"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldOff className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-lg mb-2">Coming soon</h2>
          <p className="text-sm text-gray-600 mb-6">
            Two-factor authentication isn't available yet. We're working on bringing it to WazobiaTax soon.
          </p>
          <button
            onClick={() => navigate('/security-and-privacy')}
            className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
          >
            {t.cancel}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
