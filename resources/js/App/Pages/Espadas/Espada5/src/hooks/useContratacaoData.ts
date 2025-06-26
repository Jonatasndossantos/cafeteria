import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface ContratacaoData {
  // Seção 1 - Identificação
  numeroProcesso: string;
  dataProcesso: string;
  unidadeDemandante: string;
  responsavelTecnico: string;
  tipoContratacao: 'inexigibilidade' | 'dispensa';
  tipoContratacaoFundamento: string;
  tipoObjeto: string;
  valorEstimado: number;
  modalidadeExecucao: string;
  
  // Dados herdados do processo licitatório
  identificacaoProcesso?: {
    numeroEdital: string;
    matrizRiscos: string;
    termoReferencia: string;
    objeto: string;
  };
  
  // Campos específicos para Inexigibilidade
  justificativaInviabilidade?: string;
  comprovacaoEnquadramento?: File | null;
  
  // Campos específicos para Dispensa
  justificativaDispensa?: string;
  documentacaoDispensa?: File | null;
  
  // Seção 2 - Dados do Objeto
  descricaoObjeto: string;
  fundamentacaoTecnica: string;
  localEntrega: string;
  prazoEstimado: string;
  unidadePrazo: 'horas' | 'dias' | 'meses' | 'anos';
  
  // Seção 2 - Fundamentação
  justificativaContratacao: string;
  razaoEscolhaFornecedor: string;
  
  // Seção 3 - Dados da Empresa
  nomeEmpresa: string;
  cnpjEmpresa: string;
  representanteLegal: string;
  cpfRepresentante: string;
  
  // Seção 4 - Documentação
  documentosObrigatorios: string[];
  documentosAdicionais: string[];
  etp: File | null;
  termoReferencia: File | null;
  parecerJuridico: File | null;
  autorizacaoAutoridade: File | null;
  pesquisaPrecos: File | null;
  minutaContratual: File | null;
  documentoRatificacao: File | null;
  comprovacaoExclusividade: File | null;
  certidoesRegularidade: File | null;
  outrosDocumentos: File | null;
  
  // Seção 5 - Condições Contratuais
  regimeExecucao: string;
  prazoExecucao: string;
  condicoesPagamento: string;
  obrigacoesPartes: string;
  penalidadesSancoes: string;
  
  // Seção 5 - Planejamento e Finanças
  registroPCA: string;
  fonteDotacao: string;
  formaPagamento: string;
  
  // Seção 6 - Publicação
  statusPublicacaoPNCP: string;
  dataPublicacaoDiario: string;
  comprovantePublicacao: File | null;
  
  // Seção 6 - Publicação Oficial
  dataPublicacao: string;
  veiculoPublicacao: string;
  linkPublicacao: string;
  observacoesPublicacao: string;
  
  // NOVOS CAMPOS - Dispensa Eletrônica
  dataSessaoEletronica: string;
  horarioInicio: string;
  horarioFim: string;
  criterioJulgamento: string;
  intervaloMinimo: number;
  preferenciaMEEPP: string;
  registroPrecos: string;

  // Seção 7 - Dispensa Eletrônica
  numeroDispensa: string;
  dataDispensa: string;
  autoridadeDispensa: string;
  cargoAutoridade: string;
  fundamentoDispensa: string;
  observacoesDispensa: string;

  // Seção 8 - Validação IA LUX
  analiseIA: string;
  conformidadeLegal: string;
  recomendacoesIA: string;
  observacoesIA: string;
}

const mockContratacaoData: ContratacaoData = {
  numeroProcesso: '',
  dataProcesso: '',
  unidadeDemandante: '',
  responsavelTecnico: '',
  tipoContratacao: 'inexigibilidade',
  tipoContratacaoFundamento: '',
  tipoObjeto: '',
  valorEstimado: 0,
  modalidadeExecucao: 'presencial',
  identificacaoProcesso: {
    numeroEdital: 'EDITAL-2023-0001',
    matrizRiscos: 'MR-2023-0001',
    termoReferencia: 'TR-2023-0001',
    objeto: 'Aquisição de computadores para a Secretaria de Educação'
  },
  descricaoObjeto: '',
  fundamentacaoTecnica: '',
  localEntrega: '',
  prazoEstimado: '',
  unidadePrazo: 'dias',
  justificativaContratacao: '',
  razaoEscolhaFornecedor: '',
  nomeEmpresa: '',
  cnpjEmpresa: '',
  representanteLegal: '',
  cpfRepresentante: '',
  documentosObrigatorios: [],
  documentosAdicionais: [],
  etp: null,
  termoReferencia: null,
  parecerJuridico: null,
  autorizacaoAutoridade: null,
  pesquisaPrecos: null,
  minutaContratual: null,
  documentoRatificacao: null,
  comprovacaoExclusividade: null,
  certidoesRegularidade: null,
  outrosDocumentos: null,
  regimeExecucao: '',
  prazoExecucao: '',
  condicoesPagamento: '',
  obrigacoesPartes: '',
  penalidadesSancoes: '',
  statusPublicacaoPNCP: '',
  dataPublicacaoDiario: '',
  comprovantePublicacao: null,
  dataSessaoEletronica: '',
  horarioInicio: '',
  horarioFim: '',
  criterioJulgamento: 'menor_preco',
  intervaloMinimo: 0.01,
  preferenciaMEEPP: 'sim',
  registroPrecos: 'nao',
  registroPCA: '',
  fonteDotacao: '',
  formaPagamento: '',
  dataPublicacao: '',
  veiculoPublicacao: '',
  linkPublicacao: '',
  observacoesPublicacao: '',
  numeroDispensa: '',
  dataDispensa: '',
  autoridadeDispensa: '',
  cargoAutoridade: '',
  fundamentoDispensa: '',
  observacoesDispensa: '',
  analiseIA: '',
  conformidadeLegal: '',
  recomendacoesIA: '',
  observacoesIA: '',
  justificativaInviabilidade: '',
  comprovacaoEnquadramento: null,
  justificativaDispensa: '',
  documentacaoDispensa: null,
};

export const useContratacaoData = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['contratacaoData'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockContratacaoData;
    },
    staleTime: 5 * 60 * 1000,
  });

  const updateMutation = useMutation({
    mutationFn: async (newData: Partial<ContratacaoData>) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { ...data, ...newData };
    },
    onSuccess: (updatedData) => {
      queryClient.setQueryData(['contratacaoData'], updatedData);
      console.log('Dados de contratação atualizados:', updatedData);
    },
    onError: (error) => {
      console.error('Erro ao atualizar dados de contratação:', error);
    }
  });

  const updateField = (field: keyof ContratacaoData, value: any) => {
    if (data) {
      updateMutation.mutate({ [field]: value });
    }
  };

  const validateLimites = (tipoObjeto: string, valor: number): boolean => {
    const limites = {
      'obras-engenharia': 125451.15,
      'compras-servicos': 62725.59,
      'pequeno-valor': 12545.11
    };
    
    const limite = limites[tipoObjeto as keyof typeof limites];
    return limite ? valor <= limite : true;
  };

  return {
    data: data || mockContratacaoData,
    isLoading,
    error,
    updateField,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
    validateLimites
  };
};
