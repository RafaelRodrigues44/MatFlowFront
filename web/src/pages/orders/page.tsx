import { useEffect, useState } from 'react';
import { FileText, CheckCircle, Clock, PlayCircle } from 'lucide-react';
import api from '../../services/api';
import { OrderDetailsModal } from './order-details-modal';
import { useSearchStore } from '../../store/useSearchStore';

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const { searchTerm } = useSearchStore();

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
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-light text-gray-800 tracking-tighter">Carteira de Pedidos</h2>
          <p className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest italic">Integração Python -&gt; SC5/SC6 Sorocaba</p>
        </div>
      </div>

      <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-[10px] uppercase font-black text-gray-400 tracking-widest border-b border-gray-200">
              <th className="px-6 py-4 w-24">Pedido</th>
              <th className="px-6 py-4">Cliente</th>
              <th className="px-6 py-4">Emissão</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Valor Total</th>
              <th className="px-6 py-4 w-32"></th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600">
            {filteredOrders.map((order: any) => (
              <tr key={order.id} className="hover:bg-gray-50/80 transition-colors border-b border-gray-100 group">
                <td className="px-6 py-4 font-mono text-[11px] font-bold text-cyan-700">{order.numeroPedido}</td>
                <td className="px-6 py-4 font-bold text-gray-800 uppercase tracking-tight">{order.clienteCodigo}</td>
                <td className="px-6 py-4 text-[12px]">{new Date(order.dataEmissao).toLocaleDateString('pt-BR')}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    {order.status === '1' ? (
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded text-[9px] font-black uppercase tracking-tighter border border-amber-100">
                        <Clock size={10} /> Pendente
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-1 rounded text-[9px] font-black uppercase tracking-tighter border border-emerald-100">
                        <CheckCircle size={10} /> Faturado
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-black text-gray-800">
                  R$ {Number(order.valorTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-1.5 text-gray-400 hover:text-cyan-600 transition-colors"
                      title="Ver itens do pedido"
                    >
                      <FileText size={18} />
                    </button>
                    {order.status === '1' && (
                      <button
                        onClick={() => handleInvoice(order.id)}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white p-1.5 rounded transition-all shadow-sm"
                        title="Faturar Pedido"
                      >
                        <PlayCircle size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-[10px] text-gray-400 font-black uppercase tracking-widest flex justify-between">
          <span>Base: {filteredOrders.length} Pedidos localizados</span>
          <span className="text-cyan-600">Regional Sorocaba/SP</span>
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