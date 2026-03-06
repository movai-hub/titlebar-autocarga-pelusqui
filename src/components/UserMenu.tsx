import React, { memo } from 'react';

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const UserMenu = ({ isOpen, onClose, onLogout }: UserMenuProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop invisible para cerrar al hacer clic fuera */}
      <div className="fixed inset-0 z-40" onClick={onClose} aria-hidden="true" />

      <div 
        className="fixed top-16 right-4 w-48 bg-[#0b101a]/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
        role="menu"
        aria-label="Menú de usuario"
      >
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left"
          role="menuitem"
        >
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">logout</span>
          Cerrar sesión
        </button>
      </div>
    </>
  );
};

export default memo(UserMenu);
