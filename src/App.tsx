import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { SplashScreen } from './components/SplashScreen';
import { LanguageSelection } from './components/LanguageSelection';
import { VoiceModeToggle } from './components/VoiceModeToggle';
import { OnboardingWizard } from './components/OnboardingWizard';
import { Dashboard } from './components/Dashboard';
import { FileReturns } from './components/FileReturns';
import { PayTax } from './components/PayTax';
import { Ledger } from './components/Ledger';
import { Profile } from './components/Profile';
import { UpcomingDeadlines } from './components/UpcomingDeadlines';
import { RecentActivity } from './components/RecentActivity';
import { Notifications } from './components/Notifications';
import { EducationModule } from './components/EducationModule';
import { TaxClearance } from './components/TaxClearance';
import { Settings } from './components/Settings';
import { BottomNav } from './components/BottomNav';
import { PersonalInformation } from './components/PersonalInformation';
import { LanguageAndVoice } from './components/LanguageAndVoice';
import { SecurityAndPrivacy } from './components/SecurityAndPrivacy';
import { TwoFactorAuth } from './components/TwoFactorAuth';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { ScanReceipt } from './components/ScanReceipt';
import { VoiceEntry } from './components/VoiceEntry';
import type { LanguageKey } from './translations/profile';
import type { ForgotPasswordLanguageKey } from './translations/forgotPassword';
import { ForgotPasswordEmail } from './components/ForgotPasswordEmail';
import { ForgotPasswordVerifyCode } from './components/ForgotPasswordVerifyCode';
import { ForgotPasswordReset } from './components/ForgotPasswordReset';
import { ForgotPasswordSuccess } from './components/ForgotPasswordSuccess';
import { SubscriptionPlans } from './components/SubscriptionPlans';
import { ReloadPrompt } from './components/ReloadPrompt';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = !!localStorage.getItem('accessToken');
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  const location = useLocation();
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [language, setLanguage] = useState('english');

  const [onboardingComplete, setOnboardingComplete] = useState(
    localStorage.getItem('onboardingComplete') === 'true'
  );

  const [isOffline, setIsOffline] = useState(false);

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  // Splash screen logic (only when not onboarded)
  if (!onboardingComplete && location.pathname === '/') {
    return <SplashScreen />;
  }

  const navigateTo = (screen: string, data?: any) => {
    // Handle forgot password flow data
    if (screen === 'forgotPasswordVerify' && data?.email) {
      setForgotPasswordEmail(data.email);
    }
    setCurrentScreen(screen);
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-50">
      <div className="mx-auto max-w-[390px] min-h-screen bg-white relative overflow-hidden">

        <Routes>
          {/* Splash Redirect */}
          <Route
            path="/"
            element={
              onboardingComplete ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/onboarding" replace />
              )
            }
          />

          {/* Onboarding */}
          <Route
            path="/onboarding"
            element={
              onboardingComplete ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <OnboardingWizard
                  onComplete={() => {
                    localStorage.setItem('onboardingComplete', 'true');
                    setOnboardingComplete(true);
                  }}
                />
              )
            }
          />

          {/* Main App Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard language={language as LanguageKey} /></ProtectedRoute>} />
          <Route path="/file-returns" element={<ProtectedRoute><FileReturns language={language as LanguageKey} /></ProtectedRoute>} />
          <Route path="/pay-tax" element={<ProtectedRoute><PayTax language={language as LanguageKey} /></ProtectedRoute>} />
          <Route path="/ledger" element={<ProtectedRoute><Ledger onNavigate={navigateTo} language={language as LanguageKey} /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile language={language as LanguageKey} /></ProtectedRoute>} />
          <Route path="/deadlines" element={<ProtectedRoute><UpcomingDeadlines language={language as LanguageKey} /></ProtectedRoute>} />
          <Route path="/activity" element={<ProtectedRoute><RecentActivity language={language as LanguageKey} /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications language={language as LanguageKey} /></ProtectedRoute>} />
          <Route path="/education" element={<ProtectedRoute><EducationModule language={language as LanguageKey} /></ProtectedRoute>} />
          <Route path="/tax-clearance" element={<ProtectedRoute><TaxClearance language={language as LanguageKey} /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings language={language as LanguageKey} /></ProtectedRoute>} />
          <Route path="/personal-information" element={<ProtectedRoute><PersonalInformation language={language as LanguageKey} /></ProtectedRoute>} />
          <Route path="/language-and-voice" element={<ProtectedRoute><LanguageAndVoice language={language as LanguageKey} onLanguageChange={(lang) => setLanguage(lang)} /></ProtectedRoute>} />
          <Route path="/security-and-privacy" element={<ProtectedRoute><SecurityAndPrivacy language={language as LanguageKey} /></ProtectedRoute>} />
          <Route path="/two-factor-auth" element={<ProtectedRoute><TwoFactorAuth language={language as LanguageKey} /></ProtectedRoute>} />
          <Route path="/privacy-policy" element={<ProtectedRoute><PrivacyPolicy language={language as LanguageKey} /></ProtectedRoute>} />
          <Route path="/scan" element={<ProtectedRoute><ScanReceipt language={language as LanguageKey} /></ProtectedRoute>} />
          <Route path="/voice" element={<ProtectedRoute><VoiceEntry language={language as LanguageKey} /></ProtectedRoute>} />
          <Route path="/forgot-password-email" element={<ForgotPasswordEmail onNavigate={navigateTo} language={language as ForgotPasswordLanguageKey} />} />
          <Route path="/forgot-password-verify-code" element={<ForgotPasswordVerifyCode onNavigate={navigateTo} language={language as ForgotPasswordLanguageKey} />} />
          <Route path="/forgot-password-reset" element={<ForgotPasswordReset onNavigate={navigateTo} language={language as ForgotPasswordLanguageKey} />} />
          <Route path="/forgot-password-success" element={<ForgotPasswordSuccess onNavigate={navigateTo} language={language as ForgotPasswordLanguageKey} />} />
          <Route path="/subscriptions" element={<SubscriptionPlans language={language} />} />

          <Route
            path="/login"
            element={
              <OnboardingWizard
                initialStep="login"
                onComplete={() => {
                  localStorage.setItem('onboardingComplete', 'true');
                  setOnboardingComplete(true);
                }}
              />
            }
          />

          {/* Catch-all */}
          <Route
            path="*"
            element={<Navigate to="/dashboard" replace />}
          />
        </Routes>

        {/* Bottom Navigation */}
        {onboardingComplete &&
          !['/', '/onboarding'].includes(location.pathname) && (
            <BottomNav language={language as LanguageKey} />
          )}

        {/* Offline Indicator */}
        {isOffline && (
          <div className="absolute top-14 left-0 right-0 bg-amber-500 text-white px-4 py-2 text-center text-sm z-50">
            Offline Mode Active - 3 entries pending sync
          </div>
        )}
        {/* PWA Reload Prompt */}
        <ReloadPrompt />
      </div>
    </div>
  );
}
