import React, { useState, useEffect } from 'react';
import { CHAMPIONS, Champion, ITEMS, Item } from '../data/wildrift';
import { getAdaptiveBuild, GameContext, Recommendation } from '../services/decisionEngine';
import { Calculator, Search, X, Zap, Shield, Swords, Target, Brain, BarChart3, TrendingUp, Coins } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function BuildCalculator() {
  const [selectedChamp, setSelectedChamp] = useState<Champion | null>(null);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [gold, setGold] = useState(0);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = ITEMS.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedItems.find(i => i.id === item.id)
  );

  useEffect(() => {
    if (selectedChamp) {
      const context: GameContext = {
        myChamp: selectedChamp,
        enemies: [], // Simplificado para o calculador
        allies: [],
        gold: 20000, // Simular full build
        time: 20,
        state: 'Even'
      };
      setRecommendations(getAdaptiveBuild(context));
    }
  }, [selectedChamp]);

  const addItem = (item: Item) => {
    if (selectedItems.length < 6) {
      setSelectedItems([...selectedItems, item]);
      setGold(prev => prev + item.price);
    }
  };

  const removeItem = (id: string) => {
    const item = selectedItems.find(i => i.id === id);
    if (item) {
      setSelectedItems(selectedItems.filter(i => i.id !== id));
      setGold(prev => prev - item.price);
    }
  };

  const totalStats = selectedItems.reduce((acc, item) => {
    if (item.stats.ad) acc.ad += item.stats.ad;
    if (item.stats.ap) acc.ap += item.stats.ap;
    if (item.stats.hp) acc.hp += item.stats.hp;
    if (item.stats.armor) acc.armor += item.stats.armor;
    if (item.stats.mr) acc.mr += item.stats.mr;
    if (item.stats.as) acc.as += item.stats.as;
    if (item.stats.ah) acc.ah += item.stats.ah;
    return acc;
  }, { ad: 0, ap: 0, hp: 0, armor: 0, mr: 0, as: 0, ah: 0 });

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-display font-bold text-rift-gold flex items-center gap-3">
          <Calculator className="text-rift-gold" size={32} />
          Construtor de Builds v2.0
        </h2>
        <p className="text-white/60">Calcule atributos totais e receba sugestões de sinergia para sua build.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SELEÇÃO DE CAMPEÃO E ITENS */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 border-t-2 border-t-rift-accent">
            <h3 className="text-xs font-bold text-rift-accent uppercase tracking-widest mb-4">Campeão Base</h3>
            <select 
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-rift-accent transition-all"
              value={selectedChamp?.id || ''}
              onChange={(e) => setSelectedChamp(CHAMPIONS.find(c => c.id === e.target.value) || null)}
            >
              <option value="">Selecione...</option>
              {CHAMPIONS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="glass-panel p-6 border-t-2 border-t-rift-gold">
            <h3 className="text-xs font-bold text-rift-gold uppercase tracking-widest mb-4">Loja de Itens</h3>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
                <input 
                  type="text"
                  placeholder="Buscar item..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs outline-none focus:border-rift-gold transition-all"
                />
              </div>
              <div className="max-h-[400px] overflow-y-auto space-y-2 p-1 custom-scrollbar">
                {filteredItems.map(item => (
                  <button key={item.id} onClick={() => addItem(item)} className="w-full p-3 bg-white/5 border border-white/10 rounded-lg flex justify-between items-center hover:bg-white/10 transition-all group">
                    <div className="text-left">
                      <p className="text-xs font-bold group-hover:text-rift-gold transition-colors">{item.name}</p>
                      <p className="text-[8px] text-white/40 uppercase">{item.category}</p>
                    </div>
                    <span className="text-[10px] font-bold text-rift-gold">{item.price}G</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BUILD ATUAL E ATRIBUTOS */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-panel p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest">Build Atual ({selectedItems.length}/6)</h3>
              <div className="flex items-center gap-2 text-rift-gold">
                <Coins size={16} />
                <span className="text-xl font-mono font-bold">{gold}G</span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {selectedItems.map(item => (
                <div key={item.id} onClick={() => removeItem(item.id)} className="aspect-square bg-white/5 border border-white/10 rounded-xl flex flex-col items-center justify-center p-2 text-center cursor-pointer hover:bg-red-500/10 group transition-all">
                  <span className="text-[9px] font-bold leading-tight mb-1">{item.name}</span>
                  <X size={12} className="text-red-500 opacity-0 group-hover:opacity-100" />
                </div>
              ))}
              {Array.from({ length: 6 - selectedItems.length }).map((_, i) => (
                <div key={i} className="aspect-square border border-dashed border-white/5 rounded-xl flex items-center justify-center text-white/5">
                  <Zap size={20} />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* STATS TOTALS */}
            <div className="glass-panel p-6 space-y-4">
              <h3 className="text-sm font-bold flex items-center gap-2 mb-4"><BarChart3 size={16} className="text-rift-blue"/> Atributos Totais</h3>
              <div className="grid grid-cols-2 gap-4">
                <StatBox label="Ataque (AD)" value={totalStats.ad} color="text-rift-red" />
                <StatBox label="Poder (AP)" value={totalStats.ap} color="text-purple-400" />
                <StatBox label="Vida (HP)" value={totalStats.hp} color="text-green-400" />
                <StatBox label="Armadura" value={totalStats.armor} color="text-rift-gold" />
                <StatBox label="Res. Mágica" value={totalStats.mr} color="text-rift-blue" />
                <StatBox label="Aceleração" value={totalStats.ah} color="text-cyan-400" />
              </div>
            </div>

            {/* SUGGESTIONS */}
            <div className="glass-panel p-6 border-l-4 border-l-rift-accent">
              <h3 className="text-sm font-bold flex items-center gap-2 mb-4"><Brain size={16} className="text-rift-accent"/> Sugestões de Sinergia</h3>
              <div className="space-y-3">
                {recommendations.slice(0, 3).map(rec => (
                  <div key={rec.item.id} className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-[10px] font-bold text-rift-accent uppercase mb-1">{rec.item.name}</p>
                    <p className="text-[11px] text-white/60 italic leading-relaxed">"{rec.reason}"</p>
                  </div>
                ))}
                {recommendations.length === 0 && (
                  <p className="text-xs text-white/20 text-center py-8 italic">Selecione um campeão para ver sugestões.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="p-3 bg-white/5 rounded-lg border border-white/10">
      <p className="text-[9px] font-bold text-white/40 uppercase mb-1">{label}</p>
      <p className={`text-xl font-mono font-bold ${color}`}>{value}</p>
    </div>
  );
}
