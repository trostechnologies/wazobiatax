import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useState } from 'react';

interface LanguageSelectionProps {
  onSelect: (language: string) => void;
}

const languages = [
  { id: 'english', name: 'English', flag: '🇬🇧' },
  { id: 'pidgin', name: 'Pidgin', flag: '🇳🇬' },
  { id: 'hausa', name: 'Hausa', flag: '🇳🇬' },
  { id: 'yoruba', name: 'Yoruba', flag: '🇳🇬' },
  { id: 'igbo', name: 'Igbo', flag: '🇳🇬' },
];

export function LanguageSelection({ onSelect }: LanguageSelectionProps) {
  const [selected, setSelected] = useState('');

  const handleSelect = (langId: string) => {
    setSelected(langId);
  };

  const handleNext = () => {
    if (selected) {
      onSelect(selected);
    }
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

      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-8">
        <h1 className="text-white text-2xl mb-2">Choose Your Language</h1>
        <p className="text-emerald-100">Select your preferred language to continue</p>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-2 py-6">
        <div className="w-2 h-2 rounded-full bg-emerald-600" />
        <div className="w-2 h-2 rounded-full bg-gray-300" />
        <div className="w-2 h-2 rounded-full bg-gray-300" />
      </div>

      {/* Language Cards */}
      <div className="flex-1 px-6 overflow-y-auto pb-24">
        <div className="space-y-3">
          {languages.map((lang, index) => (
            <motion.button
              key={lang.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleSelect(lang.id)}
              className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 ${
                selected === lang.id
                  ? 'border-emerald-600 bg-emerald-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{lang.flag}</span>
                  <span className="text-lg">{lang.name}</span>
                </div>
                {selected === lang.id && (
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
      </div>

      {/* Next Button */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200">
        <button
          onClick={handleNext}
          disabled={!selected}
          className={`w-full py-4 rounded-xl transition-all duration-300 ${
            selected
              ? 'bg-emerald-600 text-white shadow-lg hover:bg-emerald-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
