import { motion } from 'motion/react';
import {
  User,
  Copy,
  ChevronRight,
  Globe,
  Bell,
  Shield,
  FileText,
  LogOut,
  Crown,
  Sparkles,
  Calendar
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from 'react-router-dom';
import { getUser, logout } from '@/utils/storage';
import { getUserProfile } from '../services/auth';
import { getUserSubscription, UserSubscriptionResponse } from '../services/subscriptions';
import { profileTranslations, type LanguageKey } from '../translations/profile';

interface ProfileProps {
  language?: LanguageKey;
}

type MenuItem = {
  id: string;
  labelKey: string;
  icon: any;
  screen: string;
  highlight?: boolean;
  premium?: boolean;
};

const translations = {
  english: {
    account: "Account",
    taxServices: "Tax Services",
    settings: "Settings",

    personalInformation: "Personal Information",
    languageAndVoice: "Language & Voice",
    notifications: "Notifications",

    requestTaxClearance: "Request Tax Clearance",
    taxEducation: "Tax Education",

    upgradeToPremium: "Upgrade to Premium",
    securityAndPrivacy: "Security & Privacy",

    profile: "Profile",
    basicPlan: "Basic Plan",
    premium: "Premium",
    taxIdentificationNumber: "Tax Identification Number",
    copied: "Copied!",
    logOut: "Log Out",
  },

  pidgin: {
    account: "Account",
    taxServices: "Tax Services",
    settings: "Settings",

    personalInformation: "Personal Information",
    languageAndVoice: "Language & Voice",
    notifications: "Notifications",

    requestTaxClearance: "Request Tax Clearance",
    taxEducation: "Tax Education",

    upgradeToPremium: "Upgrade to Premium",
    securityAndPrivacy: "Security & Privacy",

    profile: "Profile",
    basicPlan: "Basic Plan",
    premium: "Premium",
    taxIdentificationNumber: "Tax Identification Number",
    copied: "Copied!",
    logOut: "Log Out",
  },

  hausa: {
    account: "Asusu",
    taxServices: "Ayyukan Haraji",
    settings: "Saituna",

    personalInformation: "Bayanan Kai",
    languageAndVoice: "Harshe & Murya",
    notifications: "Sanarwa",

    requestTaxClearance: "Nemi Takardar Haraji",
    taxEducation: "Ilimin Haraji",

    upgradeToPremium: "Haɓaka zuwa Premium",
    securityAndPrivacy: "Tsaro & Sirri",

    profile: "Bayanin Asusu",
    basicPlan: "Tsarin Asali",
    premium: "Premium",
    taxIdentificationNumber: "Lambar Shaidar Haraji",
    copied: "An Kwafa!",
    logOut: "Fita",
  },

  yoruba: {
    account: "Akọọlẹ",
    taxServices: "Awọn Iṣẹ́ Owo-ori",
    settings: "Àtúnṣe",

    personalInformation: "Alaye Ara ẹni",
    languageAndVoice: "Èdè & Ohùn",
    notifications: "Ìkìlọ̀",

    requestTaxClearance: "Bẹ̀rẹ̀ Ìtúsílẹ̀ Owo-ori",
    taxEducation: "Ẹ̀kọ́ Owo-ori",

    upgradeToPremium: "Gbe Soke sí Premium",
    securityAndPrivacy: "Ààbò & Aṣírí",

    profile: "Profaili",
    basicPlan: "Eto Ipilẹ̀",
    premium: "Premium",
    taxIdentificationNumber: "Nọ́mbà Idanimọ Owo-ori",
    copied: "Ti Daakọ!",
    logOut: "Jáde",
  },

  igbo: {
    account: "Akaụntụ",
    taxServices: "Ọrụ Ụtụ Isi",
    settings: "Ntọala",

    personalInformation: "Ozi Onwe",
    languageAndVoice: "Asụsụ & Olu",
    notifications: "Ọkwa",

    requestTaxClearance: "Rịọ Asambodo Ụtụ Isi",
    taxEducation: "Mmụta Ụtụ Isi",

    upgradeToPremium: "Bulie gaa Premium",
    securityAndPrivacy: "Nchedo & Nzuzo",

    profile: "Profaịlụ",
    basicPlan: "Atụmatụ Nkịtị",
    premium: "Premium",
    taxIdentificationNumber: "Nọmba NJirimara Ụtụ Isi",
    copied: "Edekọtara!",
    logOut: "Pụọ",
  },
};

type Subscription = 'basic' | 'premium' | 'trial';

export function Profile({ language = 'english' }: ProfileProps) {
  const [copied, setCopied] = useState(false);
  const tin = '123456789-0001';

  // const { language } = useLanguage();
  const t = translations[language];
  const sub = profileTranslations[language].subscription;
  const navigate = useNavigate();
  const user = getUser();
  const [currentUser, setCurrentUser] = useState(null);
  const [userSubscription, setUserSubscription] = useState<UserSubscriptionResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  // Subscription data
  const subscriptionStatus = userSubscription?.plan?.name?.toLowerCase().includes('premium') ? 'premium' :
    userSubscription?.trial?.is_trial ? 'trial' : 'basic';

  const subscriptionLabels: Record<Subscription, string> = {
    basic: 'Basic',
    premium: 'Premium',
    trial: 'Free Trial',
  };

  const subscriptionType = subscriptionLabels[subscriptionStatus];

  const subscriptionRenewalDate = 'March 15, 2026';
  const subscriptionExpiryDate = 'March 10, 2026'; // For trial

  const isTrial = subscriptionStatus === 'trial';

  const handleCopyTIN = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const menuSections: { titleKey: string; items: MenuItem[] }[] = [
    {
      titleKey: 'account',
      items: [
        { id: 'personal', labelKey: 'personalInformation', icon: User, screen: '/personal-information' },
        { id: 'language', labelKey: 'languageAndVoice', icon: Globe, screen: '/language-and-voice' },
        { id: 'notifications', labelKey: 'notifications', icon: Bell, screen: '/notifications' },
      ],
    },
    {
      titleKey: 'taxServices',
      items: [
        {
          id: 'clearance',
          labelKey: 'requestTaxClearance',
          icon: FileText,
          screen: '/tax-clearance',
          highlight: true,
        },
        {
          id: 'education',
          labelKey: 'taxEducation',
          icon: Sparkles,
          screen: '/education',
        },
      ],
    },
    {
      titleKey: 'settings',
      items: [
        {
          id: 'subscription',
          labelKey: 'upgradeToPremium',
          icon: Crown,
          screen: '/subscriptions',
          premium: true,
        },
        {
          id: 'security',
          labelKey: 'securityAndPrivacy',
          icon: Shield,
          screen: '/security-and-privacy',
        },
      ],
    },
  ];

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [profileRes, subRes] = await Promise.all([
          getUserProfile(),
          getUserSubscription()
        ]);

        if (isMounted) {
          setCurrentUser(profileRes.data);
          setUserSubscription(subRes);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError('Unable to load profile. Please try again.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center my-auto justify-center h-40 gap-3">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
        <p className="text-sm text-gray-500">Loading your profile…</p>
      </div>
    );

  if (error)
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="flex max-w-sm flex-col items-center gap-3 rounded-xl border border-red-100 bg-red-50 px-6 py-5 text-center">
          <p className="text-sm font-medium text-red-600">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-xs font-semibold text-red-700 hover:underline"
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Status Bar */}
      <div className="h-11 bg-emerald-600 flex items-center justify-between px-6 text-white text-sm">

      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 px-6 pt-6 pb-20">
        <h1 className="text-white text-lg mb-6">{translations[language].profile}</h1>

        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center">
            <User className="w-10 h-10 text-emerald-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-white text-xl mb-1">
              {user
                ? `${user.first_name} ${user.last_name}`
                : `${currentUser?.first_name} ${currentUser?.last_name}`}
            </h2>            <p className="text-emerald-100 text-sm">{user?.business_name || currentUser?.business_name}</p>

            {/* Subscription Badge */}
            <div className="mt-2">
              {subscriptionStatus === 'premium' ? (
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full text-xs">
                  <Crown className="w-3 h-3" />
                  {translations[language].premium}
                </div>
              ) : subscriptionStatus === 'trial' ? (
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                  {translations[language].basicPlan} (Trial)
                </div>
              ) : (
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 text-white rounded-full text-xs">
                  {translations[language].basicPlan}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* TIN Card - Overlapping */}
      <div className="px-6 -mt-12 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">{translations[language].taxIdentificationNumber}</p>
              <p className="text-lg tracking-wider">{tin}</p>
            </div>
            <button
              onClick={handleCopyTIN}
              className="p-3 hover:bg-gray-50 rounded-lg transition-all"
            >
              {copied ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-emerald-600 text-sm"
                >
                  {translations[language].copied}
                </motion.div>
              ) : (
                <Copy className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Menu Sections */}
      <div className="px-6 space-y-6">
        {menuSections.map((section, sectionIndex) => (
          <motion.div
            key={section.titleKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="space-y-4"
          >
            {/* Section Title */}
            <h3 className="text-xs text-gray-500 uppercase tracking-wide mb-3 px-2">
              {translations[language][section.titleKey]}
            </h3>

            {/* Subscription Card — Only for Settings */}
            {section.titleKey === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-4"
              >
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${subscriptionStatus === 'premium'
                          ? 'bg-gradient-to-br from-amber-400 to-orange-500'
                          : subscriptionStatus === 'trial'
                            ? 'bg-blue-50'
                            : 'bg-gray-50'
                          }`}
                      >
                        <Crown
                          className={`w-6 h-6 ${subscriptionStatus === 'premium'
                            ? 'text-white'
                            : subscriptionStatus === 'trial'
                              ? 'text-blue-600'
                              : 'text-gray-600'
                            }`}
                        />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">{sub.currentPlan}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-lg">
                            {subscriptionStatus === 'premium'
                              ? sub.premium
                              : subscriptionStatus === 'trial'
                                ? sub.trial
                                : sub.basic}
                          </p>
                          {subscriptionStatus === 'premium' && (
                            <span className="px-2 py-0.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full text-xs">
                              {sub.active}
                            </span>
                          )}
                          {subscriptionStatus === 'trial' && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                              {sub.trial}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* {subscription === 'basic' && (
                      <button
                        onClick={() => navigate('/settings')}
                        className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm rounded-lg hover:shadow-md transition-all flex items-center gap-1"
                      >
                        <Crown className="w-4 h-4" />
                        {sub.upgrade}
                      </button>
                    )} */}
                  </div>

                  {subscriptionStatus === 'trial' && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg"
                    >
                      <p className="text-xs text-blue-800">{sub.trialWarning}</p>
                    </motion.div>
                  )}

                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-600">
                          {isTrial ? sub.trialExpires : sub.nextRenewal}
                        </p>
                        <p className="text-sm mt-0.5">
                          {userSubscription?.billing?.next_billing_date
                            ? new Date(userSubscription.billing.next_billing_date || "").toLocaleDateString(
                              "en-US",
                              { year: "numeric", month: "long", day: "numeric" }
                            )
                            : "March 15, 2026"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Subscription History Link */}
                  <button
                    onClick={() => navigate('/subscription-history')}
                    className="mt-3 w-full py-2 text-sm text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all flex items-center justify-center gap-2"
                    aria-label={sub.viewHistory}
                  >
                    <FileText className="w-4 h-4" />
                    {sub.viewHistory}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Section Items */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {section.items
                .filter((item) => !(subscriptionStatus === 'premium' && item.id === 'subscription'))
                .map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.screen)}
                    className={`w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-all
        ${index !== section.items.length - 1 ? 'border-b border-gray-100' : ''}
        ${item.premium ? 'bg-gradient-to-r from-amber-50 to-orange-50' : ''}
      `}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.premium
                          ? 'bg-gradient-to-br from-amber-400 to-orange-500'
                          : item.highlight
                            ? 'bg-emerald-50'
                            : 'bg-gray-50'
                          }`}
                      >
                        <item.icon
                          className={`w-5 h-5 ${item.premium
                            ? 'text-white'
                            : item.highlight
                              ? 'text-emerald-600'
                              : 'text-gray-600'
                            }`}
                        />
                      </div>
                      <span className="text-sm">{translations[language][item.labelKey]}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="px-6 mt-6">
        <button
          onClick={() => {
            logout();
            window.location.href = '/login';
          }}
          className="w-full py-4 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2 text-red-600">
          <LogOut className="w-5 h-5" />
          {translations[language].logOut}
        </button>
      </div>

      {/* App Version */}
      <div className="text-center mt-6 pb-6">
        <p className="text-xs text-gray-400">WazobiaTax.ng v1.0.0</p>
      </div>
    </div>
  );
}
