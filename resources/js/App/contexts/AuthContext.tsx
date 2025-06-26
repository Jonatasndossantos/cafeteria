import React, { createContext, useContext } from 'react';
import { usePage } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
    cpf?: string;
    role: 'admin' | 'gestor' | 'servidor' | 'visualizador';
    cargo?: string;
    orgaoId?: string;
    orgaoNome?: string;
    permissions?: string[];
}

interface AuthContextData {
    user: User | null;
    isAuthenticated: boolean;
    hasPermission: (permission: string) => boolean;
    hasRole: (role: string) => boolean;
    canAccessEspada: (espada: number) => boolean;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { props } = usePage<any>();
    const user = props.auth?.user || null;

    const hasPermission = (permission: string): boolean => {
        if (!user) return false;
        return user.permissions?.includes(permission) || false;
    };

    const hasRole = (role: string): boolean => {
        if (!user) return false;
        return user.role === role;
    };

    const canAccessEspada = (espada: number): boolean => {
        if (!user) return false;
        
        // Admin pode acessar tudo
        if (user.role === 'admin') return true;
        
        // Lógica específica por espada
        const permissionMap: Record<number, string> = {
            1: 'dfd.access',      // Espada 1 - DFD
            2: 'etp.access',      // Espada 2 - ETP
            3: 'tr.access',       // Espada 3 - TR
            4: 'matriz.access',   // Espada 4 - Matriz de Riscos
            5: 'edital.access',   // Espada 5 - Edital
            6: 'contrato.access', // Espada 6 - Contrato
            7: 'julgamento.access' // Espada 7 - Julgamento
        };
        
        return hasPermission(permissionMap[espada]);
    };

    const value: AuthContextData = {
        user,
        isAuthenticated: !!user,
        hasPermission,
        hasRole,
        canAccessEspada
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}; 