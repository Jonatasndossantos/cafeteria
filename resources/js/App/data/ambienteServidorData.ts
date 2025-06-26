import { Usuario, Demanda, Contrato, AlertaLux, Conversa } from '../types/ambienteServidor';

export const usuario: Usuario = {
  nome: 'João Silva',
  cargo: 'Fiscal',
  setor: 'Educação'
};

export const demandas: Demanda[] = [
  {
    id: 'ETP-09/2025',
    tipo: 'Planejamento',
    prazo: '05/06/2025',
    status: 'Pendente'
  },
  {
    id: 'Contrato-123/2024',
    tipo: 'Fiscalização',
    prazo: 'Vigente',
    status: 'Em acompanhamento'
  }
];

export const contratos: Contrato[] = [
  {
    id: '123/2024',
    objeto: 'Serviços de limpeza escolar',
    fornecedor: 'Limpeza Total Ltda',
    vigencia: '31/12/2025',
    valor: 'R$ 240.000,00',
    status: 'Vigente'
  },
  {
    id: '087/2024',
    objeto: 'Fornecimento de medicamentos',
    fornecedor: 'Farmácia Central Ltda',
    vigencia: '15/06/2025',
    valor: 'R$ 180.000,00',
    status: 'Próximo ao vencimento'
  },
  {
    id: '045/2023',
    objeto: 'Serviços de manutenção predial',
    fornecedor: 'Construções e Reformas SA',
    vigencia: '31/03/2025',
    valor: 'R$ 95.000,00',
    status: 'Encerrado'
  },
  {
    id: '156/2024',
    objeto: 'Material de escritório',
    fornecedor: 'Papelaria Comercial',
    vigencia: '10/06/2025',
    valor: 'R$ 25.000,00',
    status: 'Próximo ao vencimento'
  }
];

export const alertasLux: AlertaLux[] = [
  {
    id: 1,
    tipo: 'Prazo',
    descricao: 'Ateste de nota fiscal pendente - vence em 2 dias',
    contrato: '087/2024',
    data: '02/06/2025',
    severidade: 'alta'
  }
];

export const conversas: Conversa[] = [
  {
    id: 1,
    setor: 'Saúde',
    assunto: 'Planejamento ETP-09/2025 - Medicamentos',
    ultimaMensagem: 'Precisamos revisar as especificações técnicas dos medicamentos...',
    dataUltimaMensagem: '02/06/2025 14:30',
    naoLidas: 2,
    espada: 1,
    mensagens: [
      {
        id: 1,
        remetente: 'Maria Santos',
        setor: 'Saúde',
        conteudo: 'Olá, precisamos revisar as especificações técnicas dos medicamentos para o ETP-09/2025.',
        data: '02/06/2025 10:15',
        lida: true
      },
      {
        id: 2,
        remetente: 'João Silva',
        setor: 'Educação',
        conteudo: 'Entendi. Vou analisar as especificações e retorno em breve.',
        data: '02/06/2025 10:45',
        lida: true
      },
      {
        id: 3,
        remetente: 'Maria Santos',
        setor: 'Saúde',
        conteudo: 'Ótimo! Também precisamos definir os critérios de qualidade.',
        data: '02/06/2025 14:30',
        lida: false
      }
    ]
  },
  {
    id: 2,
    setor: 'Administração',
    assunto: 'Contrato 123/2024 - Documentação',
    ultimaMensagem: 'Documentos enviados para análise...',
    dataUltimaMensagem: '01/06/2025 16:20',
    naoLidas: 0,
    espada: 6,
    mensagens: [
      {
        id: 1,
        remetente: 'Carlos Lima',
        setor: 'Administração',
        conteudo: 'Documentos do contrato 123/2024 enviados para análise.',
        data: '01/06/2025 16:20',
        lida: true
      }
    ]
  }
];

export const setores: string[] = [
  'Administração',
  'Saúde',
  'Educação',
  'Obras',
  'Meio Ambiente',
  'Assistência Social',
  'Cultura',
  'Esporte'
];
