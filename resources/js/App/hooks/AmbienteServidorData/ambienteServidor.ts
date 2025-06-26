
export interface Usuario {
  nome: string;
  cargo: string;
  setor: string;
}

export interface Demanda {
  id: string;
  tipo: string;
  prazo: string;
  status: string;
}

export interface Contrato {
  id: string;
  objeto: string;
  fornecedor: string;
  vigencia: string;
  valor: string;
  status: string;
}

export interface AlertaLux {
  id: number;
  tipo: string;
  descricao: string;
  contrato: string;
  data: string;
  severidade: string;
}

export interface Mensagem {
  id: number;
  remetente: string;
  setor: string;
  conteudo: string;
  data: string;
  lida: boolean;
}

export interface Conversa {
  id: number;
  setor: string;
  assunto: string;
  ultimaMensagem: string;
  dataUltimaMensagem: string;
  naoLidas: number;
  espada: number;
  mensagens: Mensagem[];
}
