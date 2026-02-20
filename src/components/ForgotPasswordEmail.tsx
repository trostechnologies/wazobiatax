import { motion } from 'motion/react';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPasswordTranslations, type ForgotPasswordLanguageKey } from '../translations/forgotPassword';
import Logo from '@/assets/wazobiatax-logo.png'

interface ForgotPasswordEmailProps {
    onNavigate: (screen: string, data?: { email: string }) => void;
    language: ForgotPasswordLanguageKey;
}

export function ForgotPasswordEmail({ onNavigate, language }: ForgotPasswordEmailProps) {
    const [email, setEmail] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const t = forgotPasswordTranslations[language];

  const navigate = useNavigate();

    const handleSubmit = () => {
        if (!email) return;

        setIsProcessing(true);
        // Simulate API call to send verification code
        setTimeout(() => {
            setIsProcessing(false);
            navigate('/forgot-password-verify-code', { email });
        }, 2000);
    };

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
                            <Mail className="w-10 h-10 text-emerald-600" />
                        </div>
                        <h1 className="text-2xl mb-2">{t.enterEmail.title}</h1>
                        <p className="text-gray-600 px-4">{t.enterEmail.subtitle}</p>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-2 text-gray-700">{t.enterEmail.email}</label>
                            <div className="relative">
                                <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t.enterEmail.emailPlaceholder}
                                    className="w-full px-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={isProcessing || !email}
                        className={`w-full py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${!isProcessing && email
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                {t.enterEmail.submitting}
                            </>
                        ) : (
                            t.enterEmail.submit
                        )}
                    </button>

                    {/* Back to Login Link */}
                    <div className="text-center">
                        <button
                            onClick={() => navigate('/login')}
                            className="text-emerald-600 hover:underline"
                        >
                            {t.enterEmail.backToLogin}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
