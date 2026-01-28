import { motion } from 'motion/react';
import { ArrowLeft, Globe, Volume2, Check } from 'lucide-react';
import { useState } from 'react';
import { profileTranslations, type LanguageKey } from '../translations/profile';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface LanguageAndVoiceProps {
  language?: LanguageKey;
  onLanguageChange?: (lang: LanguageKey) => void;
}

export function LanguageAndVoice({ 
  language = 'english',
  onLanguageChange 
}: LanguageAndVoiceProps) {
  const t = profileTranslations[language].languageVoice;
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageKey>(language);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [voiceSpeed, setVoiceSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');

  const languages = [
    { 
      id: 'english' as LanguageKey, 
      name: 'English', 
      flag: '🇬🇧', 
      nativeName: 'English' 
    },
    { 
      id: 'pidgin' as LanguageKey, 
      name: 'Pidgin', 
      flag: '🇳🇬', 
      nativeName: 'Nigerian Pidgin' 
    },
    { 
      id: 'hausa' as LanguageKey, 
      name: 'Hausa', 
      flag: '🇳🇬', 
      nativeName: 'Hausa' 
    },
    { 
      id: 'yoruba' as LanguageKey, 
      name: 'Yoruba', 
      flag: '🇳🇬', 
      nativeName: 'Yorùbá' 
    },
    { 
      id: 'igbo' as LanguageKey, 
      name: 'Igbo', 
      flag: '🇳🇬', 
      nativeName: 'Igbo' 
    },
  ];

  const handleLanguageSelect = (langId: LanguageKey) => {
    setSelectedLanguage(langId);
    if (onLanguageChange) {
      onLanguageChange(langId);
    }
    toast.success(profileTranslations[langId].languageVoice.languageChanged);
  };

  const handleTestVoice = () => {
    toast.info(t.testMessage);
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
            onClick={() => navigate('/profile')}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-lg flex-1 text-center mr-10">{t.title}</h1>
        </div>
        <p className="text-emerald-100 text-center text-sm">{t.subtitle}</p>
      </div>

      {/* Content */}
      <div className="px-6 -mt-4 space-y-6">
        {/* Current Language Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-sm text-gray-600">{t.currentLanguage}</h3>
              <p className="text-lg">
                {languages.find(l => l.id === selectedLanguage)?.nativeName}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Language Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-sm text-gray-600">{t.selectLanguage}</h3>
          </div>
          <div>
            {languages.map((lang, index) => (
              <button
                key={lang.id}
                onClick={() => handleLanguageSelect(lang.id)}
                className={`w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-all ${
                  index !== languages.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{lang.flag}</span>
                  <div className="text-left">
                    <p className="text-sm">{lang.name}</p>
                    <p className="text-xs text-gray-500">{lang.nativeName}</p>
                  </div>
                </div>
                {selectedLanguage === lang.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Voice Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 space-y-6"
        >
          {/* Voice Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                <Volume2 className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-sm">{t.voiceMode}</h3>
                <p className="text-xs text-gray-500">{t.voiceModeDesc}</p>
              </div>
            </div>
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`relative w-14 h-8 rounded-full transition-all ${
                voiceEnabled ? 'bg-emerald-600' : 'bg-gray-300'
              }`}
            >
              <motion.div
                animate={{ x: voiceEnabled ? 24 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 w-6 h-6 bg-white rounded-full"
              />
            </button>
          </div>

          {/* Voice Speed */}
          {voiceEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-3"
            >
              <h3 className="text-sm text-gray-600">{t.voiceSpeed}</h3>
              <div className="flex gap-2">
                {(['slow', 'normal', 'fast'] as const).map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setVoiceSpeed(speed)}
                    className={`flex-1 py-3 rounded-xl transition-all ${
                      voiceSpeed === speed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {t[speed]}
                  </button>
                ))}
              </div>

              {/* Test Voice Button */}
              <button
                onClick={handleTestVoice}
                className="w-full py-3 border border-emerald-600 text-emerald-600 rounded-xl hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
              >
                <Volume2 className="w-5 h-5" />
                {t.testVoice}
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
