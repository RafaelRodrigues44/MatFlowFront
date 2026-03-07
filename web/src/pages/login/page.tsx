import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Lock, User as UserIcon } from 'lucide-react';
import api from '../../services/api';
import { useAuthStore } from '../../store/useAuthStore';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', { username, password });
      const { access_token, user } = response.data;
      
      setAuth(user, access_token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao conectar com o servidor da Barley.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-blue-700 p-8 text-center">
          <h1 className="text-2xl font-bold text-white tracking-tight">MaltFlow ERP</h1>
          <p className="text-blue-100 text-sm mt-2">Barley Importadora - Regional Sorocaba</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Usuário</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Ex: admin"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded flex items-center justify-center transition-colors disabled:opacity-50"
          >
            {loading ? 'Autenticando...' : (
              <>
                <LogIn size={18} className="mr-2" />
                Acessar Sistema
              </>
            )}
          </button>
        </form>
        
        <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">
            MaltFlow v1.0 • Mind Stack Engine
          </p>
        </div>
      </div>
    </div>
  );
};