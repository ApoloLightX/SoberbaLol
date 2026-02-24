import React, { useState, useEffect } from 'react';
import { ShieldAlert, Search, Zap, Shield, Swords, Target, Brain, Info, AlertTriangle, TrendingUp, TrendingDown, Minus, X } from 'lucide-react';
import { CHAMPIONS, Champion, ITEMS, Item } from '../data/wildrift';
import { getAdaptiveBuild, GameContext, Recommendation } from '../services/decisionEngine';
import { motion, AnimatePresence } from 'motion/react';

export default function AdaptiveBuilds() {
  const [myChamp, setMyChamp] = useState<Champion | null>(null);
  const [enemies, setEnemies] = useState<Champion[]>([]);
  const [gold, setGold] = useState(3000);
  const [time, setTime] = useState(10);
  const [state, setState] = useState<'Ahead' | 'Even' | 'Behind'>('Even');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChampions = CHAMPIONS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    myChamp?.id !== c.id && !enemies.find(e => e.id === c.id)
  );

  useEffect(() => {
    if (myChamp && enemies.length > 0) {
      const context: GameContext = {
        myChamp,
        enemies,
        allies: [], // Futura expansão
        gold,
        time,
        state
      };
      const recs = getAdaptiveBuild(context);
      setRecommendations(recs);
    } else {
      setRecommendations([]);
    }
  }, [myChamp, enemies, gold, time, state]);

  const addEnemy = (c: Champion) => {
    if (enemies.length < 5) setEnemies([...enemies, c]);
  };

  const removeEnemy = (id: string) => {
    setEnemies(enemies.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-display font-bold text-rift-red flex items-center gap-3">
          <ShieldAlert className="text-rift-red" size={32} />
          Motor de Build Adaptativa v2.0
        </h2>
        <p className="text-white/60">Lógica ponderada em tempo real baseada em ameaças, economia e fase do jogo.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CONFIGURAÇÃO DE CONTEXTO */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 border-t-2 border-t-rift-accent">
            <h3 className="text-xs font-bold text-rift-accent uppercase tracking-widest mb-4">Seu Campeão & Estado</h3>
            <div className="space-y-4">
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-rift-accent transition-all"
                value={myChamp?.id || ''}
                onChange={(e) => setMyChamp(CHAMPIONS.find(c => c.id === e.target.value) || null)}
              >
                <option value="">Selecione seu campeão...</option>
                {CHAMPIONS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>

              <div className="grid grid-cols-3 gap-2">
                <StateBtn active={state === 'Ahead'} onClick={() => setState('Ahead')} icon={<TrendingUp size={14}/>} label="Ahead" color="text-green-400" />
                <StateBtn active={state === 'Even'} onClick={() => setState('Even')} icon={<Minus size={14}/>} label="Even" color="text-blue-400" />
                <StateBtn active={state === 'Behind'} onClick={() => setState('Behind')} icon={<TrendingDown size={14}/>} label="Behind" color="text-red-400" />
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 border-t-2 border-t-rift-gold">
            <h3 className="text-xs font-bold text-rift-gold uppercase tracking-widest mb-4">Economia & Tempo</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase">
                  <span className="text-white/40">Ouro Disponível</span>
                  <span className="text-rift-gold">{gold}G</span>
                </div>
                <input type="range" min="0" max="20000" step="100" value={gold} onChange={(e) => setGold(parseInt(e.target.value))} className="w-full accent-rift-gold" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase">
                  <span className="text-white/40">Tempo de Jogo</span>
                  <span className="text-rift-blue">{time} MIN</span>
                </div>
                <input type="range" min="1" max="30" value={time} onChange={(e) => setTime(parseInt(e.target.value))} className="w-full accent-rift-blue" />
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 border-t-2 border-t-rift-red">
            <h3 className="text-xs font-bold text-rift-red uppercase tracking-widest mb-4">Ameaças Inimigas ({enemies.length}/5)</h3>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {enemies.map(e => (
                <button key={e.id} onClick={() => removeEnemy(e.id)} className="relative group aspect-square bg-white/5 rounded-lg border border-white/10 flex items-center justify-center overflow-hidden">
                  <span className="text-[8px] font-bold text-center leading-tight">{e.name}</span>
                  <div className="absolute inset-0 bg-red-500/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <X size={12} />
                  </div>
                </button>
              ))}
              {Array.from({ length: 5 - enemies.length }).map((_, i) => (
                <div key={i} className="aspect-square border border-dashed border-white/10 rounded-lg flex items-center justify-center text-white/5">
                  <Target size={12} />
                </div>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={12} />
              <input 
                type="text"
                placeholder="Adicionar inimigo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs outline-none focus:border-rift-red transition-all"
              />
            </div>
            <div className="mt-2 max-h-32 overflow-y-auto grid grid-cols-2 gap-1 p-1 custom-scrollbar">
              {filteredChampions.slice(0, 10).map(c => (
                <button key={c.id} onClick={() => addEnemy(c)} className="p-2 bg-white/5 rounded text-[9px] font-bold hover:bg-white/10 text-left truncate">
                  + {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RESULTADOS DO MOTOR */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {recommendations.length > 0 ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {recommendations.map((rec, idx) => (
                  <div key={rec.item.id} className="glass-panel p-5 border-l-4 border-l-rift-accent flex flex-col justify-between group hover:bg-white/5 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-rift-accent uppercase tracking-tighter">Prioridade #{idx + 1}</span>
                          <span className="text-[10px] font-mono text-white/20">Score: {rec.score}</span>
                        </div>
                        <h4 className="text-lg font-bold text-white group-hover:text-rift-accent transition-colors">{rec.item.name}</h4>
                      </div>
                      <span className="text-xs font-bold text-rift-gold">{rec.item.price}G</span>
                    </div>
                    <p className="text-xs text-white/60 italic mb-4 leading-relaxed">"{rec.reason}"</p>
                    <div className="flex flex-wrap gap-1 mt-auto">
                      {rec.item.tags.map(tag => (
                        <span key={tag} className="text-[8px] px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-white/40 uppercase font-bold">{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <div className="glass-panel p-20 flex flex-col items-center justify-center text-center text-white/10 border-dashed border-2 border-white/5 h-full">
                <Brain className="mb-6 opacity-10" size={80} />
                <h3 className="text-2xl font-bold mb-2">Aguardando Contexto</h3>
                <p className="max-w-md text-sm">Selecione seu campeão e pelo menos um inimigo para ativar o motor de decisão adaptativo.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function StateBtn({ active, onClick, icon, label, color }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, color: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${active ? `bg-white/10 border-white/20 ${color} font-bold` : 'bg-white/5 border-white/5 text-white/20 hover:bg-white/10'}`}
    >
      {icon}
      <span className="text-[9px] uppercase mt-1">{label}</span>
    </button>
  );
}
