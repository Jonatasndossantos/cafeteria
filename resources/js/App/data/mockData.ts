
export const usuarioAtual = {
  nome: 'Administrador Master',
  setor: 'Administração Geral',
  funcao: 'Usuário Master',
  perfil: 'master'
};

export const notificacoes = [
  { id: 1, titulo: 'Contrato vencendo', urgencia: 'alta' },
  { id: 2, titulo: 'Nova legislação', urgencia: 'media' },
  { id: 3, titulo: 'Relatório disponível', urgencia: 'baixa' }
];

export const espadas = [
  {
    id: 1,
    nome: "Planejamento e Demandas",
    descricao: "Gestão de demandas e planejamento de contratações",
    status: "ativo",
    ultimaMovimentacao: "2025-05-30T14:30:00",
    documentosEmAndamento: 3
  },
  {
    id: 2,
    nome: "Estratégia de Contratação",
    descricao: "Estudos técnicos preliminares e estratégias",
    status: "atencao",
    ultimaMovimentacao: "2025-05-29T10:15:00",
    documentosEmAndamento: 2
  },
  {
    id: 3,
    nome: "Termo de Referência",
    descricao: "Elaboração e gestão de termos de referência",
    status: "critico",
    ultimaMovimentacao: "2025-05-31T09:45:00",
    documentosEmAndamento: 5
  },
  {
    id: 4,
    nome: "Matriz de Riscos e Garantias",
    descricao: "Análise de riscos e definição de garantias",
    status: "ativo",
    ultimaMovimentacao: "2025-05-28T16:20:00",
    documentosEmAndamento: 1
  },
  {
    id: 5,
    nome: "Edital e Publicidade",
    descricao: "Elaboração de editais e gestão de publicações",
    status: "ativo",
    ultimaMovimentacao: "2025-05-27T11:30:00",
    documentosEmAndamento: 4
  },
  {
    id: 6,
    nome: "Contrato e Execução",
    descricao: "Gestão de contratos e acompanhamento da execução",
    status: "atencao",
    ultimaMovimentacao: "2025-05-31T08:00:00",
    documentosEmAndamento: 7
  },
  {
    id: 7,
    nome: "Penalidades e Responsabilização",
    descricao: "Gestão de penalidades e responsabilização",
    status: "ativo",
    ultimaMovimentacao: "2025-05-26T14:10:00",
    documentosEmAndamento: 0
  }
];

export const tarefasPendentes = [
  {
    id: 1,
    titulo: "Fiscalização de obras da Escola Municipal",
    descricao: "Realizar vistoria técnica e elaborar relatório",
    prioridade: "alta",
    prazo: "2025-06-02T17:00:00",
    tipo: "Fiscalização",
    espadaId: 6,
    perfisAlvo: ["fiscal"]
  },
  {
    id: 2,
    titulo: "Análise de termo de referência - Limpeza",
    descricao: "Revisar especificações técnicas do edital",
    prioridade: "media",
    prazo: "2025-06-05T12:00:00",
    tipo: "Análise Técnica",
    espadaId: 3,
    perfisAlvo: ["fiscal", "juridico"]
  },
  {
    id: 3,
    titulo: "Notificação de fornecedor inadimplente",
    descricao: "Emitir notificação formal por atraso na entrega",
    prioridade: "alta",
    prazo: "2025-06-01T16:00:00",
    tipo: "Penalidade",
    espadaId: 7,
    perfisAlvo: ["fiscal", "juridico"]
  }
];

export const alertasCriticos = [
  {
    id: 1,
    titulo: "Contrato sem fiscal designado",
    descricao: "Contrato 045/2025 - Limpeza Urbana",
    nivel: "critico",
    referencia: "Art. 117, Lei 14.133/21"
  },
  {
    id: 2,
    titulo: "Prazo de medição vencendo",
    descricao: "3 contratos com medição pendente",
    nivel: "importante",
    referencia: "Cláusula 8ª - Contratos"
  }
];

export const legislacaoMunicipal = [
  {
    id: 1,
    titulo: "Lei Municipal 1.234/2024 - Licitações Sustentáveis",
    integrado: true,
    dataAtualizacao: "2025-05-30T10:00:00"
  },
  {
    id: 2,
    titulo: "Decreto 567/2024 - Procedimentos de Fiscalização",
    integrado: true,
    dataAtualizacao: "2025-05-29T15:30:00"
  },
  {
    id: 3,
    titulo: "Portaria 89/2024 - Comissão de Licitação",
    integrado: false,
    dataAtualizacao: "2025-05-28T09:15:00"
  }
];

export const versiculoDiario = {
  texto: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.",
  referencia: "Provérbios 3:5"
};

export const modulos = [
  {
    id: 1,
    nome: "Gestão de Contratos",
    descricao: "Controle completo de contratos ativos e inativos",
    status: "ativo",
    icone: "FileText",
    ultimaAtualizacao: "2025-05-31T10:30:00"
  },
  {
    id: 2,
    nome: "Portal do Fornecedor",
    descricao: "Interface para fornecedores cadastrados",
    status: "ativo",
    icone: "Users",
    ultimaAtualizacao: "2025-05-30T15:20:00"
  },
  {
    id: 3,
    nome: "Relatórios Gerenciais",
    descricao: "Dashboards e relatórios executivos",
    status: "ativo",
    icone: "BarChart3",
    ultimaAtualizacao: "2025-05-31T09:15:00"
  },
  {
    id: 4,
    nome: "Configurações do Sistema",
    descricao: "Parâmetros e configurações gerais",
    status: "manutencao",
    icone: "Settings",
    ultimaAtualizacao: "2025-05-29T14:45:00"
  },
  {
    id: 5,
    nome: "Auditoria e Logs",
    descricao: "Registro de atividades e auditoria",
    status: "ativo",
    icone: "Search",
    ultimaAtualizacao: "2025-05-31T11:00:00"
  },
  {
    id: 6,
    nome: "Gestão de Usuários",
    descricao: "Controle de perfis e permissões",
    status: "ativo",
    icone: "UserCog",
    ultimaAtualizacao: "2025-05-30T16:30:00"
  }
];

// Eventos para o calendário de prazos
export const eventosCalendario = [
  {
    id: 1,
    titulo: "Vencimento de contrato - Serviços de Limpeza",
    data: new Date(2025, 5, 15), // 15/06/2025
    tipo: "vencimento" as const,
    prioridade: "alta" as const,
    espada: 6,
    detalhes: "Contrato nº 045/2023 - Necessário iniciar processo de renovação"
  },
  {
    id: 2,
    titulo: "Prazo final - Parecer Jurídico",
    data: new Date(2025, 5, 10), // 10/06/2025
    tipo: "prazo" as const,
    prioridade: "media" as const,
    espada: 3,
    detalhes: "Parecer sobre aditivo contratual - Secretaria de Educação"
  },
  {
    id: 3,
    titulo: "Sessão de Licitação - Pregão 032/2025",
    data: new Date(2025, 5, 20), // 20/06/2025
    tipo: "evento" as const,
    prioridade: "normal" as const,
    espada: 5,
    detalhes: "Aquisição de materiais de escritório - Modalidade Pregão Eletrônico"
  },
  {
    id: 4,
    titulo: "Publicação - Extrato de Contrato",
    data: new Date(2025, 5, 5), // 05/06/2025
    tipo: "prazo" as const,
    prioridade: "alta" as const,
    espada: 6,
    detalhes: "Publicação obrigatória no DOU - Contrato nº 067/2025"
  },
  {
    id: 5,
    titulo: "Visita Técnica - Obra Escola Municipal",
    data: new Date(2025, 5, 12), // 12/06/2025
    tipo: "evento" as const,
    prioridade: "normal" as const,
    espada: 6,
    detalhes: "Fiscalização de medição - 3ª etapa da obra"
  },
  {
    id: 6,
    titulo: "Audiência Pública - Licitação Grande Porte",
    data: new Date(2025, 5, 25), // 25/06/2025
    tipo: "evento" as const,
    prioridade: "media" as const,
    espada: 5,
    detalhes: "Audiência pública para obras de infraestrutura urbana"
  },
  {
    id: 7,
    titulo: "Prazo de recurso - Licitação 028/2025",
    data: new Date(2025, 5, 8), // 08/06/2025
    tipo: "prazo" as const,
    prioridade: "alta" as const,
    espada: 5,
    detalhes: "Final do prazo para apresentação de recursos administrativos"
  },
  {
    id: 8,
    titulo: "Renovação de Garantia Contratual",
    data: new Date(2025, 5, 18), // 18/06/2025
    tipo: "vencimento" as const,
    prioridade: "media" as const,
    espada: 4,
    detalhes: "Renovação da garantia do contrato de fornecimento de materiais"
  }
];
