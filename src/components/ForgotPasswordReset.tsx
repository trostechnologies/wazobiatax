import { motion } from 'motion/react';
import { Lock, Eye, EyeOff, ArrowLeft, Loader2, Check, X } from 'lucide-react';
import { useState } from 'react';
import { forgotPasswordTranslations, type ForgotPasswordLanguageKey } from '../translations/forgotPassword';
import { useNavigate } from 'react-router-dom';
import Logo from '@/assets/wazobiatax-logo.png'

interface ForgotPasswordResetProps {
    onNavigate: (screen: string) => void;
    language: ForgotPasswordLanguageKey;
}

export function ForgotPasswordReset({ onNavigate, language }: ForgotPasswordResetProps) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const t = forgotPasswordTranslations[language];

    const navigate = useNavigate();

    // Password validation
    const hasMinLength = newPassword.length >= 8;
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumberOrSpecial = /[\d\W]/.test(newPassword);
    const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;
    const passwordsDontMatch = newPassword && confirmPassword && newPassword !== confirmPassword;

    const isPasswordValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumberOrSpecial;
    const canSubmit = isPasswordValid && passwordsMatch;

    const handleSubmit = () => {
        if (!canSubmit) return;

        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            navigate('/forgot-password-success');
        }, 2000);
    };

    const RequirementItem = ({ met, text }: { met: boolean; text: string }) => (
        <div className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${met ? 'bg-emerald-100' : 'bg-gray-100'
                }`}>
                {met ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                ) : (
                    <X className="w-3 h-3 text-gray-400" />
                )}
            </div>
            <span className={`text-sm ${met ? 'text-emerald-600' : 'text-gray-600'}`}>
                {text}
            </span>
        </div>
    );

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

            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-4 flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-all"
                >
                    <ArrowLeft className="w-6 h-6 text-white" />
                </button>
                <div className="flex items-center justify-center gap-2">
          <div className="flex justify-center items-center">
            <img src={Logo} alt="logo" className='h-8 pointer-events-none select-none' />
          </div>
        </div>
                <div className="w-10" />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                >
                    {/* Icon and Title */}
                    <div className="text-center py-4">
                        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-10 h-10 text-emerald-600" />
                        </div>
                        <h1 className="text-2xl mb-2">{t.resetPassword.title}</h1>
                        <p className="text-gray-600 px-4">{t.resetPassword.subtitle}</p>
                    </div>

                    {/* Password Inputs */}
                    <div className="space-y-4">
                        {/* New Password */}
                        <div>
                            <label className="block mb-2 text-gray-700">{t.resetPassword.newPassword}</label>
                            <div className="relative">
                                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder={t.resetPassword.newPasswordPlaceholder}
                                    className="w-full px-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                />
                                <button
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block mb-2 text-gray-700">{t.resetPassword.confirmPassword}</label>
                            <div className="relative">
                                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder={t.resetPassword.confirmPasswordPlaceholder}
                                    className="w-full px-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                />
                                <button
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Password Match Status */}
                        {confirmPassword && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex items-center gap-2 p-3 rounded-xl ${passwordsMatch
                                    ? 'bg-emerald-50 border border-emerald-200'
                                    : 'bg-red-50 border border-red-200'
                                    }`}
                            >
                                {passwordsMatch ? (
                                    <>
                                        <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                                        <p className="text-sm text-emerald-600">{t.resetPassword.passwordsMatch}</p>
                                    </>
                                ) : (
                                    <>
                                        <X className="w-5 h-5 text-red-600 flex-shrink-0" />
                                        <p className="text-sm text-red-600">{t.resetPassword.passwordsDontMatch}</p>
                                    </>
                                )}
                            </motion.div>
                        )}
                    </div>

                    {/* Password Requirements */}
                    {newPassword && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3"
                        >
                            <p className="text-sm text-gray-700 mb-2">{t.resetPassword.requirements}</p>
                            <RequirementItem met={hasMinLength} text={t.resetPassword.requirement1} />
                            <RequirementItem met={hasUpperCase} text={t.resetPassword.requirement2} />
                            <RequirementItem met={hasLowerCase} text={t.resetPassword.requirement3} />
                            <RequirementItem met={hasNumberOrSpecial} text={t.resetPassword.requirement4} />
                        </motion.div>
                    )}

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={isProcessing || !canSubmit}
                        className={`w-full py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${!isProcessing && canSubmit
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                {t.resetPassword.submitting}
                            </>
                        ) : (
                            t.resetPassword.submit
                        )}
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
