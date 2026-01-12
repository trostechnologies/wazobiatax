import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LanguageSelection } from './components/LanguageSelection';
import { VoiceModeToggle } from './components/VoiceModeToggle';
import { TINRegistrationFlow } from './components/TINRegistrationFlow';
import { OnboardingWizard } from './components/OnboardingWizardMultilingual';
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
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [language, setLanguage] = useState('english');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Simulate splash screen duration
    const timer = setTimeout(() => {
      setCurrentScreen('language');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLanguageSelect = (lang: string) => {
    setLanguage(lang);
    setCurrentScreen('onboarding');
  };

  const handleTINRegistrationFlowComplete = () => {
    setCurrentScreen('dashboard');
  };

  const handleVoiceModeSelect = (enabled: boolean) => {
    setVoiceEnabled(enabled);
    setCurrentScreen('tinRegistration');
  };

  const handleOnboardingComplete = () => {
    setOnboardingComplete(true);
    setCurrentScreen('voiceMode');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home') setCurrentScreen('dashboard');
    else if (tab === 'file') setCurrentScreen('fileReturns');
    else if (tab === 'pay') setCurrentScreen('payTax');
    else if (tab === 'ledger') setCurrentScreen('ledger');
    else if (tab === 'profile') setCurrentScreen('profile');
  };

  const navigateTo = (screen: string) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'language':
        return <LanguageSelection onSelect={handleLanguageSelect} />;
        case 'onboarding':
          return <OnboardingWizard onComplete={handleOnboardingComplete} />;
      case 'voiceMode':
        return <VoiceModeToggle onSelect={handleVoiceModeSelect} />;
      case 'tinRegistration':
        return <TINRegistrationFlow onComplete={handleTINRegistrationFlowComplete} />;
      case 'dashboard':
        return <Dashboard onNavigate={navigateTo} />;
      case 'fileReturns':
        return <FileReturns onNavigate={navigateTo} />;
      case 'payTax':
        return <PayTax onNavigate={navigateTo} />;
      case 'ledger':
        return <Ledger onNavigate={navigateTo} />;
      case 'profile':
        return <Profile onNavigate={navigateTo} />;
      case 'upcomingDeadlines':
        return <UpcomingDeadlines onNavigate={navigateTo} />;
      case 'recentActivity':
        return <RecentActivity onNavigate={navigateTo} />;
      case 'notifications':
        return <Notifications onNavigate={navigateTo} />;
      case 'education':
        return <EducationModule onNavigate={navigateTo} />;
      case 'taxClearance':
        return <TaxClearance onNavigate={navigateTo} />;
      case 'settings':
        return <Settings onNavigate={navigateTo} />;
      default:
        return <Dashboard onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-50">
      {/* Mobile Frame - iPhone 14 size */}
      <div className="mx-auto max-w-[390px] min-h-screen bg-white relative overflow-hidden">
        {renderScreen()}
        
        {/* Bottom Navigation - Show only after onboarding */}
        {onboardingComplete && !['splash', 'language', 'voiceMode', 'tinRegistration'].includes(currentScreen) && (
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
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
