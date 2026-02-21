import React, { useState } from 'react';
import { CHAMPIONS, Champion } from '../data/wildrift';
import { getAdaptiveAdvice } from '../services/geminiService';
import { Swords, Search, X } from 'lucide-react';

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
    !bluePicks.includes(c) && !redPicks.includes(c) &&
    !blueBans.includes(c) && !redBans.includes(c)
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
    const prompt = `Atue como um Coach de Draft de Wild Rift.
    Time Azul (Picks): ${bluePicks.map(c => c.name).join(', ')}
    Time Vermelho (Picks): ${redPicks.map(c => c.name).join(', ')}
    Bans: ${[...blueBans, ...redBans].map(c => c.name).join(', ')}
    
    Analise a sinergia, os counters e sugira os próximos 2 melhores picks para o Time Azul e para o Time Vermelho. Explique o porquê.`;
    
    const result = await getAdaptiveAdvice(prompt);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-display font-bold">Simulador de Draft (Pick & Ban)</h2>
        <p className="text-white/60">Simule a fase de escolhas e receba sugestões da IA em tempo real.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Blue Side */}
        <div className="glass-panel p-4 space-y-4 border-l-4 border-l-rift-blue">
          <h3 className="font-bold text-rift-blue text-center">Time Azul</h3>
          <div className="space-y-2">
            <p className="text-xs text-white/50">Bans ({blueBans.length}/5)</p>
            <div className="flex gap-2 min-h-8">
              {blueBans.map(c => (
                <div key={c.id} onClick={() => removeChamp(c, blueBans, setBlueBans)} className="text-[10px] px-2 py-1 bg-white/10 rounded cursor-pointer hover:bg-red-500/50 line-through text-white/50">{c.name}</div>
              ))}
            </div>
            <p className="text-xs text-white/50">Picks ({bluePicks.length}/5)</p>
            <div className="space-y-2 min-h-40">
              {bluePicks.map(c => (
                <div key={c.id} onClick={() => removeChamp(c, bluePicks, setBluePicks)} className="flex justify-between items-center p-2 bg-rift-blue/20 border border-rift-blue/30 rounded cursor-pointer hover:bg-red-500/20">
                  <span className="font-bold text-sm">{c.name}</span>
                  <span className="text-[10px] uppercase">{c.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Selection */}
        <div className="glass-panel p-4 space-y-4 flex flex-col">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
            <input 
              type="text"
              placeholder="Buscar campeão..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-rift-gray border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:border-rift-accent"
            />
          </div>
          <div className="flex-1 overflow-y-auto max-h-64 grid grid-cols-3 gap-2 p-1">
            {filteredChampions.map(c => (
              <div key={c.id} className="relative group">
                <div className="p-2 bg-white/5 border border-white/10 rounded text-center text-xs font-bold truncate">
                  {c.name}
                </div>
                <div className="absolute inset-0 bg-rift-dark/90 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1 transition-opacity rounded">
                  <button onClick={() => handleSelect(c, 'blue', 'pick')} className="w-6 h-6 bg-rift-blue text-white rounded flex items-center justify-center text-xs font-bold">B</button>
                  <button onClick={() => handleSelect(c, 'red', 'pick')} className="w-6 h-6 bg-rift-red text-white rounded flex items-center justify-center text-xs font-bold">R</button>
                  <button onClick={() => handleSelect(c, 'blue', 'ban')} className="w-6 h-6 bg-white/20 text-white rounded flex items-center justify-center text-xs"><X size={12}/></button>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={getSuggestion}
            disabled={loading}
            className="btn-primary w-full mt-auto"
          >
            {loading ? 'Analisando Draft...' : 'Sugerir Próximo Pick (IA)'}
          </button>
        </div>

        {/* Red Side */}
        <div className="glass-panel p-4 space-y-4 border-l-4 border-l-rift-red">
          <h3 className="font-bold text-rift-red text-center">Time Vermelho</h3>
          <div className="space-y-2">
            <p className="text-xs text-white/50">Bans ({redBans.length}/5)</p>
            <div className="flex gap-2 min-h-8">
              {redBans.map(c => (
                <div key={c.id} onClick={() => removeChamp(c, redBans, setRedBans)} className="text-[10px] px-2 py-1 bg-white/10 rounded cursor-pointer hover:bg-red-500/50 line-through text-white/50">{c.name}</div>
              ))}
            </div>
            <p className="text-xs text-white/50">Picks ({redPicks.length}/5)</p>
            <div className="space-y-2 min-h-40">
              {redPicks.map(c => (
                <div key={c.id} onClick={() => removeChamp(c, redPicks, setRedPicks)} className="flex justify-between items-center p-2 bg-rift-red/20 border border-rift-red/30 rounded cursor-pointer hover:bg-red-500/20">
                  <span className="font-bold text-sm">{c.name}</span>
                  <span className="text-[10px] uppercase">{c.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {advice && (
        <div className="glass-panel p-6 prose prose-invert max-w-none">
          <div className="whitespace-pre-wrap">{advice}</div>
        </div>
      )}
    </div>
  );
}
