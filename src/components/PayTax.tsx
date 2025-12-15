import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CreditCard, Building2, QrCode, CheckCircle2, Loader2, Download } from 'lucide-react';
import { useState } from 'react';

interface PayTaxProps {
  onNavigate: (screen: string) => void;
}

export function PayTax({ onNavigate }: PayTaxProps) {
  const [step, setStep] = useState('summary'); // summary, payment, processing, success
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const taxDue = 13000;
  const penalty = 0;
  const total = taxDue + penalty;

  const paymentMethods = [
    { id: 'paystack', name: 'Paystack', desc: 'Card payment', icon: CreditCard, color: 'bg-blue-50 border-blue-200 text-blue-600' },
    { id: 'flutterwave', name: 'Flutterwave', desc: 'Card/Bank payment', icon: CreditCard, color: 'bg-purple-50 border-purple-200 text-purple-600' },
    { id: 'transfer', name: 'Bank Transfer', desc: 'Manual transfer', icon: Building2, color: 'bg-emerald-50 border-emerald-200 text-emerald-600' },
  ];

  const handlePaymentSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    setStep('payment');
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
    }, 2500);
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
        <h1 className="text-lg">Pay Tax</h1>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {/* Step 1: Summary */}
        {step === 'summary' && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-6 space-y-6"
          >
            {/* Amount Card */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-2xl">
              <p className="text-emerald-100 text-sm mb-2">Total Amount Due</p>
              <p className="text-4xl mb-4">₦{total.toLocaleString()}</p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs">
                  Tax: ₦{taxDue.toLocaleString()}
                </span>
                {penalty > 0 && (
                  <span className="px-3 py-1 bg-red-400/30 rounded-full text-xs">
                    Penalty: ₦{penalty.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Breakdown */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 space-y-3">
              <h3 className="text-sm mb-3">Payment Breakdown</h3>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Income Tax (2025)</span>
                <span>₦{taxDue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Late Payment Penalty</span>
                <span>₦{penalty.toLocaleString()}</span>
              </div>
              <div className="h-px bg-gray-200 my-2" />
              <div className="flex justify-between">
                <span>Total</span>
                <span className="text-emerald-600">₦{total.toLocaleString()}</span>
              </div>
            </div>

            {/* QR Code for Bank Transfer */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center">
              <QrCode className="w-24 h-24 mx-auto mb-3 text-gray-400" />
              <p className="text-sm text-gray-600">Scan QR code to pay via your banking app</p>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="text-sm mb-3">Select Payment Method</h3>
              <div className="space-y-3">
                {paymentMethods.map((method, index) => (
                  <motion.button
                    key={method.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handlePaymentSelect(method.id)}
                    className={`w-full p-4 rounded-xl border-2 ${method.color} hover:shadow-lg transition-all text-left`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                        <method.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm mb-1">{method.name}</h3>
                        <p className="text-xs opacity-75">{method.desc}</p>
                      </div>
                      <div className="text-2xl">›</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Payment */}
        {step === 'payment' && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-6 space-y-6"
          >
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <p className="text-sm text-emerald-900">
                ✓ Secure payment via {paymentMethods.find(m => m.id === selectedMethod)?.name}
              </p>
            </div>

            {/* Payment Form */}
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-gray-700 text-sm">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-2 text-gray-700 text-sm">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700 text-sm">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Amount Summary */}
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Amount to Pay</span>
                <span className="text-lg">₦{total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:shadow-lg transition-all"
            >
              Pay ₦{total.toLocaleString()}
            </button>
          </motion.div>
        )}

        {/* Processing */}
        {isProcessing && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-32"
          >
            <div className="text-center">
              <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4 text-emerald-600" />
              <p className="text-gray-600">Processing payment...</p>
            </div>
          </motion.div>
        )}

        {/* Step 3: Success */}
        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 text-center py-12"
          >
            {/* Confetti */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -100, x: Math.random() * 390, opacity: 1 }}
                  animate={{ y: 900, opacity: 0 }}
                  transition={{ duration: 2, delay: i * 0.05 }}
                  className="absolute w-2 h-2 bg-emerald-500 rounded-full"
                />
              ))}
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            </motion.div>

            <h2 className="text-2xl mb-2">Payment Successful! 🎉</h2>
            <p className="text-gray-600 mb-8">Your tax payment has been processed</p>

            <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6 text-left space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount Paid</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Transaction ID</span>
                <span>TXN-{Math.floor(Math.random() * 100000)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Date</span>
                <span>Dec 13, 2025</span>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-lg transition-all flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download Receipt
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
              >
                Back to Dashboard
              </button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm text-blue-900">
                💡 Your ledger has been automatically updated with this payment
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
