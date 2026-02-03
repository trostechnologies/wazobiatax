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
  Sparkles
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from 'react-router-dom';
import { getUser } from '@/utils/storage';
import { getUserProfile } from '../services/auth';
import { profileTranslations, type LanguageKey } from '../translations/profile';

interface ProfileProps {
  language?: LanguageKey;
}

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

export function Profile( { language = 'english' }: ProfileProps ) {
  const [copied, setCopied] = useState(false);
  const tin = '123456789-0001';
  const subscription = 'basic'; // basic or premium

  // const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();
  const user = getUser();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleCopyTIN = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const menuSections = [
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
          screen: '/settings',
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
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile();
        setCurrentUser(res.data); // <-- API response shape
        console.log('user data', res.data)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className='italic text-center'>Loading profile information...</p>;

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
    : `${currentUser.first_name} ${currentUser.last_name}`}
</h2>            <p className="text-emerald-100 text-sm">{user?.business_name || currentUser.business_name}</p>

            {/* Subscription Badge */}
            <div className="mt-2">
              {subscription === 'basic' ? (
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 text-white rounded-full text-xs">
                  {translations[language].basicPlan}
                </div>
              ) : (
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full text-xs">
                  <Crown className="w-3 h-3" />
                  {translations[language].premium}
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
          >
            <h3 className="text-xs text-gray-500 uppercase tracking-wide mb-3 px-2">
              {translations[language][section.titleKey]}
            </h3>

            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {section.items.map((item, index) => (
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
                      className={`w-10 h-10 rounded-lg flex items-center justify-center
                  ${item.premium
                          ? 'bg-gradient-to-br from-amber-400 to-orange-500'
                          : item.highlight
                            ? 'bg-emerald-50'
                            : 'bg-gray-50'
                        }
                `}
                    >
                      <item.icon
                        className={`w-5 h-5
                    ${item.premium
                            ? 'text-white'
                            : item.highlight
                              ? 'text-emerald-600'
                              : 'text-gray-600'
                          }
                  `}
                      />
                    </div>

                    <span className="text-sm">
                      {translations[language][item.labelKey]}
                    </span>
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
          onClick={() => navigate('/onboarding')}
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
