import React, { useEffect } from 'react';
import { useAuth } from '@hooks/api/useAuth';
import { Loader } from '@components/ui/Loader';

interface AuthInitializerProps {
  children: React.ReactNode;
}

export const AuthInitializer: React.FC<AuthInitializerProps> = ({ children }) => {
  const { checkAuth, authChecked } = useAuth();

  useEffect(() => {
    if (!authChecked) {
      checkAuth();
    }
  }, [checkAuth, authChecked]);

  if (!authChecked) {
    return <Loader center />;
  }

  return <>{children}</>;
};
