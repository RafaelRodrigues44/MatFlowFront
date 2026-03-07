import { Outlet, useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  LogOut, 
  ChevronRight 
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export const MainLayout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">

      <aside className="w-64 bg-slate-900 flex flex-col shadow-2xl z-20">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
          <h1 className="text-xl font-bold text-white tracking-tight italic">MaltFlow</h1>
        </div>

        <nav className="flex-1 mt-4 px-3 space-y-1">
          <Link to="/dashboard" className="flex items-center p-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-md transition-all group">
            <LayoutDashboard size={20} className="mr-3 text-blue-500" />
            <span className="text-sm font-medium">Painel Gestor</span>
          </Link>
          
          <Link to="/inventory" className="flex items-center p-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-md transition-all">
            <Package size={20} className="mr-3" />
            <span className="text-sm font-medium">Estoque (SB1)</span>
          </Link>

          {user?.role === 'admin' && (
            <Link to="/users" className="flex items-center p-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-md transition-all">
              <Users size={20} className="mr-3" />
              <span className="text-sm font-medium">Usuários (ZUR)</span>
            </Link>
          )}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center p-3 text-red-400 hover:bg-red-950/30 rounded-md transition-all"
          >
            <LogOut size={20} className="mr-3" />
            <span className="text-sm font-bold uppercase tracking-tighter">Sair do Sistema</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
          <div className="flex items-center text-slate-400 text-sm gap-2">
            <span>Barley Importadora</span>
            <ChevronRight size={14} />
            <span className="text-slate-600 font-semibold uppercase tracking-widest text-[10px]">Unidade Sorocaba</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right border-r pr-4 border-slate-200">
              <p className="text-sm font-bold text-slate-800 leading-none mb-1">{user?.username}</p>
              <p className="text-[10px] text-blue-600 font-black uppercase">{user?.role}</p>
            </div>
            <div className="h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 border border-slate-300">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
          <Outlet />
        </section>
      </main>
    </div>
  );
};