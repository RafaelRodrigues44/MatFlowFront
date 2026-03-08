import React, { useState, useEffect } from 'react';
import { User as UserIcon, Lock, Settings, UserPlus } from 'lucide-react';
import api from '../../services/api';

type RoleOption = {
  value: string;
  label: string;
};

interface RegisterProps {
  onSuccess: () => void;
}

export const RegisterPage = ({ onSuccess }: RegisterProps) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: ''
  });

  const [roles, setRoles] = useState<RoleOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const response = await api.get('/users/roles');
        setRoles(response.data);
        if (response.data.length > 0) {
          setFormData(prev => ({ ...prev, role: response.data[0].value }));
        }
      } catch {
        setError("Erro ao sincronizar perfis com a base Barley.");
      }
    };
    loadRoles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/users', {
        username: formData.username,
        password: formData.password,
        role: formData.role
      });
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao registrar usuário.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-50 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-100 text-cyan-600 rounded">
              <UserPlus size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-tight font-sans">
                Credenciais de Acesso
              </h3>
              <p className="text-[10px] text-gray-400 font-sans uppercase">
                Regional Sorocaba • v1.2.0
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="text-red-500 text-[10px] text-center font-bold bg-red-50 py-3 rounded border border-red-100 uppercase tracking-widest">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Usuário
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none border-r border-gray-100 my-2 px-3">
                  <UserIcon className="text-cyan-600" size={18} />
                </div>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full pl-16 pr-4 py-2.5 border border-gray-200 rounded text-sm text-gray-600 focus:outline-none focus:border-cyan-500 transition-colors font-sans"
                  placeholder="Ex: rafael.rodrigues"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Perfil de Acesso
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none border-r border-gray-100 my-2 px-3">
                  <Settings className="text-cyan-600" size={18} />
                </div>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full pl-16 pr-4 py-2.5 border border-gray-200 rounded text-sm text-gray-600 bg-white focus:outline-none focus:border-cyan-500 appearance-none transition-colors font-sans"
                >
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Senha Provisória
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none border-r border-gray-100 my-2 px-3">
                  <Lock className="text-cyan-600" size={18} />
                </div>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-16 pr-4 py-2.5 border border-gray-200 rounded text-sm text-gray-600 focus:outline-none focus:border-cyan-500 transition-colors font-sans"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={loading || roles.length === 0}
              className="bg-[#009cae] hover:bg-[#008ba0] text-white px-8 py-2.5 rounded text-xs font-bold transition-all shadow-sm disabled:opacity-50 uppercase tracking-widest font-sans"
            >
              {loading ? 'Processando...' : 'Confirmar Registro'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};