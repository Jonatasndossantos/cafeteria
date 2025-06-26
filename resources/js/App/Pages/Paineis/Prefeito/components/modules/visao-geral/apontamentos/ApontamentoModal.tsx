
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { Badge } from '@/Components/ui/badge';
import { Separator } from '@/Components/ui/separator';
import { Calendar, User, FileText, CheckCircle } from 'lucide-react';

interface ApontamentoModalProps {
  apontamento: any;
  isOpen: boolean;
  onClose: () => void;
}

export const ApontamentoModal: React.FC<ApontamentoModalProps> = ({ 
  apontamento, 
  isOpen, 
  onClose 
}) => {
  if (!apontamento) return null;

  const mockDetailedData = {
    historico: [
      { data: "10/03/2025", evento: "Apontamento identificado pelo TCE", tipo: "inicio" },
      { data: "15/03/2025", evento: "Notificação oficial recebida", tipo: "notificacao" },
      { data: "22/03/2025", evento: "Equipe técnica designada", tipo: "acao" },
      { data: "01/04/2025", evento: "Primeiro relatório de progresso enviado", tipo: "progresso" }
    ],
    documentos: [
      "Acórdão TCE nº 1234/2024",
      "Ofício de Notificação",
      "Termo de Referência (Draft)",
      "Cronograma de Ações"
    ],
    tarefas: [
      { 
        descricao: "Elaborar termo de referência técnico", 
        responsavel: "João Silva - Setor de Licitações", 
        prazo: "30/06/2025", 
        status: "Em Andamento",
        progresso: 60
      },
      { 
        descricao: "Realizar pesquisa de mercado", 
        responsavel: "Maria Santos - Compras", 
        prazo: "05/07/2025", 
        status: "Aguardando",
        progresso: 0
      },
      { 
        descricao: "Publicar edital de licitação", 
        responsavel: "Pedro Costa - Licitações", 
        prazo: "10/07/2025", 
        status: "Aguardando",
        progresso: 0
      }
    ],
    comentarios: [
      { 
        data: "01/06/2025", 
        autor: "Secretário de Administração", 
        texto: "Reunião realizada com equipe técnica. Termo de referência em elaboração conforme diretrizes do TCE."
      },
      { 
        data: "05/06/2025", 
        autor: "Coordenador de Licitações", 
        texto: "Solicitada consultoria jurídica para validação dos procedimentos propostos."
      }
    ]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Plano Detalhado do Apontamento</span>
            <Badge className="bg-blue-100 text-blue-800">
              {apontamento.orgao}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Básicas */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">{apontamento.apontamento}</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>Prazo: {apontamento.prazoFinal}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <span>Responsável: {apontamento.responsavel}</span>
              </div>
            </div>
          </div>

          {/* Histórico */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Histórico do Apontamento
            </h4>
            <div className="space-y-3">
              {mockDetailedData.historico.map((item, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-b-0">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium text-sm text-gray-900">{item.evento}</div>
                    <div className="text-xs text-gray-500">{item.data}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Documentos Relacionados */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Documentos Relacionados</h4>
            <div className="grid grid-cols-2 gap-2">
              {mockDetailedData.documentos.map((doc, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 text-sm text-blue-800">
                    <FileText className="w-4 h-4" />
                    {doc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Lista de Tarefas */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Lista de Tarefas com Responsáveis</h4>
            <div className="space-y-3">
              {mockDetailedData.tarefas.map((tarefa, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-medium text-gray-900">{tarefa.descricao}</div>
                    <Badge className={`${tarefa.status === 'Em Andamento' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'} text-xs`}>
                      {tarefa.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <div>Responsável: {tarefa.responsavel}</div>
                    <div>Prazo: {tarefa.prazo}</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${tarefa.progresso}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Progresso: {tarefa.progresso}%</div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Comentários e Atualizações */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Comentários e Atualizações</h4>
            <div className="space-y-3">
              {mockDetailedData.comentarios.map((comentario, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="font-medium text-sm text-gray-900">{comentario.autor}</div>
                    <div className="text-xs text-gray-500">{comentario.data}</div>
                  </div>
                  <div className="text-sm text-gray-700">{comentario.texto}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Evidências de Cumprimento */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Evidências de Cumprimento
            </h4>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-sm text-green-800">
                • Termo de referência em elaboração (60% concluído)<br />
                • Consultoria jurídica solicitada para validação<br />
                • Equipe técnica designada e cronograma aprovado<br />
                • Relatórios de progresso sendo enviados mensalmente ao TCE
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
