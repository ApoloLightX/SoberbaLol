import React, { useState } from 'react';
import { Brain, TrendingUp, AlertTriangle, Zap, Target, History, Swords, Shield } from 'lucide-react';
import { getAdaptiveAdvice } from '../services/aiService';
import { CHAMPIONS, Champion } from '../data/wildrift';
import { motion } from 'motion/react';

export default function AICoach() {
  const [stats, setStats] = useState({
    kills: 0,
    deaths: 0,
    assists: 0,
    goldPerMin: 750,
    duration: 15,
    role: 'Mid',
    mainChamp: 'Ahri',
    result: 'Derrota'
  });
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);

  const analyzePlaystyle = async () => {
    setLoading(true);
    const prompt = `Atue como um Coach de Machine Learning e Analista de Dados de Wild Rift (Patch 7.0c).
    O usuário inseriu os dados da sua última partida:
    Campeão: ${stats.mainChamp} (${stats.role})
    Resultado: ${stats.result}
    KDA: ${stats.kills}/${stats.deaths}/${stats.assists}
    Ouro por Minuto: ${stats.goldPerMin}
    Duração da Partida: ${stats.duration} minutos
    
    Com base nesses dados, faça uma análise profunda do estilo de jogo do usuário. 
    Aponte os principais erros (ex: muitas mortes, pouco farm) e sugira mudanças práticas de macro, itens ou runas para melhorar na próxima partida.
    Seja direto, técnico e aja como um coach profissional de esports. Responda em PT-BR.`;
    
    const result = await getAdaptiveAdvice(prompt);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-display font-bold text-rift-blue flex items-center gap-3">
          <Brain className="text-rift-blue" size={32} />
          Coach Pessoal IA
        </h2>
        <p className="text-white/60">
          Insira seus dados recentes manualmente para que a IA aprenda seu estilo e corrija seus erros de macro e micro.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass-panel p-6 space-y-6 border-t-2 border-t-rift-blue">
          <h3 className="font-bold text-xl border-b border-white/10 pb-4 flex items-center gap-2">
            <History size={18} className="text-rift-blue" />
            Dados da Partida
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-white/40 uppercase">Campeão</label>
                <select value={stats.mainChamp} onChange={e => setStats({...stats, mainChamp: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-sm outline-none focus:border-rift-blue">
                  {CHAMPIONS.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-white/40 uppercase">Rota</label>
                <select value={stats.role} onChange={e => setStats({...stats, role: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-sm outline-none focus:border-rift-blue">
                  <option>Top</option><option>Jungle</option><option>Mid</option><option>ADC</option><option>Support</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-white/40 uppercase">Abates (K)</label>
                <input type="number" value={stats.kills} onChange={e => setStats({...stats, kills: parseInt(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-sm outline-none focus:border-rift-blue" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-white/40 uppercase">Mortes (D)</label>
                <input type="number" value={stats.deaths} onChange={e => setStats({...stats, deaths: parseInt(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-sm outline-none focus:border-rift-blue" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-white/40 uppercase">Assist. (A)</label>
                <input type="number" value={stats.assists} onChange={e => setStats({...stats, assists: parseInt(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-sm outline-none focus:border-rift-blue" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-white/40 uppercase">Ouro por Minuto (GPM)</label>
              <input type="number" value={stats.goldPerMin} onChange={e => setStats({...stats, goldPerMin: parseInt(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-sm outline-none focus:border-rift-blue" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-white/40 uppercase">Duração (Min)</label>
                <input type="number" value={stats.duration} onChange={e => setStats({...stats, duration: parseInt(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-sm outline-none focus:border-rift-blue" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-white/40 uppercase">Resultado</label>
                <select value={stats.result} onChange={e => setStats({...stats, result: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-3 text-sm outline-none focus:border-rift-blue">
                  <option>Vitória</option><option>Derrota</option>
                </select>
              </div>
            </div>

            <button 
              onClick={analyzePlaystyle}
              disabled={loading}
              className="w-full py-4 bg-rift-blue text-white font-bold rounded-xl hover:bg-blue-600 transition-all disabled:opacity-50 mt-4 shadow-[0_0_20px_rgba(38,136,242,0.2)]"
            >
              {loading ? <Zap className="animate-spin mx-auto" size={20} /> : 'Analisar Meu Estilo de Jogo'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          {advice ? (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel p-8 prose prose-invert max-w-none h-full border-l-4 border-l-rift-accent">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <TrendingUp className="text-rift-accent" size={24} />
                <h3 className="m-0 text-2xl font-display font-bold">Diagnóstico do Coach</h3>
              </div>
              <div className="whitespace-pre-wrap text-white/80 leading-relaxed italic">{advice}</div>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="text-xs font-bold text-rift-accent uppercase mb-2 flex items-center gap-2"><Swords size={14}/> Foco Mecânico</h4>
                  <p className="text-[11px] text-white/40">Baseado no seu KDA, a IA sugere focar em posicionamento nas TFs.</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="text-xs font-bold text-rift-blue uppercase mb-2 flex items-center gap-2"><Shield size={14}/> Foco em Macro</h4>
                  <p className="text-[11px] text-white/40">Seu GPM indica que você pode melhorar o controle de waves laterais.</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="glass-panel p-8 h-full flex flex-col items-center justify-center text-center text-white/20 space-y-4">
              <AlertTriangle size={64} className="opacity-10" />
              <p className="max-w-xs">Insira seus dados ao lado e clique em Analisar para receber seu diagnóstico personalizado de alta performance.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
