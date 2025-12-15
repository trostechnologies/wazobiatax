import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, FileText, DollarSign, Users, TrendingUp, Calculator, Mic, Camera, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface FileReturnsProps {
  onNavigate: (screen: string) => void;
}

export function FileReturns({ onNavigate }: FileReturnsProps) {
  const [step, setStep] = useState('select'); // select, form, review, success
  const [selectedType, setSelectedType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    income: '250000',
    expenses: '120000',
    taxableIncome: '130000',
    taxDue: '13000',
  });

  const returnTypes = [
    { id: 'annual', label: 'Annual Income Tax', icon: DollarSign, desc: 'File yearly income return', color: 'bg-blue-50 text-blue-600 border-blue-200' },
    { id: 'vat', label: 'VAT Return', icon: TrendingUp, desc: 'Monthly/Quarterly VAT', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
    { id: 'paye', label: 'PAYE Return', icon: Users, desc: 'Employee tax withholding', color: 'bg-purple-50 text-purple-600 border-purple-200' },
    { id: 'estimated', label: 'Estimated Tax', icon: Calculator, desc: 'Advance tax payment', color: 'bg-amber-50 text-amber-600 border-amber-200' },
  ];

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    setTimeout(() => setStep('form'), 300);
  };

  const handleReview = () => {
    setStep('review');
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
    }, 2000);
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
      <div className="bg-white px-6 py-4 flex items-center gap-4 border-b border-gray-200">
        <button 
          onClick={() => onNavigate('dashboard')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-all -ml-2"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg">File Tax Return</h1>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {/* Step 1: Select Type */}
        {step === 'select' && (
          <motion.div
            key="select"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-6 space-y-4"
          >
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-900">
                💡 Select the type of return you want to file. Your ledger data will auto-populate the form.
              </p>
            </div>

            {returnTypes.map((type, index) => (
              <motion.button
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleTypeSelect(type.id)}
                className={`w-full p-4 rounded-xl border-2 ${type.color} hover:shadow-lg transition-all text-left`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                    <type.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm mb-1">{type.label}</h3>
                    <p className="text-xs opacity-75">{type.desc}</p>
                  </div>
                  <div className="text-2xl">›</div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Step 2: Form View */}
        {step === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-6 space-y-6"
          >
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <p className="text-sm text-emerald-900">
                ✓ Data auto-populated from your ledger. Review and edit as needed.
              </p>
            </div>

            {/* Income Section */}
            <div>
              <label className="block mb-2 text-gray-700">Total Income</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
                <input
                  type="text"
                  value={formData.income}
                  onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            {/* Expenses Section */}
            <div>
              <label className="block mb-2 text-gray-700">Total Expenses</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
                <input
                  type="text"
                  value={formData.expenses}
                  onChange={(e) => setFormData({ ...formData, expenses: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            {/* Calculation Breakdown */}
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <h3 className="text-sm mb-3">Calculation Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Income</span>
                  <span>₦{formData.income}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Expenses</span>
                  <span>-₦{formData.expenses}</span>
                </div>
                <div className="h-px bg-gray-200 my-2" />
                <div className="flex justify-between text-sm">
                  <span>Taxable Income</span>
                  <span>₦{formData.taxableIncome}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax Rate</span>
                  <span>10%</span>
                </div>
                <div className="h-px bg-gray-200 my-2" />
                <div className="flex justify-between">
                  <span>Tax Due</span>
                  <span className="text-emerald-600">₦{formData.taxDue}</span>
                </div>
              </div>
            </div>

            {/* Voice/OCR FABs */}
            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-100 transition-all">
                <Mic className="w-5 h-5" />
                Voice Add
              </button>
              <button className="flex-1 py-3 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center gap-2 hover:bg-purple-100 transition-all">
                <Camera className="w-5 h-5" />
                Scan Receipt
              </button>
            </div>

            <button
              onClick={handleReview}
              className="w-full py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-lg transition-all"
            >
              Review & Submit
            </button>
          </motion.div>
        )}

        {/* Step 3: Review */}
        {step === 'review' && (
          <motion.div
            key="review"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-6 space-y-6"
          >
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-2xl">
              <p className="text-emerald-100 text-sm mb-2">Total Tax Due</p>
              <p className="text-3xl mb-4">₦{formData.taxDue}</p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs">
                  {selectedType.toUpperCase()} Return
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs">
                  Due: Dec 31, 2025
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Return Type</span>
                <span className="capitalize">{selectedType}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Period</span>
                <span>Jan - Dec 2025</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Taxable Income</span>
                <span>₦{formData.taxableIncome}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax Rate</span>
                <span>10%</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('form')}
                className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
              >
                Edit
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`flex-1 py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  !isSubmitting
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit to NRS'
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Success */}
        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            </motion.div>

            <h2 className="text-2xl mb-2">Return Filed! 🎉</h2>
            <p className="text-gray-600 mb-8">Your tax return has been submitted to NRS</p>

            <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6 text-left">
              <p className="text-sm text-gray-600 mb-2">Reference Number</p>
              <p className="text-lg">TXR-2025-{Math.floor(Math.random() * 10000)}</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => onNavigate('payTax')}
                className="w-full py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-lg transition-all"
              >
                Pay Tax Now
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
