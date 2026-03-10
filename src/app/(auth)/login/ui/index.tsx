import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User as UserIcon, Database } from 'lucide-react';
import api from '../../../../services/api';
import { useAuthStore } from '../../../../store/useAuthStore';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [database, setDatabase] = useState('MaltFlow_Sorocaba');
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
      setError(err.response?.data?.message || 'Credenciais inválidas para a base selecionada.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans text-gray-700">
      <div className="max-w-[450px] w-full bg-white rounded shadow-sm border border-gray-200 overflow-hidden px-10 py-12">
        
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
             <div className="bg-gray-800 p-1 rounded-sm mr-2">
                <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                   <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
             </div>
             <span className="text-6xl font-light text-gray-700 tracking-tight">MaltFlow</span>
          </div>
          <h2 className="text-2xl font-light text-gray-400 mb-1 tracking-tight">Linha Regional</h2>
          <p className="text-cyan-600 text-xl font-light">Unidade Sorocaba</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-red-500 text-xs text-center font-medium bg-red-50 py-2 rounded border border-red-100 italic">
              {error}
            </div>
          )}
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none border-r border-gray-200 my-2 px-3">
              <UserIcon className="text-cyan-600" size={20} />
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-16 pr-4 py-3 border border-gray-300 rounded text-gray-600 placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="Usuário ou E-mail"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none border-r border-gray-200 my-2 px-3">
              <Lock className="text-cyan-600" size={20} />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-16 pr-4 py-3 border border-gray-300 rounded text-gray-600 placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="Senha de Acesso"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none border-r border-gray-200 my-2 px-3">
              <Database className="text-cyan-600" size={20} />
            </div>
            <select
              value={database}
              onChange={(e) => setDatabase(e.target.value)}
              className="w-full pl-16 pr-4 py-3 border border-gray-300 rounded text-gray-600 bg-white focus:outline-none focus:border-cyan-500 appearance-none transition-colors"
            >
              <option value="MaltFlow_Sorocaba">MaltFlow_Sorocaba (Produção)</option>
              <option value="MaltFlow_HML">MaltFlow_HML (Homologação)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-48 mx-auto block bg-[#009cae] hover:bg-[#008ba0] text-white text-lg font-normal py-3 rounded shadow-sm transition-all mt-6 uppercase tracking-widest text-sm"
          >
            {loading ? 'Autenticando...' : 'Entrar'}
          </button>
        </form>
      </div>

      <div className="mt-6 w-full max-w-4xl border-t border-gray-200 pt-6">
        <div className="flex flex-col items-center">
           <div className="flex items-center text-gray-400 mb-1">
              <div className="w-5 h-5 border border-gray-300 rounded-full flex items-center justify-center mr-1">
                 <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
              </div>
              <span className="text-[10px] font-bold tracking-widest uppercase">MaltFlow Engine</span>
           </div>
           <p className="text-[10px] text-gray-400">Barley Importadora • Regional Sorocaba • v1.2.0</p>
        </div>
      </div>
    </div>
  );
};