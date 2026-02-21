import React, { useState } from 'react';
import { CHAMPIONS, ITEMS, RUNES, Champion, Item, Rune } from '../data/wildrift';
import { getAdaptiveAdvice } from '../services/geminiService';
import { Calculator, Plus, X } from 'lucide-react';

export default function BuildCalculator() {
  const [selectedChamp, setSelectedChamp] = useState<Champion | null>(null);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [selectedRunes, setSelectedRunes] = useState<Rune[]>([]);
  const [level, setLevel] = useState(15);
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);

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
    const prompt = `Atue como uma Calculadora de DPS e Analista de Builds de Wild Rift.
    Campeão: ${selectedChamp.name} (Nível ${level})
    Itens: ${selectedItems.map(i => i.name).join(', ') || 'Nenhum'}
    Runas: ${selectedRunes.map(r => r.name).join(', ') || 'Nenhuma'}
    
    Calcule uma estimativa teórica do DPS (Dano por Segundo) e do Burst Damage (Combo Completo) contra um alvo com 100 de Armadura e 100 de Resistência Mágica.
    Identifique o maior Power Spike dessa build e se ela é eficiente no meta atual (Patch 7.0c).
    Responda em formato de relatório técnico.`;
    
    const result = await getAdaptiveAdvice(prompt);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-display font-bold">Construtor de Builds Dinâmico</h2>
        <p className="text-white/60">Monte sua build e calcule o DPS e Power Spikes teóricos.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selection Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 space-y-4">
            <h3 className="font-bold text-rift-accent">1. Selecione o Campeão e Nível</h3>
            <div className="flex gap-4 items-center">
              <select 
                className="bg-rift-gray border border-white/10 rounded-lg px-4 py-2 flex-1"
                onChange={(e) => setSelectedChamp(CHAMPIONS.find(c => c.id === e.target.value) || null)}
              >
                <option value="">Escolha um campeão...</option>
                {CHAMPIONS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/50">Nível: {level}</span>
                <input type="range" min="1" max="15" value={level} onChange={(e) => setLevel(parseInt(e.target.value))} className="accent-rift-accent" />
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 space-y-4">
            <h3 className="font-bold text-rift-gold">2. Inventário ({selectedItems.length}/6)</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedItems.map((item, idx) => (
                <div key={idx} onClick={() => removeItem(idx)} className="p-2 bg-rift-gold/20 border border-rift-gold/30 rounded flex items-center gap-2 cursor-pointer hover:bg-red-500/20">
                  <span className="text-sm font-bold">{item.name}</span>
                  <X size={14} />
                </div>
              ))}
              {Array.from({ length: 6 - selectedItems.length }).map((_, i) => (
                <div key={`empty-${i}`} className="w-24 h-10 border border-dashed border-white/20 rounded flex items-center justify-center text-white/20">Vazio</div>
              ))}
            </div>
            <div className="max-h-40 overflow-y-auto grid grid-cols-2 md:grid-cols-3 gap-2">
              {ITEMS.map(item => (
                <button key={item.id} onClick={() => addItem(item)} className="p-2 border border-white/5 rounded text-left hover:border-rift-gold/50 transition-colors">
                  <div className="text-xs font-bold truncate">{item.name}</div>
                  <div className="text-[10px] text-rift-gold">{item.price}g</div>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 space-y-4">
            <h3 className="font-bold text-rift-blue">3. Runas ({selectedRunes.length}/4)</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedRunes.map(rune => (
                <div key={rune.id} onClick={() => removeRune(rune.id)} className="p-2 bg-rift-blue/20 border border-rift-blue/30 rounded flex items-center gap-2 cursor-pointer hover:bg-red-500/20">
                  <span className="text-sm font-bold">{rune.name}</span>
                  <X size={14} />
                </div>
              ))}
            </div>
            <div className="max-h-40 overflow-y-auto grid grid-cols-2 md:grid-cols-3 gap-2">
              {RUNES.map(rune => (
                <button key={rune.id} onClick={() => addRune(rune)} className="p-2 border border-white/5 rounded text-left hover:border-rift-blue/50 transition-colors">
                  <div className="text-xs font-bold truncate">{rune.name}</div>
                  <div className="text-[10px] text-rift-blue">{rune.tier}</div>
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
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 h-16"
          >
            <Calculator size={20} />
            {loading ? 'Calculando...' : 'Calcular DPS e Power Spike'}
          </button>

          {advice && (
            <div className="glass-panel p-6 prose prose-invert max-w-none text-sm">
              <div className="whitespace-pre-wrap">{advice}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
