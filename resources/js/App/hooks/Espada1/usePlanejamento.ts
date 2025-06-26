import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

export interface Planejamento {
    objeto: {
        objetoContratacao: string;
        tipoObjeto: string;
    };
    detalhamento: {
        justificativaTecnica: string;
        beneficiosEsperados: string;
        riscosIdentificados: string;
        alternativasAnalisadas: string;
        mesEstimado: string;
        grauImportancia: string;
        historicoConsumo: string;
        criteriosSustentabilidade: boolean;
        detalheSustentabilidade: string;
        normasTecnicas: string;
    };
    vinculacoes: {
        [key: string]: string;
    };
}

// Estado global compartilhado
let globalPlanejamentoState: Planejamento | null = null;
let listeners: Array<(state: Planejamento) => void> = [];

// Função para notificar listeners
const notifyListeners = (newState: Planejamento) => {
    listeners.forEach(listener => listener(newState));
};

// Função para inicializar o estado global
const initializeGlobalState = (initialData: any) => {
    if (globalPlanejamentoState === null) {
        const metadata = initialData?.metadata;
        globalPlanejamentoState = (metadata && typeof metadata === 'object') ? metadata : {
            objeto: {
                objetoContratacao: '',
                tipoObjeto: '',
            },
            detalhamento: {
                justificativaTecnica: '',
                beneficiosEsperados: '',
                riscosIdentificados: '',
                alternativasAnalisadas: '',
                mesEstimado: '',
                grauImportancia: '',
                historicoConsumo: '',
                criteriosSustentabilidade: false,
                detalheSustentabilidade: '',
                normasTecnicas: '',
            },
            vinculacoes: {},
        };
    }
    return globalPlanejamentoState;
};

export function usePlanejamento() {
    const { props } = usePage();
    const document = (props as any).document;

    // Inicializa o estado global se necessário
    const initialState = initializeGlobalState(document);

    // Estado local para re-render
    const [localState, setLocalState] = useState<Planejamento>(initialState!);

    useEffect(() => {
        // Registra listener para atualizações
        const listener = (newState: Planejamento) => {
            setLocalState({ ...newState });
        };

        listeners.push(listener);

        // Cleanup
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    }, []);

    // Função para atualizar dados completos do planejamento
    const updateData = (newData: Partial<Planejamento>) => {
        if (globalPlanejamentoState) {
            globalPlanejamentoState = {
                ...globalPlanejamentoState,
                ...newData
            };
            notifyListeners(globalPlanejamentoState);
        }
    };

    // Função para atualizar um campo específico usando path notation
    const updateField = (path: string, value: any) => {
        if (globalPlanejamentoState) {
            const keys = path.split('.');
            const updatedData = { ...globalPlanejamentoState };
            let current: any = updatedData;

            // Navega até o penúltimo nível criando cópias
            for (let i = 0; i < keys.length - 1; i++) {
                if (current[keys[i]] === undefined) {
                    current[keys[i]] = {};
                } else {
                    current[keys[i]] = { ...current[keys[i]] };
                }
                current = current[keys[i]];
            }

            // Atualiza o valor final
            current[keys[keys.length - 1]] = value;

            globalPlanejamentoState = updatedData;
            notifyListeners(globalPlanejamentoState);
        }
    };

    // Função para obter dados atuais
    const getCurrentData = () => {
        return globalPlanejamentoState ? { ...globalPlanejamentoState } : null;
    };

    return {
        data: localState,
        isLoading: false,
        updateData,
        updateField,
        getCurrentData,
    };
}
