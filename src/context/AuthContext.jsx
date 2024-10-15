// src/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import api from '../common/utils/axios';
import { toast } from 'react-toastify';
import store from 'store';
import { useNavigate } from 'react-router-dom';

export const UserStore = '@UserStore';
export const TokenUser = '@TokenUser';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Adiciona um estado de loading
  const navigate = useNavigate();

  // Verifica o token e carrega os dados do usuário apenas se ele não estiver logado
  useEffect(() => {
    const token = store.get(TokenUser);

    // Só faz a requisição se o usuário ainda não estiver no estado
    if (token && token?.token && !user) {
      api.get('/me', {
        headers: {
          Authorization: `Bearer ${token?.token}`,
        },
      })
        .then(response => {
          if (response?.data?.data?.isStaff) {
            setUser(response?.data?.data);
          }
        })
        .catch(() => {
          store.remove(TokenUser);
          setUser(null);
          navigate('/login');
        })
        .finally(() => {
          setLoading(false); // Fim do loading após a requisição
        });
    } else {
      setLoading(false); // Caso o usuário já esteja definido, para o loading
    }
  }, []); // Adiciona 'user' como dependência

  const login = async (email, password) => {
    try {
      const response = await api.post('/login', {
        identifier: email,
        password: password,
      });
      if (response?.data?.user?.isStaff) {
        store.set(TokenUser, { token: response.data.token });
        setUser(response.data.user); // Define o usuário diretamente após o login
        navigate('/'); // Redireciona para a home após o login
        return;
      }
      toast.error('Você não tem permissão para isso!');
    } catch (error) {
      const errorMessage = error.response?.data?.errors[0]
        ? Object.values(error.response.data.errors[0])[0]
        : 'Erro ao fazer login: Verifique suas credenciais e tente novamente.';
      toast.error(errorMessage);
    }
  };

  const register = async (firstName, lastName, email, password) => {
    try {
      const response = await api.post('/register', {
        firstName,
        lastName,
        email,
        password,
      });
      if (response?.data?.isStaff) {
        store.set(TokenUser, { token: response?.data?.data?.token });
        setUser(response?.data?.data);
        navigate('/');
        return;
      }
      toast.error('Você não tem permissão para isso!');
    } catch (error) {
      const errorMessage = error.response?.data?.errors[0]
        ? error.response?.data?.errors[0]
        : 'Erro ao registrar: Verifique suas informações e tente novamente.';
      toast.error(errorMessage);
    }
  };

  const forgotPassword = async (email) => {
    try {
      await api.post('/forgot-password', { email });
      toast.success('Um e-mail de recuperação foi enviado!');
    } catch (error) {
      const errorMessage = error.response?.data?.errors[0]
        ? Object.values(error.response.data.errors[0])[0]
        : 'Erro ao solicitar recuperação de senha. Tente novamente.';
      toast.error(errorMessage);
    }
  };

  const logout = () => {
    store.clearAll();
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, forgotPassword, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
