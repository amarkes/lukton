// src/utils/axios.js
import axios from 'axios';
import { APP_CONSTANTS } from './variables';

// Cria uma instância do axios com a base URL definida
const api = axios.create({
  baseURL: APP_CONSTANTS.apiUrl, // Defina a base URL aqui
});

export default api;
