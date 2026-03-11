import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { type ReactNode } from 'react';
import Layout from './layout';
import AuthLayout from './(auth)/login/layout';
import LoginPage from './(auth)/login/page';
import { DashboardPage } from './(private-route)/dashboard/page';
import { ClientsPage } from './(private-route)/master-data/clients/page'; 
import { useAuthStore } from '../store/useAuthStore';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthStore();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="clients" element={<ClientsPage />} /> 
          <Route path="products" element={<div>Catálogo de Produtos</div>} />
          
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}