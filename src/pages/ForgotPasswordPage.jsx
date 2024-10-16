// src/components/ForgotPasswordPage.js

import React, { useState, useContext } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import AuthContext from '@/context/AuthContext';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = ({ setIsLogin, setIsForgotPassword }) => {
  const [email, setEmail] = useState('');
  const { forgotPassword } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword(email);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-stars">
      <div className="max-w-md w-full space-y-8 p-10 bg-white/10 backdrop-blur-md rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            Esqueci Minha Senha
          </h2>
          <p className="mt-2 text-sm text-white/80">
            Insira seu e-mail para receber instruções de recuperação de senha.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div className="relative mb-4">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input id="email-address" name="email" type="email" autoComplete="email" required
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="pl-10 pr-3 py-2 w-full rounded-md bg-white/20 text-white placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Email" />
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              Enviar
            </button>
          </div>

          <div className="text-center text-white mt-4">
            Lembrou sua senha? <Link to="/login" className="font-medium text-purple-300 hover:text-purple-400">Voltar para Login</Link>
             {/* <button type="button" onClick={() => { setIsForgotPassword(false); setIsLogin(true); }} className="font-medium text-purple-300 hover:text-purple-400">Voltar para Login</button> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;