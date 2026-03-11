import React, { useState } from 'react';
import { Building2, Save, MapPin, Hash } from 'lucide-react';
import api from '../../../../services/api';
import { Modal } from '../../../../components/ui/modal';

interface AddClientModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const AddClientModal = ({ onClose, onSuccess }: AddClientModalProps) => {
  const [formData, setFormData] = useState({ 
    codigo: '', 
    nome: '', 
    estado: '', 
    municipio: '' 
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      codigo: formData.codigo.padStart(6, '0'),
      estado: formData.estado.toUpperCase().trim()
    };

    try {
      await api.post('/master-data/clients', payload);
      onSuccess();
      onClose();
    } catch (error: any) {
      alert("Erro ao cadastrar cliente na base Sorocaba.");
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <Modal title="Cadastro de Novo Cliente" isOpen={true} onClose={onClose}>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Código do Cliente</label>
          <div className="relative">
            <Hash className="absolute left-3 top-3 text-cyan-600" size={16} />
            <input 
              required 
              maxLength={6} 
              value={formData.codigo} 
              onChange={e => setFormData({...formData, codigo: e.target.value.replace(/\D/g, '')})} 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded text-sm focus:border-cyan-500 transition-all font-mono" 
              placeholder="Ex: 000001" 
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Razão Social / Nome</label>
          <div className="relative">
            <Building2 className="absolute left-3 top-3 text-cyan-600" size={16} />
            <input 
              required 
              value={formData.nome} 
              onChange={e => setFormData({...formData, nome: e.target.value})} 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded text-sm focus:border-cyan-500 transition-all" 
              placeholder="Nome da Empresa" 
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
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded text-sm focus:border-cyan-500 transition-all" 
              placeholder="Ex: Sorocaba" 
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">UF (Estado)</label>
          <input 
            required 
            maxLength={2} 
            value={formData.estado} 
            onChange={e => setFormData({...formData, estado: e.target.value.toUpperCase()})} 
            className="w-full px-4 py-2 border border-gray-200 rounded text-sm focus:border-cyan-500 text-center font-bold" 
            placeholder="SP" 
          />
        </div>

        <div className="md:col-span-2 flex justify-end pt-4 border-t border-gray-100">
          <button 
            type="submit" 
            disabled={loading} 
            className="bg-[#009cae] hover:bg-[#008ba0] text-white px-8 py-2.5 rounded text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-md disabled:opacity-50"
          >
            <Save size={16} /> 
            {loading ? 'Processando...' : 'Confirmar Cadastro'}
          </button>
        </div>
      </form>
    </Modal>
  );
};