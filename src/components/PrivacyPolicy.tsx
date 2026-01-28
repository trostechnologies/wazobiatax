import { motion } from 'motion/react';
import { ArrowLeft, Shield, Lock, Eye, Globe, Cookie, FileText, Mail, MapPin } from 'lucide-react';
import { profileTranslations, type LanguageKey } from '../translations/profile';
import { useNavigate } from 'react-router-dom';

interface PrivacyPolicyProps {
  language?: LanguageKey;
}

export function PrivacyPolicy({ language = 'english' }: PrivacyPolicyProps) {
  const t = profileTranslations[language].privacyPolicy;
  const navigate = useNavigate();

  const sections = [
    {
      icon: FileText,
      title: t.intro,
      content: t.introText
    },
    {
      icon: Eye,
      title: t.dataCollection,
      content: t.dataCollectionText,
      items: t.dataItems
    },
    {
      icon: Shield,
      title: t.legalBasis,
      content: t.legalBasisText,
      items: t.legalBasisItems
    },
    {
      icon: FileText,
      title: t.dataUse,
      items: t.dataUseItems
    },
    {
      icon: Globe,
      title: t.dataSharing,
      content: t.dataSharingText,
      items: t.dataSharingItems,
      note: t.dataSharingNote
    },
    {
      icon: Lock,
      title: t.dataSecurity,
      content: t.dataSecurityText,
      items: t.dataSecurityItems
    },
    {
      icon: Shield,
      title: t.yourRights,
      content: t.yourRightsText,
      items: t.yourRightsItems
    }
  ];

  const additionalSections = [
    {
      title: t.dataRetention,
      content: t.dataRetentionText
    },
    {
      title: t.childrens,
      content: t.childrensText
    },
    {
      title: t.international,
      content: t.internationalText
    },
    {
      title: t.cookies,
      content: t.cookiesText
    },
    {
      title: t.changes,
      content: t.changesText
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
            onClick={() => navigate('/security-and-privacy')}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-lg flex-1 text-center mr-10">{t.title}</h1>
        </div>
        <p className="text-emerald-100 text-center text-sm">{t.subtitle}</p>
        <p className="text-emerald-200 text-center text-xs mt-2">{t.lastUpdated}</p>
      </div>

      {/* Content */}
      <div className="px-6 -mt-4 space-y-4">
        {/* Main Sections */}
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <section.icon className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="text-sm flex-1 pt-2">{section.title}</h2>
            </div>
            
            {section.content && (
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">{section.content}</p>
            )}
            
            {section.items && (
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2 text-xs text-gray-600">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.note && (
              <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
                <p className="text-xs text-emerald-800">{section.note}</p>
              </div>
            )}
          </motion.div>
        ))}

        {/* Additional Sections */}
        {additionalSections.map((section, index) => (
          <motion.div
            key={`additional-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (sections.length + index) * 0.05 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-sm mb-3">{section.title}</h2>
            <p className="text-xs text-gray-600 leading-relaxed">{section.content}</p>
          </motion.div>
        ))}

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (sections.length + additionalSections.length) * 0.05 }}
          className="bg-white rounded-2xl shadow-lg p-6 space-y-6"
        >
          {/* Contact Us */}
          <div>
            <h2 className="text-sm mb-3">{t.contact}</h2>
            <p className="text-xs text-gray-600 mb-3">{t.contactText}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <Mail className="w-4 h-4 text-emerald-600" />
                <span className="text-gray-600">{t.contactEmail}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span className="text-gray-600">{t.contactAddress}</span>
              </div>
            </div>
          </div>

          {/* DPO */}
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-sm mb-2">{t.dpo}</h3>
            <p className="text-xs text-gray-600 mb-2">{t.dpoText}</p>
            <div className="flex items-center gap-2 text-xs">
              <Mail className="w-4 h-4 text-emerald-600" />
              <span className="text-gray-600">{t.dpoEmail}</span>
            </div>
          </div>

          {/* NDPC */}
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-sm mb-2">{t.nitda}</h3>
            <p className="text-xs text-gray-600 mb-2">{t.nitdaText}</p>
            <div className="flex items-center gap-2 text-xs">
              <Globe className="w-4 h-4 text-emerald-600" />
              <span className="text-gray-600">{t.nitdaWebsite}</span>
            </div>
          </div>
        </motion.div>

        {/* Acknowledgment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (sections.length + additionalSections.length + 1) * 0.05 }}
          className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl shadow-lg p-6 border border-emerald-200"
        >
          <h2 className="text-sm mb-3 text-emerald-900">{t.acknowledgment}</h2>
          <p className="text-xs text-emerald-800 leading-relaxed">{t.acknowledgmentText}</p>
        </motion.div>

        {/* Bottom Spacing */}
        <div className="h-4" />
      </div>
    </div>
  );
}
