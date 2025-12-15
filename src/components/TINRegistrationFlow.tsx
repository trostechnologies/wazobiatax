import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, Shield, CheckCircle2, Camera, Loader2, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface TINRegistrationFlowProps {
  onComplete: () => void;
}

export function TINRegistrationFlow({ onComplete }: TINRegistrationFlowProps) {
  const [step, setStep] = useState(1);
  const [bvn, setBvn] = useState('');
  const [showBvn, setShowBvn] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  });
  const [tin, setTin] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleVerifyBVN = () => {
    if (bvn.length === 11) {
      setIsVerifying(true);
      setVerificationError('');
      
      // Simulate API call
      setTimeout(() => {
        setIsVerifying(false);
        // Simulate 80% success rate
        if (Math.random() > 0.2) {
          setFormData({
            name: 'Chukwuma Okafor',
            address: '123 Market Street, Lagos',
            phone: '08012345678',
            email: 'chukwuma@example.com',
          });
          setStep(2);
        } else {
          setVerificationError('Invalid BVN - Please try manual entry');
        }
      }, 2000);
    }
  };

  const handleProfileSubmit = () => {
    setStep(3);
    // Generate TIN
    const generatedTin = `${Math.floor(100000000 + Math.random() * 900000000)}-0001`;
    setTin(generatedTin);
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4);
      setShowConfetti(true);
      
      // Auto-proceed to dashboard after celebration
      setTimeout(() => {
        onComplete();
      }, 3000);
    }, 2000);
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
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-6">
        <h1 className="text-white text-2xl mb-1">TIN Registration</h1>
        <p className="text-emerald-100 text-sm">Get your Tax Identification Number</p>
      </div>

      {/* Progress Steps */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                step >= s ? 'bg-emerald-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
              {s < 3 && (
                <div className={`flex-1 h-1 mx-2 rounded transition-all duration-300 ${
                  step > s ? 'bg-emerald-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          <span>Verify</span>
          <span>Profile</span>
          <span>Generate</span>
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <AnimatePresence mode="wait">
          {/* Step 1: BVN/NIN Input */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p>Your BVN is securely verified with NIBSS. We don't store your BVN.</p>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Bank Verification Number (BVN)</label>
                <div className="relative">
                  <input
                    type={showBvn ? 'text' : 'password'}
                    value={bvn}
                    onChange={(e) => setBvn(e.target.value.replace(/\D/g, '').slice(0, 11))}
                    placeholder="Enter 11-digit BVN"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                  <button
                    onClick={() => setShowBvn(!showBvn)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showBvn ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">{bvn.length}/11 digits</p>
              </div>

              {verificationError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800"
                >
                  <p>{verificationError}</p>
                  <button className="mt-2 text-sm text-red-600 underline">
                    Try manual entry instead
                  </button>
                </motion.div>
              )}

              <button
                onClick={handleVerifyBVN}
                disabled={bvn.length !== 11 || isVerifying}
                className={`w-full py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  bvn.length === 11 && !isVerifying
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying with NIBSS...
                  </>
                ) : (
                  'Verify BVN'
                )}
              </button>

              <div className="text-center">
                <button className="text-sm text-emerald-600 underline">
                  Why do we need your BVN?
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Profile Information */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <p className="text-sm text-emerald-900">
                  ✓ Information auto-filled from your BVN. Please review and edit if needed.
                </p>
              </div>

              <div>
                <label className="block mb-2 text-gray-700 flex items-center gap-2">
                  Full Name
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700 flex items-center gap-2">
                  Address
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Upload ID Photo (Optional)</label>
                <button className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 text-gray-600 hover:text-emerald-600">
                  <Camera className="w-5 h-5" />
                  Take Photo or Upload
                </button>
              </div>

              <button
                onClick={handleProfileSubmit}
                className="w-full py-4 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg transition-all duration-300"
              >
                Continue
              </button>
            </motion.div>
          )}

          {/* Step 3: TIN Generation */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </motion.div>
                <h2 className="text-xl mb-2">Provisional TIN Generated</h2>
                <p className="text-gray-600 text-sm">Your Tax Identification Number</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-2xl">
                <p className="text-emerald-100 text-sm mb-2">Your TIN</p>
                <div className="flex items-center justify-between">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl tracking-wider"
                  >
                    {tin}
                  </motion.p>
                  <button className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all text-sm">
                    Copy
                  </button>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-900">
                  📝 This is a provisional TIN. It will be confirmed by FIRS within 24 hours via SMS.
                </p>
              </div>

              <button
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  !isSubmitting
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting to FIRS...
                  </>
                ) : (
                  'Submit to FIRS'
                )}
              </button>
            </motion.div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              {/* Confetti Effect */}
              {showConfetti && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: -100, x: Math.random() * 400, opacity: 1 }}
                      animate={{ y: 900, opacity: 0 }}
                      transition={{ duration: 2, delay: i * 0.05 }}
                      className="absolute w-2 h-2 bg-emerald-500 rounded-full"
                    />
                  ))}
                </div>
              )}

              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              
              <h2 className="text-2xl mb-2">Welcome to WazobiaTax!</h2>
              <p className="text-gray-600 mb-8">Your registration is complete</p>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <p className="text-emerald-900">
                  You'll receive an SMS confirmation within 24 hours. You can start using the app now!
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8"
              >
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-600" />
                <p className="text-sm text-gray-600 mt-2">Taking you to dashboard...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
