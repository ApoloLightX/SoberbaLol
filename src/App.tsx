import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Brain, Swords, Users, Shield, Calculator, Zap, Target, Clock } from 'lucide-react';
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

const MENU_ITEMS: { id: View; label: string; icon: React.ReactNode }[] = [
  { id: 'home', label: 'Home', icon: <Home size={20} /> },
  { id: 'coach', label: 'Coach IA', icon: <Brain size={20} /> },
  { id: 'draft', label: 'Draft', icon: <Swords size={20} /> },
  { id: 'teamcomp', label: 'Comp', icon: <Users size={20} /> },
  { id: 'adaptive', label: 'Builds', icon: <Shield size={20} /> },
  { id: 'builder', label: 'Calc', icon: <Calculator size={20} /> },
  { id: 'live', label: 'Live', icon: <Clock size={20} /> },
  { id: 'runes', label: 'Runes', icon: <Zap size={20} /> },
  { id: 'meta', label: 'Meta', icon: <Target size={20} /> },
];

export default function App() {
  const [activeView, setActiveView] = useState<View>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleNavigate = (e: CustomEvent) => {
      setActiveView(e.detail);
      setSidebarOpen(false);
    };
    window.addEventListener('navigate' as any, handleNavigate);
    return () => window.removeEventListener('navigate' as any, handleNavigate);
  }, []);

  const handleMenuClick = (view: View) => {
    setActiveView(view);
    setSidebarOpen(false);
  };

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <DashboardV2 />;
      case 'coach':
        return <AICoach />;
      case 'draft':
        return <DraftSimulator />;
      case 'teamcomp':
        return <TeamCompAnalyzer />;
      case 'adaptive':
        return <AdaptiveBuilds />;
      case 'builder':
        return <BuildCalculator />;
      case 'live':
        return <LiveAssistant />;
      case 'runes':
        return <RuneExplorer />;
      case 'meta':
        return <MetaRoadmap />;
      default:
        return <DashboardV2 />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gradient-to-br from-[#0a0e27] via-[#050710] to-[#0a0e27] text-white overflow-hidden">
      {/* HEADER - Mobile First */}
      <header className="fixed top-0 left-0 right-0 h-14 sm:h-16 bg-[#0a0e27]/95 backdrop-blur-md border-b border-[#00ff88]/10 z-40 flex items-center justify-between px-3 sm:px-6">
        <motion.button
          whileHap={{ scale: 0.95 }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-white/10 rounded-lg transition-all"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#00ff88] to-[#2688f2] rounded-lg flex items-center justify-center shadow-lg shadow-[#00ff88]/50">
            <Zap size={16} className="text-[#0a0e27]" />
          </div>
          <h1 className="font-display font-bold text-base sm:text-lg tracking-wider">SOBERBA</h1>
        </div>

        <div className="text-[9px] sm:text-[10px] text-white/40 text-right">
          <p className="font-bold text-[#00ff88]">v3.5</p>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex flex-1 pt-14 sm:pt-16 overflow-hidden">
        {/* SIDEBAR - Mobile Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            />
          )}
        </AnimatePresence>

        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: sidebarOpen ? 0 : -300 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed left-0 top-14 sm:top-16 bottom-0 w-64 bg-[#0a0e27]/95 backdrop-blur-md border-r border-[#00ff88]/10 z-30 lg:static lg:translate-x-0 overflow-y-auto custom-scrollbar"
        >
          <nav className="p-4 space-y-2">
            {MENU_ITEMS.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeView === item.id
                    ? 'bg-[#00ff88] text-[#0a0e27] font-bold'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </motion.aside>

        {/* CONTENT AREA */}
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* BOTTOM NAV - Mobile Only */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#0a0e27]/95 backdrop-blur-md border-t border-[#00ff88]/10 z-20 lg:hidden flex items-center justify-around px-2">
        {MENU_ITEMS.slice(0, 5).map((item) => (
          <motion.button
            key={item.id}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleMenuClick(item.id)}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
              activeView === item.id
                ? 'text-[#00ff88]'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            {item.icon}
            <span className="text-[10px] font-bold">{item.label}</span>
          </motion.button>
        ))}
      </nav>

      {/* PADDING FOR BOTTOM NAV */}
      <div className="h-16 lg:hidden" />
    </div>
  );
}
