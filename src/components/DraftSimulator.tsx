import React, { useState, useEffect } from 'react';
import { CHAMPIONS, Champion } from '../data/wildrift';
import { simulateComp, SimulationResult } from '../services/simulationEngine';
import { Swords, Search, X, Zap, Shield, Target, Brain, BarChart3, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function DraftSimulator() {
  const [bluePicks, setBluePicks] = useState<Champion[]>([]);
  const [redPicks, setRedPicks] = useState<Champion[]>([]);
  const [blueBans, setBlueBans] = useState<Champion[]>([]);
  const [redBans, setRedBans] = useState<Champion[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [simResult, setSimResult] = useState<SimulationResult | null>(null);

  const filteredChampions = CHAMPIONS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !bluePicks.find(p => p.id === c.id) && !redPicks.find(p => p.id === c.id) &&
    !blueBans.find(b => b.id === c.id) && !redBans.find(b => b.id === c.id)
  );

  useEffect(() => {
    if (bluePicks.length > 0 && redPicks.length > 0) {
      setSimResult(simulateComp(bluePicks, redPicks));
    } else {
      setSimResult(null);
    }
  }, [bluePicks, redPicks]);

  const handleSelect = (c: Champion, team: 'blue' | 'red', type: 'pick' | 'ban') => {
    if (type === 'pick') {
      if (team === 'blue' && bluePicks.length < 5) setBluePicks([...bluePicks, c]);
      if (team === 'red' && redPicks.length < 5) setRedPicks([...redPicks, c]);
    } else {
      if (team === 'blue' && blueBans.length < 5) setBlueBans([...blueBans, c]);
      if (team === 'red' && redBans.length < 5) setRedBans([...redBans, c]);
    }
  };

  const removeChamp = (id: string, team: 'blue' | 'red', type: 'pick' | 'ban') => {
    if (type === 'pick') {
      if (team === 'blue') setBluePicks(bluePicks.filter(p => p.id !== id));
      if (team === 'red') setRedPicks(redPicks.filter(p => p.id !== id));
    } else {
      if (team === 'blue') setBlueBans(blueBans.filter(b => b.id !== id));
      if (team === 'red') setRedBans(redBans.filter(b => b.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-display font-bold text-rift-blue flex items-center gap-3">
            <Swords className="text-rift-blue" size={32} />
            Draft Engine v2.0
          </h2>
          <p className="text-white/60">Simulação de picks e bans com análise de probabilidade em tempo real.</p>
        </div>
        <button onClick={() => { setBluePicks([]); setRedPicks([]); setBlueBans([]); setRedBans([]); }} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold hover:bg-red-500/20 transition-colors">RESET</button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* BLUE SIDE */}
        <div className="lg:col-span-3 space-y-4">
          <div className="glass-panel p-4 border-l-4 border-l-rift-blue bg-rift-blue/5">
            <h3 className="text-[10px] font-bold text-rift-blue uppercase tracking-widest mb-4">Time Azul</h3>
            <div className="space-y-2">
              {bluePicks.map(c => (
                <div key={c.id} onClick={() => removeChamp(c.id, 'blue', 'pick')} className="p-3 bg-white/5 border border-white/10 rounded-lg flex justify-between items-center cursor-pointer hover:bg-red-500/10 group">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">{c.name}</span>
                    <span className="text-[8px] text-white/40 uppercase">{c.role}</span>
                  </div>
                  <X size={12} className="opacity-0 group-hover:opacity-100 text-red-500" />
                </div>
              ))}
              {Array.from({ length: 5 - bluePicks.length }).map((_, i) => (
                <div key={i} className="h-12 border border-dashed border-white/5 rounded-lg flex items-center justify-center text-[10px] text-white/5 font-bold">PICK {bluePicks.length + i + 1}</div>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {blueBans.map(c => (
              <div key={c.id} onClick={() => removeChamp(c.id, 'blue', 'ban')} className="w-full aspect-square bg-white/5 border border-white/10 rounded flex items-center justify-center text-[8px] line-through text-white/20 cursor-pointer hover:bg-red-500/20">{c.name}</div>
            ))}
            {Array.from({ length: 5 - blueBans.length }).map((_, i) => (
              <div key={i} className="w-full aspect-square border border-dashed border-white/5 rounded"></div>
            ))}
          </div>
        </div>

        {/* SELECTION CENTER */}
        <div className="lg:col-span-6 space-y-6">
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
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-[400px] overflow-y-auto p-1 custom-scrollbar">
              {filteredChampions.map(c => (
                <div key={c.id} className="relative group aspect-square">
                  <div className="w-full h-full bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-[8px] font-bold text-center p-1">
                    {c.name}
                  </div>
                  <div className="absolute inset-0 bg-rift-dark/95 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 transition-all rounded-lg">
                    <div className="flex gap-1">
                      <button onClick={() => handleSelect(c, 'blue', 'pick')} className="w-6 h-6 bg-rift-blue rounded text-[10px] font-bold">B</button>
                      <button onClick={() => handleSelect(c, 'red', 'pick')} className="w-6 h-6 bg-rift-red rounded text-[10px] font-bold">R</button>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => handleSelect(c, 'blue', 'ban')} className="w-6 h-6 bg-white/10 rounded text-[10px] font-bold">Ø</button>
                      <button onClick={() => handleSelect(c, 'red', 'ban')} className="w-6 h-6 bg-white/10 rounded text-[10px] font-bold">Ø</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LIVE ANALYSIS MINI */}
          <AnimatePresence>
            {simResult && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6 border-t-2 border-t-rift-accent">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2"><Brain size={14} className="text-rift-accent"/> Análise de Draft</h3>
                  <span className="text-2xl font-display font-black text-rift-accent">{simResult.winProbability}% Win Prob (Blue)</span>
                </div>
                <p className="text-xs text-white/60 italic leading-relaxed">"{simResult.winCondition}"</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RED SIDE */}
        <div className="lg:col-span-3 space-y-4">
          <div className="glass-panel p-4 border-l-4 border-l-rift-red bg-rift-red/5">
            <h3 className="text-[10px] font-bold text-rift-red uppercase tracking-widest mb-4 text-right">Time Vermelho</h3>
            <div className="space-y-2">
              {redPicks.map(c => (
                <div key={c.id} onClick={() => removeChamp(c.id, 'red', 'pick')} className="p-3 bg-white/5 border border-white/10 rounded-lg flex justify-between items-center cursor-pointer hover:bg-red-500/10 group">
                  <X size={12} className="opacity-0 group-hover:opacity-100 text-red-500" />
                  <div className="flex flex-col text-right">
                    <span className="text-sm font-bold">{c.name}</span>
                    <span className="text-[8px] text-white/40 uppercase">{c.role}</span>
                  </div>
                </div>
              ))}
              {Array.from({ length: 5 - redPicks.length }).map((_, i) => (
                <div key={i} className="h-12 border border-dashed border-white/5 rounded-lg flex items-center justify-center text-[10px] text-white/5 font-bold text-right">PICK {redPicks.length + i + 1}</div>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {redBans.map(c => (
              <div key={c.id} onClick={() => removeChamp(c.id, 'red', 'ban')} className="w-full aspect-square bg-white/5 border border-white/10 rounded flex items-center justify-center text-[8px] line-through text-white/20 cursor-pointer hover:bg-red-500/20">{c.name}</div>
            ))}
            {Array.from({ length: 5 - redBans.length }).map((_, i) => (
              <div key={i} className="w-full aspect-square border border-dashed border-white/5 rounded"></div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
