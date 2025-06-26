
// Mock data específico para o dashboard
export const espadas = [
  {
    id: 1,
    nome: "Planejamento e Demandas",
    status: "ativo",
    ultimaMovimentacao: "2025-05-30T14:30:00",
    documentosEmAndamento: 3,
    icone: "planejamento",
    descricao: "Abre os documentos/modelos do pilar"
  },
  {
    id: 2,
    nome: "Estratégia de Contratação",
    status: "atencao",
    ultimaMovimentacao: "2025-05-29T10:15:00",
    documentosEmAndamento: 2,
    icone: "contratacao",
    descricao: "Mostra fluxos e critérios específicos"
  },
  {
    id: 3,
    nome: "Termo de Referência",
    status: "critico",
    ultimaMovimentacao: "2025-05-31T09:45:00",
    documentosEmAndamento: 5,
    icone: "licitacao",
    descricao: "Acessa modalidades e checklists"
  },
  {
    id: 4,
    nome: "Matriz de Riscos",
    status: "ativo",
    ultimaMovimentacao: "2025-05-28T16:20:00",
    documentosEmAndamento: 1,
    icone: "gestao",
    descricao: "Exibe contratos, vigência, aditivos"
  },
  {
    id: 5,
    nome: "Edital e Publicidade",
    status: "ativo",
    ultimaMovimentacao: "2025-05-27T11:30:00",
    documentosEmAndamento: 4,
    icone: "fiscalizacao",
    descricao: "Painel de acompanhamento"
  },
  {
    id: 6,
    nome: "Contrato e Execução",
    status: "atencao",
    ultimaMovimentacao: "2025-05-31T08:00:00",
    documentosEmAndamento: 7,
    icone: "sancoes",
    descricao: "Guia de condutas e penalidades"
  },
  {
    id: 7,
    nome: "Penalidades e Responsabilização",
    status: "ativo",
    ultimaMovimentacao: "2025-05-26T14:10:00",
    documentosEmAndamento: 0,
    icone: "transparencia",
    descricao: "Links e relatórios de acesso público"
  }
];

export const modulos = [
  { id: 'contrato', nome: "Gestão de Contratos", descricao: "Controle e gestão de contratos ativos", icone: "contrato" },
  { id: 'fornecedor', nome: "Portal do Fornecedor", descricao: "Acesso e gestão de fornecedores", icone: "fornecedor" },
  { id: 'relatorio', nome: "Relatórios Gerenciais", descricao: "Relatórios e dashboards analíticos", icone: "relatorio" },
  { id: 'configuracao', nome: "Configurações", descricao: "Configurações e parametrizações", icone: "configuracao" },
  { id: 'auditoria', nome: "Auditoria e Logs", descricao: "Registros de auditoria e atividades", icone: "auditoria" },
  { id: 'usuario', nome: "Gestão de Usuários", descricao: "Controle de usuários e permissões", icone: "usuario" }
];

export const tarefasPrioritarias = [
  {
    id: 1,
    titulo: "Parecer sobre ETP - Secretaria de Saúde",
    descricao: "Análise do Estudo Técnico Preliminar para contratação de equipamentos médicos",
    prioridade: "alta",
    prazo: "2025-06-02T17:00:00",
    espadaId: 1
  },
  {
    id: 2,
    titulo: "Renovação Contrato de Limpeza",
    descricao: "Contrato vence em 15 dias, necessário iniciar processo",
    prioridade: "media",
    prazo: "2025-06-15T23:59:59",
    espadaId: 6
  }
];

export const alertasCriticos = [
  {
    id: 1,
    titulo: "Prazo de diligência vencendo",
    descricao: "TCE solicitou esclarecimentos sobre licitação 001/2025",
    nivel: "critico",
    referencia: "Of. TCE 1234/2025"
  },
  {
    id: 2,
    titulo: "Novo parecer disponível",
    descricao: "Parecer jurídico sobre dispensa de licitação aprovado",
    nivel: "informativo"
  }
];

export const eventosCalendario = [
  {
    id: 1,
    titulo: "Vencimento de contrato - Serviços de Limpeza",
    data: new Date(2025, 5, 15),
    tipo: "vencimento" as const,
    prioridade: "alta" as const,
    espada: 6,
    detalhes: "Contrato nº 045/2023 - Necessário iniciar processo de renovação"
  },
  {
    id: 2,
    titulo: "Prazo final - Parecer Jurídico",
    data: new Date(2025, 5, 10),
    tipo: "prazo" as const,
    prioridade: "media" as const,
    espada: 3,
    detalhes: "Parecer sobre aditivo contratual - Secretaria de Educação"
  },
  {
    id: 3,
    titulo: "Sessão de Licitação - Pregão 032/2025",
    data: new Date(2025, 5, 20),
    tipo: "evento" as const,
    prioridade: "normal" as const,
    espada: 5,
    detalhes: "Aquisição de materiais de escritório - Modalidade Pregão Eletrônico"
  },
  {
    id: 4,
    titulo: "Publicação - Extrato de Contrato",
    data: new Date(2025, 5, 5),
    tipo: "prazo" as const,
    prioridade: "alta" as const,
    espada: 6,
    detalhes: "Publicação obrigatória no DOU - Contrato nº 067/2025"
  },
  {
    id: 5,
    titulo: "Visita Técnica - Obra Escola Municipal",
    data: new Date(2025, 5, 12),
    tipo: "evento" as const,
    prioridade: "normal" as const,
    espada: 6,
    detalhes: "Fiscalização de medição - 3ª etapa da obra"
  },
  {
    id: 6,
    titulo: "Audiência Pública - Licitação Grande Porte",
    data: new Date(2025, 5, 25),
    tipo: "evento" as const,
    prioridade: "media" as const,
    espada: 5,
    detalhes: "Audiência pública para obras de infraestrutura urbana"
  },
  {
    id: 7,
    titulo: "Prazo de recurso - Licitação 028/2025",
    data: new Date(2025, 5, 8),
    tipo: "prazo" as const,
    prioridade: "alta" as const,
    espada: 5,
    detalhes: "Final do prazo para apresentação de recursos administrativos"
  },
  {
    id: 8,
    titulo: "Renovação de Garantia Contratual",
    data: new Date(2025, 5, 18),
    tipo: "vencimento" as const,
    prioridade: "media" as const,
    espada: 4,
    detalhes: "Renovação da garantia do contrato de fornecimento de materiais"
  }
];
