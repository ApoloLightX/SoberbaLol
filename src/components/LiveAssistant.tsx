import React, { useState, useEffect, useRef } from 'react';
import { Timer, RotateCcw, Play, SquareSquare, MessageSquare, Zap, Shield, Swords, Target, Brain, X } from 'lucide-react';
import { getAdaptiveAdvice } from '../services/geminiService';
import { CHAMPIONS, Champion } from '../data/wildrift';

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

  return (
    <div className="space-y-6 relative">
      <header className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-display font-bold text-rift-red flex items-center gap-3">
            <Timer className="text-rift-red" size={32} />
            Assistente Live
          </h2>
          <p className="text-white/60">Controle a partida e receba conselhos da IA em tempo real.</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-mono font-bold text-rift-accent">{formatTime(gameTime)}</div>
          <div className="text-xs text-white/40 uppercase font-bold">{gamePhase} Game</div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Controls */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Champion Selection for AI */}
          <div className="glass-panel p-4 flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-[10px] font-bold text-white/40 uppercase mb-1">Seu Campeão</label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded p-2 text-sm outline-none focus:border-rift-blue"
                onChange={(e) => setMyChamp(CHAMPIONS.find(c => c.id === e.target.value) || null)}
              >
                <option value="">Selecione...</option>
                {CHAMPIONS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-[10px] font-bold text-white/40 uppercase mb-1">Oponente Direto</label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded p-2 text-sm outline-none focus:border-rift-red"
                onChange={(e) => setEnemyChamp(CHAMPIONS.find(c => c.id === e.target.value) || null)}
              >
                <option value="">Selecione...</option>
                {CHAMPIONS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <button 
              onClick={getLiveAdvice}
              className="px-6 py-3 bg-rift-accent text-rift-dark font-bold rounded-lg flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <Brain size={18} />
              Pedir Ajuda IA
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-xl flex items-center gap-2">
              <Shield className="text-rift-red" size={20} />
              Feitiços Inimigos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {Object.entries(timers).map(([role, spells]) => (
                <div key={role} className="glass-panel p-4 space-y-3 border-t-2 border-t-white/5 hover:border-t-rift-red transition-colors">
                  <h4 className="font-bold text-rift-accent uppercase tracking-wider text-xs">{role}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {spells.map(spell => (
                      <button
                        key={spell.id}
                        onClick={() => toggleSpell(role, spell.id)}
                        className={`p-2 rounded flex flex-col items-center justify-center gap-1 transition-all ${
                          spell.active 
                            ? 'bg-rift-red/20 border border-rift-red text-rift-red shadow-[0_0_10px_rgba(242,38,75,0.2)]' 
                            : 'bg-white/5 border border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <span className="text-[9px] font-bold uppercase">{spell.name}</span>
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
                    className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
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
            <h4 className="text-xs font-bold text-rift-blue uppercase mb-2">Dica de Macro</h4>
            <p className="text-[11px] text-white/60 leading-relaxed">
              No Wild Rift, o controle de visão em volta do Barão aos 12 minutos é crucial. Se o inimigo gastar o Flash, você tem uma janela de 150s para punir.
            </p>
          </div>
        </div>
      </div>

      {/* AI Floating Window / Overlay */}
      {showAI && (
        <div className="fixed bottom-8 right-8 w-80 md:w-96 glass-panel shadow-2xl border-rift-accent/30 z-50 overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="bg-rift-accent p-3 flex justify-between items-center">
            <div className="flex items-center gap-2 text-rift-dark font-bold text-sm">
              <Brain size={16} />
              CONSELHO DA IA
            </div>
            <button onClick={() => setShowAI(false)} className="text-rift-dark/60 hover:text-rift-dark">
              <X size={18} />
            </button>
          </div>
          <div className="p-6 max-h-96 overflow-y-auto bg-rift-gray/95 backdrop-blur-xl">
            {loadingAI ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <Zap className="text-rift-accent animate-bounce" size={32} />
                <p className="text-xs text-white/40 animate-pulse">Analisando o estado do jogo...</p>
              </div>
            ) : (
              <div className="prose prose-invert prose-sm">
                <div className="whitespace-pre-wrap text-white/90 leading-relaxed italic">
                  "{aiAdvice}"
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-[10px] text-white/20 uppercase font-bold">Soberba Engine v7</span>
                  <button onClick={getLiveAdvice} className="text-[10px] text-rift-accent font-bold hover:underline">ATUALIZAR</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
