// src/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import api from '../common/utils/axios';
import { toast } from 'react-toastify';
import store from 'store';

export const UserStore = '@UserStore';
export const TokenUser = '@TokenUser';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = store.get(TokenUser);
    if (token && token?.token) {
      api.get('/me', {
        headers: {
          Authorization: `Bearer ${token?.token}`,
        },
      })
        .then(response => {
          if (response?.data?.isStaff) {
            setUser(response.data);
          }
        })
        .catch(() => {
          store.remove(TokenUser);
          setUser(null);
        });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/login', {
        identifier: email,
        password: password,
      });
      if (response?.data?.user?.isStaff) {
        store.set(TokenUser, { token: response.data.token });
        setUser(response.data.user);
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
        return;
      }
      toast.error('Você não tem permissão para isso!');
    } catch (error) {
      console.log(error.response?.data?.errors[0])
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
  };

  return (
    <AuthContext.Provider value={{ user, login, register, forgotPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;