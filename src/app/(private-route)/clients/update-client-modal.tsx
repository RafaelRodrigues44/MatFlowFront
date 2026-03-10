import React, { useState } from 'react';
import { Building2, Save, MapPin, Lock } from 'lucide-react';
import api from '../../../services/api';
import { Modal } from '../../../components/ui/modal';

interface UpdateClientModalProps {
  client: any;
  onClose: () => void;
  onSuccess: () => void;
}

export const UpdateClientModal = ({ client, onClose, onSuccess }: UpdateClientModalProps) => {
  const [formData, setFormData] = useState({ 
    nome: client.nome, 
    estado: client.estado, 
    municipio: client.municipio 
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.patch(`/master-data/clients/${client.codigo}`, formData); 
      onSuccess();
      onClose();
    } catch (error: any) {
      alert("Erro ao atualizar dados do cliente.");
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <Modal title={`Editar Dados do Cliente: ${client.codigo}`} isOpen={true} onClose={onClose}>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1 opacity-60 cursor-not-allowed">
          <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Código (Protegido)</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
            <input disabled value={client.codigo} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded text-sm bg-gray-50 font-mono" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Razão Social</label>
          <div className="relative">
            <Building2 className="absolute left-3 top-3 text-cyan-600" size={16} />
            <input 
              required 
              value={formData.nome} 
              onChange={e => setFormData({...formData, nome: e.target.value})} 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded text-sm focus:border-cyan-500 transition-all" 
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Município</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-cyan-600" size={16} />
            <input 
              required 
              value={formData.municipio} 
              onChange={e => setFormData({...formData, municipio: e.target.value})} 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded text-sm focus:border-cyan-500" 
            />
          </div>
        </div>

        <div className="space-y-1 text-center">
          <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">UF</label>
          <input 
            required 
            maxLength={2} 
            value={formData.estado} 
            onChange={e => setFormData({...formData, estado: e.target.value.toUpperCase()})} 
            className="w-full px-4 py-2 border border-gray-200 rounded text-sm focus:border-cyan-500 font-bold" 
          />
        </div>

        <div className="md:col-span-2 flex justify-end pt-4 border-t border-gray-100 gap-3">
          <button type="button" onClick={onClose} className="px-6 py-2 rounded text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors">Cancelar</button>
          <button 
            type="submit" 
            disabled={loading} 
            className="bg-[#009cae] hover:bg-[#008ba0] text-white px-8 py-2.5 rounded text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-md"
          >
            <Save size={16} /> {loading ? 'Atualizando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </Modal>
  );
};