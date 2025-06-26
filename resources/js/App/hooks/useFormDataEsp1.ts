import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Tipos para os dados do formulário
export interface FormData {
  identificacao: {
    unidadeIniciadora: string;
    responsavelNome: string;
    responsavelCargo: string;
    responsavelSetor: string;
    descricaoNecessidade: string;
    statusPlanejamento: string;
  };
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

// Dados fictícios iniciais
const initialData: FormData = {
  identificacao: {
    unidadeIniciadora: 'secretaria_educacao',
    responsavelNome: 'Maria Silva Santos',
    responsavelCargo: 'Coordenadora de Compras',
    responsavelSetor: 'Secretaria de Educação',
    descricaoNecessidade: 'Necessidade de modernização do parque tecnológico das escolas municipais para melhorar a qualidade do ensino e facilitar o acesso digital dos estudantes.',
    statusPlanejamento: 'consolidada_dfd'
  },
  objeto: {
    objetoContratacao: 'Aquisição de equipamentos de informática (computadores desktop, notebooks, tablets) para modernização tecnológica das escolas municipais, incluindo configuração e instalação dos equipamentos.',
    tipoObjeto: 'bens',
    subcategoriaTecnica: 'equipamentos',
    codigoCatmat: '140.000.001'
  },
  itens: [
    {
      id: 1,
      descricao: 'Computador Desktop completo',
      catmat: '140.000.001',
      unidade: 'unidade',
      quantidade: 50,
      valorUnitario: 2800.00,
      valorTotal: 140000.00
    },
    {
      id: 2,
      descricao: 'Notebook para laboratório',
      catmat: '140.000.002',
      unidade: 'unidade',
      quantidade: 25,
      valorUnitario: 3200.00,
      valorTotal: 80000.00
    },
    {
      id: 3,
      descricao: 'Tablet educacional',
      catmat: '140.000.003',
      unidade: 'unidade',
      quantidade: 100,
      valorUnitario: 800.00,
      valorTotal: 80000.00
    }
  ],
  detalhamento: {
    justificativaTecnica: 'Os equipamentos atuais das escolas municipais possuem mais de 8 anos de uso, apresentando obsolescência tecnológica e frequentes problemas de funcionamento. A modernização é necessária para implementar metodologias digitais de ensino conforme diretrizes pedagógicas atualizadas.',
    beneficiosEsperados: 'Melhoria significativa na qualidade do ensino através da implementação de recursos digitais modernos, maior engajamento e participação dos alunos nas atividades educacionais, capacitação digital dos professores para uso de novas tecnologias, preparação adequada dos estudantes para os desafios do mercado de trabalho digital e redução da evasão escolar através de metodologias mais atrativas.',
    riscosIdentificados: 'Risco de furto ou vandalismo dos equipamentos nas unidades escolares, necessidade de capacitação intensiva dos professores para utilização adequada das tecnologias, possível resistência inicial à mudança por parte de alguns educadores mais experientes, dependência de infraestrutura elétrica e conectividade de internet adequadas.',
    alternativasAnalisadas: 'Foi considerada a locação de equipamentos, mas a aquisição se mostrou mais vantajosa economicamente no longo prazo. Também foi avaliada a compra de equipamentos usados, descartada por questões de garantia e vida útil reduzida.',
    mesEstimado: 'agosto',
    grauImportancia: 'alta',
    historicoConsumo: 'Nos últimos 12 meses, a Secretaria de Educação utilizou equipamentos de informática principalmente para atividades administrativas e laboratórios de informática básicos. O consumo médio mensal foi de aproximadamente 200 horas de uso dos equipamentos existentes, distribuídas entre 15 unidades escolares. A demanda por equipamentos mais modernos aumentou 300% devido à implementação de metodologias digitais de ensino.',
    criteriosSustentabilidade: true,
    detalheSustentabilidade: 'Serão priorizados equipamentos com certificação energética ENERGY STAR, materiais recicláveis na fabricação, programas de logística reversa dos fornecedores para descarte adequado de equipamentos antigos, e embalagens biodegradáveis ou reutilizáveis.',
    normasTecnicas: 'ABNT NBR ISO/IEC 27001 para segurança da informação, ABNT NBR 14136 para equipamentos de informática, Portaria INMETRO 170/2012 para eficiência energética, e conformidade com as diretrizes técnicas do MEC para equipamentos educacionais.'
  },
  compartilhamento: {
    podeCompartilhar: true,
    outrasUnidades: ['secretaria_cultura', 'secretaria_assistencia_social'],
    justificativaCompartilhamento: 'Outras secretarias também possuem necessidade de equipamentos de informática para modernização de seus setores administrativos.'
  },
  vinculacoes: {
    ppa: '2024.001.001',
    ldo: '2024.LDO.001',
    loa: '2024.LOA.001'
  },
  pca: {
    items: [
      {
        id: 1,
        descricao: 'Aquisição de Equipamentos de Informática',
        codigo: '140.000.001',
        valorPrevisto: 300000.00,
        periodo: '2º Trimestre',
        compatibilidade: 95
      },
      {
        id: 2,
        descricao: 'Material Tecnológico Educacional',
        codigo: '140.000.002',
        valorPrevisto: 150000.00,
        periodo: '3º Trimestre',
        compatibilidade: 78
      }
    ],
    selectedItems: [
      {
        id: 1,
        descricao: 'Aquisição de Equipamentos de Informática',
        codigo: '140.000.001',
        valorPrevisto: 300000.00,
        periodo: '2º Trimestre'
      }
    ]
  },
  duplicidade: {
    demandasSimilares: [
      {
        id: 1,
        descricao: 'Aquisição de equipamentos de informática para Secretaria de Saúde',
        unidade: 'Secretaria de Saúde',
        similaridade: 85,
        status: 'Em andamento',
        data: '2024-01-15'
      },
      {
        id: 2,
        descricao: 'Compra de computadores para modernização administrativa',
        unidade: 'Secretaria de Administração',
        similaridade: 73,
        status: 'Planejada',
        data: '2024-02-10'
      }
    ],
    analiseCompleta: true
  },
  demandasCorrelatas: {
    vinculacaoOutrasDemandas: true,
    justificativaVinculacao: 'Esta demanda complementa as iniciativas de modernização tecnológica já em andamento na Secretaria de Administração e se alinha com o Plano Municipal de Digitalização. A integração com outras demandas similares permite maior economia de escala nas negociações com fornecedores e padronização dos equipamentos em todas as secretarias.',
    impactosEsperados: 'Melhoria na qualidade educacional através da modernização tecnológica das escolas, redução de custos operacionais com manutenção de equipamentos obsoletos, maior eficiência administrativa, capacitação digital de professores e alunos, e alinhamento com as metas do Plano Municipal de Educação Digital.',
    riscosPreliminares: 'Possível atraso na entrega dos equipamentos devido à alta demanda no mercado, necessidade de adequação da infraestrutura elétrica em algumas escolas, risco de furto ou vandalismo, resistência à mudança por parte de alguns usuários, e necessidade de capacitação intensiva para uso adequado dos equipamentos.'
  },
  dfd: {
    orgaoRequisitante: 'secretaria_educacao',
    numero: 'DFD-2024-0001',
    dataCriacao: '29/05/2024',
    justificativa: 'A aquisição destes equipamentos é fundamental para modernizar o ambiente educacional das escolas municipais, proporcionando aos estudantes acesso a tecnologias atuais e preparando-os para os desafios do século XXI.',
    fontePesquisa: 'painel_precos',
    pcaItemId: 'item1',
    responsavelAprovacao: 'João Carlos Oliveira',
    cargoResponsavel: 'Secretário de Educação',
    matriculaResponsavel: '123456',
    justificativaPca: 'Considerando a identificação da necessidade de contratação do objeto, informamos que a presente demanda consta no PCA vigente desta unidade gestora, item 140.000.001 - Aquisição de Equipamentos de Informática, com previsão orçamentária de R$ 300.000,00 para o 2º trimestre de 2024.',
    requisitosTecnicos: 'Computadores desktop com processador Intel Core i5 ou superior, 8GB RAM, 256GB SSD, Windows 11, garantia mínima de 12 meses. Notebooks com especificações similares para mobilidade. Tablets com tela mínima de 10 polegadas, 64GB armazenamento, Android ou iOS.',
    dataPretendida: '2024-08-15',
    grauPrioridade: 'media',
    justificativaPrioridade: '',
    vinculacaoOutrasDemandas: true,
    descricaoVinculacao: 'Esta demanda está vinculada ao projeto de modernização tecnológica municipal, complementando as contratações já realizadas pela Secretaria de Administração para informatização dos demais setores.',
    programa: '2001',
    acao: '2001.001',
    elementoDespesa: '449052',
    fonteRecursos: 'recursos_proprios',
    mapaCotacao: '',
    destinatario: 'secretario_administracao',
    observacoesEncaminhamento: 'Solicito prioridade na análise desta demanda devido ao cronograma de implementação das metodologias digitais de ensino previstas para o próximo semestre letivo. A modernização dos equipamentos é fundamental para o cumprimento das metas educacionais estabelecidas no Plano Municipal de Educação.',
    impactosEsperados: 'Melhoria na qualidade educacional através da modernização tecnológica das escolas, redução de custos operacionais com manutenção de equipamentos obsoletos, maior eficiência administrativa, capacitação digital de professores e alunos, e alinhamento com as metas do Plano Municipal de Educação Digital.',
    riscosPreliminares: 'Possível atraso na entrega dos equipamentos devido à alta demanda no mercado, necessidade de adequação da infraestrutura elétrica em algumas escolas, risco de furto ou vandalismo, resistência à mudança por parte de alguns usuários, e necessidade de capacitação intensiva para uso adequado dos equipamentos.',
    responsavelNome: 'João Carlos Oliveira',
    responsavelCargo: 'Secretário de Educação',
    responsavelMatricula: '123456',
    modalidadeLicitacao: 'pregao_eletronico',
    tipoLicitacao: 'menor_preco',
    criterioJulgamento: 'menor_preco_por_item',
    regimeExecucao: 'empreitada_integral',
    prazoEntrega: '30',
    localEntrega: 'Almoxarifado Central da Secretaria de Educação'
  }
};

// Simula API calls
const fetchFormData = async (): Promise<FormData> => {
  // Simula delay de rede
  await new Promise(resolve => setTimeout(resolve, 500));
  return initialData;
};

const saveFormData = async (data: FormData): Promise<FormData> => {
  // Simula delay de rede
  await new Promise(resolve => setTimeout(resolve, 300));
  console.log('Dados salvos:', data);
  return data;
};

export function useFormData() {
  const queryClient = useQueryClient();
  
  // Query para buscar dados
  const { data: formData, isLoading, error } = useQuery({
    queryKey: ['formData'],
    queryFn: fetchFormData,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  // Mutation para salvar dados
  const saveMutation = useMutation({
    mutationFn: saveFormData,
    onSuccess: (savedData) => {
      queryClient.setQueryData(['formData'], savedData);
    },
  });

  // Função para atualizar campos específicos
  const updateField = (path: string, value: any) => {
    if (!formData) return;
    
    const keys = path.split('.');
    const updatedData = { ...formData };
    let current: any = updatedData;
    
    // Navega até o penúltimo nível
    for (let i = 0; i < keys.length - 1; i++) {
      if (current[keys[i]] === undefined) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    // Atualiza o valor final
    current[keys[keys.length - 1]] = value;
    
    // Atualiza o cache imediatamente
    queryClient.setQueryData(['formData'], updatedData);
    
    // Salva automaticamente (debounced)
    saveMutation.mutate(updatedData);
  };

  // Função para obter valor de um campo específico
  const getFieldValue = (path: string): any => {
    if (!formData) return '';
    
    const keys = path.split('.');
    let current: any = formData;
    
    for (const key of keys) {
      if (current && typeof current === 'object') {
        current = current[key];
      } else {
        return '';
      }
    }
    
    return current || '';
  };

  // Funções específicas para manipular arrays
  const addItem = (item: any) => {
    if (!formData) return;
    
    const updatedData = {
      ...formData,
      itens: [...formData.itens, { ...item, id: Date.now() }]
    };
    
    queryClient.setQueryData(['formData'], updatedData);
    saveMutation.mutate(updatedData);
  };

  const removeItem = (itemId: number) => {
    if (!formData) return;
    
    const updatedData = {
      ...formData,
      itens: formData.itens.filter(item => item.id !== itemId)
    };
    
    queryClient.setQueryData(['formData'], updatedData);
    saveMutation.mutate(updatedData);
  };

  const updateItem = (itemId: number, updates: any) => {
    if (!formData) return;
    
    const updatedData = {
      ...formData,
      itens: formData.itens.map(item => 
        item.id === itemId ? { ...item, ...updates } : item
      )
    };
    
    queryClient.setQueryData(['formData'], updatedData);
    saveMutation.mutate(updatedData);
  };

  // Função para calcular total dos itens
  const getTotalValue = (): number => {
    if (!formData) return 0;
    return formData.itens.reduce((total, item) => total + item.valorTotal, 0);
  };

  return {
    formData: formData || initialData,
    isLoading,
    error,
    isSaving: saveMutation.isPending,
    updateField,
    getFieldValue,
    addItem,
    removeItem,
    updateItem,
    getTotalValue,
    saveFormData: () => formData && saveMutation.mutate(formData),
  };
}
