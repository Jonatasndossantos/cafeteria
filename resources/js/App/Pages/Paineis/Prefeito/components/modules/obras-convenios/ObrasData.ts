
export const obras = [
  {
    id: 1,
    nome: 'Hospital Municipal - Ampliação',
    valor: 2500000,
    execucaoFisica: 75,
    execucaoFinanceira: 68,
    status: 'Em Andamento',
    prazo: '2024-08-15',
    convenio: 'Federal - MS',
    localizacao: 'Centro',
    tipo: 'Saúde',
    impactoFinanceiro: 'medio' as const,
    impactoLegal: 'baixo' as const,
    ultimaMedicao: {
      data: '2024-05-15',
      valor: 450000
    },
    responsavelTecnico: 'Eng. João Silva',
    valorLiberado: 1700000,
    valorPendente: 800000,
    diasRestantes: 45
  },
  {
    id: 2,
    nome: 'Escola Técnica Municipal',
    valor: 1800000,
    execucaoFisica: 45,
    execucaoFinanceira: 52,
    status: 'Em Andamento',
    prazo: '2024-12-20',
    convenio: 'Estadual - SEE',
    localizacao: 'Zona Norte',
    tipo: 'Educação',
    impactoFinanceiro: 'baixo' as const,
    impactoLegal: 'baixo' as const,
    ultimaMedicao: {
      data: '2024-05-20',
      valor: 320000
    },
    responsavelTecnico: 'Arq. Maria Santos',
    valorLiberado: 936000,
    valorPendente: 864000,
    diasRestantes: 182
  },
  {
    id: 3,
    nome: 'Pavimentação Avenida Principal',
    valor: 950000,
    execucaoFisica: 90,
    execucaoFinanceira: 85,
    status: 'Finalizando',
    prazo: '2024-07-30',
    convenio: 'Municipal',
    localizacao: 'Centro',
    tipo: 'Infraestrutura',
    impactoFinanceiro: 'alto' as const,
    impactoLegal: 'medio' as const,
    ultimaMedicao: {
      data: '2024-05-25',
      valor: 142500
    },
    responsavelTecnico: 'Eng. Carlos Oliveira',
    valorLiberado: 807500,
    valorPendente: 142500,
    diasRestantes: 30
  },
  {
    id: 4,
    nome: 'UBS Jardim Esperança',
    valor: 650000,
    execucaoFisica: 25,
    execucaoFinanceira: 30,
    status: 'Atrasada',
    prazo: '2024-06-15',
    convenio: 'Federal - MS',
    localizacao: 'Zona Sul',
    tipo: 'Saúde',
    impactoFinanceiro: 'alto' as const,
    impactoLegal: 'alto' as const,
    ultimaMedicao: {
      data: '2024-04-10',
      valor: 95000
    },
    responsavelTecnico: 'Eng. Ana Costa',
    valorLiberado: 195000,
    valorPendente: 455000,
    diasRestantes: -15 // Atrasada
  }
];

export const convenios = [
  {
    id: 1,
    nome: 'Mais Médicos',
    objeto: 'Fortalecimento da Atenção Básica de Saúde',
    orgaoConcedente: 'Ministério da Saúde',
    valorTotal: 450000,
    valorLiberado: 369000,
    saldoUtilizar: 81000,
    prazoFinal: '2024-12-31',
    diasRestantes: 95,
    statusConvenio: 'Ativo',
    statusPrestacaoContas: 'Em Andamento',
    obrasVinculadas: ['UBS Jardim Esperança', 'Hospital Municipal']
  },
  {
    id: 2,
    nome: 'PNAE - Merenda Escolar',
    objeto: 'Programa Nacional de Alimentação Escolar',
    orgaoConcedente: 'FNDE',
    valorTotal: 320000,
    valorLiberado: 214400,
    saldoUtilizar: 105600,
    prazoFinal: '2024-07-15',
    diasRestantes: 18,
    statusConvenio: 'Ativo',
    statusPrestacaoContas: 'Pendente',
    obrasVinculadas: ['Escola Técnica Municipal']
  },
  {
    id: 3,
    nome: 'Esporte e Lazer da Cidade',
    objeto: 'Infraestrutura esportiva e de lazer',
    orgaoConcedente: 'Ministério do Esporte',
    valorTotal: 180000,
    valorLiberado: 27000,
    saldoUtilizar: 153000,
    prazoFinal: '2024-11-15',
    diasRestantes: 75,
    statusConvenio: 'Ativo',
    statusPrestacaoContas: 'Aprovada',
    obrasVinculadas: ['Centro Esportivo Municipal']
  }
];
