import axiosInstance from './axiosInstance';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  name: string;
  secondName: string;
  password: string;
  passwordCheck: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  secondName: string;
}

class AuthService {
  // Авторизация
  async login(loginData: LoginData): Promise<User> {
    const response = await axiosInstance.post<User>('/auth/login', loginData);
    return response.data;
  }

  // Регистрация
  async register(registerData: RegisterData): Promise<User> {
    const response = await axiosInstance.post<User>('/auth/register', registerData);
    return response.data;
  }

  // Выход
  async logout(): Promise<void> {
    await axiosInstance.post('/auth/logout');
  }

  // Проверка авторизации
  async checkAuth(): Promise<User> {
    const response = await axiosInstance.get<User>('/auth/me');
    return response.data;
  }

  // Обновление токена (если нужно)
  async refreshToken(): Promise<void> {
    await axiosInstance.post('/auth/refresh');
  }
}

export const authService = new AuthService();
