/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SOBERBA RIFT v3.1 - CORE APPLICATION
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Swords, 
  Coins, 
  Users, 
  ShieldAlert, 
  Zap,
  Target,
  Brain,
  Calculator,
  Timer,
  Menu,
  X,
  Bug
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import './styles/theme.css';

import DraftSimulator from './components/DraftSimulator';
import BuildCalculator from './components/BuildCalculator';
import LiveAssistant from './components/LiveAssistant';
import AICoach from './components/AICoach';
import RuneExplorer from './components/RuneExplorer';
import TeamCompAnalyzer from './components/TeamCompAnalyzer';
import AdaptiveBuilds from './components/AdaptiveBuilds';
import MetaRoadmap from './components/MetaRoadmap';
import DashboardV2 from './components/DashboardV2';
import UIInspector from './components/UIInspector';

type View = 'dashboard' | 'matchup' | 'gold' | 'teamcomp' | 'builds' | 'runes' | 'overview' | 'draft' | 'builder' | 'live' | 'coach' | 'adaptive' | 'inspector';

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateTo = (view: View) => {
    setActiveView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-rift-dark overflow-hidden text-white font-sans">
      
      {/* --- MOBILE HEADER --- */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-rift-gray border-b border-white/5 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-2">
          <Zap className="text-rift-accent" size={20} />
          <span className="font-display font-bold tracking-tight">SOBERBA RIFT</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white/60">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- SIDEBAR --- */}
      <nav className={`
        fixed inset-0 lg:relative lg:inset-auto z-40 w-full lg:w-64 bg-rift-gray border-r border-white/5 flex flex-col p-4 gap-1 overflow-y-auto transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="hidden lg:flex items-center gap-3 px-4 py-6 mb-4">
          <div className="w-10 h-10 bg-rift-accent rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,255,136,0.4)]">
            <Zap className="text-rift-dark fill-rift-dark" size={24} />
          </div>
          <h1 className="font-display font-bold text-xl tracking-tight">SOBERBA RIFT</h1>
        </div>

        <div className="lg:hidden h-16"></div> {/* Spacer for mobile header */}

        <NavItem active={activeView === 'dashboard'} onClick={() => navigateTo('dashboard')} icon={<LayoutDashboard size={18} />} label="Dashboard" />
        <NavItem active={activeView === 'coach'} onClick={() => navigateTo('coach')} icon={<Brain size={18} />} label="Coach Pessoal IA" />
        <NavItem active={activeView === 'matchup'} onClick={() => navigateTo('matchup')} icon={<Swords size={18} />} label="Matchups" />
        <NavItem active={activeView === 'adaptive'} onClick={() => navigateTo('adaptive')} icon={<ShieldAlert size={18} />} label="Builds Adaptativas" />
        
        <div className="my-4 border-t border-white/5"></div>

        <NavItem active={activeView === 'draft'} onClick={() => navigateTo('draft')} icon={<Users size={18} />} label="Simulador de Draft" />
        <NavItem active={activeView === 'teamcomp'} onClick={() => navigateTo('teamcomp')} icon={<Target size={18} />} label="Análise de Comp" />
        <NavItem active={activeView === 'builder'} onClick={() => navigateTo('builder')} icon={<Calculator size={18} />} label="Construtor de Builds" />
        <NavItem active={activeView === 'live'} onClick={() => navigateTo('live')} icon={<Timer size={18} />} label="Assistente Live" />
        <NavItem active={activeView === 'runes'} onClick={() => navigateTo('runes')} icon={<Zap size={18} />} label="Explorador de Runas" />
        <NavItem active={activeView === 'overview'} onClick={() => navigateTo('overview')} icon={<Target size={18} />} label="Roadmap / Meta" />

        <div className="mt-8 border-t border-white/5 pt-4">
           <NavItem active={activeView === 'inspector'} onClick={() => navigateTo('inspector')} icon={<Bug size={18} />} label="UI Inspector" />
        </div>

        <div className="mt-auto p-4 glass-panel text-[10px] text-white/40">
          <p className="font-bold text-rift-accent">Soberba Rift v7.0.0-C</p>
          <p>Powered by Llama 3.3 70B</p>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rift-blue/5 via-transparent to-transparent pt-20 lg:pt-8 custom-scrollbar">
        <AnimatePresence mode="wait">
          
          {activeView === 'dashboard' && <DashboardV2 />}
          {activeView === 'coach' && <AICoach />}
          {activeView === 'draft' && <DraftSimulator />}
          {activeView === 'builder' && <BuildCalculator />}
          {activeView === 'live' && <LiveAssistant />}
          {activeView === 'runes' && <RuneExplorer />}
          {activeView === 'teamcomp' && <TeamCompAnalyzer />}
          {activeView === 'adaptive' && <AdaptiveBuilds />}
          {activeView === 'overview' && <MetaRoadmap />}
          {activeView === 'inspector' && <UIInspector />}
          
          {/* Enhanced Matchup View with AI Integration */}
          {activeView === 'matchup' && (
            <div className="flex flex-col items-center justify-center h-full text-center p-20 glass-panel border-t-2 border-t-rift-blue">
              <Swords size={64} className="text-rift-blue mb-4 opacity-20" />
              <h3 className="text-2xl font-display font-bold">Módulo de Matchups</h3>
              <p className="text-white/40 max-w-md mb-8">O módulo de matchups foi unificado com o **Coach IA** para fornecer análises mais profundas e precisas via Llama 3.3.</p>
              <button 
                onClick={() => navigateTo('coach')}
                className="px-8 py-3 bg-rift-blue text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(38,136,242,0.3)]"
              >
                Ir para o Coach IA
              </button>
            </div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}

function NavItem({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group
        ${active 
          ? 'bg-rift-blue/10 text-rift-blue border border-rift-blue/20 shadow-[0_0_15px_rgba(38,136,242,0.1)]' 
          : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'}
      `}
    >
      <span className={`${active ? 'text-rift-blue' : 'text-white/20 group-hover:text-white/60'} transition-colors`}>
        {icon}
      </span>
      {label}
      {active && <motion.div layoutId="activeNav" className="ml-auto w-1.5 h-1.5 rounded-full bg-rift-blue" />}
    </button>
  );
}
