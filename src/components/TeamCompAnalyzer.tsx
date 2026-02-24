import React, { useState } from 'react';
import { Users, Search, X, Zap, Shield, Swords, Target, Brain, Info } from 'lucide-react';
import { CHAMPIONS, Champion } from '../data/wildrift';
import { getAdaptiveAdvice } from '../services/geminiService';
import { motion, AnimatePresence } from 'motion/react';

export default function TeamCompAnalyzer() {
  const [allies, setAllies] = useState<Champion[]>([]);
  const [enemies, setEnemies] = useState<Champion[]>([]);
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChampions = CHAMPIONS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !allies.find(a => a.id === c.id) && !enemies.find(e => e.id === c.id)
  );

  const addChamp = (c: Champion, team: 'allies' | 'enemies') => {
    if (team === 'allies' && allies.length < 5) setAllies([...allies, c]);
    if (team === 'enemies' && enemies.length < 5) setEnemies([...enemies, c]);
  };

  const removeChamp = (id: string, team: 'allies' | 'enemies') => {
    if (team === 'allies') setAllies(allies.filter(c => c.id !== id));
    if (team === 'enemies') setEnemies(enemies.filter(c => c.id !== id));
  };

  const analyzeComp = async () => {
    if (allies.length === 0 || enemies.length === 0) return;
    setLoading(true);
    const prompt = `Atue como um Analista de Composição Profissional de Wild Rift (Patch 7.0c).
    Aliados: ${allies.map(c => c.name).join(', ')}
    Inimigos: ${enemies.map(c => c.name).join(', ')}
    
    Faça uma análise profunda:
    1. Pontos Fortes e Fracos da nossa comp.
    2. Condição de Vitória (Win Condition).
    3. Como devemos lutar as Teamfights.
    4. Quem é a maior ameaça inimiga e como anulá-la.
    Responda em PT-BR.`;
    
    const result = await getAdaptiveAdvice(prompt);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-display font-bold text-rift-blue flex items-center gap-3">
          <Users className="text-rift-blue" size={32} />
          Análise de Composição
        </h2>
        <p className="text-white/60">Entenda a dinâmica entre as duas equipes e trace o plano de vitória.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          {/* Allies */}
          <div className="glass-panel p-4 border-l-4 border-l-rift-blue bg-rift-blue/5">
            <h3 className="text-xs font-bold text-rift-blue uppercase tracking-widest mb-4">Sua Equipe ({allies.length}/5)</h3>
            <div className="space-y-2 min-h-[120px]">
              {allies.map(c => (
                <div key={c.id} className="flex justify-between items-center p-2 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-sm font-bold">{c.name}</span>
                  <button onClick={() => removeChamp(c.id, 'allies')} className="text-white/20 hover:text-red-500"><X size={14}/></button>
                </div>
              ))}
              {allies.length === 0 && <p className="text-[10px] text-white/20 text-center py-8">Adicione aliados...</p>}
            </div>
          </div>

          {/* Enemies */}
          <div className="glass-panel p-4 border-l-4 border-l-rift-red bg-rift-red/5">
            <h3 className="text-xs font-bold text-rift-red uppercase tracking-widest mb-4">Equipe Inimiga ({enemies.length}/5)</h3>
            <div className="space-y-2 min-h-[120px]">
              {enemies.map(c => (
                <div key={c.id} className="flex justify-between items-center p-2 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-sm font-bold">{c.name}</span>
                  <button onClick={() => removeChamp(c.id, 'enemies')} className="text-white/20 hover:text-red-500"><X size={14}/></button>
                </div>
              ))}
              {enemies.length === 0 && <p className="text-[10px] text-white/20 text-center py-8">Adicione inimigos...</p>}
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 space-y-4 flex flex-col">
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
          <div className="flex-1 overflow-y-auto max-h-[400px] grid grid-cols-2 gap-2 p-1 custom-scrollbar">
            {filteredChampions.map(c => (
              <div key={c.id} className="relative group">
                <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-center text-[10px] font-bold truncate">
                  {c.name}
                </div>
                <div className="absolute inset-0 bg-rift-dark/95 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-all rounded-lg">
                  <button onClick={() => addChamp(c, 'allies')} className="px-2 py-1 bg-rift-blue text-white rounded text-[9px] font-bold">ALIADO</button>
                  <button onClick={() => addChamp(c, 'enemies')} className="px-2 py-1 bg-rift-red text-white rounded text-[9px] font-bold">INIMIGO</button>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={analyzeComp}
            disabled={loading || allies.length === 0 || enemies.length === 0}
            className="btn-primary w-full mt-4 py-4 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Zap className="animate-spin" size={18} /> : <Brain size={18} />}
            ANALISAR COMPOSIÇÃO
          </button>
        </div>

        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {advice ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="glass-panel p-6 prose prose-invert max-w-none border-t-4 border-t-rift-blue h-full"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Target className="text-rift-blue" size={20}/> Plano de Jogo</h3>
                <div className="whitespace-pre-wrap text-xs text-white/80 leading-relaxed italic">
                  {advice}
                </div>
              </motion.div>
            ) : (
              <div className="glass-panel p-12 flex flex-col items-center justify-center text-white/10 text-center h-full border-dashed border-2 border-white/5">
                <Info className="mb-4 opacity-20" size={48} />
                <p className="text-xs">Monte as duas composições para receber uma análise tática completa.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
