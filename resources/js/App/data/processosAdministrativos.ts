import { ProcessoAdministrativo, DocumentoProcesso, EspadaProcesso } from '@/types/painelProcessos';

const documentosPA042: DocumentoProcesso[] = [
  {
    id: 'doc-001',
    numero: 'DFD-2025/042',
    tipo: 'DFD',
    nome: 'Documento de Formalização de Demanda - Computadores',
    dataEmissao: '2025-03-15',
    dataAssinatura: '2025-03-15',
    status: 'Assinado',
    responsavel: 'Ana Silva',
    autor: 'Ana Silva',
    requerAssinatura: true,
    podeSerEncaminhado: false,
    assinaturas: [
      {
        id: 'ass-001',
        tipo: 'Técnica',
        responsavel: 'Ana Silva',
        dataAssinatura: '2025-03-15',
        metodoAutenticacao: 'Digital',
        status: 'Assinado'
      }
    ]
  },
  {
    id: 'doc-002',
    numero: 'ETP-2025/042',
    tipo: 'ETP',
    nome: 'Estudo Técnico Preliminar - Computadores',
    dataEmissao: '2025-03-22',
    dataAssinatura: '2025-03-22',
    status: 'Assinado',
    responsavel: 'Ana Silva',
    autor: 'Ana Silva',
    requerAssinatura: true,
    podeSerEncaminhado: false,
    assinaturas: [
      {
        id: 'ass-002',
        tipo: 'Técnica',
        responsavel: 'Ana Silva',
        dataAssinatura: '2025-03-22',
        metodoAutenticacao: 'Digital',
        status: 'Assinado'
      }
    ]
  },
  {
    id: 'doc-003',
    numero: 'TR-2025/042',
    tipo: 'TR',
    nome: 'Termo de Referência - Computadores',
    dataEmissao: '2025-03-30',
    dataAssinatura: '2025-03-30',
    status: 'Assinado',
    responsavel: 'Carlos Pereira',
    autor: 'Ana Silva',
    requerAssinatura: true,
    podeSerEncaminhado: true,
    proximoResponsavel: 'Dr. Roberto Mendes',
    assinaturas: [
      {
        id: 'ass-003',
        tipo: 'Técnica',
        responsavel: 'Ana Silva',
        dataAssinatura: '2025-03-28',
        metodoAutenticacao: 'Digital',
        status: 'Assinado'
      },
      {
        id: 'ass-004',
        tipo: 'Administrativa',
        responsavel: 'Carlos Pereira',
        dataAssinatura: '2025-03-30',
        metodoAutenticacao: 'Gov.br',
        status: 'Assinado'
      }
    ]
  },
  {
    id: 'doc-004',
    numero: 'CT-2025/042',
    tipo: 'Contrato',
    nome: 'Contrato Administrativo - Tech Solutions',
    dataEmissao: '2025-06-01',
    dataAssinatura: '2025-06-01',
    status: 'Assinado',
    responsavel: 'Carlos Pereira',
    autor: 'Carlos Pereira',
    requerAssinatura: true,
    podeSerEncaminhado: false,
    assinaturas: [
      {
        id: 'ass-005',
        tipo: 'Administrativa',
        responsavel: 'Carlos Pereira',
        dataAssinatura: '2025-06-01',
        metodoAutenticacao: 'Digital',
        status: 'Assinado'
      },
      {
        id: 'ass-006',
        tipo: 'Jurídica',
        responsavel: 'Dr. Roberto Mendes',
        dataAssinatura: '2025-06-01',
        metodoAutenticacao: 'Gov.br',
        status: 'Assinado'
      }
    ]
  },
  {
    id: 'doc-005',
    numero: 'RF-2025/042-001',
    tipo: 'Relatório de Fiscalização',
    nome: 'Relatório de Fiscalização - Entrega de Equipamentos',
    dataEmissao: '2025-06-25',
    status: 'Pendente Assinatura',
    responsavel: 'Ana Silva',
    autor: 'Ana Silva',
    requerAssinatura: true,
    podeSerEncaminhado: true,
    proximoResponsavel: 'João Silva',
    assinaturas: []
  }
];

const espadasPA042: EspadaProcesso[] = [
  {
    numero: 1,
    nome: 'Planejamento e Demandas',
    status: 'Concluído',
    dataInicio: '2025-03-10',
    dataConclusao: '2025-03-15',
    responsavel: 'Ana Silva',
    pendencias: false,
    documentosVinculados: ['doc-001']
  },
  {
    numero: 2,
    nome: 'Estratégia de Contratação',
    status: 'Concluído',
    dataInicio: '2025-03-16',
    dataConclusao: '2025-03-22',
    responsavel: 'Ana Silva',
    pendencias: false,
    documentosVinculados: ['doc-002']
  },
  {
    numero: 3,
    nome: 'Termo de Referência',
    status: 'Concluído',
    dataInicio: '2025-03-23',
    dataConclusao: '2025-03-30',
    responsavel: 'Ana Silva',
    pendencias: false,
    documentosVinculados: ['doc-003']
  },
  {
    numero: 4,
    nome: 'Matriz de Riscos e Garantias',
    status: 'Concluído',
    dataInicio: '2025-03-31',
    dataConclusao: '2025-04-02',
    responsavel: 'Ana Silva',
    pendencias: false,
    documentosVinculados: []
  },
  {
    numero: 5,
    nome: 'Edital e Publicidade',
    status: 'Concluído',
    dataInicio: '2025-04-03',
    dataConclusao: '2025-04-10',
    responsavel: 'Carlos Pereira',
    pendencias: false,
    documentosVinculados: []
  },
  {
    numero: 6,
    nome: 'Contrato e Execução',
    status: 'Em Andamento',
    dataInicio: '2025-06-01',
    responsavel: 'João Silva',
    pendencias: false,
    documentosVinculados: ['doc-004']
  },
  {
    numero: 7,
    nome: 'Penalidades e Responsabilização',
    status: 'Não Iniciado',
    responsavel: 'João Silva',
    pendencias: false,
    documentosVinculados: []
  }
];

export const processosAdministrativos: ProcessoAdministrativo[] = [
  {
    id: 'pa-001',
    numero: 'PA-2025/042',
    objeto: 'Aquisição de computadores para laboratórios de informática das escolas municipais',
    modalidade: 'Pregão',
    criterio: 'Menor Preço',
    valor: 'R$ 320.000,00',
    valorNumerico: 320000,
    secretaria: 'Secretaria de Educação',
    departamento: 'Departamento de TI',
    dataInicio: '2025-03-10',
    previsaoConclusao: '2025-12-31',
    status: 'Em Andamento',
    espadaAtual: 6,
    faseAtual: 'Execução Contratual',
    fornecedor: 'Tech Solutions LTDA',
    vigenciaAte: '2025-12-31',
    responsavelGestor: 'Maria Oliveira',
    responsavelFiscal: 'João Silva',
    autorProcesso: 'Ana Silva',
    tags: ['educação', 'tecnologia', 'pregão', 'prioridade-alta'],
    prioridade: 'Alta',
    documentos: documentosPA042,
    espadas: espadasPA042,
    notificacoes: 2,
    anexos: [
      {
        id: 'anexo-001',
        processoId: 'pa-001',
        documentoVinculado: 'doc-005',
        nome: 'Fotos da Entrega - Lote 1',
        tipo: 'image/jpeg',
        tamanho: 2048576,
        dataUpload: '2025-06-25',
        responsavelUpload: 'Ana Silva',
        arquivo: 'anexos/pa-2025-042/fotos-entrega-lote1.jpg',
        descricao: 'Registro fotográfico da entrega dos computadores do primeiro lote'
      }
    ]
  },
  {
    id: 'pa-002',
    numero: 'PA-2025/038',
    objeto: 'Aquisição de material de expediente para todas as secretarias',
    modalidade: 'Dispensa',
    criterio: 'Menor Preço',
    valor: 'R$ 45.000,00',
    valorNumerico: 45000,
    secretaria: 'Secretaria de Administração',
    departamento: 'Departamento de Compras',
    dataInicio: '2025-03-01',
    previsaoConclusao: '2025-04-30',
    status: 'Em Andamento',
    espadaAtual: 2,
    faseAtual: 'Estudo Técnico Preliminar',
    responsavelGestor: 'Pedro Santos',
    responsavelFiscal: 'Ana Maria',
    autorProcesso: 'Pedro Santos',
    tags: ['administração', 'dispensa', 'material'],
    prioridade: 'Média',
    documentos: [],
    espadas: [],
    notificacoes: 1,
    anexos: []
  },
  {
    id: 'pa-003',
    numero: 'PA-2025/031',
    objeto: 'Reforma e ampliação da Escola Municipal João da Silva',
    modalidade: 'Concorrência',
    criterio: 'Técnica e Preço',
    valor: 'R$ 1.200.000,00',
    valorNumerico: 1200000,
    secretaria: 'Secretaria de Obras',
    departamento: 'Departamento de Engenharia',
    dataInicio: '2025-02-15',
    previsaoConclusao: '2025-08-31',
    status: 'Em Andamento',
    espadaAtual: 5,
    faseAtual: 'Processo Licitatório',
    responsavelGestor: 'Eng. Roberto Silva',
    responsavelFiscal: 'Arq. Marina Costa',
    autorProcesso: 'Eng. Roberto Silva',
    tags: ['obras', 'educação', 'concorrência', 'prioridade-alta'],
    prioridade: 'Alta',
    documentos: [],
    espadas: [],
    notificacoes: 3,
    anexos: []
  },
  {
    id: 'pa-004',
    numero: 'PA-2025/027',
    objeto: 'Prestação de serviços de limpeza e conservação das escolas municipais',
    modalidade: 'Pregão',
    criterio: 'Menor Preço',
    valor: 'R$ 240.000,00',
    valorNumerico: 240000,
    secretaria: 'Secretaria de Educação',
    departamento: 'Departamento Administrativo',
    dataInicio: '2025-01-15',
    previsaoConclusao: '2025-12-31',
    status: 'Próximo ao Vencimento',
    espadaAtual: 6,
    faseAtual: 'Execução Contratual',
    fornecedor: 'Limpeza Total Ltda',
    vigenciaAte: '2025-12-31',
    responsavelGestor: 'Carlos Eduardo',
    responsavelFiscal: 'Fernanda Lima',
    autorProcesso: 'Carlos Eduardo',
    tags: ['educação', 'serviços', 'pregão'],
    prioridade: 'Média',
    documentos: [],
    espadas: [],
    notificacoes: 4,
    anexos: []
  },
  {
    id: 'pa-005',
    numero: 'PA-2024/156',
    objeto: 'Aquisição de medicamentos para o posto de saúde central',
    modalidade: 'Pregão',
    criterio: 'Menor Preço',
    valor: 'R$ 85.000,00',
    valorNumerico: 85000,
    secretaria: 'Secretaria de Saúde',
    departamento: 'Departamento Farmacêutico',
    dataInicio: '2024-11-01',
    previsaoConclusao: '2024-12-31',
    status: 'Concluído',
    espadaAtual: 7,
    faseAtual: 'Processo Encerrado',
    fornecedor: 'Farmácia Central Ltda',
    vigenciaAte: '2024-12-31',
    responsavelGestor: 'Dr. Paulo Mendes',
    responsavelFiscal: 'Farm. Lucia Santos',
    autorProcesso: 'Dr. Paulo Mendes',
    tags: ['saúde', 'medicamentos', 'pregão'],
    prioridade: 'Alta',
    documentos: [],
    espadas: [],
    notificacoes: 0,
    anexos: []
  }
];

export const secretarias = [
  'Secretaria de Educação',
  'Secretaria de Saúde',
  'Secretaria de Obras',
  'Secretaria de Administração',
  'Secretaria de Finanças',
  'Secretaria de Desenvolvimento Social'
];

export const modalidades = [
  'Pregão',
  'Dispensa',
  'Concorrência',
  'Inexigibilidade'
];

export const fasesProcesso = [
  'Planejamento',
  'Estudo Técnico Preliminar',
  'Termo de Referência',
  'Matriz de Riscos',
  'Processo Licitatório',
  'Execução Contratual',
  'Processo Encerrado'
];
