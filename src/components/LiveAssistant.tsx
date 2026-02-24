import React, { useState, useEffect, useRef } from 'react';
import { Timer, RotateCcw, Play, SquareSquare, MessageSquare, Zap, Shield, Swords, Target, Brain, X } from 'lucide-react';
import { getAdaptiveAdvice } from '../services/geminiService';
import { CHAMPIONS, Champion } from '../data/wildrift';
import { motion, AnimatePresence } from 'motion/react';

interface SpellTimer {
  id: string;
  name: string;
  cooldown: number;
  remaining: number;
  active: boolean;
}

const INITIAL_SPELLS: SpellTimer[] = [
  { id: 'flash', name: 'Flash', cooldown: 150, remaining: 0, active: false },
  { id: 'ignite', name: 'Incendiar', cooldown: 90, remaining: 0, active: false },
  { id: 'heal', name: 'Curar', cooldown: 120, remaining: 0, active: false },
  { id: 'exhaust', name: 'Exaustão', cooldown: 105, remaining: 0, active: false },
  { id: 'smite', name: 'Golpear', cooldown: 90, remaining: 0, active: false },
];

const OBJECTIVES = [
  { id: 'dragon', name: 'Dragão', cooldown: 300 },
  { id: 'baron', name: 'Barão', cooldown: 210 },
];

export default function LiveAssistant() {
  const [timers, setTimers] = useState<Record<string, SpellTimer[]>>({
    Top: INITIAL_SPELLS.map(s => ({...s})),
    Jungle: INITIAL_SPELLS.map(s => ({...s})),
    Mid: INITIAL_SPELLS.map(s => ({...s})),
    ADC: INITIAL_SPELLS.map(s => ({...s})),
    Support: INITIAL_SPELLS.map(s => ({...s})),
  });

  const [objTimers, setObjTimers] = useState(
    OBJECTIVES.map(o => ({ ...o, remaining: 0, active: false }))
  );

  // AI Assistant State
  const [showAI, setShowAI] = useState(false);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [myChamp, setMyChamp] = useState<Champion | null>(null);
  const [enemyChamp, setEnemyChamp] = useState<Champion | null>(null);
  const [gamePhase, setGamePhase] = useState<'Early' | 'Mid' | 'Late'>('Early');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setGameTime(prev => prev + 1);
      
      setTimers(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(role => {
          next[role] = next[role].map(spell => {
            if (spell.active && spell.remaining > 0) {
              return { ...spell, remaining: spell.remaining - 1 };
            } else if (spell.active && spell.remaining <= 0) {
              return { ...spell, active: false, remaining: 0 };
            }
            return spell;
          });
        });
        return next;
      });

      setObjTimers(prev => prev.map(obj => {
        if (obj.active && obj.remaining > 0) {
          return { ...obj, remaining: obj.remaining - 1 };
        } else if (obj.active && obj.remaining <= 0) {
          return { ...obj, active: false, remaining: 0 };
        }
        return obj;
      }));
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (gameTime < 480) setGamePhase('Early');
    else if (gameTime < 960) setGamePhase('Mid');
    else setGamePhase('Late');
  }, [gameTime]);

  const toggleSpell = (role: string, spellId: string) => {
    setTimers(prev => {
      const next = { ...prev };
      next[role] = next[role].map(s => {
        if (s.id === spellId) {
          if (s.active) return { ...s, active: false, remaining: 0 };
          return { ...s, active: true, remaining: s.cooldown };
        }
        return s;
      });
      return next;
    });
  };

  const toggleObj = (objId: string) => {
    setObjTimers(prev => prev.map(o => {
      if (o.id === objId) {
        if (o.active) return { ...o, active: false, remaining: 0 };
        return { ...o, active: true, remaining: o.cooldown };
      }
      return o;
    }));
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const getLiveAdvice = async () => {
    if (!myChamp) {
      setAiAdvice("Por favor, selecione seu campeão primeiro.");
      setShowAI(true);
      return;
    }
    
    setLoadingAI(true);
    setShowAI(true);
    
    const activeSpells = Object.entries(timers).flatMap(([role, spells]) => 
      spells.filter(s => s.active).map(s => `${role} ${s.name}`)
    );
    
    const activeObjs = objTimers.filter(o => o.active).map(o => o.name);

    const prompt = `Atue como um Assistente de Partida em Tempo Real de Wild Rift (Patch 7.0c).
    Dados Atuais:
    - Meu Campeão: ${myChamp.name}
    - Oponente Direto: ${enemyChamp?.name || 'Desconhecido'}
    - Tempo de Jogo: ${formatTime(gameTime)} (Fase: ${gamePhase})
    - Feitiços Inimigos em Recarga: ${activeSpells.join(', ') || 'Nenhum'}
    - Objetivos em Recarga: ${activeObjs.join(', ') || 'Nenhum'}
    
    Com base nisso, me dê 3 instruções CURTAS e AGRESSIVAS para ganhar a match agora. Foque em macro, janelas de oportunidade e itens. Responda em PT-BR.`;
    
    const result = await getAdaptiveAdvice(prompt);
    setAiAdvice(result);
    setLoadingAI(false);
  };

  const resetGame = () => {
    setGameTime(0);
    setTimers({
      Top: INITIAL_SPELLS.map(s => ({...s})),
      Jungle: INITIAL_SPELLS.map(s => ({...s})),
      Mid: INITIAL_SPELLS.map(s => ({...s})),
      ADC: INITIAL_SPELLS.map(s => ({...s})),
      Support: INITIAL_SPELLS.map(s => ({...s})),
    });
    setObjTimers(OBJECTIVES.map(o => ({ ...o, remaining: 0, active: false })));
    setAiAdvice(null);
    setShowAI(false);
  };

  return (
    <div className="space-y-6 relative pb-20 lg:pb-0">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-rift-red flex items-center gap-3">
            <Timer className="text-rift-red" size={32} />
            Assistente Live
          </h2>
          <p className="text-white/60">Controle a partida e receba conselhos da IA em tempo real.</p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 w-full sm:w-auto justify-between sm:justify-start">
          <div className="text-right">
            <div className="text-3xl lg:text-4xl font-mono font-bold text-rift-accent">{formatTime(gameTime)}</div>
            <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest">{gamePhase} Game</div>
          </div>
          <button onClick={resetGame} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white">
            <RotateCcw size={20} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Controls */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Champion Selection for AI */}
          <div className="glass-panel p-4 flex flex-col sm:flex-row gap-4 items-end">
            <div className="w-full sm:flex-1">
              <label className="block text-[10px] font-bold text-white/40 uppercase mb-1 tracking-widest">Seu Campeão</label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-rift-blue transition-all"
                value={myChamp?.id || ''}
                onChange={(e) => setMyChamp(CHAMPIONS.find(c => c.id === e.target.value) || null)}
              >
                <option value="">Selecione...</option>
                {CHAMPIONS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="w-full sm:flex-1">
              <label className="block text-[10px] font-bold text-white/40 uppercase mb-1 tracking-widest">Oponente Direto</label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-rift-red transition-all"
                value={enemyChamp?.id || ''}
                onChange={(e) => setEnemyChamp(CHAMPIONS.find(c => c.id === e.target.value) || null)}
              >
                <option value="">Selecione...</option>
                {CHAMPIONS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <button 
              onClick={getLiveAdvice}
              disabled={loadingAI}
              className="w-full sm:w-auto px-6 py-3 bg-rift-accent text-rift-dark font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,255,136,0.2)] disabled:opacity-50"
            >
              {loadingAI ? <Zap className="animate-spin" size={18} /> : <Brain size={18} />}
              IA HELP
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-xl flex items-center gap-2">
              <Shield className="text-rift-red" size={20} />
              Feitiços Inimigos
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {Object.entries(timers).map(([role, spells]) => (
                <div key={role} className="glass-panel p-4 space-y-3 border-t-2 border-t-white/5 hover:border-t-rift-red transition-colors">
                  <h4 className="font-bold text-rift-accent uppercase tracking-widest text-[10px]">{role}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {spells.map(spell => (
                      <button
                        key={spell.id}
                        onClick={() => toggleSpell(role, spell.id)}
                        className={`p-2 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                          spell.active 
                            ? 'bg-rift-red/20 border border-rift-red text-rift-red shadow-[0_0_10px_rgba(242,38,75,0.2)]' 
                            : 'bg-white/5 border border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <span className="text-[9px] font-bold uppercase tracking-tighter">{spell.name}</span>
                        <span className="text-lg font-mono font-bold">
                          {spell.active ? formatTime(spell.remaining) : `${spell.cooldown}s`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Objectives */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-bold text-xl text-rift-gold flex items-center gap-2">
              <Target size={20} />
              Objetivos
            </h3>
            <div className="space-y-4">
              {objTimers.map(obj => (
                <div key={obj.id} className="glass-panel p-6 text-center space-y-4 border-r-4 border-r-rift-gold/20">
                  <h4 className="font-bold text-lg">{obj.name}</h4>
                  <div className={`text-4xl font-mono font-bold ${obj.active ? 'text-rift-gold' : 'text-white/10'}`}>
                    {obj.active ? formatTime(obj.remaining) : 'PRONTO'}
                  </div>
                  <button
                    onClick={() => toggleObj(obj.id)}
                    className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                      obj.active ? 'bg-white/10 text-white' : 'bg-rift-gold text-rift-dark hover:scale-[1.02]'
                    }`}
                  >
                    {obj.active ? <RotateCcw size={18} /> : <Play size={18} />}
                    {obj.active ? 'CANCELAR' : 'INICIAR TIMER'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-4 bg-rift-blue/10 border-rift-blue/30">
            <h4 className="text-[10px] font-bold text-rift-blue uppercase mb-2 tracking-widest">Dica de Macro</h4>
            <p className="text-[11px] text-white/60 leading-relaxed italic">
              "No Wild Rift, o controle de visão em volta do Barão aos 12 minutos é crucial. Se o inimigo gastar o Flash, você tem uma janela de 150s para punir."
            </p>
          </div>
        </div>
      </div>

      {/* AI Floating Window / Overlay */}
      <AnimatePresence>
        {showAI && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-96 glass-panel shadow-2xl border-rift-accent/30 z-50 overflow-hidden backdrop-blur-2xl"
          >
            <div className="bg-rift-accent p-3 flex justify-between items-center">
              <div className="flex items-center gap-2 text-rift-dark font-bold text-xs uppercase tracking-widest">
                <Brain size={16} />
                Soberba Engine v7
              </div>
              <button onClick={() => setShowAI(false)} className="text-rift-dark/60 hover:text-rift-dark transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto bg-rift-gray/90 custom-scrollbar">
              {loadingAI ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <Zap className="text-rift-accent animate-bounce" size={32} />
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest animate-pulse">Analisando o estado do jogo...</p>
                </div>
              ) : (
                <div className="prose prose-invert prose-sm">
                  <div className="whitespace-pre-wrap text-white/90 leading-relaxed italic font-medium">
                    {aiAdvice}
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="text-[9px] text-white/20 uppercase font-bold tracking-tighter">Live Analysis Active</span>
                    <button onClick={getLiveAdvice} className="text-[10px] text-rift-accent font-bold hover:underline uppercase tracking-widest">Atualizar</button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
