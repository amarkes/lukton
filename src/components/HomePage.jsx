// src/components/HomePage.js

import React, { useContext } from 'react';
import AuthContext from '@/context/AuthContext';

const HomePage = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-purple-600 p-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-white text-2xl font-bold">Dashboard</div>
            </div>
            <div>
              <button
                onClick={logout}
                className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Bem-vindo ao Dashboard, {user.username}!</h1>
          <p className="mt-4 text-gray-600">Aqui você pode gerenciar suas informações e acessar funcionalidades específicas.</p>
        </div>
      </main>
    </div>
  );
}

export default HomePage;