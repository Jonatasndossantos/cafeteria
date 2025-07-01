export type VisualizacaoTipo = 'Tabela' | 'Cards' | 'Lista';

export type TipoDocumento = 
  | 'Produtos de Consumo'
  | 'Ingredientes Alimentares'
  | 'Materiais de Limpeza e Higiene'
  | 'Equipamentos e Utensílios'
  | 'Serviços'
  | 'Materiais Administrativos';

export type StatusDocumento = 'Em andamento' | 'Concluído' | 'Cancelado' | 'Suspenso';

export type OrigemDocumento = 'Criado na LUMEN' | 'Importado' | 'Sistema Externo';

export interface Autenticidade {
  nivel: 'Válida' | 'Parcial' | 'Pendente' | 'Inválida';
  assinaturaDigital: boolean;
  certificadoICP?: boolean;
  hashVerificado?: boolean;
  dataVerificacao?: string;
}

export interface Assinatura {
  nome: string;
  cargo: string;
  data: string;
  certificado: string;
}

export interface DocumentoRelacionado {
  id: string;
  numero: string;
  tipo: string;
  url: string;
}

export interface DocumentoPublico {
  id: string;
  numeroProcesso: string;
  numeroDocumento: string;
  tipo: TipoDocumento;
  nome: string;
  descricao: string;
  dataCriacao: string;
  dataPublicacao: string;
  objeto: string;
  secretaria: string;
  modalidade: string;
  status: StatusDocumento;
  espada: number;
  origem: OrigemDocumento;
  autenticidade: Autenticidade;
  assinaturas: Assinatura[];
  documentosRelacionados: DocumentoRelacionado[];
  tags: string[];
  urlVisualizacao: string;
  urlDownload: string;
  versao: string;
  hash: string;
  tempoPublicacao: number;
  valor: number;
  setor_id: string;
}

export interface FiltrosPortal {
  periodo: {
    inicio: string;
    fim: string;
  };
  tipoDocumento: string;
  modalidade: string;
  tipo: string;
  objeto: string;
  secretaria: string;
  status: string;
  espada: string;
  origem: string;
  statusAutenticacao: string;
  busca: string;
  tags: string[];
  valorMin?: number;
  valorMax?: number;
  numeroProcesso: string;
  numeroDocumento: string;
  setor_id: string;
} 