import { motion, AnimatePresence } from 'motion/react';
import { Mic, Volume2 } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from "@/context/LanguageContext";

const headers: Record<string, string> = {
  english: "Voice Commands",
  pidgin: "Voice Commands",
  hausa: "Umarnin Murya",
  yoruba: "Awọn aṣẹ Ohùn",
  igbo: "Iwu olu",
};

const subtitles: Record<string, string> = {
  english: "Enable voice features for easier navigation",
  pidgin: "Turn on voice make e easy to waka around",
  hausa: "Bada izinin murya don sauƙin amfani",
  yoruba: "Ṣii awọn ẹya ohùn fun lilọ kiri rọọrun",
  igbo: "Gbanyụọ olu maka mfe navigation",
};

const toggleTitles: Record<string, string> = {
  english: "Enable Voice Commands?",
  pidgin: "Make Voice Work?",
  hausa: "Bada umarnin murya?",
  yoruba: "Ṣii awọn aṣẹ ohùn?",
  igbo: "Gbanyụọ iwu olu?",
};

const toggleSubtitles: Record<string, string> = {
  english: "Perfect for hands-free use",
  pidgin: "E perfect for hands-free use",
  hausa: "Ya dace da amfani ba tare da hannu ba",
  yoruba: "Pipe fun lilo laisi ọwọ",
  igbo: "Dabara maka iji aka efu",
};

const nextButtonText: Record<string, string> = {
  english: "Continue",
  pidgin: "Continue",
  hausa: "Ci gaba",
  yoruba: "Tẹ̀síwájú",
  igbo: "Gaa n’ihu",
};

const voiceStatusText: Record<string, { enabled: string; disabled: string }> = {
  english: {
    enabled: "✓ Voice commands enabled. You can speak to add transactions and navigate.",
    disabled: "Enable to use voice for adding entries and navigation.",
  },
  pidgin: {
    enabled: "✓ Voice commands don dey enabled. You fit talk to add transactions and waka around.",
    disabled: "Enable am to use voice for adding entries and waka around.",
  },
  hausa: {
    enabled: "✓ Umarnin murya an kunna. Za ka iya amfani da murya don ƙara ma'amaloli da kewaya.",
    disabled: "Kunna don amfani da murya wajen ƙara ma'amaloli da kewaya.",
  },
  yoruba: {
    enabled: "✓ Awọn aṣẹ ohùn ti muu ṣiṣẹ. O le sọ lati fi awọn iṣẹ kun ati lilọ kiri.",
    disabled: "Ṣii lati lo ohùn fun fifi awọn iṣẹ kun ati lilọ kiri.",
  },
  igbo: {
    enabled: "✓ Iwu olu agbakwunyere. Ị nwere ike ikwu iji tinye azụmahịa na ịnyagharịa.",
    disabled: "Gbanyụọ iji jiri olu tinye ihe na ịnyagharịa.",
  },
};

interface VoiceModeToggleProps {
  onSelect: (enabled: boolean) => void;
}

export function VoiceModeToggle({ onSelect }: VoiceModeToggleProps) {
  const [enabled, setEnabled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { language, setLanguage } = useLanguage();

  const handleToggle = () => {
    setEnabled(!enabled);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNext = () => {
    onSelect(enabled);
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

      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-8">
  <AnimatePresence mode="wait">
    <motion.h1
      key={language}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="text-white text-2xl mb-2"
    >
      {headers[language]}
    </motion.h1>
  </AnimatePresence>

  <AnimatePresence mode="wait">
    <motion.p
      key={language}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
      className="text-emerald-100"
    >
      {subtitles[language]}
    </motion.p>
  </AnimatePresence>
</div>

      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-2 py-6">
        <div className="w-2 h-2 rounded-full bg-emerald-600" />
        <div className="w-2 h-2 rounded-full bg-emerald-600" />
        <div className="w-2 h-2 rounded-full bg-gray-300" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
        {/* Mic Icon with Animation */}
        <motion.div
          animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
          className="mb-8"
        >
          <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
            enabled ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' : 'bg-gray-100'
          }`}>
            <Mic className={`w-16 h-16 ${enabled ? 'text-white' : 'text-gray-400'}`} />
          </div>
        </motion.div>

        {/* Audio Wave Animation */}
        {enabled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1 mb-8"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: ['8px', '24px', '8px'],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                className="w-1 bg-emerald-600 rounded-full"
              />
            ))}
          </motion.div>
        )}

        {/* Toggle Card */}
        <div className="w-full bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
  <Volume2 className="w-6 h-6 text-emerald-600" />
  <div>
    <AnimatePresence mode="wait">
      <motion.h3
        key={language}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.25 }}
        className="text-lg"
      >
        {toggleTitles[language]}
      </motion.h3>
    </AnimatePresence>

    <AnimatePresence mode="wait">
      <motion.p
        key={language}
        initial={{ opacity: 0, y: 3 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -3 }}
        transition={{ duration: 0.2 }}
        className="text-sm text-gray-600"
      >
        {toggleSubtitles[language]}
      </motion.p>
    </AnimatePresence>
  </div>
</div>
            <button
              onClick={handleToggle}
              className={`w-14 h-8 rounded-full transition-all duration-300 relative ${
                enabled ? 'bg-emerald-600' : 'bg-gray-300'
              }`}
            >
              <motion.div
                animate={{ x: enabled ? 24 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
              />
            </button>
          </div>
          
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
  <AnimatePresence mode="wait">
    <motion.p
      key={enabled + language} // re-animates when either changes
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.25 }}
      className="text-sm text-gray-700"
    >
      {enabled
        ? voiceStatusText[language].enabled
        : voiceStatusText[language].disabled}
    </motion.p>
  </AnimatePresence>
</div>
        </div>
      </div>

      {/* Next Button */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200">
  <button
    onClick={handleNext}
    className="w-full py-4 rounded-xl bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition-all duration-300"
  >
    <AnimatePresence mode="wait">
      <motion.span
        key={language}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.25 }}
        className="inline-block"
      >
        {nextButtonText[language]}
      </motion.span>
    </AnimatePresence>
  </button>
</div>
    </div>
  );
}
