import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

const dataBar = [
  { name: 'Saldos Bancários', valor: 19500000 },
  { name: 'Recebimentos', valor: 17500000 },
  { name: 'Pagamentos', valor: 500000 },
];

const dataPie = [
  { name: 'Investimentos', value: 17500002 },
  { name: 'Disponível', value: 19526802 },
];

const COLORS = ['#1e3a8a', '#3b82f6', '#94a3b8'];

export const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow-sm border-l-4 border-blue-600">
          <p className="text-xs font-bold text-slate-500 uppercase">Saldo Total</p>
          <h2 className="text-2xl font-black text-slate-800">R$ 36.509.842,40</h2>
        </div>
        <div className="bg-white p-6 rounded shadow-sm border-l-4 border-green-500">
          <p className="text-xs font-bold text-slate-500 uppercase">A Receber</p>
          <h2 className="text-2xl font-black text-slate-800">R$ 23.944.896,48</h2>
        </div>
        <div className="bg-white p-6 rounded shadow-sm border-l-4 border-red-500">
          <p className="text-xs font-bold text-slate-500 uppercase">A Pagar</p>
          <h2 className="text-2xl font-black text-slate-800">R$ 32.310.232,81</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow-sm border border-slate-200 h-80">
          <h3 className="text-sm font-bold text-slate-700 mb-6 uppercase tracking-wider">Disponibilidade Financeira</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataBar}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="valor" fill="#1e3a8a" radius={[4, 4, 0, 0]}>
                {dataBar.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded shadow-sm border border-slate-200 h-80 flex flex-col">
          <h3 className="text-sm font-bold text-slate-700 mb-6 uppercase tracking-wider">Composição de Saldos</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dataPie} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {dataPie.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};