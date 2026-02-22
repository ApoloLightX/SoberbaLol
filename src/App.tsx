/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
import { CHAMPIONS, ITEMS, RUNES, Champion, Item, Rune } from './data/wildrift';
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
  const [itemFilter, setItemFilter] = useState<string>('All');
  const [runeFilter, setRuneFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // State for Matchup
  const [myChamp, setMyChamp] = useState<Champion | null>(null);
  const [enemyChamp, setEnemyChamp] = useState<Champion | null>(null);

  // State for Gold Engine
  const [currentGold, setCurrentGold] = useState<number>(1000);
  const [gameTime, setGameTime] = useState<number>(5);

  // State for Team Comp
  const [allies, setAllies] = useState<Champion[]>([]);
  const [enemies, setEnemies] = useState<Champion[]>([]);

  const filteredChampions = CHAMPIONS.filter(c => {
    const matchesRole = champFilter === 'All' || c.role === champFilter;
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const filteredItems = ITEMS.filter(i => {
    const matchesType = itemFilter === 'All' || i.type === itemFilter;
    const matchesSearch = i.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const filteredRunes = RUNES.filter(r => {
    const matchesTier = runeFilter === 'All' || r.tier === runeFilter;
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTier && matchesSearch;
  });

  const toggleAlly = (c: Champion) => {
    if (allies.find(a => a.id === c.id)) {
      setAllies(allies.filter(a => a.id !== c.id));
    } else if (allies.length < 5) {
      setAllies([...allies, c]);
    }
  };

  const toggleEnemy = (c: Champion) => {
    if (enemies.find(e => e.id === c.id)) {
      setEnemies(enemies.filter(e => e.id !== c.id));
    } else if (enemies.length < 5) {
      setEnemies([...enemies, c]);
    }
  };

  const handleGetAdvice = async (type: string, data: any) => {
    setLoading(true);
    setAdvice(null);
    
    let prompt = "";
    if (type === 'matchup') {
      prompt = `Analise o matchup de Wild Rift: ${data.myChamp.name} vs ${data.enemyChamp.name}. 
      Considere que é um jogo de Wild Rift (mapa menor, ritmo acelerado, patch 7.0c com Norra e Smolder). 
      Forneça: Classificação (Favorável/Skill/Desfavorável), Janelas de Power Spike, Estratégia de Wave, e Dicas de Troca. 
      Responda em Markdown estruturado em PT-BR.`;
    } else if (type === 'gold') {
      prompt = `Estou jogando de ${data.myChamp?.name || 'um campeão'} no Wild Rift. 
      Tenho ${data.gold} de ouro aos ${data.time} minutos de jogo. 
      O que devo comprar agora? Priorize itens de Wild Rift (patch 7.0c). 
      Explique o impacto estratégico da compra e o plano para os próximos 2 minutos. 
      Responda em PT-BR.`;
    } else if (type === 'teamcomp') {
      prompt = `Analise esta composição de equipe no Wild Rift. 
      Aliados: ${data.allies.map((c: any) => c.name).join(', ')}. 
      Inimigos: ${data.enemies.map((c: any) => c.name).join(', ')}. 
      Determine: Condição de vitória, Arquétipo da comp, Alvo prioritário e Macro estratégia recomendada. 
      Responda em PT-BR.`;
    }

    const result = await getAdaptiveAdvice(prompt);
    setAdvice(result || "Erro ao obter conselhos.");
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-rift-dark overflow-hidden">
      {/* Sidebar */}
      <nav className="w-64 bg-rift-gray border-r border-white/5 flex flex-col p-4 gap-2">
        <div className="flex items-center gap-3 px-4 py-6 mb-4">
          <div className="w-10 h-10 bg-rift-accent rounded-lg flex items-center justify-center">
            <Zap className="text-rift-dark fill-rift-dark" size={24} />
          </div>
          <h1 className="font-display font-bold text-xl tracking-tight">SOBERBA RIFT</h1>
        </div>

        <NavItem 
          active={activeView === 'dashboard'} 
          onClick={() => setActiveView('dashboard')}
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
        />
        <NavItem 
          active={activeView === 'matchup'} 
          onClick={() => setActiveView('matchup')}
          icon={<Swords size={20} />}
          label="Matchups"
        />
        <NavItem 
          active={activeView === 'gold'} 
          onClick={() => setActiveView('gold')}
          icon={<Coins size={20} />}
          label="Motor de Ouro"
        />
        <NavItem 
    {activeView === 'draft' && (
            <motion.div key="draft" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <DraftSimulator 
                onAction={(data: any) => handleGetAdvice('teamcomp', data)} 
                loading={loading} 
              />
            </motion.div>
          )}
        <NavItem 
    {activeView === 'builder' && (
            <motion.div key="builder" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <BuildCalculator 
                onAction={(data: any) => handleGetAdvice('gold', data)} 
                loading={loading} 
              />
            </motion.div>
          )}
        <NavItem 
          active={activeView === 'live'} 
          onClick={() => setActiveView('live')}
          icon={<Timer size={20} />}
          label="Assistente em Tempo Real"
        />
        <NavItem 
         {activeView === 'coach' && (
            <motion.div key="coach" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <AICoach 
                onAction={(prompt: string) => handleGetAdvice('custom', { prompt })} 
                loading={loading} 
              />
            </motion.div>
          )}
        
        <div className="my-4 border-t border-white/5"></div>

        <NavItem 
          active={activeView === 'teamcomp'} 
          onClick={() => setActiveView('teamcomp')}
          icon={<Users size={20} />}
          label="Análise de Comp"
        />
        <NavItem 
          active={activeView === 'builds'} 
          onClick={() => setActiveView('builds')}
          icon={<ShieldAlert size={20} />}
          label="Builds Adaptativas"
        />
        <NavItem 
          active={activeView === 'runes'} 
          onClick={() => setActiveView('runes')}
          icon={<Zap size={20} />}
          label="Runas"
        />
        <NavItem 
          active={activeView === 'overview'} 
          onClick={() => setActiveView('overview')}
          icon={<Target size={20} />}
          label="Roadmap & Visão"
        />

        <div className="mt-auto p-4 glass-panel text-xs text-white/40">
          <p>Versão 7.0.0-C</p>
          <p>Exclusivo Wild Rift</p>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <AnimatePresence mode="wait">
          {activeView === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <header>
                <h2 className="text-4xl font-display font-extrabold mb-2 uppercase tracking-tighter">SOBERBA RIFT</h2>
                <p className="text-white/60">Sua vantagem estratégica em tempo real começa aqui.</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                  title="Meta Atual" 
                  value="Hypercarries & Tanks" 
                  icon={<TrendingUp className="text-rift-accent" />} 
                />
                <StatCard 
                  title="Win Rate Médio" 
                  value="56.8%" 
                  icon={<Target className="text-rift-blue" />} 
                />
                <StatCard 
                  title="Patch" 
                  value="7.0c" 
                  icon={<Info className="text-rift-gold" />} 
                />
              </div>

              <div className="glass-panel p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Zap className="text-rift-accent" size={20} />
                  Destaque da Atualização (Patch 7.0c)
                </h3>
                <p className="text-white/70 leading-relaxed">
                  A **Norra** recebeu ajustes importantes para sua sobrevivência e limpeza de rotas. 
                  **Ryze** e **Ahri** tiveram melhorias na lógica de mira. 
                  **Bardo** e **Nasus** sofreram nerfs no early game para balancear sua pressão. 
                  Itens como **Terminus** e **Blade of the Ruined King** foram fortalecidos para atiradores à distância.
                </p>
              </div>
            </motion.div>
          )}

          {activeView === 'matchup' && (
            <motion.div 
              key="matchup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <header className="flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-display font-bold">Inteligência de Matchup</h2>
                  <p className="text-white/60">Analise o duelo direto e domine sua rota.</p>
                </div>
                <div className="flex gap-2">
                  <select 
                    value={champFilter}
                    onChange={(e) => setChampFilter(e.target.value)}
                    className="bg-rift-gray border border-white/10 rounded-lg px-3 py-1 text-sm outline-none focus:border-rift-accent"
                  >
                    <option value="All">Todas as Rotas</option>
                    <option value="Top">Top</option>
                    <option value="Jungle">Jungle</option>
                    <option value="Mid">Mid</option>
                    <option value="ADC">ADC</option>
                    <option value="Support">Support</option>
                  </select>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
                    <input 
                      type="text"
                      placeholder="Buscar campeão..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-rift-gray border border-white/10 rounded-lg pl-9 pr-3 py-1 text-sm outline-none focus:border-rift-accent"
                    />
                  </div>
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-white/50">Seu Campeão</label>
                  <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto p-1">
                    {filteredChampions.map(c => (
                      <button 
                        key={c.id}
                        onClick={() => setMyChamp(c)}
                        className={`p-2 rounded-lg border transition-all ${myChamp?.id === c.id ? 'border-rift-accent bg-rift-accent/10' : 'border-white/10 hover:border-white/30'}`}
                      >
                        <div className="text-[10px] font-bold truncate">{c.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-white/50">Oponente</label>
                  <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto p-1">
                    {filteredChampions.map(c => (
                      <button 
                        key={c.id}
                        onClick={() => setEnemyChamp(c)}
                        className={`p-2 rounded-lg border transition-all ${enemyChamp?.id === c.id ? 'border-rift-red bg-rift-red/10' : 'border-white/10 hover:border-white/30'}`}
                      >
                        <div className="text-[10px] font-bold truncate">{c.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                disabled={!myChamp || !enemyChamp || loading}
                onClick={() => handleGetAdvice('matchup', { myChamp, enemyChamp })}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Analisando com Gemini 3.1 Pro...' : 'Gerar Estratégia de Duelo'}
              </button>

              {advice && (
                <div className="glass-panel p-6 prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap">{advice}</div>
                </div>
              )}
            </motion.div>
          )}

          {activeView === 'gold' && (
            <motion.div 
              key="gold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <header>
                <h2 className="text-3xl font-display font-bold">Otimização de Ouro</h2>
                <p className="text-white/60">Decisões de compra baseadas no estado atual do jogo.</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/50">Ouro Atual: {currentGold}</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="5000" 
                      step="100"
                      value={currentGold}
                      onChange={(e) => setCurrentGold(parseInt(e.target.value))}
                      className="w-full accent-rift-gold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/50">Tempo de Jogo: {gameTime} min</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="25" 
                      step="1"
                      value={gameTime}
                      onChange={(e) => setGameTime(parseInt(e.target.value))}
                      className="w-full accent-rift-blue"
                    />
                  </div>
                </div>

                <div className="glass-panel p-6 flex flex-col justify-center items-center text-center">
                  <Coins className="text-rift-gold mb-4" size={48} />
                  <p className="text-lg font-bold">"Tenho {currentGold} de ouro aos {gameTime} minutos."</p>
                  <p className="text-white/50 text-sm mt-2">O sistema irá sugerir a melhor compra adaptativa para o seu campeão selecionado.</p>
                </div>
              </div>

              <button 
                disabled={!myChamp || loading}
                onClick={() => handleGetAdvice('gold', { myChamp, gold: currentGold, time: gameTime })}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Calculando com Gemini 3.1 Pro...' : 'Otimizar Compra'}
              </button>

              {advice && (
                <div className="glass-panel p-6">
                  <div className="whitespace-pre-wrap">{advice}</div>
                </div>
              )}
            </motion.div>
          )}

          {activeView === 'draft' && (
            <motion.div 
              key="draft"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <DraftSimulator />
            </motion.div>
          )}

          {activeView === 'builder' && (
            <motion.div 
              key="builder"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <BuildCalculator />
            </motion.div>
          )}

          {activeView === 'live' && (
            <motion.div 
              key="live"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <LiveAssistant />
            </motion.div>
          )}

          {activeView === 'coach' && (
            <motion.div 
              key="coach"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AICoach />
            </motion.div>
          )}

          {activeView === 'teamcomp' && (
            <motion.div 
              key="teamcomp"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <header className="flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-display font-bold">Analisador de Composição</h2>
                  <p className="text-white/60">Identifique as condições de vitória da sua equipe.</p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
                  <input 
                    type="text"
                    placeholder="Filtrar campeões..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-rift-gray border border-white/10 rounded-lg pl-9 pr-3 py-1 text-sm outline-none focus:border-rift-accent"
                  />
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-panel p-6 space-y-4">
                  <h3 className="font-bold text-rift-blue flex justify-between">
                    Sua Equipe (Aliados)
                    <span className="text-xs text-white/40">{allies.length}/5</span>
                  </h3>
                  <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto p-1">
                    {filteredChampions.map(c => (
                      <button 
                        key={c.id}
                        onClick={() => toggleAlly(c)}
                        className={`p-1.5 rounded border text-[10px] truncate transition-all ${allies.find(a => a.id === c.id) ? 'border-rift-blue bg-rift-blue/20' : 'border-white/5 hover:border-white/20'}`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="glass-panel p-6 space-y-4">
                  <h3 className="font-bold text-rift-red flex justify-between">
                    Equipe Inimiga
                    <span className="text-xs text-white/40">{enemies.length}/5</span>
                  </h3>
                  <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto p-1">
                    {filteredChampions.map(c => (
                      <button 
                        key={c.id}
                        onClick={() => toggleEnemy(c)}
                        className={`p-1.5 rounded border text-[10px] truncate transition-all ${enemies.find(e => e.id === c.id) ? 'border-rift-red bg-rift-red/20' : 'border-white/5 hover:border-white/20'}`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                disabled={allies.length === 0 || enemies.length === 0 || loading}
                onClick={() => handleGetAdvice('teamcomp', { allies, enemies })}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Processando com Gemini 3.1 Pro...' : 'Analisar Condição de Vitória'}
              </button>

              {advice && (
                <div className="glass-panel p-6 prose prose-invert max-w-none">
                   <div className="whitespace-pre-wrap">{advice}</div>
                </div>
              )}
            </motion.div>
          )}

          {activeView === 'runes' && (
            <motion.div 
              key="runes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <header className="flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-display font-bold">Base de Runas</h2>
                  <p className="text-white/60">Explore as runas e suas adaptações no patch 7.0c.</p>
                </div>
                <div className="flex gap-2">
                  <select 
                    value={runeFilter}
                    onChange={(e) => setRuneFilter(e.target.value)}
                    className="bg-rift-gray border border-white/10 rounded-lg px-3 py-1 text-sm outline-none focus:border-rift-accent"
                  >
                    <option value="All">Todos os Tiers</option>
                    <option value="Keystone">Keystone</option>
                    <option value="Domination">Domination</option>
                    <option value="Precision">Precision</option>
                    <option value="Resolve">Resolve</option>
                    <option value="Inspiration">Inspiration</option>
                  </select>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
                    <input 
                      type="text"
                      placeholder="Buscar runa..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-rift-gray border border-white/10 rounded-lg pl-9 pr-3 py-1 text-sm outline-none focus:border-rift-accent"
                    />
                  </div>
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredRunes.map(rune => (
                  <div key={rune.id} className="glass-panel p-4 card-hover">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] px-2 py-0.5 rounded uppercase bg-rift-accent/20 text-rift-accent">
                        {rune.tier}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm mb-1">{rune.name}</h4>
                    <p className="text-xs text-white/50">{rune.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeView === 'overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <header>
                <h2 className="text-4xl font-display font-extrabold mb-2 uppercase tracking-tighter">O Futuro do SOBERBA RIFT</h2>
                <p className="text-white/60">O que falta para nos tornarmos a ferramenta definitiva e perfeita de Wild Rift.</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel p-6 space-y-4 border-l-4 border-l-rift-accent">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Zap className="text-rift-accent" /> 1. Integração de API Oficial (Riot Games)
                  </h3>
                  <p className="text-sm text-white/70">
                    Atualmente, os dados são inseridos manualmente. Para ser perfeito, precisamos conectar com a API da Riot para puxar:
                  </p>
                  <ul className="list-disc list-inside text-sm text-white/60 space-y-1">
                    <li>Histórico de partidas do usuário em tempo real.</li>
                    <li>Winrates globais e por elo atualizados diariamente.</li>
                    <li>Status de servidores e notas de patch automáticas.</li>
                  </ul>
                </div>

                <div className="glass-panel p-6 space-y-4 border-l-4 border-l-rift-blue">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Swords className="text-rift-blue" /> 2. Simulador de Draft (Pick & Ban)
                  </h3>
                  <p className="text-sm text-white/70">
                    Evoluir o "Analisador de Comp" para um simulador de fase de escolhas e banimentos.
                  </p>
                  <ul className="list-disc list-inside text-sm text-white/60 space-y-1">
                    <li>Sugestão de bans baseados no elo e no meta atual.</li>
                    <li>Counter-picks dinâmicos conforme o time inimigo é revelado.</li>
                    <li>Análise de sinergia entre as rotas (ex: Mid/Jungle duo).</li>
                  </ul>
                </div>

                <div className="glass-panel p-6 space-y-4 border-l-4 border-l-rift-gold">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <ShieldAlert className="text-rift-gold" /> 3. Construtor de Builds Dinâmico
                  </h3>
                  <p className="text-sm text-white/70">
                    Ir além de listar itens. Criar um simulador onde o usuário monta a build e vê os atributos finais.
                  </p>
                  <ul className="list-disc list-inside text-sm text-white/60 space-y-1">
                    <li>Cálculo de DPS (Dano por Segundo) contra alvos com X de armadura.</li>
                    <li>Gráficos de power spike (em qual minuto a build fica mais forte).</li>
                    <li>Sugestão de ordem de compra (ex: fechar bota antes do 1º item?).</li>
                  </ul>
                </div>

                <div className="glass-panel p-6 space-y-4 border-l-4 border-l-rift-red">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Users className="text-rift-red" /> 4. Overlay/Assistente em Tempo Real
                  </h3>
                  <p className="text-sm text-white/70">
                    A fronteira final. Um aplicativo companheiro que roda sobreposto ao jogo (ou via áudio).
                  </p>
                  <ul className="list-disc list-inside text-sm text-white/60 space-y-1">
                    <li>Timers de feitiços de invocador inimigos (Flash, Incendiar).</li>
                    <li>Avisos de rotação do Jungle baseados no tempo de jogo.</li>
                    <li>Alertas de nascimento de Dragão/Barão com sugestão de macro.</li>
                  </ul>
                </div>
              </div>

              <div className="glass-panel p-8 bg-gradient-to-br from-white/5 to-rift-accent/10">
                <h3 className="text-2xl font-bold mb-4">O Toque Final: Personalização Extrema</h3>
                <p className="text-white/80 leading-relaxed">
                  Para que o SOBERBA RIFT seja impecável, ele precisa aprender com o usuário. Implementar um sistema de login onde a IA analisa o estilo de jogo do jogador (ex: "Você joga muito agressivo no early game, tente usar a runa X em vez da Y") transformaria o app de um simples guia para um **Coach Pessoal de Bolso**.
                </p>
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
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active 
          ? 'bg-rift-accent text-rift-dark font-bold shadow-lg shadow-rift-accent/20' 
          : 'text-white/60 hover:text-white hover:bg-white/5'
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
      {active && <ChevronRight className="ml-auto" size={16} />}
    </button>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="glass-panel p-6 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xs text-white/40 uppercase font-bold tracking-wider">{title}</p>
        <p className="text-xl font-display font-bold">{value}</p>
      </div>
    </div>
  );
}
