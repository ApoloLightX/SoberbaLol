import React, { useState } from 'react';
import { Zap, TrendingUp, Brain, Target, Flame, Shield, Swords, AlertCircle, Copy, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { getAdaptiveAdvice } from '../services/aiService';

export default function LegacyKiller() {
  const [activeTab, setActiveTab] = useState<'counter' | 'onetrick' | 'meta'>('counter');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const generateCounterGuide = async () => {
    setLoading(true);
    const prompt = `Você é um analista de matchups de Wild Rift de elite. Gere um guia COMPLETO e DETALHADO de como vencer TODOS os matchups ruins para um campeão genérico.

    Inclua:
    1. **Matchups Críticos** (Top 5 piores)
    2. **Estratégias de Lane** (early, mid, late)
    3. **Itemização Anti-Meta** (o que comprar contra cada ameaça)
    4. **Posicionamento em Teamfights**
    5. **Win Conditions** (como virar jogos perdidos)
    
    Seja AGRESSIVO e TÉCNICO. Use terminologia de Challenger. Responda em PT-BR com formatação Markdown.`;
    
    const res = await getAdaptiveAdvice(prompt);
    setResult(res);
    setLoading(false);
  };

  const generateOnetricker = async () => {
    setLoading(true);
    const prompt = `Você é um coach de esports que treina jogadores one-trick. Crie um PLANO DEFINITIVO para dominar um único campeão em Wild Rift.

    Inclua:
    1. **Mastery Path** (como aprender o campeão em 100 horas)
    2. **Matchup Spread Sheet** (todos os 50+ matchups)
    3. **Rune Setups** (variações por matchup)
    4. **Build Paths** (early, mid, late, situacionais)
    5. **Combo Sequences** (combos de dano máximo)
    6. **Macro Timing** (quando fazer o quê)
    
    Responda em PT-BR com foco em RESULTADOS MENSURÁVEIS.`;
    
    const res = await getAdaptiveAdvice(prompt);
    setResult(res);
    setLoading(false);
  };

  const generateMetaReport = async () => {
    setLoading(true);
    const prompt = `Gere um RELATÓRIO DE META PROFISSIONAL para Wild Rift Patch 7.0c.

    Inclua:
    1. **Tier List Detalhada** (S+ até D tier com motivos)
    2. **Ban Priority** (o que banir em cada elo)
    3. **Pocket Picks** (campeões subestimados que ganham)
    4. **Itemização Meta** (os 10 itens mais importantes)
    5. **Tendências de Patch** (o que vai mudar)
    6. **Previsões** (qual será o próximo meta)
    
    Formato: Markdown com tabelas. PT-BR. Pronto para publicar em comunidades.`;
    
    const res = await getAdaptiveAdvice(prompt);
    setResult(res);
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <header>
        <h2 className="text-3xl lg:text-4xl font-display font-black text-rift-accent flex items-center gap-3">
          <Flame className="text-rift-accent" size={40} />
          LEGACY KILLER
        </h2>
        <p className="text-white/60 mt-2">Ferramentas de elite para dominar o Wild Rift. Supere o LoL Legacy com análises profundas.</p>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10">
        <TabBtn active={activeTab === 'counter'} onClick={() => setActiveTab('counter')} icon={<Shield size={18} />} label="Counter Guides" />
        <TabBtn active={activeTab === 'onetrick'} onClick={() => setActiveTab('onetrick')} icon={<Target size={18} />} label="One-Trick Mastery" />
        <TabBtn active={activeTab === 'meta'} onClick={() => setActiveTab('meta')} icon={<TrendingUp size={18} />} label="Meta Reports" />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar Controls */}
        <div className="glass-panel p-6 border-t-2 border-t-rift-accent h-fit">
          <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
            <Zap className="text-rift-accent" size={18} />
            Gerador de IA
          </h3>
          
          {activeTab === 'counter' && (
            <div className="space-y-4">
              <p className="text-xs text-white/60">Gere guias completos de counter-play contra qualquer matchup.</p>
              <button 
                onClick={generateCounterGuide}
                disabled={loading}
                className="w-full py-3 bg-rift-accent text-rift-dark font-bold rounded-lg hover:bg-rift-accent/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Zap className="animate-spin" size={16} /> : <Brain size={16} />}
                Gerar Counter Guide
              </button>
            </div>
          )}

          {activeTab === 'onetrick' && (
            <div className="space-y-4">
              <p className="text-xs text-white/60">Crie um plano de mastery para dominar um único campeão.</p>
              <button 
                onClick={generateOnetricker}
                disabled={loading}
                className="w-full py-3 bg-rift-blue text-white font-bold rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Zap className="animate-spin" size={16} /> : <Target size={16} />}
                Gerar One-Trick Plan
              </button>
            </div>
          )}

          {activeTab === 'meta' && (
            <div className="space-y-4">
              <p className="text-xs text-white/60">Analise o meta atual e receba previsões de mudanças.</p>
              <button 
                onClick={generateMetaReport}
                disabled={loading}
                className="w-full py-3 bg-rift-gold text-rift-dark font-bold rounded-lg hover:bg-rift-gold/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Zap className="animate-spin" size={16} /> : <TrendingUp size={16} />}
                Gerar Meta Report
              </button>
            </div>
          )}

          <div className="mt-6 p-3 bg-rift-accent/10 border border-rift-accent/20 rounded-lg">
            <p className="text-[10px] text-rift-accent font-bold uppercase mb-1">💡 Dica</p>
            <p className="text-[10px] text-white/60">Copie o resultado e compartilhe com sua equipe ou comunidade.</p>
          </div>
        </div>

        {/* Main Result Area */}
        <div className="lg:col-span-3">
          {result ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel p-8 border-l-4 border-l-rift-accent space-y-6"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-2xl font-display font-bold mb-2">
                    {activeTab === 'counter' && '📊 Counter Guide'}
                    {activeTab === 'onetrick' && '🎯 One-Trick Mastery'}
                    {activeTab === 'meta' && '📈 Meta Report'}
                  </h3>
                  <p className="text-xs text-white/40">Gerado por Llama 3.3 70B • Patch 7.0c</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => navigator.clipboard.writeText(result)}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                    title="Copiar"
                  >
                    <Copy size={16} />
                  </button>
                  <button 
                    onClick={() => {
                      const element = document.createElement('a');
                      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(result));
                      element.setAttribute('download', `soberba-${activeTab}.txt`);
                      element.style.display = 'none';
                      document.body.appendChild(element);
                      element.click();
                      document.body.removeChild(element);
                    }}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                    title="Download"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-white/80 leading-relaxed text-sm max-h-[600px] overflow-y-auto custom-scrollbar">
                  {result}
                </div>
              </div>

              <div className="p-4 bg-rift-accent/5 border border-rift-accent/20 rounded-lg flex gap-3">
                <AlertCircle size={16} className="text-rift-accent flex-shrink-0 mt-0.5" />
                <p className="text-xs text-white/60">
                  Este conteúdo foi gerado por IA e deve ser validado contra dados reais. Use como referência, não como verdade absoluta.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="glass-panel p-20 flex flex-col items-center justify-center text-center text-white/10 border-dashed border-2 border-white/5 h-[600px]">
              <Swords size={80} className="opacity-10 mb-6" />
              <h3 className="text-2xl font-bold mb-2">Nenhum Relatório Gerado</h3>
              <p className="max-w-md text-sm">Clique no botão ao lado para gerar um guia de elite. A IA analisará dados de Challenger e fornecerá insights profundos.</p>
            </div>
          )}
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard 
          icon={<Brain size={24} />}
          title="Análise Profunda"
          desc="Powered by Llama 3.3 70B - O melhor modelo de IA para análise de esports"
        />
        <FeatureCard 
          icon={<Flame size={24} />}
          title="Conteúdo de Elite"
          desc="Guias calibrados para Challenger. Supere qualquer competidor."
        />
        <FeatureCard 
          icon={<Zap size={24} />}
          title="Atualizado em Tempo Real"
          desc="Análises baseadas no Patch 7.0c com previsões de meta."
        />
      </div>
    </motion.div>
  );
}

function TabBtn({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 font-bold transition-all border-b-2 ${
        active 
          ? 'text-rift-accent border-b-rift-accent' 
          : 'text-white/40 border-b-transparent hover:text-white/60'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="glass-panel p-4 border-t-2 border-t-rift-accent text-center">
      <div className="flex justify-center mb-3 text-rift-accent">
        {icon}
      </div>
      <h4 className="font-bold mb-1">{title}</h4>
      <p className="text-xs text-white/60">{desc}</p>
    </div>
  );
}

function Swords({ size, className }: { size: number, className?: string }) {
  return <Swords size={size} className={className} />;
}
