import axiosInstance from './axiosInstance';
import { AUTH_LOGIN_URL, AUTH_LOGOUT_URL, USER_CREATE_URL, PROFILE_URL } from '@config';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  name: string;
  surname: string;
  password: string;
  passwordCheck: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  surname: string;
  favorites: number[];
}

export const authService = {
  async login(loginData: LoginData): Promise<User> {
    const response = await axiosInstance.post(AUTH_LOGIN_URL, loginData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },

  async register(registerData: RegisterData): Promise<User> {
    const response = await axiosInstance.post(USER_CREATE_URL, registerData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },

  async logout(): Promise<void> {
    await axiosInstance.get(AUTH_LOGOUT_URL);
  },

  async checkAuth(): Promise<User | null> {
    try {
      const response = await axiosInstance.get(PROFILE_URL);
      return response.data;
    } catch (error) {
      // Не логируем как ошибку, это нормальная ситуация для неавторизованного пользователя
      console.log('User is not authenticated - silent check');
      return null;
    }
  },
};
