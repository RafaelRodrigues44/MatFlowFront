import { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  PieChart, 
  Pie 
} from 'recharts';
import { Wallet, ArrowUpCircle, ArrowDownCircle, TrendingUp } from 'lucide-react';
import api from '../../services/api';

export const DashboardPage = () => {
  const [financialData, setFinancialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const COLORS = ['#009cae', '#1c1f22', '#64748b'];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/financial/dashboard-summary');
        setFinancialData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#009cae]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Saldo Total Disponível</p>
            <h2 className="text-2xl font-light text-gray-800 tracking-tighter">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(financialData?.totalBalance || 0)}
            </h2>
          </div>
          <div className="bg-cyan-50 p-3 rounded-full text-[#009cae]">
            <Wallet size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Previsão de Recebimento</p>
            <h2 className="text-2xl font-light text-green-600 tracking-tighter">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(financialData?.receivables || 0)}
            </h2>
          </div>
          <div className="bg-green-50 p-3 rounded-full text-green-500">
            <ArrowUpCircle size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Contas a Pagar (Mês)</p>
            <h2 className="text-2xl font-light text-red-500 tracking-tighter">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(financialData?.payables || 0)}
            </h2>
          </div>
          <div className="bg-red-50 p-3 rounded-full text-red-400">
            <ArrowDownCircle size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow-sm border border-gray-100 h-96 flex flex-col">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp size={16} className="text-cyan-600" />
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-widest">Fluxo de Caixa Mensal</h3>
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialData?.monthlyFlow || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  fontSize={10} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8' }}
                />
                <YAxis 
                  fontSize={10} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8' }}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '4px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {(financialData?.monthlyFlow || []).map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow-sm border border-gray-100 h-96 flex flex-col">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-4 h-4 border-2 border-cyan-600 rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-cyan-600 rounded-full"></div>
            </div>
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-widest">Distribuição de Ativos</h3>
          </div>
          <div className="flex-1 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={financialData?.assetDistribution || []} 
                  innerRadius={80} 
                  outerRadius={110} 
                  paddingAngle={8} 
                  dataKey="value"
                  stroke="none"
                >
                  {(financialData?.assetDistribution || []).map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Barley</span>
              <span className="text-xl font-light text-gray-800">Sorocaba</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};