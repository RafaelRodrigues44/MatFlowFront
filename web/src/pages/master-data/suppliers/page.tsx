import { useEffect, useState } from 'react';
import { Truck, UserPlus, MapPin, Globe, MoreHorizontal, FileText } from 'lucide-react';
import api from '../../../services/api';
import { AddSupplierModal } from './add-supplier-modal';
import { UpdateSupplierModal } from './update-supplier-modal';
import { useSearchStore } from '../../../store/useSearchStore';

export const SuppliersListPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const { searchTerm } = useSearchStore();

  const fetchSuppliers = async () => {
    try {
      const res = await api.get('/master-data/suppliers');
      setSuppliers(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const filteredSuppliers = suppliers.filter((s: any) => 
    (s.nome?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
    (s.codigo?.toString() || '').includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#009cae]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-light text-gray-800 tracking-tighter">Base de Fornecedores</h2>
          <p className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest">Tabela SA2 - Master Data Sorocaba</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#009cae] hover:bg-[#008ba0] text-white px-4 py-2 rounded text-[10px] font-bold flex items-center transition-all shadow-sm uppercase tracking-widest"
        >
          <UserPlus size={16} className="mr-2" /> Novo Fornecedor
        </button>
      </div>

      <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-400 tracking-widest">
              <th className="px-6 py-4 border-b border-gray-200 w-24 text-center">Código</th>
              <th className="px-6 py-4 border-b border-gray-200">Razão Social</th>
              <th className="px-6 py-4 border-b border-gray-200 text-center">Localidade / País</th>
              <th className="px-6 py-4 border-b border-gray-200 w-16"></th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600">
            {filteredSuppliers.map((supplier: any) => (
              <tr 
                key={supplier.codigo} 
                onClick={() => setSelectedSupplier(supplier)}
                className="hover:bg-gray-50 transition-colors border-b border-gray-100 group cursor-pointer"
              >
                <td className="px-6 py-4 text-center font-mono text-[10px] text-gray-400">
                  {supplier.codigo}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-gray-100 rounded flex items-center justify-center text-gray-400 group-hover:bg-cyan-100 group-hover:text-cyan-600 transition-colors">
                      <Truck size={14} />
                    </div>
                    <span className="font-bold text-gray-800 uppercase tracking-tight">{supplier.nome}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-[9px] font-bold uppercase">
                      <MapPin size={10} className="text-cyan-600" /> {supplier.estado}
                    </div>
                    <div className="inline-flex items-center gap-1 bg-cyan-50 px-2 py-1 rounded text-[9px] font-bold uppercase text-cyan-700">
                      <Globe size={10} /> {supplier.pais}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-gray-400 hover:text-cyan-600 transition-colors">
                      <FileText size={16} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-cyan-600 transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          Total SA2: {filteredSuppliers.length}
        </div>
      </div>

      {isAddModalOpen && <AddSupplierModal onClose={() => setIsAddModalOpen(false)} onSuccess={fetchSuppliers} />}
      {selectedSupplier && <UpdateSupplierModal supplier={selectedSupplier} onClose={() => setSelectedSupplier(null)} onSuccess={fetchSuppliers} />}
    </div>
  );
};