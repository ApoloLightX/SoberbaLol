import React, { useState } from 'react';
import { CHAMPIONS, ITEMS, RUNES, Champion, Item, Rune } from '../data/wildrift';
import { getAdaptiveAdvice } from '../services/geminiService';
import { Calculator, Plus, X, Zap, Coins, Shield, Swords, Brain } from 'lucide-react';
import { motion } from 'motion/react';

export default function BuildCalculator() {
  const [selectedChamp, setSelectedChamp] = useState<Champion | null>(null);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [selectedRunes, setSelectedRunes] = useState<Rune[]>([]);
  const [level, setLevel] = useState(15);
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);
  const [itemFilter, setItemFilter] = useState<'All' | 'Physical' | 'Magical' | 'Defense' | 'Boots'>('All');

  const addItem = (item: Item) => {
    if (selectedItems.length < 6) setSelectedItems([...selectedItems, item]);
  };

  const removeItem = (index: number) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const addRune = (rune: Rune) => {
    if (selectedRunes.length < 4 && !selectedRunes.find(r => r.id === rune.id)) {
      setSelectedRunes([...selectedRunes, rune]);
    }
  };

  const removeRune = (id: string) => {
    setSelectedRunes(selectedRunes.filter(r => r.id !== id));
  };

  const calculateDPS = async () => {
    if (!selectedChamp) return;
    setLoading(true);
    const prompt = `Atue como uma Calculadora de DPS e Analista de Builds de Wild Rift (Patch 7.0c).
    Campeão: ${selectedChamp.name} (Nível ${level})
    Itens: ${selectedItems.map(i => i.name).join(', ') || 'Nenhum'}
    Runas: ${selectedRunes.map(r => r.name).join(', ') || 'Nenhuma'}
    
    Calcule uma estimativa teórica do DPS e do Burst Damage contra um alvo com 100 de Armadura/MR.
    Identifique o maior Power Spike dessa build e se ela é eficiente no meta atual. Responda em PT-BR.`;
    
    const result = await getAdaptiveAdvice(prompt);
    setAdvice(result);
    setLoading(false);
  };

  const filteredItems = ITEMS.filter(i => itemFilter === 'All' || i.type === itemFilter);

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-display font-bold text-rift-gold flex items-center gap-3">
          <Calculator className="text-rift-gold" size={32} />
          Construtor de Builds
        </h2>
        <p className="text-white/60">Monte sua build e calcule o DPS e Power Spikes teóricos para o Patch 7.0c.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selection Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 space-y-4 border-t-2 border-t-rift-accent">
            <h3 className="font-bold text-rift-accent flex items-center gap-2 uppercase text-xs tracking-widest">
              <Zap size={14} /> 1. Campeão e Nível
            </h3>
            <div className="flex flex-wrap gap-4 items-center">
              <select 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 flex-1 outline-none focus:border-rift-accent transition-all"
                onChange={(e) => setSelectedChamp(CHAMPIONS.find(c => c.id === e.target.value) || null)}
              >
                <option value="">Escolha um campeão...</option>
                {CHAMPIONS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <div className="flex items-center gap-4 bg-white/5 p-3 rounded-lg border border-white/10">
                <span className="text-xs font-bold text-white/40 uppercase">Nível {level}</span>
                <input type="range" min="1" max="15" value={level} onChange={(e) => setLevel(parseInt(e.target.value))} className="accent-rift-accent w-32" />
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 space-y-4 border-t-2 border-t-rift-gold">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-rift-gold flex items-center gap-2 uppercase text-xs tracking-widest">
                <Coins size={14} /> 2. Inventário ({selectedItems.length}/6)
              </h3>
              <div className="flex gap-2">
                {['All', 'Physical', 'Magical', 'Defense'].map(f => (
                  <button key={f} onClick={() => setItemFilter(f as any)} className={`px-2 py-1 rounded text-[9px] font-bold uppercase transition-all ${itemFilter === f ? 'bg-rift-gold text-rift-dark' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}>{f}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
              {selectedItems.map((item, idx) => (
                <div key={idx} onClick={() => removeItem(idx)} className="aspect-square bg-rift-gold/10 border border-rift-gold/30 rounded-lg flex flex-col items-center justify-center p-1 cursor-pointer hover:bg-red-500/20 transition-all group relative">
                  <span className="text-[8px] font-bold text-center leading-tight">{item.name}</span>
                  <X size={10} className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-red-500" />
                </div>
              ))}
              {Array.from({ length: 6 - selectedItems.length }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square border border-dashed border-white/10 rounded-lg flex items-center justify-center text-white/5 text-[8px] font-bold">VAZIO</div>
              ))}
            </div>
            <div className="max-h-48 overflow-y-auto grid grid-cols-2 md:grid-cols-4 gap-2 p-1 custom-scrollbar">
              {filteredItems.map(item => (
                <button key={item.id} onClick={() => addItem(item)} className="p-2 bg-white/5 border border-white/10 rounded-lg text-left hover:border-rift-gold/50 transition-all group">
                  <div className="text-[10px] font-bold truncate group-hover:text-rift-gold">{item.name}</div>
                  <div className="text-[9px] text-white/30">{item.price}g</div>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 space-y-4 border-t-2 border-t-rift-blue">
            <h3 className="font-bold text-rift-blue flex items-center gap-2 uppercase text-xs tracking-widest">
              <Zap size={14} /> 3. Runas ({selectedRunes.length}/4)
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedRunes.map(rune => (
                <div key={rune.id} onClick={() => removeRune(rune.id)} className="px-3 py-2 bg-rift-blue/10 border border-rift-blue/30 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-red-500/20 transition-all">
                  <span className="text-xs font-bold">{rune.name}</span>
                  <X size={12} />
                </div>
              ))}
              {Array.from({ length: 4 - selectedRunes.length }).map((_, i) => (
                <div key={`empty-rune-${i}`} className="px-4 py-2 border border-dashed border-white/10 rounded-lg text-white/5 text-xs font-bold">RUNA {i + 1}</div>
              ))}
            </div>
            <div className="max-h-40 overflow-y-auto grid grid-cols-2 md:grid-cols-4 gap-2 p-1 custom-scrollbar">
              {RUNES.map(rune => (
                <button key={rune.id} onClick={() => addRune(rune)} className="p-2 bg-white/5 border border-white/10 rounded-lg text-left hover:border-rift-blue/50 transition-all group">
                  <div className="text-[10px] font-bold truncate group-hover:text-rift-blue">{rune.name}</div>
                  <div className="text-[9px] text-white/30 uppercase">{rune.tier}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="space-y-4">
          <button 
            onClick={calculateDPS}
            disabled={!selectedChamp || loading}
            className="btn-primary w-full flex flex-col items-center justify-center gap-1 disabled:opacity-50 h-24 shadow-[0_0_30px_rgba(0,255,136,0.1)]"
          >
            <div className="flex items-center gap-2">
              {loading ? <Zap className="animate-spin" size={20} /> : <Calculator size={20} />}
              <span className="text-lg">CALCULAR DPS</span>
            </div>
            <span className="text-[10px] font-normal opacity-60">Análise de Power Spike IA</span>
          </button>

          {advice && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel p-6 prose prose-invert max-w-none text-sm border-l-4 border-l-rift-accent">
              <div className="flex items-center gap-2 mb-4 text-rift-accent font-bold uppercase tracking-tighter">
                <Brain size={16} /> Relatório Técnico
              </div>
              <div className="whitespace-pre-wrap text-white/80 italic leading-relaxed">{advice}</div>
            </motion.div>
          )}
          
          {!advice && !loading && (
            <div className="glass-panel p-8 text-center space-y-4 text-white/20">
              <Calculator size={48} className="mx-auto opacity-10" />
              <p className="text-xs">Selecione um campeão e itens para gerar o relatório de eficiência.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
