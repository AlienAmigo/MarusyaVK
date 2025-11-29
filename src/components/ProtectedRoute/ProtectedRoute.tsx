import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks/api/useAuth';
import { Loader } from '@components/ui/Loader';
import { routesEnum } from '@/routes';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, authChecked } = useAuth();
  const location = useLocation();

  if (!authChecked) {
    return <Loader center />;
  }

  if (!isAuthenticated) {
    // Перенаправляем на страницу авторизации, сохраняя текущий путь для возврата
    return <Navigate to={routesEnum.AUTH} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
