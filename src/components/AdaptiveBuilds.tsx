import React, { useState } from 'react';
import { ShieldAlert, Search, Zap, Shield, Swords, Target, Brain, Info, AlertTriangle } from 'lucide-react';
import { CHAMPIONS, Champion } from '../data/wildrift';
import { getAdaptiveAdvice } from '../services/geminiService';
import { motion, AnimatePresence } from 'motion/react';

export default function AdaptiveBuilds() {
  const [selectedChamp, setSelectedChamp] = useState<Champion | null>(null);
  const [enemyThreats, setEnemyThreats] = useState<Champion[]>([]);
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChampions = CHAMPIONS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    selectedChamp?.id !== c.id && !enemyThreats.find(e => e.id === c.id)
  );

  const addThreat = (c: Champion) => {
    if (enemyThreats.length < 5) setEnemyThreats([...enemyThreats, c]);
  };

  const removeThreat = (id: string) => {
    setEnemyThreats(enemyThreats.filter(c => c.id !== id));
  };

  const getAdaptiveAdviceAction = async () => {
    if (!selectedChamp || enemyThreats.length === 0) return;
    setLoading(true);
    const prompt = `Atue como um especialista em Builds Adaptativas de Wild Rift (Patch 7.0c).
    Meu Campeão: ${selectedChamp.name}
    Ameaças Inimigas: ${enemyThreats.map(c => `${c.name} (${c.type})`).join(', ')}
    
    Sugira uma build adaptativa (itens situacionais) para sobreviver e anular essas ameaças específicas. Explique quando comprar cada item defensivo ou utilitário. Responda em PT-BR.`;
    
    const result = await getAdaptiveAdvice(prompt);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-display font-bold text-rift-red flex items-center gap-3">
          <ShieldAlert className="text-rift-red" size={32} />
          Builds Adaptativas
        </h2>
        <p className="text-white/60">Aprenda a buildar contra ameaças específicas do time inimigo.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <div className="glass-panel p-6 border-t-2 border-t-rift-accent">
            <h3 className="text-xs font-bold text-rift-accent uppercase tracking-widest mb-4">Seu Campeão</h3>
            <select 
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-rift-accent transition-all"
              value={selectedChamp?.id || ''}
              onChange={(e) => setSelectedChamp(CHAMPIONS.find(c => c.id === e.target.value) || null)}
            >
              <option value="">Selecione...</option>
              {CHAMPIONS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="glass-panel p-6 border-t-2 border-t-rift-red">
            <h3 className="text-xs font-bold text-rift-red uppercase tracking-widest mb-4">Ameaças Inimigas ({enemyThreats.length}/5)</h3>
            <div className="space-y-2 min-h-[100px]">
              {enemyThreats.map(c => (
                <div key={c.id} className="flex justify-between items-center p-2 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">{c.name}</span>
                    <span className="text-[8px] text-white/40 uppercase">{c.type}</span>
                  </div>
                  <button onClick={() => removeThreat(c.id)} className="text-white/20 hover:text-red-500"><X size={14}/></button>
                </div>
              ))}
              {enemyThreats.length === 0 && <p className="text-[10px] text-white/20 text-center py-8">Adicione as ameaças...</p>}
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 space-y-4 flex flex-col">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
            <input 
              type="text"
              placeholder="Buscar ameaça..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-3 text-sm outline-none focus:border-rift-red transition-all"
            />
          </div>
          <div className="flex-1 overflow-y-auto max-h-[400px] grid grid-cols-2 gap-2 p-1 custom-scrollbar">
            {filteredChampions.map(c => (
              <button 
                key={c.id} 
                onClick={() => addThreat(c)}
                className="p-3 bg-white/5 border border-white/10 rounded-lg text-center text-[10px] font-bold truncate hover:border-rift-red transition-all"
              >
                {c.name}
              </button>
            ))}
          </div>
          <button 
            onClick={getAdaptiveAdviceAction}
            disabled={loading || !selectedChamp || enemyThreats.length === 0}
            className="w-full mt-4 py-4 bg-rift-red text-white font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_0_20px_rgba(242,38,75,0.2)]"
          >
            {loading ? <Zap className="animate-spin" size={18} /> : <Shield size={18} />}
            GERAR BUILD ADAPTATIVA
          </button>
        </div>

        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {advice ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="glass-panel p-6 prose prose-invert max-w-none border-l-4 border-l-rift-red h-full"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><AlertTriangle className="text-rift-red" size={20}/> Estratégia de Defesa</h3>
                <div className="whitespace-pre-wrap text-xs text-white/80 leading-relaxed italic">
                  {advice}
                </div>
              </motion.div>
            ) : (
              <div className="glass-panel p-12 flex flex-col items-center justify-center text-white/10 text-center h-full border-dashed border-2 border-white/5">
                <ShieldAlert className="mb-4 opacity-20" size={48} />
                <p className="text-xs">Selecione seu campeão e as ameaças inimigas para receber conselhos de build situacional.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
