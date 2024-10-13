import React, { useContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import LoginPage from '@/components/LoginPage';
import RegisterPage from '@/components/RegisterPage';
import ForgotPasswordPage from '@/components/ForgotPasswordPage';
import HomePage from '@/components/HomePage';
import AuthContext, { AuthProvider } from '@/context/AuthContext';
import './index.css';

function App() {
  const { user } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  return (
    <div>
      <ToastContainer />
      {user ? (
        <HomePage />
      ) : isForgotPassword ? (
        <ForgotPasswordPage setIsLogin={setIsLogin} setIsForgotPassword={setIsForgotPassword} />
      ) : (
        isLogin ? (
          <LoginPage setIsLogin={setIsLogin} setIsForgotPassword={setIsForgotPassword} />
        ) : (
          <RegisterPage setIsLogin={setIsLogin} />
        )
      )}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}