import { store } from '@/store';

// Простые хелперы для проверки авторизации
export const isAuthenticated = (): boolean => {
  const state = store.getState();
  return state.auth.isAuthenticated;
};

export const getAuthUser = () => {
  const state = store.getState();
  return state.auth.user;
};

export const isAuthLoading = (): boolean => {
  const state = store.getState();
  return state.auth.isLoading;
};
