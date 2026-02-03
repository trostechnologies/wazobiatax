import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Camera, RefreshCw, Check, AlertCircle, Edit3, Save } from 'lucide-react';
import { useState } from 'react';
import { profileTranslations, type LanguageKey } from '../translations/profile';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface ScanReceiptProps {
  language?: LanguageKey;
}

export function ScanReceipt({ language = 'english' }: ScanReceiptProps) {
  const t = profileTranslations[language].scanReceipt;
  const [scanStep, setScanStep] = useState<'permission' | 'camera' | 'preview' | 'extracted'>('camera');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState({
    vendor: 'Fresh Foods Market',
    date: '2026-02-02',
    amount: '5,000',
    category: 'Food Supplies'
  });

  const navigate = useNavigate();

  const handleCapture = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setScanStep('preview');
    }, 1500);
  };

  const handleConfirmAndExtract = () => {
    setIsExtracting(true);
    setTimeout(() => {
      setIsExtracting(false);
      setScanStep('extracted');
    }, 2000);
  };

  const handleSave = () => {
    toast.success(t.saved);
    setTimeout(() => {
        navigate('/ledger');
    }, 1000);
  };

  const handleRetake = () => {
    setScanStep('camera');
  };

  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      {/* Status Bar */}
      <div className="h-11 bg-gray-900 flex items-center justify-between px-6 text-white text-sm">
        <span>21:41</span>
        <div className="flex items-center gap-1">
          <div className="w-4 h-3 border border-white rounded-sm" />
          <div className="w-4 h-3 border border-white rounded-sm" />
          <span className="text-xs">70</span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gray-900 px-6 pt-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/ledger')}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-lg flex-1 text-center mr-10">{t.title}</h1>
        </div>
        <p className="text-gray-300 text-center text-sm">{t.subtitle}</p>
      </div>

      <AnimatePresence mode="wait">
        {scanStep === 'camera' && (
          <motion.div
            key="camera"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-6"
          >
            {/* Camera Viewfinder */}
            <div className="relative aspect-[3/4] bg-black rounded-2xl overflow-hidden mb-6 border-2 border-purple-500">
              {/* Mock Camera View */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">Camera View</p>
                  <p className="text-xs mt-2">Position receipt here</p>
                </div>
              </div>

              {/* Scanning Frame */}
              <div className="absolute inset-8 border-2 border-dashed border-purple-400 rounded-xl">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-purple-500 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-purple-500 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-purple-500 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-purple-500 rounded-br-lg" />
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gray-800 rounded-2xl p-6 mb-6">
              <h3 className="text-white text-sm mb-4">{t.instructions}</h3>
              <div className="space-y-3">
                {[t.step1, t.step2, t.step3, t.step4].map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs">
                      {index + 1}
                    </div>
                    <p className="text-gray-300 text-sm flex-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Capture Button */}
            <button
              onClick={handleCapture}
              disabled={isProcessing}
              className={`w-full py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                isProcessing
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              <Camera className="w-5 h-5" />
              {isProcessing ? t.processingButton : t.captureButton}
            </button>

            {/* Tip */}
            <div className="mt-4 p-4 bg-purple-900/30 border border-purple-500/30 rounded-xl">
              <p className="text-purple-200 text-xs">{t.scanTip}</p>
            </div>
          </motion.div>
        )}

        {scanStep === 'preview' && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="px-6"
          >
            {/* Preview Image */}
            <div className="relative aspect-[3/4] bg-white rounded-2xl overflow-hidden mb-6 border-2 border-emerald-500">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Check className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-sm">Receipt Captured</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={handleRetake}
                className="flex-1 py-4 border border-gray-600 text-white rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                {t.retakeButton}
              </button>
              <button
                onClick={handleConfirmAndExtract}
                disabled={isExtracting}
                className={`flex-1 py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  isExtracting
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                <Check className="w-5 h-5" />
                {isExtracting ? t.extracting : t.confirmButton}
              </button>
            </div>
          </motion.div>
        )}

        {scanStep === 'extracted' && (
          <motion.div
            key="extracted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-6"
          >
            {/* Success Indicator */}
            <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white text-sm">{t.detectedFields}</h3>
                  <p className="text-emerald-200 text-xs">{t.editDetails}</p>
                </div>
              </div>
            </div>

            {/* Extracted Data */}
            <div className="bg-gray-800 rounded-2xl p-6 space-y-4 mb-6">
              <div>
                <label className="text-xs text-gray-400 mb-2 block">{t.vendor}</label>
                <input
                  type="text"
                  value={extractedData.vendor}
                  onChange={(e) => setExtractedData({ ...extractedData, vendor: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-2 block">{t.date}</label>
                <input
                  type="date"
                  value={extractedData.date}
                  onChange={(e) => setExtractedData({ ...extractedData, date: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-2 block">{t.amount}</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white">₦</span>
                  <input
                    type="text"
                    value={extractedData.amount}
                    onChange={(e) => setExtractedData({ ...extractedData, amount: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-2 block">{t.category}</label>
                <select
                  value={extractedData.category}
                  onChange={(e) => setExtractedData({ ...extractedData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                >
                  <option>Food Supplies</option>
                  <option>Equipment</option>
                  <option>Transportation</option>
                  <option>Utilities</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex gap-3">
              <button
                onClick={handleRetake}
                className="flex-1 py-4 border border-gray-600 text-white rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                {t.retakeButton}
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {t.saveEntry}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
