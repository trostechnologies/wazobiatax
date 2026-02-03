import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Mic, Square, RefreshCw, Check, Volume2, Edit3, Save } from 'lucide-react';
import { useState } from 'react';
import { profileTranslations, type LanguageKey } from '../translations/profile';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface VoiceEntryProps {
  language?: LanguageKey;
}

export function VoiceEntry({ language = 'english' }: VoiceEntryProps) {
  const t = profileTranslations[language].voiceEntry;
  const [recordingStep, setRecordingStep] = useState<'ready' | 'listening' | 'processing' | 'review'>('ready');
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [detectedData, setDetectedData] = useState({
    amount: '5,000',
    type: 'Expense',
    category: 'Food Supplies',
    description: 'Food supplies purchase'
  });

  const navigate = useNavigate();

  const handleStartListening = () => {
    setIsListening(true);
    setRecordingStep('listening');
    
    // Simulate voice recognition
    setTimeout(() => {
      setTranscription('I spent 5000 naira on food supplies today');
      setIsListening(false);
      setRecordingStep('processing');
      
      setTimeout(() => {
        setRecordingStep('review');
      }, 1500);
    }, 3000);
  };

  const handleStopListening = () => {
    setIsListening(false);
    if (transcription) {
      setRecordingStep('processing');
      setTimeout(() => {
        setRecordingStep('review');
      }, 1500);
    } else {
      setRecordingStep('ready');
      toast.error(t.noSpeech);
    }
  };

  const handleTryAgain = () => {
    setTranscription('');
    setRecordingStep('ready');
  };

  const handleSave = () => {
    toast.success(t.saved);
    setTimeout(() => {
        navigate('ledger');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 pb-20">
      {/* Status Bar */}
      <div className="h-11 bg-blue-900 flex items-center justify-between px-6 text-white text-sm">
        <span>21:41</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-3 border border-white rounded-sm" />
          <div className="w-4 h-3 border border-white rounded-sm" />
          <span className="text-xs">70</span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-blue-900 px-6 pt-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('ledger')}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-lg flex-1 text-center mr-10">{t.title}</h1>
        </div>
        <p className="text-blue-200 text-center text-sm">{t.subtitle}</p>
      </div>

      <div className="px-6">
        <AnimatePresence mode="wait">
          {recordingStep === 'ready' && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Microphone Visual */}
              <div className="flex justify-center mb-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-2xl">
                    <Mic className="w-20 h-20 text-blue-600" />
                  </div>
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-blue-400 rounded-full -z-10"
                  />
                </motion.div>
              </div>

              {/* Instructions */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                <h3 className="text-white text-sm mb-4">{t.instructions}</h3>
                <div className="space-y-3">
                  {[t.step1, t.step2, t.step3, t.step4].map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs">
                        {index + 1}
                      </div>
                      <p className="text-blue-100 text-sm flex-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Example */}
              <div className="bg-blue-800/50 border border-blue-400/30 rounded-2xl p-6">
                <h4 className="text-blue-200 text-xs mb-2">{t.example}</h4>
                <p className="text-white text-sm italic">{t.exampleText}</p>
              </div>

              {/* Tips */}
              <div className="bg-white/5 rounded-2xl p-6">
                <h4 className="text-blue-200 text-xs mb-3">{t.tips}</h4>
                <div className="space-y-2">
                  {[t.tip1, t.tip2, t.tip3, t.tip4].map((tip, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-blue-400 text-sm">•</span>
                      <p className="text-blue-100 text-xs">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Start Button */}
              <button
                onClick={handleStartListening}
                className="w-full py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Mic className="w-5 h-5" />
                {t.startListening}
              </button>
            </motion.div>
          )}

          {recordingStep === 'listening' && (
            <motion.div
              key="listening"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              {/* Animated Microphone */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-2xl"
                  >
                    <Mic className="w-20 h-20 text-red-600" />
                  </motion.div>
                  
                  {/* Pulsing rings */}
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [1, 2.5],
                        opacity: [0.6, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "easeOut"
                      }}
                      className="absolute inset-0 bg-red-400 rounded-full"
                    />
                  ))}
                </div>
              </div>

              {/* Listening Indicator */}
              <div className="bg-red-900/30 border border-red-400/30 rounded-2xl p-6 text-center">
                <h3 className="text-white text-lg mb-2">{t.listening}</h3>
                <p className="text-red-200 text-sm">Speak clearly and naturally...</p>
                
                {/* Waveform Animation */}
                <div className="flex justify-center items-center gap-1 mt-6 h-12">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: ['20%', '100%', '20%']
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.05,
                        ease: "easeInOut"
                      }}
                      className="w-1 bg-white rounded-full"
                    />
                  ))}
                </div>
              </div>

              {/* Live Transcription */}
              {transcription && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
                >
                  <h4 className="text-blue-200 text-xs mb-2">{t.transcription}</h4>
                  <p className="text-white text-sm">{transcription}</p>
                </motion.div>
              )}

              {/* Stop Button */}
              <button
                onClick={handleStopListening}
                className="w-full py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Square className="w-5 h-5" />
                {t.stopListening}
              </button>
            </motion.div>
          )}

          {recordingStep === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[60vh]"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 border-4 border-white/20 border-t-white rounded-full mb-6"
              />
              <h3 className="text-white text-lg mb-2">{t.processing}</h3>
              <p className="text-blue-200 text-sm">Analyzing your voice input...</p>
            </motion.div>
          )}

          {recordingStep === 'review' && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Success Indicator */}
              <div className="bg-emerald-900/30 border border-emerald-400/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-sm">{t.detectedInfo}</h3>
                    <p className="text-emerald-200 text-xs">Review and confirm</p>
                  </div>
                </div>

                {/* Transcription Display */}
                <div className="bg-white/10 rounded-xl p-4">
                  <h4 className="text-blue-200 text-xs mb-2">{t.transcription}</h4>
                  <p className="text-white text-sm italic">"{transcription}"</p>
                </div>
              </div>

              {/* Detected Data Form */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                <div>
                  <label className="text-xs text-blue-200 mb-2 block">{t.amount}</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white">₦</span>
                    <input
                      type="text"
                      value={detectedData.amount}
                      onChange={(e) => setDetectedData({ ...detectedData, amount: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none placeholder-blue-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-blue-200 mb-2 block">{t.type}</label>
                  <select
                    value={detectedData.type}
                    onChange={(e) => setDetectedData({ ...detectedData, type: e.target.value })}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  >
                    <option className="bg-blue-900">Income</option>
                    <option className="bg-blue-900">Expense</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-blue-200 mb-2 block">{t.category}</label>
                  <select
                    value={detectedData.category}
                    onChange={(e) => setDetectedData({ ...detectedData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  >
                    <option className="bg-blue-900">Food Supplies</option>
                    <option className="bg-blue-900">Equipment</option>
                    <option className="bg-blue-900">Transportation</option>
                    <option className="bg-blue-900">Utilities</option>
                    <option className="bg-blue-900">Sales Revenue</option>
                    <option className="bg-blue-900">Service Income</option>
                    <option className="bg-blue-900">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-blue-200 mb-2 block">{t.description}</label>
                  <textarea
                    value={detectedData.description}
                    onChange={(e) => setDetectedData({ ...detectedData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none placeholder-blue-200 resize-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleTryAgain}
                  className="flex-1 py-4 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  {t.tryAgain}
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Save className="w-5 h-5" />
                  {t.saveEntry}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
