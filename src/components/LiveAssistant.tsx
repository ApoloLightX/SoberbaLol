import React, { useState, useEffect } from 'react';
import { Timer, RotateCcw, Play, SquareSquare } from 'lucide-react';

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

  useEffect(() => {
    const interval = setInterval(() => {
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

    return () => clearInterval(interval);
  }, []);

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

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-display font-bold text-rift-red flex items-center gap-3">
          <Timer className="text-rift-red" size={32} />
          Assistente em Tempo Real (Overlay)
        </h2>
        <p className="text-white/60">Deixe o app aberto durante a partida para cronometrar feitiços e objetivos inimigos.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <h3 className="font-bold text-xl">Feitiços Inimigos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {Object.entries(timers).map(([role, spells]) => (
              <div key={role} className="glass-panel p-4 space-y-3">
                <h4 className="font-bold text-rift-accent uppercase tracking-wider text-sm">{role}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {spells.map(spell => (
                    <button
                      key={spell.id}
                      onClick={() => toggleSpell(role, spell.id)}
                      className={`p-2 rounded flex flex-col items-center justify-center gap-1 transition-all ${
                        spell.active 
                          ? 'bg-rift-red/20 border border-rift-red text-rift-red' 
                          : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-[10px] font-bold">{spell.name}</span>
                      <span className="text-lg font-mono">
                        {spell.active ? formatTime(spell.remaining) : `${spell.cooldown}s`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-xl text-rift-gold">Objetivos Neutros</h3>
          <div className="space-y-4">
            {objTimers.map(obj => (
              <div key={obj.id} className="glass-panel p-6 text-center space-y-4">
                <h4 className="font-bold text-lg">{obj.name}</h4>
                <div className={`text-4xl font-mono font-bold ${obj.active ? 'text-rift-gold' : 'text-white/30'}`}>
                  {obj.active ? formatTime(obj.remaining) : 'Pronto'}
                </div>
                <button
                  onClick={() => toggleObj(obj.id)}
                  className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 ${
                    obj.active ? 'bg-white/10 text-white' : 'bg-rift-gold text-rift-dark'
                  }`}
                >
                  {obj.active ? <RotateCcw size={18} /> : <Play size={18} />}
                  {obj.active ? 'Cancelar' : 'Iniciar Timer'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
