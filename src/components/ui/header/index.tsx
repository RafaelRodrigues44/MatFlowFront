import { Search, Bell, ChevronRight } from 'lucide-react';
import { useSearchStore } from '../../../store/useSearchStore';

interface HeaderProps {
  user?: {
    username?: string;
  };
  showSearch?: boolean;
}

export const Header = ({ user, showSearch = true }: HeaderProps) => {
  const { searchTerm, setSearchTerm } = useSearchStore();

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-10">
      <div className="flex items-center gap-4 text-gray-400">
        <div className="flex items-center text-xs gap-2">
          <span className="hover:text-cyan-600 cursor-pointer transition-colors">
            Barley Importadora
          </span>

          <ChevronRight size={12} />

          <span className="text-gray-800 font-medium tracking-tight">
            Regional Sorocaba
          </span>
        </div>

        {showSearch && (
          <div className="hidden md:flex items-center bg-gray-100 rounded-md px-3 py-1.5 ml-4">
            <Search size={14} className="text-gray-400 mr-2" />

            <input
              type="text"
              placeholder="Pesquisa global..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none text-[11px] focus:outline-none w-48"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        <button className="text-gray-400 hover:text-cyan-600 relative">
          <Bell size={18} />
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-gray-100 italic text-[11px] font-bold uppercase">
          {user?.username ?? 'Usuário'}
        </div>
      </div>
    </header>
  );
};