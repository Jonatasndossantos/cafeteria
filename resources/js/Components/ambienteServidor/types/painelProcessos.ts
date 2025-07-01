export interface ProcessoAdministrativo {
  id: number;
  numero: string;
  objeto: string;
  modalidade: string;
  secretaria: string;
  responsavelGestor: string;
  fornecedor?: string;
  valor: number;
  dataInicio: string;
  dataFim: string;
  status: string;
  espadaAtual: number;
  notificacoes: number;
  documentos: DocumentoProcesso[];
}

export interface DocumentoProcesso {
  id: number;
  nome: string;
  status: string;
  tipo: string;
  dataCriacao?: string;
  autor?: string;
  tamanho?: number;
  url?: string;
  assinado?: boolean;
  encaminhado?: boolean;
}

export interface AnexoProcesso {
  id: number;
  nome: string;
  tipo: string;
  tamanho: number;
  dataUpload: string;
  autor: string;
  descricao?: string;
  documentoVinculado?: string;
}

export interface FiltrosProcesso {
  modalidade?: string;
  secretaria?: string;
  espada?: number;
  status?: string;
  dataInicio?: string;
  dataFim?: string;
  valorMin?: number;
  valorMax?: number;
  responsavel?: string;
  fornecedor?: string;
}

export interface StatusEspada {
  status: 'pendente' | 'em andamento' | 'concluido' | 'cancelado';
  dataInicio?: string;
  dataFim?: string;
  responsavel?: string;
  observacoes?: string;
}

export interface Espada {
  numero: number;
  nome: string;
  descricao: string;
  status: StatusEspada;
  documentos: DocumentoProcesso[];
  anexos: AnexoProcesso[];
}

export interface ProcessoCompleto extends ProcessoAdministrativo {
  espadas: Espada[];
  historico: {
    data: string;
    acao: string;
    responsavel: string;
    observacoes?: string;
  }[];
  alertas: {
    tipo: 'warning' | 'error' | 'info';
    mensagem: string;
    data: string;
  }[];
} 