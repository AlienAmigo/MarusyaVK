import React, { useEffect } from 'react';
import { useAuth } from '@hooks/api/useAuth';

interface AuthInitializerProps {
    children: React.ReactNode;
}

export const AuthInitializer: React.FC<AuthInitializerProps> = ({ children }) => {
    const { checkAuth } = useAuth();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return <>{children}</>;
};
