import { useEffect, useState } from 'react';
import { Users, Shield, MoreHorizontal, Mail } from 'lucide-react';
import api from '../../services/api';
import { EditUserModal } from '../users/edit-user-modal';

interface UsersListProps {
  onAddClick: () => void;
}

export const UsersListPage = ({ onAddClick }: UsersListProps) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (error) {
      console.error("Erro ao carregar lista ZUR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
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
      <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-400 tracking-widest">
              <th className="px-6 py-4 border-b border-gray-200 w-64">Identificação</th>
              <th className="px-6 py-4 border-b border-gray-200">Perfil de Acesso</th>
              <th className="px-6 py-4 border-b border-gray-200 text-center">Status</th>
              <th className="px-6 py-4 border-b border-gray-200 w-16"></th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600">
            {users.map((item: any) => (
              <tr 
                key={item.id} 
                onClick={() => setSelectedUser(item)}
                className="hover:bg-gray-50 transition-colors border-b border-gray-100 group cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-gray-100 rounded flex items-center justify-center text-gray-400 group-hover:bg-cyan-100 group-hover:text-cyan-600 transition-colors">
                      <Mail size={14} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 uppercase tracking-tight">{item.username}</span>
                      <span className="text-[10px] text-gray-400 italic">ID: {item.id}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-cyan-600" />
                    <span className="bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter border border-cyan-100">
                      {item.roleLabel || item.role}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${
                    item.isActive 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {item.isActive ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-gray-400 hover:text-cyan-600 transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="p-20 text-center">
            <Users size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400 text-sm font-light mb-4">Nenhum colaborador registrado na unidade Sorocaba.</p>
            <button 
              onClick={onAddClick}
              className="text-[#009cae] text-xs font-bold uppercase tracking-widest hover:underline"
            >
              Clique aqui para registrar o primeiro
            </button>
          </div>
        )}

        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Total de Registros: {users.length}
          </span>
        </div>
      </div>

      {selectedUser && (
        <EditUserModal 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)} 
          onSuccess={fetchUsers}
        />
      )}
    </div>
  );
};