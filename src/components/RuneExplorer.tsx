import React, { useState } from 'react';
import { Zap, Search, Info, Brain, Target, Shield, Swords } from 'lucide-react';
import { RUNES, CHAMPIONS, Champion } from '../data/wildrift';
import { getAdaptiveAdvice } from '../services/aiService';
import { motion, AnimatePresence } from 'motion/react';

export default function RuneExplorer() {
  const [selectedChamp, setSelectedChamp] = useState<Champion | null>(null);
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChampions = CHAMPIONS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRuneAdvice = async (champ: Champion) => {
    setSelectedChamp(champ);
    setLoading(true);
    const prompt = `Atue como um especialista em Runas de Wild Rift (Patch 7.0c).
    Campeão: ${champ.name}
    Rota: ${champ.role}
    Tipo: ${champ.type}
    
    Sugira a melhor configuração de runas (Keystone + 3 secundárias) para este campeão no meta atual de Ranked. Explique brevemente o porquê de cada escolha. Responda em PT-BR.`;
    
    const result = await getAdaptiveAdvice(prompt);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-display font-bold text-rift-accent flex items-center gap-3">
          <Zap className="text-rift-accent" size={32} />
          Explorador de Runas
        </h2>
        <p className="text-white/60">Descubra as melhores combinações de runas para dominar o Patch 7.0c.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-6 space-y-4 border-t-2 border-t-rift-accent">
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
          <div className="grid grid-cols-3 gap-2 max-h-[500px] overflow-y-auto p-1 custom-scrollbar">
            {filteredChampions.map(c => (
              <button 
                key={c.id} 
                onClick={() => getRuneAdvice(c)}
                className={`p-2 rounded-lg text-[10px] font-bold border transition-all ${selectedChamp?.id === c.id ? 'border-rift-accent bg-rift-accent/20 text-white' : 'border-white/5 bg-white/5 text-white/40 hover:bg-white/10'}`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="glass-panel p-12 flex flex-col items-center justify-center text-white/20 h-full"
              >
                <Zap className="animate-pulse mb-4 text-rift-accent" size={48} />
                <p className="font-bold uppercase tracking-widest text-xs">Consultando o Oráculo das Runas...</p>
              </motion.div>
            ) : advice ? (
              <motion.div 
                key="advice"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-8 prose prose-invert max-w-none border-l-4 border-l-rift-accent h-full"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-rift-accent/20 flex items-center justify-center">
                    <Brain className="text-rift-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="m-0 text-2xl font-display font-bold">{selectedChamp?.name}</h3>
                    <p className="m-0 text-xs text-white/40 uppercase font-bold tracking-widest">{selectedChamp?.role} • Patch 7.0c</p>
                  </div>
                </div>
                <div className="whitespace-pre-wrap text-white/80 leading-relaxed italic">
                  {advice}
                </div>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <RuneStat icon={<Target size={14}/>} label="Foco" value="Dano Explosivo" />
                  <RuneStat icon={<Shield size={14}/>} label="Defesa" value="Escalonamento" />
                  <RuneStat icon={<Swords size={14}/>} label="Estilo" value="Agressivo" />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="glass-panel p-12 flex flex-col items-center justify-center text-white/10 text-center h-full border-dashed border-2 border-white/5"
              >
                <Zap className="mb-4 opacity-20" size={64} />
                <h3 className="text-xl font-bold mb-2">Nenhum Campeão Selecionado</h3>
                <p className="max-w-xs text-sm">Escolha um campeão ao lado para ver a configuração de runas otimizada pela IA para o meta atual.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function RuneStat({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
      <div className="flex items-center gap-2 text-white/40 mb-1">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-xs font-bold text-rift-accent">{value}</p>
    </div>
  );
}
