import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useCallback } from 'react';

// Tipos para os dados do formulário
export interface FormData {
  id?: number; // ID opcional para documentos existentes
  objeto: {
    objetoContratacao: string;
    tipoObjeto: string;
    subcategoriaTecnica: string;
    codigoCatmat: string;
  };
  itens: Array<{
    id: number;
    descricao: string;
    catmat: string;
    unidade: string;
    quantidade: number;
    valorUnitario: number;
    valorTotal: number;
  }>;
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
  compartilhamento: {
    podeCompartilhar: boolean;
    outrasUnidades: string[];
    justificativaCompartilhamento: string;
  };
  vinculacoes: {
    ppa: string;
    ldo: string;
    loa: string;
  };
  pca: {
    items: Array<{
      id: number;
      descricao: string;
      codigo: string;
      valorPrevisto: number;
      periodo: string;
      compatibilidade: number;
    }>;
    selectedItems: Array<{
      id: number;
      descricao: string;
      codigo: string;
      valorPrevisto: number;
      periodo: string;
    }>;
  };
  duplicidade: {
    demandasSimilares: Array<{
      id: number;
      descricao: string;
      unidade: string;
      similaridade: number;
      status: string;
      data: string;
    }>;
    analiseCompleta: boolean;
  };
  demandasCorrelatas: {
    vinculacaoOutrasDemandas: boolean;
    justificativaVinculacao: string;
    impactosEsperados: string;
    riscosPreliminares: string;
  };
  dfd: {
    orgaoRequisitante: string;
    numero: string;
    dataCriacao: string;
    justificativa: string;
    fontePesquisa: string;
    pcaItemId: string;
    responsavelAprovacao: string;
    cargoResponsavel: string;
    matriculaResponsavel: string;
    justificativaPca: string;
    requisitosTecnicos: string;
    dataPretendida: string;
    grauPrioridade: string;
    justificativaPrioridade: string;
    vinculacaoOutrasDemandas: boolean;
    descricaoVinculacao: string;
    programa: string;
    acao: string;
    elementoDespesa: string;
    fonteRecursos: string;
    mapaCotacao: string;
    destinatario: string;
    observacoesEncaminhamento: string;
    impactosEsperados: string;
    riscosPreliminares: string;
    responsavelNome: string;
    responsavelCargo: string;
    responsavelMatricula: string;
    modalidadeLicitacao: string;
    tipoLicitacao: string;
    criterioJulgamento: string;
    regimeExecucao: string;
    prazoEntrega: string;
    localEntrega: string;
  };
}

// Dados iniciais vazios
const initialData: FormData = {
  objeto: {
    objetoContratacao: '',
    tipoObjeto: '',
    subcategoriaTecnica: '',
    codigoCatmat: ''
  },
  itens: [],
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
    normasTecnicas: ''
  },
  compartilhamento: {
    podeCompartilhar: false,
    outrasUnidades: [],
    justificativaCompartilhamento: ''
  },
  vinculacoes: {
    ppa: '',
    ldo: '',
    loa: ''
  },
  pca: {
    items: [],
    selectedItems: []
  },
  duplicidade: {
    demandasSimilares: [],
    analiseCompleta: false
  },
  demandasCorrelatas: {
    vinculacaoOutrasDemandas: false,
    justificativaVinculacao: '',
    impactosEsperados: '',
    riscosPreliminares: ''
  },
  dfd: {
    orgaoRequisitante: '',
    numero: '',
    dataCriacao: '',
    justificativa: '',
    fontePesquisa: '',
    pcaItemId: '',
    responsavelAprovacao: '',
    cargoResponsavel: '',
    matriculaResponsavel: '',
    justificativaPca: '',
    requisitosTecnicos: '',
    dataPretendida: '',
    grauPrioridade: '',
    justificativaPrioridade: '',
    vinculacaoOutrasDemandas: false,
    descricaoVinculacao: '',
    programa: '',
    acao: '',
    elementoDespesa: '',
    fonteRecursos: '',
    mapaCotacao: '',
    destinatario: '',
    observacoesEncaminhamento: '',
    impactosEsperados: '',
    riscosPreliminares: '',
    responsavelNome: '',
    responsavelCargo: '',
    responsavelMatricula: '',
    modalidadeLicitacao: '',
    tipoLicitacao: '',
    criterioJulgamento: '',
    regimeExecucao: '',
    prazoEntrega: '',
    localEntrega: ''
  }
};

// Função para salvar os dados do formulário
const saveFormData = async (data: FormData): Promise<FormData> => {
  // TODO: Implementar a lógica de salvamento real
  return data;
};

// Função para buscar os dados do formulário
const fetchFormData = async (): Promise<FormData> => {
  // TODO: Implementar a lógica de busca real
  return initialData;
};

export function useFormData() {
  const [localFormData, setLocalFormData] = useState<FormData>(initialData);
  const queryClient = useQueryClient();

  // Query para buscar os dados do formulário
  const { data: serverFormData } = useQuery({
    queryKey: ['formData'],
    queryFn: fetchFormData,
    initialData: initialData
  });

  // Mutation para salvar os dados do formulário
  const saveMutation = useMutation({
    mutationFn: saveFormData,
    onSuccess: (data) => {
      queryClient.setQueryData(['formData'], data);
    }
  });

  // Função para atualizar um campo específico
  const updateField = useCallback((path: string, value: any) => {
    setLocalFormData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current: any = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!(keys[i] in current)) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return newData;
    });
  }, []);

  // Função para atualizar múltiplos campos
  const updateMultipleFields = useCallback((updates: Partial<FormData>) => {
    setLocalFormData(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  // Função para obter o valor de um campo específico
  const getFieldValue = useCallback((path: string): any => {
    const keys = path.split('.');
    let current: any = localFormData;

    for (const key of keys) {
      if (current === undefined || current === null) {
        return undefined;
      }
      current = current[key];
    }

    return current;
  }, [localFormData]);

  // Função para adicionar um item a uma lista
  const addItem = useCallback((item: any) => {
    setLocalFormData(prev => ({
      ...prev,
      itens: [...prev.itens, item]
    }));
  }, []);

  // Função para remover um item de uma lista
  const removeItem = useCallback((itemId: number) => {
    setLocalFormData(prev => ({
      ...prev,
      itens: prev.itens.filter(item => item.id !== itemId)
    }));
  }, []);

  // Função para atualizar um item em uma lista
  const updateItem = useCallback((itemId: number, updates: any) => {
    setLocalFormData(prev => ({
      ...prev,
      itens: prev.itens.map(item =>
        item.id === itemId ? { ...item, ...updates } : item
      )
    }));
  }, []);

  // Função para calcular o valor total
  const getTotalValue = useCallback((): number => {
    return localFormData.itens.reduce((total, item) => total + item.valorTotal, 0);
  }, [localFormData.itens]);

  return {
    formData: localFormData,
    updateField,
    updateMultipleFields,
    getFieldValue,
    addItem,
    removeItem,
    updateItem,
    getTotalValue,
    saveFormData: saveMutation.mutateAsync
  };
}
