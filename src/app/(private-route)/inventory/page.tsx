import { useEffect, useState } from 'react';
import { Plus, Package, Search, Filter, MoreHorizontal } from 'lucide-react';
import api from '../../services/api';
import { useAuthStore } from '../../store/useAuthStore';

export const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await api.get('/inventory');
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#009cae]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h2 className="text-2xl font-light text-gray-800 tracking-tighter">Produtos</h2>
          <p className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest">Tabela SB1 - Mestre de Artigos</p>
        </div>
        
        <div className="flex gap-2">
          <div className="flex items-center bg-white border border-gray-200 rounded px-3 py-1.5 shadow-sm">
            <Search size={14} className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Filtrar por código ou descrição..." 
              className="bg-transparent border-none text-xs focus:outline-none w-64"
            />
          </div>
          <button className="bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded text-xs font-bold flex items-center hover:bg-gray-50 transition-colors shadow-sm">
            <Filter size={14} className="mr-2" /> FILTROS
          </button>
          {user?.role === 'admin' && (
            <button className="bg-[#009cae] hover:bg-[#008ba0] text-white px-4 py-1.5 rounded text-xs font-bold flex items-center transition-all shadow-sm">
              <Plus size={16} className="mr-2" /> INCLUIR PRODUTO
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-400 tracking-widest">
              <th className="px-6 py-4 border-b border-gray-200 w-48">Código</th>
              <th className="px-6 py-4 border-b border-gray-200">Descrição Comercial</th>
              <th className="px-6 py-4 border-b border-gray-200 text-center w-24">UM</th>
              <th className="px-6 py-4 border-b border-gray-200 text-right w-40">Preço de Venda</th>
              <th className="px-6 py-4 border-b border-gray-200 w-16"></th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600">
            {products.map((prod: any) => (
              <tr key={prod.id} className="hover:bg-cyan-50/50 transition-colors cursor-pointer border-b border-gray-100 group">
                <td className="px-6 py-3 font-mono font-bold text-[#009cae] bg-gray-50/30 group-hover:bg-transparent">
                  {prod.code}
                </td>
                <td className="px-6 py-3 font-light uppercase tracking-tight">
                  {prod.description}
                </td>
                <td className="px-6 py-3 text-center">
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-bold text-gray-500 uppercase">
                    {prod.unitOfMeasure}
                  </span>
                </td>
                <td className="px-6 py-3 text-right font-medium text-gray-800">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(prod.price))}
                </td>
                <td className="px-6 py-3 text-right">
                  <button className="text-gray-300 hover:text-cyan-600 transition-colors">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {products.length === 0 && (
          <div className="p-20 text-center">
            <Package size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400 text-sm font-light">Nenhum item localizado na base de dados da Barley Sorocaba.</p>
          </div>
        )}

        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-between items-center">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Total de Registros: {products.length}</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 text-[10px] border border-gray-300 rounded bg-white text-gray-400">Anterior</button>
            <button className="px-2 py-1 text-[10px] border border-[#009cae] rounded bg-[#009cae] text-white">1</button>
            <button className="px-2 py-1 text-[10px] border border-gray-300 rounded bg-white text-gray-400">Próximo</button>
          </div>
        </div>
      </div>
    </div>
  );
};