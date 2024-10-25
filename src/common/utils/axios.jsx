// src/utils/axios.js
import axios from 'axios';
import { APP_CONSTANTS } from './variables';
import store from 'store';
import {TokenUser} from '@/context/AuthContext';

// Cria uma instância do axios com a base URL definida
const api = axios.create({
  baseURL: APP_CONSTANTS.apiUrl, // Defina a base URL aqui
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  headers: {
    'Content-Type': 'application/json'
  },

});

api.interceptors.request.use(config => {
  const token = store.get(TokenUser);
  if (token && token?.token) {
      config.headers.Authorization = `Bearer ${token?.token}`;
  }
  return config;
});


export default api;
