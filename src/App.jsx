import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import ProfilePage from '@/pages/ProfilePage';
import SecurityPage from '@/pages/settings/SecurityPage';
import SettingsPage from '@/pages/settings/SettingsPage';
import GeneralPage from '@/pages/settings/GeneralPage';

import ProductChanges from '@/pages/product/ProductChanges';
import ProductDetail from '@/pages/product/ProductDetail';
import ProductView from '@/pages/product/ProductView';

import UsersDetailPage from '@/pages/users/detail';
import UsersListPage from '@/pages/users/list';
import UsersPage from '@/pages/users/page';

import HomePage from '@/pages/HomePage';
import AuthContext, { AuthProvider } from '@/context/AuthContext';
import { AlertDialogProvider } from '@/components/alert/AlertDialogContext';
import './index.css';

function App() {
  const { user, loading } = useContext(AuthContext); // Adiciona o loading

  // Verifica se está carregando os dados do usuário
  if (loading) {
    return <div>Loading...</div>; // Exibe algo enquanto carrega (pode ser um spinner ou qualquer elemento de loading)
  }

  const ProtectedRoute = ({ element }) => {
    return user ? element : <Navigate to="/login" replace />;
  };

  const PublicRoute = ({ element }) => {
    return !user ? element : <Navigate to="/" replace />;
  };

  return (
    <Routes>
      {/* Rotas protegidas */}
      <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
      <Route path="/app" element={<ProtectedRoute element={<HomePage />} />} />

      <Route path="/dashboard" element={<ProtectedRoute element={<HomePage />} />}>

        <Route path="users" element={<UsersPage />}>
          <Route path="detail" element={<UsersDetailPage />} />
          <Route path="list" element={<UsersListPage />} />
        </Route>

        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />}>
          <Route path="general" element={<GeneralPage />} />
          <Route path="security" element={<SecurityPage />} />
        </Route>
        <Route path="products" element={<ProductChanges />}>
          <Route path="detail" element={<ProductDetail />} />
          <Route path="view" element={<ProductView />} />
        </Route>
      </Route>

      {/* Rotas públicas */}
      <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
      <Route path="/register" element={<PublicRoute element={<RegisterPage />} />} />
      <Route path="/forgot-password" element={<PublicRoute element={<ForgotPasswordPage />} />} />

      {/* Rota para capturar qualquer rota inválida */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function RootApp() {
  return (
    <Router>
      <AuthProvider>
        <AlertDialogProvider>
          <ToastContainer />
          <App />
        </AlertDialogProvider>,
      </AuthProvider>
    </Router>
  );
}
