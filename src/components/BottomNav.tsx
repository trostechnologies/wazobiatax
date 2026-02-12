import { Home, FileText, CreditCard, BookOpen, User } from 'lucide-react';
import { motion } from 'motion/react';
import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { profileTranslations, type LanguageKey } from '../translations/profile';

interface BottomNavProps {
  language?: LanguageKey;
}

const translations = {
  english: {
    home: 'Home',
    file: 'File',
    pay: 'Pay',
    ledger: 'Ledger',
    profile: 'Profile',
  },
  pidgin: {
    home: 'Home',
    file: 'File',
    pay: 'Pay',
    ledger: 'Ledger',
    profile: 'Profile',
  },
  hausa: {
    home: 'Gida',
    file: 'Gabatar',
    pay: 'Biya',
    ledger: "Littafin Ma'amala",
    profile: 'Bayanan Kai',
  },
  yoruba: {
    home: 'Ilé',
    file: 'Fí',
    pay: 'San',
    ledger: 'Ìwé Ìṣirò',
    profile: 'Profaili',
  },
  igbo: {
    home: 'Ụlọ',
    file: 'Faịlụ',
    pay: 'Kwụ Ụtụ',
    ledger: 'Ledger',
    profile: 'Profaịlụ',
  },
};

export function BottomNav( { language = 'english' }: BottomNavProps ) {
  // const { language } = useLanguage();
  const location = useLocation();

  const tabs = [
    { id: 'home', labelKey: 'home', icon: Home, path: '/dashboard' },
    { id: 'file', labelKey: 'file', icon: FileText, path: '/file-returns' },
    { id: 'pay', labelKey: 'pay', icon: CreditCard, path: '/pay-tax' },
    { id: 'ledger', labelKey: 'ledger', icon: BookOpen, path: '/ledger' },
    { id: 'profile', labelKey: 'profile', icon: User, path: '/profile' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 max-w-[390px] mx-auto">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const active = isActive(tab.path);

          return (
            <NavLink
              key={tab.id}
              to={tab.path}
              className="relative flex flex-col items-center gap-1 px-4 py-2 transition-all"
            >
              <div
                className={`transition-all ${
                  active ? 'text-emerald-600' : 'text-gray-400'
                }`}
              >
                <tab.icon className="w-6 h-6" />
              </div>

              <span
                className={`text-xs transition-all ${
                  active ? 'text-emerald-600' : 'text-gray-500'
                }`}
              >
                {translations[language][tab.labelKey]}
              </span>

              {active && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-emerald-600 rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}