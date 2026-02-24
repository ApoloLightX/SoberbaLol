import React, { useState, useEffect } from 'react';
import { Users, Search, X, Zap, Shield, Swords, Target, Brain, Info, AlertTriangle, TrendingUp, BarChart3 } from 'lucide-react';
import { CHAMPIONS, Champion } from '../data/wildrift';
import { simulateComp, SimulationResult } from '../services/simulationEngine';
import { motion, AnimatePresence } from 'motion/react';

export default function TeamCompAnalyzer() {
  const [allies, setAllies] = useState<Champion[]>([]);
  const [enemies, setEnemies] = useState<Champion[]>([]);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChampions = CHAMPIONS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !allies.find(a => a.id === c.id) && !enemies.find(e => e.id === c.id)
  );

  useEffect(() => {
    if (allies.length > 0 && enemies.length > 0) {
      const simResult = simulateComp(allies, enemies);
      setResult(simResult);
    } else {
      setResult(null);
    }
  }, [allies, enemies]);

  const addChamp = (c: Champion, team: 'allies' | 'enemies') => {
    if (team === 'allies' && allies.length < 5) setAllies([...allies, c]);
    if (team === 'enemies' && enemies.length < 5) setEnemies([...enemies, c]);
  };

  const removeChamp = (id: string, team: 'allies' | 'enemies') => {
    if (team === 'allies') setAllies(allies.filter(c => c.id !== id));
    if (team === 'enemies') setEnemies(enemies.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-display font-bold text-rift-blue flex items-center gap-3">
          <Users className="text-rift-blue" size={32} />
          Simulador de Composição v2.0
        </h2>
        <p className="text-white/60">Cálculos de DPS, mitigação e probabilidade de vitória baseados em sinergia real.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SELEÇÃO DE TIMES */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-4 border-l-4 border-l-rift-blue bg-rift-blue/5">
            <h3 className="text-[10px] font-bold text-rift-blue uppercase tracking-widest mb-3">Sua Equipe ({allies.length}/5)</h3>
            <div className="grid grid-cols-5 gap-2 min-h-[50px]">
              {allies.map(c => (
                <button key={c.id} onClick={() => removeChamp(c.id, 'allies')} className="aspect-square bg-white/5 rounded border border-white/10 flex items-center justify-center text-[8px] font-bold text-center p-1 hover:bg-red-500/20 transition-colors">
                  {c.name}
                </button>
              ))}
              {Array.from({ length: 5 - allies.length }).map((_, i) => (
                <div key={i} className="aspect-square border border-dashed border-white/10 rounded flex items-center justify-center text-white/5"><Zap size={12}/></div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-4 border-l-4 border-l-rift-red bg-rift-red/5">
            <h3 className="text-[10px] font-bold text-rift-red uppercase tracking-widest mb-3">Equipe Inimiga ({enemies.length}/5)</h3>
            <div className="grid grid-cols-5 gap-2 min-h-[50px]">
              {enemies.map(c => (
                <button key={c.id} onClick={() => removeChamp(c.id, 'enemies')} className="aspect-square bg-white/5 rounded border border-white/10 flex items-center justify-center text-[8px] font-bold text-center p-1 hover:bg-red-500/20 transition-colors">
                  {c.name}
                </button>
              ))}
              {Array.from({ length: 5 - enemies.length }).map((_, i) => (
                <div key={i} className="aspect-square border border-dashed border-white/10 rounded flex items-center justify-center text-white/5"><Target size={12}/></div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
              <input 
                type="text"
                placeholder="Buscar campeão..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-3 text-sm outline-none focus:border-rift-accent transition-all"
              />
            </div>
            <div className="max-h-[300px] overflow-y-auto grid grid-cols-2 gap-2 p-1 custom-scrollbar">
              {filteredChampions.map(c => (
                <div key={c.id} className="relative group">
                  <div className="p-2 bg-white/5 border border-white/10 rounded text-[10px] font-bold truncate text-center">
                    {c.name}
                  </div>
                  <div className="absolute inset-0 bg-rift-dark/95 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1 transition-all rounded">
                    <button onClick={() => addChamp(c, 'allies')} className="px-2 py-1 bg-rift-blue text-white rounded text-[8px] font-bold">ALIADO</button>
                    <button onClick={() => addChamp(c, 'enemies')} className="px-2 py-1 bg-rift-red text-white rounded text-[8px] font-bold">INIMIGO</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RESULTADOS DA SIMULAÇÃO */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                {/* Win Probability Header */}
                <div className="glass-panel p-8 flex flex-col items-center justify-center text-center border-b-4 border-b-rift-accent">
                  <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-2">Probabilidade de Vitória</p>
                  <div className="text-7xl font-display font-black text-rift-accent mb-4">{result.winProbability}%</div>
                  <div className="w-full max-w-md h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} animate={{ width: `${result.winProbability}%` }}
                      className="h-full bg-rift-accent shadow-[0_0_20px_rgba(0,255,136,0.5)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Stats Radar/Bars */}
                  <div className="glass-panel p-6 space-y-4">
                    <h3 className="text-sm font-bold flex items-center gap-2 mb-4"><BarChart3 size={16} className="text-rift-blue"/> Atributos da Equipe</h3>
                    <StatBar label="Poder de Fogo (DPS)" value={result.dpsScore} max={15} color="bg-rift-red" />
                    <StatBar label="Durabilidade (Tank)" value={result.tankinessScore} max={15} color="bg-rift-blue" />
                    <StatBar label="Controle (CC)" value={result.ccScore} max={15} color="bg-rift-gold" />
                    <StatBar label="Mobilidade" value={result.mobilityScore} max={15} color="bg-purple-500" />
                    <StatBar label="Escalonamento" value={result.scalingScore} max={20} color="bg-rift-accent" />
                  </div>

                  {/* Win Condition & Analysis */}
                  <div className="space-y-6">
                    <div className="glass-panel p-6 border-l-4 border-l-rift-accent">
                      <h3 className="text-sm font-bold flex items-center gap-2 mb-3"><Brain size={16} className="text-rift-accent"/> Condição de Vitória</h3>
                      <p className="text-sm text-white/80 italic leading-relaxed">"{result.winCondition}"</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="glass-panel p-4 bg-green-500/5 border-green-500/20">
                        <h4 className="text-[10px] font-bold text-green-400 uppercase mb-2">Pontos Fortes</h4>
                        <ul className="space-y-1">
                          {result.strengths.map((s, i) => <li key={i} className="text-[11px] text-white/60 flex items-center gap-2"><Zap size={10} className="text-green-400"/> {s}</li>)}
                        </ul>
                      </div>
                      <div className="glass-panel p-4 bg-red-500/5 border-red-500/20">
                        <h4 className="text-[10px] font-bold text-red-400 uppercase mb-2">Vulnerabilidades</h4>
                        <ul className="space-y-1">
                          {result.vulnerabilities.map((v, i) => <li key={i} className="text-[11px] text-white/60 flex items-center gap-2"><AlertTriangle size={10} className="text-red-400"/> {v}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="glass-panel p-20 flex flex-col items-center justify-center text-center text-white/10 border-dashed border-2 border-white/5 h-full">
                <Users className="mb-6 opacity-10" size={80} />
                <h3 className="text-2xl font-bold mb-2">Simulação Pendente</h3>
                <p className="max-w-md text-sm">Adicione campeões aliados e inimigos para calcular as projeções de combate e chances de vitória.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function StatBar({ label, value, max, color }: { label: string, value: number, max: number, color: string }) {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[9px] font-bold uppercase tracking-wider">
        <span className="text-white/40">{label}</span>
        <span className="text-white">{value}</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }} animate={{ width: `${percentage}%` }}
          className={`h-full ${color}`}
        />
      </div>
    </div>
  );
}
