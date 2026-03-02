import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Shield, CheckCircle2, AlertCircle, Download, Share2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from 'react-router-dom';
import { profileTranslations, type LanguageKey } from '../translations/profile';

interface TaxClearanceProps {
  language?: LanguageKey;
}

const translations = {
  english: {
    taxClearance: 'Tax Clearance Certificate',
    taxClearanceDesc: 'Verify your tax compliance status and generate your certificate',
    whatYouNeed: "What You'll Need:",
    noOutstandingTax: 'No outstanding tax obligations',
    returnsFiled: 'All returns filed on time',
    validTIN: 'Valid TIN registration',
    tccInfo: '💡 The Tax Clearance Certificate (TCC) is required for government contracts, bank loans, and business registrations.',
    checkingEligibility: 'Checking eligibility...',
    checkEligibility: 'Check Eligibility',

    eligible: "You're Eligible!",
    noOutstandingTaxFound: 'No outstanding tax obligations found',
    complianceStatus: 'Compliance Status',
    outstandingTax: 'Outstanding Tax',
    pendingReturns: 'Pending Returns',
    complianceScore: 'Compliance Score',
    goodStanding: 'Good Standing',
    tccIncludes: 'Your TCC Will Include:',
    digitalCertificate: 'Digital certificate (PDF format)',
    validForMonths: 'Valid for 12 months',
    qrCode: 'QR code for instant verification',
    acceptedByAll: 'Accepted by all Nigerian institutions',
    generateCertificate: 'Generate Certificate',

    tccTitle: 'Tax Clearance Certificate',
    firs: 'Federal Inland Revenue Service',
    certificateNo: 'Certificate No.',
    tin: 'TIN',
    name: 'Name',
    business: 'Business',
    issueDate: 'Issue Date',
    expiryDate: 'Expiry Date',
    scanVerify: 'Scan to verify authenticity',
    tccGenerated: '✓ Your Tax Clearance Certificate has been generated and is valid for 12 months.',
    downloadPDF: 'Download Certificate (PDF)',
    shareCertificate: 'Share Certificate',
    backToDashboard: 'Back to Dashboard',

    notEligibleTitle: 'Not Eligible Yet',
    outstandingMsg: 'You have outstanding obligations',
    outstandingIssues: 'Outstanding Issues',
    howToBecomeEligible: 'To become eligible:',
    step1: 'Pay all outstanding tax obligations',
    step2: 'File all pending returns',
    step3: 'Wait for system update (24-48 hours)',
    payOutstanding: 'Pay Outstanding Tax',
  },
  pidgin: {
    taxClearance: 'Tax Clearance Certificate',
    taxClearanceDesc: 'Check say your tax dey okay and generate your certificate',
    whatYouNeed: "Wetin You Go Need:",
    noOutstandingTax: 'No tax money wey dey unpaid',
    returnsFiled: 'All returns don submit on time',
    validTIN: 'Valid TIN registration',
    tccInfo: '💡 Tax Clearance Certificate (TCC) na wetin government contracts, bank loans, and business registration need.',
    checkingEligibility: 'We dey check if you dey eligible...',
    checkEligibility: 'Check If You Dey Eligible',

    eligible: 'You dey Eligible!',
    noOutstandingTaxFound: 'No tax money wey dey unpaid',
    complianceStatus: 'Compliance Status',
    outstandingTax: 'Tax wey remain',
    pendingReturns: 'Returns wey never finish',
    complianceScore: 'Compliance Score',
    goodStanding: 'Good Standing',
    tccIncludes: 'Your TCC go get:',
    digitalCertificate: 'Digital certificate (PDF format)',
    validForMonths: 'You fit use am for 12 months',
    qrCode: 'QR code wey go help you verify sharp sharp',
    acceptedByAll: 'All Naija institutions go accept am',
    generateCertificate: 'Create the Certificate',

    tccTitle: 'Tax Clearance Certificate',
    firs: 'Federal Inland Revenue Service',
    certificateNo: 'Certificate No.',
    tin: 'TIN',
    name: 'Name',
    business: 'Business',
    issueDate: 'The Date Wey Dem Give You Am',
    expiryDate: 'The Date Wey E Go Expire',
    scanVerify: 'Scan am to verify say e correct',
    tccGenerated: '✓ Your TCC don generate and you fit use am for 12 months.',
    downloadPDF: 'Download Certificate (PDF)',
    shareCertificate: 'Share Certificate',
    backToDashboard: 'Go Back to Dashboard',

    notEligibleTitle: 'You No Dey Eligible',
    outstandingMsg: 'You get some wahala wey you never clear',
    outstandingIssues: 'Wahala Wey You Never Clear',
    howToBecomeEligible: 'How you go fit become eligible:',
    step1: 'Pay all the tax wey you never pay',
    step2: 'File all returns wey never finish',
    step3: 'Wait for system to update (24-48 hours)',
    payOutstanding: 'Pay The Tax Money Wey Owe',
  },
  hausa: {
    taxClearance: 'Takaddun Tabbatar da Haraji',
    taxClearanceDesc: 'Tabbatar da matsayin bin haraji kuma samar da takaddun shaida',
    whatYouNeed: 'Abubuwan da Za Ku Bukata:',
    noOutstandingTax: 'Babu wasu biyan haraji da suka rage',
    returnsFiled: 'Duk rahotanni sun gabatar akan lokaci',
    validTIN: 'Rajistar TIN mai inganci',
    tccInfo: '💡 Takaddun Tabbatar da Haraji (TCC) yana da muhimmanci don kwangilolin gwamnati, rancen banki, da rijistar kasuwanci.',
    checkingEligibility: 'Ana duba cancanta...',
    checkEligibility: 'Duba Cancanta',

    eligible: 'Kun cancanta!',
    noOutstandingTaxFound: 'Babu wasu biyan haraji da suka rage',
    complianceStatus: 'Matsayin Bin Doka',
    outstandingTax: 'Harajin da ya rage',
    pendingReturns: 'Rahotannin da ba a gabatar ba',
    complianceScore: 'Matsayin Bin Doka',
    goodStanding: 'Cikakkiyar Matsayi',
    tccIncludes: 'TCC ɗinka zai ƙunshi:',
    digitalCertificate: 'Takaddun shaida na dijital (PDF)',
    validForMonths: 'Mai inganci na watanni 12',
    qrCode: 'QR code don tabbatarwa nan take',
    acceptedByAll: 'Ana karɓa a dukkan hukumomin Najeriya',
    generateCertificate: 'Samar da Takaddun Shaida',

    tccTitle: 'Takaddun Shaida na Biyan Haraji',
    firs: 'Hukumar Kula da Haraji ta Tarayya',
    certificateNo: 'Lambar Takaddun Shaida',
    tin: 'TIN',
    name: 'Suna',
    business: 'Kasuwanci',
    issueDate: 'Ranar Fitarwa',
    expiryDate: 'Ranar Karewa',
    scanVerify: 'Duba don tabbatar da sahihanci',
    tccGenerated: '✓ An samar da TCC ɗinka kuma yana da inganci na watanni 12.',
    downloadPDF: 'Sauke Takaddun (PDF)',
    shareCertificate: 'Raba Takaddun',
    backToDashboard: 'Komawa Dashboard',

    notEligibleTitle: 'Ba a Cancanta ba Yanzu',
    outstandingMsg: 'Kana da wasu wajibai da ba a biya ba',
    outstandingIssues: 'Matsalolin da ba a warware ba',
    howToBecomeEligible: 'Don ka zama mai cancanta:',
    step1: 'Biya dukkan harajin da ba a biya ba',
    step2: 'Miƙa duk rahotannin da ke jiran aikawa',
    step3: 'Jira sabuntawa daga tsarin (24-48 hours)',
    payOutstanding: 'Biya Harajin da ba a biya ba',
  },
  yoruba: {
    taxClearance: 'Ìwé Ẹri Ìbámu Owó-ori',
    taxClearanceDesc: 'Ṣayẹwo ipo ìbámu owó-ori rẹ ki o si gba ìwé-ẹri rẹ',
    whatYouNeed: 'Ohun tí O Ní Lọ́wọ́:',
    noOutstandingTax: 'Kò sí owó-ori tó kù',
    returnsFiled: 'Gbogbo àpèsè ti fi sílẹ̀ ní àkókò',
    validTIN: 'Ìforúkọsílẹ̀ TIN tó wúlò',
    tccInfo: '💡 Ìwé Ẹri Ìbámu Owó-ori (TCC) wúlò fún àwọn ìwé-òfin ìjọba, àyẹ̀wò banki, àti ìforúkọsílẹ̀ ìṣòwò.',
    checkingEligibility: 'Ṣàyẹwo ìbámu...',
    checkEligibility: 'Ṣàyẹwo',

    eligible: 'O jẹ́ oníbámu!',
    noOutstandingTaxFound: 'Kò sí owó-ori tó kù',
    complianceStatus: 'Ìpò Ìbámu',
    outstandingTax: 'Owó-ori tó kù',
    pendingReturns: 'Àpèsè tí kò tíì fi sílẹ̀',
    complianceScore: 'Ìpele Ìbámu',
    goodStanding: 'Ìpò Tó Dáa',
    tccIncludes: 'Ìwé-ẹri TCC rẹ yóò ní:',
    digitalCertificate: 'Ìwé-ẹri díjítàlì (PDF)',
    validForMonths: 'Wúlò fún oṣù 12',
    qrCode: 'QR code fún ìmúdájú lẹ́sẹ̀kẹsẹ',
    acceptedByAll: 'Gbogbo ilé-ìṣẹ̀ Naijiria máa gba a',
    generateCertificate: 'Ṣe Ìwé-ẹri',

    tccTitle: 'Ìwé-ẹri Ìtọ́jú Owó-ori',
    firs: 'Federal Inland Revenue Service',
    certificateNo: 'Nọ́mbà Ìwé-ẹri',
    tin: 'TIN',
    name: 'Orúkọ',
    business: 'Ìṣòwò',
    issueDate: 'Ọjọ́ Ìtẹ̀jáde',
    expiryDate: 'Ọjọ́ Ìparí',
    scanVerify: 'Ṣayẹwo láti jẹ́risi otítọ́',
    tccGenerated: '✓ Ìwé-ẹri TCC rẹ ti dá àti wúlò fún oṣù 12.',
    downloadPDF: 'Gba Ìwé-ẹri (PDF)',
    shareCertificate: 'Pín Ìwé-ẹri',
    backToDashboard: 'Padà sí Dashboard',

    notEligibleTitle: 'Kò Ṣe Éligibulu Síbẹ̀',
    outstandingMsg: 'O ní àwọn ojúṣe tí o kò tíì ṣe',
    outstandingIssues: 'Awọn iṣoro tí kò tíì yanju',
    howToBecomeEligible: 'Láti di éligibulu:',
    step1: 'San gbogbo owó-ori tí kò tíì san',
    step2: 'Fi gbogbo ìròyìn tí kò tíì ranṣẹ́ ranṣẹ́',
    step3: 'Duro fun imudojuiwọn eto (24-48 hours)',
    payOutstanding: 'San Owó-ori Tí Kò Tíì San',
  },
  igbo: {
    taxClearance: 'Asambodo Ntụle Ọrụ Ụtụ Isi',
    taxClearanceDesc: 'Lelee ma ị rụzuru ụtụ isi nke ọma ma nweta asambodo gị',
    whatYouNeed: 'Ihe Ị Ga-achọ:',
    noOutstandingTax: 'Enweghị ụtụ isi na-akwụghị ụgwọ',
    returnsFiled: 'Akwụkwọ niile etinyela n’oge',
    validTIN: 'Ndebanye aha TIN dị irè',
    tccInfo: '💡 Asambodo Ntụle Ọrụ Ụtụ Isi (TCC) dị mkpa maka nkwekọrịta gọọmenti, ụgwọ bank, na ndebanye azụmahịa.',
    checkingEligibility: 'Na-enyocha ikike...',
    checkEligibility: 'Lelee Ikike',

    eligible: 'Ị dabara!',
    noOutstandingTaxFound: 'Enweghị ụtụ isi na-akwụghị ụgwọ',
    complianceStatus: 'Ọnọdụ Ntụle',
    outstandingTax: 'Ụtụ Isi Fọdụrụ',
    pendingReturns: 'Akwụkwọ Fọdụrụ',
    complianceScore: 'Ọnọdụ Ntụle',
    goodStanding: 'Ọnọdụ Dị Mma',
    tccIncludes: 'TCC gị ga-agụnye:',
    digitalCertificate: 'Asambodo dijitalụ (PDF)',
    validForMonths: 'Dị irè ruo ọnwa 12',
    qrCode: 'QR code maka nnwale ozugbo',
    acceptedByAll: 'A nabatara site na ụlọ ọrụ niile Nigeria',
    generateCertificate: 'Mepụta Asambodo',

    tccTitle: 'Asambodo Ntụle Ụtụ Isi',
    firs: 'Federal Inland Revenue Service',
    certificateNo: 'Nọmba Asambodo',
    tin: 'TIN',
    name: 'Aha',
    business: 'Ahịa',
    issueDate: 'Ụbọchị Esi Nye',
    expiryDate: 'Ụbọchị Njedebe',
    scanVerify: 'Lelee iji chọpụta eziokwu ya',
    tccGenerated: '✓ TCC gị e kere ma dị irè ruo ọnwa 12.',
    downloadPDF: 'Budata Asambodo (PDF)',
    shareCertificate: 'Kekọrịta Asambodo',
    backToDashboard: 'Laghachiri Dashboard',

    notEligibleTitle: 'Ị Ka Adịghị Ejikere',
    outstandingMsg: 'Ị nwere ụfọdụ ụgwọ ị gaghị akwụ',
    outstandingIssues: 'Nsogbu fọdụrụ',
    howToBecomeEligible: 'Iji bụrụ ejikere:',
    step1: 'Kwụọ ụtụ niile fọdụrụ',
    step2: 'Tinye ụtụ niile fọdụrụ',
    step3: 'Chere maka mmelite sistemụ (24-48 hours)',
    payOutstanding: 'Kwụọ ụtụ fọdụrụ',
  },
};

export function TaxClearance( { language = 'english' }: TaxClearanceProps ) {
  const [step, setStep] = useState('check'); // check, eligible, certificate, ineligible
  const [isChecking, setIsChecking] = useState(false);
  const [isEligible] = useState(true); // Simulate eligibility
  const outstandingAmount = 0;
  const navigate = useNavigate();

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

  // const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Status Bar */}
      <div className="h-11 bg-emerald-600 flex items-center justify-between px-6 text-white text-sm">

      </div>

      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/profile')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all -ml-2"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg">{translations[language].taxClearance}</h1>
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
              <h2 className="text-xl mb-2">{translations[language].taxClearance}</h2>
              <p className="text-sm text-gray-600">
                {translations[language].taxClearanceDesc}
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 space-y-3">
              <h3 className="text-sm mb-3">{translations[language].whatYouNeed}</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{translations[language].noOutstandingTax}</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{translations[language].returnsFiled}</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{translations[language].validTIN}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-900">
                {translations[language].tccInfo}
              </p>
            </div>

            <button
              onClick={handleCheckEligibility}
              disabled={isChecking}
              className={`w-full py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${!isChecking
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
            >
              {isChecking ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {translations[language].checkingEligibility}
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  {translations[language].checkEligibility}
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
              <h2 className="text-xl mb-2">{translations[language].eligible}</h2>
              <p className="text-sm text-gray-600">
                {translations[language].noOutstandingTaxFound}
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <h3 className="text-sm mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {translations[language].complianceStatus}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">{translations[language].outstandingTax}</span>
                  <span className="text-emerald-600">₦0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">{translations[language].pendingReturns}</span>
                  <span className="text-emerald-600">0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">{translations[language].complianceScore}</span>
                  <span className="text-emerald-600">{translations[language].goodStanding}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <h3 className="text-sm mb-3">{translations[language].tccIncludes}</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">•</span>
                  <span>{translations[language].digitalCertificate}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">•</span>
                  <span>{translations[language].validForMonths}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">•</span>
                  <span>{translations[language].qrCode}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">•</span>
                  <span>{translations[language].acceptedByAll}</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleGenerateCertificate}
              className="w-full py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-lg transition-all"
            >
              {translations[language].generateCertificate}
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
                <h3 className="text-lg mb-1">{translations[language].tccTitle}</h3>
                <p className="text-xs text-gray-600">{translations[language].firs}</p>
              </div>

              <div className="border-t border-b border-gray-200 py-4 my-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{translations[language].certificateNo}</span>
                  <span>TCC-2025-{Math.floor(Math.random() * 10000)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{translations[language].tin}</span>
                  <span>123456789-0001</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{translations[language].name}</span>
                  <span>Chukwuma Okafor</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{translations[language].business}</span>
                  <span>Bukka Restaurant</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{translations[language].issueDate}</span>
                  <span>Dec 13, 2025</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{translations[language].expiryDate}</span>
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
                {translations[language].scanVerify}
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <p className="text-sm text-emerald-900">
                {translations[language].tccGenerated}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-lg transition-all flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                {translations[language].downloadPDF}
              </button>
              <button className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5" />
                {translations[language].shareCertificate}
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
              <h2 className="text-xl mb-2">{translations[language].notEligibleTitle}</h2>
              <p className="text-sm text-gray-600">
                {translations[language].outstandingMsg}
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <h3 className="text-sm mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                {translations[language].outstandingIssues}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">{translations[language].outstandingTax}</span>
                  <span className="text-red-600">₦{outstandingAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">{translations[language].pendingReturns}</span>
                  <span className="text-red-600">2</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <h3 className="text-sm mb-3">{translations[language].howToBecomeEligible}</h3>
              <ol className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">1.</span>
                  <span>{translations[language].step1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">2.</span>
                  <span>{translations[language].step2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">3.</span>
                  <span>{translations[language].step3}</span>
                </li>
              </ol>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate('/pay-tax')}
                className="w-full py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 shadow-lg transition-all"
              >
                {translations[language].payOutstanding}
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
