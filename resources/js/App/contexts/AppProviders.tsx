import React from 'react';
import { AuthProvider } from './AuthContext';
import { ProcessoProvider } from './ProcessoContext';
import { SharedDataProvider } from './SharedDataContext';
import { DFDProvider } from './DFDContext';

interface AppProvidersProps {
    children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
    return (
        <AuthProvider>
            <ProcessoProvider>
                <SharedDataProvider>
                    {children}
                </SharedDataProvider>
            </ProcessoProvider>
        </AuthProvider>
    );
};

// Provedor específico para páginas do DFD
export const DFDPageProviders: React.FC<AppProvidersProps> = ({ children }) => {
    return (
        <AppProviders>
            <DFDProvider>
                {children}
            </DFDProvider>
        </AppProviders>
    );
}; 