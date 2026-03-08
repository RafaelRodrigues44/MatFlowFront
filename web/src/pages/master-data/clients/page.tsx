import { useEffect, useState } from 'react';
import { UserPlus, Building2, MapPin, MoreHorizontal, FileText } from 'lucide-react';
import api from '../../../services/api';
import { AddClientModal } from './add-client-modal';
import { UpdateClientModal } from './update-client-modal';
import { useSearchStore } from '../../../store/useSearchStore';

export const ClientsListPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const { searchTerm } = useSearchStore();

  const fetchClients = async () => {
    try {
      const res = await api.get('/master-data/clients');
      setClients(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = clients.filter((client: any) => 
    (client.nome?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
    (client.codigo?.toString() || '').includes(searchTerm)
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
          <h2 className="text-2xl font-light text-gray-800 tracking-tighter">Carteira de Clientes</h2>
          <p className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest">Tabela SA1 - Master Data Sorocaba</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#009cae] hover:bg-[#008ba0] text-white px-4 py-2 rounded text-[10px] font-bold flex items-center transition-all shadow-sm uppercase tracking-widest"
        >
          <UserPlus size={16} className="mr-2" /> Novo Cliente
        </button>
      </div>

      <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-400 tracking-widest">
              <th className="px-6 py-4 border-b border-gray-200 w-24 text-center">Código</th>
              <th className="px-6 py-4 border-b border-gray-200">Razão Social / Nome Fantasia</th>
              <th className="px-6 py-4 border-b border-gray-200 text-center">Localidade</th>
              <th className="px-6 py-4 border-b border-gray-200 w-16"></th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600">
            {filteredClients.map((client: any) => (
              <tr 
                key={client.codigo} 
                onClick={() => setSelectedClient(client)}
                className="hover:bg-gray-50 transition-colors border-b border-gray-100 group cursor-pointer"
              >
                <td className="px-6 py-4 text-center font-mono text-[10px] text-gray-400">
                  {client.codigo}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-gray-100 rounded flex items-center justify-center text-gray-400 group-hover:bg-cyan-100 group-hover:text-cyan-600 transition-colors">
                      <Building2 size={14} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 uppercase tracking-tight leading-tight">
                        {client.nome}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-[9px] font-bold uppercase">
                    <MapPin size={10} className="text-cyan-600" /> 
                    {client.municipio} / {client.estado}
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
          Total Exibido: {filteredClients.length}
        </div>
      </div>

      {isAddModalOpen && (
        <AddClientModal 
          onClose={() => setIsAddModalOpen(false)} 
          onSuccess={fetchClients} 
        />
      )}

      {selectedClient && (
        <UpdateClientModal 
          client={selectedClient} 
          onClose={() => setSelectedClient(null)} 
          onSuccess={fetchClients} 
        />
      )}
    </div>
  );
};