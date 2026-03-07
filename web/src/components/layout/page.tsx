import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  LogOut, 
  ChevronRight,
  Search,
  Bell,
  UserCircle
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export const MainLayout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-[#f5f7f9] overflow-hidden font-sans text-gray-700">
      <aside className="w-64 bg-[#1c1f22] flex flex-col z-20 shadow-lg">
        <div className="p-5 border-b border-gray-800 flex items-center gap-3">
           <div className="bg-gray-700 p-1 rounded-sm">
              <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
           </div>
           <div className="flex flex-col">
             <span className="text-xl font-light text-white tracking-tighter italic">MaltFlow</span>
             <span className="text-[8px] text-cyan-500 font-bold uppercase tracking-[0.2em] -mt-1">Regional Sorocaba</span>
           </div>
        </div>

        <div className="px-5 py-6 border-b border-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded bg-[#009cae] flex items-center justify-center text-white shadow-inner border border-white/10">
              <UserCircle size={24} />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold text-white truncate tracking-tight uppercase">
                {user?.username}
              </span>
              <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 mt-4 space-y-0">
          <Link 
            to="/dashboard" 
            className={`flex items-center px-6 py-3 transition-all group ${
              isActive('/dashboard') ? 'bg-[#009cae] text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <LayoutDashboard size={18} className={`mr-3 ${isActive('/dashboard') ? 'text-white' : 'text-cyan-500'}`} />
            <span className="text-sm font-normal">Painel Gestor</span>
          </Link>
          
          <Link 
            to="/inventory" 
            className={`flex items-center px-6 py-3 transition-all group ${
              isActive('/inventory') ? 'bg-[#009cae] text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <Package size={18} className={`mr-3 ${isActive('/inventory') ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
            <span className="text-sm font-normal">Estoque <span className="text-[10px] ml-1 opacity-60">(SB1)</span></span>
          </Link>

          {user?.role === 'admin' && (
            <Link 
              to="/register" 
              className={`flex items-center px-6 py-3 transition-all group ${
                isActive('/register') ? 'bg-[#009cae] text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Users size={18} className={`mr-3 ${isActive('/register') ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
              <span className="text-sm font-normal">Usuários <span className="text-[10px] ml-1 opacity-60">(ZUR)</span></span>
            </Link>
          )}
        </nav>

        <div className="p-6 border-t border-gray-800 flex flex-col gap-4">
          <button 
            onClick={handleLogout}
            className="flex items-center text-gray-500 hover:text-red-400 transition-colors"
          >
            <LogOut size={16} className="mr-3" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Encerrar Sessão</span>
          </button>
          
          <div className="flex items-center gap-2 opacity-30">
            <div className="w-3 h-3 border border-white rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
            <span className="text-[8px] text-white uppercase tracking-tighter">v1.2.0 Engine</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-10">
          <div className="flex items-center gap-4 text-gray-400">
            <div className="flex items-center text-xs gap-2">
              <span className="hover:text-cyan-600 cursor-pointer transition-colors">Barley Importadora</span>
              <ChevronRight size={12} />
              <span className="text-gray-800 font-medium">Unidade Sorocaba</span>
            </div>
            
            <div className="hidden md:flex items-center bg-gray-100 rounded-md px-3 py-1.5 ml-4">
              <Search size={14} className="text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Pesquisar no sistema..." 
                className="bg-transparent border-none text-[11px] focus:outline-none w-48"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-cyan-600 transition-colors relative">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
              <div className="text-right">
                <p className="text-[11px] font-bold text-gray-800 leading-none uppercase tracking-tighter">{user?.username}</p>
                <p className="text-[9px] text-cyan-600 font-bold uppercase">{user?.role}</p>
              </div>
              <div className="h-9 w-9 bg-gray-800 rounded shadow-sm flex items-center justify-center font-bold text-white text-xs border border-gray-700">
                {user?.username?.substring(0, 2).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-6 bg-[#f5f7f9]">
          <Outlet />
        </section>
      </main>
    </div>
  );
};