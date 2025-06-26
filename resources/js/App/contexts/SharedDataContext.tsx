import React, { createContext, useContext, useState } from 'react';
import { usePage } from '@inertiajs/react';

// Dados compartilhados entre todas as espadas
interface SharedData {
    // Dados de Identificação (compartilhado)
    identificacao: {
        responsavelNome: string;
        responsavelEmail: string;
        // responsavelCargo: string; // Comentado por enquanto
        // responsavelOrgao: string; // Comentado por enquanto
        // responsavelTelefone: string; // Comentado por enquanto
    };
    
    // Dados do Objeto (compartilhado entre todas as espadas)
    objeto: {
        descricao: string;
        tipo: string;
        subtipo?: string;
        codigoCatmat?: string;
    };
    
    // Dados Financeiros (compartilhado)
    financeiro: {
        valorEstimado: number;
        naturezaDespesa: string;
        fonteRecurso: string;
        dotacaoOrcamentaria: string;
    };
    
    // Dados de Prazo (compartilhado)
    prazos: {
        prazoEntrega: string;
        prazoContratual?: string;
        prazoGarantia?: string;
    };
    
    // Dados de Unidade/Órgão (compartilhado)
    unidade: {
        id: string;
        nome: string;
        sigla: string;
        cnpj?: string;
    };
    
    // Vinculações (compartilhado)
    vinculacoes: {
        pca?: {
            consta: boolean;
            codigo: string;
            justificativa?: string;
        };
        ppa?: string;
        ldo?: string;
        loa?: string;
    };
    
    // Documentos anexados (compartilhado)
    documentos: Array<{
        id: string;
        tipo: string;
        nome: string;
        arquivo: string;
        dataUpload: Date;
        uploadadoPor: string;
        espada: number;
    }>;
    
    // Histórico de alterações (auditoria)
    historico: Array<{
        data: Date;
        usuario: string;
        acao: string;
        campo?: string;
        valorAnterior?: any;
        valorNovo?: any;
        espada: number;
    }>;
}

interface SharedDataContextData {
    sharedData: SharedData;
    updateSharedData: (data: Partial<SharedData>) => void;
    getSharedField: (path: string) => any;
    addDocumento: (doc: SharedData['documentos'][0]) => void;
    addHistorico: (entry: SharedData['historico'][0]) => void;
}

const SharedDataContext = createContext<SharedDataContextData | undefined>(undefined);

export const SharedDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { props } = usePage<any>();
    
    const [sharedData, setSharedData] = useState<SharedData>(() => {
        // Inicializar com dados do backend ou valores padrão
        return props.sharedData || {
            identificacao: {
                responsavelNome: props.auth?.user?.name || '',
                responsavelEmail: props.auth?.user?.email || '',
                // responsavelCargo: '', // Comentado por enquanto
                // responsavelOrgao: '', // Comentado por enquanto
                // responsavelTelefone: '', // Comentado por enquanto
            },
            objeto: {
                descricao: '',
                tipo: '',
                subtipo: '',
                codigoCatmat: ''
            },
            financeiro: {
                valorEstimado: 0,
                naturezaDespesa: '',
                fonteRecurso: '',
                dotacaoOrcamentaria: ''
            },
            prazos: {
                prazoEntrega: '',
                prazoContratual: '',
                prazoGarantia: ''
            },
            unidade: {
                id: props.auth?.user?.orgaoId || '',
                nome: props.auth?.user?.orgaoNome || '',
                sigla: '',
                cnpj: ''
            },
            vinculacoes: {
                pca: {
                    consta: false,
                    codigo: ''
                }
            },
            documentos: [],
            historico: []
        };
    });

    const updateSharedData = (data: Partial<SharedData>) => {
        setSharedData(prev => {
            const updated = { ...prev };
            
            // Merge profundo para objetos aninhados
            Object.keys(data).forEach(key => {
                const k = key as keyof SharedData;
                if (typeof data[k] === 'object' && !Array.isArray(data[k])) {
                    updated[k] = { ...prev[k], ...data[k] } as any;
                } else {
                    updated[k] = data[k] as any;
                }
            });
            
            return updated;
        });
    };

    const getSharedField = (path: string): any => {
        const parts = path.split('.');
        let current: any = sharedData;
        
        for (const part of parts) {
            if (current && typeof current === 'object') {
                current = current[part];
            } else {
                return undefined;
            }
        }
        
        return current;
    };

    const addDocumento = (doc: SharedData['documentos'][0]) => {
        setSharedData(prev => ({
            ...prev,
            documentos: [...prev.documentos, doc]
        }));
    };

    const addHistorico = (entry: SharedData['historico'][0]) => {
        setSharedData(prev => ({
            ...prev,
            historico: [...prev.historico, entry]
        }));
    };

    const value: SharedDataContextData = {
        sharedData,
        updateSharedData,
        getSharedField,
        addDocumento,
        addHistorico
    };

    return <SharedDataContext.Provider value={value}>{children}</SharedDataContext.Provider>;
};

export const useSharedData = () => {
    const context = useContext(SharedDataContext);
    if (!context) {
        throw new Error('useSharedData deve ser usado dentro de um SharedDataProvider');
    }
    return context;
}; 