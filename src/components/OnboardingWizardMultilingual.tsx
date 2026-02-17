import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Check, 
  Loader2, 
  Shield,
  Crown,
  Sparkles,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { useState } from 'react';
import Logo from '@/assets/wazobiatax-logo.png'

interface OnboardingWizardProps {
  onComplete: () => void;
}

// Translation object for all languages
const translations = {
  english: {
    welcome: {
      title: 'Welcome! 👋',
      subtitle: 'Choose your preferred language to begin',
      proceed: 'Proceed'
    },
    authPath: {
      title: 'Get Started',
      subtitle: "Choose how you'd like to continue",
      google: 'Continue with Google',
      googleDesc: 'Quick and secure sign-in',
      register: 'Create New Account',
      registerDesc: 'Register with email',
      login: 'Login',
      loginDesc: 'Already have an account?'
    },
    login: {
      title: 'Welcome Back! 👋',
      subtitle: 'Login to your account',
      email: 'Email Address',
      emailPlaceholder: 'your.email@example.com',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      forgotPassword: 'Forgot password?',
      submit: 'Login',
      submitting: 'Logging in...'
    },
    register: {
      title: 'Create Account 🎉',
      subtitle: 'Fill in your details to register',
      fullName: 'Full Name',
      fullNamePlaceholder: 'Chukwuma Okafor',
      taxId: 'Tax ID from JRS',
      taxIdPlaceholder: 'Enter your Tax ID',
      taxIdHelp: "Don't know your Tax ID?",
      taxIdHelpText: 'to retrieve it using your NIN or business registration number.',
      taxIdPortal: 'JRS Tax ID Portal',
      businessName: 'Business Name (Optional)',
      businessNamePlaceholder: 'Bukka Restaurant',
      email: 'Email Address',
      emailPlaceholder: 'your.email@example.com',
      phone: 'Phone Number',
      phonePlaceholder: '08012345678',
      password: 'Password',
      passwordPlaceholder: 'Create a strong password',
      confirmPassword: 'Confirm Password',
      confirmPasswordPlaceholder: 'Re-enter your password',
      terms: 'By creating an account, you agree to our Terms of Service and Privacy Policy',
      submit: 'Create Account',
      submitting: 'Creating account...'
    },
    googleAuth: {
      title: 'Continue with Google',
      subtitle: 'Authorize WazobiaTax to access your account',
      willReceive: 'WazobiaTax will receive:',
      permission1: 'Your name and profile picture',
      permission2: 'Your email address',
      permission3: 'Basic account information',
      security: 'Your data is encrypted and secure. We never share your information.',
      submit: 'Authorize with Google',
      submitting: 'Authorizing...'
    },
    emailVerify: {
      title: 'Verify Your Email 📧',
      subtitle: "We've sent a 6-digit code to:",
      codeLabel: 'Enter Verification Code',
      didntReceive: "Didn't receive the code?",
      resend: 'Resend Code (30s)',
      submit: 'Verify Email',
      submitting: 'Verifying...',
      spamNotice: "Check your spam folder if you don't see the email within 2 minutes"
    },
    subscription: {
      title: 'Choose Your Plan 🎯',
      subtitle: 'Select a plan that fits your needs',
      basic: 'Basic',
      premium: 'Premium',
      freeForever: 'Free Forever',
      perMonth: 'per month',
      popular: 'Most Popular',
      basicFeatures: [
        'Unlimited ledger entries',
        'Basic tax calculations',
        'File up to 5 returns/year',
        'Email support',
        'Standard reports'
      ],
      premiumFeatures: [
        'Everything in Basic',
        'Unlimited tax returns',
        'Advanced analytics & insights',
        'Priority 24/7 support',
        'Bulk CSV uploads',
        'Custom report generation',
        'Tax optimization tips'
      ],
      startBasic: 'Start with Basic',
      startPremium: 'Start Premium Trial',
      notice: 'You can upgrade or downgrade your plan anytime from Settings'
    },
    payment: {
      title: 'Payment Details 💳',
      subtitle: 'Complete your subscription',
      planLabel: 'Premium Plan - Monthly',
      billingNote: 'Billed monthly, cancel anytime',
      cardNumber: 'Card Number',
      cardPlaceholder: '1234 5678 9012 3456',
      expiry: 'Expiry Date',
      expiryPlaceholder: 'MM/YY',
      cvv: 'CVV',
      cvvPlaceholder: '123',
      security: 'Secure payment via Paystack. Your card details are encrypted.',
      submit: 'Pay ₦500',
      submitting: 'Processing payment...',
      failed: 'Payment Failed',
      failedMessage: "We couldn't process your payment. Please check your card details and try again.",
      retry: 'Retry Payment',
      choosePlan: 'Choose Different Plan'
    },
    success: {
      title: 'Welcome to WazobiaTax! 🎉',
      subtitle: 'Your account is ready',
      allSet: "You're all set with:",
      verified: 'Verified email account',
      planActivated: 'plan activated',
      ready: 'Ready to manage your taxes',
      redirecting: 'Taking you to dashboard...'
    },
    common: {
      progress: 'Setup Progress',
      required: '*',
      visit: 'Visit the'
    }
  },
  pidgin: {
    welcome: {
      title: 'Welkom! 👋',
      subtitle: 'Choose di language wey you sabi well well',
      proceed: 'Make we continue'
    },
    authPath: {
      title: 'Make We Start',
      subtitle: 'Choose how you wan take continue',
      google: 'Use Google',
      googleDesc: 'Quick and safe way to enter',
      register: 'Open New Account',
      registerDesc: 'Register with email',
      login: 'Login',
      loginDesc: 'You don get account before?'
    },
    login: {
      title: 'You don come back! 👋',
      subtitle: 'Login for your account',
      email: 'Email Address',
      emailPlaceholder: 'your.email@example.com',
      password: 'Password',
      passwordPlaceholder: 'Put your password',
      forgotPassword: 'You forget password?',
      submit: 'Login',
      submitting: 'We dey login you...'
    },
    register: {
      title: 'Make New Account 🎉',
      subtitle: 'Fill your details make we register you',
      fullName: 'Your Full Name',
      fullNamePlaceholder: 'Chukwuma Okafor',
      taxId: 'Tax ID from JRS',
      taxIdPlaceholder: 'Put your Tax ID',
      taxIdHelp: 'You no sabi your Tax ID?',
      taxIdHelpText: 'to collect am with your NIN or business registration number.',
      taxIdPortal: 'JRS Tax ID Portal',
      businessName: 'Business Name (No be must)',
      businessNamePlaceholder: 'Bukka Restaurant',
      email: 'Email Address',
      emailPlaceholder: 'your.email@example.com',
      phone: 'Phone Number',
      phonePlaceholder: '08012345678',
      password: 'Password',
      passwordPlaceholder: 'Create strong password',
      confirmPassword: 'Confirm Password',
      confirmPasswordPlaceholder: 'Put the password again',
      terms: 'If you create account, e mean say you don agree to our Terms of Service and Privacy Policy',
      submit: 'Create Account',
      submitting: 'We dey create account...'
    },
    googleAuth: {
      title: 'Use Google',
      subtitle: 'Allow WazobiaTax to access your account',
      willReceive: 'WazobiaTax go collect:',
      permission1: 'Your name and picture',
      permission2: 'Your email address',
      permission3: 'Your basic account information',
      security: 'Your data dey safe. We no dey share your information.',
      submit: 'Allow with Google',
      submitting: 'We dey authorize...'
    },
    emailVerify: {
      title: 'Confirm Your Email 📧',
      subtitle: 'We don send 6-digit code to:',
      codeLabel: 'Put the Verification Code',
      didntReceive: 'You no see the code?',
      resend: 'Send Code Again (30s)',
      submit: 'Confirm Email',
      submitting: 'We dey verify...',
      spamNotice: 'Check your spam folder if you no see the email for 2 minutes'
    },
    subscription: {
      title: 'Choose Your Plan 🎯',
      subtitle: 'Choose plan wey go fit you',
      basic: 'Basic',
      premium: 'Premium',
      freeForever: 'Free Forever',
      perMonth: 'every month',
      popular: 'Plenty People Dey Use Am',
      basicFeatures: [
        'Unlimited ledger entries',
        'Basic tax calculations',
        'File up to 5 returns/year',
        'Email support',
        'Standard reports'
      ],
      premiumFeatures: [
        'Everything wey dey for Basic',
        'Unlimited tax returns',
        'Advanced analytics & insights',
        'Priority 24/7 support',
        'Bulk CSV uploads',
        'Custom report generation',
        'Tax optimization tips'
      ],
      startBasic: 'Start with Basic',
      startPremium: 'Start Premium Trial',
      notice: 'You fit change your plan anytime for Settings'
    },
    payment: {
      title: 'Payment Details 💳',
      subtitle: 'Complete your subscription',
      planLabel: 'Premium Plan - Monthly',
      billingNote: 'We go charge you every month, you fit cancel anytime',
      cardNumber: 'Card Number',
      cardPlaceholder: '1234 5678 9012 3456',
      expiry: 'Expiry Date',
      expiryPlaceholder: 'MM/YY',
      cvv: 'CVV',
      cvvPlaceholder: '123',
      security: 'Payment dey safe via Paystack. Your card details dey encrypted.',
      submit: 'Pay ₦500',
      submitting: 'We dey process payment...',
      failed: 'Payment No Work',
      failedMessage: 'We no fit process your payment. Check your card details and try again.',
      retry: 'Try Pay Again',
      choosePlan: 'Choose Another Plan'
    },
    success: {
      title: 'Welcome to WazobiaTax! 🎉',
      subtitle: 'Your account don ready',
      allSet: 'Everything don set with:',
      verified: 'Verified email account',
      planActivated: 'plan don activate',
      ready: 'Ready to manage your taxes',
      redirecting: 'We dey take you go dashboard...'
    },
    common: {
      progress: 'How Far We Don Reach',
      required: '*',
      visit: 'Go to'
    }
  },
  hausa: {
    welcome: {
      title: 'Barka da zuwa! 👋',
      subtitle: 'Zaɓi yaren da kake so',
      proceed: 'Ci gaba'
    },
    authPath: {
      title: 'Mun Fara',
      subtitle: 'Zaɓi yadda kake son ci gaba',
      google: 'Ci gaba da Google',
      googleDesc: 'Hanya mai sauri da aminci',
      register: 'Buɗe Sabon Asusu',
      registerDesc: 'Yi rajista da imel',
      login: 'Shiga',
      loginDesc: 'Kana da asusu tuni?'
    },
    login: {
      title: 'Maraba da dawowa! 👋',
      subtitle: 'Shiga cikin asusun ku',
      email: 'Adireshin Imel',
      emailPlaceholder: 'your.email@example.com',
      password: 'Kalmar Sirri',
      passwordPlaceholder: 'Shigar da kalmar sirri',
      forgotPassword: 'Ka manta da kalmar sirri?',
      submit: 'Shiga',
      submitting: 'Ana shiga...'
    },
    register: {
      title: 'Buɗe Asusu 🎉',
      subtitle: 'Cika bayananka don yin rajista',
      fullName: 'Cikakken Suna',
      fullNamePlaceholder: 'Chukwuma Okafor',
      taxId: 'Lambar Haraji daga JRS',
      taxIdPlaceholder: 'Shigar da lambar haraji',
      taxIdHelp: 'Ba ka san lambar haraji ba?',
      taxIdHelpText: 'don karɓa ta ta amfani da NIN ko lambar rajistar kasuwanci.',
      taxIdPortal: 'Tashar Lambar Haraji ta JRS',
      businessName: 'Sunan Kasuwanci (Ba dole ba)',
      businessNamePlaceholder: 'Bukka Restaurant',
      email: 'Adireshin Imel',
      emailPlaceholder: 'your.email@example.com',
      phone: 'Lambar Waya',
      phonePlaceholder: '08012345678',
      password: 'Kalmar Sirri',
      passwordPlaceholder: 'Ƙirƙiri kalmar sirri mai ƙarfi',
      confirmPassword: 'Tabbatar da Kalmar Sirri',
      confirmPasswordPlaceholder: 'Sake shigar da kalmar sirri',
      terms: 'Ta wurin ƙirƙirar asusu, kun yarda da Sharuɗɗan Sabis da Manufar Sirri',
      submit: 'Buɗe Asusu',
      submitting: 'Ana ƙirƙirar asusu...'
    },
    googleAuth: {
      title: 'Ci gaba da Google',
      subtitle: 'Ba da izini ga WazobiaTax don samun damar asusun ku',
      willReceive: 'WazobiaTax zai karɓi:',
      permission1: 'Sunan ku da hoton ku',
      permission2: 'Adireshin imel ɗinku',
      permission3: 'Asali bayanan asusu',
      security: 'Bayanan ku suna tsare. Ba ma raba bayanin ku.',
      submit: 'Ba da izini da Google',
      submitting: 'Ana ba da izini...'
    },
    emailVerify: {
      title: 'Tabbatar da Imel ɗinku 📧',
      subtitle: 'Mun aika lambar lamba 6 zuwa:',
      codeLabel: 'Shigar da Lambar Tabbatarwa',
      didntReceive: 'Ba ku karɓi lambar ba?',
      resend: 'Sake Aika Lambar (30s)',
      submit: 'Tabbatar da Imel',
      submitting: 'Ana tabbatarwa...',
      spamNotice: 'Duba babban fayil ɗinku idan ba ku ga imel ɗin cikin mintuna 2 ba'
    },
    subscription: {
      title: 'Zaɓi Tsarin Ku 🎯',
      subtitle: 'Zaɓi tsarin da ya dace da bukatun ku',
      basic: 'Basic',
      premium: 'Premium',
      freeForever: 'Kyauta Har Abada',
      perMonth: 'kowane wata',
      popular: 'Mafi Shahara',
      basicFeatures: [
        'Shigarwar lissafi mara iyaka',
        'Lissafin haraji na asali',
        'Shigar har zuwa maki 5/shekara',
        'Tallafin imel',
        'Rahotanni na yau da kullun'
      ],
      premiumFeatures: [
        'Duk abin da ke cikin Basic',
        'Maki haraji mara iyaka',
        'Nazari da bayanai na ci gaba',
        'Tallafi na 24/7 na farko',
        'Shigar da CSV da yawa',
        'Samar da rahoton al\'ada',
        'Shawarwarin inganta haraji'
      ],
      startBasic: 'Fara da Basic',
      startPremium: 'Fara Gwajin Premium',
      notice: 'Kuna iya canza tsarin ku kowane lokaci daga Saitunan'
    },
    payment: {
      title: 'Bayanan Biyan Kuɗi 💳',
      subtitle: 'Kammala biyan kuɗi',
      planLabel: 'Tsarin Premium - Kowane Wata',
      billingNote: 'Ana cajin kowane wata, kuna iya soke kowane lokaci',
      cardNumber: 'Lambar Katin',
      cardPlaceholder: '1234 5678 9012 3456',
      expiry: 'Ranar Ƙarewa',
      expiryPlaceholder: 'MM/YY',
      cvv: 'CVV',
      cvvPlaceholder: '123',
      security: 'Biyan kuɗi mai tsaro ta hanyar Paystack. Ana ɓoye bayanan katin ku.',
      submit: 'Biya ₦500',
      submitting: 'Ana aiwatar da biyan kuɗi...',
      failed: 'Biyan Kuɗi Ya Kasa',
      failedMessage: 'Ba mu iya aiwatar da biyan kuɗin ku ba. Da fatan za a duba bayanan katin ku kuma a sake gwadawa.',
      retry: 'Sake Biyan',
      choosePlan: 'Zaɓi Wani Tsari'
    },
    success: {
      title: 'Maraba zuwa WazobiaTax! 🎉',
      subtitle: 'Asusun ku a shirye yake',
      allSet: 'Kun shirya da:',
      verified: 'Asusun imel da aka tabbatar',
      planActivated: 'tsari an kunna',
      ready: 'Shirye don sarrafa haraji ku',
      redirecting: 'Ana kai ku zuwa dashboard...'
    },
    common: {
      progress: 'Ci gaban Saitawa',
      required: '*',
      visit: 'Ziyarci'
    }
  },
  yoruba: {
    welcome: {
      title: 'Ẹ káàbọ̀! 👋',
      subtitle: 'Yan èdè tí o fẹ́ràn jùlọ',
      proceed: 'Tẹ̀síwájú'
    },
    authPath: {
      title: 'Jẹ́ Ká Bẹ̀rẹ̀',
      subtitle: 'Yan bí o ṣe fẹ́ tẹ̀síwájú',
      google: 'Tẹ̀síwájú pẹ̀lú Google',
      googleDesc: 'Ọ̀nà tí ó yára tí ó sì ní ààbò',
      register: 'Ṣí Àkọọ́lẹ̀ Títun',
      registerDesc: 'Forúkọ sílẹ̀ pẹ̀lú ímeèlì',
      login: 'Wọlé',
      loginDesc: 'Ṣé o ní àkọọ́lẹ̀ tẹ́lẹ̀?'
    },
    login: {
      title: 'Ẹ káàbọ̀ padà! 👋',
      subtitle: 'Wọlé sí àkọọ́lẹ̀ rẹ',
      email: 'Àdírẹ́ẹ̀sì Ímeèlì',
      emailPlaceholder: 'your.email@example.com',
      password: 'Ọ̀rọ̀ Aṣínà',
      passwordPlaceholder: 'Tẹ ọ̀rọ̀ aṣínà rẹ sínú',
      forgotPassword: 'Ṣé o gbàgbé ọ̀rọ̀ aṣínà?',
      submit: 'Wọlé',
      submitting: 'Ń wọlé...'
    },
    register: {
      title: 'Ṣí Àkọọ́lẹ̀ 🎉',
      subtitle: 'Kún àlàyé rẹ láti forúkọ sílẹ̀',
      fullName: 'Orúkọ Kíkún',
      fullNamePlaceholder: 'Chukwuma Okafor',
      taxId: 'Nọ́mbà Owó-orí láti JRS',
      taxIdPlaceholder: 'Tẹ nọ́mbà owó-orí rẹ sínú',
      taxIdHelp: 'Ṣé o ò mọ nọ́mbà owó-orí rẹ?',
      taxIdHelpText: 'láti gbà á nípa lílo NIN tàbí nọ́mbà ìforúkọsílẹ̀ iṣẹ́ rẹ.',
      taxIdPortal: 'Ẹnu-ọ̀nà Nọ́mbà Owó-orí JRS',
      businessName: 'Orúkọ Iṣẹ́ (Kò pọn dandan)',
      businessNamePlaceholder: 'Bukka Restaurant',
      email: 'Àdírẹ́ẹ̀sì Ímeèlì',
      emailPlaceholder: 'your.email@example.com',
      phone: 'Nọ́mbà Fóònù',
      phonePlaceholder: '08012345678',
      password: 'Ọ̀rọ̀ Aṣínà',
      passwordPlaceholder: 'Ṣẹ̀dá ọ̀rọ̀ aṣínà tó lágbára',
      confirmPassword: 'Jẹ́rìí Ọ̀rọ̀ Aṣínà',
      confirmPasswordPlaceholder: 'Tún tẹ ọ̀rọ̀ aṣínà sínú',
      terms: 'Nípa ṣíṣẹ̀dá àkọọ́lẹ̀, o ti gba Àwọn Òfin Iṣẹ́ àti Ìlànà Àṣírí wa',
      submit: 'Ṣẹ̀dá Àkọọ́lẹ̀',
      submitting: 'Ń ṣẹ̀dá àkọọ́lẹ̀...'
    },
    googleAuth: {
      title: 'Tẹ̀síwájú pẹ̀lú Google',
      subtitle: 'Fún WazobiaTax ní àṣẹ láti wọlé sí àkọọ́lẹ̀ rẹ',
      willReceive: 'WazobiaTax yóò gbà:',
      permission1: 'Orúkọ àti àwòrán rẹ',
      permission2: 'Àdírẹ́ẹ̀sì ímeèlì rẹ',
      permission3: 'Àlàyé àkọọ́lẹ̀ ìpìlẹ̀',
      security: 'A ti pa dátà rẹ mọ́. A kò pín àlàyé rẹ.',
      submit: 'Fún ni Àṣẹ pẹ̀lú Google',
      submitting: 'Ń fún ni àṣẹ...'
    },
    emailVerify: {
      title: 'Jẹ́rìí Ímeèlì Rẹ 📧',
      subtitle: 'A ti fi kóòdù oníṣirò-mẹ́fà ránṣẹ́ sí:',
      codeLabel: 'Tẹ Kóòdù Ìjẹ́rìísí Sínú',
      didntReceive: 'Ṣé o ò rí kóòdù náà?',
      resend: 'Tún Fi Kóòdù Ránṣẹ́ (30s)',
      submit: 'Jẹ́rìí Ímeèlì',
      submitting: 'Ń jẹ́rìí...',
      spamNotice: 'Ṣàyẹ̀wò fódà spam rẹ tí o kò bá rí ímeèlì náà láàrin ìṣẹ́jú méjì'
    },
    subscription: {
      title: 'Yan Ètò Rẹ 🎯',
      subtitle: 'Yan ètò tó bá àwọn ìlò rẹ mu',
      basic: 'Ìpìlẹ̀',
      premium: 'Premium',
      freeForever: 'Ọ̀fẹ́ Títí Láé',
      perMonth: 'lóṣooṣù',
      popular: 'Ọlọ́gbọ́n Jùlọ',
      basicFeatures: [
        'Àwọn ìkọsílẹ̀ àìníye',
        'Àwọn ìṣirò owó-orí ìpìlẹ̀',
        'Fi títí tó 5 ìdápadà/ọdún',
        'Ìrànlọ́wọ́ ímeèlì',
        'Àwọn ìròyìn déédéé'
      ],
      premiumFeatures: [
        'Gbogbo ohun tó wà ní Ìpìlẹ̀',
        'Àwọn ìdápadà owó-orí àìníye',
        'Àwọn ìtúpalẹ̀ & ìmọ̀ tó ga jùlọ',
        'Ìrànlọ́wọ́ 24/7 àkọ́kọ́',
        'Àwọn ìgbésókè CSV púpọ̀',
        'Ìṣẹ̀dá ìròyìn aláyàn',
        'Àwọn ìmọ̀ràn ìmúdára owó-orí'
      ],
      startBasic: 'Bẹ̀rẹ̀ pẹ̀lú Ìpìlẹ̀',
      startPremium: 'Bẹ̀rẹ̀ Ìdánwò Premium',
      notice: 'O lè ṣe àyípadà ètò rẹ nígbàkígbà láti Ààtò'
    },
    payment: {
      title: 'Àlàyé Ìsanwó 💳',
      subtitle: 'Parí ìforúkọsílẹ̀ rẹ',
      planLabel: 'Ètò Premium - Oṣooṣù',
      billingNote: 'A máa gba owó lóṣooṣù, o lè pa á rẹ́ nígbàkígbà',
      cardNumber: 'Nọ́mbà Káàdì',
      cardPlaceholder: '1234 5678 9012 3456',
      expiry: 'Ọjọ́ Ìpári',
      expiryPlaceholder: 'MM/YY',
      cvv: 'CVV',
      cvvPlaceholder: '123',
      security: 'Ìsanwó tó ní ààbò nípa Paystack. A ti pa àlàyé káàdì rẹ mọ́.',
      submit: 'San ₦500',
      submitting: 'Ń ṣe ìsanwó...',
      failed: 'Ìsanwó Kùnà',
      failedMessage: 'A kò lè ṣe ìsanwó rẹ. Jọ̀wọ́ ṣàyẹ̀wò àlàyé káàdì rẹ kí o sì gbìyànjú lẹ́ẹ̀kan síi.',
      retry: 'Gbìyànjú Ìsanwó Lẹ́ẹ̀kan Síi',
      choosePlan: 'Yan Ètò Mìíràn'
    },
    success: {
      title: 'Ẹ káàbọ̀ sí WazobiaTax! 🎉',
      subtitle: 'Àkọọ́lẹ̀ rẹ ti ṣetán',
      allSet: 'O ti ṣetán pẹ̀lú:',
      verified: 'Àkọọ́lẹ̀ ímeèlì tí a ti jẹ́rìí',
      planActivated: 'ètò ti múṣiṣẹ́',
      ready: 'Ṣetán láti ṣàkóso àwọn owó-orí rẹ',
      redirecting: 'Ń mú ọ lọ sí dashboard...'
    },
    common: {
      progress: 'Ìlọsíwájú Ààtò',
      required: '*',
      visit: 'Ṣàbẹ̀wò sí'
    }
  },
  igbo: {
    welcome: {
      title: 'Nnọọ! 👋',
      subtitle: 'Họrọ asụsụ ị chọrọ',
      proceed: 'Gaa n\'ihu'
    },
    authPath: {
      title: 'Ka Malite',
      subtitle: 'Họrọ otú ị chọrọ iji gaa n\'ihu',
      google: 'Jiri Google gaa n\'ihu',
      googleDesc: 'Ụzọ dị ngwa na nchekwa',
      register: 'Mepee Akaụntụ Ọhụrụ',
      registerDesc: 'Debanye aha na email',
      login: 'Banye',
      loginDesc: 'Ị nwere akaụntụ?'
    },
    login: {
      title: 'Nnọọ ọzọ! 👋',
      subtitle: 'Banye na akaụntụ gị',
      email: 'Adreesị Email',
      emailPlaceholder: 'your.email@example.com',
      password: 'Okwuntughe',
      passwordPlaceholder: 'Tinye okwuntughe gị',
      forgotPassword: 'Ị chefuru okwuntughe?',
      submit: 'Banye',
      submitting: 'Na-abanye...'
    },
    register: {
      title: 'Mepee Akaụntụ 🎉',
      subtitle: 'Dejupụta nkọwa gị iji debanye aha',
      fullName: 'Aha Zuru Ezu',
      fullNamePlaceholder: 'Chukwuma Okafor',
      taxId: 'Nọmba Ụtụ Isi si JRS',
      taxIdPlaceholder: 'Tinye nọmba ụtụ isi gị',
      taxIdHelp: 'Ị maghị nọmba ụtụ isi gị?',
      taxIdHelpText: 'iji nweta ya site na iji NIN gị ma ọ bụ nọmba ndebanye aha azụmahịa gị.',
      taxIdPortal: 'Ọnụ Ụzọ Nọmba Ụtụ Isi JRS',
      businessName: 'Aha Azụmahịa (Ọ dịghị mkpa)',
      businessNamePlaceholder: 'Bukka Restaurant',
      email: 'Adreesị Email',
      emailPlaceholder: 'your.email@example.com',
      phone: 'Nọmba Ekwentị',
      phonePlaceholder: '08012345678',
      password: 'Okwuntughe',
      passwordPlaceholder: 'Mepụta okwuntughe siri ike',
      confirmPassword: 'Kwado Okwuntughe',
      confirmPasswordPlaceholder: 'Tinye okwuntughe ọzọ',
      terms: 'Site n\'ịmepụta akaụntụ, ị kwadoro Usoro Ọrụ na Iwu Nzuzo anyị',
      submit: 'Mepee Akaụntụ',
      submitting: 'Na-emepụta akaụntụ...'
    },
    googleAuth: {
      title: 'Jiri Google gaa n\'ihu',
      subtitle: 'Nye WazobiaTax ikike ịbanye na akaụntụ gị',
      willReceive: 'WazobiaTax ga-anata:',
      permission1: 'Aha na foto gị',
      permission2: 'Adreesị email gị',
      permission3: 'Ozi akaụntụ bụ isi',
      security: 'Edebere data gị. Anyị anaghị ekerịta ozi gị.',
      submit: 'Nye Ikike na Google',
      submitting: 'Na-enye ikike...'
    },
    emailVerify: {
      title: 'Kwado Email Gị 📧',
      subtitle: 'Anyị ezigaala koodu nke nwere mkpụrụ 6 na:',
      codeLabel: 'Tinye Koodu Nkwado',
      didntReceive: 'Ị nwetaghị koodu ahụ?',
      resend: 'Ziga Koodu Ọzọ (30s)',
      submit: 'Kwado Email',
      submitting: 'Na-akwado...',
      spamNotice: 'Lelee fọda spam gị ma ọ bụrụ na ị hụghị email ahụ n\'ime nkeji 2'
    },
    subscription: {
      title: 'Họrọ Atụmatụ Gị 🎯',
      subtitle: 'Họrọ atụmatụ dabara na mkpa gị',
      basic: 'Isi',
      premium: 'Premium',
      freeForever: 'N\'efu Ruo Mgbe Ebighị Ebi',
      perMonth: 'kwa ọnwa',
      popular: 'Kacha Ewu Ewu',
      basicFeatures: [
        'Ndenye akwụkwọ ndekọ na-enweghị njedebe',
        'Ngụkọ ụtụ isi bụ isi',
        'Tinye ihe ruru 5 nlọghachi/afọ',
        'Nkwado email',
        'Akụkọ ọkọlọtọ'
      ],
      premiumFeatures: [
        'Ihe niile dị na Isi',
        'Nlọghachi ụtụ isi na-enweghị njedebe',
        'Nyocha na nghọta dị elu',
        'Nkwado 24/7 nke mbụ',
        'Mbulite CSV ọtụtụ',
        'Mmepụta akụkọ ahaziri',
        'Ndụmọdụ njikarịcha ụtụ isi'
      ],
      startBasic: 'Malite na Isi',
      startPremium: 'Malite Nnwale Premium',
      notice: 'Ị nwere ike ịgbanwe atụmatụ gị mgbe ọ bụla site na Ntọala'
    },
    payment: {
      title: 'Nkọwa Ịkwụ Ụgwọ 💳',
      subtitle: 'Mechaa ndebanye aha gị',
      planLabel: 'Atụmatụ Premium - Kwa Ọnwa',
      billingNote: 'A na-akwụ ụgwọ kwa ọnwa, ị nwere ike ịkagbu mgbe ọ bụla',
      cardNumber: 'Nọmba Kaadị',
      cardPlaceholder: '1234 5678 9012 3456',
      expiry: 'Ụbọchị Njedebe',
      expiryPlaceholder: 'MM/YY',
      cvv: 'CVV',
      cvvPlaceholder: '123',
      security: 'Ịkwụ ụgwọ nchekwa site na Paystack. Edebere nkọwa kaadị gị.',
      submit: 'Kwụọ ₦500',
      submitting: 'Na-ahazi ịkwụ ụgwọ...',
      failed: 'Ịkwụ Ụgwọ Emezughị',
      failedMessage: 'Anyị enweghị ike ịhazi ịkwụ ụgwọ gị. Biko lelee nkọwa kaadị gị wee nwaa ọzọ.',
      retry: 'Nwaa Ịkwụ Ụgwọ Ọzọ',
      choosePlan: 'Họrọ Atụmatụ Ọzọ'
    },
    success: {
      title: 'Nnọọ na WazobiaTax! 🎉',
      subtitle: 'Akaụntụ gị dị njikere',
      allSet: 'Idozi ihe niile na:',
      verified: 'Akaụntụ email ekwadoro',
      planActivated: 'atụmatụ arụnyere',
      ready: 'Njikere ijikwa ụtụ isi gị',
      redirecting: 'Na-ebuga gị na dashboard...'
    },
    common: {
      progress: 'Ọganihu Ntọala',
      required: '*',
      visit: 'Gaa na'
    }
  }
};

type LanguageKey = keyof typeof translations;

export function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState('language');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageKey>('english');
  const [authType, setAuthType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [paymentError, setPaymentError] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    taxId: '',
    businessName: '',
    phone: '',
  });

  const languages = [
    { id: 'english' as LanguageKey, name: 'English', flag: '🇬🇧', nativeName: 'English' },
    { id: 'pidgin' as LanguageKey, name: 'Pidgin', flag: '🇳🇬', nativeName: 'Nigerian Pidgin' },
    { id: 'hausa' as LanguageKey, name: 'Hausa', flag: '🇳🇬', nativeName: 'Hausa' },
    { id: 'yoruba' as LanguageKey, name: 'Yoruba', flag: '🇳🇬', nativeName: 'Yorùbá' },
    { id: 'igbo' as LanguageKey, name: 'Igbo', flag: '🇳🇬', nativeName: 'Igbo' },
  ];

  const plans = [
    {
      id: 'basic',
      name: translations[selectedLanguage].subscription.basic,
      price: 0,
      period: translations[selectedLanguage].subscription.freeForever,
      badge: 'gray',
      features: translations[selectedLanguage].subscription.basicFeatures
    },
    {
      id: 'premium',
      name: translations[selectedLanguage].subscription.premium,
      price: 500,
      period: translations[selectedLanguage].subscription.perMonth,
      badge: 'gold',
      popular: true,
      features: translations[selectedLanguage].subscription.premiumFeatures
    }
  ];

  // Get current translation
  const t = translations[selectedLanguage];

  // Handler functions
  const handleLanguageSelect = (langId: LanguageKey) => {
    setSelectedLanguage(langId);
  };

  const handleLanguageProceed = () => {
    if (selectedLanguage) {
      setCurrentStep('authPath');
    }
  };

  const handleAuthPathSelect = (type: string) => {
    setAuthType(type);
    if (type === 'login') {
      setCurrentStep('login');
    } else if (type === 'register') {
      setCurrentStep('register');
    } else if (type === 'google') {
      setCurrentStep('googleAuth');
    }
  };

  const handleLogin = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep('subscription');
    }, 2000);
  };

  const handleRegister = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep('emailVerify');
    }, 2000);
  };

  const handleGoogleAuth = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep('subscription');
    }, 2000);
  };

  const handleVerifyEmail = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep('subscription');
    }, 2000);
  };

  const handleResendCode = () => {
    // Resend verification code logic
  };

  const handleSubscriptionSelect = (planId: string) => {
    setSelectedPlan(planId);
    if (planId === 'basic') {
      setCurrentStep('success');
    } else {
      setCurrentStep('payment');
    }
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setPaymentError(false);
    setTimeout(() => {
      setIsProcessing(false);
      if (Math.random() > 0.2) {
        setCurrentStep('success');
      } else {
        setPaymentError(true);
      }
    }, 2500);
  };

  const handleRetryPayment = () => {
    setPaymentError(false);
    handlePayment();
  };

  const handleComplete = () => {
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  const getProgressPercentage = () => {
    const steps = ['language', 'authPath', authType, 'emailVerify', 'subscription', 'payment', 'success'];
    const currentIndex = steps.indexOf(currentStep);
    return Math.round((currentIndex / (steps.length - 1)) * 100);
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

      {/* Header with Logo */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-4 flex items-center justify-between">
        {currentStep !== 'language' && currentStep !== 'authPath' && (
          <button 
            onClick={() => {
              if (currentStep === 'login' || currentStep === 'register' || currentStep === 'googleAuth') {
                setCurrentStep('authPath');
              } else if (currentStep === 'emailVerify') {
                setCurrentStep('register');
              } else if (currentStep === 'subscription') {
                setCurrentStep('emailVerify');
              } else if (currentStep === 'payment') {
                setCurrentStep('subscription');
              }
            }}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
        )}
        <div className="flex items-center justify-center gap-2">
          <div className="flex justify-center items-center">
            <img src={Logo} alt="logo" className='h-8 pointer-events-none select-none' />
          </div>
        </div>
        <div className="w-10" />
      </div>

      {/* Progress Bar */}
      {currentStep !== 'language' && currentStep !== 'success' && (
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600">{t.common.progress}</span>
            <span className="text-xs text-emerald-600">{getProgressPercentage()}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${getProgressPercentage()}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
            />
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {/* Step 1: Language Selection */}
          {currentStep === 'language' && (
            <motion.div
              key="language"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 space-y-6"
            >
              <div className="text-center py-4">
                <h1 className="text-2xl mb-2">{t.welcome.title}</h1>
                <p className="text-gray-600">{t.welcome.subtitle}</p>
              </div>

              <div className="space-y-3">
                {languages.map((lang, index) => (
                  <motion.button
                    key={lang.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLanguageSelect(lang.id)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 ${
                      selectedLanguage === lang.id
                        ? 'border-emerald-600 bg-emerald-50 shadow-lg scale-105'
                        : 'border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{lang.flag}</span>
                        <div className="text-left">
                          <p className="text-lg">{lang.name}</p>
                          <p className="text-sm text-gray-600">{lang.nativeName}</p>
                        </div>
                      </div>
                      {selectedLanguage === lang.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center"
                        >
                          <Check className="w-5 h-5 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              <button
                onClick={handleLanguageProceed}
                disabled={!selectedLanguage}
                className={`w-full py-4 rounded-xl transition-all duration-300 ${
                  selectedLanguage
                    ? 'bg-emerald-600 text-white shadow-lg hover:bg-emerald-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {t.welcome.proceed}
              </button>
            </motion.div>
          )}

          {/* Remaining steps will be in the next part due to character limit */}
        </AnimatePresence>
      </div>
    </div>
  );
}
