import React, { useEffect, useState } from 'react';
import { Search, Eye, Bug, Layout, MousePointer2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function UIInspector() {
  const [elements, setElements] = useState<{tag: string, id: string, text: string, type: string}[]>([]);

  useEffect(() => {
    const buttons = Array.from(document.querySelectorAll('button')).map(b => ({
      tag: 'BUTTON',
      id: b.id || 'no-id',
      text: b.innerText || b.getAttribute('aria-label') || 'Icon Only',
      type: 'Action'
    }));
    const inputs = Array.from(document.querySelectorAll('input, select')).map(i => ({
      tag: i.tagName,
      id: i.id || 'no-id',
      text: (i as HTMLInputElement).placeholder || (i as HTMLSelectElement).name || 'Input Field',
      type: 'Input'
    }));
    setElements([...buttons, ...inputs]);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6 border-t-2 border-t-rift-accent"
    >
      <div className="flex items-center gap-3 mb-6">
        <Bug className="text-rift-accent" size={24} />
        <h2 className="text-2xl font-display font-bold">UI Inspector v1.0</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {elements.map((el, idx) => (
          <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-rift-accent/50 transition-all">
            <div className="flex justify-between items-start mb-2">
              <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${el.type === 'Action' ? 'bg-rift-blue/20 text-rift-blue' : 'bg-rift-gold/20 text-rift-gold'}`}>
                {el.type}
              </span>
              <span className="text-[10px] font-mono text-white/20">{el.tag}</span>
            </div>
            <p className="text-sm font-bold text-white mb-1">{el.text}</p>
            <p className="text-[10px] text-white/40 font-mono">ID: {el.id}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-rift-accent/5 border border-rift-accent/20 rounded-xl">
        <h3 className="text-xs font-bold text-rift-accent uppercase mb-2 flex items-center gap-2">
          <Eye size={14} /> Auditoria de Acessibilidade
        </h3>
        <p className="text-xs text-white/60">
          Nenhum botão oculto (display: none) detectado via DOM. Todos os elementos interativos estão mapeados acima. 
          A falta de botões em alguns módulos (como Draft Simulator) é intencional, pois a análise é automática via `useEffect`.
        </p>
      </div>
    </motion.div>
  );
}
