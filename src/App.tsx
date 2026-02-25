import React, { createContext, useState, useContext } from 'react';
import { Menu, X, Home, Brain, Swords, Users, Shield, Calculator, Clock, Zap, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import './styles/elite.css';

import DashboardV2 from './components/DashboardV2';
import AICoach from './components/AICoach';
import DraftSimulator from './components/DraftSimulator';
import TeamCompAnalyzer from './components/TeamCompAnalyzer';
import AdaptiveBuilds from './components/AdaptiveBuilds';
import BuildCalculator from './components/BuildCalculator';
import LiveAssistant from './components/LiveAssistant';
import RuneExplorer from './components/RuneExplorer';
import MetaRoadmap from './components/MetaRoadmap';

type View = 'home' | 'coach' | 'draft' | 'teamcomp' | 'adaptive' | 'builder' | 'live' | 'runes' | 'meta';

interface NavigationContextType {
  activeView: View;
  setActiveView: (view: View) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};

const MENU_ITEMS: { id: View; label: string; icon: React.ReactNode }[] = [
  { id: 'home', label: 'Home', icon: <Home size={20} /> },
  { id: 'coach', label: 'Coach', icon: <Brain size={20} /> },
  { id: 'draft', label: 'Draft', icon: <Swords size={20} /> },
  { id: 'teamcomp', label: 'Comp', icon: <Users size={20} /> },
  { id: 'adaptive', label: 'Builds', icon: <Shield size={20} /> },
  { id: 'builder', label: 'Calc', icon: <Calculator size={20} /> },
  { id: 'live', label: 'Live', icon: <Clock size={20} /> },
  { id: 'runes', label: 'Runes', icon: <Zap size={20} /> },
  { id: 'meta', label: 'Meta', icon: <Target size={20} /> },
];

function AppContent() {
  const { activeView, setActiveView } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = (view: View) => {
    setActiveView(view);
    setSidebarOpen(false);
  };

  const renderView = () => {
    switch (activeView) {
      case 'home': return <DashboardV2 />;
      case 'coach': return <AICoach />;
      case 'draft': return <DraftSimulator />;
      case 'teamcomp': return <TeamCompAnalyzer />;
      case 'adaptive': return <AdaptiveBuilds />;
      case 'builder': return <BuildCalculator />;
      case 'live': return <LiveAssistant />;
      case 'runes': return <RuneExplorer />;
      case 'meta': return <MetaRoadmap />;
      default: return <DashboardV2 />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0f1419] text-white overflow-hidden">
      {/* HEADER */}
      <header className="h-14 bg-[#0f1419] border-b border-[#2d3748] flex items-center justify-between px-4 z-40 flex-shrink-0">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-[#1a1f2e] rounded-lg transition-colors lg:hidden"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>

        <h1 className="text-lg font-bold tracking-tight hidden sm:block">SOBERBA</h1>

        <div className="text-xs text-[#6b7280]">v3.9</div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR - Desktop */}
        <motion.aside
          initial={{ x: -280 }}
          animate={{ x: sidebarOpen ? 0 : -280 }}
          transition={{ type: 'spring', stiffness: 400, damping: 40 }}
          className="fixed left-0 top-14 bottom-16 lg:bottom-0 w-72 bg-[#0f1419] border-r border-[#2d3748] z-30 lg:static lg:translate-x-0 lg:bottom-auto overflow-y-auto"
        >
          <nav className="p-2">
            {MENU_ITEMS.map((item) => (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeView === item.id
                    ? 'bg-[#10b981] text-white'
                    : 'text-[#a0a9b8] hover:bg-[#1a1f2e] hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </motion.aside>

        {/* OVERLAY */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full pb-20 lg:pb-8"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* BOTTOM NAV - Mobile */}
      <nav className="h-16 bg-[#0f1419] border-t border-[#2d3748] flex items-center justify-around lg:hidden z-20 flex-shrink-0">
        {MENU_ITEMS.slice(0, 5).map((item) => (
          <motion.button
            key={item.id}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleMenuClick(item.id)}
            className={`flex flex-col items-center gap-1 p-2 text-xs font-medium transition-colors ${
              activeView === item.id
                ? 'text-[#10b981]'
                : 'text-[#6b7280] hover:text-[#a0a9b8]'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </motion.button>
        ))}
      </nav>
    </div>
  );
}

export default function App() {
  const [activeView, setActiveView] = useState<View>('home');

  return (
    <NavigationContext.Provider value={{ activeView, setActiveView }}>
      <AppContent />
    </NavigationContext.Provider>
  );
}
