import { DocumentoPublico, ProcessoCompleto, MetricasTransparencia, SeloTransparencia } from '@/types/portalTransparencia';

export const documentosPublicos: DocumentoPublico[] = [
  {
    id: 'doc-001',
    numeroProcesso: 'PA-2025/00042',
    numeroDocumento: 'TR-2025/00042-01',
    tipo: 'TR',
    nome: 'Termo de Referência - Aquisição de material de escritório',
    descricao: 'Especificações técnicas para aquisição de materiais de escritório para o exercício 2025',
    dataCriacao: '2025-04-28',
    dataPublicacao: '2025-05-01',
    dataAprovacao: '2025-04-30',
    objeto: 'Aquisição de material de escritório',
    secretaria: 'Administração',
    modalidade: 'Pregão Eletrônico',
    valor: 45000,
    status: 'Concluído',
    espada: 3,
    origem: 'Criado na LUMEN',
    autenticidade: {
      nivel: 'Válida',
      assinaturaDigital: true,
      certificadoICP: true,
      hashVerificado: true,
      dataVerificacao: '2025-06-02'
    },
    assinaturas: [
      { nome: 'João Silva', cargo: 'Requisitante', data: '2025-04-28', tipo: 'Digital', valida: true },
      { nome: 'Maria Oliveira', cargo: 'Aprovação Técnica', data: '2025-04-29', tipo: 'Digital', valida: true },
      { nome: 'Carlos Santos', cargo: 'Aprovação Jurídica', data: '2025-04-30', tipo: 'Digital', valida: true }
    ],
    documentosRelacionados: ['DFD-2025/00042-01', 'ETP-2025/00042-01', 'MR-2025/00042-01'],
    tags: ['material', 'escritório', 'pregão'],
    urlVisualizacao: '/documentos/TR-2025-00042-01',
    urlDownload: '/api/documentos/TR-2025-00042-01/download',
    versao: '1.0',
    hash: '8f7d56a1c9b3e5d4f2a1b8c7d6e5f4a3',
    tempoPublicacao: 3
  },
  {
    id: 'doc-002',
    numeroProcesso: 'PA-2025/00043',
    numeroDocumento: 'DFD-2025/00043-01',
    tipo: 'DFD',
    nome: 'Documento de Formalização de Demanda - Serviços de limpeza',
    descricao: 'Formalização da necessidade de contratação de serviços de limpeza predial',
    dataCriacao: '2025-05-01',
    dataPublicacao: '2025-05-02',
    objeto: 'Contratação de serviços de limpeza',
    secretaria: 'Educação',
    modalidade: 'Pregão Eletrônico',
    valor: 120000,
    status: 'Em andamento',
    espada: 1,
    origem: 'Criado na LUMEN',
    autenticidade: {
      nivel: 'Válida',
      assinaturaDigital: true,
      certificadoICP: false,
      hashVerificado: true,
      dataVerificacao: '2025-06-02'
    },
    assinaturas: [
      { nome: 'Ana Costa', cargo: 'Secretária de Educação', data: '2025-05-01', tipo: 'Gov.br', valida: true }
    ],
    documentosRelacionados: [],
    tags: ['limpeza', 'serviços', 'educação'],
    urlVisualizacao: '/documentos/DFD-2025-00043-01',
    urlDownload: '/api/documentos/DFD-2025-00043-01/download',
    versao: '1.0',
    hash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d',
    tempoPublicacao: 1
  },
  {
    id: 'doc-003',
    numeroProcesso: 'PA-2025/00044',
    numeroDocumento: 'EDITAL-2025/00044-01',
    tipo: 'Edital',
    nome: 'Edital de Pregão - Aquisição de medicamentos',
    descricao: 'Edital para aquisição de medicamentos básicos para postos de saúde',
    dataCriacao: '2025-05-10',
    dataPublicacao: '2025-05-15',
    objeto: 'Aquisição de medicamentos',
    secretaria: 'Saúde',
    modalidade: 'Pregão Eletrônico',
    valor: 350000,
    status: 'Publicado',
    espada: 4,
    origem: 'Criado na LUMEN',
    autenticidade: {
      nivel: 'Pendente',
      assinaturaDigital: false,
      certificadoICP: false,
      hashVerificado: true,
      dataVerificacao: '2025-06-02'
    },
    assinaturas: [
      { nome: 'Pedro Alves', cargo: 'Pregoeiro', data: '2025-05-14', tipo: 'Física', valida: false }
    ],
    documentosRelacionados: ['TR-2025/00044-01', 'PARECER-2025/00044-01'],
    tags: ['medicamentos', 'saúde', 'pregão'],
    urlVisualizacao: '/documentos/EDITAL-2025-00044-01',
    urlDownload: '/api/documentos/EDITAL-2025-00044-01/download',
    versao: '1.0',
    hash: 'b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6',
    tempoPublicacao: 5
  },
  {
    id: 'doc-004',
    numeroProcesso: 'PA-2025/00045',
    numeroDocumento: 'CONT-2025/00045-01',
    tipo: 'Contrato',
    nome: 'Contrato - Manutenção de veículos',
    descricao: 'Contrato para prestação de serviços de manutenção preventiva e corretiva de veículos',
    dataCriacao: '2025-05-18',
    dataPublicacao: '2025-05-20',
    dataAprovacao: '2025-05-19',
    objeto: 'Manutenção de veículos',
    secretaria: 'Transporte',
    modalidade: 'Pregão Eletrônico',
    valor: 78500,
    status: 'Vigente',
    espada: 6,
    origem: 'Criado na LUMEN',
    autenticidade: {
      nivel: 'Válida',
      assinaturaDigital: true,
      certificadoICP: true,
      hashVerificado: true,
      dataVerificacao: '2025-06-02'
    },
    assinaturas: [
      { nome: 'Roberto Lima', cargo: 'Secretário de Transporte', data: '2025-05-19', tipo: 'Digital', valida: true },
      { nome: 'AutoService Ltda', cargo: 'Contratada', data: '2025-05-19', tipo: 'Digital', valida: true }
    ],
    documentosRelacionados: ['EDITAL-2025/00045-01', 'ATA-2025/00045-01'],
    tags: ['manutenção', 'veículos', 'transporte'],
    urlVisualizacao: '/documentos/CONT-2025-00045-01',
    urlDownload: '/api/documentos/CONT-2025-00045-01/download',
    versao: '1.0',
    hash: 'c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7',
    tempoPublicacao: 2
  }
];

export const selosTransparencia: Record<string, SeloTransparencia> = {
  'PA-2025/00042': {
    nivel: 'Verde',
    percentual: 100,
    criteriosAtendidos: [
      'Todos os documentos obrigatórios publicados',
      'Prazos legais cumpridos',
      '100% dos documentos com assinatura digital válida',
      'Documentação completa em todas as espadas',
      'Informações de valores e pagamentos disponíveis'
    ],
    criteriosPendentes: [],
    idVerificacao: 'LUMEN-VERIFY-2025-00042-9876',
    dataVerificacao: '2025-06-02'
  },
  'PA-2025/00043': {
    nivel: 'Amarelo',
    percentual: 85,
    criteriosAtendidos: [
      'Documentos principais publicados',
      'Prazos legais cumpridos',
      '85% dos documentos com assinatura digital válida'
    ],
    criteriosPendentes: [
      'Relatório de fiscalização mais recente',
      'Comprovante de publicação no DOU'
    ],
    idVerificacao: 'LUMEN-VERIFY-2025-00043-9877',
    dataVerificacao: '2025-06-02'
  },
  'PA-2025/00044': {
    nivel: 'Vermelho',
    percentual: 40,
    criteriosAtendidos: [
      'Documento principal publicado'
    ],
    criteriosPendentes: [
      'Falta de parecer jurídico obrigatório',
      'Aditivo contratual não publicado',
      '40% dos documentos sem assinatura digital válida',
      'Informações de pagamentos não disponíveis',
      'Matriz de risco ausente'
    ],
    idVerificacao: 'LUMEN-VERIFY-2025-00044-9878',
    dataVerificacao: '2025-06-02'
  }
};

export const processosCompletos: ProcessoCompleto[] = [
  {
    numeroProcesso: 'PA-2025/00042',
    objeto: 'Aquisição de material de escritório',
    secretaria: 'Administração',
    valor: 45000,
    status: 'Concluído',
    seloTransparencia: selosTransparencia['PA-2025/00042'],
    documentos: documentosPublicos.filter(doc => doc.numeroProcesso === 'PA-2025/00042'),
    espadas: [
      {
        numero: 1,
        nome: 'Planejamento',
        descricao: 'Formalização da demanda e planejamento inicial',
        concluida: true,
        documentos: []
      },
      {
        numero: 2,
        nome: 'Estudo Técnico',
        descricao: 'Elaboração do estudo técnico preliminar',
        concluida: true,
        documentos: []
      },
      {
        numero: 3,
        nome: 'Termo de Referência',
        descricao: 'Elaboração do termo de referência',
        concluida: true,
        documentos: [documentosPublicos[0]]
      }
    ]
  }
];

export const metricasTransparencia: MetricasTransparencia = {
  totalDocumentos: 1247,
  totalProcessos: 89,
  processoCompletosPorcentual: 78,
  tempoMedioPublicacao: 3.2,
  documentosAssinadosDigitalmente: 95,
  distribuicaoModalidade: [
    { modalidade: 'Pregão Eletrônico', quantidade: 45 },
    { modalidade: 'Dispensa', quantidade: 23 },
    { modalidade: 'Concorrência', quantidade: 12 },
    { modalidade: 'Inexigibilidade', quantidade: 9 }
  ],
  distribuicaoSecretaria: [
    { secretaria: 'Educação', valor: 2500000 },
    { secretaria: 'Saúde', valor: 1800000 },
    { secretaria: 'Obras', valor: 1200000 },
    { secretaria: 'Administração', valor: 800000 }
  ],
  evolutivoPublicacoes: [
    { mes: 'Jan', quantidade: 98 },
    { mes: 'Fev', quantidade: 112 },
    { mes: 'Mar', quantidade: 127 },
    { mes: 'Abr', quantidade: 143 },
    { mes: 'Mai', quantidade: 156 }
  ]
};

export const secretarias = [
  'Todas',
  'Administração',
  'Educação',
  'Saúde',
  'Obras',
  'Transporte',
  'Assistência Social',
  'Meio Ambiente'
];

export const modalidades = [
  'Todos',
  // 🔹 MODALIDADES TRADICIONAIS (Lei nº 14.133/2021 – Art. 28 e Art. 32)
  'Pregão Eletrônico - Art. 28, inc. I',
  'Pregão Presencial - Art. 28, inc. I',
  'Concorrência - Art. 28, inc. II',
  'Concurso - Art. 28, inc. III',
  'Leilão - Art. 28, inc. IV',
  'Diálogo Competitivo - Art. 28, inc. V',
  // 🔹 INSTRUMENTOS DIRETOS
  'Dispensa de Licitação - Art. 74 e Art. 75 da Lei 14.133/21',
  'Inexigibilidade de Licitação - Art. 74 e Art. 74-A da Lei 14.133/21',
  'Credenciamento',
  'Adesão à Ata (Carona) - Art. 86 a 88 da Lei 14.133/21 (Sistema de Registro de Preços - SRP)',
  // 🔹 TERCEIRO SETOR (Lei nº 13.019/2014 – MROSC)
  'Chamamento Público - Art. 23 a 27 da Lei 13.019/14',
  'Termo de Colaboração - Art. 16, inc. I da Lei 13.019/14',
  'Termo de Fomento - Art. 16, inc. II da Lei 13.019/14'
];

export const tiposDocumento = [
  'Todos',
  'DFD',
  'ETP',
  'TR',
  'Matriz de Risco',
  'Parecer Jurídico',
  'Edital',
  'Publicação',
  'Esclarecimento',
  'Impugnação',
  'Ata',
  'Contrato',
  'Aditivo',
  'Apostilamento',
  'Ordem de Serviço',
  'Relatório',
  'Notificação'
];
