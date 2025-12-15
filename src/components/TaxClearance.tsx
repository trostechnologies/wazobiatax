import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Shield, CheckCircle2, AlertCircle, Download, Share2, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface TaxClearanceProps {
  onNavigate: (screen: string) => void;
}

export function TaxClearance({ onNavigate }: TaxClearanceProps) {
  const [step, setStep] = useState('check'); // check, eligible, certificate, ineligible
  const [isChecking, setIsChecking] = useState(false);
  const [isEligible] = useState(true); // Simulate eligibility
  const outstandingAmount = 0;

  const handleCheckEligibility = () => {
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      if (isEligible) {
        setStep('eligible');
      } else {
        setStep('ineligible');
      }
    }, 2000);
  };

  const handleGenerateCertificate = () => {
    setStep('certificate');
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
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('profile')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all -ml-2"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg">Tax Clearance Certificate</h1>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {/* Step 1: Check Eligibility */}
        {step === 'check' && (
          <motion.div
            key="check"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-6 space-y-6"
          >
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-xl mb-2">Tax Clearance Certificate</h2>
              <p className="text-sm text-gray-600">
                Verify your tax compliance status and generate your certificate
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 space-y-3">
              <h3 className="text-sm mb-3">What You'll Need:</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">No outstanding tax obligations</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">All returns filed on time</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Valid TIN registration</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-900">
                💡 The Tax Clearance Certificate (TCC) is required for government contracts, bank loans, and business registrations.
              </p>
            </div>

            <button
              onClick={handleCheckEligibility}
              disabled={isChecking}
              className={`w-full py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                !isChecking
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isChecking ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Checking eligibility...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Check Eligibility
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Step 2: Eligible */}
        {step === 'eligible' && (
          <motion.div
            key="eligible"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-6 space-y-6"
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
              <h2 className="text-xl mb-2">You're Eligible!</h2>
              <p className="text-sm text-gray-600">
                No outstanding tax obligations found
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <h3 className="text-sm mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Compliance Status
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Outstanding Tax</span>
                  <span className="text-emerald-600">₦0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Pending Returns</span>
                  <span className="text-emerald-600">0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Compliance Score</span>
                  <span className="text-emerald-600">Good Standing</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <h3 className="text-sm mb-3">Your TCC Will Include:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">•</span>
                  <span>Digital certificate (PDF format)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">•</span>
                  <span>Valid for 12 months</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">•</span>
                  <span>QR code for instant verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">•</span>
                  <span>Accepted by all Nigerian institutions</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleGenerateCertificate}
              className="w-full py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-lg transition-all"
            >
              Generate Certificate
            </button>
          </motion.div>
        )}

        {/* Step 3: Certificate Generated */}
        {step === 'certificate' && (
          <motion.div
            key="certificate"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 space-y-6"
          >
            {/* Certificate Preview */}
            <div className="bg-white rounded-2xl p-6 border-2 border-emerald-600 shadow-2xl">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg mb-1">Tax Clearance Certificate</h3>
                <p className="text-xs text-gray-600">Federal Inland Revenue Service</p>
              </div>

              <div className="border-t border-b border-gray-200 py-4 my-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Certificate No.</span>
                  <span>TCC-2025-{Math.floor(Math.random() * 10000)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">TIN</span>
                  <span>123456789-0001</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Name</span>
                  <span>Chukwuma Okafor</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Business</span>
                  <span>Bukka Restaurant</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Issue Date</span>
                  <span>Dec 13, 2025</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Expiry Date</span>
                  <span>Dec 13, 2026</span>
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div className="flex justify-center">
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-4xl">📱</div>
                </div>
              </div>
              <p className="text-xs text-center text-gray-600 mt-2">
                Scan to verify authenticity
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <p className="text-sm text-emerald-900">
                ✓ Your Tax Clearance Certificate has been generated and is valid for 12 months.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-lg transition-all flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download Certificate (PDF)
              </button>
              <button className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5" />
                Share Certificate
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
              >
                Back to Dashboard
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Ineligible */}
        {step === 'ineligible' && (
          <motion.div
            key="ineligible"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-6 space-y-6"
          >
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
              <h2 className="text-xl mb-2">Not Eligible Yet</h2>
              <p className="text-sm text-gray-600">
                You have outstanding obligations
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <h3 className="text-sm mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                Outstanding Issues
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Outstanding Tax</span>
                  <span className="text-red-600">₦{outstandingAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Pending Returns</span>
                  <span className="text-red-600">2</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <h3 className="text-sm mb-3">To become eligible:</h3>
              <ol className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">1.</span>
                  <span>Pay all outstanding tax obligations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">2.</span>
                  <span>File all pending returns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">3.</span>
                  <span>Wait for system update (24-48 hours)</span>
                </li>
              </ol>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => onNavigate('payTax')}
                className="w-full py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 shadow-lg transition-all"
              >
                Pay Outstanding Tax
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
              >
                Back to Dashboard
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
