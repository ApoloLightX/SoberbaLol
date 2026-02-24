import React, { useState } from 'react';
import { CHAMPIONS, Champion } from '../data/wildrift';
import { getAdaptiveAdvice } from '../services/geminiService';
import { Swords, Search, X, Zap, Shield, Target, Brain } from 'lucide-react';

export default function DraftSimulator() {
  const [bluePicks, setBluePicks] = useState<Champion[]>([]);
  const [redPicks, setRedPicks] = useState<Champion[]>([]);
  const [blueBans, setBlueBans] = useState<Champion[]>([]);
  const [redBans, setRedBans] = useState<Champion[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);

  const filteredChampions = CHAMPIONS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !bluePicks.find(p => p.id === c.id) && !redPicks.find(p => p.id === c.id) &&
    !blueBans.find(b => b.id === c.id) && !redBans.find(b => b.id === c.id)
  );

  const handleSelect = (c: Champion, team: 'blue' | 'red', type: 'pick' | 'ban') => {
    if (type === 'pick') {
      if (team === 'blue' && bluePicks.length < 5) setBluePicks([...bluePicks, c]);
      if (team === 'red' && redPicks.length < 5) setRedPicks([...redPicks, c]);
    } else {
      if (team === 'blue' && blueBans.length < 5) setBlueBans([...blueBans, c]);
      if (team === 'red' && redBans.length < 5) setRedBans([...redBans, c]);
    }
  };

  const removeChamp = (c: Champion, list: Champion[], setList: React.Dispatch<React.SetStateAction<Champion[]>>) => {
    setList(list.filter(champ => champ.id !== c.id));
  };

  const getSuggestion = async () => {
    setLoading(true);
    const prompt = `Atue como um Coach de Draft de Wild Rift (Patch 7.0c).
    Time Azul (Picks): ${bluePicks.map(c => c.name).join(', ') || 'Nenhum'}
    Time Vermelho (Picks): ${redPicks.map(c => c.name).join(', ') || 'Nenhum'}
    Bans: ${[...blueBans, ...redBans].map(c => c.name).join(', ') || 'Nenhum'}
    
    Analise a sinergia, os counters e sugira os próximos 2 melhores picks para o Time Azul e para o Time Vermelho. Explique o porquê com base no meta atual. Responda em PT-BR.`;
    
    const result = await getAdaptiveAdvice(prompt);
    setAdvice(result);
    setLoading(false);
  };

  const resetDraft = () => {
    setBluePicks([]);
    setRedPicks([]);
    setBlueBans([]);
    setRedBans([]);
    setAdvice(null);
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-display font-bold text-rift-blue flex items-center gap-3">
            <Swords className="text-rift-blue" size={32} />
            Simulador de Draft
          </h2>
          <p className="text-white/60">Simule a fase de escolhas e receba sugestões da IA em tempo real.</p>
        </div>
        <button onClick={resetDraft} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/10 transition-colors">REINICIAR DRAFT</button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Blue Side */}
        <div className="glass-panel p-4 space-y-4 border-l-4 border-l-rift-blue bg-rift-blue/5">
          <h3 className="font-bold text-rift-blue text-center uppercase tracking-widest text-sm">Time Azul</h3>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold text-white/30 uppercase mb-2">Bans ({blueBans.length}/5)</p>
              <div className="flex flex-wrap gap-2 min-h-8">
                {blueBans.map(c => (
                  <div key={c.id} onClick={() => removeChamp(c, blueBans, setBlueBans)} className="text-[10px] px-2 py-1 bg-white/5 border border-white/10 rounded cursor-pointer hover:bg-red-500/50 line-through text-white/40">{c.name}</div>
                ))}
                {Array.from({ length: 5 - blueBans.length }).map((_, i) => (
                  <div key={`empty-ban-${i}`} className="w-12 h-6 border border-dashed border-white/10 rounded"></div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-white/30 uppercase mb-2">Picks ({bluePicks.length}/5)</p>
              <div className="space-y-2 min-h-64">
                {bluePicks.map(c => (
                  <div key={c.id} onClick={() => removeChamp(c, bluePicks, setBluePicks)} className="flex justify-between items-center p-3 bg-rift-blue/10 border border-rift-blue/20 rounded-lg cursor-pointer hover:bg-red-500/20 group transition-all">
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{c.name}</span>
                      <span className="text-[9px] text-white/40 uppercase">{c.archetype}</span>
                    </div>
                    <span className="text-[10px] font-bold text-rift-blue uppercase">{c.role}</span>
                  </div>
                ))}
                {Array.from({ length: 5 - bluePicks.length }).map((_, i) => (
                  <div key={`empty-pick-${i}`} className="h-12 border border-dashed border-white/5 rounded-lg flex items-center justify-center text-white/5 text-[10px] font-bold">SLOT {i + 1}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center Selection */}
        <div className="glass-panel p-4 space-y-4 flex flex-col bg-white/5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
            <input 
              type="text"
              placeholder="Buscar campeão..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-rift-gray border border-white/10 rounded-lg pl-9 pr-3 py-3 text-sm outline-none focus:border-rift-accent transition-all"
            />
          </div>
          <div className="flex-1 overflow-y-auto max-h-96 grid grid-cols-3 gap-2 p-1 custom-scrollbar">
            {filteredChampions.map(c => (
              <div key={c.id} className="relative group">
                <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-center text-[10px] font-bold truncate group-hover:border-rift-accent/50 transition-all">
                  {c.name}
                </div>
                <div className="absolute inset-0 bg-rift-dark/95 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1 transition-all rounded-lg border border-rift-accent/50">
                  <button onClick={() => handleSelect(c, 'blue', 'pick')} className="w-8 h-8 bg-rift-blue text-white rounded-md flex items-center justify-center text-xs font-bold hover:scale-110 transition-transform">B</button>
                  <button onClick={() => handleSelect(c, 'red', 'pick')} className="w-8 h-8 bg-rift-red text-white rounded-md flex items-center justify-center text-xs font-bold hover:scale-110 transition-transform">R</button>
                  <button onClick={() => handleSelect(c, 'blue', 'ban')} className="w-8 h-8 bg-white/10 text-white rounded-md flex items-center justify-center text-xs hover:bg-white/20 transition-colors"><X size={14}/></button>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={getSuggestion}
            disabled={loading || (bluePicks.length === 0 && redPicks.length === 0)}
            className="btn-primary w-full mt-auto py-4 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Zap className="animate-spin" size={18} /> : <Brain size={18} />}
            {loading ? 'Analisando Draft...' : 'Sugerir Próximo Pick (IA)'}
          </button>
        </div>

        {/* Red Side */}
        <div className="glass-panel p-4 space-y-4 border-l-4 border-l-rift-red bg-rift-red/5">
          <h3 className="font-bold text-rift-red text-center uppercase tracking-widest text-sm">Time Vermelho</h3>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold text-white/30 uppercase mb-2">Bans ({redBans.length}/5)</p>
              <div className="flex flex-wrap gap-2 min-h-8">
                {redBans.map(c => (
                  <div key={c.id} onClick={() => removeChamp(c, redBans, setRedBans)} className="text-[10px] px-2 py-1 bg-white/5 border border-white/10 rounded cursor-pointer hover:bg-red-500/50 line-through text-white/40">{c.name}</div>
                ))}
                {Array.from({ length: 5 - redBans.length }).map((_, i) => (
                  <div key={`empty-ban-red-${i}`} className="w-12 h-6 border border-dashed border-white/10 rounded"></div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-white/30 uppercase mb-2">Picks ({redPicks.length}/5)</p>
              <div className="space-y-2 min-h-64">
                {redPicks.map(c => (
                  <div key={c.id} onClick={() => removeChamp(c, redPicks, setRedPicks)} className="flex justify-between items-center p-3 bg-rift-red/10 border border-rift-red/20 rounded-lg cursor-pointer hover:bg-red-500/20 group transition-all">
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{c.name}</span>
                      <span className="text-[9px] text-white/40 uppercase">{c.archetype}</span>
                    </div>
                    <span className="text-[10px] font-bold text-rift-red uppercase">{c.role}</span>
                  </div>
                ))}
                {Array.from({ length: 5 - redPicks.length }).map((_, i) => (
                  <div key={`empty-pick-red-${i}`} className="h-12 border border-dashed border-white/5 rounded-lg flex items-center justify-center text-white/5 text-[10px] font-bold">SLOT {i + 1}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {advice && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-8 prose prose-invert max-w-none border-t-4 border-t-rift-accent">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="text-rift-accent" size={24} />
            <h3 className="m-0 text-2xl font-display font-bold">Análise Estratégica do Coach</h3>
          </div>
          <div className="whitespace-pre-wrap text-white/80 leading-relaxed italic">
            {advice}
          </div>
        </motion.div>
      )}
    </div>
  );
}
