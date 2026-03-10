import { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Sidebar } from '../components/ui/sidebar';
import { Header } from '../components/ui/header';

export default function Layout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<string[]>(['master', 'ops']);

  const toggleGroup = (group: string) => {
    setOpenGroups(prev => 
      prev.includes(group) ? prev.filter(g => g !== group) : [...prev, group]
    );
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-[#f5f7f9] overflow-hidden font-sans text-gray-700">
      <Sidebar 
        user={user} 
        isActive={isActive} 
        isGroupOpen={(g) => openGroups.includes(g)} 
        toggleGroup={toggleGroup} 
        onLogout={handleLogout} 
      />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <Header user={user || undefined} />
        
        <section className="flex-1 overflow-y-auto p-6 bg-[#f5f7f9]">
          <Outlet />
        </section>
      </main>
    </div>
  );
}