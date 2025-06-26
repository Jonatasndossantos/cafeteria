
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { CheckCircle, Clock, AlertCircle, Circle } from 'lucide-react';
import { ProcessoAdministrativo } from '@/Components/ambienteServidor/types/painelProcessos';

interface LinhaTempoProcessoProps {
  processo: ProcessoAdministrativo;
}

export const LinhaTempoProcesso = ({ processo }: LinhaTempoProcessoProps) => {
  const espadas = [
    { numero: 1, nome: 'Planejamento e Demandas', descricao: 'Elaboração do DFD e identificação da necessidade' },
    { numero: 2, nome: 'Estratégia de Contratação', descricao: 'Estudo Técnico Preliminar e definição da modalidade' },
    { numero: 3, nome: 'Termo de Referência', descricao: 'Especificações técnicas e critérios de aceitação' },
    { numero: 4, nome: 'Matriz de Riscos e Garantias', descricao: 'Identificação e mitigação de riscos' },
    { numero: 5, nome: 'Edital e Publicidade', descricao: 'Elaboração do edital e processo licitatório' },
    { numero: 6, nome: 'Contrato e Execução', descricao: 'Assinatura e acompanhamento da execução' },
    { numero: 7, nome: 'Penalidades e Responsabilização', descricao: 'Encerramento e avaliação final' }
  ];

  const getStatusIcon = (espadaNumero: number) => {
    if (espadaNumero < processo.espadaAtual) {
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    } else if (espadaNumero === processo.espadaAtual) {
      return <Clock className="h-6 w-6 text-blue-500" />;
    } else {
      return <Circle className="h-6 w-6 text-gray-300" />;
    }
  };

  const getStatusText = (espadaNumero: number) => {
    if (espadaNumero < processo.espadaAtual) {
      return 'Concluído';
    } else if (espadaNumero === processo.espadaAtual) {
      return 'Em Andamento';
    } else {
      return 'Pendente';
    }
  };

  const getStatusColor = (espadaNumero: number) => {
    if (espadaNumero < processo.espadaAtual) {
      return 'bg-green-50 text-green-600 border-green-200';
    } else if (espadaNumero === processo.espadaAtual) {
      return 'bg-blue-50 text-blue-600 border-blue-200';
    } else {
      return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Linha do Tempo do Processo</span>
          <Badge variant="outline" className="text-lg px-3 py-1">
            Espada {processo.espadaAtual} de 7
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {espadas.map((espada, index) => (
            <div key={espada.numero} className="flex items-start gap-4">
              {/* Ícone e linha */}
              <div className="flex flex-col items-center">
                {getStatusIcon(espada.numero)}
                {index < espadas.length - 1 && (
                  <div className={`w-0.5 h-12 mt-2 ${
                    espada.numero < processo.espadaAtual ? 'bg-green-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>

              {/* Conteúdo */}
              <div className="flex-1 pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-lg">
                    Espada {espada.numero}: {espada.nome}
                  </h3>
                  <Badge variant="outline" className={getStatusColor(espada.numero)}>
                    {getStatusText(espada.numero)}
                  </Badge>
                </div>
                
                <p className="text-gray-600 mb-3">{espada.descricao}</p>

                {/* Informações específicas da espada */}
                {processo.espadas.length > 0 && processo.espadas.find(e => e.numero === espada.numero) && (
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    {(() => {
                      const espadaInfo = processo.espadas.find(e => e.numero === espada.numero);
                      return espadaInfo ? (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Responsável:</span>
                            <span className="font-medium">{espadaInfo.responsavel}</span>
                          </div>
                          {espadaInfo.dataInicio && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Data de Início:</span>
                              <span className="font-medium">{espadaInfo.dataInicio}</span>
                            </div>
                          )}
                          {espadaInfo.dataConclusao && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Data de Conclusão:</span>
                              <span className="font-medium">{espadaInfo.dataConclusao}</span>
                            </div>
                          )}
                          {espadaInfo.documentosVinculados.length > 0 && (
                            <div className="text-sm">
                              <span className="text-gray-600">Documentos:</span>
                              <span className="font-medium ml-2">
                                {espadaInfo.documentosVinculados.length} documento(s) vinculado(s)
                              </span>
                            </div>
                          )}
                        </>
                      ) : null;
                    })()}
                  </div>
                )}

                {/* Próximas ações (apenas para espada atual) */}
                {espada.numero === processo.espadaAtual && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                    <h4 className="font-semibold text-blue-800 mb-1">Próximas Ações</h4>
                    <p className="text-blue-700 text-sm">
                      {espada.numero === 6 && processo.fornecedor 
                        ? 'Acompanhar execução contratual e fiscalizar entregas conforme cronograma.'
                        : 'Aguardando conclusão das atividades desta fase para avançar para a próxima espada.'
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Resumo do progresso */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-800">Progresso Geral</h4>
              <p className="text-gray-600 text-sm">
                {processo.espadaAtual - 1} de 7 espadas concluídas
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">
                {Math.round(((processo.espadaAtual - 1) / 7) * 100)}%
              </div>
              <p className="text-gray-600 text-sm">Concluído</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
