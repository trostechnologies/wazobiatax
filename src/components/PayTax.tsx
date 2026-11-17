import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CreditCard, Building2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from 'react-router-dom';
import { profileTranslations, type LanguageKey } from '../translations/profile';
import { getTaxCalculation } from '../services/tax';
import { ToastContainer, toast } from 'react-toastify';

interface PayTaxProps {
  language?: LanguageKey;
}

const translations = {
  english: {
    paystack: "Paystack",
    paystackDesc: "Card payment",

    flutterwave: "Flutterwave",
    flutterwaveDesc: "Card/Bank payment",

    bankTransfer: "Bank Transfer",
    bankTransferDesc: "Manual transfer",
    payTax: "Pay Tax",
    totalAmountDue: "Total Amount Due",
    tax: "Tax:",
    penalty: "Penalty:",
    paymentBreakdown: "Payment Breakdown",
    incomeTax: "Income Tax (2025)",
    latePaymentPenalty: "Late Payment Penalty",
    total: "Total",
    scanQrCode: "Scan QR code to pay via your banking app",
    selectPaymentMethod: "Select Payment Method",
    securePayment: "✓ Secure payment via",
    cardNumber: "Card Number",
    expiryDate: "Expiry Date",
    cvv: "CVV",
    amountToPay: "Amount to Pay",
    payBtn: "Pay",
    processingPayment: "Processing payment...",
    paymentSuccessful: "Payment Successful! 🎉",
    paymentProcessed: "Your tax payment has been processed",
    amountPaid: "Amount Paid",
    transactionId: "Transaction ID",
    date: "Date",
    downloadReceipt: "Download Receipt",
    backToDashboard: "Back to Dashboard",
    ledgerUpdated: "💡 Your ledger has been automatically updated with this payment",
  },

  pidgin: {
    paystack: "Paystack",
    paystackDesc: "Card payment",

    flutterwave: "Flutterwave",
    flutterwaveDesc: "Card/Bank payment",

    bankTransfer: "Bank Transfer",
    bankTransferDesc: "Manual transfer",
    payTax: "Pay Tax",
    totalAmountDue: "Total Amount Wey You Suppose Pay",
    tax: "Tax:",
    penalty: "Penalty:",
    paymentBreakdown: "How Payment Dey",
    incomeTax: "Income Tax (2025)",
    latePaymentPenalty: "Late Payment Penalty",
    total: "Total",
    scanQrCode: "Scan QR code make you pay with your banking app",
    selectPaymentMethod: "Choose Payment Method",
    securePayment: "✓ Payment dey secure via",
    cardNumber: "Card Number",
    expiryDate: "Expiry Date",
    cvv: "CVV",
    amountToPay: "Amount Wey You Wan Pay",
    payBtn: "Pay",
    processingPayment: "Payment dey process...",
    paymentSuccessful: "Payment Don Succeed! 🎉",
    paymentProcessed: "Your tax payment don process",
    amountPaid: "Amount Wey You Pay",
    transactionId: "Transaction ID",
    date: "Date",
    downloadReceipt: "Download Receipt",
    backToDashboard: "Back to Dashboard",
    ledgerUpdated: "💡 Your ledger don update automatically with this payment",
  },

  hausa: {
    paystack: "Paystack",
    paystackDesc: "Biya ta kati",

    flutterwave: "Flutterwave",
    flutterwaveDesc: "Biya ta kati ko banki",

    bankTransfer: "Canja Kuɗi ta Banki",
    bankTransferDesc: "Canja kuɗi da hannu",
    payTax: "Biya Haraji",
    totalAmountDue: "Jimillar Kuɗi da Ake Bukata",
    tax: "Haraji:",
    penalty: "Laifi:",
    paymentBreakdown: "Bayani kan Biyan Kuɗi",
    incomeTax: "Harajin Kuɗin Shiga (2025)",
    latePaymentPenalty: "Laifi na Jinkiri",
    total: "Jimilla",
    scanQrCode: "Duba QR code domin biyan ta app ɗin bankinka",
    selectPaymentMethod: "Zaɓi Hanyar Biyan Kuɗi",
    securePayment: "✓ Biyan kuɗi lafiya ta hanyar",
    cardNumber: "Lambar Kati",
    expiryDate: "Ranar Ƙarewa",
    cvv: "CVV",
    amountToPay: "Adadin Kuɗin da za a biya",
    payBtn: "Biya",
    processingPayment: "Ana sarrafa biyan kuɗi...",
    paymentSuccessful: "An Yi Nasarar Biya! 🎉",
    paymentProcessed: "An sarrafa biyan harajinka",
    amountPaid: "Kuɗin da Aka Biya",
    transactionId: "Lambar Ma'amala",
    date: "Rana",
    downloadReceipt: "Sauke Rasiti",
    backToDashboard: "Komawa Dashboard",
    ledgerUpdated: "💡 An sabunta littafin ma'amalarka ta atomatik da wannan biyan",
  },

  yoruba: {
    paystack: "Paystack",
    paystackDesc: "Sisan kaadi",

    flutterwave: "Flutterwave",
    flutterwaveDesc: "Sisan kaadi/tabi banki",

    bankTransfer: "Gbigbe Banki",
    bankTransferDesc: "Gbigbe ọwọ́",
    payTax: "San Owó-ori",
    totalAmountDue: "Lapapọ Owo-ori Tó Lẹ̀tọ́ Láti San",
    tax: "Owó-ori:",
    penalty: "Ìtìlẹyìn:",
    paymentBreakdown: "Àtúmọ̀ Ìsanwó",
    incomeTax: "Owo-ori Owo-wiwọle (2025)",
    latePaymentPenalty: "Ìtìlẹyìn Sisan Pẹ́",
    total: "Lapapọ",
    scanQrCode: "Ṣàyẹ̀wò QR code láti san pẹ̀lú app banki rẹ",
    selectPaymentMethod: "Yan Ìlànà Sisan",
    securePayment: "✓ Sisan to ni aabo nípasẹ̀",
    cardNumber: "Nọ́mbà Kaadi",
    expiryDate: "Ọjọ́ Ìparí",
    cvv: "CVV",
    amountToPay: "Owó Tó Lẹ̀tọ́ Láti San",
    payBtn: "San",
    processingPayment: "Ṣíṣe sísan lọ́wọ́...",
    paymentSuccessful: "Sisan Ṣeé Ṣe! 🎉",
    paymentProcessed: "A ti ṣiṣẹ́ sisan owó-ori rẹ",
    amountPaid: "Owó Tí a San",
    transactionId: "ID Ìsanwó",
    date: "Ọjọ́",
    downloadReceipt: "Gba Rẹ́sítì",
    backToDashboard: "Padà sí Dashboard",
    ledgerUpdated: "💡 A ti ṣe imudojuiwọn ledger rẹ laifọwọyi pẹ̀lú sisan yìí",
  },

  igbo: {
    paystack: "Paystack",
    paystackDesc: "Ụkwụ ụgwọ kaadị",

    flutterwave: "Flutterwave",
    flutterwaveDesc: "Ụkwụ ụgwọ kaadị/ụgwọ banki",

    bankTransfer: "Nyefe Ego Banki",
    bankTransferDesc: "Nyefe aka",
    payTax: "Kwụọ Ụtụ",
    totalAmountDue: "Ụtụ Ekwesịrị Ikwụ",
    tax: "Ụtụ:",
    penalty: "Ntaramahụhụ:",
    paymentBreakdown: "Nkowa Ụkwụ Ụtụ",
    incomeTax: "Ụtụ Ego (2025)",
    latePaymentPenalty: "Ntaramahụhụ Nkwụsị oge",
    total: "Ọnụ Ọgụgụ",
    scanQrCode: "Lelee QR code ka ị kwụọ site na ngwa banki gị",
    selectPaymentMethod: "Họrọ Ụzọ Ịkwụ Ụtụ",
    securePayment: "✓ Ụkwụ Ụtụ dị nchebe site na",
    cardNumber: "Nọmba Kaadị",
    expiryDate: "Ụbọchị Ọgwụgwụ",
    cvv: "CVV",
    amountToPay: "Ego I Kwesịrị Ịkwụ",
    payBtn: "Kwụọ",
    processingPayment: "Na-ahazi ịkwụ ụgwọ...",
    paymentSuccessful: "Ịkwụ Ụgwọ Gara Nke Ọma! 🎉",
    paymentProcessed: "E mechaala ịkwụ ụtụ isi gị",
    amountPaid: "Ego A Kwụrụ",
    transactionId: "ID Azụmahịa",
    date: "Ụbọchị",
    downloadReceipt: "Budata Rẹsịtụ",
    backToDashboard: "Laghachị na Dashboard",
    ledgerUpdated: "💡 Emelitela ledger gị na-akpaghị aka site na ịkwụ a",
  },
};

export function PayTax( { language = 'english' }: PayTaxProps ) {
  const [isLoadingTax, setIsLoadingTax] = useState(true);
  const [taxDue, setTaxDue] = useState(0);
  const penalty = 0;
  const total = taxDue + penalty;

  // const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTaxDue = async () => {
      try {
        const res = await getTaxCalculation();
        setTaxDue(Math.max(0, res.data.net_vat));
      } catch (err) {
        console.error('Failed to fetch tax due:', err);
      } finally {
        setIsLoadingTax(false);
      }
    };

    fetchTaxDue();
  }, []);

  const paymentMethods = [
    {
      id: 'paystack',
      nameKey: 'paystack',
      descKey: 'paystackDesc',
      icon: CreditCard,
      color: 'bg-blue-50 border-blue-200 text-blue-600',
    },
    {
      id: 'flutterwave',
      nameKey: 'flutterwave',
      descKey: 'flutterwaveDesc',
      icon: CreditCard,
      color: 'bg-purple-50 border-purple-200 text-purple-600',
    },
    {
      id: 'transfer',
      nameKey: 'bankTransfer',
      descKey: 'bankTransferDesc',
      icon: Building2,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-600',
    },
  ];

  const handlePaymentSelect = () => {
    // No backend endpoint exists to actually process a tax payment (only
    // subscription-plan payments are wired to Paystack). Never fake a working
    // checkout for this — tell the user honestly instead of pretending any of
    // these methods can take a real payment right now.
    toast.info('Online tax payment is coming soon. You can still track what you owe here.');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Status Bar */}
      <div className="h-11 bg-emerald-600 flex items-center justify-between px-6 text-white text-sm">

      </div>

      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center gap-4 border-b border-gray-200">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-all -ml-2"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg">{translations[language].payTax}</h1>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
          <motion.div
            key="summary"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-6 space-y-6"
          >
            {/* Amount Card */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-2xl">
              <p className="text-emerald-100 text-sm mb-2">{translations[language].totalAmountDue}</p>
              <p className="text-4xl mb-4">{isLoadingTax ? '…' : `₦${total.toLocaleString()}`}</p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs">
                  {translations[language].tax} {isLoadingTax ? '…' : `₦${taxDue.toLocaleString()}`}
                </span>
                {penalty > 0 && (
                  <span className="px-3 py-1 bg-red-400/30 rounded-full text-xs">
                    {translations[language].penalty} ₦{penalty.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Breakdown */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 space-y-3">
              <h3 className="text-sm mb-3">{translations[language].paymentBreakdown}</h3>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{translations[language].incomeTax}</span>
                <span>₦{taxDue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{translations[language].latePaymentPenalty}</span>
                <span>₦{penalty.toLocaleString()}</span>
              </div>
              <div className="h-px bg-gray-200 my-2" />
              <div className="flex justify-between">
                <span>{translations[language].total}</span>
                <span className="text-emerald-600">₦{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Methods — not wired to a real payment processor yet */}
            <div>
              <h3 className="text-sm mb-3">{translations[language].selectPaymentMethod}</h3>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-3">
                <p className="text-xs text-amber-800">Online tax payment is coming soon.</p>
              </div>
              <div className="space-y-3">
                {paymentMethods.map((method, index) => (
                  <motion.button
                    key={method.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={handlePaymentSelect}
                    className={`w-full p-4 rounded-xl border-2 ${method.color} opacity-60 grayscale hover:shadow-none transition-all text-left cursor-not-allowed`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                        <method.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm mb-1">{translations[language][method.nameKey]}</h3>
                        <p className="text-xs opacity-75">{translations[language][method.descKey]}</p>
                      </div>
                      <div className="text-2xl">›</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
      </AnimatePresence>
      <ToastContainer />
    </div>
  );
}
