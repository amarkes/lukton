/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useContext } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import AuthContext from '@/context/AuthContext';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('teste@teste.com');
  const [password, setPassword] = useState('teste2');
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-stars">
      <div className="max-w-md w-full space-y-8 p-10 bg-white/10 backdrop-blur-md rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            Bem-vindo de Volta!
          </h2>
          <p className="mt-2 text-sm text-white/80">
            Insira suas credenciais para acessar sua conta.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div className="relative mb-4">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input id="email-address" name="email" type="text" autoComplete="email" required
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="pl-10 pr-3 py-2 w-full rounded-md bg-white/20 text-white placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Email" />
            </div>
            <div className="relative mb-4">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input id="password" name="password" type="password" autoComplete="current-password" required
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-3 py-2 w-full rounded-md bg-white/20 text-white placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Senha" />
            </div>
          </div>

          <div className="flex items-center justify-between text-white text-sm">
            <div>
            <Link to="/forgot-password" className="font-medium hover:underline">Esqueceu a senha?</Link>
              {/* <a href="#" onClick={() => setIsForgotPassword(true)} className="font-medium hover:underline">
                Esqueceu a senha?
              </a> */}
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              Entrar
            </button>
          </div>

          <div className="text-center text-white mt-4">
            Não tem uma conta? <Link to="/register" className="font-medium text-purple-300 hover:text-purple-400">Registre-se</Link>
            {/* <button type="button" onClick={() => setIsLogin(false)} className="font-medium text-purple-300 hover:text-purple-400">Registre-se</button> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;