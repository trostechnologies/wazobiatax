import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, Shield, CheckCircle2, Camera, Loader2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  english: {
    header: "TIN Registration",
    subheader: "Get your Tax Identification Number",
    bvnInfo: "Your BVN is securely verified with NIBSS. We don't store your BVN.",
    bvnLabel: "Bank Verification Number (BVN)",
    verifyBtn: "Verify BVN",
    verificationError: "Invalid BVN - Please try manual entry",
    profileInfo: "✓ Information auto-filled from your BVN. Please review and edit if needed.",
    fullName: "Full Name",
    address: "Address",
    phone: "Phone Number",
    uploadId: "Upload ID Photo (Optional)",
    continueBtn: "Continue",
    tinGenerated: "Provisional TIN Generated",
    tinLabel: "Your Tax Identification Number",
    tinTag: "Your TIN",
    provisionalInfo: "📝 This is a provisional TIN. It will be confirmed by FIRS within 24 hours via SMS.",
    submitToFIRS: "Submit to FIRS",
    submittingToFIRS: "Submitting to FIRS...",
    successHeader: "Welcome to WazobiaTax!",
    successSubheader: "Your registration is complete",
    smsInfo: "You'll receive an SMS confirmation within 24 hours. You can start using the app now!",
    dashboardRedirect: "Taking you to your dashboard...",
    stepProgressTitle1: "Verify",
    stepProgressTitle2: "Profile",
    stepProgressTitle3: "Generate",
    elevenDigits: "11 digits",
    bvnPlaceholder: "Enter 11-digit BVN",
    manualEntryError: "Try manual entry instead",
    verifyingWithNIBSS: "Verifying with NIBSS...",
    bvnInfoQuestion: "Why do we need your BVN?",
    takePhotoOrUpload: "Take Photo or Upload",
    copy: "Copy",
  },
  pidgin: {
    header: "TIN Registration",
    subheader: "Collect your Tax Identification Number",
    bvnInfo: "Your BVN dey verified wit NIBSS. We no dey store am.",
    bvnLabel: "Bank Verification Number (BVN)",
    verifyBtn: "Verify the BVN",
    verificationError: "BVN no correct - Try type am manually",
    profileInfo: "✓ Information don auto-fill from your BVN. Please check and edit if needed.",
    fullName: "Complete Name",
    address: "Address",
    phone: "Phone Number",
    uploadId: "Upload ID Photo (If you like)",
    continueBtn: "Continue",
    tinGenerated: "Provisional TIN Don Generate",
    tinLabel: "Your Tax Identification Number",
    tinTag: "Your TIN",
    provisionalInfo: "📝 This na provisional TIN. FIRS go confirm am within 24 hours via SMS.",
    submitToFIRS: "Send give FIRS",
    submittingToFIRS: "E don dey send to FIRS...",
    successHeader: "Welcome to WazobiaTax!",
    successSubheader: "Your registration don complete",
    smsInfo: "You go receive SMS confirmation within 24 hours. You fit start to use app now!",
    dashboardRedirect: "We dey carry you go your dashboard...",
    stepProgressTitle1: "Check",
    stepProgressTitle2: "Profile",
    stepProgressTitle3: "Generate",
    elevenDigits: "11 numbers",
    bvnPlaceholder: "Enter your 11 number BVN",
    manualEntryError: "Try type am manually",
    verifyingWithNIBSS: "We dey check with NIBSS...",
    bvnInfoQuestion: "Why we need your BVN?",
    takePhotoOrUpload: "Take Photo or Upload",
    copy: "Copy",
  },
  hausa: {
    header: "Rajistar TIN",
    subheader: "Samu Lambar Shaidar Haraji",
    bvnInfo: "An tabbatar da BVN ɗinka cikin tsaro tare da NIBSS. Ba ma adana BVN ɗinka.",
    bvnLabel: "Lambar Binciken Banki (BVN)",
    verifyBtn: "Tabbatar da BVN",
    verificationError: "BVN ba daidai ba - Da fatan a yi shigarwa da hannu",
    profileInfo: "✓ An cika bayanai ta atomatik daga BVN ɗinka. Da fatan a duba kuma gyara idan akwai bukata.",
    fullName: "Cikakken Suna",
    address: "Adireshi",
    phone: "Lambar Waya",
    uploadId: "Loda Hoto na ID (Zabi)",
    continueBtn: "Ci gaba",
    tinGenerated: "An Samar da TIN Na Wucin Gadi",
    tinLabel: "Lambar Shaidar Haraji ɗinka",
    tinTag: "TIN ɗinka",
    provisionalInfo: "📝 Wannan TIN na wucin gadi ne. FIRS za ta tabbatar da shi cikin awanni 24 ta SMS.",
    submitToFIRS: "Tura zuwa FIRS",
    submittingToFIRS: "Ana turawa zuwa FIRS...",
    successHeader: "Barka da zuwa WazobiaTax!",
    successSubheader: "An kammala rajistarka",
    smsInfo: "Za ka karɓi tabbaci ta SMS cikin awanni 24. Za ka iya fara amfani da app yanzu!",
    dashboardRedirect: "Ana kai ka zuwa dashboard...",
    stepProgressTitle1: "Tabbatar",
    stepProgressTitle2: "Bayanai",
    stepProgressTitle3: "Samar",
    elevenDigits: "Lambobi 11",
    bvnPlaceholder: "Shigar da BVN mai lambobi 11",
    manualEntryError: "Gwada shigar da hannu maimakon haka",
    verifyingWithNIBSS: "Ana tabbatarwa tare da NIBSS...",
    bvnInfoQuestion: "Me ya sa muke buƙatar BVN ɗinka?",
    takePhotoOrUpload: "Ɗauki Hoto ko Loda",
    copy: "Kwafi",
  },
  igbo: {
    header: "Ndebanye TIN",
    subheader: "Nweta Nọmba Njirimara Ọrụ Ịkwụ Ụtụ",
    bvnInfo: "A na-enyocha BVN gị na nchekwa site na NIBSS. Anyị anaghị echekwa BVN gị.",
    bvnLabel: "Nọmba Nyocha Banki (BVN)",
    verifyBtn: "Nyocha BVN",
    verificationError: "BVN ezighi ezi - Biko Gbalịa tinye aka n’aka kama nke ahụ",
    profileInfo: "✓ A na-eme ka ozi gị jupụta site na BVN gị. Biko lelee ma gbanwee ma ọ bụrụ na ọ dị mkpa.",
    fullName: "Aha zuru ezu",
    address: "Adreesị",
    phone: "Nọmba ekwentị",
    uploadId: "Bulite Foto ID (Nhọrọ)",
    continueBtn: "Gaa n’ihu",
    tinGenerated: "TIN Nwa Oge Emeela",
    tinLabel: "Nọmba Njirimara Ọrụ Ịkwụ Ụtụ gị",
    tinTag: "TIN gị",
    provisionalInfo: "📝 Nke a bụ TIN nwa oge. FIRS ga-ekwenye ya n'ime awa 24 site na SMS.",
    submitToFIRS: "Zipu gaa FIRS",
    submittingToFIRS: "A na-eziga gaa FIRS...",
    successHeader: "Nnọọ na WazobiaTax!",
    successSubheader: "Ndebanye aha gị zuru ezu",
    smsInfo: "Ị ga-enweta SMS n’ime awa 24. Ị nwere ike ịmalite iji ngwa ahụ ugbu a!",
    dashboardRedirect: "Ana-ebuga gị gaa dashboard...",
    stepProgressTitle1: "Nyocha",
    stepProgressTitle2: "Profailị",
    stepProgressTitle3: "Mee",
    elevenDigits: "Ọnụọgụ 11",
    bvnPlaceholder: "Tinye BVN nwere ọnụọgụ 11",
    manualEntryError: "Gbalịa tinye aka n’aka kama nke ahụ",
    verifyingWithNIBSS: "A na-enyocha na NIBSS...",
    bvnInfoQuestion: "Gịnị kpatara anyị ji chọrọ BVN gị?",
    takePhotoOrUpload: "Were Foto ma ọ bụ Bulite",
    copy: "Detuo",
  },
  yoruba: {
    header: "Ìforúkọsílẹ̀ TIN",
    subheader: "Gba Nọ́mbà ìdánimọ̀ Owo-ori rẹ",
    bvnInfo: "A ti fọwọ́si BVN rẹ lailewu pẹlu NIBSS. A kò tọju BVN rẹ.",
    bvnLabel: "Nọ́mbà ìfọwọ́sowọ́pọ̀ Banki (BVN)",
    verifyBtn: "Fọwọ́sowọ́pọ̀ BVN",
    verificationError: "BVN Kò tóótọ́ - Jọ̀wọ́ gbìmọ̀ sí ìfọwọ́sowọ́pọ̀ l'ọ́wọ́",
    profileInfo: "✓ Àlàyé ti kun láti BVN rẹ laifọwọyi. Jọ̀wọ́ ṣàyẹ̀wò kí o sì ṣàtúnṣe bí ó bá wù.",
    fullName: "Orúkọ pípé",
    address: "Àdírẹ́sì",
    phone: "Nọ́mbà fóònù",
    uploadId: "Gbe fọ́tò ID sórí (Àṣàyàn)",
    continueBtn: "Tẹ̀síwájú",
    tinGenerated: "TIN Àkókò Ṣẹ́dá",
    tinLabel: "Nọ́mbà ìdánimọ̀ Owo-ori rẹ",
    tinTag: "TIN rẹ",
    provisionalInfo: "📝 Eyi jẹ́ TIN àkókò. FIRS yóò jẹ́rìí rẹ̀ nínú wákàtí 24 pẹ̀lú SMS.",
    submitToFIRS: "Fí ranṣẹ́ sí FIRS",
    submittingToFIRS: "Ní ń fí ranṣẹ́ sí FIRS...",
    successHeader: "Ẹ káàbọ̀ sí WazobiaTax!",
    successSubheader: "Ìforúkọsílẹ̀ rẹ ti parí",
    smsInfo: "Ìwọ yóò gba ìfọwọ́sí SMS nínú wákàtí 24. O lè bẹ̀rẹ̀ sí lo app ní báyìí!",
    dashboardRedirect: "Ní ń tọ́ ọ lọ sí dashboard...",
    stepProgressTitle1: "Fọwọ́sowọ́pọ̀",
    stepProgressTitle2: "Àlàyé",
    stepProgressTitle3: "Ṣẹ́dá",
    elevenDigits: "Àwọ̀n 11",
    bvnPlaceholder: "Tẹ BVN rẹ tí ó ní àwọn díjíti 11",
    manualEntryError: "Gbìmọ̀ tẹ́ ọwọ́ rẹ̀ dipo",
    verifyingWithNIBSS: "Ní ń ṣàyẹ̀wò pẹ̀lú NIBSS...",
    bvnInfoQuestion: "Kí ló dé tí a fi nílò BVN rẹ?",
    takePhotoOrUpload: "Ya Fọ́tò tàbí Gbe sórí",
    copy: "Daakọ",
  },
  // Add Hausa, Yoruba, Igbo translations similarly...
};

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
  const { language } = useLanguage();
  const t = translations[language];

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
          setVerificationError(translations[language].verificationError);
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
        <AnimatePresence mode="wait">
          <motion.h1
            key={language + step} // re-animate on language change or step change
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="text-white text-2xl mb-1"
          >
            {translations[language].header}
          </motion.h1>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={language + step + "-sub"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="text-emerald-100 text-sm"
          >
            {translations[language].subheader}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress Steps */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
      <div className="flex items-center w-full">
  {[1, 2, 3].map((s, index) => (
    <div key={s} className="flex items-center w-full">
      {/* Step circle */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
        ${step >= s ? 'bg-emerald-600 text-white' : 'bg-gray-300 text-gray-600'}`}
      >
        {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
      </div>

      {/* Divider */}
      {index < 2 && (
        <div
          className={`flex-1 h-1 mx-4 rounded transition-all duration-300
          ${step > s ? 'bg-emerald-600' : 'bg-gray-300'}`}
        />
      )}
    </div>
  ))}
</div>

        <div className="flex justify-between mt-2 text-xs text-gray-600">
          <span>{translations[language].stepProgressTitle1}</span>
          <span>{translations[language].stepProgressTitle2}</span>
          <span>{translations[language].stepProgressTitle3}</span>
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
                  <p>{translations[language].bvnInfo}</p>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-gray-700">{translations[language].bvnLabel}</label>
                <div className="relative">
                  <input
                    type={showBvn ? 'text' : 'password'}
                    value={bvn}
                    onChange={(e) => setBvn(e.target.value.replace(/\D/g, '').slice(0, 11))}
                    placeholder={translations[language].bvnPlaceholder}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                  <button
                    onClick={() => setShowBvn(!showBvn)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showBvn ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">{bvn.length}/<span>{translations[language].elevenDigits}</span></p>
              </div>

              {verificationError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800"
                >
                  <p>{verificationError}</p>
                  <button className="mt-2 text-sm text-red-600 underline">
                    {translations[language].manualEntryError}
                  </button>
                </motion.div>
              )}

              {/* BVN Verify Button */}
              <motion.button
                key={language + "verifyBtn"}
                onClick={handleVerifyBVN}
                disabled={bvn.length !== 11 || isVerifying}
                className={`w-full py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${bvn.length === 11 && !isVerifying
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {translations[language].verifyingWithNIBSS}
                  </>
                ) : (
                  translations[language].verifyBtn
                )}
              </motion.button>

              <div className="text-center">
                <button className="text-sm text-emerald-600 underline">
                  {translations[language].bvnInfoQuestion}
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
                  {translations[language].profileInfo}
                </p>
              </div>

              <div>
                <label className="block mb-2 text-gray-700 flex items-center gap-2">
                  {translations[language].fullName}
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
                  {translations[language].address}
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
                <label className="block mb-2 text-gray-700">{translations[language].phone}</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">{translations[language].uploadId}</label>
                <button className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 text-gray-600 hover:text-emerald-600">
                  <Camera className="w-5 h-5" />
                  {translations[language].takePhotoOrUpload}
                </button>
              </div>

              <button
                onClick={handleProfileSubmit}
                className="w-full py-4 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg transition-all duration-300"
              >
                {translations[language].continueBtn}
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
                <h2 className="text-xl mb-2">{translations[language].tinGenerated}</h2>
                <p className="text-gray-600 text-sm">{translations[language].tinLabel}</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-2xl">
                <p className="text-emerald-100 text-sm mb-2">{translations[language].tinTag}</p>
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
                    {translations[language].copy}
                  </button>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-900">
                  {translations[language].provisionalInfo}
                </p>
              </div>

              <button
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${!isSubmitting
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

              <h2 className="text-2xl mb-2">{translations[language].successHeader}</h2>
              <p className="text-gray-600 mb-8">{translations[language].successSubheader}</p>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <p className="text-emerald-900">
                  {translations[language].smsInfo}
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8"
              >
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-600" />
                <p className="text-sm text-gray-600 mt-2">{translations[language].dashboardRedirect}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
