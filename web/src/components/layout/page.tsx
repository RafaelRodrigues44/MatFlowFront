import { useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  LogOut, 
  ChevronRight,
  ChevronDown,
  Search, 
  Bell,
  UserCircle,
  Database,
  Truck,
  Boxes,
  ShoppingCart,
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useSearchStore } from '../../store/useSearchStore';

export const MainLayout = () => {
  const { user, logout } = useAuthStore();
  const { searchTerm, setSearchTerm } = useSearchStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Estado para controlar os grupos abertos
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
  const isGroupOpen = (group: string) => openGroups.includes(group);

  return (
    <div className="flex h-screen bg-[#f5f7f9] overflow-hidden font-sans text-gray-700">
      <aside className="w-64 bg-[#1c1f22] flex flex-col z-20 shadow-lg">
        {/* Logo Section */}
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

        {/* User Badge */}
        <div className="px-5 py-6 border-b border-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded bg-[#009cae] flex items-center justify-center text-white shadow-inner border border-white/10">
              <UserCircle size={24} />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold text-white truncate tracking-tight uppercase">{user?.username}</span>
              <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">{user?.roleLabel || user?.role}</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 mt-4 space-y-1 overflow-y-auto custom-scrollbar">
          {/* DASHBOARD - Link Simples */}
          {user?.role !== 'sales' && (
            <Link 
              to="/dashboard" 
              className={`flex items-center px-6 py-3 transition-all ${
                isActive('/dashboard') ? 'bg-[#009cae] text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <LayoutDashboard size={18} className={`mr-3 ${isActive('/dashboard') ? 'text-white' : 'text-cyan-500'}`} />
              <span className="text-sm font-normal">Painel Gestor</span>
            </Link>
          )}

          {/* GRUPO: CADASTROS (MASTER DATA) */}
          <div className="space-y-1">
            <button 
              onClick={() => toggleGroup('master')}
              className="w-full flex items-center justify-between px-6 py-3 text-gray-500 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest"
            >
              <span>Cadastros Base</span>
              {isGroupOpen('master') ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
            
            {isGroupOpen('master') && (
              <div className="bg-black/20 animate-in slide-in-from-top-1 duration-200">
                <Link to="/clients" className={`flex items-center pl-10 pr-6 py-2.5 text-xs transition-all ${isActive('/clients') ? 'text-cyan-400 font-bold' : 'text-gray-400 hover:text-white'}`}>
                  <Database size={14} className="mr-3 opacity-70" /> Clientes (SA1)
                </Link>
                <Link to="/suppliers" className={`flex items-center pl-10 pr-6 py-2.5 text-xs transition-all ${isActive('/suppliers') ? 'text-cyan-400 font-bold' : 'text-gray-400 hover:text-white'}`}>
                  <Truck size={14} className="mr-3 opacity-70" /> Fornecedores (SA2)
                </Link>
                <Link to="/products" className={`flex items-center pl-10 pr-6 py-2.5 text-xs transition-all ${isActive('/products') ? 'text-cyan-400 font-bold' : 'text-gray-400 hover:text-white'}`}>
                  <Package size={14} className="mr-3 opacity-70" /> Produtos (SB1)
                </Link>
              </div>
            )}
          </div>

          {/* GRUPO: OPERACIONAL */}
          <div className="space-y-1">
            <button 
              onClick={() => toggleGroup('ops')}
              className="w-full flex items-center justify-between px-6 py-3 text-gray-500 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest"
            >
              <span>Operacional</span>
              {isGroupOpen('ops') ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>

            {isGroupOpen('ops') && (
              <div className="bg-black/20 animate-in slide-in-from-top-1 duration-200">
                <Link to="/orders" className={`flex items-center pl-10 pr-6 py-2.5 text-xs transition-all ${isActive('/orders') ? 'text-cyan-400 font-bold' : 'text-gray-400 hover:text-white'}`}>
                  <ShoppingCart size={14} className="mr-3 opacity-70" /> Pedidos (SC5/6)
                </Link>
                <Link to="/inventory" className={`flex items-center pl-10 pr-6 py-2.5 text-xs transition-all ${isActive('/inventory') ? 'text-cyan-400 font-bold' : 'text-gray-400 hover:text-white'}`}>
                  <Boxes size={14} className="mr-3 opacity-70" /> Saldos Estoque
                </Link>
              </div>
            )}
          </div>

          {/* ADMINISTRAÇÃO */}
          {user?.role === 'admin' && (
            <div className="space-y-1">
              <button 
                onClick={() => toggleGroup('admin')}
                className="w-full flex items-center justify-between px-6 py-3 text-gray-500 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest"
              >
                <span>Sistema</span>
                {isGroupOpen('admin') ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
              {isGroupOpen('admin') && (
                <div className="bg-black/20 animate-in slide-in-from-top-1 duration-200">
                  <Link to="/user-management" className={`flex items-center pl-10 pr-6 py-2.5 text-xs transition-all ${isActive('/user-management') ? 'text-cyan-400 font-bold' : 'text-gray-400 hover:text-white'}`}>
                    <Users size={14} className="mr-3 opacity-70" /> Gestão de Usuários
                  </Link>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Footer Sidebar */}
        <div className="p-6 border-t border-gray-800 flex flex-col gap-4">
          <button onClick={handleLogout} className="flex items-center text-gray-500 hover:text-red-400 transition-colors">
            <LogOut size={16} className="mr-3" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Sair do Sistema</span>
          </button>
          <div className="flex items-center gap-2 opacity-30">
            <div className="w-3 h-3 border border-white rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
            <span className="text-[8px] text-white uppercase tracking-tighter">MaltFlow v1.5.0</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-10">
          <div className="flex items-center gap-4 text-gray-400">
            <div className="flex items-center text-xs gap-2">
              <span className="hover:text-cyan-600 cursor-pointer transition-colors">Barley Importadora</span>
              <ChevronRight size={12} />
              <span className="text-gray-800 font-medium">Regional Sorocaba</span>
            </div>
            
            <div className="hidden md:flex items-center bg-gray-100 rounded-md px-3 py-1.5 ml-4">
              <Search size={14} className="text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Pesquisar..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                <p className="text-[9px] text-cyan-600 font-bold uppercase">{user?.roleLabel || user?.role}</p>
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