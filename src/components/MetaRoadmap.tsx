import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, History, Zap, Info, Star, AlertCircle, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function MetaRoadmap() {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-display font-bold text-rift-gold flex items-center gap-3">
          <Target className="text-rift-gold" size={32} />
          Roadmap & Meta Report
        </h2>
        <p className="text-white/60">O que está dominando o Rift hoje e o que esperar das próximas atualizações.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Meta */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 lg:p-8 border-t-2 border-t-rift-accent">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="text-rift-accent" size={20} />
              Análise do Meta (Patch 7.0c)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest">Tendência Principal</h4>
                <p className="text-sm text-white/80 leading-relaxed">
                  O meta atual favorece **Hypercarries** no Dragon Lane e **Tanks de Utilidade** no Top/Jungle. A introdução de itens como *Heartsteel* e *Titanic Hydra* tornou as lutas mais longas e focadas em escalonamento.
                </p>
                <div className="p-4 bg-rift-accent/5 rounded-xl border border-rift-accent/20">
                  <p className="text-[10px] font-bold text-rift-accent uppercase mb-1">Dica de Ouro</p>
                  <p className="text-xs text-white/60 italic">"Priorize o controle do Arauto aos 5 minutos para acelerar o ouro da sua equipe."</p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest">Power Spikes</h4>
                <ul className="space-y-2">
                  <MetaItem label="Heartsteel" desc="Dominando o Top Lane" />
                  <MetaItem label="Terminus" desc="Essencial para ADCs de On-hit" />
                  <MetaItem label="Sovereign" desc="Novo pico de poder para Magos" />
                </ul>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 lg:p-8 border-t-2 border-t-rift-blue">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Star className="text-rift-blue" size={20} />
              Tier List S+ (Ranked)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TierCard role="Baron Lane" champs={['Aatrox', 'Sett', 'Volibear']} color="rift-accent" />
              <TierCard role="Jungle" champs={['Viego', 'Lee Sin', 'Hecarim']} color="rift-blue" />
              <TierCard role="Mid Lane" champs={['Syndra', 'Yone', 'Akali']} color="rift-gold" />
              <TierCard role="Dragon Lane" champs={['Kalista', 'Zeri', 'Lucian']} color="rift-red" />
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div className="glass-panel p-6 lg:p-8 border-t-2 border-t-rift-gold space-y-8">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <History className="text-rift-gold" size={20} />
            Roadmap Soberba
          </h3>
          <div className="space-y-6">
            <RoadmapStep 
              status="complete" 
              title="Engine v7.0c" 
              desc="Banco de dados atualizado com todos os novos itens e campeões." 
              date="Fev 2026"
            />
            <RoadmapStep 
              status="complete" 
              title="IA Live Assistant" 
              desc="Janela flutuante com conselhos em tempo real durante a match." 
              date="Fev 2026"
            />
            <RoadmapStep 
              status="current" 
              title="Mobile Optimization" 
              desc="Melhoria na responsividade para uso em tablets e celulares." 
              date="Mar 2026"
            />
            <RoadmapStep 
              status="upcoming" 
              title="API Integration" 
              desc="Sincronização automática com seu histórico de partidas." 
              date="Abr 2026"
            />
          </div>
          
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-rift-gold">
              <AlertCircle size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Aviso</span>
            </div>
            <p className="text-[10px] text-white/40 leading-relaxed">
              As sugestões da IA são baseadas em dados de High Elo (Mestre+). Use com sabedoria.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaItem({ label, desc }: { label: string, desc: string }) {
  return (
    <li className="flex items-center gap-3 p-2 bg-white/5 rounded-lg border border-white/5">
      <div className="w-1.5 h-1.5 rounded-full bg-rift-accent"></div>
      <div>
        <p className="text-xs font-bold">{label}</p>
        <p className="text-[10px] text-white/40">{desc}</p>
      </div>
    </li>
  );
}

function TierCard({ role, champs, color }: { role: string, champs: string[], color: string }) {
  return (
    <div className={`p-4 bg-white/5 rounded-xl border-l-4 border-l-${color} hover:bg-white/10 transition-colors`}>
      <p className="text-[10px] font-bold text-white/40 uppercase mb-2 tracking-widest">{role}</p>
      <div className="flex flex-wrap gap-2">
        {champs.map(c => (
          <span key={c} className="text-xs font-bold text-white">{c}</span>
        ))}
      </div>
    </div>
  );
}

function RoadmapStep({ status, title, desc, date }: { status: 'complete' | 'current' | 'upcoming', title: string, desc: string, date: string }) {
  return (
    <div className="relative pl-6 border-l border-white/10">
      <div className={`absolute -left-1.5 top-0 w-3 h-3 rounded-full border-2 border-rift-dark ${
        status === 'complete' ? 'bg-rift-accent' : status === 'current' ? 'bg-rift-blue animate-pulse' : 'bg-white/20'
      }`}></div>
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <h4 className={`text-sm font-bold ${status === 'upcoming' ? 'text-white/40' : 'text-white'}`}>{title}</h4>
          <span className="text-[9px] text-white/20 font-mono">{date}</span>
        </div>
        <p className="text-[11px] text-white/40 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
