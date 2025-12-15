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
import { useState } from 'react';

interface ProfileProps {
  onNavigate: (screen: string) => void;
}

export function Profile({ onNavigate }: ProfileProps) {
  const [copied, setCopied] = useState(false);
  const tin = '123456789-0001';
  const subscription = 'basic'; // basic or premium

  const handleCopyTIN = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const menuSections = [
    {
      title: 'Account',
      items: [
        { id: 'personal', label: 'Personal Information', icon: User, screen: 'profile' },
        { id: 'language', label: 'Language & Voice', icon: Globe, screen: 'profile' },
        { id: 'notifications', label: 'Notifications', icon: Bell, screen: 'notifications' },
      ]
    },
    {
      title: 'Tax Services',
      items: [
        { id: 'clearance', label: 'Request Tax Clearance', icon: FileText, screen: 'taxClearance', highlight: true },
        { id: 'education', label: 'Tax Education', icon: Sparkles, screen: 'education' },
      ]
    },
    {
      title: 'Settings',
      items: [
        { id: 'subscription', label: 'Upgrade to Premium', icon: Crown, screen: 'settings', premium: true },
        { id: 'security', label: 'Security & Privacy', icon: Shield, screen: 'profile' },
      ]
    }
  ];

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
        <h1 className="text-white text-lg mb-6">Profile</h1>
        
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center">
            <User className="w-10 h-10 text-emerald-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-white text-xl mb-1">Chukwuma Okafor</h2>
            <p className="text-emerald-100 text-sm">Bukka Restaurant</p>
            
            {/* Subscription Badge */}
            <div className="mt-2">
              {subscription === 'premium' ? (
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full text-xs">
                  <Crown className="w-3 h-3" />
                  Premium
                </div>
              ) : (
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 text-white rounded-full text-xs">
                  Basic Plan
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
              <p className="text-xs text-gray-600 mb-1">Tax Identification Number</p>
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
                  Copied!
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
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
          >
            <h3 className="text-xs text-gray-500 uppercase tracking-wide mb-3 px-2">
              {section.title}
            </h3>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {section.items.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.screen)}
                  className={`w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-all ${
                    index !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                  } ${item.premium ? 'bg-gradient-to-r from-amber-50 to-orange-50' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      item.premium ? 'bg-gradient-to-br from-amber-400 to-orange-500' :
                      item.highlight ? 'bg-emerald-50' : 'bg-gray-50'
                    }`}>
                      <item.icon className={`w-5 h-5 ${
                        item.premium ? 'text-white' :
                        item.highlight ? 'text-emerald-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <span className="text-sm">{item.label}</span>
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
        <button className="w-full py-4 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2 text-red-600">
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>

      {/* App Version */}
      <div className="text-center mt-6 pb-6">
        <p className="text-xs text-gray-400">WazobiaTax.ng v1.0.0</p>
      </div>
    </div>
  );
}
