import { Filter, Plus } from 'lucide-react';

interface TableActionsProps {
  onAddClick: () => void;
  addLabel: string;
}

export const TableActions = ({ onAddClick, addLabel }: TableActionsProps) => {
  return (
    <div className="flex gap-2">
      <button className="bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded text-[10px] font-black flex items-center hover:bg-gray-50 transition-colors shadow-sm tracking-widest uppercase">
        <Filter size={14} className="mr-2" /> Filtros
      </button>
      <button 
        onClick={onAddClick}
        className="bg-[#009cae] hover:bg-[#008ba0] text-white px-4 py-1.5 rounded text-[10px] font-black flex items-center transition-all shadow-sm uppercase tracking-widest"
      >
        <Plus size={16} className="mr-2" /> {addLabel}
      </button>
    </div>
  );
};