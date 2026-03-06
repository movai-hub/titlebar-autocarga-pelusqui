import React, { memo } from 'react';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsPanel = ({ isOpen, onClose }: NotificationsPanelProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop invisible para cerrar al hacer clic fuera */}
      <div className="fixed inset-0 z-40" onClick={onClose} aria-hidden="true" />

      <div 
        className="fixed top-16 right-4 w-80 bg-[#0b101a]/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] z-50 p-8 flex flex-col items-center justify-center animate-in fade-in slide-in-from-top-2 duration-200"
        role="dialog"
        aria-label="Notificaciones"
      >
        <span className="material-symbols-outlined text-4xl text-gray-600 mb-3" aria-hidden="true">notifications_off</span>
        <p className="text-sm text-gray-400 text-center">Actualmente no hay notificaciones pendientes</p>
      </div>
    </>
  );
};

export default memo(NotificationsPanel);
