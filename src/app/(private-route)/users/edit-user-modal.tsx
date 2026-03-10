import React, { useState } from 'react';
import { X, Lock, Power, Save } from 'lucide-react';
import api from '../../../services/api';

interface EditUserModalProps {
  user: any;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditUserModal = ({ user, onClose, onSuccess }: EditUserModalProps) => {
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(user.isActive);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.patch(`/users/${user.id}`, {
        ...(password && { password }), 
        isActive
      });
      onSuccess();
      onClose();
    } catch (err) {
      alert("Erro ao atualizar usuário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
      <div className="bg-white rounded shadow-xl border border-gray-200 w-full max-w-md overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">
            Editar Acesso: {user.username}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleUpdate} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nova Senha (opcional)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none border-r border-gray-100 my-2 px-3">
                <Lock className="text-cyan-600" size={16} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-16 pr-4 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-cyan-500"
                placeholder="Deixe em branco para manter"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded border border-gray-100">
            <div className="flex items-center gap-2">
              <Power size={16} className={isActive ? "text-green-500" : "text-gray-400"} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Status da Conta</span>
            </div>
            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isActive ? 'bg-[#009cae]' : 'bg-gray-300'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#009cae] hover:bg-[#008ba0] text-white px-6 py-2 rounded text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <Save size={14} />
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};