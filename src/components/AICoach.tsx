import React, { useState } from 'react';
import { Brain, TrendingUp, AlertTriangle } from 'lucide-react';
import { getAdaptiveAdvice } from '../services/geminiService';

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
    const prompt = `Atue como um Coach de Machine Learning e Analista de Dados de Wild Rift.
    O usuário inseriu os dados da sua última partida (ou média recente):
    Campeão: ${stats.mainChamp} (${stats.role})
    Resultado: ${stats.result}
    KDA: ${stats.kills}/${stats.deaths}/${stats.assists}
    Ouro por Minuto: ${stats.goldPerMin}
    Duração da Partida: ${stats.duration} minutos
    
    Com base nesses dados, faça uma análise profunda do estilo de jogo do usuário. 
    Aponte os principais erros (ex: muitas mortes, pouco farm) e sugira mudanças práticas de macro, itens ou runas para melhorar na próxima partida.
    Seja direto, técnico e aja como um coach profissional de esports.`;
    
    const result = await getAdaptiveAdvice(prompt);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-display font-bold text-rift-blue flex items-center gap-3">
          <Brain className="text-rift-blue" size={32} />
          Coach Pessoal IA (Machine Learning)
        </h2>
        <p className="text-white/60">
          Como a API oficial da Riot Games para Wild Rift é restrita a parceiros de esports, 
          insira seus dados recentes manualmente para que a IA aprenda seu estilo e corrija seus erros.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass-panel p-6 space-y-6">
          <h3 className="font-bold text-xl border-b border-white/10 pb-4">Dados da Partida</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-white/50">Campeão</label>
                <input type="text" value={stats.mainChamp} onChange={e => setStats({...stats, mainChamp: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-sm outline-none focus:border-rift-blue" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-white/50">Rota</label>
                <select value={stats.role} onChange={e => setStats({...stats, role: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-sm outline-none focus:border-rift-blue">
                  <option>Top</option><option>Jungle</option><option>Mid</option><option>ADC</option><option>Support</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <label className="text-xs text-white/50">Abates (K)</label>
                <input type="number" value={stats.kills} onChange={e => setStats({...stats, kills: parseInt(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-sm outline-none focus:border-rift-blue" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-white/50">Mortes (D)</label>
                <input type="number" value={stats.deaths} onChange={e => setStats({...stats, deaths: parseInt(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-sm outline-none focus:border-rift-blue" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-white/50">Assist. (A)</label>
                <input type="number" value={stats.assists} onChange={e => setStats({...stats, assists: parseInt(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-sm outline-none focus:border-rift-blue" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-white/50">Ouro por Minuto (GPM)</label>
              <input type="number" value={stats.goldPerMin} onChange={e => setStats({...stats, goldPerMin: parseInt(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-sm outline-none focus:border-rift-blue" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-white/50">Duração (Min)</label>
                <input type="number" value={stats.duration} onChange={e => setStats({...stats, duration: parseInt(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-sm outline-none focus:border-rift-blue" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-white/50">Resultado</label>
                <select value={stats.result} onChange={e => setStats({...stats, result: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-sm outline-none focus:border-rift-blue">
                  <option>Vitória</option><option>Derrota</option>
                </select>
              </div>
            </div>

            <button 
              onClick={analyzePlaystyle}
              disabled={loading}
              className="w-full py-3 bg-rift-blue text-white font-bold rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 mt-4"
            >
              {loading ? 'Processando Perfil...' : 'Analisar Meu Estilo de Jogo'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          {advice ? (
            <div className="glass-panel p-8 prose prose-invert max-w-none h-full">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <TrendingUp className="text-rift-accent" size={24} />
                <h3 className="m-0 text-2xl">Diagnóstico do Coach</h3>
              </div>
              <div className="whitespace-pre-wrap text-white/80 leading-relaxed">{advice}</div>
            </div>
          ) : (
            <div className="glass-panel p-8 h-full flex flex-col items-center justify-center text-center text-white/40 space-y-4">
              <AlertTriangle size={48} className="text-white/20" />
              <p>Insira seus dados ao lado e clique em Analisar para receber seu diagnóstico personalizado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
