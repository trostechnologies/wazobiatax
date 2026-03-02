import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, FileText, DollarSign, Users, TrendingUp, Calculator, Mic, Camera, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from 'react-router-dom';
import { profileTranslations, type LanguageKey } from '../translations/profile';

interface FilePolicyProps {
  language?: LanguageKey;
}

const translations = {
  english: {
    fileTaxReturn: "File Tax Return",
    selectReturnTypeHint:
      "💡 Select the type of return you want to file. Your ledger data will auto-populate the form.",
    annualIncomeTax: "Annual Income Tax",
    annualIncomeTaxDesc: "File yearly income return",

    vatReturn: "VAT Return",
    vatReturnDesc: "Monthly/Quarterly VAT",

    payeReturn: "PAYE Return",
    payeReturnDesc: "Employee tax withholding",

    estimatedTax: "Estimated Tax",
    estimatedTaxDesc: "Advance tax payment",
    ledgerAutoFillHint: "✓ Data auto-populated from your ledger. Review and edit as needed.",
    totalIncome: "Total Income",
    totalExpenses: "Total Expenses",
    calculationBreakdown: "Calculation Breakdown",
    taxableIncome: "Taxable Income",
    taxRate: "Tax Rate",
    taxDue: "Tax Due",
    voiceAdd: "Voice Add",
    scanReceipt: "Scan Receipt",
    reviewAndSubmit: "Review & Submit",
    submitToFIRS: "Submit to FIRS",
    submittingToFIRS: "Submitting to FIRS...",
    totalTaxDue: "Total Tax Due",
    dueDate: "Due: {date}",
    returnType: "Return Type",
    period: "Period",
    edit: "Edit",
    returnFiled: "Return Filed! 🎉",
    returnSubmitted: "Your tax return has been submitted to NRS",
    referenceNumber: "Reference Number",
    payTaxNow: "Pay Tax Now",
    backToDashboard: "Back to Dashboard",
  },
  pidgin: {
    fileTaxReturn: "File Tax Return",
    selectReturnTypeHint:
      "💡 Choose the type of return you wan file. Your ledger data go auto-fill the form.",
    annualIncomeTax: "Annual Income Tax",
    annualIncomeTaxDesc: "File yearly income return",

    vatReturn: "VAT Return",
    vatReturnDesc: "Monthly or Quarterly VAT",

    payeReturn: "PAYE Return",
    payeReturnDesc: "Employee tax deduction",

    estimatedTax: "Estimated Tax",
    estimatedTaxDesc: "Pay tax in advance",
    ledgerAutoFillHint: "✓ Data don auto-fill from your ledger. Check am and edit if need be.",
    totalIncome: "Total Income",
    totalExpenses: "Total Expenses",
    calculationBreakdown: "How Calculation Dey",
    taxableIncome: "Taxable Income",
    taxRate: "Tax Rate",
    taxDue: "Tax Wey You Suppose Pay",
    voiceAdd: "Voice Add",
    scanReceipt: "Scan Receipt",
    reviewAndSubmit: "Check & Submit",
    submitToFIRS: "Send give FIRS",
    submittingToFIRS: "E don dey send to FIRS...",
    totalTaxDue: "Total Tax Wey You Suppose Pay",
    dueDate: "Due: {date}",
    returnType: "Type of Return",
    period: "Period",
    edit: "Edit",
    returnFiled: "Return Don File! 🎉",
    returnSubmitted: "Your tax return don submit go NRS",
    referenceNumber: "Reference Number",
    payTaxNow: "Pay Tax Now",
    backToDashboard: "Back to Dashboard",
  },
  hausa: {
    fileTaxReturn: "Gabatar da Rahoton Haraji",
    selectReturnTypeHint:
      "💡 Zaɓi nau'in rahoton da kake son gabatarwa. Bayanai daga littafin ma'amalarka za su cika fom ɗin kai tsaye.",
    annualIncomeTax: "Harajin Kuɗin Shiga na Shekara",
    annualIncomeTaxDesc: "Gabatar da rahoton kuɗin shiga na shekara",

    vatReturn: "Rahoton VAT",
    vatReturnDesc: "VAT na wata ko kwata",

    payeReturn: "Rahoton PAYE",
    payeReturnDesc: "Cire harajin ma'aikata",

    estimatedTax: "Harajin Kimantawa",
    estimatedTaxDesc: "Biyan haraji tun da wuri",
    ledgerAutoFillHint: "✓ Bayanai sun cika ta atomatik daga littafin ma'amalarka. Duba kuma gyara idan ya cancanta.",
    totalIncome: "Jimillar Kuɗi",
    totalExpenses: "Jimillar Kuɗaɗe",
    calculationBreakdown: "Bayani kan Lissafi",
    taxableIncome: "Kuɗin da za a yi haraji a kansa",
    taxRate: "Adadin Haraji",
    taxDue: "Harajin da za a biya",
    voiceAdd: "Shigar da Murya",
    scanReceipt: "Duba Rasiti",
    reviewAndSubmit: "Duba & Gabatar",
    submitToFIRS: "Tura zuwa FIRS",
    submittingToFIRS: "Ana turawa zuwa FIRS...",
    totalTaxDue: "Jimillar Harajin da Ake Bukata",
    dueDate: "Rana: {date}",
    returnType: "Nau'in Rahoto",
    period: "Lokaci",
    edit: "Gyara",
    returnFiled: "An Gabatar da Rahoto! 🎉",
    returnSubmitted: "An gabatar da rahoton harajinka zuwa NRS",
    referenceNumber: "Lambar Shaida",
    payTaxNow: "Biya Haraji Yanzu",
    backToDashboard: "Komawa Dashboard",
  },
  igbo: {
    fileTaxReturn: "Tinye Akwụkwọ Ụtụ",
    selectReturnTypeHint:
      "💡 Họrọ ụdị nkwupụta ị chọrọ itinye. Data dị na ledger gị ga-ejupụta fọm ahụ na-akpaghị aka.",
    annualIncomeTax: "Ụtụ Ego Afọ",
    annualIncomeTaxDesc: "Tinye nkwupụta ego kwa afọ",

    vatReturn: "Nkwupụta VAT",
    vatReturnDesc: "VAT kwa ọnwa ma ọ bụ kwa kóótà",

    payeReturn: "Nkwupụta PAYE",
    payeReturnDesc: "Mwepu ụtụ isi ndị ọrụ",

    estimatedTax: "Ụtụ A Tụrụ Atụmatụ",
    estimatedTaxDesc: "Ịkwụ ụtụ tupu oge eruo",
    ledgerAutoFillHint: "✓ Data ejupụtara site na ledger gị. Lelee ma dezie ma ọ dị mkpa.",
    totalIncome: "Ọnụ Ahịa Ego",
    totalExpenses: "Ọnụ Mmefu Ego",
    calculationBreakdown: "Nkowa Nchịkọta",
    taxableIncome: "Ego A ga-akwụ Ụtụ",
    taxRate: "Ọnụ Ọgụ Ụtụ",
    taxDue: "Ụtụ Ekwesịrị Ikwụ",
    voiceAdd: "Tinye Olu",
    scanReceipt: "See Rẹsịtụ Foto",
    reviewAndSubmit: "Tulee & Tinye",
    submitToFIRS: "Zipu gaa FIRS",
    submittingToFIRS: "A na-eziga gaa FIRS...",
    totalTaxDue: "Ụtụ Ekwesịrị Ikwụ",
    dueDate: "Ruo: {date}",
    returnType: "Ụdị Nkwupụta",
    period: "Oge",
    edit: "Dezie",
    returnFiled: "E zigara Nkwupụta! 🎉",
    returnSubmitted: "E zigara nkwupụta ụtụ isi gị na NRS",
    referenceNumber: "Nọmba Nkọwa",
    payTaxNow: "Kwụọ Ụtụ Ugbu a",
    backToDashboard: "Laghachị na Dashboard",
  },
  yoruba: {
    fileTaxReturn: "Fí Iroyin Owo-ori",
    selectReturnTypeHint:
      "💡 Yan irú ìròyìn tí o fẹ́ fi silẹ̀. Àwọn àkọsílẹ̀ rẹ nínú ledger yóò kún fọ́ọ̀mù náà laifọwọyi.",
    annualIncomeTax: "Owo-ori Owo-wiwọle Ọdọọdún",
    annualIncomeTaxDesc: "Fí iroyin owo-wiwọle ọdún kan",

    vatReturn: "Iroyin VAT",
    vatReturnDesc: "VAT oṣù kọọkan tàbí kóòtà",

    payeReturn: "Iroyin PAYE",
    payeReturnDesc: "Owo-ori tí a yọ́ lára oṣiṣẹ́",

    estimatedTax: "Owo-ori Ìṣírò",
    estimatedTaxDesc: "Sisan owo-ori ní ìlòsíwájú",
    ledgerAutoFillHint: "✓ Àwọn data ti kún fún fọ́ọ̀mù láti inu ledger rẹ. Ṣàyẹ̀wò kí o sì ṣàtúnṣe bí ó bá yẹ.",
    totalIncome: "Ìkójọpọ̀ Ìní",
    totalExpenses: "Ìkójọpọ̀ Ìnáwọ́",
    calculationBreakdown: "Àtúmọ̀ Ìṣirò",
    taxableIncome: "Owó-ori Tó Ní Láti San",
    taxRate: "Oṣuwọn Owo-ori",
    taxDue: "Owo-ori Tó Lẹ̀tọ́ Láti San",
    voiceAdd: "Fikun-un Ohùn",
    scanReceipt: "Ṣàyẹ̀wò Rẹ́sítì",
    reviewAndSubmit: "Ṣàyẹ̀wò & Fí Ránṣẹ́",
    submitToFIRS: "Fí ranṣẹ́ sí FIRS",
    submittingToFIRS: "Ní ń fí ranṣẹ́ sí FIRS...",
    totalTaxDue: "Lapapọ Owo-ori Tó Lẹ̀tọ́ Láti San",
    dueDate: "Tó dé: {date}",
    returnType: "Ìrù Ìròyìn",
    period: "Àkókò",
    edit: "Ṣàtúnṣe",
    returnFiled: "Ìròyìn Fún Lẹ́yìn! 🎉",
    returnSubmitted: "Ìròyìn owó-ori rẹ ti fi ranṣẹ́ sí NRS",
    referenceNumber: "Nọ́mbà Àtọka",
    payTaxNow: "San Owó-ori Ní Bayi",
    backToDashboard: "Padà sí Dashboard",
  },
};

export function FileReturns( { language = 'english' }: FilePolicyProps ) {
  const [step, setStep] = useState('select'); // select, form, review, success
  const [selectedType, setSelectedType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    income: '250000',
    expenses: '120000',
    taxableIncome: '130000',
    taxDue: '13000',
  });
  // const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  const returnTypes = [
    {
      id: 'annual',
      labelKey: 'annualIncomeTax',
      descKey: 'annualIncomeTaxDesc',
      icon: DollarSign,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
    },
    {
      id: 'vat',
      labelKey: 'vatReturn',
      descKey: 'vatReturnDesc',
      icon: TrendingUp,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    {
      id: 'paye',
      labelKey: 'payeReturn',
      descKey: 'payeReturnDesc',
      icon: Users,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
    },
    {
      id: 'estimated',
      labelKey: 'estimatedTax',
      descKey: 'estimatedTaxDesc',
      icon: Calculator,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
    },
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

      </div>

      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center gap-4 border-b border-gray-200">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-all -ml-2"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg">{translations[language].fileTaxReturn}</h1>
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
                {translations[language].selectReturnTypeHint}
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
                    <h3 className="text-sm mb-1">{translations[language][type.labelKey]}</h3>
                    <p className="text-xs opacity-75">{translations[language][type.descKey]}</p>
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
                {translations[language].ledgerAutoFillHint}
              </p>
            </div>

            {/* Income Section */}
            <div>
              <label className="block mb-2 text-gray-700">{translations[language].totalIncome}</label>
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
              <label className="block mb-2 text-gray-700">{translations[language].totalExpenses}</label>
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
              <h3 className="text-sm mb-3">{translations[language].calculationBreakdown}</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{translations[language].totalIncome}</span>
                  <span>₦{formData.income}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{translations[language].totalExpenses}</span>
                  <span>-₦{formData.expenses}</span>
                </div>
                <div className="h-px bg-gray-200 my-2" />
                <div className="flex justify-between text-sm">
                  <span>{translations[language].taxableIncome}</span>
                  <span>₦{formData.taxableIncome}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{translations[language].taxRate}</span>
                  <span>10%</span>
                </div>
                <div className="h-px bg-gray-200 my-2" />
                <div className="flex justify-between">
                  <span>{translations[language].taxDue}</span>
                  <span className="text-emerald-600">₦{formData.taxDue}</span>
                </div>
              </div>
            </div>

            {/* Voice/OCR FABs */}
            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-100 transition-all">
                <Mic className="w-5 h-5" />
                {translations[language].voiceAdd}
              </button>
              <button className="flex-1 py-3 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center gap-2 hover:bg-purple-100 transition-all">
                <Camera className="w-5 h-5" />
                {translations[language].scanReceipt}
              </button>
            </div>

            <button
              onClick={handleReview}
              className="w-full py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-lg transition-all"
            >
              {translations[language].reviewAndSubmit}
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
              <p className="text-emerald-100 text-sm mb-2">{translations[language].totalTaxDue}</p>
              <p className="text-3xl mb-4">₦{formData.taxDue}</p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs">
                  {selectedType.toUpperCase()} Return
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs">
                  {translations[language].dueDate.replace("{date}", "Dec 31, 2025")}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{translations[language].returnType}</span>
                <span className="capitalize">{selectedType}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{translations[language].period}</span>
                <span>Jan - Dec 2025</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{translations[language].taxableIncome}</span>
                <span>₦{formData.taxableIncome}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{translations[language].taxRate}</span>
                <span>10%</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('form')}
                className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
              >
                {translations[language].edit}
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`flex-1 py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${!isSubmitting
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {translations[language].submittingToFIRS}
                  </>
                ) : (
                  translations[language].submitToFIRS
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

            <h2 className="text-2xl mb-2">{translations[language].returnFiled}</h2>
            <p className="text-gray-600 mb-8">{translations[language].returnSubmitted}</p>

            <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6 text-left">
              <p className="text-sm text-gray-600 mb-2">{translations[language].referenceNumber}</p>
              <p className="text-lg">TXR-2025-{Math.floor(Math.random() * 10000)}</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate('/pay-tax')}
                className="w-full py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-lg transition-all"
              >
                {translations[language].payTaxNow}
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
              >
                {translations[language].backToDashboard}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
