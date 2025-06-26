
import { Cotacao, PrecoCotado, KPICotacao, ChecklistItem, AlertaCotacao, Evidencia } from '@/types/cotacoes';

export const kpisCotacoes: KPICotacao[] = [
  {
    titulo: 'Cotações Ativas',
    valor: 23,
    variacao: 12,
    tendencia: 'alta',
    cor: 'text-blue-600',
    icone: '📋',
    meta: 30
  },
  {
    titulo: 'Pendentes Validação',
    valor: 8,
    variacao: -15,
    tendencia: 'baixa',
    cor: 'text-yellow-600',
    icone: '⏳',
    meta: 5
  },
  {
    titulo: 'Aprovadas (Mês)',
    valor: 47,
    variacao: 8,
    tendencia: 'alta',
    cor: 'text-green-600',
    icone: '✅'
  },
  {
    titulo: 'Economia Gerada',
    valor: 'R$ 234.567',
    variacao: 23,
    tendencia: 'alta',
    cor: 'text-emerald-600',
    icone: '💰'
  },
  {
    titulo: 'Tempo Médio',
    valor: '3,2 dias',
    variacao: -18,
    tendencia: 'baixa',
    cor: 'text-purple-600',
    icone: '⏱️'
  },
  {
    titulo: 'Conformidade',
    valor: '94%',
    variacao: 2,
    tendencia: 'alta',
    cor: 'text-indigo-600',
    icone: '🛡️',
    meta: 95
  }
];

export const cotacoes: Cotacao[] = [
  {
    id: '1',
    numero: 'COT-2024-001',
    objeto: 'Notebooks para Secretaria',
    descricao: 'Aquisição de 50 notebooks para modernização do parque tecnológico',
    tipoObjeto: 'ti',
    status: 'pendente_validacao',
    responsavel: 'João Silva',
    dataCriacao: '2024-01-15',
    dataUltimaAtualizacao: '2024-01-20',
    precoReferencia: 2500.00,
    economia: 12500.00,
    conformidade: 95,
    prazoExpiracao: '2024-02-15',
    workflow: {
      etapaAtual: 'Validação Final',
      revisor: 'Maria Santos',
      comentarios: ['Documentação completa', 'Verificar especificações técnicas'],
      historico: [
        {
          data: '2024-01-15',
          acao: 'Criação',
          usuario: 'João Silva'
        },
        {
          data: '2024-01-18',
          acao: 'Submissão para Revisão',
          usuario: 'João Silva',
          comentario: 'Pesquisa concluída com 8 fontes válidas'
        }
      ]
    }
  },
  {
    id: '2',
    numero: 'COT-2024-002',
    objeto: 'Serviços de Limpeza',
    descricao: 'Contratação de empresa para limpeza predial',
    tipoObjeto: 'servico',
    status: 'elaboracao',
    responsavel: 'Ana Costa',
    dataCriacao: '2024-01-22',
    dataUltimaAtualizacao: '2024-01-22',
    conformidade: 60,
    workflow: {
      etapaAtual: 'Coleta de Preços',
      comentarios: [],
      historico: [
        {
          data: '2024-01-22',
          acao: 'Criação',
          usuario: 'Ana Costa'
        }
      ]
    }
  }
];

export const precosCotados: PrecoCotado[] = [
  {
    id: '1',
    cotacaoId: '1',
    fonte: 'PNCP - Contrato Similar',
    tipoFonte: 'pncp',
    valor: 2450.00,
    data: '2024-01-18',
    especificacao: 'Notebook Intel i5, 8GB RAM, SSD 256GB',
    evidencia: 'https://pncp.gov.br/contrato/123456',
    valido: true
  },
  {
    id: '2',
    cotacaoId: '1',
    fonte: 'Compras.gov - Ata Vigente',
    tipoFonte: 'compras_gov',
    valor: 2380.00,
    data: '2024-01-19',
    especificacao: 'Notebook Intel i5, 8GB RAM, SSD 256GB',
    evidencia: 'https://comprasnet.gov.br/ata/789012',
    valido: true
  },
  {
    id: '3',
    cotacaoId: '1',
    fonte: 'Fornecedor Local - Cotação',
    tipoFonte: 'manual',
    valor: 2650.00,
    data: '2024-01-20',
    especificacao: 'Notebook Intel i5, 8GB RAM, SSD 256GB',
    evidencia: 'proposta_fornecedor_a.pdf',
    valido: true
  },
  {
    id: '4',
    cotacaoId: '1',
    fonte: 'Loja Online - Consulta',
    tipoFonte: 'manual',
    valor: 2950.00,
    data: '2024-01-20',
    especificacao: 'Notebook Intel i5, 8GB RAM, SSD 256GB',
    evidencia: 'print_loja_online.png',
    valido: false,
    observacoes: 'Preço muito acima da média - possível outlier'
  }
];

export const checklistConformidade: ChecklistItem[] = [
  {
    id: '1',
    descricao: 'Mínimo de 3 fontes válidas coletadas',
    obrigatorio: true,
    concluido: true,
    tiposObjeto: ['bem', 'servico', 'ti', 'obra']
  },
  {
    id: '2',
    descricao: 'Diversidade de fontes (pelo menos 2 tipos diferentes)',
    obrigatorio: true,
    concluido: true,
    tiposObjeto: ['bem', 'servico', 'ti', 'obra']
  },
  {
    id: '3',
    descricao: 'Cotações com validade inferior a 90 dias',
    obrigatorio: true,
    concluido: true,
    tiposObjeto: ['bem', 'servico', 'ti']
  },
  {
    id: '4',
    descricao: 'Especificações técnicas compatíveis',
    obrigatorio: true,
    concluido: true,
    tiposObjeto: ['bem', 'ti', 'obra']
  },
  {
    id: '5',
    descricao: 'Coeficiente de variação inferior a 30%',
    obrigatorio: false,
    concluido: false,
    observacao: 'CV atual: 8.5% - Dentro do limite recomendado',
    tiposObjeto: ['bem', 'servico', 'ti', 'obra']
  },
  {
    id: '6',
    descricao: 'Justificativa para exclusão de outliers',
    obrigatorio: true,
    concluido: true,
    observacao: 'Outlier identificado e justificado',
    tiposObjeto: ['bem', 'servico', 'ti', 'obra']
  }
];

export const alertasCotacoes: AlertaCotacao[] = [
  {
    id: '1',
    tipo: 'prazo',
    titulo: 'Cotação próxima do vencimento',
    descricao: 'COT-2024-001 vence em 5 dias',
    criticidade: 'media',
    cotacaoId: '1',
    dataIdentificacao: '2024-01-20',
    status: 'ativo'
  },
  {
    id: '2',
    tipo: 'anomalia',
    titulo: 'Outlier detectado',
    descricao: 'Preço 20% acima da média identificado em COT-2024-001',
    criticidade: 'baixa',
    cotacaoId: '1',
    dataIdentificacao: '2024-01-20',
    status: 'resolvido'
  }
];

export const evidencias: Evidencia[] = [
  {
    id: '1',
    nome: 'Proposta Fornecedor A',
    tipo: 'pdf',
    url: '/evidencias/proposta_fornecedor_a.pdf',
    dataUpload: '2024-01-20',
    tamanho: 1024000,
    fonte: 'Fornecedor Local'
  },
  {
    id: '2',
    nome: 'Print Loja Online',
    tipo: 'image',
    url: '/evidencias/print_loja_online.png',
    dataUpload: '2024-01-20',
    tamanho: 512000,
    fonte: 'Loja Online'
  }
];

// Funções auxiliares para cálculos estatísticos
export const calcularEstatisticas = (precos: number[]) => {
  if (precos.length === 0) return null;
  
  const sorted = [...precos].sort((a, b) => a - b);
  const n = sorted.length;
  
  const media = precos.reduce((sum, price) => sum + price, 0) / n;
  const mediana = n % 2 === 0 
    ? (sorted[n/2 - 1] + sorted[n/2]) / 2 
    : sorted[Math.floor(n/2)];
  
  const variancia = precos.reduce((sum, price) => sum + Math.pow(price - media, 2), 0) / n;
  const desvioPadrao = Math.sqrt(variancia);
  const coeficienteVariacao = (desvioPadrao / media) * 100;
  
  const q1 = sorted[Math.floor(n * 0.25)];
  const q3 = sorted[Math.floor(n * 0.75)];
  
  return {
    media,
    mediana,
    desvioPadrao,
    coeficienteVariacao,
    minimo: sorted[0],
    maximo: sorted[n - 1],
    quartis: {
      q1,
      q2: mediana,
      q3
    }
  };
};
