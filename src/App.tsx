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

export default function App() {
  const location = useLocation();

  const [onboardingComplete, setOnboardingComplete] = useState(
    localStorage.getItem('onboardingComplete') === 'true'
  );

  const [isOffline, setIsOffline] = useState(false);

  // Splash screen logic (only when not onboarded)
  if (!onboardingComplete && location.pathname === '/') {
    return <SplashScreen />;
  }

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/file-returns" element={<FileReturns />} />
          <Route path="/pay-tax" element={<PayTax />} />
          <Route path="/ledger" element={<Ledger />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/deadlines" element={<UpcomingDeadlines />} />
          <Route path="/activity" element={<RecentActivity />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/education" element={<EducationModule />} />
          <Route path="/tax-clearance" element={<TaxClearance />} />
          <Route path="/settings" element={<Settings />} />

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
