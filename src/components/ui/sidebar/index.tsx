import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, LogOut, ChevronRight, ChevronDown, 
  UserCircle, Database, Truck, Package, ShoppingCart, Boxes 
} from 'lucide-react';

interface SidebarProps {
  user: any;
  isActive: (path: string) => boolean;
  isGroupOpen: (group: string) => boolean;
  toggleGroup: (group: string) => void;
  onLogout: () => void;
}

export const Sidebar = ({ user, isActive, isGroupOpen, toggleGroup, onLogout }: SidebarProps) => (
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
        <div className="h-10 w-10 rounded bg-[#009cae] flex items-center justify-center text-white border border-white/10">
          <UserCircle size={24} />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-sm font-bold text-white truncate uppercase">{user?.username}</span>
          <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">{user?.roleLabel || user?.role}</span>
        </div>
      </div>
    </div>

    <nav className="flex-1 mt-4 space-y-1 overflow-y-auto custom-scrollbar">
      {user?.role !== 'sales' && (
        <Link to="/dashboard" className={`flex items-center px-6 py-3 transition-all ${isActive('/dashboard') ? 'bg-[#009cae] text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
          <LayoutDashboard size={18} className={`mr-3 ${isActive('/dashboard') ? 'text-white' : 'text-cyan-500'}`} />
          <span className="text-sm font-normal">Painel Gestor</span>
        </Link>
      )}

      <div className="space-y-1">
        <button onClick={() => toggleGroup('master')} className="w-full flex items-center justify-between px-6 py-3 text-gray-500 hover:text-white uppercase text-[10px] font-black tracking-widest">
          <span>Cadastros Base</span>
          {isGroupOpen('master') ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        {isGroupOpen('master') && (
          <div className="bg-black/20 animate-in slide-in-from-top-1 duration-200">
            <SidebarLink to="/clients" icon={<Database size={14} />} label="Clientes" active={isActive('/clients')} />
            <SidebarLink to="/suppliers" icon={<Truck size={14} />} label="Fornecedores" active={isActive('/suppliers')} />
            <SidebarLink to="/products" icon={<Package size={14} />} label="Produtos" active={isActive('/products')} />
          </div>
        )}
      </div>

      <div className="space-y-1">
        <button onClick={() => toggleGroup('ops')} className="w-full flex items-center justify-between px-6 py-3 text-gray-500 hover:text-white uppercase text-[10px] font-black tracking-widest">
          <span>Operacional</span>
          {isGroupOpen('ops') ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        {isGroupOpen('ops') && (
          <div className="bg-black/20 animate-in slide-in-from-top-1 duration-200">
            <SidebarLink to="/orders" icon={<ShoppingCart size={14} />} label="Pedidos de Venda" active={isActive('/orders')} />
            <SidebarLink to="/inventory" icon={<Boxes size={14} />} label="Gestão de Estoque" active={isActive('/inventory')} />
          </div>
        )}
      </div>
    </nav>

    <div className="p-6 border-t border-gray-800">
      <button onClick={onLogout} className="flex items-center text-gray-500 hover:text-red-400 transition-colors">
        <LogOut size={16} className="mr-3" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Encerrar Sessão</span>
      </button>
    </div>
  </aside>
);

const SidebarLink = ({ to, icon, label, active }: any) => (
  <Link to={to} className={`flex items-center pl-10 pr-6 py-2.5 text-xs transition-all ${active ? 'text-cyan-400 font-bold' : 'text-gray-400 hover:text-white'}`}>
    <span className="mr-3 opacity-70">{icon}</span> {label}
  </Link>
);