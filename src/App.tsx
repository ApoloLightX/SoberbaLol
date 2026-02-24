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
  Calculator,
  MessageSquare,
  History
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CHAMPIONS, Champion, ITEMS, RUNES } from './data/wildrift';
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
  const [selectedChampGold, setSelectedChampGold] = useState<Champion | null>(null);

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
      prompt = `Analise o matchup de Wild Rift: ${data.myChamp.name} vs ${data.enemyChamp.name}. Considere o patch atual 7.0c. Forneça dicas de micro (mecânica) e macro (objetivos). Responda em Markdown em PT-BR.`;
    } else if (type === 'gold') {
      prompt = `Estou jogando de ${data.myChamp?.name || 'um campeão'} no Wild Rift com ${data.gold} de ouro aos ${data.time} min. Quais itens devo priorizar agora no patch 7.0c? Considere se estou na frente ou atrás. Responda em PT-BR.`;
    } else if (type === 'teamcomp') {
      prompt = `Analise esta composição de equipe no Wild Rift. Aliados: ${data.allies.map((c: any) => c.name).join(', ')}. Inimigos: ${data.enemies.map((c: any) => c.name).join(', ')}. Qual a condição de vitória (Win Condition) e como devemos lutar as Teamfights? Responda em PT-BR.`;
    } else if (type === 'runes') {
      prompt = `Quais as melhores runas para ${data.champ.name} no Wild Rift (Patch 7.0c) para a rota ${data.champ.role}? Explique a escolha da Keystone e das runas secundárias. Responda em PT-BR.`;
    } else if (type === 'custom') {
      prompt = data.prompt;
    }

    const result = await getAdaptiveAdvice(prompt);
    setAdvice(result || "Erro ao obter conselhos.");
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-rift-dark overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      <nav className="w-64 bg-rift-gray border-r border-white/5 flex flex-col p-4 gap-1 overflow-y-auto">
        <div className="flex items-center gap-3 px-4 py-6 mb-4">
          <div className="w-10 h-10 bg-rift-accent rounded-lg flex items-center justify-center">
            <Zap className="text-rift-dark fill-rift-dark" size={24} />
          </div>
          <h1 className="font-display font-bold text-xl tracking-tight">SOBERBA RIFT</h1>
        </div>

        <NavItem active={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} icon={<LayoutDashboard size={18} />} label="Dashboard" />
        <NavItem active={activeView === 'matchup'} onClick={() => setActiveView('matchup')} icon={<Swords size={18} />} label="Matchups" />
        <NavItem active={activeView === 'gold'} onClick={() => setActiveView('gold')} icon={<Coins size={18} />} label="Motor de Ouro" />
        <NavItem active={activeView === 'draft'} onClick={() => setActiveView('draft')} icon={<Users size={18} />} label="Simulador de Draft" />
        <NavItem active={activeView === 'builder'} onClick={() => setActiveView('builder')} icon={<Calculator size={18} />} label="Construtor de Builds" />
        <NavItem active={activeView === 'live'} onClick={() => setActiveView('live')} icon={<Timer size={18} />} label="Assistente Live" />
        <NavItem active={activeView === 'coach'} onClick={() => setActiveView('coach')} icon={<Brain size={18} />} label="Coach Pessoal IA" />
        
        <div className="my-4 border-t border-white/5"></div>

        <NavItem active={activeView === 'teamcomp'} onClick={() => setActiveView('teamcomp')} icon={<ShieldAlert size={18} />} label="Análise de Comp" />
        <NavItem active={activeView === 'runes'} onClick={() => setActiveView('runes')} icon={<Zap size={18} />} label="Explorador de Runas" />
        <NavItem active={activeView === 'overview'} onClick={() => setActiveView('overview')} icon={<Target size={18} />} label="Roadmap / Meta" />

        <div className="mt-auto p-4 glass-panel text-[10px] text-white/40">
          <p className="font-bold text-rift-accent">Soberba Rift v7.0.0-C</p>
          <p>Focado em Ranked & High Elo</p>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 overflow-y-auto p-8 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rift-blue/5 via-transparent to-transparent">
        <AnimatePresence mode="wait">
          
          {/* DASHBOARD */}
          {activeView === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
              <header>
                <h2 className="text-4xl font-display font-extrabold mb-2 uppercase tracking-tighter gradient-text">BEM-VINDO AO SOBERBA</h2>
                <p className="text-white/60">Sua vantagem estratégica definitiva no Wild Rift.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Meta Atual" value="Tanks & Escalonamento" icon={<TrendingUp className="text-rift-accent" />} />
                <StatCard title="Win Rate Sugerido" value="58.4%" icon={<Target className="text-rift-blue" />} />
                <StatCard title="Patch Ativo" value="7.0c" icon={<Info className="text-rift-gold" />} />
              </div>
              
              <div className="glass-panel p-8 space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Zap className="text-rift-accent" size={20} />
                  Acesso Rápido
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <QuickAction onClick={() => setActiveView('live')} label="Iniciar Assistente" sub="Para sua match agora" />
                  <QuickAction onClick={() => setActiveView('matchup')} label="Ver Counter" sub="Contra seu oponente" />
                  <QuickAction onClick={() => setActiveView('builder')} label="Nova Build" sub="Otimizar seu dano" />
                  <QuickAction onClick={() => setActiveView('coach')} label="Análise de Perfil" sub="Melhorar seu macro" />
                </div>
              </div>
            </motion.div>
          )}

          {/* MATCHUP */}
          {activeView === 'matchup' && (
            <motion.div key="matchup" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <header>
                <h2 className="text-3xl font-display font-bold">Inteligência de Matchup</h2>
                <p className="text-white/60">Selecione os campeões para descobrir como vencer a rota.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-rift-blue uppercase">Seu Campeão</h4>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
                    <input type="text" placeholder="Buscar..." onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:border-rift-blue mb-2" />
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-48 overflow-y-auto p-1">
                    {filteredChampions.map(c => (
                      <button key={c.id} onClick={() => setMyChamp(c)} className={`p-2 rounded text-[10px] font-bold border transition-all ${myChamp?.id === c.id ? 'border-rift-blue bg-rift-blue/20 text-white' : 'border-white/5 bg-white/5 text-white/40 hover:bg-white/10'}`}>{c.name}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-rift-red uppercase">Campeão Inimigo</h4>
                  <div className="h-[38px] mb-2"></div> {/* Spacer to align with search */}
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-48 overflow-y-auto p-1">
                    {filteredChampions.map(c => (
                      <button key={c.id} onClick={() => setEnemyChamp(c)} className={`p-2 rounded text-[10px] font-bold border transition-all ${enemyChamp?.id === c.id ? 'border-rift-red bg-rift-red/20 text-white' : 'border-white/5 bg-white/5 text-white/40 hover:bg-white/10'}`}>{c.name}</button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center pt-4">
                <button disabled={!myChamp || !enemyChamp || loading} onClick={() => handleGetAdvice('matchup', { myChamp, enemyChamp })} className="btn-primary w-full md:w-64 flex items-center justify-center gap-2">
                  {loading ? 'Processando...' : <><Swords size={18} /> Gerar Estratégia</>}
                </button>
              </div>

              {advice && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel p-8 prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap leading-relaxed">{advice}</div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* MOTOR DE OURO */}
          {activeView === 'gold' && (
            <motion.div key="gold" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <header>
                <h2 className="text-3xl font-display font-bold text-rift-gold">Motor de Ouro</h2>
                <p className="text-white/60">Otimize suas compras com base no tempo de jogo e economia.</p>
              </header>
              <div className="glass-panel p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-white/60">Seu Campeão</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-rift-gold" onChange={(e) => setSelectedChampGold(CHAMPIONS.find(c => c.id === e.target.value) || null)}>
                      <option value="">Selecione...</option>
                      {CHAMPIONS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-white/60">Tempo de Jogo (Minutos)</label>
                    <div className="flex items-center gap-4">
                      <input type="range" min="1" max="25" value={gameTime} onChange={(e) => setGameTime(parseInt(e.target.value))} className="flex-1 accent-rift-gold" />
                      <span className="text-xl font-mono font-bold w-12">{gameTime}:00</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-white/60">Ouro Atual: <span className="text-rift-gold">{currentGold}g</span></label>
                  <input type="range" min="0" max="20000" step="100" value={currentGold} onChange={(e) => setCurrentGold(parseInt(e.target.value))} className="w-full accent-rift-gold" />
                </div>
                <button disabled={!selectedChampGold || loading} onClick={() => handleGetAdvice('gold', { myChamp: selectedChampGold, gold: currentGold, time: gameTime })} className="w-full py-4 bg-rift-gold text-rift-dark font-bold rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50">
                  {loading ? 'Calculando Melhor Build...' : 'O que devo comprar agora?'}
                </button>
              </div>
              {advice && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-8 prose prose-invert max-w-none border-l-4 border-l-rift-gold">
                  <div className="whitespace-pre-wrap">{advice}</div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* RUNAS */}
          {activeView === 'runes' && (
            <motion.div key="runes" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <header>
                <h2 className="text-3xl font-display font-bold text-rift-accent">Explorador de Runas</h2>
                <p className="text-white/60">Descubra a melhor configuração de runas para cada situação.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-6 space-y-4">
                  <h4 className="font-bold text-rift-accent">Selecione o Campeão</h4>
                  <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto p-1">
                    {CHAMPIONS.map(c => (
                      <button key={c.id} onClick={() => handleGetAdvice('runes', { champ: c })} className="p-2 bg-white/5 border border-white/10 rounded text-[10px] hover:border-rift-accent transition-colors">{c.name}</button>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  {loading ? (
                    <div className="glass-panel p-12 flex flex-col items-center justify-center text-white/20">
                      <Zap className="animate-pulse mb-4" size={48} />
                      <p>Consultando o Oráculo das Runas...</p>
                    </div>
                  ) : advice ? (
                    <div className="glass-panel p-8 prose prose-invert max-w-none border-t-4 border-t-rift-accent">
                      <div className="whitespace-pre-wrap">{advice}</div>
                    </div>
                  ) : (
                    <div className="glass-panel p-12 flex flex-col items-center justify-center text-white/20 text-center">
                      <Zap className="mb-4" size={48} />
                      <p>Selecione um campeão para ver as runas recomendadas para o Patch 7.0c.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ROADMAP / OVERVIEW */}
          {activeView === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <header>
                <h2 className="text-3xl font-display font-bold">Roadmap & Meta Report</h2>
                <p className="text-white/60">O que está por vir e o que domina o Rift hoje.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-panel p-8 space-y-6">
                  <h3 className="text-xl font-bold text-rift-accent flex items-center gap-2">
                    <History size={20} />
                    Status do Projeto
                  </h3>
                  <div className="space-y-4">
                    <RoadmapItem status="complete" label="Banco de Dados Wild Rift 7.0c" date="Fev 2026" />
                    <RoadmapItem status="complete" label="Motor de IA Gemini Integrado" date="Fev 2026" />
                    <RoadmapItem status="current" label="Assistente de Partida em Tempo Real" date="Em progresso" />
                    <RoadmapItem status="upcoming" label="Integração com API de Perfil (Beta)" date="Mar 2026" />
                  </div>
                </div>
                <div className="glass-panel p-8 space-y-6">
                  <h3 className="text-xl font-bold text-rift-blue flex items-center gap-2">
                    <TrendingUp size={20} />
                    Tier List Resumida (S+)
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between p-3 bg-white/5 rounded-lg border-l-4 border-l-rift-accent">
                      <span className="font-bold">Baron Lane</span>
                      <span className="text-white/60">Aatrox, Sett, Volibear</span>
                    </div>
                    <div className="flex justify-between p-3 bg-white/5 rounded-lg border-l-4 border-l-rift-blue">
                      <span className="font-bold">Jungle</span>
                      <span className="text-white/60">Viego, Lee Sin, Hecarim</span>
                    </div>
                    <div className="flex justify-between p-3 bg-white/5 rounded-lg border-l-4 border-l-rift-gold">
                      <span className="font-bold">Mid Lane</span>
                      <span className="text-white/60">Syndra, Yone, Akali</span>
                    </div>
                    <div className="flex justify-between p-3 bg-white/5 rounded-lg border-l-4 border-l-rift-red">
                      <span className="font-bold">Dragon Lane</span>
                      <span className="text-white/60">Kalista, Zeri, Lucian</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SIMULADOR DE DRAFT */}
          {activeView === 'draft' && (
            <motion.div key="draft" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <DraftSimulator />
            </motion.div>
          )}

          {/* CONSTRUTOR DE BUILDS */}
          {activeView === 'builder' && (
            <motion.div key="builder" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <BuildCalculator />
            </motion.div>
          )}

          {/* ASSISTENTE LIVE */}
          {activeView === 'live' && (
            <motion.div key="live" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <LiveAssistant />
            </motion.div>
          )}

          {/* COACH IA */}
          {activeView === 'coach' && (
            <motion.div key="coach" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <AICoach />
            </motion.div>
          )}

          {/* ANÁLISE DE COMP */}
          {activeView === 'teamcomp' && (
            <motion.div key="teamcomp" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
               <header>
                <h2 className="text-3xl font-display font-bold text-rift-red">Análise de Composição</h2>
                <p className="text-white/60">Entenda os pontos fortes e fracos da sua equipe vs inimigos.</p>
              </header>
              <div className="glass-panel p-12 flex flex-col items-center justify-center text-white/20 text-center">
                <Users className="mb-4" size={48} />
                <p>Esta funcionalidade está sendo integrada ao Simulador de Draft para uma experiência mais fluida.</p>
                <button onClick={() => setActiveView('draft')} className="mt-4 text-rift-accent hover:underline">Ir para Simulador de Draft</button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}

function NavItem({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-rift-accent text-rift-dark font-bold shadow-[0_0_20px_rgba(0,255,136,0.2)]' : 'text-white/60 hover:bg-white/5'}`}>
      {icon} <span className="text-sm">{label}</span> {active && <ChevronRight className="ml-auto" size={16} />}
    </button>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="glass-panel p-6 flex items-center gap-4 border-b-2 border-b-transparent hover:border-b-rift-accent transition-all">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">{icon}</div>
      <div>
        <p className="text-[10px] text-white/40 uppercase font-extrabold tracking-widest">{title}</p>
        <p className="text-xl font-display font-bold">{value}</p>
      </div>
    </div>
  );
}

function QuickAction({ onClick, label, sub }: { onClick: () => void, label: string, sub: string }) {
  return (
    <button onClick={onClick} className="p-4 bg-white/5 border border-white/10 rounded-xl text-left hover:bg-white/10 hover:border-rift-accent/50 transition-all group">
      <p className="font-bold text-sm group-hover:text-rift-accent transition-colors">{label}</p>
      <p className="text-[10px] text-white/40">{sub}</p>
    </button>
  );
}

function RoadmapItem({ status, label, date }: { status: 'complete' | 'current' | 'upcoming', label: string, date: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className={`w-3 h-3 rounded-full ${status === 'complete' ? 'bg-rift-accent' : status === 'current' ? 'bg-rift-blue animate-pulse' : 'bg-white/20'}`}></div>
      <div className="flex-1">
        <p className={`text-sm ${status === 'upcoming' ? 'text-white/40' : 'text-white'}`}>{label}</p>
        <p className="text-[10px] text-white/20">{date}</p>
      </div>
    </div>
  );
}
