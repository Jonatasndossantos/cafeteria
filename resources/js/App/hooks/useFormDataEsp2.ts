import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockFormData, simulateApiCall } from './mockDataEsp2';

// Definindo tipos para os dados
type Fonte = {
  id: number;
  fonte: string;
  tipo: string;
  data: string;
  valor: number;
  comprovante: string;
};

type Estatisticas = {
  media: number;
  mediana: number;
  coeficienteVariacao: number;
  valorEstimadoFinal: number;
};

type UploadedFile = {
  name: string;
  size: number;
};

type PesquisaData = {
  metodologia: string;
  fontes: Fonte[];
  estatisticas: Estatisticas;
  uploadedFiles: UploadedFile[];
};

type RotaData = {
  rotaSelecionada: string;
  sugestaoLux: {
    justificativa: string;
  };
  pregao: {
    tipo: string;
    criterio: string;
    modoDisputa: string;
  };
  regimeExecucao: {
    regime: string;
    utilizarSRP: boolean;
    tipoSRP?: string;
    vigenciaSRP?: number;
    justificativa?: string;
  };
  viabilidade: {
    tecnica: string;
    economica: string;
    justificativa: string;
  };
  cronograma: {
    dataInicio: string;
    dataTermino: string;
    prazoExecucao: number;
    observacoes: string;
  };
};

type ETPBlock = {
  descricaoNecessidade?: string;
  sugestaoLux?: boolean;
  previsaoContratacao?: string;
  herdadoPlanejamento?: boolean;
  requisitosContratacao?: string;
  herdado?: boolean;
  objetivosResultados?: string;
  levantamentoMercado?: string;
  descricaoSolucao?: string;
  justificativaParcelamento?: string;
  estimativaQuantidades?: string;
  estimativaPrecos?: string;
  analiseCustoBeneficio?: string;
  analiseRiscos?: string;
  providenciasPrevias?: string;
  contratacoesCorrelatas?: string;
  impactosAmbientais?: string;
  declaracaoViabilidade?: string;
  responsabilidade?: string;
  memoriaCalculo?: string;
  metodologiaEstimativa?: string;
  [key: string]: any;
};

export type ETPData = {
  campo1: ETPBlock;
  campo2: ETPBlock;
  campo3: ETPBlock;
  campo4: ETPBlock;
  campo5: ETPBlock;
  campo6: ETPBlock;
  campo7: ETPBlock;
  campo8: ETPBlock;
  campo9: ETPBlock;
  campo10: ETPBlock;
  campo11: ETPBlock;
  campo12: ETPBlock;
  campo13: ETPBlock;
  campo14: ETPBlock;
  campo15: ETPBlock;
};

type IdentificacaoData = {
  numeroETP: string;
  numeroDFD: string;
  objeto: string;
  fundamentacaoLegal: string;
  responsavelElaboracao: string;
};

type FormData = {
  identificacao: IdentificacaoData;
  pesquisa: PesquisaData;
  rota: RotaData;
  etp: ETPData;
};

// Hook principal para gerenciar todos os dados do formulário
export function useFormData() {
  const queryClient = useQueryClient();

  // Query para buscar dados do formulário
  const { data, isLoading, error } = useQuery<FormData, Error>({
    queryKey: ['formData'],
    queryFn: async () => {
      const result = await simulateApiCall(mockFormData);
      return result as unknown as FormData;
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  // Mutation para atualizar dados
  const updateDataMutation = useMutation<FormData, Error, Partial<FormData>>({
    mutationFn: async (newData) => {
      const result = await simulateApiCall({ ...data, ...newData });
      return result as unknown as FormData;
    },
    onSuccess: (updatedData) => {
      queryClient.setQueryData(['formData'], updatedData);
    },
  });

  // Função para atualizar dados específicos
  const updateData = (section: keyof FormData, newData: Partial<FormData[keyof FormData]>) => {
    if (!data) return;
    const updatedFormData = {
      ...data,
      [section]: { ...data[section], ...newData }
    };
    updateDataMutation.mutate(updatedFormData);
  };

  // Função para atualizar campo específico dentro de uma seção
  const updateField = <T extends keyof FormData>(
    section: T,
    field: keyof FormData[T],
    value: FormData[T][keyof FormData[T]]
  ) => {
    if (!data) return;
    const updatedFormData = {
      ...data,
      [section]: {
        ...data[section],
        [field]: value
      }
    };
    updateDataMutation.mutate(updatedFormData);
  };

  return {
    data: data || mockFormData,
    isLoading,
    error,
    updateData,
    updateField,
    isUpdating: updateDataMutation.isPending,
  };
}

// Hook específico para dados da aba Pesquisa
export function usePesquisaData() {
  const { data, updateData, updateField, isLoading, isUpdating } = useFormData();
  
  const pesquisaData = data?.pesquisa || mockFormData.pesquisa;

  const updatePesquisa = (newData: Partial<PesquisaData>) => updateData('pesquisa', newData);
  const updatePesquisaField = (field: keyof PesquisaData, value: PesquisaData[keyof PesquisaData]) => 
    updateField('pesquisa', field, value);

  // Função para adicionar nova fonte
  const addFonte = (fonte: Omit<Fonte, 'id'>) => {
    const newFontes = [...pesquisaData.fontes, { ...fonte, id: Date.now() }];
    updatePesquisaField('fontes', newFontes);
  };

  // Função para remover fonte
  const removeFonte = (id: number) => {
    const newFontes = pesquisaData.fontes.filter((f: Fonte) => f.id !== id);
    updatePesquisaField('fontes', newFontes);
  };

  // Função para adicionar arquivo
  const addFile = (file: UploadedFile) => {
    const newFiles = [...pesquisaData.uploadedFiles, file];
    updatePesquisaField('uploadedFiles', newFiles);
  };

  // Função para remover arquivo
  const removeFile = (index: number) => {
    const newFiles = pesquisaData.uploadedFiles.filter((_: UploadedFile, i: number) => i !== index);
    updatePesquisaField('uploadedFiles', newFiles);
  };

  return {
    ...pesquisaData,
    updatePesquisa,
    updatePesquisaField,
    addFonte,
    removeFonte,
    addFile,
    removeFile,
    isLoading,
    isUpdating,
  };
}

// Hook específico para dados da aba Rota
export function useRotaData() {
  const { data, updateData, updateField, isLoading, isUpdating } = useFormData();
  
  const rotaData = data?.rota || mockFormData.rota;

  const updateRota = (newData: Partial<RotaData>) => updateData('rota', newData);
  const updateRotaField = (field: keyof RotaData, value: RotaData[keyof RotaData]) => 
    updateField('rota', field, value);

  return {
    ...rotaData,
    updateRota,
    updateRotaField,
    isLoading,
    isUpdating,
  };
}

// Hook específico para dados da aba ETP
export function useETPData() {
  const { data, updateData, updateField, isLoading, isUpdating } = useFormData();
  
  const etpData = data?.etp || mockFormData.etp;
  const identificacao = data?.identificacao || mockFormData.identificacao;
  const pesquisaData = data?.pesquisa || mockFormData.pesquisa;

  const updateETP = (newData: Partial<ETPData>) => updateData('etp', newData);
  const updateETPField = (field: keyof ETPData, value: ETPData[keyof ETPData]) => 
    updateField('etp', field, value);

  // Função para atualizar campo específico dentro de um bloco
  const updateETPSubField = (block: keyof ETPData, field: keyof ETPBlock, value: any) => {
    if (!etpData || !(block in etpData)) return;
    const updatedBlock = {
      ...etpData[block as keyof typeof etpData],
      [field]: value
    };
    updateETPField(block, updatedBlock);
  };

  return {
    ...etpData,
    identificacao,
    pesquisaData,
    updateETP,
    updateETPField,
    updateETPSubField,
    isLoading,
    isUpdating,
  };
}

// Hook para dados gerais/identificação
export function useIdentificacaoData() {
  const { data, updateField, isLoading } = useFormData();
  
  const identificacao = data?.identificacao || mockFormData.identificacao;

  const updateIdentificacao = (field: keyof IdentificacaoData, value: IdentificacaoData[keyof IdentificacaoData]) => 
    updateField('identificacao', field, value);

  return {
    ...identificacao,
    updateIdentificacao,
    isLoading,
  };
}
