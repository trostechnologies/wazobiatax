import { motion } from 'motion/react';
import { ArrowLeft, Bell, AlertCircle, CheckCircle2, Info, Settings } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from 'react-router-dom';

const translations = {
  english: {
    vatDeadlineAlert: 'Deadline Alert: VAT Return',
    vatDeadlineAlertMsg: 'Your VAT return is due in 2 days. File now to avoid penalties.',
  
    paymentConfirmed: 'Payment Confirmed',
    paymentConfirmedMsg: 'Your tax payment has been successfully processed.',
  
    newTaxEducation: 'New Tax Education Content',
    newTaxEducationMsg: 'Learn about the latest NTAA 2025 compliance requirements.',
  
    complianceScoreUpdate: 'Compliance Score Update',
    complianceScoreUpdateMsg: 'Your compliance score decreased by 2%. Complete pending tasks.',
  
    tinVerified: 'TIN Verified',
    tinVerifiedMsg: 'Your Tax Identification Number has been verified by FIRS.',

    notifications: 'Notifications',
  markAllRead: 'Mark all read',

  all: 'All',
  unread: 'Unread',

  notificationPreferences: 'Notification Preferences',

  pushNotifications: 'Push Notifications',
  smsAlerts: 'SMS Alerts',
  emailNotifications: 'Email Notifications',
  },
  pidgin: {
    vatDeadlineAlert: 'Deadline Alert: VAT Return',
    vatDeadlineAlertMsg: 'Your VAT return go due in 2 days. File am now make penalty no follow.',
  
    paymentConfirmed: 'Dem Don Confirm Payment',
    paymentConfirmedMsg: 'Your tax payment don process successfully.',
  
    newTaxEducation: 'New Tax Education Content',
    newTaxEducationMsg: 'Learn about the new NTAA 2025 compliance requirements.',
  
    complianceScoreUpdate: 'Update About Compliance Score',
    complianceScoreUpdateMsg: 'Your compliance score don drop by 2%. Complete the remaining tasks.',
  
    tinVerified: 'TIN Verified',
    tinVerifiedMsg: 'FIRS don verify your Tax Identification Number.',

    notifications: 'Notifications',
  markAllRead: 'Mark all as read',

  all: 'All',
  unread: 'Unread',

  notificationPreferences: 'Notification Preferences',

  pushNotifications: 'Push Notifications',
  smsAlerts: 'SMS Alerts',
  emailNotifications: 'Email Notifications',
  },
  hausa: {
    vatDeadlineAlert: 'Gargaɗin Wa’adin VAT',
    vatDeadlineAlertMsg: 'Wa’adin rahoton VAT zai ƙare cikin kwanaki 2. Miƙa yanzu don guje wa tara.',
  
    paymentConfirmed: 'An Tabbatar da Biya',
    paymentConfirmedMsg: 'An kammala biyan harajinka cikin nasara.',
  
    newTaxEducation: 'Sabon Ilimin Haraji',
    newTaxEducationMsg: 'Koyi sababbin buƙatun bin doka na NTAA 2025.',
  
    complianceScoreUpdate: 'Sabuntawar Makin Bin Doka',
    complianceScoreUpdateMsg: 'Makin bin dokarka ya ragu da 2%. Kammala ayyukan da suka rage.',
  
    tinVerified: 'An Tabbatar da TIN',
    tinVerifiedMsg: 'Hukumar FIRS ta tabbatar da lambar TIN ɗinka.',

    notifications: 'Sanarwa',
  markAllRead: 'Alama duka an karanta',

  all: 'Duka',
  unread: 'Ba a karanta ba',

  notificationPreferences: 'Zaɓuɓɓukan Sanarwa',

  pushNotifications: 'Sanarwar Turawa',
  smsAlerts: 'Faɗakarwar SMS',
  emailNotifications: 'Sanarwar Imel',
  },
  yoruba: {
    vatDeadlineAlert: 'Ìkìlọ̀ Ọjọ́-ìparí VAT',
    vatDeadlineAlertMsg: 'Ọjọ́-ìparí VAT rẹ kù ọjọ́ 2. Fọwọ́sí nísinsin yìí láti yago fún ìtanràn.',
  
    paymentConfirmed: 'A Ti Jẹ́risi Ìsanwó',
    paymentConfirmedMsg: 'A ti gba owó-ori rẹ́ ní aṣeyọrí.',
  
    newTaxEducation: 'Ẹ̀kọ́ Owó-ori Tuntun',
    newTaxEducationMsg: 'Kọ́ ẹ̀kọ́ nípa àṣẹ tuntun NTAA 2025.',
  
    complianceScoreUpdate: 'Ìmúdájú Ìbámu',
    complianceScoreUpdateMsg: 'Ìpele ìbámu rẹ dín kù ní 2%. Parí àwọn iṣẹ́ tó kù.',
  
    tinVerified: 'A Ti Jẹ́risi TIN',
    tinVerifiedMsg: 'FIRS ti jẹ́risi Nọ́mbà TIN rẹ.',

    notifications: 'Ìkìlọ̀',
    markAllRead: 'Samisi gbogbo wọn gẹ́gẹ́ bí a ti ka',
  
    all: 'Gbogbo',
    unread: 'Tí a kò tíì ka',
  
    notificationPreferences: 'Àyànfẹ́ Ìkìlọ̀',
  
    pushNotifications: 'Ìkìlọ̀ Fífi Ránṣẹ́',
    smsAlerts: 'Ìkìlọ̀ SMS',
    emailNotifications: 'Ìkìlọ̀ Ímẹ́lì',
  },
  igbo: {
    vatDeadlineAlert: 'Ịdọ Aka ná Ntinye VAT',
    vatDeadlineAlertMsg: 'Ụbọchị mmechi VAT fọdụrụ ụbọchị 2. Tinye ya ugbu a ka izere ntaramahụhụ.',
  
    paymentConfirmed: 'Ekwenyela Ịkwụ Ụtụ',
    paymentConfirmedMsg: 'A kwadoro ịkwụ ụtụ isi gị nke ọma.',
  
    newTaxEducation: 'Agụmakwụkwọ Ụtụ Isi Ọhụrụ',
    newTaxEducationMsg: 'Mụta ihe gbasara iwu NTAA 2025.',
  
    complianceScoreUpdate: 'Mmelite Ntụle Iwu',
    complianceScoreUpdateMsg: 'Ntụle iwu gị belatara site na 2%. Mechaa ọrụ fọdụrụ.',
  
    tinVerified: 'Ekwenyela TIN',
    tinVerifiedMsg: 'FIRS ekwenyela Nọmba TIN gị.',

    notifications: 'Ọkwa',
    markAllRead: 'Kaa ha niile',
  
    all: 'Niile',
    unread: 'A gụghị',
  
    notificationPreferences: 'Nhọrọ Ọkwa',
  
    pushNotifications: 'Ọkwa Ntughari',
    smsAlerts: 'Ọkwa SMS',
    emailNotifications: 'Ọkwa Email',
  }      
}

export function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'alert',
      titleKey: 'vatDeadlineAlert',
      messageKey: 'vatDeadlineAlertMsg',
      time: '2h ago',
      read: false,
      action: '/file-returns',
    },
    {
      id: 2,
      type: 'success',
      titleKey: 'paymentConfirmed',
      messageKey: 'paymentConfirmedMsg',
      time: '5h ago',
      read: false,
      action: '/pay-tax',
    },
    {
      id: 3,
      type: 'info',
      titleKey: 'newTaxEducation',
      messageKey: 'newTaxEducationMsg',
      time: '1d ago',
      read: true,
      action: '/education',
    },
    {
      id: 4,
      type: 'alert',
      titleKey: 'complianceScoreUpdate',
      messageKey: 'complianceScoreUpdateMsg',
      time: '2d ago',
      read: true,
      action: '/deadlines',
    },
    {
      id: 5,
      type: 'success',
      titleKey: 'tinVerified',
      messageKey: 'tinVerifiedMsg',
      time: '3d ago',
      read: true,
      action: '/profile',
    },
  ]);  

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert': return AlertCircle;
      case 'success': return CheckCircle2;
      case 'info': return Info;
      default: return Bell;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'alert': return 'bg-red-50 text-red-600 border-red-100';
      case 'success': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'info': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const { language } = useLanguage();
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all -ml-2"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-lg">{translations[language].notifications}</h1>
          </div>
          <button 
            onClick={handleMarkAllRead}
            className="text-sm text-emerald-600 hover:underline"
          >
            {translations[language].markAllRead}
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <button className="flex-1 py-2 px-4 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-all">
          {translations[language].all}
          </button>
          <button className="flex-1 py-2 px-4 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-all">
          {translations[language].unread}
          </button>
          <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-6 space-y-3">
        {notifications.map((notification, index) => {
          const Icon = getIcon(notification.type);
          const colorClass = getColor(notification.type);
          
          return (
            <motion.button
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(notification.action)}
              className={`w-full p-4 rounded-xl transition-all text-left ${
                notification.read 
                  ? 'bg-white border border-gray-200 hover:shadow-md' 
                  : 'bg-white border-2 border-emerald-200 shadow-md hover:shadow-lg'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border ${colorClass}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm pr-2">
  {t[notification.titleKey]}
</h3>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-emerald-600 rounded-full flex-shrink-0 mt-1" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
  {t[notification.messageKey]}
</p>
                  <p className="text-xs text-gray-400">{notification.time}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Notification Preferences */}
      <div className="px-6 pb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="text-sm mb-3 flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600" />
            {translations[language].notificationPreferences}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{translations[language].pushNotifications}</span>
              <div className="w-12 h-6 bg-emerald-600 rounded-full relative">
                <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{translations[language].smsAlerts}</span>
              <div className="w-12 h-6 bg-emerald-600 rounded-full relative">
                <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{translations[language].emailNotifications}</span>
              <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
