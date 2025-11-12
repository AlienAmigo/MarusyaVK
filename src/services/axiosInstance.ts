// services/axiosInstance.ts
import axios from 'axios';
import { BASE_URL, DEFAULT_TIMEOUT } from '@config/';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  config => {
    console.log(`🚀 Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    // Можно добавить токен, метрики и т.д.
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  response => {
    console.log(`✅ Success: ${response.status} ${response.config.url}`);
    return response;
  },
  error => {
    console.log(`❌ Error: ${error.response?.status} ${error.config?.url}`);

    // Глобальная обработка ошибок
    if (error.response?.status === 401) {
      // Redirect to login
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
