import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks/api/useAuth';
import { Loader } from '@components/ui/Loader';
import { routesEnum } from '@/routes';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, authChecked } = useAuth();
  const location = useLocation();

  // Если проверка авторизации еще не завершена - НЕ ПЕРЕНАПРАВЛЯЕМ, ждем
  if (!authChecked) {
    return <Loader center />;
  }

  // Только после завершения проверки решаем, перенаправлять или нет
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={routesEnum.AUTH} state={{ from: location }} replace />
  );
};
