import { useEffect, useState } from 'react';
import { 
  Package, 
  Plus, 
  Layers, 
  Weight, 
  MoreHorizontal, 
  FileText, 
  Search, 
  Filter 
} from 'lucide-react';
import api from '../../../services/api';
import { AddProductModal } from './add-product-modal';
import { UpdateProductModal } from './update-product-modal';
import { useSearchStore } from '../../../store/useSearchStore';

export const ProductsListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { searchTerm, setSearchTerm } = useSearchStore();

  const fetchProducts = async () => {
    try {
      const res = await api.get('/master-data/products');
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p: any) => 
    (p.descricao?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
    (p.codigo?.toString() || '').includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#009cae]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      {/* Cabeçalho Padronizado */}
      <div className="flex justify-between items-end mb-2">
        <div>
          <h2 className="text-2xl font-light text-gray-800 tracking-tighter">Catálogo de Produtos</h2>
          <p className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest">Tabela SB1 - Master Data Sorocaba</p>
        </div>
        
        <div className="flex gap-2">
          <div className="flex items-center bg-white border border-gray-200 rounded px-3 py-1.5 shadow-sm">
            <Search size={14} className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Pesquisar código ou descrição..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none text-xs focus:outline-none w-64"
            />
          </div>
          <button className="bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded text-xs font-bold flex items-center hover:bg-gray-50 transition-colors shadow-sm">
            <Filter size={14} className="mr-2" /> FILTROS
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#009cae] hover:bg-[#008ba0] text-white px-4 py-1.5 rounded text-xs font-bold flex items-center transition-all shadow-sm uppercase tracking-widest"
          >
            <Plus size={16} className="mr-2" /> Novo Item
          </button>
        </div>
      </div>

      <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-400 tracking-widest">
              <th className="px-6 py-4 border-b border-gray-200 w-32 text-center">Código</th>
              <th className="px-6 py-4 border-b border-gray-200">Descrição Comercial do Artigo</th>
              <th className="px-6 py-4 border-b border-gray-200 text-center w-48">Especificações (UM/Tipo)</th>
              <th className="px-6 py-4 border-b border-gray-200 w-16"></th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600">
            {filteredProducts.map((product: any) => (
              <tr 
                key={product.codigo} 
                className="hover:bg-cyan-50/50 transition-colors cursor-pointer border-b border-gray-100 group"
              >
                <td className="px-6 py-3 text-center font-mono font-bold text-[#009cae] bg-gray-50/30 group-hover:bg-transparent uppercase">
                  {product.codigo}
                </td>
                <td className="px-6 py-3" onClick={() => setSelectedProduct(product)}>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-gray-100 rounded flex items-center justify-center text-gray-400 group-hover:bg-cyan-100 group-hover:text-cyan-600 transition-colors">
                      <Package size={14} />
                    </div>
                    <span className="font-bold text-gray-800 uppercase tracking-tight">{product.descricao}</span>
                  </div>
                </td>
                <td className="px-6 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-gray-200">
                      <Weight size={10} className="text-cyan-600" /> {product.unidadeMedida}
                    </div>
                    <div className="inline-flex items-center gap-1 bg-cyan-50 px-2 py-0.5 rounded text-[10px] font-bold uppercase text-cyan-700 border border-cyan-100">
                      <Layers size={10} /> {product.tipo}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-gray-300 hover:text-cyan-600 transition-colors">
                      <FileText size={18} />
                    </button>
                    <button className="text-gray-300 hover:text-cyan-600 transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Estado Vazio Padronizado */}
        {filteredProducts.length === 0 && (
          <div className="p-20 text-center">
            <Package size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400 text-sm font-light">Nenhum produto localizado no mestre SB1.</p>
          </div>
        )}

        {/* Rodapé Padronizado */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-between items-center">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Total SB1: {filteredProducts.length} Itens
          </span>
          <div className="flex gap-1">
            <button className="px-2 py-1 text-[10px] border border-gray-300 rounded bg-white text-gray-400 hover:bg-gray-50">Anterior</button>
            <button className="px-2 py-1 text-[10px] border border-[#009cae] rounded bg-[#009cae] text-white">1</button>
            <button className="px-2 py-1 text-[10px] border border-gray-300 rounded bg-white text-gray-400 hover:bg-gray-50">Próximo</button>
          </div>
        </div>
      </div>

      {/* Modais de Ação */}
      {isAddModalOpen && <AddProductModal onClose={() => setIsAddModalOpen(false)} onSuccess={fetchProducts} />}
      {selectedProduct && <UpdateProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onSuccess={fetchProducts} />}
    </div>
  );
};