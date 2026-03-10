import { useState } from 'react';
import { Users, UserPlus } from 'lucide-react';
import { UsersListPage } from '../../app/(private-route)/users/page';
import { RegisterPage } from '../../app/(private-route)/register/page';

export const UsersManagementPage = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'register'>('list');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-light text-gray-800 tracking-tighter">Controle de Acessos</h2>
          <p className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest">Tabela ZUR - Regional Sorocaba</p>
        </div>
      </div>

      <div className="flex border-b border-gray-200 gap-8">
        <button
          onClick={() => setActiveTab('list')}
          className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 border-b-2 ${
            activeTab === 'list' 
              ? 'border-[#009cae] text-[#009cae]' 
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          <Users size={16} /> Listagem de Usuários
        </button>
        <button
          onClick={() => setActiveTab('register')}
          className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 border-b-2 ${
            activeTab === 'register' 
              ? 'border-[#009cae] text-[#009cae]' 
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          <UserPlus size={16} /> Novo Cadastro
        </button>
      </div>
      
      <div className="mt-4">
        {activeTab === 'list' ? (
          <UsersListPage onAddClick={() => setActiveTab('register')} />
        ) : (
          <RegisterPage onSuccess={() => setActiveTab('list')} />
        )}
      </div>
    </div>
  );
};