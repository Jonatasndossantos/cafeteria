import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

interface ProcessoLicitatorio {
    id: string;
    numero: string;
    
    // Metadados do Processo
    orgaoId: string;
    orgaoNome: string;
    objeto: string;
    tipoObjeto: 'bem' | 'servico_comum' | 'servico_especializado' | 'obra_servico_engenharia';
    modalidade?: 'pregao' | 'concorrencia' | 'concurso' | 'leilao' | 'dialogo_competitivo' | 'dispensa' | 'inexigibilidade';
    
    // Status e Controle
    faseAtual: 'planejamento' | 'estrategia' | 'termo_referencia' | 'matriz_riscos' | 'edital' | 'contrato' | 'julgamento';
    status: 'em_andamento' | 'concluido' | 'cancelado' | 'suspenso';
    
    // Vínculos com Espadas
    espada1Id?: string; // DFD - Planejamento e Demanda
    espada2Id?: string; // ETP - Estratégia de Contratação
    espada3Id?: string; // TR - Termo de Referência
    espada4Id?: string; // Matriz de Riscos
    espada5Id?: string; // Edital
    espada6Id?: string; // Contrato
    espada7Id?: string; // Julgamento
    
    // Datas de Controle
    dataCriacao: Date;
    dataAtualizacao: Date;
    dataPrevisaoConclusao?: Date;
    dataConclusao?: Date;
    
    // Responsáveis
    responsavelId: string;
    equipeIds: string[];
    
    // Controle e Auditoria
    historicoTransicoes: {
        de: string;
        para: string;
        data: Date;
        responsavelId: string;
        observacao?: string;
    }[];
}

interface ProcessoContextData {
    processo: ProcessoLicitatorio | null;
    faseAtual: string;
    podeCriarEspada: (espada: string) => boolean;
    podeEditarEspada: (espada: string) => boolean;
    podeAvancarFase: () => boolean;
    podeRetornarFase: () => boolean;
    avancarFase: (observacao?: string) => Promise<void>;
    retornarFase: (observacao: string) => Promise<void>;
    atualizarProcesso: (dados: Partial<ProcessoLicitatorio>) => void;
}

const ProcessoContext = createContext<ProcessoContextData | undefined>(undefined);

export const ProcessoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { props } = usePage<any>();
    const [processo, setProcesso] = useState<ProcessoLicitatorio | null>(null);

    useEffect(() => {
        if (props.processo) {
            setProcesso(props.processo);
        }
    }, [props.processo]);

    const podeCriarEspada = (espada: string): boolean => {
        if (!processo) return false;
        
        // Lógica para verificar se pode criar espada baseado na fase atual
        const faseEspadaMap: Record<string, string> = {
            'espada1': 'planejamento',
            'espada2': 'estrategia',
            'espada3': 'termo_referencia',
            'espada4': 'matriz_riscos',
            'espada5': 'edital',
            'espada6': 'contrato',
            'espada7': 'julgamento'
        };
        
        return processo.faseAtual === faseEspadaMap[espada];
    };

    const podeEditarEspada = (espada: string): boolean => {
        if (!processo) return false;
        
        // Pode editar se está na fase atual ou se é admin
        return podeCriarEspada(espada) || props.auth?.user?.role === 'admin';
    };

    const podeAvancarFase = (): boolean => {
        if (!processo) return false;
        
        // Verificar se a espada atual está completa
        const espadaAtualCompleta = processo.status === 'em_andamento' && 
                                   processo.faseAtual !== 'julgamento';
        
        return espadaAtualCompleta;
    };

    const podeRetornarFase = (): boolean => {
        if (!processo) return false;
        
        return processo.faseAtual !== 'planejamento' && 
               props.auth?.user?.role === 'admin';
    };

    const avancarFase = async (observacao?: string) => {
        // Implementar chamada à API para avançar fase
        console.log('Avançando fase', observacao);
    };

    const retornarFase = async (observacao: string) => {
        // Implementar chamada à API para retornar fase
        console.log('Retornando fase', observacao);
    };

    const atualizarProcesso = (dados: Partial<ProcessoLicitatorio>) => {
        setProcesso(prev => prev ? { ...prev, ...dados } : null);
    };

    const value: ProcessoContextData = {
        processo,
        faseAtual: processo?.faseAtual || 'planejamento',
        podeCriarEspada,
        podeEditarEspada,
        podeAvancarFase,
        podeRetornarFase,
        avancarFase,
        retornarFase,
        atualizarProcesso
    };

    return <ProcessoContext.Provider value={value}>{children}</ProcessoContext.Provider>;
};

export const useProcesso = () => {
    const context = useContext(ProcessoContext);
    if (!context) {
        throw new Error('useProcesso deve ser usado dentro de um ProcessoProvider');
    }
    return context;
}; 