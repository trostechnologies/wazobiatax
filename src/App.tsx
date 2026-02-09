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

export default function App() {
  const location = useLocation();
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [language, setLanguage] = useState('english');

  const [onboardingComplete, setOnboardingComplete] = useState(
    localStorage.getItem('onboardingComplete') === 'true'
  );

  const [isOffline, setIsOffline] = useState(false);

  // Splash screen logic (only when not onboarded)
  if (!onboardingComplete && location.pathname === '/') {
    return <SplashScreen />;
  }

  const navigateTo = (screen: string) => {
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
          <Route path="/dashboard" element={<Dashboard language={language as LanguageKey} />} />
          <Route path="/file-returns" element={<FileReturns language={language as LanguageKey} />} />
          <Route path="/pay-tax" element={<PayTax language={language as LanguageKey} />} />
          <Route path="/ledger" element={<Ledger onNavigate={navigateTo} language={language as LanguageKey} />} />
          <Route path="/profile" element={<Profile language={language as LanguageKey} />} />
          <Route path="/deadlines" element={<UpcomingDeadlines language={language as LanguageKey} />} />
          <Route path="/activity" element={<RecentActivity language={language as LanguageKey} />} />
          <Route path="/notifications" element={<Notifications language={language as LanguageKey} />} />
          <Route path="/education" element={<EducationModule language={language as LanguageKey} />} />
          <Route path="/tax-clearance" element={<TaxClearance language={language as LanguageKey} />} />
          <Route path="/settings" element={<Settings language={language as LanguageKey} />} />
          <Route path="/personal-information" element={<PersonalInformation language={language as LanguageKey} />} />
          <Route path="/language-and-voice" element={<LanguageAndVoice language={language as LanguageKey} onLanguageChange={(lang) => setLanguage(lang)} />} />
          <Route path="/security-and-privacy" element={<SecurityAndPrivacy language={language as LanguageKey} />} />
          <Route path="/two-factor-auth" element={<TwoFactorAuth language={language as LanguageKey} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy language={language as LanguageKey} />} />
          <Route path="/scan" element={<ScanReceipt language={language as LanguageKey} />} />
          <Route path="/voice" element={<VoiceEntry language={language as LanguageKey} />} />

          {/* Catch-all */}
          <Route
            path="*"
            element={<Navigate to="/dashboard" replace />}
          />
        </Routes>

        {/* Bottom Navigation */}
        {onboardingComplete &&
          !['/', '/onboarding'].includes(location.pathname) && (
            <BottomNav />
          )}

        {/* Offline Indicator */}
        {isOffline && (
          <div className="absolute top-14 left-0 right-0 bg-amber-500 text-white px-4 py-2 text-center text-sm z-50">
            Offline Mode Active - 3 entries pending sync
          </div>
        )}
      </div>
    </div>
  );
}
