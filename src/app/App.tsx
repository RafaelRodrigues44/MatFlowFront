import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { type ReactNode } from 'react';
import Layout from './layout';
import AuthLayout from './(auth)/login/layout';
import LoginPage from './(auth)/login/page';
import { DashboardPage } from './(private-route)/dashboard/page';
import { ClientsPage } from './(private-route)/clients/page'; 
import { useAuthStore } from '../store/useAuthStore';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthStore();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Pública */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />

        {/* Rotas Privadas (Nested Pattern) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Redireciona a raiz para o dashboard automaticamente */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="clients" element={<ClientsPage />} /> 
          <Route path="products" element={<div>Catálogo de Produtos</div>} />
          
          {/* Fallback para rotas inexistentes dentro do painel */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}