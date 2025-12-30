import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, Video, Lightbulb, Search, ChevronDown, Play, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  english: {
    ntaaWhatIs: 'What is the Nigeria Tax Administration Act (NTAA) 2025?',
    ntaaWhatIsAns: 'The NTAA 2025 is a comprehensive reform that simplifies tax compliance for MSMEs...',

    citExemptionWho: 'Who is exempt from Corporate Income Tax?',
    citExemptionWhoAns: 'Businesses with annual turnover below ₦50 million are exempt...',

    lateFilingPenalties: 'What are the penalties for late filing?',
    lateFilingPenaltiesAns: 'Late filing penalties range from ₦25,000 to ₦500,000...',

    tinRegistration: 'How do I register for a TIN?',
    tinRegistrationAns: 'You can register through WazobiaTax using your BVN...',

    videoTaxObligations: 'Understanding Your Tax Obligations',
    videoVatReturns: 'How to File VAT Returns',
    videoTaxExemptions: 'Tax Exemptions for Small Businesses',

    tipFileEarly: 'File Early, Save Money',
    tipFileEarlyDesc: 'File your returns at least 5 days before the deadline...',

    tipKeepRecords: 'Keep Digital Records',
    tipKeepRecordsDesc: 'Use the ledger to track all transactions...',

    tipKnowExemptions: 'Know Your Exemptions',
    tipKnowExemptionsDesc: 'Turnover below ₦100M? You may qualify...',

    bestPractice: 'Best Practice',
    organization: 'Organization',
    savings: 'Savings',

    taxEducation: 'Tax Education',
    searchTaxEducation: 'Search for topics, penalties, exemptions...',
    guides: 'Guides',
    videos: 'Videos',
    tips: 'Tips',

    learningProgressTitle: 'Your Learning Progress',
    completedCount: '2/10 completed',
  
    faqTitle: 'Frequently Asked Questions',
  
    educationalVideosTitle: 'Educational Videos',
    viewsLabel: 'views',
    completedLabel: 'Completed',
  
    subtitlesInfo: 'All videos include multilingual subtitles',

    proTips: 'Pro Tips for Tax Compliance',
  },
  pidgin: {
    // FAQs
    ntaaWhatIs: 'Wetín be Nigeria Tax Administration Act (NTAA) 2025?',
    ntaaWhatIsAns: 'NTAA 2025 na new tax law wey make tax easier for small businesses. If your business no reach ₦50M turnover, you no go pay company income tax.',

    citExemptionWho: 'Who dem exempt from Company Income Tax?',
    citExemptionWhoAns: 'Business wey get less than ₦50M for year no need pay CIT. If e dey between ₦50M and ₦100M, dem go pay small rate.',

    lateFilingPenalties: 'Wetín be punishment for late filing?',
    lateFilingPenaltiesAns: 'If you file late, penalty fit be from ₦25,000 reach ₦500,000 depending on delay. Better file early.',

    tinRegistration: 'How I go take register for TIN?',
    tinRegistrationAns: 'You fit register for TIN through WazobiaTax with your BVN. E no go take pass 3 minutes.',

    // Videos
    videoTaxObligations: 'Understand Your Tax Responsibilities',
    videoVatReturns: 'How To File VAT Returns',
    videoTaxExemptions: 'Tax Exemption For Small Businesses',

    // Tips
    tipFileEarly: 'File Early, Save Money',
    tipFileEarlyDesc: 'File your tax before deadline make mistake and penalty no follow.',

    tipKeepRecords: 'Keep Your Records Digital',
    tipKeepRecordsDesc: 'Use ledger keep all your transactions. E go make filing easier.',

    tipKnowExemptions: 'Know Your Tax Exemptions',
    tipKnowExemptionsDesc: 'If your turnover small, you fit qualify for tax relief.',

    bestPractice: 'Best Practice',
    organization: 'Organization',
    savings: 'Savings',

    taxEducation: 'Learn About Tax',
    searchTaxEducation: 'Search topics, punishment and who dem exempt...',
    guides: 'Help',
    videos: 'Videos',
    tips: 'Advice',

    learningProgressTitle: 'How You Take Dey Learn',
    completedCount: '2/10 don complete',
  
    faqTitle: 'Questions Wey Dem Dey Ask Well Well',
  
    educationalVideosTitle: 'Videos Wey You Fit Learn From',
    viewsLabel: 'views',
    completedLabel: 'E Don Finish',
  
    subtitlesInfo: 'All the videos get subtitles for other language',

    proTips: 'Beta Advice for Tax Compliance',
  },
  hausa: {
    ntaaWhatIs: 'Menene Dokar Haraji ta NTAA 2025?',
    ntaaWhatIsAns: 'NTAA 2025 sabuwar doka ce da ke sauƙaƙa biyan haraji ga ƙananan kasuwanci. Idan kudin shigar kasuwancinka bai kai ₦50M ba, ba za ka biya CIT ba.',

    citExemptionWho: 'Wa ke da rangwamen harajin CIT?',
    citExemptionWhoAns: 'Kasuwanci da kudin shigar shekara bai kai ₦50M ba suna da rangwame daga CIT.',

    lateFilingPenalties: 'Menene hukuncin jinkirin filing?',
    lateFilingPenaltiesAns: 'Hukuncin jinkiri yana daga ₦25,000 zuwa ₦500,000 gwargwadon lokaci.',

    tinRegistration: 'Ta yaya zan yi rijistar TIN?',
    tinRegistrationAns: 'Za ka iya yin rijistar TIN ta WazobiaTax da BVN. Yana ɗaukar mintuna kaɗan.',

    videoTaxObligations: 'Fahimtar Nauyin Harajinka',
    videoVatReturns: 'Yadda Ake Filing VAT',
    videoTaxExemptions: 'Rangwamen Haraji Ga Ƙananan Kasuwanci',

    tipFileEarly: 'Yi Filing Da Wuri',
    tipFileEarlyDesc: 'Yi filing kafin wa’adi don kauce wa tara.',

    tipKeepRecords: 'Ajiye Bayanai A Dijital',
    tipKeepRecordsDesc: 'Ledger yana taimaka maka wajen bin dukkan ma’amaloli.',

    tipKnowExemptions: 'San Rangwamen Harajinka',
    tipKnowExemptionsDesc: 'Ƙananan kasuwanci na iya samun rangwamen haraji.',

    bestPractice: 'Mafi Kyawun Hanya',
    organization: 'Tsari',
    savings: 'Ajiya',

    taxEducation: 'Ilimin Haraji',
    searchTaxEducation: 'Nemo batutuwa, tara, rangwame...',
    guides: 'Jagora',
    videos: 'Bidiyo',
    tips: 'Shawarwari',

    learningProgressTitle: 'Ci gaban Karatunka',
    completedCount: '2/10 an kammala',
  
    faqTitle: 'Tambayoyin da Aka Fi Yawan Yi',
  
    educationalVideosTitle: 'Bidiyoyin Ilimi',
    viewsLabel: 'kallo',
    completedLabel: 'An Kammala',
  
    subtitlesInfo: 'Dukkan bidiyo suna da fassarar harsuna da dama',

    proTips: 'Shawarwari na Kwarai don Bin Haraji',
  },
  yoruba: {
    ntaaWhatIs: 'Kí ni Ofin NTAA 2025?',
    ntaaWhatIsAns: 'NTAA 2025 jẹ́ ofin tuntun tí ó rọrùn fún ìsanwó owó-ori àwọn ilé-iṣẹ́ kékeré. Bí owó-wọlé rẹ kò bá ju ₦50M lọ, ìwọ ò ní san CIT.',

    citExemptionWho: 'Ta ni a dá lórí ìsan CIT?',
    citExemptionWhoAns: 'Àwọn ilé-iṣẹ́ tí owó-wọlé wọn kò ju ₦50M lọ ni a dá lórí CIT.',

    lateFilingPenalties: 'Kí ni ìtanràn fún filing pẹ?',
    lateFilingPenaltiesAns: 'Ìtanràn le jẹ́ láti ₦25,000 sí ₦500,000 gẹ́gẹ́ bí ìpẹ̀yà.',

    tinRegistration: 'Báwo ni mo ṣe lè forúkọsílẹ̀ TIN?',
    tinRegistrationAns: 'O lè forúkọsílẹ̀ TIN rẹ nípasẹ̀ WazobiaTax pẹ̀lú BVN.',

    videoTaxObligations: 'Lílóye Ojuse Owó-ori Rẹ',
    videoVatReturns: 'Bí A Ṣe N Fọwọ́sí VAT',
    videoTaxExemptions: 'Àwọn Àyọkúrò Owó-ori',

    tipFileEarly: 'Fọwọ́sí Ní Kánkán',
    tipFileEarlyDesc: 'Fọwọ́sí ṣáájú àkókò láti yago fún ìtanràn.',

    tipKeepRecords: 'Pa Ìkọ̀kọ̀ Sí Dijítàlì',
    tipKeepRecordsDesc: 'Ledger ń ràn ọ́ lọ́wọ́ láti ṣètò gbogbo ìṣúná rẹ.',

    tipKnowExemptions: 'Mọ Àyọkúrò Rẹ',
    tipKnowExemptionsDesc: 'Ìwọ lè yẹ fún àyọkúrò owó-ori.',

    bestPractice: 'Ọ̀nà Tó Dáa Jù',
    organization: 'Ìṣètò',
    savings: 'Ìfipamọ́',

    taxEducation: 'Ẹ̀kọ́ Owó-ori',
    searchTaxEducation: 'Wa koko-ọrọ, ìtanràn, àyọkúrò...',
    guides: 'Àwọn Itọ́sọ́nà',
    videos: 'Àwọn Fídíò',
    tips: 'Àwọn Imọ̀ràn',

    learningProgressTitle: 'Ilọsiwaju Ẹkọ Rẹ',
    completedCount: '2/10 ti pari',
  
    faqTitle: 'Awọn Ibeere Ti A Maa N Beere Nigbagbogbo',
  
    educationalVideosTitle: 'Awọn Fidio Ẹkọ',
    viewsLabel: 'awọn iwo',
    completedLabel: 'Ti Pari',
  
    subtitlesInfo: 'Gbogbo fidio ni awọn atunkọ ede pupọ',

    proTips: 'Àwọn Ìmọ̀ràn Ìsanwó Owó-ori',
  },
  igbo: {
    ntaaWhatIs: 'Gịnị bụ Iwu NTAA 2025?',
    ntaaWhatIsAns: 'NTAA 2025 bụ iwu ọhụrụ nke na-eme ka ịkwụ ụtụ isi dị mfe maka obere azụmahịa. Ọ bụrụ na ego mbata gị erughị ₦50M, ị gaghị akwụ CIT.',

    citExemptionWho: 'Ònye ka a gbaghara CIT?',
    citExemptionWhoAns: 'Azụmahịa nwere ego mbata n’okpuru ₦50M enweghi CIT.',

    lateFilingPenalties: 'Gịnị bụ ntaramahụhụ filing n’oge?',
    lateFilingPenaltiesAns: 'Ntaramahụhụ nwere ike si na ₦25,000 ruo ₦500,000.',

    tinRegistration: 'Kedu ka m ga-esi nweta TIN?',
    tinRegistrationAns: 'Ị nwere ike ịdebanye aha TIN site na WazobiaTax jiri BVN.',

    videoTaxObligations: 'Ịghọta Ọrụ Ụtụ Isi Gị',
    videoVatReturns: 'Otu E Si Etinye VAT',
    videoTaxExemptions: 'Mmefu Ụtụ Isi Maka Obere Azụmahịa',

    tipFileEarly: 'Tinye Filing N’oge',
    tipFileEarlyDesc: 'Tinye filing tupu oge eruo ka ị zere ntaramahụhụ.',

    tipKeepRecords: 'Debe Ndekọ Dijitalụ',
    tipKeepRecordsDesc: 'Ledger na-enyere gị ijikwa ndekọ ego gị.',

    tipKnowExemptions: 'Mara Mmefu Ụtụ Isi Gị',
    tipKnowExemptionsDesc: 'Obere azụmahịa nwere ike inweta mmefu ụtụ isi.',

    bestPractice: 'Omume Kachasị Mma',
    organization: 'Nhazi',
    savings: 'Nchekwa',

    taxEducation: 'Mmụta Ụtụ Isi',
    searchTaxEducation: 'Chọọ isiokwu, ntaramahụhụ, mmefu...',
    guides: 'Ntuziaka',
    videos: 'Vidiyo',
    tips: 'Ndụmọdụ',

    learningProgressTitle: 'Ọganihu Mmụta Gị',
    completedCount: '2/10 emechala',
  
    faqTitle: 'Ajụjụ A Na-ajụkarị',
  
    educationalVideosTitle: 'Vidiyo Mmụta',
    viewsLabel: 'nlele',
    completedLabel: 'O Gwula',
  
    subtitlesInfo: 'Vidiyo niile nwere asụsụ ntụgharị dị iche iche',

    proTips: 'Atụmatụ Dị Mma maka Ịrụ Ọrụ Ụtụ Isi',
  }
}

interface EducationModuleProps {
  onNavigate: (screen: string) => void;
}

export function EducationModule({ onNavigate }: EducationModuleProps) {
  const [activeTab, setActiveTab] = useState('guides');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      questionKey: 'ntaaWhatIs',
      answerKey: 'ntaaWhatIsAns',
      sectionKey: 'ntaaBasics'
    },
    {
      id: 2,
      questionKey: 'citExemptionWho',
      answerKey: 'citExemptionWhoAns',
      sectionKey: 'exemptions'
    },
    {
      id: 3,
      questionKey: 'lateFilingPenalties',
      answerKey: 'lateFilingPenaltiesAns',
      sectionKey: 'penalties'
    },
    {
      id: 4,
      questionKey: 'tinRegistration',
      answerKey: 'tinRegistrationAns',
      sectionKey: 'registration'
    },
  ];

  const videos = [
    {
      id: 1,
      titleKey: 'videoTaxObligations',
      duration: '5:30',
      thumbnail: '📊',
      views: '1.2K',
      completed: false
    },
    {
      id: 2,
      titleKey: 'videoVatReturns',
      duration: '8:45',
      thumbnail: '📝',
      views: '850',
      completed: true
    },
    {
      id: 3,
      titleKey: 'videoTaxExemptions',
      duration: '6:20',
      thumbnail: '💡',
      views: '2.1K',
      completed: false
    },
  ];

  const tips = [
    {
      id: 1,
      titleKey: 'tipFileEarly',
      descriptionKey: 'tipFileEarlyDesc',
      categoryKey: 'bestPractice',
      icon: '⏰'
    },
    {
      id: 2,
      titleKey: 'tipKeepRecords',
      descriptionKey: 'tipKeepRecordsDesc',
      categoryKey: 'organization',
      icon: '📱'
    },
    {
      id: 3,
      titleKey: 'tipKnowExemptions',
      descriptionKey: 'tipKnowExemptionsDesc',
      categoryKey: 'savings',
      icon: '💰'
    },
  ];

  const { language } = useLanguage();
  const t = translations[language];

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
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all -ml-2"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg">{translations[language].taxEducation}</h1>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={translations[language].searchTaxEducation}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
  {[
    { id: 'guides', label: t.guides, icon: BookOpen },
    { id: 'videos', label: t.videos, icon: Video },
    { id: 'tips', label: t.tips, icon: Lightbulb },
  ].map((tab) => (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`flex-1 py-2 px-4 rounded-lg text-sm transition-all flex items-center justify-center gap-2 ${
        activeTab === tab.id
          ? 'bg-emerald-600 text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      <tab.icon className="w-4 h-4" />
      {tab.label}
    </button>
  ))}
</div>
      </div>

      {/* Progress Tracker */}
      <div className="px-6 py-4 bg-blue-50 border-b border-blue-200">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-blue-900">{translations[language].learningProgressTitle}</p>
          <p className="text-sm text-blue-600">{translations[language].completedCount}</p>
        </div>
        <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '20%' }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-blue-600 rounded-full"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Guides Tab */}
        {activeTab === 'guides' && (
          <div className="space-y-3">
            <h3 className="text-sm text-gray-600 mb-3">{translations[language].faqTitle}</h3>
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-all"
                >
                  <div className="flex-1 pr-4">
                    <span className="text-xs text-emerald-600 mb-1 block">{t[faq.sectionKey]}</span>
                    <p className="text-sm">{t[faq.questionKey]}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedFaq === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>

                {expandedFaq === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-4 border-t border-gray-100"
                  >
                    <p className="text-sm text-gray-600 pt-3">{t[faq.answerKey]}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Videos Tab */}
        {activeTab === 'videos' && (
          <div className="space-y-3">
            <h3 className="text-sm text-gray-600 mb-3">{translations[language].educationalVideosTitle}</h3>
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 relative">
                    {video.thumbnail}
                    {!video.completed && (
                      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    )}
                    {video.completed && (
                      <div className="absolute top-1 right-1">
                        <CheckCircle2 className="w-5 h-5 text-white bg-emerald-600 rounded-full" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm mb-1">{t[video.titleKey]}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{video.duration}</span>
                      <span>•</span>
                      <span>{video.views} {translations[language].viewsLabel}</span>
                    </div>
                    {video.completed && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-xs">
                        ✓ {translations[language].completedLabel}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              <p className="text-sm text-blue-900 mb-2">{translations[language].subtitlesInfo}</p>
              <div className="flex justify-center gap-2 flex-wrap">
                {['English', 'Pidgin', 'Hausa', 'Yoruba', 'Igbo'].map((lang) => (
                  <span key={lang} className="px-2 py-1 bg-white rounded text-xs text-blue-700">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tips Tab */}
        {activeTab === 'tips' && (
          <div className="space-y-3">
            <h3 className="text-sm text-gray-600 mb-3">{translations[language].proTips}</h3>
            {tips.map((tip, index) => (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">{tip.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-sm">{t[tip.titleKey]}</h3>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-xs">
                        {t[tip.categoryKey]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{t[tip.descriptionKey]}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
