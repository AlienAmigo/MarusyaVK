import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { login, register, logout, checkAuth, clearError } from '@store/slices/authSlice';
import type { LoginData, RegisterData } from '@services/authService';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);

  const handleLogin = useCallback((loginData: LoginData) => {
    return dispatch(login(loginData));
  }, [dispatch]);

  const handleRegister = useCallback((registerData: RegisterData) => {
    return dispatch(register(registerData));
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    return dispatch(logout());
  }, [dispatch]);

  const handleCheckAuth = useCallback(() => {
    return dispatch(checkAuth());
  }, [dispatch]);

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    ...authState,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    checkAuth: handleCheckAuth,
    clearError: handleClearError,
  };
};
