import { motion } from 'motion/react';
import { Mic, Volume2 } from 'lucide-react';
import { useState } from 'react';

interface VoiceModeToggleProps {
  onSelect: (enabled: boolean) => void;
}

export function VoiceModeToggle({ onSelect }: VoiceModeToggleProps) {
  const [enabled, setEnabled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

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
        <h1 className="text-white text-2xl mb-2">Voice Commands</h1>
        <p className="text-emerald-100">Enable voice features for easier navigation</p>
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
                <h3 className="text-lg">Enable Voice Commands?</h3>
                <p className="text-sm text-gray-600">Perfect for hands-free use</p>
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
            <p className="text-sm text-gray-700">
              {enabled 
                ? '✓ Voice commands enabled. You can speak to add transactions and navigate.'
                : 'Enable to use voice for adding entries and navigation.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200">
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-xl bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition-all duration-300"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
