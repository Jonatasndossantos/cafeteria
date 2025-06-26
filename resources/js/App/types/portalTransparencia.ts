export interface DocumentoPublico {
  id: string;
  numeroProcesso: string;
  numeroDocumento: string;
  tipo: TipoDocumento;
  nome: string;
  descricao: string;
  dataCriacao: string;
  dataPublicacao: string;
  dataAprovacao?: string;
  objeto: string;
  secretaria: string;
  modalidade: string;
  valor?: number;
  status: StatusDocumento;
  espada: number;
  origem: OrigemDocumento;
  autenticidade: AutenticidadeDocumento;
  assinaturas: AssinaturaDocumento[];
  documentosRelacionados: string[];
  tags: string[];
  urlVisualizacao: string;
  urlDownload: string;
  versao: string;
  hash: string;
  tempoPublicacao: number; // dias entre criação e publicação
  setor_id?: string;
}

export type TipoDocumento = 
  | 'DFD' | 'ETP' | 'TR' | 'Matriz de Risco' | 'Parecer Jurídico'
  | 'Edital' | 'Publicação' | 'Esclarecimento' | 'Impugnação' | 'Ata'
  | 'Contrato' | 'Aditivo' | 'Apostilamento' | 'Ordem de Serviço'
  | 'Relatório' | 'Notificação';

export type StatusDocumento = 
  | 'Em andamento' | 'em andamento' | 'Concluído' | 'concluido' | 'Publicado' | 'Vigente' 
  | 'Suspenso' | 'Cancelado' | 'Arquivado' | 'Próximo ao Vencimento';

export type OrigemDocumento = 
  | 'Criado na LUMEN' | 'Importado' | 'Sincronizado via integração';

export interface AutenticidadeDocumento {
  nivel: 'Válida' | 'Parcial' | 'Pendente' | 'Inválida';
  assinaturaDigital: boolean;
  certificadoICP: boolean;
  hashVerificado: boolean;
  dataVerificacao: string;
}

export interface AssinaturaDocumento {
  nome: string;
  cargo: string;
  data: string;
  tipo: 'Digital' | 'Gov.br' | 'Física';
  valida: boolean;
}

export interface SeloTransparencia {
  nivel: 'Verde' | 'Amarelo' | 'Vermelho';
  percentual: number;
  criteriosAtendidos: string[];
  criteriosPendentes: string[];
  idVerificacao: string;
  dataVerificacao: string;
}

export interface FiltrosPortal {
  periodo: {
    inicio: string;
    fim: string;
  };
  tipoDocumento: TipoDocumento | 'Todos';
  modalidade: string;
  tipo: string;
  objeto: string;
  secretaria: string;
  status: StatusDocumento | 'Todos';
  espada: number | 'Todas';
  origem: OrigemDocumento | 'Todas';
  statusAutenticacao: 'Todos' | 'Assinado' | 'Pendente' | 'Inválido';
  valorMin?: number;
  valorMax?: number;
  fornecedor?: string;
  numeroProcesso?: string;
  numeroDocumento?: string;
  busca: string;
  tags: string[];
  setor_id?: string;
}

export type VisualizacaoTipo = 'Tabela' | 'Cards' | 'Linha do Tempo' | 'Árvore' | 'Fluxo';

export interface ProcessoCompleto {
  numeroProcesso: string;
  objeto: string;
  secretaria: string;
  valor: number;
  status: StatusDocumento;
  seloTransparencia: SeloTransparencia;
  documentos: DocumentoPublico[];
  espadas: EspadaProcesso[];
}

export interface EspadaProcesso {
  numero: number;
  nome: string;
  descricao: string;
  concluida: boolean;
  documentos: DocumentoPublico[];
}

export interface MetricasTransparencia {
  totalDocumentos: number;
  totalProcessos: number;
  processoCompletosPorcentual: number;
  tempoMedioPublicacao: number;
  documentosAssinadosDigitalmente: number;
  distribuicaoModalidade: { modalidade: string; quantidade: number }[];
  distribuicaoSecretaria: { secretaria: string; valor: number }[];
  evolutivoPublicacoes: { mes: string; quantidade: number }[];
}
