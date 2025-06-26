
import { 
  KPICard, 
  AlertaItem, 
  EixoIEGM, 
  RepasseItem, 
  ConvenioItem, 
  ObraItem, 
  SecretariaDesempenho, 
  MetaEstrategica, 
  LimitesFiscais 
} from '@/types/painelPrefeito';

export const kpisCriticos: KPICard[] = [
  {
    titulo: "Saúde Fiscal",
    valor: "B+",
    variacao: 2.5,
    tendencia: "alta"
  },
  {
    titulo: "Execução Orçamentária",
    valor: 87.3,
    variacao: -1.2,
    tendencia: "baixa",
    unidade: "%"
  },
  {
    titulo: "IEGM Geral",
    valor: "A-",
    variacao: 0,
    tendencia: "estavel"
  },
  {
    titulo: "Obras em Andamento",
    valor: 23,
    variacao: 3,
    tendencia: "alta"
  },
  {
    titulo: "Alertas Urgentes",
    valor: 5,
    variacao: -2,
    tendencia: "baixa"
  }
];

export const alertasPrioritarios: AlertaItem[] = [
  {
    id: "1",
    prioridade: "alta",
    titulo: "Limite de Pessoal se aproximando",
    descricao: "Gastos com pessoal atingiram 52% da RCL",
    origem: "Fiscal",
    data: "2025-06-02",
    status: "pendente"
  },
  {
    id: "2",
    prioridade: "media",
    titulo: "Obra atrasada - UBS Centro",
    descricao: "Execução física 15 dias atrasada",
    origem: "Obras",
    data: "2025-06-01",
    status: "pendente"
  },
  {
    id: "3",
    prioridade: "baixa",
    titulo: "Prestação de contas pendente",
    descricao: "Convênio FNDE aguarda documentação",
    origem: "Convênios",
    data: "2025-05-30",
    status: "lido"
  }
];

export const eixosIEGM: EixoIEGM[] = [
  {
    nome: "i-Planejamento",
    notaAtual: "A",
    notaAnterior: "B+",
    variacao: 0.3,
    status: "melhorou",
    indicadores: [
      { nome: "Existência de PPA", valor: 100, meta: 100, peso: 2 },
      { nome: "Existência de LDO", valor: 100, meta: 100, peso: 2 },
      { nome: "Existência de LOA", valor: 100, meta: 100, peso: 2 }
    ]
  },
  {
    nome: "i-Fiscal",
    notaAtual: "B+",
    notaAnterior: "B",
    variacao: 0.2,
    status: "melhorou",
    indicadores: [
      { nome: "Limite de Pessoal", valor: 52, meta: 54, peso: 3 },
      { nome: "Limite de Dívida", valor: 15, meta: 120, peso: 3 }
    ]
  },
  {
    nome: "i-Previdência",
    notaAtual: "A-",
    notaAnterior: "A-",
    variacao: 0,
    status: "estavel",
    indicadores: [
      { nome: "Regime Próprio Estruturado", valor: 85, meta: 100, peso: 2 }
    ]
  },
  {
    nome: "i-Transparência",
    notaAtual: "A+",
    notaAnterior: "A",
    variacao: 0.1,
    status: "melhorou",
    indicadores: [
      { nome: "Portal da Transparência", valor: 95, meta: 100, peso: 2 },
      { nome: "Dados Abertos", valor: 90, meta: 100, peso: 1 }
    ]
  },
  {
    nome: "i-Gestão de Pessoas",
    notaAtual: "B",
    notaAnterior: "B-",
    variacao: 0.15,
    status: "melhorou",
    indicadores: [
      { nome: "Plano de Carreira", valor: 70, meta: 100, peso: 2 }
    ]
  },
  {
    nome: "i-Governança de TI",
    notaAtual: "C+",
    notaAnterior: "C",
    variacao: 0.1,
    status: "melhorou",
    indicadores: [
      { nome: "Plano Diretor de TI", valor: 45, meta: 100, peso: 3 }
    ]
  },
  {
    nome: "i-Meio Ambiente",
    notaAtual: "B+",
    notaAnterior: "B+",
    variacao: 0,
    status: "estavel",
    indicadores: [
      { nome: "Política Ambiental", valor: 80, meta: 100, peso: 2 }
    ]
  }
];

export const repasses: RepasseItem[] = [
  {
    data: "2025-06-01",
    fonte: "FPM",
    valorRecebido: 1250000,
    valorPrevisto: 1280000,
    status: "no_prazo"
  },
  {
    data: "2025-05-28",
    fonte: "ICMS",
    valorRecebido: 890000,
    valorPrevisto: 920000,
    status: "no_prazo"
  },
  {
    data: "2025-05-25",
    fonte: "FUNDEB",
    valorRecebido: 2100000,
    valorPrevisto: 2100000,
    status: "no_prazo"
  },
  {
    data: "2025-05-20",
    fonte: "SUS",
    valorRecebido: 450000,
    valorPrevisto: 500000,
    status: "atrasado"
  }
];

export const convenios: ConvenioItem[] = [
  {
    nome: "Pavimentação Asfáltica - FNDE",
    valorTotal: 2500000,
    saldoReceber: 750000,
    proximaParcela: {
      data: "2025-07-15",
      valor: 375000
    },
    statusPrestacao: "em_dia"
  },
  {
    nome: "Equipamentos UBS - Ministério da Saúde",
    valorTotal: 800000,
    saldoReceber: 400000,
    proximaParcela: {
      data: "2025-06-30",
      valor: 400000
    },
    statusPrestacao: "pendente"
  }
];

export const obras: ObraItem[] = [
  {
    id: "1",
    nome: "UBS do Centro",
    status: "execucao",
    percentualFisico: 68,
    percentualFinanceiro: 72,
    prazoFinal: "2025-08-30",
    valorTotal: 850000,
    secretaria: "Saúde",
    coordenadas: [-23.5505, -46.6333]
  },
  {
    id: "2",
    nome: "Pavimentação Rua das Flores",
    status: "licitacao",
    percentualFisico: 0,
    percentualFinanceiro: 15,
    prazoFinal: "2025-12-15",
    valorTotal: 1200000,
    secretaria: "Obras",
    coordenadas: [-23.5515, -46.6343]
  },
  {
    id: "3",
    nome: "Escola Municipal Norte",
    status: "concluida",
    percentualFisico: 100,
    percentualFinanceiro: 100,
    prazoFinal: "2025-03-30",
    valorTotal: 2100000,
    secretaria: "Educação",
    coordenadas: [-23.5495, -46.6323]
  }
];

export const secretariasDesempenho: SecretariaDesempenho[] = [
  {
    nome: "Secretaria de Saúde",
    notaDesempenho: 8.5,
    execucaoOrcamentaria: 89,
    projetosConcluidos: 75,
    satisfacaoCidada: 82,
    alertasAtivos: 2
  },
  {
    nome: "Secretaria de Educação",
    notaDesempenho: 9.1,
    execucaoOrcamentaria: 94,
    projetosConcluidos: 88,
    satisfacaoCidada: 87,
    alertasAtivos: 1
  },
  {
    nome: "Secretaria de Obras",
    notaDesempenho: 7.2,
    execucaoOrcamentaria: 78,
    projetosConcluidos: 65,
    satisfacaoCidada: 73,
    alertasAtivos: 4
  },
  {
    nome: "Secretaria de Assistência Social",
    notaDesempenho: 8.8,
    execucaoOrcamentaria: 91,
    projetosConcluidos: 82,
    satisfacaoCidada: 85,
    alertasAtivos: 1
  }
];

export const metasEstrategicas: MetaEstrategica[] = [
  {
    id: "1",
    titulo: "Digitalização de 100% dos processos",
    descricao: "Implementar sistema digital para todos os processos administrativos",
    responsavel: "Sec. Administração",
    prazo: "2025-12-31",
    progresso: 65,
    status: "em_andamento",
    areaEstrategica: "Modernização"
  },
  {
    id: "2",
    titulo: "Construir 3 novas UBS",
    descricao: "Ampliar cobertura de saúde com novas unidades básicas",
    responsavel: "Sec. Saúde",
    prazo: "2025-10-15",
    progresso: 40,
    status: "em_andamento",
    areaEstrategica: "Saúde"
  },
  {
    id: "3",
    titulo: "Reduzir tempo de licitações em 30%",
    descricao: "Otimizar processos licitatórios",
    responsavel: "Sec. Administração",
    prazo: "2025-09-30",
    progresso: 80,
    status: "em_andamento",
    areaEstrategica: "Eficiência"
  }
];

export const limitesFiscais: LimitesFiscais = {
  pessoal: {
    atual: 52.0,
    limite: 54.0,
    limitePrudencial: 51.3
  },
  divida: {
    atual: 15.2,
    limite: 120.0,
    limitePrudencial: 114.0
  },
  educacao: {
    atual: 27.8,
    limite: 25.0
  },
  saude: {
    atual: 18.5,
    limite: 15.0
  }
};

export const obrigacoesFiscais = [
  {
    data: "2025-06-15",
    nome: "RREO 1º Bimestre",
    status: "pendente"
  },
  {
    data: "2025-06-30",
    nome: "RGF 1º Quadrimestre",
    status: "pendente"
  },
  {
    data: "2025-05-30",
    nome: "SICONFI Maio",
    status: "enviado"
  }
];
