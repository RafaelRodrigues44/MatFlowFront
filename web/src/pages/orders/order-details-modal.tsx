import { X} from 'lucide-react';

interface OrderDetailsProps {
  order: any;
  onClose: () => void;
}

export const OrderDetailsModal = ({ order, onClose }: OrderDetailsProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-in fade-in duration-200">
      <div className="bg-white rounded shadow-2xl border border-gray-200 w-full max-w-4xl overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/80">
          <div className="flex flex-col">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Itens do Pedido (SC6)</h3>
            <span className="text-[10px] font-bold text-cyan-600">Documento Origem: {order.numeroPedido}</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded border border-gray-100">
              <span className="text-[9px] font-black text-gray-400 uppercase block mb-1">Cliente Solicitante</span>
              <p className="text-sm font-bold text-gray-800 uppercase tracking-tight">{order.clienteCodigo}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded border border-gray-100 text-center">
              <span className="text-[9px] font-black text-gray-400 uppercase block mb-1">Total do Pedido</span>
              <p className="text-sm font-black text-cyan-700">R$ {Number(order.valorTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded border border-gray-100 text-right">
              <span className="text-[9px] font-black text-gray-400 uppercase block mb-1">Data Emissão</span>
              <p className="text-sm font-bold text-gray-800">{new Date(order.dataEmissao).toLocaleDateString('pt-BR')}</p>
            </div>
          </div>

          <div className="overflow-x-auto border border-gray-100 rounded">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[9px] uppercase font-black text-gray-400 tracking-tighter">
                  <th className="px-4 py-3 w-16 text-center">Item</th>
                  <th className="px-4 py-3">Produto (SB1)</th>
                  <th className="px-4 py-3 text-center">Quantidade</th>
                  <th className="px-4 py-3 text-right">Preço Unit.</th>
                  <th className="px-4 py-3 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-gray-600">
                {order.itens?.map((item: any) => (
                  <tr key={item.id} className="border-t border-gray-50 hover:bg-cyan-50/30 transition-colors">
                    <td className="px-4 py-3 text-center font-mono text-[11px] text-gray-400">{item.item}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-800 uppercase">{item.produtoCodigo}</span>
                        <span className="text-[10px] text-gray-400 uppercase truncate max-w-[200px]">{item.produto?.descricao}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center font-bold">{Number(item.quantidade).toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">R$ {Number(item.precoUnitario).toFixed(2)}</td>
                    <td className="px-4 py-3 text-right font-black text-gray-700">R$ {Number(item.valorTotal).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 rounded text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-gray-800 transition-all"
          >
            Fechar Visualização
          </button>
        </div>
      </div>
    </div>
  );
};