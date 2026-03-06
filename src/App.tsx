import React, { useState, useCallback } from 'react';
import TitleBar from './components/TitleBar';
import Sidebar from './components/Sidebar';
import NotificationsPanel from './components/NotificationsPanel';
import UserMenu from './components/UserMenu';

export interface AppProps {
  titulo?: string;
  migas?: string;
}

export default function App({ titulo = 'Inicio', migas = '' }: AppProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleMenuClick = useCallback(() => {
    setIsSidebarOpen(true);
    setIsNotificationsOpen(false);
    setIsUserMenuOpen(false);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const handleNotificationClick = useCallback(() => {
    setIsNotificationsOpen((prev) => !prev);
    setIsSidebarOpen(false);
    setIsUserMenuOpen(false);
  }, []);

  const handleUserClick = useCallback(() => {
    setIsUserMenuOpen((prev) => !prev);
    setIsNotificationsOpen(false);
    setIsSidebarOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    console.log('Cerrando sesión en Titlebar...');
    setIsUserMenuOpen(false);
    // Emitimos un evento que el Dashboard escuchará
    window.dispatchEvent(new CustomEvent('logoutGlobal'));
  }, []);

  return (
    <div className="min-h-screen bg-[#0b101a] text-white font-sans selection:bg-cyan-500/30">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={handleCloseSidebar} 
      />
      
      <NotificationsPanel 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />

      <UserMenu 
        isOpen={isUserMenuOpen}
        onClose={() => setIsUserMenuOpen(false)}
        onLogout={handleLogout}
      />
      
      <TitleBar 
        isMenuOpen={isSidebarOpen}
        onMenuClick={isSidebarOpen ? handleCloseSidebar : handleMenuClick}
        onNotificationClick={handleNotificationClick}
        onUserClick={handleUserClick}
        titulo={titulo}
        migas={migas}
      />
    </div>
  );
}

