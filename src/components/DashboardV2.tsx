import React from 'react';
import { TrendingUp, Zap, Users, Shield, Brain, Swords, Clock, Target } from 'lucide-react';
import { motion } from 'motion/react';

export default function DashboardV2() {
  const navigate = (view: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: view }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-20 lg:pb-0"
    >
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-display font-black uppercase">
          Bem-vindo
        </h1>
        <p className="text-white/60 text-sm sm:text-base">Wild Rift Patch 7.0c</p>
      </div>

      {/* Stats Grid - 2x2 Mobile, 4 Desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <motion.div whileHover={{ y: -4 }} className="glass-panel p-4 border-t-4 border-[#f0ad4e]">
          <p className="text-white/60 text-xs font-medium mb-2">Meta</p>
          <h3 className="text-xl sm:text-2xl font-bold">Tanks</h3>
          <p className="text-[#f0ad4e] text-xs mt-1">Estável</p>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="glass-panel p-4 border-t-4 border-[#00ff88]">
          <p className="text-white/60 text-xs font-medium mb-2">Win Rate</p>
          <h3 className="text-xl sm:text-2xl font-bold">58.4%</h3>
          <p className="text-[#00ff88] text-xs mt-1">+2.1%</p>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="glass-panel p-4 border-t-4 border-[#2688f2]">
          <p className="text-white/60 text-xs font-medium mb-2">Patch</p>
          <h3 className="text-xl sm:text-2xl font-bold">7.0c</h3>
          <p className="text-[#2688f2] text-xs mt-1">Ativo</p>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="glass-panel p-4 border-t-4 border-[#ff6b6b]">
          <p className="text-white/60 text-xs font-medium mb-2">Itens</p>
          <h3 className="text-xl sm:text-2xl font-bold">80+</h3>
          <p className="text-[#ff6b6b] text-xs mt-1">Ranked</p>
        </motion.div>
      </div>

      {/* Quick Actions - Full Width Mobile */}
      <motion.div className="glass-panel p-4 sm:p-6 border border-white/10 rounded-xl">
        <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
          <Zap size={20} className="text-[#00ff88]" />
          Acesso Rápido
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('coach')}
            className="glass-panel p-4 border border-white/10 hover:border-[#00ff88]/50 transition-all text-center"
          >
            <Brain size={24} className="mx-auto mb-2 text-[#00ff88]" />
            <p className="font-bold text-sm">Coach IA</p>
            <p className="text-white/40 text-xs">Análise</p>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('draft')}
            className="glass-panel p-4 border border-white/10 hover:border-[#00ff88]/50 transition-all text-center"
          >
            <Swords size={24} className="mx-auto mb-2 text-[#2688f2]" />
            <p className="font-bold text-sm">Draft</p>
            <p className="text-white/40 text-xs">Simulador</p>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('teamcomp')}
            className="glass-panel p-4 border border-white/10 hover:border-[#00ff88]/50 transition-all text-center"
          >
            <Users size={24} className="mx-auto mb-2 text-[#f0ad4e]" />
            <p className="font-bold text-sm">Comp</p>
            <p className="text-white/40 text-xs">Análise</p>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('adaptive')}
            className="glass-panel p-4 border border-white/10 hover:border-[#00ff88]/50 transition-all text-center"
          >
            <Shield size={24} className="mx-auto mb-2 text-[#ff6b6b]" />
            <p className="font-bold text-sm">Builds</p>
            <p className="text-white/40 text-xs">Adaptativas</p>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('builder')}
            className="glass-panel p-4 border border-white/10 hover:border-[#00ff88]/50 transition-all text-center"
          >
            <TrendingUp size={24} className="mx-auto mb-2 text-[#00ff88]" />
            <p className="font-bold text-sm">Calc</p>
            <p className="text-white/40 text-xs">Construtor</p>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('live')}
            className="glass-panel p-4 border border-white/10 hover:border-[#00ff88]/50 transition-all text-center"
          >
            <Clock size={24} className="mx-auto mb-2 text-[#2688f2]" />
            <p className="font-bold text-sm">Live</p>
            <p className="text-white/40 text-xs">Assistente</p>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('runes')}
            className="glass-panel p-4 border border-white/10 hover:border-[#00ff88]/50 transition-all text-center"
          >
            <Zap size={24} className="mx-auto mb-2 text-[#f0ad4e]" />
            <p className="font-bold text-sm">Runes</p>
            <p className="text-white/40 text-xs">Explorador</p>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('meta')}
            className="glass-panel p-4 border border-white/10 hover:border-[#00ff88]/50 transition-all text-center"
          >
            <Target size={24} className="mx-auto mb-2 text-[#ff6b6b]" />
            <p className="font-bold text-sm">Meta</p>
            <p className="text-white/40 text-xs">Roadmap</p>
          </motion.button>
        </div>
      </motion.div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div whileHover={{ y: -4 }} className="glass-panel p-6 border border-white/10">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Zap size={20} className="text-[#00ff88]" />
            Patch 7.0c
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-white/70">
            <li className="flex items-start gap-2">
              <span className="text-[#00ff88] font-bold mt-1">•</span>
              <span>80+ itens Ranked</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00ff88] font-bold mt-1">•</span>
              <span>Llama 3.3 70B</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00ff88] font-bold mt-1">•</span>
              <span>Interface otimizada</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00ff88] font-bold mt-1">•</span>
              <span>Mobile-first</span>
            </li>
          </ul>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="glass-panel p-6 border border-[#00ff88]/30 bg-gradient-to-br from-[#00ff88]/5 to-transparent">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Brain size={20} className="text-[#00ff88]" />
            Motor IA
          </h3>
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <span className="text-white/60">Status</span>
              <span className="px-2 py-1 bg-[#00ff88]/20 text-[#00ff88] rounded-full text-[10px] font-bold">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/60">Modelo</span>
              <span className="text-white font-mono text-[10px]">Llama 3.3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/60">Latência</span>
              <span className="text-[#00ff88] font-bold">500ms</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('coach')}
              className="w-full mt-4 py-2 bg-[#00ff88] text-[#0a0e27] font-bold rounded-lg hover:bg-[#00ff88]/90 transition-all text-xs sm:text-sm"
            >
              Testar Análise
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
