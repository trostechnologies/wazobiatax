import { motion } from 'motion/react';
import { ArrowLeft, Shield, FileText, ChevronRight, Download, Trash2, Clock, Check, X } from 'lucide-react';
import { useState } from 'react';
import { profileTranslations, type LanguageKey } from '../translations/profile';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../services/auth';
import { getLedgerRecords } from '../services/ledger';
import { downloadJson } from '../utils/download';
import { ToastContainer, toast } from 'react-toastify';

interface SecurityAndPrivacyProps {
  language?: LanguageKey;
}

const SUPPORT_EMAIL = 'dpo@wazobiatax.ng';

export function SecurityAndPrivacy({ language = 'english' }: SecurityAndPrivacyProps) {
  const t = profileTranslations[language].securityPrivacy;
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isDownloadingData, setIsDownloadingData] = useState(false);
  const [deleteModalStep, setDeleteModalStep] = useState<'closed' | 'confirm' | 'unavailable'>('closed');
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const navigate = useNavigate();

  const handleDownloadData = async () => {
    setIsDownloadingData(true);
    try {
      const [profileRes, ledgerRes] = await Promise.all([
        getUserProfile(),
        getLedgerRecords(),
      ]);

      downloadJson(`wazobiatax-my-data-${new Date().toISOString().slice(0, 10)}.json`, {
        exported_at: new Date().toISOString(),
        profile: profileRes.data,
        ledger_entries: ledgerRes.data || [],
      });
      toast.success('Your data has been downloaded');
    } catch (err) {
      console.error('Failed to download user data:', err);
      toast.error('Unable to download your data right now. Please try again.');
    } finally {
      setIsDownloadingData(false);
    }
  };

  const handleViewLoginHistory = () => {
    toast.info("Login history isn't available yet. We're working on bringing this to the app.");
  };

  const handleConfirmDeleteAccount = () => {
    if (deleteConfirmText.trim().toUpperCase() !== 'DELETE') return;
    // No backend endpoint exists yet for account deletion — never fake success here.
    setDeleteModalStep('unavailable');
  };

  const closeDeleteModal = () => {
    setDeleteModalStep('closed');
    setDeleteConfirmText('');
  };

  const securityOptions = [
    {
      id: 'twoFactor',
      icon: Shield,
      title: t.twoFactorAuth,
      description: t.twoFactorDesc,
      action: twoFactorEnabled ? t.manage : t.enable,
      status: twoFactorEnabled ? t.enabled : t.disabled,
      statusColor: twoFactorEnabled ? 'text-emerald-600' : 'text-gray-500',
      screen: '/two-factor-auth',
      highlighted: !twoFactorEnabled
    },
    {
      id: 'privacy',
      icon: FileText,
      title: t.privacyPolicy,
      description: t.privacyPolicyDesc,
      action: t.viewPolicy,
      screen: '/privacy-policy'
    }
  ];

  const dataOptions = [
    {
      id: 'download',
      icon: Download,
      title: t.dataDownload,
      description: t.dataDownloadDesc,
      action: isDownloadingData ? 'Preparing download…' : t.requestDownload,
      onClick: handleDownloadData,
      disabled: isDownloadingData,
    },
    {
      id: 'history',
      icon: Clock,
      title: t.sessionHistory,
      description: t.sessionHistoryDesc,
      action: t.viewHistory,
      onClick: handleViewLoginHistory,
      disabled: false,
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Status Bar */}
      <div className="h-11 bg-emerald-600 flex items-center justify-between px-6 text-white text-sm">

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
      <div className="px-6 -mt-4 space-y-6">
        {/* Security Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {securityOptions.map((option, index) => (
            <button
              key={option.id}
              onClick={() => option.screen && navigate(option.screen)}
              className={`w-full px-6 py-5 flex items-start gap-4 hover:bg-gray-50 transition-all ${
                index !== securityOptions.length - 1 ? 'border-b border-gray-100' : ''
              } ${option.highlighted ? 'bg-emerald-50/50' : ''}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                option.highlighted ? 'bg-emerald-600' : 'bg-gray-100'
              }`}>
                <option.icon className={`w-6 h-6 ${
                  option.highlighted ? 'text-white' : 'text-gray-600'
                }`} />
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm">{option.title}</h3>
                  {option.status && (
                    <div className="flex items-center gap-1">
                      {twoFactorEnabled ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <X className="w-4 h-4 text-gray-400" />
                      )}
                      <span className={`text-xs ${option.statusColor}`}>{option.status}</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mb-2">{option.description}</p>
                <div className="flex items-center gap-1 text-emerald-600 text-sm">
                  <span>{option.action}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Data Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-xs text-gray-500 uppercase tracking-wide">Data Management</h3>
          </div>
          {dataOptions.map((option, index) => (
            <button
              key={option.id}
              onClick={option.onClick}
              disabled={option.disabled}
              className={`w-full px-6 py-5 flex items-start gap-4 hover:bg-gray-50 transition-all disabled:opacity-60 disabled:cursor-wait ${
                index !== dataOptions.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <option.icon className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-sm mb-1">{option.title}</h3>
                <p className="text-xs text-gray-500 mb-2">{option.description}</p>
                <div className="flex items-center gap-1 text-emerald-600 text-sm">
                  <span>{option.action}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Delete Account */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-red-100"
        >
          <button
            onClick={() => setDeleteModalStep('confirm')}
            className="w-full px-6 py-5 flex items-start gap-4 hover:bg-red-50 transition-all"
          >
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-sm text-red-600 mb-1">{t.deleteAccount}</h3>
              <p className="text-xs text-gray-500 mb-2">{t.deleteAccountDesc}</p>
              <div className="flex items-center gap-1 text-red-600 text-sm">
                <span>{t.deleteButton}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </button>
        </motion.div>
      </div>

      {/* Delete Account Modal */}
      {deleteModalStep !== 'closed' && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-6"
          onClick={closeDeleteModal}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {deleteModalStep === 'confirm' && (
              <>
                <h3 className="text-lg mb-2 text-red-600">{t.deleteAccount}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  This will permanently delete your account and all associated data. This action cannot be undone.
                  Type <span className="font-semibold">DELETE</span> to confirm.
                </p>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder="Type DELETE"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none mb-4"
                />
                <div className="flex flex-col gap-3">
                  <button
                    onClick={closeDeleteModal}
                    className="flex-1 py-3 border rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDeleteAccount}
                    disabled={deleteConfirmText.trim().toUpperCase() !== 'DELETE'}
                    className="flex-1 py-3 bg-red-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Delete my account
                  </button>
                </div>
              </>
            )}

            {deleteModalStep === 'unavailable' && (
              <>
                <h3 className="text-lg mb-2">Account deletion isn't available yet</h3>
                <p className="text-sm text-gray-600 mb-4">
                  We're not able to process account deletion requests in the app just yet. Please contact our
                  support team and we'll take care of it for you.
                </p>
                <a
                  href={`mailto:${SUPPORT_EMAIL}?subject=Account%20deletion%20request`}
                  className="block w-full py-3 text-center bg-emerald-600 text-white rounded-xl mb-3"
                >
                  Email {SUPPORT_EMAIL}
                </a>
                <button
                  onClick={closeDeleteModal}
                  className="w-full py-3 border rounded-xl"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
