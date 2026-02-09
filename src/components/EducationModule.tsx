import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, Video, Lightbulb, Search, ChevronDown, Play, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from 'react-router-dom';
import { profileTranslations, type LanguageKey } from '../translations/profile';

interface EducationModuleProps {
  language?: LanguageKey;
}

const translations = {
  english: {
    ntaaWhatIs: 'What is the Nigeria Tax Administration Act 2025 (NTAA)?',
    ntaaWhatIsAns: 'The NTAA is the new law (effective January 1, 2026) that makes tax rules the same across Nigeria — federal, state, and local. It helps small businesses register easily, keep simple records, and file returns without too much stress (Section 1: Objective).',

    citExemptionWho: 'Who is exempt from Corporate Income Tax?',
    citExemptionWhoAns: 'Businesses with annual turnover below ₦50 million are exempt...',

    lateFilingPenalties: 'What are the penalties for late filing?',
    lateFilingPenaltiesAns: 'Late filing penalties range from ₦25,000 to ₦500,000...',

    tinRegistration: 'How do I register for a TIN?',
    tinRegistrationAns: 'You can register through WazobiaTax using your BVN...',

    doINeed: "Do I need a Tax Identification Number (TaxID) as a small business owner?",
    doINeedAns: "Yes — every taxable person (including small businesses) must have a TaxID. It's free and easy to get using your NIN or business registration number. The app can help fetch it automatically (NTAA Sections 4–10).",

    whatIsACompany: `What is a "small company" or "small business" under the new tax laws?`,
    whatIsACompanyAns: `A small company usually means your business has annual turnover (sales) of ₦100 million or less and fixed assets (like equipment) not more than ₦250 million. Many small businesses qualify as "small" and get big tax relief (Nigeria Tax Act 2025, Section 56; NTAA definitions).`,

    smallBusinessPay: "Do small businesses pay Company Income Tax (CIT)?",
    smallBusinessPayAns: "No — if your annual turnover is ₦100 million or less (and fixed assets ≤ ₦250m), you pay 0% CIT. This exemption helps small traders, farmers, and freelancers keep more money to grow (Nigeria Tax Act 2025, small company exemption).",

    whatAboutCGT: "What about Capital Gains Tax (CGT) and Development Levy for small businesses?",
    whatAboutCGTAns: "Small companies (turnover ≤ ₦100m) are fully exempt from CGT and the new 4% Development Levy. This replaces old extra charges like education tax or IT levy (Nigeria Tax Act 2025).",

    doIPayVAT: "Do I have to charge and pay Value Added Tax (VAT)?",
    doIPayVATAns: "If your annual turnover is below a certain threshold (often around ₦25m–₦50m depending on exact rules), you may be exempt from charging VAT or filing VAT returns. Check your turnover in the app to see if you qualify (NTAA Sections 22–23; small business VAT relief).",

    whatIncomeIsTaxFree: "What income is tax-free for individuals running small businesses?",
    whatIncomeIsTaxFreeAns: "For personal income tax (PIT), the first ₦800,000 of your annual income is tax-free. Above that, tax starts at low rates (progressive). Many informal traders and freelancers pay little or no PIT (Nigeria Tax Act reforms).",

    doIKeepRecordsOfSales: "Do I need to keep records of my sales and expenses?",
    doIKeepRecordsOfSalesAns: "Yes — the law requires you to keep simple books of account (income and expenses). You can use the app's digital ledger — it's enough for most small businesses (NTAA Section 31: Books of account).",

    useMyPhoneToScan: "Can I use my phone to scan receipts instead of writing everything?",
    useMyPhoneToScanAns: "Yes! The app has OCR (scan receipts with camera) to add expenses automatically. This helps prove your records if needed (NTAA supports technology use — Section 71).",

    whatIsSimplifiedTaxReturn: "What is a simplified tax return?",
    whatIsSimplifiedTaxReturnAns: "For small businesses and individuals, there is a simple annual income tax return. The app auto-fills it from your ledger — no need for complex forms (NTAA Section 15: Simplified annual income tax return).",

    oftenFileTaxReturns: "How often do I file tax returns?",
    oftenFileTaxReturnsAns: "Most small businesses file once a year (annual return). Some may need quarterly estimates if income varies (e.g., farmers). The app reminds you of deadlines (NTAA Sections 11–15, 34).",

    smallBusinessFileVAT: "Do small businesses have to file VAT returns?",
    smallBusinessFileVATAns: "If exempt (low turnover), no. If you charge VAT, file monthly or quarterly. The app helps track input/output VAT and file easily (NTAA Sections 22–23).",

    howDoIPayTax: "How do I pay my taxes?",
    howDoIPayTaxAns: "Pay online via the app using bank cards or mobile money (integrated gateways like Paystack). It's safe and gives instant receipt. Pay on time to avoid extra charges (NTAA Section 49: Payment of tax).",

    whatIsATCC: "What is a Tax Clearance Certificate (TCC) and why do I need it?",
    whatIsATCCAns: "A TCC proves you have no outstanding tax. You need it for contracts, loans, or big business deals. Request it in the app after filing — it's digital now (NTAA Section 72).",

    whatHappensIfIPayLate: "What happens if I file or pay late?",
    whatHappensIfIPayLateAns: "You may pay penalties (e.g., 10% of tax + ₦25,000 for late filing) and interest (1.5% per month). The app sends reminders and calculates penalties so you can avoid them (NTAA Sections 65, 101).",

    canIGetRefund: "Can I get a refund if I overpay tax?",
    canIGetRefundAns: "Yes — if you pay too much (e.g., extra VAT input), request a refund. The app tracks overpayments and helps file claims (NTAA Sections 55–56).",

    doIWorryAboutTax: "Do I need to worry about tax avoidance rules?",
    doIWorryAboutTaxAns: "Yes — don't do fake transactions to reduce tax (artificial arrangements). The law prohibits it. The app warns you if something looks wrong (NTAA Sections 46–47: Prohibited tax avoidance).",

    howDoesLawHelp: "How does the new law help informal businesses like market sellers?",
    howDoesLawHelpAns: "It simplifies registration (TaxID), offers exemptions for small turnover, allows simple records/filing, and uses apps/technology to make compliance easy and cheap (NTAA overall objective + digital focus).",

    whatIfIMakeMistake: "What if I make a mistake in my return?",
    whatIfIMakeMistakeAns: "You can revise it if you object or find an error. The app lets you review before submitting and save drafts (NTAA Sections 41–42: Revision of assessment).",

    whereCanIGetHelp: "Where can I get more help with the new tax rules?",
    whereCanIGetHelpAns: "Use the app's education videos, FAQs, and guides (in English, Pidgin, Hausa, Yoruba, Igbo). You can also contact the National Revenue Service (NRS) or your state tax office. The app has quick links!",

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

    doINeed: "I need Tax Identification Number (TaxID) as small business owner?",
    doINeedAns: "Yes — everybody wey dey pay tax (including small businesses) must get TaxID. E free and easy to get with your NIN or business registration number. The app fit help you get am automatically (NTAA Sections 4–10).",

    whatIsACompany: 'Wetín be "small company" or "small business" under di new tax law?',
    whatIsACompanyAns: 'Small company usually mean say your business annual turnover (sales) no pass ₦100 million and your fixed assets (like equipment) no pass ₦250 million. Plenty small businesses fall under "small" and dem dey enjoy big tax relief (Nigeria Tax Act 2025, Section 56; NTAA definitions).',

    smallBusinessPay: 'Small businesses dey pay Company Income Tax (CIT)?',
    smallBusinessPayAns: 'No — if your annual turnover no pass ₦100 million (and your fixed assets no pass ₦250 million), you no go pay CIT at all (0%). Dis exemption help small traders, farmers, and freelancers keep more money take grow dia business (Nigeria Tax Act 2025, small company exemption).',

    whatAboutCGT: 'How Capital Gains Tax (CGT) and Development Levy take concern small businesses?',
    whatAboutCGTAns: 'Small companies wey dia turnover no pass ₦100 million no go pay CGT at all and dem no go pay di new 4% Development Levy. Dis one don replace old extra charges like education tax or IT levy (Nigeria Tax Act 2025).',

    doIPayVAT: 'I need charge and pay Value Added Tax (VAT)?',
    doIPayVATAns: 'If your annual turnover dey below certain level (normally around ₦25m–₦50m depending on di rule), you fit no need charge VAT or file VAT return. Check your turnover for di app make you know if you qualify (NTAA Sections 22–23; small business VAT relief).',

    whatIncomeIsTaxFree: 'Which income no get tax for individuals wey dey run small business?',
    whatIncomeIsTaxFreeAns: 'For personal income tax (PIT), di first ₦800,000 of your annual income no get tax at all. After dat, tax go start small-small (progressive rate). Plenty informal traders and freelancers dey pay small or no PIT (Nigeria Tax Act reforms).',

    doIKeepRecordsOfSales: 'I need keep record of my sales and expenses?',
    doIKeepRecordsOfSalesAns: 'Yes — di law say make you keep simple book of account (income and expenses). You fit use di app digital ledger — e don reach for most small businesses (NTAA Section 31: Books of account).',

    useMyPhoneToScan: 'I fit use my phone scan receipts instead of writing everything?',
    useMyPhoneToScanAns: 'Yes! Di app get OCR (you fit snap receipt with camera) to add expenses automatically. Dis one help you show proof of your records if dem need am (NTAA support use of technology — Section 71).',

    whatIsSimplifiedTaxReturn: 'Wetín be simplified tax return?',
    whatIsSimplifiedTaxReturnAns: 'For small businesses and individuals, dem get simple annual income tax return. Di app go auto-fill am from your ledger — no need for complex forms (NTAA Section 15: Simplified annual income tax return).',

    oftenFileTaxReturns: 'How often I suppose file tax returns?',
    oftenFileTaxReturnsAns: 'Most small businesses dey file once per year (annual return). Some fit need quarterly estimate if income dey change (like farmers). Di app go remind you of deadlines (NTAA Sections 11–15, 34).',

    smallBusinessFileVAT: 'Small businesses suppose file VAT returns?',
    smallBusinessFileVATAns: 'If you dey exempt (low turnover), no need. If you dey charge VAT, you go file monthly or quarterly. Di app dey help track input/output VAT and file am easy (NTAA Sections 22–23).',

    howDoIPayTax: 'How I go pay my taxes?',
    howDoIPayTaxAns: 'Pay online through di app using bank cards or mobile money (like Paystack). E dey safe and you go get receipt instantly. Make you pay on time make dem no charge you extra (NTAA Section 49: Payment of tax).',

    whatIsATCC: 'Wetín be Tax Clearance Certificate (TCC) and why I need am?',
whatIsATCCAns: 'TCC show say you no get any unpaid tax. You need am for contracts, loans, or big business deals. You fit request am inside di app after filing — e don be digital now (NTAA Section 72).',

whatHappensIfIPayLate: 'Wetín go happen if I file or pay late?',
whatHappensIfIPayLateAns: 'You fit pay penalty (like 10% of di tax + ₦25,000 for late filing) and interest (1.5% every month). Di app dey send reminders and dey calculate penalties make you fit avoid dem (NTAA Sections 65, 101).',

canIGetRefund: 'I fit get refund if I overpay tax?',
canIGetRefundAns: 'Yes — if you pay pass wetín you suppose pay (like extra VAT input), you fit request refund. Di app dey track overpayments and help you file claims (NTAA Sections 55–56).',

doIWorryAboutTax: 'I need worry about tax avoidance rules?',
doIWorryAboutTaxAns: 'Yes — no do fake transactions just to reduce tax (artificial arrangements). Di law no allow am. Di app go warn you if anything look wrong (NTAA Sections 46–47: Prohibited tax avoidance).',

howDoesLawHelp: 'How di new law dey help informal businesses like market sellers?',
howDoesLawHelpAns: 'E make registration easy (TaxID), give exemption for small turnover, allow simple record and filing, and use app/technology make compliance easy and cheap (NTAA main objective + digital focus).',

whatIfIMakeMistake: 'Wetín go happen if I make mistake for my return?',
whatIfIMakeMistakeAns: 'You fit revise am if you notice error or you object. Di app allow you review before submitting and save drafts (NTAA Sections 41–42: Revision of assessment).',

whereCanIGetHelp: 'Where I fit get more help about di new tax rules?',
whereCanIGetHelpAns: 'Use di app education videos, FAQs, and guides (for English, Pidgin, Hausa, Yoruba, and Igbo). You fit also contact National Revenue Service (NRS) or your state tax office. Di app get quick links!',

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

    doINeed: "Ina bukatar Lambar Shaidar Haraji (TaxID) a matsayina na mai karamin kasuwanci?",
    doINeedAns: "Eh — duk wanda ke biyan haraji (ciki har da kananan kasuwanci) dole ne ya samu TaxID. Kyauta ne kuma yana da saukin samu ta amfani da NIN ko lambar rajistar kasuwanci. Manhajar na iya taimakawa wajen samo ta kai tsaye (NTAA Sashe na 4–10).",

    whatIsACompany: 'Menene ake kira "karamin kamfani" ko "karamin kasuwanci" a karkashin sabbin dokokin haraji?',
    whatIsACompanyAns: 'Karamin kamfani yawanci yana nufin kasuwancin da kudin shigar sa na shekara (tallace-tallace) bai wuce ₦100 miliyan ba, kuma kadarorin dindindin (kamar kayan aiki) ba su wuce ₦250 miliyan ba. Yawancin kananan kasuwanci suna shiga wannan rukuni kuma suna samun manyan saukin haraji (Dokar Haraji ta Najeriya 2025, Sashe na 56; ma’anonin NTAA).',

    smallBusinessPay: 'Shin kananan kasuwanci suna biyan Harajin Shigar Kamfani (CIT)?',
    smallBusinessPayAns: 'A’a — idan kudin shigar ka na shekara bai wuce ₦100 miliyan ba (kuma kadarorin dindindin ba su wuce ₦250 miliyan ba), ba za ka biya CIT ba kwata-kwata (0%). Wannan rangwamen haraji na taimakawa kananan ’yan kasuwa, manoma, da masu aikin kansu su ajiye karin kudi domin bunkasa kasuwancinsu (Dokar Haraji ta Najeriya 2025, keɓancewar kananan kamfanoni).',

    whatAboutCGT: 'Me game da Harajin Ribacin Kadarori (CGT) da Harajin Ci Gaba ga kananan kasuwanci?',
    whatAboutCGTAns: 'Kananan kamfanoni da kudin shigar su na shekara bai wuce ₦100 miliyan ba suna da cikakken rangwame daga CGT da sabon harajin Ci Gaba na kashi 4%. Wannan ya maye gurbin tsoffin karin haraji kamar harajin ilimi ko harajin IT (Dokar Haraji ta Najeriya 2025).',

    doIPayVAT: 'Shin dole ne in caji kuma in biya Harajin Ƙarin Daraja (VAT)?',
    doIPayVATAns: 'Idan kudin shigar ka na shekara yana kasa da wani adadi na musamman (yawanci kusan ₦25m–₦50m gwargwadon ka’ida), kana iya samun rangwame daga caji ko gabatar da rahoton VAT. Duba kudin shigar ka a cikin manhaja don ganin ko ka cancanta (NTAA Sashe na 22–23; rangwamen VAT ga kananan kasuwanci).',

    whatIncomeIsTaxFree: 'Wane kudin shiga ne ba a biya haraji a kai ga mutanen da ke gudanar da kananan kasuwanci?',
    whatIncomeIsTaxFreeAns: 'A harajin kudin shiga na mutum (PIT), kudin shiga na farko har zuwa ₦800,000 a shekara ba a biya haraji a kai. Bayan haka, haraji yana farawa da ƙananan kaso-kaso (haraji mai hawa-hawa). Yawancin ’yan kasuwa na gargajiya da masu aikin kansu suna biyan haraji kaɗan ko ma ba sa biya (gyaran Dokar Haraji ta Najeriya).',

    doIKeepRecordsOfSales: 'Shin ina bukatar adana bayanan tallace-tallace da kashe-kashe?',
    doIKeepRecordsOfSalesAns: 'Eh — doka ta bukaci ka rika adana littafin asusu mai sauki (kudin shiga da kashewa). Za ka iya amfani da kundin dijital na manhaja — hakan ya isa ga yawancin kananan kasuwanci (NTAA Sashe na 31: Littafin asusu).',

    useMyPhoneToScan: 'Zan iya amfani da wayata wajen duba (scan) rasit maimakon rubuta komai?',
    useMyPhoneToScanAns: 'Eh! Manhajar tana da OCR (za ka iya daukar hoton rasit da kyamara) don shigar da kashe-kashe kai tsaye. Wannan yana taimakawa wajen tabbatar da bayananka idan an bukata (NTAA na goyon bayan amfani da fasaha — Sashe na 71).',

    whatIsSimplifiedTaxReturn: 'Menene sauƙaƙƙen rahoton haraji?',
    whatIsSimplifiedTaxReturnAns: 'Ga kananan kasuwanci da mutane, akwai sauƙaƙƙen rahoton harajin kudin shiga na shekara. Manhajar tana cikewa ta atomatik daga littafin asusunka — ba ka bukatar cika tsauraran fom (NTAA Sashe na 15: Sauƙaƙƙen rahoton harajin kudin shiga na shekara).',

    oftenFileTaxReturns: 'Sau nawa zan cika rahoton haraji?',
    oftenFileTaxReturnsAns: 'Yawancin kananan kasuwanci suna cika rahoto sau ɗaya a shekara (annual return). Wasu na iya buƙatar kimanta rahoto kowane kwata idan kudin shiga ya bambanta (misali manoma). Manhajar zata tunatar da kai lokutan ƙarshe (NTAA Sashe 11–15, 34).',

    smallBusinessFileVAT: 'Shin kananan kasuwanci suna bukatar cika rahoton VAT?',
    smallBusinessFileVATAns: 'Idan an rangwame (kudin shiga ƙasa), ba sai ba. Idan kana cajin VAT, za ka cika rahoto kowane wata ko kowane kwata. Manhajar na taimakawa wajen bin diddigin input/output VAT da cika rahoton cikin sauki (NTAA Sashe 22–23).',

    howDoIPayTax: 'Ta yaya zan biya harajina?',
    howDoIPayTaxAns: 'Biya ta yanar gizo ta manhaja ta amfani da katin banki ko mobile money (kamar Paystack). Yana da aminci kuma zaka samu rasit nan take. Biya akan lokaci don kauce wa karin kudade (NTAA Sashe na 49: Biyan haraji).',

    whatIsATCC: 'Menene Tax Clearance Certificate (TCC) kuma me yasa nake bukatarsa?',
whatIsATCCAns: 'TCC na nuna cewa ba ka da wani harajin da bai biya ba. Ana bukatarsa don kwangila, rance, ko manyan mu’amalolin kasuwanci. Za ka iya nema ta cikin manhaja bayan ka cika rahoto — yanzu dijital ne (NTAA Sashe na 72).',

whatHappensIfIPayLate: 'Me zai faru idan na cika rahoto ko na biya haraji a makare?',
whatHappensIfIPayLateAns: 'Za ka iya biyan tara (misali kashi 10% na haraji + ₦25,000 saboda jinkirin rahoto) da ribar kashi 1.5% kowane wata. Manhajar tana tunatar da kai kuma tana lissafa tarar domin ka kauce musu (NTAA Sashe na 65, 101).',

canIGetRefund: 'Zan iya samun mayar da kudi idan na biya haraji fiye da kima?',
canIGetRefundAns: 'Eh — idan ka biya fiye da abin da ya dace (misali karin VAT input), za ka iya neman mayar da kudin. Manhajar tana bin diddigin yawan biyan da aka yi kuma tana taimakawa wajen gabatar da bukata (NTAA Sashe na 55–56).',

doIWorryAboutTax: 'Shin ina bukatar damuwa game da dokokin kauce wa haraji?',
doIWorryAboutTaxAns: 'Eh — kada ka yi mu’amala ta ƙarya domin rage haraji (tsare-tsaren bogi). Doka ta haramta hakan. Manhajar zata gargade ka idan wani abu bai dace ba (NTAA Sashe na 46–47: Haramcin kauce wa haraji).',

howDoesLawHelp: 'Ta yaya sabon doka ke taimakawa kasuwancin gargajiya kamar masu sayarwa a kasuwa?',
howDoesLawHelpAns: 'Yana sauƙaƙa rajista (TaxID), yana bayar da rangwame ga ƙananan kudin shiga, yana ba da damar adana bayanai da cike rahoto cikin sauƙi, sannan yana amfani da manhajoji da fasaha don sauƙaƙa bin doka da rage tsada (babban manufar NTAA + mayar da hankali kan dijital).',

whatIfIMakeMistake: 'Me zai faru idan na yi kuskure a rahoton harajina?',
whatIfIMakeMistakeAns: 'Za ka iya gyara shi idan ka gano kuskure ko ka ƙi amincewa da shi. Manhajar tana ba ka damar dubawa kafin tura rahoto da adana daftarin aiki (NTAA Sashe na 41–42: Gyaran kimantawa).',

whereCanIGetHelp: 'A ina zan iya samun karin bayani ko taimako kan sabbin dokokin haraji?',
whereCanIGetHelpAns: 'Yi amfani da bidiyon koyarwa, FAQs, da jagororin manhaja (a Turanci, Pidgin, Hausa, Yoruba, da Igbo). Hakanan zaka iya tuntubar National Revenue Service (NRS) ko ofishin harajin jiharka. Manhajar tana da hanyoyin gaggawa!',

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

    doINeed: "Ṣe mo nilo Nọ́mbà Idanimọ Owo-ori (TaxID) gẹ́gẹ́ bí oníṣòwò kékeré?",
    doINeedAns: "Bẹ́ẹ̀ni — gbogbo ẹni tí ń san owó-ori (pẹ̀lú àwọn oníṣòwò kékeré) gbọ́dọ̀ ní TaxID. Ó jẹ́ ọfẹ́, ó sì rọrùn láti gba nípasẹ̀ NIN tàbí nọ́mbà ìforúkọsílẹ̀ ọjà rẹ. App yìí lè ràn ẹ́ lọ́wọ́ láti gba a laifọwọyi (NTAA Apá 4–10).",

    whatIsACompany: 'Kí ni a ń pè ní "ilé-iṣẹ́ kékeré" tàbí "ọjà kékeré" lábẹ́ òfin owó-ori tuntun?',
    whatIsACompanyAns: 'Ilé-iṣẹ́ kékeré maa n túmọ̀ sí pé owó tí ilé-iṣẹ́ ń rí lọ́dún kan (títà) kò ju ₦100 milionu lọ, àti pé ohun-ini tí kò yí padà (gẹ́gẹ́ bí irinṣẹ́) kò ju ₦250 milionu lọ. Ọ̀pọ̀ ilé-iṣẹ́ kékeré ń bá àlàyé yìí mu, wọ́n sì ń rí ànfààní ìdínkù owó-ori púpọ̀ (Òfin Owó-ori Naịjiríà 2025, Apá 56; àlàyé NTAA).',

    smallBusinessPay: 'Ṣe àwọn ọjà kékeré ń san Company Income Tax (CIT)?',
    smallBusinessPayAns: 'Rárá — bí owó tí o ń rí lọ́dún kan kò bá ju ₦100 milionu lọ (àti pé ohun-ini dídúró kò ju ₦250 milionu lọ), iwọ kò ní san CIT rárá (0%). Ànfààní yìí ń ràn àwọn oníṣòwò kékeré, agbẹ, àti àwọn freelancer lọ́wọ́ láti pa owó pọ̀ sí i kí wọ́n lè dàgbà (Òfin Owó-ori Naịjíríà 2025, ìyọkúrò owó-ori fún ilé-iṣẹ́ kékeré).',

    whatAboutCGT: 'Kí ni ipo Capital Gains Tax (CGT) àti Development Levy fún àwọn ilé-iṣẹ́ kékeré?',
    whatAboutCGTAns: 'Àwọn ilé-iṣẹ́ kékeré tí owó tí wọ́n ń rí lọ́dún kan kò ju ₦100 milionu lọ ni a ti yọ́ kúrò patapata nínú CGT àti Development Levy tuntun ti 4%. Èyí ti rọ́pò àwọn owó-ori míràn títẹ́lẹ̀ bí owó-ori ẹ̀kọ́ tàbí IT levy (Òfin Owó-ori Naịjíríà 2025).',

    doIPayVAT: 'Ṣe mo gbọ́dọ̀ gba àti san Value Added Tax (VAT)?',
    doIPayVATAns: 'Bí owó tí o ń rí lọ́dún kan bá wà ní isalẹ́ ìpele kan (nígbà púpọ̀ láàárín ₦25m–₦50m gẹ́gẹ́ bí òfin), o lè jẹ́ pé o kò ní gba VAT tàbí fi ìròyìn VAT ránṣẹ́. Ṣàyẹ̀wò owó tí o ń rí nínú app láti mọ bóyá o yẹ (NTAA Apá 22–23; ìdínkù VAT fún ilé-iṣẹ́ kékeré).',

    whatIncomeIsTaxFree: 'Owó wo ni kò san owó-ori fún ẹni tí ń ṣàkóso ọjà kékeré?',
    whatIncomeIsTaxFreeAns: 'Nínú personal income tax (PIT), owó àkọ́kọ́ tó dé ₦800,000 lọ́dún kan kò ní owó-ori rárá. Lẹ́yìn ìyẹn, owó-ori máa bẹ̀rẹ̀ ní oṣuwọn kékeré tí ń pọ̀ sí i díẹ̀ díẹ̀. Ọ̀pọ̀ oníṣòwò àìforúkọsílẹ̀ àti freelancers máa ń san PIT kékeré tàbí kò san rárá (àtúnṣe Òfin Owó-ori Naịjíríà).',

    doIKeepRecordsOfSales: 'Ṣe mo gbọ́dọ̀ pa ìkọ̀wé títà àti ináwó mọ́?',
    doIKeepRecordsOfSalesAns: 'Bẹ́ẹ̀ni — òfin béèrè pé kí o pa ìwé ìṣúná rọrùn (owó tí ń wọlé àti ináwó). O lè lo ledger oní-nọ́mbà inú app yìí — ó tó fún ọ̀pọ̀ ilé-iṣẹ́ kékeré (NTAA Apá 31: Ìwé ìṣúná).',

    useMyPhoneToScan: 'Ṣe mo lè lo foonu mi láti scan receipt dípò kí n kọ ohun gbogbo?',
    useMyPhoneToScanAns: 'Bẹ́ẹ̀ni! App yìí ní OCR (o lè ya fọ́tò receipt pẹ̀lú kamẹra) láti fi ináwó kun un laifọwọyi. Èyí ń ràn ẹ́ lọ́wọ́ láti fi ẹ̀rí hàn fún ìkọ̀wé rẹ bí ó bá jẹ́ dandan (NTAA ń ṣe ìtìlẹ́yìn fún lílo imọ̀-ẹrọ — Apá 71).',

    whatIsSimplifiedTaxReturn: 'Kí ni simplified tax return?',
    whatIsSimplifiedTaxReturnAns: 'Fún àwọn ilé-iṣẹ́ kékeré àti ẹni kọọkan, wà ní simplified annual income tax return. App yìí máa kún un fún ọ láti ledger rẹ laifọwọyi — kò sí ìní ìwé tí ó nira (NTAA Apá 15: Simplified annual income tax return).',

    oftenFileTaxReturns: 'Báwo ni mo ṣe máa ṣe file tax returns?',
    oftenFileTaxReturnsAns: 'Ọ̀pọ̀ ilé-iṣẹ́ kékeré máa ń file lẹ́ẹ̀kan ní ọdún kan (annual return). Diẹ̀ le ní láti ṣe àṣeyọrí mẹ́rin nínú ọdún bí owó tí wọ́n ń rí bá yá (gẹ́gẹ́ bí agbẹ). App yìí máa rántí ẹ nípa ìpẹ̀yà àwọn deadlines (NTAA Apá 11–15, 34).',

    smallBusinessFileVAT: 'Ṣe àwọn ilé-iṣẹ́ kékeré gbọ́dọ̀ file VAT returns?',
    smallBusinessFileVATAns: 'Bí wọ́n bá jẹ́ exempt (low turnover), kò sí ìdí. Bí o bá gba VAT, file lẹ́ẹ̀kan ní oṣù tàbí mẹ́rin nínú ọdún. App yìí ràn é lọ́wọ́ láti tọ́pa input/output VAT kí o sì file rọrùn (NTAA Apá 22–23).',

    howDoIPayTax: 'Báwo ni mo ṣe máa san owó-ori mi?',
    howDoIPayTaxAns: 'San online nípasẹ̀ app pẹ̀lú bank cards tàbí mobile money (gẹ́gẹ́ bí Paystack). Ó dájú, ó sì fun ọ ní receipt lẹ́sẹ̀kẹsẹ. San ní àkókò kí o má bà á jẹ́ owo míràn (NTAA Apá 49: Payment of tax).',

    whatIsATCC: 'Kí ni Tax Clearance Certificate (TCC) àti ìdí tí mo fi nílò rẹ?',
whatIsATCCAns: 'TCC ń fi hàn pé o kò ní owó-ori tí kò tíì san. A máa nílò rẹ fún contract, loan, tàbí ìdílé ìṣòwò ńlá. O lè béèrè rẹ nínú app lẹ́yìn tí o bá ti file — ó ti di dijital báyìí (NTAA Apá 72).',

whatHappensIfIPayLate: 'Kí ló máa ṣẹlẹ̀ bí mo bá file tàbí san owó-ori pẹ́?',
whatHappensIfIPayLateAns: 'O lè san penalty (bíi 10% ti owó-ori + ₦25,000 fún filing pẹ́) àti interest ti 1.5% lóṣù kọọkan. App yìí máa rántí ẹ nípa àkókò, ó sì máa ṣe ìṣírò penalty kí o lè yàgò fún un (NTAA Apá 65, 101).',

canIGetRefund: 'Ṣe mo lè gba refund bí mo bá san owó-ori ju bó ṣe yẹ lọ?',
canIGetRefundAns: 'Bẹ́ẹ̀ni — bí o bá san owó-ori ju iye tí o yẹ lọ (gẹ́gẹ́ bí VAT input tí ó pọ̀ ju), o lè béèrè refund. App yìí ń tọ́pa overpayments, ó sì ń ràn é lọ́wọ́ láti file ìbéèrè (NTAA Apá 55–56).',

doIWorryAboutTax: 'Ṣe mo gbọ́dọ̀ ṣọ́ra nípa àwọn òfin tax avoidance?',
doIWorryAboutTaxAns: 'Bẹ́ẹ̀ni — má ṣe ṣe ìṣòwò èké láti dín owó-ori kù (artificial arrangements). Òfin ti fi ẹ̀sùn kàn án. App yìí máa kilọ̀ fún ọ bí ohunkóhun bá dàbí pé kò tọ́ (NTAA Apá 46–47: Òfin ìdènà tax avoidance).',

howDoesLawHelp: 'Báwo ni òfin tuntun ṣe ń ràn àwọn ọjà informal bíi alátàjà ọjà lọ́wọ́?',
howDoesLawHelpAns: 'Ó ń jẹ́ kí ìforúkọsílẹ̀ rọrùn (TaxID), ń fún ní ìyọkúrò fún owó kékeré, ń jẹ́ kí ìkọ̀wé àti filing rọrùn, ó sì ń lo app àti imọ̀-ẹrọ láti jẹ́ kí ìfaradà òfin rọrùn tí kò sì gbowó (ìdí pàtàkì NTAA + ìdojukọ dijital).',

whatIfIMakeMistake: 'Kí ló máa ṣẹlẹ̀ bí mo bá ṣe aṣìṣe nínú tax return mi?',
whatIfIMakeMistakeAns: 'O lè tún un ṣe bí o bá rí aṣìṣe tàbí o bá fẹ́ kọ́ ọ́. App yìí jẹ́ kí o tún wo ohun gbogbo kí o tó submit, ó sì jẹ́ kí o pa drafts mọ́ (NTAA Apá 41–42: Àtúnṣe assessment).',

whereCanIGetHelp: 'Níbo ni mo ti lè rí ìrànlọ́wọ́ míràn nípa àwọn òfin owó-ori tuntun?',
whereCanIGetHelpAns: 'Lo àwọn fidio ẹ̀kọ́, FAQs, àti ìtọ́sọ́nà inú app (ní Gẹ̀ẹ́sì, Pidgin, Hausa, Yoruba, àti Igbo). O tún lè kan si National Revenue Service (NRS) tàbí ọ́fíìsì owó-ori ìpínlẹ̀ rẹ. App yìí ní quick links!',

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

    doINeed: "Achọrọ m Tax Identification Number (TaxID) dị ka onye nwe obere azụmahịa?",
    doINeedAns: "Ee — onye ọ bụla na-akwụ ụtụ isi (gụnyere obere azụmahịa) ga-enwerịrị TaxID. Ọ bụ n’efu ma dịkwa mfe inweta site na NIN ma ọ bụ ọnụọgụ ndebanye azụmahịa. Ngwa a nwere ike inyere gị aka inweta ya ozugbo (NTAA Nkebi 4–10).",

    whatIsACompany: 'Gịnị ka a na-akpọ "obere ụlọ ọrụ" ma ọ bụ "obere azụmahịa" n’okpuru iwu ụtụ isi ọhụrụ?',
    whatIsACompanyAns: 'Obere ụlọ ọrụ na-apụtakarị na azụmahịa nwere ngụkọta ego mbata kwa afọ (ahịa) nke na-erughị ma ọ bụ hà ₦100 nde, na akụrụngwa kwụsiri ike (dịka ngwá ọrụ) nke na-erughị ₦250 nde. Ọtụtụ obere azụmahịa na-adaba n’ime nke a ma na-enweta nnukwu mgbazinye ụtụ isi (Iwu Ụtụ Isi Naịjirịa 2025, Nkebi 56; nkọwa NTAA).',

    smallBusinessPay: 'Obere azụmahịa na-akwụ Company Income Tax (CIT)?',
    smallBusinessPayAns: 'Mba — ọ bụrụ na ngụkọta ego mbata gị kwa afọ erughị ma ọ bụ hà ₦100 nde (ma akụrụngwa kwụsiri ike erughị ₦250 nde), ị gaghị akwụ CIT (0%). Nnwere onwe ụtụ isi a na-enyere obere ndị ahịa, ndị ọrụ ugbo, na ndị na-arụ onwe ha aka idowe ego ka ha wee too azụmahịa ha (Iwu Ụtụ Isi Naịjirịa 2025, nkwekọrịta maka obere ụlọ ọrụ).',

    whatAboutCGT: 'Kedu maka Capital Gains Tax (CGT) na Development Levy maka obere azụmahịa?',
    whatAboutCGTAns: 'Ụlọ ọrụ nta nwere ngụkọta ego mbata kwa afọ nke na-erughị ma ọ bụ hà ₦100 nde enweela nnwere onwe zuru oke n’ịkwụ CGT na Development Levy ọhụrụ nke pasent 4%. Nke a dochiri ụtụ isi ndị ochie dị ka ụtụ agụmakwụkwọ ma ọ bụ IT levy (Iwu Ụtụ Isi Naịjirịa 2025).',

    doIPayVAT: 'Ò kwesị̀rị̀ m ịtinye ma kwụọ Value Added Tax (VAT)?',
    doIPayVATAns: 'Ọ bụrụ na ngụkọta ego mbata gị kwa afọ dị n’okpuru oke a kapịrị ọnụ (na-abụkarị ihe dị ka ₦25m–₦50m dabere na iwu), i nwere ike ghara itinye VAT ma ọ bụ zipu VAT return. Lelee ego mbata gị n’ime ngwa a iji mara ma ị tozuru etozu (NTAA Nkebi 22–23; enyemaka VAT maka obere azụmahịa).',

    whatIncomeIsTaxFree: 'Kedu ego mbata a na-atụghị ụtụ isi n’aka ndị na-arụ obere azụmahịa?',
    whatIncomeIsTaxFreeAns: 'Maka personal income tax (PIT), ego mbata mbụ ruru ₦800,000 kwa afọ anaghị ewere ụtụ isi. Mgbe nke ahụ gachara, a na-amalite ịtụ ụtụ isi n’ogo dị ala (usoro na-arị elu nwayọ nwayọ). Ọtụtụ ndị na-azụ ahịa n’ụzọ na-abụghị nke iwu na freelancers na-akwụ obere PIT ma ọ bụ ọbụna efu (mmezi Iwu Ụtụ Isi Naịjirịa).',

    doIKeepRecordsOfSales: 'Ò kwesị̀rị̀ m idobe ndekọ nke ire ahịa na mmefu ego?',
    doIKeepRecordsOfSalesAns: 'Ee — iwu chọrọ ka i debe akwụkwọ ndekọ dị mfe (ego mbata na mmefu ego). Ị nwere ike iji ledger dijital nke ngwa a — ọ zuru oke maka ọtụtụ obere azụmahịa (NTAA Nkebi 31: Akwụkwọ ndekọ ego).',

    useMyPhoneToScan: 'Enwere m ike iji ekwentị m mee scan rasit kama ide ihe niile?',
    useMyPhoneToScanAns: 'Ee! Ngwa a nwere OCR (ị nwere ike iji kamera were foto rasit) iji tinye mmefu ego ozugbo. Nke a na-enyere gị igosi na ndekọ gị ziri ezi ma ọ bụrụ na achọrọ ya (NTAA na-akwado iji teknụzụ — Nkebi 71).',

    whatIsSimplifiedTaxReturn: 'Gịnị bụ simplified tax return?',
    whatIsSimplifiedTaxReturnAns: 'Maka obere azụmahịa na ndị mmadụ, e nwere ndekọ ụtụ isi kwa afọ dị mfe. Ngwa a na-ejupụta ya ozugbo site na ledger gị — ọ dịghị mkpa maka akwụkwọ mgbagwoju anya (NTAA Nkebi 15: Simplified annual income tax return).',

    oftenFileTaxReturns: 'Kedu ugboro ka m kwesịrị iziga tax returns?',
    oftenFileTaxReturnsAns: 'Ụfọdụ obere azụmahịa na-eziga otu ugboro kwa afọ (annual return). Ụfọdụ nwere ike ịchọ ịtụle kwa ọnwa atọ ma ọ bụrụ na ego mbata na-agbanwe (dịka ndị ọrụ ugbo). Ngwa a na-echetara gị ụbọchị njedebe (NTAA Nkebi 11–15, 34).',

    smallBusinessFileVAT: 'Obere azụmahịa kwesịrị iziga VAT returns?',
    smallBusinessFileVATAns: 'Ọ bụrụ na e nyere gị nnwere onwe (low turnover), ọ dịghị mkpa. Ọ bụrụ na ị na-akwụ VAT, zipu kwa ọnwa ma ọ bụ kwa ọnwa atọ. Ngwa a na-enyere ịchịkwa input/output VAT ma zipu ya mfe (NTAA Nkebi 22–23).',

    howDoIPayTax: 'Kedu ka m ga-esi kwụọ ụtụ isi m?',
    howDoIPayTaxAns: 'Kwụọ online site na ngwa ahụ jiri kaadị bank ma ọ bụ mobile money (dịka Paystack). Ọ dị nchebe, ị ga-enweta receipt ozugbo. Kwụọ n’oge iji zere ụgwọ mgbakwunye (NTAA Nkebi 49: Payment of tax).',

    whatIsATCC: 'Gịnị bụ Tax Clearance Certificate (TCC) ma gịnị mere m ji chọọ ya?',
whatIsATCCAns: 'TCC na-egosi na ị nweghị ụtụ isi ọ bụla fọdụrụnụ. A na-achọ ya maka nkwekọrịta, mgbazinye ego, ma ọ bụ nnukwu azụmahịa. Ị nwere ike ịrịọ ya n’ime ngwa a mgbe ị gachara iziga tax returns — ọ bụ dijital ugbu a (NTAA Nkebi 72).',

whatHappensIfIPayLate: 'Gịnị ga-eme ma ọ bụrụ na m zipu ma ọ bụ kwụọ ụtụ isi n’oge gafere?',
whatHappensIfIPayLateAns: 'Ị nwere ike ịkwụ penalty (dịka pasent 10% nke ụtụ isi + ₦25,000 maka iziga n’oge gafere) yana interest nke pasent 1.5% kwa ọnwa. Ngwa a na-echetara gị oge ma na-agbakọ penalties ka i wee zere ha (NTAA Nkebi 65, 101).',

canIGetRefund: 'Enwere m ike inweta refund ma ọ bụrụ na m kwụọ ụtụ isi karịrị akarị?',
canIGetRefundAns: 'Ee — ọ bụrụ na ị kwụọ ihe karịrị ihe kwesịrị ekwesị (dịka VAT input karịrị akarị), ị nwere ike ịrịọ refund. Ngwa a na-enyocha overpayments ma na-enyere gị iziga arịrịọ (NTAA Nkebi 55–56).',

doIWorryAboutTax: 'Ò kwesị̀rị̀ m ichegbu onwe m gbasara iwu izere ụtụ isi?',
doIWorryAboutTaxAns: 'Ee — egbula ime azụmahịa ụgha iji belata ụtụ isi (nhazi ụgha). Iwu machibidoro ya. Ngwa a ga-adọ gị aka ná ntị ma ọ bụrụ na ihe ọ bụla yie ihe na-ezighi ezi (NTAA Nkebi 46–47: Izere ụtụ isi machibidoro).',

howDoesLawHelp: 'Kedu ka iwu ọhụrụ si enyere azụmahịa informal dịka ndị na-ere n’ahịa?',
howDoesLawHelpAns: 'Ọ na-eme ka ndebanye aha dị mfe (TaxID), na-enye nnwere onwe maka obere ego mbata, na-ekwe ka e debe ndekọ na iziga tax returns n’ụzọ dị mfe, ma na-eji ngwa na teknụzụ mee ka iso iwu dị mfe ma dịkwa ọnụ ala (ebumnuche ukwu NTAA + ilekwasị anya na dijital).',

whatIfIMakeMistake: 'Gịnị ga-eme ma ọ bụrụ na m mee njehie n’ime tax return m?',
whatIfIMakeMistakeAns: 'Ị nwere ike imezigharị ya ma ọ bụrụ na i chọpụta njehie ma ọ bụ kwupụta mmegide. Ngwa a na-enye gị ohere ilele ya tupu iziga ya ma chekwaa drafts (NTAA Nkebi 41–42: Ndozigharị assessment).',

whereCanIGetHelp: 'Ebee ka m nwere ike inweta enyemaka ọzọ gbasara iwu ụtụ isi ọhụrụ?',
whereCanIGetHelpAns: 'Jiri vidiyo agụmakwụkwọ, FAQs, na nduzi nke ngwa a (n’asụsụ Bekee, Pidgin, Hausa, Yoruba, na Igbo). Ị nwekwara ike ịkpọtụrụ National Revenue Service (NRS) ma ọ bụ ofis ụtụ isi steeti gị. Ngwa a nwere quick links!',

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

export function EducationModule( { language = 'english' }: EducationModuleProps ) {
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
    {
      id: 5,
      questionKey: 'doINeed',
      answerKey: 'doINeedAns',
      // sectionKey: 'doINeed'
    },
    {
      id: 6,
      questionKey: 'whatIsACompany',
      answerKey: 'whatIsACompanyAns',
      // sectionKey: 'doINeed'
    },
    {
      id: 7,
      questionKey: 'smallBusinessPay',
      answerKey: 'smallBusinessPayAns',
      // sectionKey: 'doINeed'
    },
    {
      id: 8,
      questionKey: 'whatAboutCGT',
      answerKey: 'whatAboutCGTAns',
      // sectionKey: 'doINeed'
    },
    {
      id: 9,
      questionKey: 'doIPayVAT',
      answerKey: 'doIPayVATAns',
      // sectionKey: 'doINeed'
    },
    {
      id: 10,
      questionKey: 'whatIncomeIsTaxFree',
      answerKey: 'whatIncomeIsTaxFreeAns',
      // sectionKey: 'doINeed'
    },
    {
      id: 11,
      questionKey: 'doIKeepRecordsOfSales',
      answerKey: 'doIKeepRecordsOfSalesAns',
      // sectionKey: 'doINeed'
    },
    {
      id: 12,
      questionKey: 'useMyPhoneToScan',
      answerKey: 'useMyPhoneToScanAns',
      // sectionKey: 'doINeed'
    },
    {
      id: 13,
      questionKey: 'whatIsSimplifiedTaxReturn',
      answerKey: 'whatIsSimplifiedTaxReturnAns',
      // sectionKey: 'doINeed'
    },
    {
      id: 14,
      questionKey: 'oftenFileTaxReturns',
      answerKey: 'oftenFileTaxReturnsAns',
      // sectionKey: 'doINeed'
    },
    {
      id: 15,
      questionKey: 'smallBusinessFileVAT',
      answerKey: 'smallBusinessFileVATAns',
      // sectionKey: 'doINeed'
    },
    {
      id: 16,
      questionKey: 'howDoIPayTax',
      answerKey: 'howDoIPayTaxAns',
      // sectionKey: 'doINeed'
    },
    {
      id: 17,
      questionKey: 'whatIsATCC',
      answerKey: 'whatIsATCCAns',
      // sectionKey: 'doINeed'
    },
    {
      id: 18,
      questionKey: 'whatHappensIfIPayLate',
      answerKey: 'whatHappensIfIPayLateAns',
      // sectionKey: 'doINeed'
    },
    {
      id: 19,
      questionKey: 'canIGetRefund',
      answerKey: 'canIGetRefundAns',
      // sectionKey: 'doINeed'
    },
    {
      id: 20,
      questionKey: 'doIWorryAboutTax',
      answerKey: 'doIWorryAboutTaxAns',
      // sectionKey: 'doINeed'
    },
    {
      id: 21,
      questionKey: 'howDoesLawHelp',
      answerKey: 'howDoesLawHelpAns',
      // sectionKey: 'doINeed'
    },
    {
      id: 22,
      questionKey: 'whatIfIMakeMistake',
      answerKey: 'whatIfIMakeMistakeAns',
      // sectionKey: 'doINeed'
    },
    {
      id: 23,
      questionKey: 'whereCanIGetHelp',
      answerKey: 'whereCanIGetHelpAns',
      // sectionKey: 'doINeed'
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

  // const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

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
            onClick={() => navigate('/dashboard')}
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
              className={`flex-1 py-2 px-4 rounded-lg text-sm transition-all flex items-center justify-center gap-2 ${activeTab === tab.id
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
