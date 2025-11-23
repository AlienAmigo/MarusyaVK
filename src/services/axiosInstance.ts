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

// Текущее количество попыток рефреша токена
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor
axiosInstance.interceptors.request.use(
  config => {
    console.log(`🚀 Making ${config.method?.toUpperCase()} request to: ${config.url}`);

    // Добавляем заголовки для CORS
    if (config.method?.toUpperCase() === 'POST' || config.method?.toUpperCase() === 'PUT') {
      config.headers['Content-Type'] = 'application/json';
    }

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
  async error => {
    console.log(`❌ Error: ${error.response?.status} ${error.config?.url}`);
    console.log('Error details:', error.response?.data);

    const originalRequest = error.config;

    // Если это OPTIONS запрос и статус 204 - это нормально, пропускаем
    if (originalRequest?.method?.toUpperCase() === 'OPTIONS' && error.response?.status === 204) {
      console.log('OPTIONS preflight successful');
      return Promise.resolve({ data: {}, status: 204 });
    }

    // Если ошибка 401 и это не запрос на обновление токена
    if (error.response?.status === 401 && !originalRequest?._retry) {

      if (isRefreshing) {
        // Если уже обновляем токен, добавляем запрос в очередь
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return axiosInstance(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Попытка обновить токен
        // await authService.refreshToken();

        // После успешного обновления токена
        processQueue(null, 'new-token');
        isRefreshing = false;

        // Повторяем оригинальный запрос
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Если обновление токена не удалось
        processQueue(refreshError, null);
        isRefreshing = false;

        // Перенаправляем на страницу логина
        if (window.location.pathname !== '/auth') {
          window.location.href = '/auth';
        }
        return Promise.reject(refreshError);
      }
    }

    // Для других ошибок
    if (error.response?.status === 401) {
      // Перенаправляем на страницу логина
      if (window.location.pathname !== '/auth') {
        window.location.href = '/auth';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
