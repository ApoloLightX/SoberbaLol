/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Swords, 
  Coins, 
  Users, 
  ShieldAlert, 
  Search, 
  ChevronRight,
  Zap,
  Target,
  TrendingUp,
  Info,
  Timer,
  Brain,
  Calculator
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CHAMPIONS, Champion } from './data/wildrift';
import { getAdaptiveAdvice } from './services/geminiService';

import DraftSimulator from './components/DraftSimulator';
import BuildCalculator from './components/BuildCalculator';
import LiveAssistant from './components/LiveAssistant';
import AICoach from './components/AICoach';

type View = 'dashboard' | 'matchup' | 'gold' | 'teamcomp' | 'builds' | 'runes' | 'overview' | 'draft' | 'builder' | 'live' | 'coach';

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);

  // Filters
  const [champFilter, setChampFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // State for Matchup
  const [myChamp, setMyChamp] = useState<Champion | null>(null);
  const [enemyChamp, setEnemyChamp] = useState<Champion | null>(null);

  // State for Gold Engine
  const [currentGold, setCurrentGold] = useState<number>(1000);
  const [gameTime, setGameTime] = useState<number>(5);

  const filteredChampions = CHAMPIONS.filter(c => {
    const matchesRole = champFilter === 'All' || c.role === champFilter;
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const handleGetAdvice = async (type: string, data: any) => {
    setLoading(true);
    setAdvice(null);
    
    let prompt = "";
    if (type === 'matchup') {
      prompt = `Analise o matchup de Wild Rift: ${data.myChamp.name} vs ${data.enemyChamp.name}. Considere patch 7.0c. Responda em Markdown em PT-BR.`;
    } else if (type === 'gold') {
      prompt = `Estou jogando de ${data.myChamp?.name || 'um campeão'} no Wild Rift com ${data.gold} de ouro aos ${data.time} min. O que comprar no patch 7.0c? Responda em PT-BR.`;
    } else if (type === 'teamcomp') {
      prompt = `Analise esta comp de Wild Rift. Aliados: ${data.allies.map((c: any) => c.name).join(', ')}. Inimigos: ${data.enemies.map((c: any) => c.name).join(', ')}. Plano de vitória em PT-BR.`;
    } else if (type === 'custom') {
      prompt = data.prompt;
    }

    const result = await getAdaptiveAdvice(prompt);
    setAdvice(result || "Erro ao obter conselhos.");
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-rift-dark overflow-hidden">
      
      {/* --- SIDEBAR (CONTROLE REMOTO) --- */}
      <nav className="w-64 bg-rift-gray border-r border-white/5 flex flex-col p-4 gap-2">
        <div className="flex items-center gap-3 px-4 py-6 mb-4">
          <div className="w-10 h-10 bg-rift-accent rounded-lg flex items-center justify-center">
            <Zap className="text-rift-dark fill-rift-dark" size={24} />
          </div>
          <h1 className="font-display font-bold text-xl tracking-tight">SOBERBA RIFT</h1>
        </div>

        <NavItem active={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} icon={<LayoutDashboard size={20} />} label="Dashboard" />
        <NavItem active={activeView === 'matchup'} onClick={() => setActiveView('matchup')} icon={<Swords size={20} />} label="Matchups" />
        <NavItem active={activeView === 'gold'} onClick={() => setActiveView('gold')} icon={<Coins size={20} />} label="Motor de Ouro" />
        <NavItem active={activeView === 'draft'} onClick={() => setActiveView('draft')} icon={<Users size={20} />} label="Simulador de Draft" />
        <NavItem active={activeView === 'builder'} onClick={() => setActiveView('builder')} icon={<Calculator size={20} />} label="Construtor de Builds" />
        <NavItem active={activeView === 'live'} onClick={() => setActiveView('live')} icon={<Timer size={20} />} label="Assistente Live" />
        <NavItem active={activeView === 'coach'} onClick={() => setActiveView('coach')} icon={<Brain size={20} />} label="Coach Pessoal IA" />
        
        <div className="my-4 border-t border-white/5"></div>

        <NavItem active={activeView === 'teamcomp'} onClick={() => setActiveView('teamcomp')} icon={<Users size={20} />} label="Análise de Comp" />
        <NavItem active={activeView === 'runes'} onClick={() => setActiveView('runes')} icon={<Zap size={20} />} label="Runas" />
        <NavItem active={activeView === 'overview'} onClick={() => setActiveView('overview')} icon={<Target size={20} />} label="Roadmap" />

        <div className="mt-auto p-4 glass-panel text-xs text-white/40">
          <p>Versão 7.0.0-C</p>
          <p>Exclusivo Wild Rift</p>
        </div>
      </nav>

      {/* --- MAIN CONTENT (A TELA DA TV) --- */}
      <main className="flex-1 overflow-y-auto p-8">
        <AnimatePresence mode="wait">
          
          {/* DASHBOARD */}
          {activeView === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
              <header>
                <h2 className="text-4xl font-display font-extrabold mb-2 uppercase tracking-tighter">SOBERBA RIFT</h2>
                <p className="text-white/60">Sua vantagem estratégica em tempo real começa aqui.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Meta Atual" value="Hypercarries & Tanks" icon={<TrendingUp className="text-rift-accent" />} />
                <StatCard title="Win Rate Médio" value="56.8%" icon={<Target className="text-rift-blue" />} />
                <StatCard title="Patch" value="7.0c" icon={<Info className="text-rift-gold" />} />
              </div>
            </motion.div>
          )}

          {/* MATCHUP */}
          {activeView === 'matchup' && (
            <motion.div key="matchup" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <header>
                <h2 className="text-3xl font-display font-bold">Inteligência de Matchup</h2>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto">
                   {filteredChampions.map(c => (
                     <button key={c.id} onClick={() => setMyChamp(c)} className={`p-2 rounded border ${myChamp?.id === c.id ? 'border-rift-accent bg-rift-accent/10' : 'border-white/10'}`}>{c.name}</button>
                   ))}
                </div>
                <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto">
                   {filteredChampions.map(c => (
                     <button key={c.id} onClick={() => setEnemyChamp(c)} className={`p-2 rounded border ${enemyChamp?.id === c.id ? 'border-rift-red bg-rift-red/10' : 'border-white/10'}`}>{c.name}</button>
                   ))}
                </div>
              </div>
              <button disabled={!myChamp || !enemyChamp || loading} onClick={() => handleGetAdvice('matchup', { myChamp, enemyChamp })} className="btn-primary w-full">
                {loading ? 'Analisando...' : 'Gerar Estratégia'}
              </button>
              {advice && <div className="glass-panel p-6 whitespace-pre-wrap">{advice}</div>}
            </motion.div>
          )}

          {/* SIMULADOR DE DRAFT CONECTADO */}
          {activeView === 'draft' && (
            <motion.div key="draft" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <DraftSimulator onAction={(data: any) => handleGetAdvice('teamcomp', data)} loading={loading} />
            </motion.div>
          )}

          {/* CONSTRUTOR DE BUILDS CONECTADO */}
          {activeView === 'builder' && (
            <motion.div key="builder" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <BuildCalculator onAction={(data: any) => handleGetAdvice('gold', data)} loading={loading} />
            </motion.div>
          )}

          {/* COACH IA CONECTADO */}
          {activeView === 'coach' && (
            <motion.div key="coach" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <AICoach onAction={(prompt: string) => handleGetAdvice('custom', { prompt })} loading={loading} />
            </motion.div>
          )}

          {/* OUTRAS VIEWS (LIVE, TEAMCOMP, ETC) PODEM SER ADICIONADAS AQUI SEGUINDO O MESMO PADRÃO */}

        </AnimatePresence>
      </main>
    </div>
  );
}

function NavItem({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-rift-accent text-rift-dark font-bold' : 'text-white/60 hover:bg-white/5'}`}>
      {icon} <span className="text-sm">{label}</span> {active && <ChevronRight className="ml-auto" size={16} />}
    </button>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="glass-panel p-6 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">{icon}</div>
      <div>
        <p className="text-xs text-white/40 uppercase font-bold">{title}</p>
        <p className="text-xl font-display font-bold">{value}</p>
      </div>
    </div>
  );
}
