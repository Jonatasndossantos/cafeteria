
export interface ProcessoAdministrativo {
  id: string;
  numero: string; // Formato: PA-ANO/NÚMERO
  objeto: string;
  modalidade: 'Pregão' | 'Dispensa' | 'Concorrência' | 'Inexigibilidade';
  criterio: 'Menor Preço' | 'Técnica e Preço' | 'Maior Lance';
  valor: string;
  valorNumerico: number;
  secretaria: string;
  departamento: string;
  dataInicio: string;
  previsaoConclusao: string;
  status: 'Em Andamento' | 'Próximo ao Vencimento' | 'Concluído' | 'Suspenso';
  espadaAtual: number; // 1-7
  faseAtual: string;
  fornecedor?: string;
  vigenciaAte?: string;
  responsavelGestor: string;
  responsavelFiscal: string;
  autorProcesso: string; // Quem criou o processo
  tags: string[];
  prioridade: 'Alta' | 'Média' | 'Baixa';
  documentos: DocumentoProcesso[];
  espadas: EspadaProcesso[];
  notificacoes: number;
  anexos: AnexoProcesso[];
}

export interface DocumentoProcesso {
  id: string;
  numero: string;
  tipo: TipoDocumento;
  nome: string;
  dataEmissao: string;
  dataAssinatura?: string;
  status: 'Rascunho' | 'Em Análise' | 'Aprovado' | 'Rejeitado' | 'Assinado' | 'Pendente Assinatura';
  responsavel: string;
  autor: string; // Quem criou o documento
  assinaturas: AssinaturaDocumento[];
  arquivo?: string;
  observacoes?: string;
  proximoResponsavel?: string; // Para quem encaminhar
  requerAssinatura: boolean;
  podeSerEncaminhado: boolean;
}

export interface AnexoProcesso {
  id: string;
  processoId: string;
  documentoVinculado?: string; // ID do documento ao qual está anexado
  nome: string;
  tipo: string;
  tamanho: number;
  dataUpload: string;
  responsavelUpload: string;
  arquivo: string;
  descricao?: string;
}

export interface EspadaProcesso {
  numero: number; // 1-7
  nome: string;
  status: 'Não Iniciado' | 'Em Andamento' | 'Concluído' | 'Revisando';
  dataInicio?: string;
  dataConclusao?: string;
  responsavel: string;
  pendencias: boolean;
  documentosVinculados: string[]; // IDs dos documentos
}

export interface AssinaturaDocumento {
  id: string;
  tipo: NivelAssinatura;
  responsavel: string;
  dataAssinatura: string;
  ip?: string;
  metodoAutenticacao: 'Digital' | 'Manuscrita' | 'Token' | 'Gov.br';
  status: 'Pendente' | 'Assinado' | 'Rejeitado';
  observacoes?: string;
}

export interface AcaoDocumento {
  id: string;
  tipo: 'Assinar' | 'Encaminhar' | 'Anexar' | 'Visualizar' | 'Editar' | 'Rejeitar';
  disponivel: boolean;
  motivo?: string; // Por que não está disponível
  proximoResponsavel?: string[];
}

export interface PermissaoUsuario {
  usuarioId: string;
  podeAssinar: boolean;
  nivelAssinatura: NivelAssinatura[];
  podeEncaminhar: boolean;
  podeAnexarDocumentos: boolean;
  podeVisualizarTodos: boolean;
}

export type TipoDocumento = 
  | 'DFD' | 'ETP' | 'TR' | 'MR' | 'Parecer Jurídico' | 'Informação Orçamentária'
  | 'Edital' | 'Ata de Sessão' | 'Relatório de Julgamento' | 'Adjudicação'
  | 'Homologação' | 'Contrato' | 'Aditivo' | 'Apostilamento'
  | 'Ordem de Fornecimento' | 'Nota Fiscal' | 'Relatório de Fiscalização'
  | 'Anexo' | 'Ofício' | 'Memorando';

export type NivelAssinatura = 'Técnica' | 'Jurídica' | 'Administrativa';

export interface FiltrosProcesso {
  modalidade?: string;
  espada?: number;
  fase?: string;
  secretaria?: string;
  periodo?: { inicio: string; fim: string };
  status?: string;
  prioridade?: string;
  responsavel?: string;
  valor?: { min: number; max: number };
}

export interface NotificacaoProcesso {
  id: string;
  processoId: string;
  tipo: 'Vencimento' | 'Pendência' | 'Prazo Crítico' | 'Aprovação' | 'Assinatura' | 'Encaminhamento';
  titulo: string;
  descricao: string;
  data: string;
  lida: boolean;
  prioridade: 'Alta' | 'Média' | 'Baixa';
}
