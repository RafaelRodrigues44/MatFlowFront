import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/login/page';
import { MainLayout } from './components/layout/page';
import { DashboardPage } from './pages/dashboard/page';
import { InventoryPage } from './pages/inventory/page';
import { ClientsListPage } from './pages/master-data/clients/page';
import { SuppliersListPage } from './pages/master-data/suppliers/page';
import { ProductsListPage } from './pages/master-data/products/page';
import { OrdersPage } from './pages/orders/page'; // Novo módulo SC5/SC6
import { UsersManagementPage } from './components/user-management.tsx/page';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuthStore } from './store/useAuthStore';

export function App() {
  const { user } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route 
              path="/dashboard" 
              element={
                user?.role === 'sales' 
                  ? <Navigate to="/clients" replace /> 
                  : <DashboardPage />
              } 
            />
            
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/clients" element={<ClientsListPage />} />
            <Route path="/suppliers" element={<SuppliersListPage />} />
            <Route path="/products" element={<ProductsListPage />} />
            <Route path="/orders" element={<OrdersPage />} /> {/* Rota de Pedidos */}
            
            {user?.role === 'admin' && (
              <Route path="/user-management" element={<UsersManagementPage />} />
            )}
          </Route>
        </Route>

        <Route 
          path="*" 
          element={
            <Navigate to={user?.role === 'sales' ? "/clients" : "/dashboard"} replace />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}