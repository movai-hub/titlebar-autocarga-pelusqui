import React, { useState, memo } from 'react';

const MENU_ITEMS = [
  { title: 'Operación', tools: ['Reportes'] },
  { title: 'Cobranza', tools: ['Reportes'] },
  { title: 'Marketing', tools: ['Solicitudes de contacto'] },
  { title: 'Comercial', tools: ['Simulador'] },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const toggleModule = (module: string) => {
    setExpandedModule(expandedModule === module ? null : module);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sidebar Container */}
      <aside 
        className={`fixed top-14 left-0 h-[calc(100%-3.5rem)] w-80 bg-[#0b101a]/95 backdrop-blur-2xl border-r border-white/10 z-40 transform transition-transform duration-500 cubic-bezier(0.22, 1, 0.36, 1) shadow-[10px_0_30px_rgba(0,0,0,0.5)] ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Menú principal"
      >
        
        {/* Cyber Decorative Line */}
        <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-cyan-500/50 via-transparent to-transparent opacity-50 pointer-events-none"></div>
        
        <div className="h-full overflow-y-auto p-6 scrollbar-hide">
           <div className="space-y-4">
             {MENU_ITEMS.map((item) => (
               <div key={item.title} className="group">
                 <button 
                   onClick={() => toggleModule(item.title)}
                   className={`w-full relative overflow-hidden flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${expandedModule === item.title ? 'text-cyan-400 bg-cyan-500/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                   aria-expanded={expandedModule === item.title}
                 >
                   {/* Active Indicator */}
                   <div className={`absolute left-0 top-0 bottom-0 w-0.5 bg-cyan-400 transition-transform duration-300 ${expandedModule === item.title ? 'scale-y-100' : 'scale-y-0'}`}></div>

                   <span className="font-bold text-sm tracking-wider z-10 pl-2">
                     {item.title}
                   </span>
                   
                   <span className={`material-symbols-outlined text-[20px] transition-transform duration-300 z-10 ${expandedModule === item.title ? 'rotate-180' : ''}`}>
                     expand_more
                   </span>
                 </button>
                 
                 {/* Tools Container */}
                 <div 
                    className={`grid transition-all duration-300 ease-out ${expandedModule === item.title ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                 >
                   <div className="overflow-hidden">
                     <div className="space-y-1 pl-4 py-1">
                       {item.tools.map((tool, i) => (
                         <button 
                           key={tool} 
                           className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-500 hover:text-cyan-400 transition-colors duration-200 group/tool"
                           style={{ transitionDelay: `${i * 50}ms` }}
                         >
                           <span className="w-1 h-1 rounded-full bg-gray-700 group-hover/tool:bg-cyan-400 transition-all"></span>
                           {tool}
                         </button>
                       ))}
                     </div>
                   </div>
                 </div>
               </div>
             ))}
           </div>
        </div>

      </aside>
    </>
  );
};

export default memo(Sidebar);
