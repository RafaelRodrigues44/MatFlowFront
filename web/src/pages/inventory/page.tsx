import { useEffect, useState } from 'react';
import { Plus, Package } from 'lucide-react';
import api from '../../services/api';
import { useAuthStore } from '../../store/useAuthStore';

export const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuthStore();

  useEffect(() => {
    api.get('/inventory').then(res => setProducts(res.data));
  }, []);

  return (
    <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Package size={20} className="text-blue-600" />
          <h2 className="font-bold text-slate-800 uppercase text-sm tracking-widest">Cadastro de Produtos (SB1)</h2>
        </div>
        {user?.role === 'admin' && (
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs font-bold flex items-center transition-colors">
            <Plus size={16} className="mr-2" /> NOVO PRODUTO
          </button>
        )}
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-100 text-[10px] uppercase font-black text-slate-500 tracking-tighter">
            <th className="px-6 py-3 border-b border-slate-200">Código</th>
            <th className="px-6 py-3 border-b border-slate-200">Descrição</th>
            <th className="px-6 py-3 border-b border-slate-200 text-center">UM</th>
            <th className="px-6 py-3 border-b border-slate-200 text-right">Preço (R$)</th>
          </tr>
        </thead>
        <tbody className="text-sm text-slate-700">
          {products.map((prod: any) => (
            <tr key={prod.id} className="hover:bg-blue-50 transition-colors cursor-pointer border-b border-slate-100">
              <td className="px-6 py-3 font-mono font-bold text-blue-700">{prod.code}</td>
              <td className="px-6 py-3 uppercase">{prod.description}</td>
              <td className="px-6 py-3 text-center">{prod.unitOfMeasure}</td>
              <td className="px-6 py-3 text-right font-medium">{Number(prod.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};