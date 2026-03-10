import { useEffect, useState } from 'react';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  PlayCircle, 
  Search, 
  Filter, 
  ShoppingCart,  
} from 'lucide-react';
import api from '../../../services/api';
import { OrderDetailsModal } from './order-details-modal';
import { useSearchStore } from '../../../store/useSearchStore';

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const { searchTerm, setSearchTerm } = useSearchStore();

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders');
      setOrders(res.data);
    } catch (err) {
      console.error("Erro ao carregar SC5:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleInvoice = async (id: number) => {
    if (!confirm("Confirmar faturamento? Isso gerará a nota fiscal SD2 e baixará o estoque.")) return;
    try {
      await api.post(`/sales/invoice/${id}`);
      alert("Pedido faturado com sucesso!");
      fetchOrders();
    } catch (err: any) {
      alert(`Erro no faturamento: ${err.response?.data?.message || 'Falha na comunicação'}`);
    }
  };

  const filteredOrders = orders.filter((o: any) =>
    o.numeroPedido.includes(searchTerm) || o.clienteCodigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#009cae]"></div>
    </div>
  );

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      {/* Cabeçalho Padronizado */}
      <div className="flex justify-between items-end mb-2">
        <div>
          <h2 className="text-2xl font-light text-gray-800 tracking-tighter">Carteira de Pedidos</h2>
          <p className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest">Tabela SC5/SC6 - Integração Python</p>
        </div>

        <div className="flex gap-2">
          <div className="flex items-center bg-white border border-gray-200 rounded px-3 py-1.5 shadow-sm">
            <Search size={14} className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Pesquisar pedido ou cliente..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none text-xs focus:outline-none w-64"
            />
          </div>
          <button className="bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded text-xs font-bold flex items-center hover:bg-gray-50 transition-colors shadow-sm">
            <Filter size={14} className="mr-2" /> FILTROS
          </button>
        </div>
      </div>

      <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-400 tracking-widest">
              <th className="px-6 py-4 border-b border-gray-200 w-32">Pedido</th>
              <th className="px-6 py-4 border-b border-gray-200">Cliente</th>
              <th className="px-6 py-4 border-b border-gray-200 w-32">Emissão</th>
              <th className="px-6 py-4 border-b border-gray-200 text-center w-32">Status</th>
              <th className="px-6 py-4 border-b border-gray-200 text-right w-40">Valor Total</th>
              <th className="px-6 py-4 border-b border-gray-200 w-16"></th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600">
            {filteredOrders.map((order: any) => (
              <tr key={order.id} className="hover:bg-cyan-50/50 transition-colors cursor-pointer border-b border-gray-100 group">
                <td className="px-6 py-3 font-mono font-bold text-[#009cae] bg-gray-50/30 group-hover:bg-transparent uppercase">
                  {order.numeroPedido}
                </td>
                <td className="px-6 py-3 font-light uppercase tracking-tight">
                  {order.clienteCodigo}
                </td>
                <td className="px-6 py-3 font-medium text-gray-500">
                  {new Date(order.dataEmissao).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-3">
                  <div className="flex justify-center">
                    {order.status === '1' ? (
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-amber-100">
                        <Clock size={10} /> Pendente
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-emerald-100">
                        <CheckCircle size={10} /> Faturado
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-3 text-right font-bold text-gray-800">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(order.valorTotal))}
                </td>
                <td className="px-6 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="text-gray-300 hover:text-cyan-600 transition-colors"
                    >
                      <FileText size={18} />
                    </button>
                    {order.status === '1' && (
                      <button 
                        onClick={() => handleInvoice(order.id)}
                        className="text-gray-300 hover:text-[#009cae] transition-colors"
                      >
                        <PlayCircle size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Estado Vazio Padronizado */}
        {filteredOrders.length === 0 && (
          <div className="p-20 text-center">
            <ShoppingCart size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400 text-sm font-light">Nenhum pedido localizado na carteira de Sorocaba.</p>
          </div>
        )}

        {/* Rodapé com Paginação Padronizado */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-between items-center">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Total de Pedidos: {filteredOrders.length}
          </span>
          <div className="flex gap-1">
            <button className="px-2 py-1 text-[10px] border border-gray-300 rounded bg-white text-gray-400">Anterior</button>
            <button className="px-2 py-1 text-[10px] border border-[#009cae] rounded bg-[#009cae] text-white">1</button>
            <button className="px-2 py-1 text-[10px] border border-gray-300 rounded bg-white text-gray-400">Próximo</button>
          </div>
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};