import axiosInstance from './axiosInstance';

import { AUTH_LOGIN_URL, AUTH_LOGOUT_URL, USER_CREATE_URL, PROFILE_URL } from '@/config';

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
  id: number;
  email: string;
  name: string;
  secondName: string;
}

export const authService = {
  async login(loginData: LoginData): Promise<User> {
    const response = await axiosInstance.post(AUTH_LOGIN_URL, loginData, {
      // Явно указываем, что это не preflight
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
    await axiosInstance.post(AUTH_LOGOUT_URL);
  },

  async checkAuth(): Promise<User> {
    const response = await axiosInstance.get(PROFILE_URL);
    return response.data;
  },
};
