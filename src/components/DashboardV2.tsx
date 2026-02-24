import React from 'react';
import { TrendingUp, Target, Info, Zap, Swords, Brain, Flame, Shield, Crown } from 'lucide-react';
import { motion } from 'motion/react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color?: 'blue' | 'green' | 'gold' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, color = 'blue' }) => {
  const colorMap = {
    blue: 'border-[#2688f2]',
    green: 'border-[#00ff88]',
    gold: 'border-[#f0ad4e]',
    red: 'border-[#ff6b6b]'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className={`glass-panel p-4 sm:p-6 border-t-4 ${colorMap[color]} transition-all`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 sm:p-3 bg-white/5 rounded-lg">{icon}</div>
        {trend && <span className="text-xs font-bold text-[#00ff88]">↑ {trend}</span>}
      </div>
      <p className="text-white/60 text-xs sm:text-sm font-medium mb-2">{title}</p>
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white">{value}</h3>
    </motion.div>
  );
};

interface QuickActionProps {
  label: string;
  sub: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({ label, sub, icon, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="p-3 sm:p-4 glass-panel border border-white/10 rounded-lg hover:border-[#00ff88]/50 transition-all text-left group w-full"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[#00ff88]/20 rounded-lg group-hover:bg-[#00ff88]/40 transition-all flex-shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-sm text-white truncate">{label}</p>
          <p className="text-xs text-white/40 truncate">{sub}</p>
        </div>
      </div>
    </motion.button>
  );
};

export default function DashboardV2() {
  return (
    <motion.div
      key="dashboard-v2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 sm:space-y-8 w-full"
    >
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-display font-black uppercase tracking-tighter">
          <span className="gradient-text">Bem-vindo</span>
        </h1>
        <p className="text-white/60 text-sm sm:text-base lg:text-lg">Sua vantagem estratégica no Wild Rift. Patch 7.0c</p>
      </div>

      {/* Key Stats - Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Meta"
          value="Tanks"
          icon={<Crown className="text-[#f0ad4e]" size={20} />}
          trend="Estável"
          color="gold"
        />
        <StatCard
          title="Win Rate"
          value="58.4%"
          icon={<TrendingUp className="text-[#00ff88]" size={20} />}
          trend="+2.1%"
          color="green"
        />
        <StatCard
          title="Patch"
          value="7.0c"
          icon={<Zap className="text-[#2688f2]" size={20} />}
          color="blue"
        />
        <StatCard
          title="Itens"
          value="30+"
          icon={<Shield className="text-[#ff6b6b]" size={20} />}
          trend="Novo"
          color="red"
        />
      </div>

      {/* Quick Actions */}
      <div className="glass-panel p-4 sm:p-6 lg:p-8 border border-white/10 rounded-xl backdrop-blur-md">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="p-2 sm:p-3 bg-[#00ff88]/20 rounded-lg flex-shrink-0">
            <Flame className="text-[#00ff88]" size={20} />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-display font-bold">Acesso Rápido</h2>
            <p className="text-white/40 text-xs sm:text-sm">Ferramentas essenciais</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <QuickAction
            icon={<Brain size={18} />}
            label="Coach IA"
            sub="Análise"
            onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'coach' }))}
          />
          <QuickAction
            icon={<Swords size={18} />}
            label="Draft"
            sub="Simulador"
            onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'draft' }))}
          />
          <QuickAction
            icon={<Target size={18} />}
            label="Builds"
            sub="Adaptativas"
            onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'adaptive' }))}
          />
          <QuickAction
            icon={<Info size={18} />}
            label="Meta"
            label="Roadmap"
            sub="Tendências"
            onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'overview' }))}
          />
        </div>
      </div>

      {/* Featured Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Patch Notes */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-panel p-4 sm:p-6 lg:p-8 border border-white/10 rounded-xl backdrop-blur-md"
        >
          <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-4 flex items-center gap-2">
            <Zap className="text-[#00ff88]" size={18} />
            Patch 7.0c
          </h3>
          <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/70">
            <li className="flex items-start gap-2">
              <span className="text-[#00ff88] font-bold mt-0.5 flex-shrink-0">•</span>
              <span>30+ itens exclusivos adicionados</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00ff88] font-bold mt-0.5 flex-shrink-0">•</span>
              <span>Motor Llama 3.3 70B ativo</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00ff88] font-bold mt-0.5 flex-shrink-0">•</span>
              <span>Interface otimizada</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00ff88] font-bold mt-0.5 flex-shrink-0">•</span>
              <span>Análises precisas</span>
            </li>
          </ul>
        </motion.div>

        {/* AI Status */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-panel p-4 sm:p-6 lg:p-8 border border-[#00ff88]/30 rounded-xl backdrop-blur-md bg-gradient-to-br from-[#00ff88]/5 to-transparent"
        >
          <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-4 flex items-center gap-2">
            <Brain className="text-[#00ff88]" size={18} />
            Motor IA
          </h3>
          <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <span className="text-white/60">Status</span>
              <span className="px-2 sm:px-3 py-1 bg-[#00ff88]/20 text-[#00ff88] rounded-full text-[10px] sm:text-xs font-bold">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/60">Modelo</span>
              <span className="text-white font-mono text-[10px] sm:text-xs">Llama 3.3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/60">Latência</span>
              <span className="text-[#00ff88] font-bold">500ms</span>
            </div>
            <button className="w-full mt-4 py-2 bg-[#00ff88] text-[#0a0e27] font-bold rounded-lg hover:bg-[#00ff88]/90 transition-all text-xs sm:text-sm">
              Testar
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
