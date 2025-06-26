
import { KPIFiscal, LimiteLRF, ProcessoLicitatorio, ContratoVigente, ObrigacaoFiscal, IndicadorDesempenho, FolhaPagamento, AlertaFiscal } from '@/types/administracao';

export const kpisFiscais: KPIFiscal[] = [
  {
    titulo: 'Resultado Primário',
    valor: 2500000,
    variacao: 5,
    tendencia: 'alta',
    unidade: 'R$',
    meta: 2000000,
    tipo: 'moeda',
    criticidade: 'normal'
  },
  {
    titulo: 'Resultado Nominal',
    valor: -1200000,
    variacao: -3,
    tendencia: 'baixa',
    unidade: 'R$',
    meta: -1500000,
    tipo: 'moeda',
    criticidade: 'normal'
  },
  {
    titulo: 'Disponibilidade de Caixa',
    valor: 8700000,
    variacao: 12,
    tendencia: 'alta',
    unidade: 'R$',
    tipo: 'moeda',
    criticidade: 'normal'
  },
  {
    titulo: 'Índice de Endividamento',
    valor: 42,
    variacao: -2,
    tendencia: 'baixa',
    unidade: '%',
    meta: 120,
    tipo: 'percentual',
    criticidade: 'normal'
  }
];

export const limitesLRF: LimiteLRF[] = [
  {
    nome: 'Despesa com Pessoal',
    valorAtual: 26775000,
    limite: 54000000,
    limitePrudencial: 48600000,
    percentualAtual: 48.5,
    status: 'alerta'
  },
  {
    nome: 'Dívida Consolidada',
    valorAtual: 39240000,
    limite: 120000000,
    limitePrudencial: 108000000,
    percentualAtual: 32.7,
    status: 'normal'
  },
  {
    nome: 'Operações de Crédito',
    valorAtual: 8320000,
    limite: 16000000,
    limitePrudencial: 14400000,
    percentualAtual: 5.2,
    status: 'normal'
  },
  {
    nome: 'Garantias',
    valorAtual: 4960000,
    limite: 22000000,
    limitePrudencial: 19800000,
    percentualAtual: 3.1,
    status: 'normal'
  }
];

export const processosLicitatorios: ProcessoLicitatorio[] = [
  {
    numero: '001/2025',
    objeto: 'Aquisição de Equipamentos de Informática',
    modalidade: 'Pregão Eletrônico',
    valorEstimado: 1200000,
    fase: 'Adjudicação',
    secretaria: 'Administração',
    prazo: '2025-07-15',
    status: 'em_andamento'
  },
  {
    numero: '002/2025',
    objeto: 'Contratação de Serviços de Limpeza',
    modalidade: 'Concorrência',
    valorEstimado: 3500000,
    fase: 'Habilitação',
    secretaria: 'Administração',
    prazo: '2025-08-20',
    status: 'em_andamento'
  },
  {
    numero: '003/2025',
    objeto: 'Execução de Obras de Pavimentação',
    modalidade: 'Tomada de Preços',
    valorEstimado: 2800000,
    fase: 'Julgamento',
    secretaria: 'Obras',
    prazo: '2025-09-10',
    status: 'em_andamento'
  }
];

export const contratosVigentes: ContratoVigente[] = [
  {
    numero: '045/2024',
    fornecedor: 'Empresa Alpha Ltda',
    objeto: 'Fornecimento de Material de Escritório',
    valorTotal: 850000,
    valorExecutado: 612000,
    prazoVencimento: '2025-12-31',
    temAditivos: true,
    situacao: 'vigente'
  },
  {
    numero: '067/2024',
    fornecedor: 'Beta Serviços S.A.',
    objeto: 'Manutenção de Veículos',
    valorTotal: 620000,
    valorExecutado: 445000,
    prazoVencimento: '2025-08-15',
    temAditivos: false,
    situacao: 'vigente'
  },
  {
    numero: '089/2024',
    fornecedor: 'Gamma Construções',
    objeto: 'Reforma do Prédio da Prefeitura',
    valorTotal: 480000,
    valorExecutado: 432000,
    prazoVencimento: '2025-07-20',
    temAditivos: true,
    situacao: 'vigente'
  }
];

export const obrigacoesFiscais: ObrigacaoFiscal[] = [
  {
    nome: 'SIOPS - Sistema de Informações sobre Orçamentos Públicos em Saúde',
    tipo: 'declaracao',
    prazo: '2025-07-05',
    diasRestantes: 0,
    status: 'vencido',
    responsavel: 'Maria Silva',
    criticidade: 'alta'
  },
  {
    nome: 'RREO - Relatório Resumido da Execução Orçamentária - 3º Bimestre',
    tipo: 'relatorio',
    prazo: '2025-07-30',
    diasRestantes: 25,
    status: 'pendente',
    responsavel: 'João Santos',
    criticidade: 'media'
  },
  {
    nome: 'SICONFI - Sistema de Informações Contábeis e Fiscais',
    tipo: 'declaracao',
    prazo: '2025-07-15',
    diasRestantes: 10,
    status: 'em_andamento',
    responsavel: 'Ana Costa',
    criticidade: 'media'
  }
];

export const indicadoresDesempenho: IndicadorDesempenho[] = [
  {
    nome: 'Execução Orçamentária',
    valorAtual: 92,
    meta: 90,
    unidade: '%',
    tendencia: 'crescendo',
    categoria: 'financeiro'
  },
  {
    nome: 'Arrecadação Própria',
    valorAtual: 95,
    meta: 100,
    unidade: '%',
    tendencia: 'decrescendo',
    categoria: 'financeiro'
  },
  {
    nome: 'Tempo Médio de Empenho',
    valorAtual: 3.2,
    meta: 5,
    unidade: 'dias',
    tendencia: 'decrescendo',
    categoria: 'prazo'
  },
  {
    nome: 'Economia em Licitações',
    valorAtual: 12,
    meta: 10,
    unidade: '%',
    tendencia: 'crescendo',
    categoria: 'operacional'
  }
];

export const folhaPagamento: FolhaPagamento[] = [
  {
    tipoVinculo: 'Efetivos',
    valorAtual: 18500000,
    mesAnterior: 18300000,
    anoAnterior: 17200000,
    quantidade: 2850
  },
  {
    tipoVinculo: 'Comissionados',
    valorAtual: 3200000,
    mesAnterior: 3150000,
    anoAnterior: 2950000,
    quantidade: 215
  },
  {
    tipoVinculo: 'Temporários',
    valorAtual: 1800000,
    mesAnterior: 1750000,
    anoAnterior: 1600000,
    quantidade: 180
  }
];

export const alertasFiscais: AlertaFiscal[] = [
  {
    id: '001',
    tipo: 'fiscal',
    titulo: 'Limite de Pessoal em 92% do prudencial',
    descricao: 'A despesa com pessoal atingiu 48,5% da RCL, representando 92% do limite prudencial (51,3%)',
    criticidade: 'critica',
    dataIdentificacao: '2025-07-03',
    acaoRecomendada: 'Revisar contratações planejadas e avaliar possibilidade de contenção',
    status: 'ativo'
  },
  {
    id: '002',
    tipo: 'tributario',
    titulo: 'Queda de 15% na arrecadação de ISS',
    descricao: 'A arrecadação do ISS apresentou queda de 15% em relação ao mesmo período do ano anterior',
    criticidade: 'alta',
    dataIdentificacao: '2025-07-02',
    acaoRecomendada: 'Analisar maiores contribuintes e intensificar fiscalização',
    status: 'ativo'
  },
  {
    id: '003',
    tipo: 'prazos',
    titulo: 'SIOPS vence hoje',
    descricao: 'O prazo para envio do SIOPS vence hoje e ainda não foi iniciado',
    criticidade: 'critica',
    dataIdentificacao: '2025-07-05',
    acaoRecomendada: 'Iniciar preenchimento imediatamente',
    status: 'ativo'
  }
];
