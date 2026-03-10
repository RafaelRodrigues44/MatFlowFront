import React, { useState } from 'react';
import { X, Truck, Save, MapPin, Hash, Globe } from 'lucide-react';
import api from '../../../services/api';

export const AddSupplierModal = ({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) => {
  const [formData, setFormData] = useState({ 
    codigo: '', 
    nome: '', 
    estado: '', 
    pais: 'BRA' 
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      codigo: formData.codigo.padStart(6, '0'),
      estado: formData.estado.toUpperCase().trim(),
      pais: formData.pais.toUpperCase().trim(),
      nome: formData.nome.trim()
    };

    try {
      await api.post('/master-data/suppliers', payload);
      onSuccess();
      onClose();
    } catch (error: any) {
      const msg = error.response?.data?.message;
      alert(`Erro na SA2: ${Array.isArray(msg) ? msg.join(', ') : msg}`);
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300 px-4">
      <div className="bg-white rounded shadow-xl border border-gray-200 w-full max-w-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Master Data - Novo Fornecedor (SA2)</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Código (A2_COD)</label>
            <div className="relative">
              <Hash className="absolute left-3 top-3 text-cyan-600" size={16} />
              <input 
                required 
                maxLength={6} 
                value={formData.codigo} 
                onChange={e => setFormData({...formData, codigo: e.target.value.replace(/\D/g, '')})} 
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-cyan-500 transition-all font-mono" 
                placeholder="000001" 
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Razão Social (A2_NOME)</label>
            <div className="relative">
              <Truck className="absolute left-3 top-3 text-cyan-600" size={16} />
              <input 
                required 
                maxLength={40} 
                value={formData.nome} 
                onChange={e => setFormData({...formData, nome: e.target.value})} 
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-cyan-500 transition-all" 
                placeholder="Nome do Fornecedor" 
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Estado (A2_EST)</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-cyan-600" size={16} />
              <input 
                required 
                maxLength={2} 
                value={formData.estado} 
                onChange={e => setFormData({...formData, estado: e.target.value.toUpperCase()})} 
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-cyan-500 transition-all" 
                placeholder="SP" 
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">País (A2_PAIS)</label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 text-cyan-600" size={16} />
              <input 
                required 
                maxLength={3} 
                value={formData.pais} 
                onChange={e => setFormData({...formData, pais: e.target.value.toUpperCase()})} 
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-cyan-500 transition-all font-bold" 
                placeholder="BRA" 
              />
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end pt-4 border-t border-gray-100">
            <button 
              type="submit" 
              disabled={loading} 
              className="bg-[#009cae] hover:bg-[#008ba0] text-white px-8 py-2.5 rounded text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all shadow-sm disabled:opacity-50"
            >
              <Save size={16} /> 
              {loading ? 'Gravando...' : 'Confirmar Cadastro'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};