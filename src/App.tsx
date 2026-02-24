/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SOBERBA RIFT ELITE v3.2 - CLEAN & POLISHED INTERFACE
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Swords, 
  Users, 
  ShieldAlert, 
  Zap,
  Target,
  Brain,
  Calculator,
  Timer,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import './styles/elite.css';

import DraftSimulator from './components/DraftSimulator';
import BuildCalculator from './components/BuildCalculator';
import LiveAssistant from './components/LiveAssistant';
import AICoach from './components/AICoach';
import RuneExplorer from './components/RuneExplorer';
import TeamCompAnalyzer from './components/TeamCompAnalyzer';
import AdaptiveBuilds from './components/AdaptiveBuilds';
import MetaRoadmap from './components/MetaRoadmap';
import DashboardV2 from './components/DashboardV2';

type View = 'dashboard' | 'coach' | 'draft' | 'teamcomp' | 'adaptive' | 'builder' | 'live' | 'runes' | 'overview';

const MENU_ITEMS: { id: View; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { id: 'coach', label: 'Coach IA', icon: <Brain size={18} /> },
  { id: 'draft', label: 'Draft Simulator', icon: <Swords size={18} /> },
  { id: 'teamcomp', label: 'Team Comp', icon: <Users size={18} /> },
  { id: 'adaptive', label: 'Adaptive Builds', icon: <ShieldAlert size={18} /> },
  { id: 'builder', label: 'Build Calculator', icon: <Calculator size={18} /> },
  { id: 'live', label: 'Live Assistant', icon: <Timer size={18} /> },
  { id: 'runes', label: 'Rune Explorer', icon: <Zap size={18} /> },
  { id: 'overview', label: 'Meta Roadmap', icon: <Target size={18} /> },
];

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = (view: View) => {
    setActiveView(view);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0a0e27] via-[#050710] to-[#0a0e27] text-white font-sans overflow-hidden">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#0a0e27]/80 backdrop-blur-md border-b border-[#00ff88]/10 z-40 flex items-center justify-between px-4 lg:px-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-white/10 rounded-lg transition-all"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#00ff88] to-[#2688f2] rounded-lg flex items-center justify-center shadow-lg shadow-[#00ff88]/50">
            <Zap size={16} className="text-[#0a0e27]" />
          </div>
          <h1 className="font-display font-bold text-lg tracking-wider hidden sm:block">SOBERBA RIFT</h1>
        </div>

        <div className="text-right text-[10px] text-white/40 hidden sm:block">
          <p className="font-bold text-[#00ff88]">v3.2 ELITE</p>
        </div>
      </header>

      {/* SIDEBAR */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
            />

            {/* SIDEBAR MENU */}
            <motion.nav
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-[#1a1f3a] to-[#0a0e27] border-r border-[#00ff88]/10 z-40 pt-20 px-4 overflow-y-auto"
            >
              <div className="space-y-2">
                {MENU_ITEMS.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeView === item.id
                        ? 'bg-gradient-to-r from-[#00ff88]/20 to-transparent border border-[#00ff88]/50 text-[#00ff88] shadow-lg shadow-[#00ff88]/20'
                        : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm font-bold">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto pt-20 px-4 lg:px-8 py-8 custom-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeView === 'dashboard' && <DashboardV2 />}
            {activeView === 'coach' && <AICoach />}
            {activeView === 'draft' && <DraftSimulator />}
            {activeView === 'teamcomp' && <TeamCompAnalyzer />}
            {activeView === 'adaptive' && <AdaptiveBuilds />}
            {activeView === 'builder' && <BuildCalculator />}
            {activeView === 'live' && <LiveAssistant />}
            {activeView === 'runes' && <RuneExplorer />}
            {activeView === 'overview' && <MetaRoadmap />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
