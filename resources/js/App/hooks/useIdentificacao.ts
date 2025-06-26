import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usePage } from '@inertiajs/react';

interface IdentificacaoData {
    unidadeIniciadora: string;
    responsavelNome: string;
    responsavelCargo: string;
    responsavelSetor: string;
    descricaoNecessidade: string;
    statusPlanejamento: string;
}

// Initial data for identificacao
const initialIdentificacaoData: IdentificacaoData = {
    unidadeIniciadora: '',
    responsavelNome: '',
    responsavelCargo: '',
    responsavelSetor: '',
    descricaoNecessidade: '',
    statusPlanejamento: ''
};

// Simula API call para salvar dados
const saveIdentificacaoData = async (data: IdentificacaoData): Promise<IdentificacaoData> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log('Dados de identificação salvos:', data);
    return data;
};

export function useIdentificacao() {
    const { props } = usePage<{ exampleData?: { identificacao: IdentificacaoData }, unidadesOptions?: { value: string, label: string }[] }>();
    const queryClient = useQueryClient();

    // Query para buscar dados de identificação
    const { data: identificacaoData, isLoading, error } = useQuery({
        queryKey: ['identificacao'],
        queryFn: () => Promise.resolve(props.exampleData?.identificacao || initialIdentificacaoData),
        initialData: props.exampleData?.identificacao || initialIdentificacaoData,
        staleTime: 1000 * 60 * 5, // 5 minutos
    });

    // Mutation para salvar dados
    const saveMutation = useMutation({
        mutationFn: saveIdentificacaoData,
        onSuccess: (savedData) => {
            queryClient.setQueryData(['identificacao'], savedData);
        },
    });

    // Função para atualizar campos específicos
    const updateField = (field: keyof IdentificacaoData, value: string) => {
        if (!identificacaoData) return;

        const updatedData = {
            ...identificacaoData,
            [field]: value
        };

        // Atualiza o cache imediatamente
        queryClient.setQueryData(['identificacao'], updatedData);

        // Salva automaticamente
        saveMutation.mutate(updatedData);
    };

    // Função para obter valor de um campo específico
    const getFieldValue = (field: keyof IdentificacaoData): string => {
        return identificacaoData?.[field] || '';
    };

    return {
        identificacaoData,
        isLoading,
        error,
        isSaving: saveMutation.isPending,
        updateField,
        getFieldValue,
        UNIDADES_OPTIONS: props.unidadesOptions || [],
        saveIdentificacaoData: () => identificacaoData && saveMutation.mutate(identificacaoData),
    };
} 