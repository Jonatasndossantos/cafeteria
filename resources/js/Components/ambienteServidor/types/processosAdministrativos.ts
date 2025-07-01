// Dados mockados para processos administrativos
export const processosAdministrativos = [
  {
    id: 1,
    numero: 'PA-2024/001',
    objeto: 'Aquisição de materiais de limpeza para a cafeteria',
    modalidade: 'Compra Direta',
    secretaria: 'Secretaria de Administração',
    responsavelGestor: 'João Silva',
    fornecedor: 'Empresa ABC Ltda',
    valor: 15000.00,
    dataInicio: '2024-01-15',
    dataFim: '2024-12-31',
    status: 'Em Andamento',
    espadaAtual: 3,
    notificacoes: 2,
    documentos: [
      { id: 1, nome: 'Termo de Referência', status: 'Concluído', tipo: 'Anexo' },
      { id: 2, nome: 'Edital de Licitação', status: 'Em Andamento', tipo: 'Ofício' },
      { id: 3, nome: 'Relatório Técnico', status: 'Pendente', tipo: 'Relatório' }
    ]
  },
  {
    id: 2,
    numero: 'PA-2024/002',
    objeto: 'Contratação de serviços de manutenção de equipamentos',
    modalidade: 'Pregão Eletrônico',
    secretaria: 'Secretaria de Obras',
    responsavelGestor: 'Maria Santos',
    fornecedor: 'Manutenção Express Ltda',
    valor: 45000.00,
    dataInicio: '2024-02-01',
    dataFim: '2024-11-30',
    status: 'Em Andamento',
    espadaAtual: 5,
    notificacoes: 1,
    documentos: [
      { id: 4, nome: 'Projeto Básico', status: 'Concluído', tipo: 'Anexo' },
      { id: 5, nome: 'Contrato', status: 'Em Andamento', tipo: 'Contrato' }
    ]
  },
  {
    id: 3,
    numero: 'PA-2024/003',
    objeto: 'Aquisição de ingredientes alimentares',
    modalidade: 'Compra Programada',
    secretaria: 'Secretaria de Administração',
    responsavelGestor: 'Pedro Costa',
    fornecedor: 'Distribuidora de Alimentos XYZ',
    valor: 25000.00,
    dataInicio: '2024-03-01',
    dataFim: '2024-12-31',
    status: 'Concluído',
    espadaAtual: 7,
    notificacoes: 0,
    documentos: [
      { id: 6, nome: 'Termo de Compra', status: 'Concluído', tipo: 'Contrato' },
      { id: 7, nome: 'Relatório de Recebimento', status: 'Concluído', tipo: 'Relatório' }
    ]
  }
];

export const secretarias = [
  'Secretaria de Administração',
  'Secretaria de Finanças',
  'Secretaria de Planejamento',
  'Secretaria de Obras',
  'Secretaria de Saúde',
  'Secretaria de Educação',
  'Secretaria de Cultura',
  'Secretaria de Esportes',
  'Secretaria de Meio Ambiente',
  'Secretaria de Transportes'
];

export const modalidades = [
  'Compra Direta',
  'Pregão Eletrônico',
  'Pregão Presencial',
  'Concorrência',
  'Concurso',
  'Leilão',
  'Dispensa de Licitação',
  'Inexigibilidade de Licitação',
  'Compra Programada',
  'Contrato com Fornecedor Fixo'
];

export const fasesProcesso = [
  'Identificação da Necessidade',
  'Planejamento',
  'Licitação',
  'Contratação',
  'Execução',
  'Fiscalização',
  'Recebimento',
  'Pagamento',
  'Conclusão'
]; 