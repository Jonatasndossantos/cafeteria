import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { useProcesso } from './ProcessoContext';
import { useAuth } from './AuthContext';

// Tipos específicos do DFD (Espada 1)
interface DFDData {
    id?: string;
    processoId: string;
    numero: string;
    
    // Identificação
    unidadeRequisitante: string;
    dataAbertura: string;
    responsavel: string;
    
    // Objeto e Justificativa
    objeto: string;
    descricaoDetalhada: string;
    justificativa: string;
    objetivoContratacao: string;
    beneficiosEsperados: string;
    tipoObjeto: string;
    codigoCatmat: string;
    
    // Quantitativos
    itens: Array<{
        id: string;
        descricao: string;
        catmat: string;
        unidade: string;
        quantidade: number;
        valorUnitario: number;
        valorTotal: number;
    }>;
    valorTotalEstimado: number;
    
    // Requisitos e Prazos
    prazoEntrega: string;
    localEntrega: string;
    condicoesRecebimento: string;
    garantia: string;
    criteriosAceitacao: string;
    
    // Vinculações
    vinculacaoPCA: {
        consta: boolean;
        codigo: string;
        justificativa?: string;
    };
    vinculacaoOrcamentaria: {
        classificacaoOrcamentaria: string;
        naturezaDespesa: string;
        fonteRecurso: string;
        programaTrabalho: string;
    };
    
    // Responsáveis
    responsavelDemanda: string;
    cargoResponsavel: string;
    emailResponsavel: string;
    telefoneResponsavel: string;
    
    // Anexos
    anexos: Array<{
        id: string;
        nome: string;
        tipo: string;
        tamanho: number;
        url: string;
        dataUpload: Date;
    }>;
    
    // Encaminhamento
    encaminhamento: {
        destinatario: string;
        prioridade: 'baixa' | 'media' | 'alta' | 'urgente';
        observacoes: string;
    };
    
    // Validação IA
    validacaoIA?: {
        status: 'pendente' | 'validado' | 'rejeitado';
        analise: string;
        sugestoes: string[];
        pontuacao: number;
    };
    
    // Status
    status: 'rascunho' | 'em_elaboracao' | 'aguardando_aprovacao' | 'aprovado' | 'formalizado';
    
    // Metadados
    criadoEm: Date;
    atualizadoEm: Date;
    formalizadoEm?: Date;
}

interface DFDContextData {
    dfd: DFDData | null;
    isLoading: boolean;
    error: string | null;
    canEdit: boolean;
    saveDFD: (data: Partial<DFDData>) => Promise<void>;
    updateDFD: (data: Partial<DFDData>) => void;
    formalizeDFD: () => Promise<void>;
    validateWithIA: () => Promise<void>;
}

const DFDContext = createContext<DFDContextData | undefined>(undefined);

export const DFDProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { props } = usePage<any>();
    const { processo } = useProcesso();
    const { user } = useAuth();
    
    const [dfd, setDfd] = useState<DFDData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (props.dfd) {
            setDfd(props.dfd);
        } else if (processo) {
            // Inicializar DFD com dados do processo
            setDfd({
                processoId: processo.id,
                numero: '',
                unidadeRequisitante: processo.orgaoNome,
                dataAbertura: new Date().toISOString().split('T')[0],
                responsavel: user?.name || '',
                objeto: processo.objeto,
                descricaoDetalhada: '',
                justificativa: '',
                objetivoContratacao: '',
                beneficiosEsperados: '',
                tipoObjeto: processo.tipoObjeto,
                codigoCatmat: '',
                itens: [],
                valorTotalEstimado: 0,
                prazoEntrega: '',
                localEntrega: '',
                condicoesRecebimento: '',
                garantia: '',
                criteriosAceitacao: '',
                vinculacaoPCA: { consta: false, codigo: '' },
                vinculacaoOrcamentaria: {
                    classificacaoOrcamentaria: '',
                    naturezaDespesa: '',
                    fonteRecurso: '',
                    programaTrabalho: ''
                },
                responsavelDemanda: user?.name || '',
                cargoResponsavel: user?.cargo || '',
                emailResponsavel: user?.email || '',
                telefoneResponsavel: '',
                anexos: [],
                encaminhamento: {
                    destinatario: '',
                    prioridade: 'media',
                    observacoes: ''
                },
                status: 'rascunho',
                criadoEm: new Date(),
                atualizadoEm: new Date()
            });
        }
    }, [props.dfd, processo, user]);

    const canEdit = dfd?.status !== 'formalizado' && 
                    processo?.faseAtual === 'planejamento';

    const saveDFD = async (data: Partial<DFDData>) => {
        setIsLoading(true);
        setError(null);
        try {
            // Implementar chamada à API
            console.log('Salvando DFD', data);
            setDfd(prev => prev ? { ...prev, ...data } : null);
        } catch (err) {
            setError('Erro ao salvar DFD');
        } finally {
            setIsLoading(false);
        }
    };

    const updateDFD = (data: Partial<DFDData>) => {
        setDfd(prev => prev ? { ...prev, ...data } : null);
    };

    const formalizeDFD = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Implementar chamada à API para formalizar
            console.log('Formalizando DFD');
            setDfd(prev => prev ? { 
                ...prev, 
                status: 'formalizado',
                formalizadoEm: new Date()
            } : null);
        } catch (err) {
            setError('Erro ao formalizar DFD');
        } finally {
            setIsLoading(false);
        }
    };

    const validateWithIA = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Implementar chamada à API de validação IA
            console.log('Validando com IA');
        } catch (err) {
            setError('Erro ao validar com IA');
        } finally {
            setIsLoading(false);
        }
    };

    const value: DFDContextData = {
        dfd,
        isLoading,
        error,
        canEdit,
        saveDFD,
        updateDFD,
        formalizeDFD,
        validateWithIA
    };

    return <DFDContext.Provider value={value}>{children}</DFDContext.Provider>;
};

export const useDFD = () => {
    const context = useContext(DFDContext);
    if (!context) {
        throw new Error('useDFD deve ser usado dentro de um DFDProvider');
    }
    return context;
}; 