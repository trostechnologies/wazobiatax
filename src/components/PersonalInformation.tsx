import { motion } from 'motion/react';
import { ArrowLeft, User, Mail, Phone, Building2, Hash, Calendar, Edit2, Check, X } from 'lucide-react';
import { useState } from 'react';
import { profileTranslations, type LanguageKey } from '../translations/profile';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface PersonalInformationProps {
  language?: LanguageKey;
}

export function PersonalInformation({ language = 'english' }: PersonalInformationProps) {
  const t = profileTranslations[language].personalInfo;
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  
  // Mock user data - in production this would come from the onboarding flow/backend
  const [userData, setUserData] = useState({
    fullName: 'Chukwuma Okafor',
    email: 'chukwuma.okafor@example.com',
    phone: '+234 801 234 5678',
    taxId: '123456789-0001',
    businessName: 'Bukka Restaurant',
    accountCreated: 'January 15, 2026'
  });

  const [editedData, setEditedData] = useState(userData);

  const handleSave = () => {
    setUserData(editedData);
    setIsEditing(false);
    toast.success(t.updatedSuccess);
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  const infoFields = [
    {
      icon: User,
      label: t.fullName,
      value: isEditing ? editedData.fullName : userData.fullName,
      field: 'fullName',
      editable: true
    },
    {
      icon: Mail,
      label: t.email,
      value: isEditing ? editedData.email : userData.email,
      field: 'email',
      editable: true
    },
    {
      icon: Phone,
      label: t.phone,
      value: isEditing ? editedData.phone : userData.phone,
      field: 'phone',
      editable: true
    },
    {
      icon: Hash,
      label: t.taxId,
      value: userData.taxId,
      field: 'taxId',
      editable: false // Tax ID cannot be edited
    },
    {
      icon: Building2,
      label: t.businessName,
      value: isEditing ? editedData.businessName : (userData.businessName || t.notProvided),
      field: 'businessName',
      editable: true
    },
    {
      icon: Calendar,
      label: t.accountCreated,
      value: userData.accountCreated,
      field: 'accountCreated',
      editable: false
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

      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 px-6 pt-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/profile')}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-lg flex-1 text-center mr-10">{t.title}</h1>
        </div>
        <p className="text-emerald-100 text-center text-sm">{t.subtitle}</p>
      </div>

      {/* Content */}
      <div className="px-6 -mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Profile Avatar */}
          <div className="p-6 border-b border-gray-100 flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Information Fields */}
          <div className="p-6 space-y-5">
            {infoFields.map((field, index) => (
              <motion.div
                key={field.field}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wide">
                  <field.icon className="w-4 h-4" />
                  <span>{field.label}</span>
                </div>
                {isEditing && field.editable ? (
                  <input
                    type={field.field === 'email' ? 'email' : 'text'}
                    value={editedData[field.field as keyof typeof editedData]}
                    onChange={(e) => setEditedData({ ...editedData, [field.field]: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                ) : (
                  <p className={`text-gray-900 ${field.editable ? '' : 'text-gray-600'}`}>
                    {field.value}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="p-6 border-t border-gray-100">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
              >
                <Edit2 className="w-5 h-5" />
                {t.editButton}
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="flex-1 py-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                  <X className="w-5 h-5" />
                  {t.cancelButton}
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  {t.saveButton}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
