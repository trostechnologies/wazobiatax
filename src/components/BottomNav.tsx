import { Home, FileText, CreditCard, BookOpen, User } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'file', label: 'File', icon: FileText },
    { id: 'pay', label: 'Pay', icon: CreditCard },
    { id: 'ledger', label: 'Ledger', icon: BookOpen },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 max-w-[390px] mx-auto">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="relative flex flex-col items-center gap-1 px-4 py-2 transition-all"
          >
            <div className={`transition-all ${
              activeTab === tab.id ? 'text-emerald-600' : 'text-gray-400'
            }`}>
              <tab.icon className="w-6 h-6" />
            </div>
            <span className={`text-xs transition-all ${
              activeTab === tab.id ? 'text-emerald-600' : 'text-gray-500'
            }`}>
              {tab.label}
            </span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-emerald-600 rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
