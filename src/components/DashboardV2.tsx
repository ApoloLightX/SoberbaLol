import React from 'react';
import { TrendingUp, Zap, Users, Shield, Brain, Swords, Clock, Target, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function DashboardV2() {
  const navigate = (view: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: view }));
  };

  const stats = [
    { label: 'Meta', value: 'Tanks', status: 'Estável', color: '#f59e0b' },
    { label: 'Win Rate', value: '58.4%', status: '+2.1%', color: '#10b981' },
    { label: 'Patch', value: '7.0c', status: 'Ativo', color: '#3b82f6' },
    { label: 'Itens', value: '80+', status: 'Ranked', color: '#ef4444' },
  ];

  const quickAccess = [
    { id: 'coach', label: 'Coach IA', icon: Brain, desc: 'Análise' },
    { id: 'draft', label: 'Draft', icon: Swords, desc: 'Simulador' },
    { id: 'teamcomp', label: 'Comp', icon: Users, desc: 'Análise' },
    { id: 'adaptive', label: 'Builds', icon: Shield, desc: 'Adaptativas' },
    { id: 'builder', label: 'Calc', icon: TrendingUp, desc: 'Construtor' },
    { id: 'live', label: 'Live', icon: Clock, desc: 'Assistente' },
    { id: 'runes', label: 'Runes', icon: Zap, desc: 'Explorador' },
    { id: 'meta', label: 'Meta', icon: Target, desc: 'Roadmap' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Bem-vindo</h1>
        <p className="text-[#a0a9b8]">Wild Rift Patch 7.0c</p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card"
          >
            <div className="text-xs text-[#6b7280] mb-2">{stat.label}</div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-xs" style={{ color: stat.color }}>
              {stat.status}
            </div>
          </motion.div>
        ))}
      </div>

      {/* QUICK ACCESS */}
      <div>
        <h2 className="text-lg font-bold mb-4">Acesso Rápido</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {quickAccess.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(item.id)}
                className="card text-left hover:border-[#10b981] group"
              >
                <Icon size={24} className="mb-2 text-[#10b981]" />
                <div className="font-medium text-sm">{item.label}</div>
                <div className="text-xs text-[#6b7280]">{item.desc}</div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* INFO CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* PATCH INFO */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap size={20} className="text-[#10b981]" />
            <h3 className="font-bold">Patch 7.0c</h3>
          </div>
          <ul className="space-y-2 text-sm text-[#a0a9b8]">
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 bg-[#10b981] rounded-full" />
              80+ itens Ranked
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 bg-[#10b981] rounded-full" />
              Llama 3.3 70B
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 bg-[#10b981] rounded-full" />
              Interface otimizada
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 bg-[#10b981] rounded-full" />
              Mobile-first
            </li>
          </ul>
        </motion.div>

        {/* IA STATUS */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="card border-[#10b981]/30 bg-[#1a1f2e]/50"
        >
          <div className="flex items-center gap-2 mb-4">
            <Brain size={20} className="text-[#10b981]" />
            <h3 className="font-bold">Motor IA</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[#6b7280]">Status</span>
              <span className="px-2 py-1 bg-[#10b981]/20 text-[#10b981] rounded text-xs font-medium">
                Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#6b7280]">Modelo</span>
              <span className="font-mono text-xs">Llama 3.3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#6b7280]">Latência</span>
              <span className="text-[#10b981] font-medium">500ms</span>
            </div>
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('coach')}
              className="w-full mt-4 bg-[#10b981] text-white font-medium py-2 rounded-lg hover:bg-[#059669] transition-colors flex items-center justify-center gap-2"
            >
              Testar Análise
              <ChevronRight size={16} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
