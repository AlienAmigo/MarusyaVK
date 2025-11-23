// src/components/ProtectedRoute.tsx
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { Loader } from '@components/ui/Loader';

import { useAuth } from '@hooks/api/useAuth';

import { routesEnum } from '@/routes';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, checkAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Проверяем авторизацию только если не загружается и не авторизован
    if (!isAuthenticated && !isLoading) {
      checkAuth();
    }
  }, [isAuthenticated, isLoading, checkAuth]);

  if (isLoading) {
    return <Loader stretch />;
  }

  if (!isAuthenticated) {
    // Сохраняем location, чтобы вернуться после авторизации
    return <Navigate to={routesEnum.AUTH} state={{ from: location }} replace />;
  }

  return children;
};
