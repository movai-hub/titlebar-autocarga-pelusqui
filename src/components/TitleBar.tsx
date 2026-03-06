import React, { memo } from 'react';

// --- SUBCOMPONENTS ---

const Divider = ({ className = "" }: { className?: string }) => (
  <div className={`h-5 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent shrink-0 ${className}`} aria-hidden="true"></div>
);

const AppLogo = memo(() => (
  <div className="flex flex-col justify-center select-none" aria-label="Altra Dashboard Logo">
      <div className="flex items-center gap-1.5 mt-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]"></span>
        <span className="text-[9px] sm:text-[10px] font-bold text-cyan-400 tracking-[0.3em] leading-none drop-shadow-[0_0_5px_rgba(34,211,238,0.8)] antialiased">Inicio</span>
      </div>
  </div>
));

interface GlassActionBtnProps {
  icon: string;
  hasBadge?: boolean;
  label: string;
  onClick?: () => void;
  className?: string;
}

const GlassActionButton: React.FC<GlassActionBtnProps> = memo(({ icon, hasBadge, label, onClick, className = '' }) => {
  return (
    <button 
      onClick={onClick}
      aria-label={label}
      type="button"
      className={`relative w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-200 active:scale-95 hover:bg-cyan-500/10 hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(34,211,238,0.1)] group overflow-hidden ${className} shrink-0`}
    >
      <span className={`material-symbols-outlined !text-[20px] text-gray-400 group-hover:text-cyan-400 transition-colors duration-200 relative z-10`}>
        {icon}
      </span>
      
      {hasBadge && (
        <span className="absolute top-2.5 right-2.5 flex h-1.5 w-1.5 z-10 pointer-events-none">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500 shadow-[0_0_4px_#ef4444]"></span>
        </span>
      )}

      <div className="absolute inset-0 bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </button>
  );
});

// --- MAIN COMPONENT ---

export interface TitleBarProps {
  isMenuOpen?: boolean;
  onMenuClick?: () => void;
  onBack?: () => void;
  onNotificationClick?: () => void;
  onUserClick?: () => void;
}

const TitleBar: React.FC<TitleBarProps> = ({ isMenuOpen, onMenuClick, onBack, onNotificationClick, onUserClick }) => {
  return (
    <header 
      role="banner" 
      className="h-14 bg-[#0b101a]/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 sm:px-6 shrink-0 z-50 relative overflow-hidden select-none"
    >
       <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)] pointer-events-none"></div>

       {/* --- LEFT SIDE: BACK/MENU & LOGO --- */}
       <div className="flex items-center gap-4 relative z-10">
          {onBack ? (
             <GlassActionButton 
               icon="arrow_back" 
               label="Volver al Gestor" 
               onClick={onBack}
             />
          ) : (
             <GlassActionButton 
               icon={isMenuOpen ? "close" : "menu"}
               label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
               onClick={onMenuClick}
               className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-90 bg-white/10 border-cyan-500/30 text-cyan-400' : ''}`}
             />
          )}
          
          <Divider className="hidden sm:block" />
          <AppLogo />
       </div>

       {/* --- RIGHT SIDE: ACTIONS & PROFILE --- */}
       <div className="flex items-center gap-4 relative z-10">
          
          <GlassActionButton 
            icon="notifications" 
            label="Notificaciones" 
            hasBadge 
            onClick={onNotificationClick}
          />

          <Divider className="hidden sm:block" />
          
          <button 
            onClick={onUserClick}
            type="button"
            className="flex items-center gap-3 pl-1 pr-1 py-1 rounded-full border border-transparent hover:border-white/10 hover:bg-white/5 transition-all duration-200 active:scale-95 cursor-pointer group focus:outline-none focus:ring-1 focus:ring-white/20" 
            aria-label="Perfil de usuario"
          >
             <div className="text-right hidden md:block">
                <p className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors tracking-wide">Irvin Pérez</p>
             </div>
             
             <div className="relative w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 via-purple-500 to-blue-500 opacity-80 group-hover:opacity-100 blur-[1px]"></div>
                
                <div className="relative w-[calc(100%-2px)] h-[calc(100%-2px)] rounded-full bg-[#0f1623] flex items-center justify-center overflow-hidden z-10 border border-white/10">
                   <span className="text-[10px] font-black text-cyan-400">IP</span>
                </div>
             </div>
          </button>
       </div>
    </header>
  );
};

export default memo(TitleBar);
