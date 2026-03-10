import { useEffect, useState, useCallback } from 'react';
import { Building2, MapPin, FileText, MoreHorizontal } from 'lucide-react';
import api from '../../../services/api';
import { AddClientModal } from './add-client-modal';
import { UpdateClientModal } from './update-client-modal';
import { useSearchStore } from '../../../store/useSearchStore';
import { 
  DataTable, 
  Loading, 
  PageControl,
  Pagination
} from '../../../components/shared';

export const ClientsPage = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  
  const [limit, setLimit] = useState(5);

  const { searchTerm } = useSearchStore();

  const fetchClients = useCallback(async (page = 1, currentLimit = limit) => {
    setLoading(true);
    try {
      const response = await api.get('/master-data/clients', {
        params: { page, limit: currentLimit, search: searchTerm }
      });
      
      const result = response.data;
      const fullList = Array.isArray(result) ? result : (result?.data || []);
      const total = result?.total || result?.count || fullList.length;
      
      const startIndex = (page - 1) * currentLimit;
      const endIndex = startIndex + currentLimit;
      const paginatedList = fullList.length > currentLimit 
        ? fullList.slice(startIndex, endIndex) 
        : fullList;

      setClients(paginatedList);
      setTotalPages(Math.ceil(total / currentLimit) || 1);
      setCurrentPage(page);
      setTotalRecords(total);
    } catch (error) {
      console.error("Erro na base SA1:", error);
      setClients([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, limit]);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchClients(1, limit);
    }, 300);
    return () => clearTimeout(handler);
  }, [fetchClients, limit]);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setCurrentPage(1); 
    fetchClients(1, newLimit);
  };

  if (loading && clients.length === 0) return <Loading />;

  return (
    <div className="p-6 space-y-4 animate-in fade-in duration-500">
      <PageControl 
        title="Carteira de Clientes"
        subtitle="Master Data - Unidade Regional Sorocaba"
        addLabel="Novo Registro"
        onAddClick={() => setIsAddModalOpen(true)}
      />

      <DataTable 
        headers={['Código', 'Razão Social / Nome Fantasia', 'Localidade', '']}
        data={clients}
        footerLabel="Registros SA1"
        totalRecords={totalRecords}
        emptyMessage="Nenhum cliente localizado."
        renderRow={(client: any) => (
          <tr key={client.codigo} className="hover:bg-cyan-50/50 transition-colors border-b border-gray-100 group text-[11px]">
            <td className="px-6 py-3 text-center font-mono font-bold text-[#009cae] bg-gray-50/30 group-hover:bg-transparent uppercase">
              {client.codigo}
            </td>
            <td className="px-6 py-3 cursor-pointer" onClick={() => setSelectedClient(client)}>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-gray-100 rounded flex items-center justify-center text-gray-400 group-hover:bg-cyan-100 group-hover:text-cyan-600 transition-colors">
                  <Building2 size={14} />
                </div>
                <span className="font-bold text-gray-800 uppercase tracking-tight">{client.nome}</span>
              </div>
            </td>
            <td className="px-6 py-3 text-center">
              <div className="inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded font-bold uppercase border border-gray-200">
                <MapPin size={10} className="text-cyan-600" /> 
                {client.municipio} / {client.estado}
              </div>
            </td>
            <td className="px-6 py-3 text-right">
              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setSelectedClient(client)} className="text-gray-400 hover:text-cyan-600">
                  <FileText size={18} />
                </button>
                <button className="text-gray-400 hover:text-cyan-600">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </td>
          </tr>
        )}
      />

      <div className="flex items-center justify-between mt-4 px-2">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Exibir:</span>
          <select 
            value={limit}
            onChange={(e) => handleLimitChange(Number(e.target.value))}
            className="bg-white border border-gray-200 text-[10px] font-bold py-1 px-2 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 text-gray-600 uppercase cursor-pointer"
          >
            {[5, 10, 20, 30, 40, 50, 100].map(val => (
              <option key={val} value={val}>{val} Registros</option>
            ))}
          </select>
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 ml-2">
            Total: {totalRecords}
          </span>
        </div>

        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={(page) => fetchClients(page, limit)} 
        />
      </div>

      {isAddModalOpen && (
        <AddClientModal onClose={() => setIsAddModalOpen(false)} onSuccess={() => fetchClients(currentPage, limit)} />
      )}

      {selectedClient && (
        <UpdateClientModal client={selectedClient} onClose={() => setSelectedClient(null)} onSuccess={() => fetchClients(currentPage, limit)} />
      )}
    </div>
  );
};