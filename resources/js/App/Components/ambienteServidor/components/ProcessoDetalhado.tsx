
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { ArrowLeft, FileText, Clock, User, Building, Calendar, DollarSign } from 'lucide-react';
import { ProcessoAdministrativo } from '@/Components/ambienteServidor/types/painelProcessos';
import { LinhaTempoProcesso } from './LinhaTempoProcesso';
import { ArvoreDocumentos } from './ArvoreDocumentos';

interface ProcessoDetalhadoProps {
  processo: ProcessoAdministrativo;
  onVoltar: () => void;
}

export const ProcessoDetalhado = ({ processo, onVoltar }: ProcessoDetalhadoProps) => {
  const [abaAtiva, setAbaAtiva] = useState('resumo');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em Andamento':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Próximo ao Vencimento':
        return 'bg-orange-50 text-orange-600 border-orange-200';
      case 'Concluído':
        return 'bg-green-50 text-green-600 border-green-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho com botão voltar */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onVoltar} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar para Painel
        </Button>
        <div>
          <h2 className="text-xl font-semibold">Processo Administrativo: {processo.numero}</h2>
          <p className="text-gray-600 text-sm">{processo.objeto}</p>
        </div>
      </div>

      {/* Informações Principais do Processo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Informações Gerais</span>
            <Badge variant="outline" className={getStatusColor(processo.status)}>
              {processo.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Modalidade</p>
                  <p className="text-lg font-semibold">{processo.modalidade}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Valor</p>
                  <p className="text-lg font-semibold text-green-600">{processo.valor}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Secretaria</p>
                  <p className="text-lg font-semibold">{processo.secretaria}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Gestor Responsável</p>
                  <p className="text-lg font-semibold">{processo.responsavelGestor}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Data de Início</p>
                  <p className="text-lg font-semibold">{processo.dataInicio}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Previsão de Conclusão</p>
                  <p className="text-lg font-semibold">{processo.previsaoConclusao}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-600 mb-2">Tags</p>
            <div className="flex flex-wrap gap-2">
              {processo.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">#{tag}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Atual da Espada */}
      <Card>
        <CardHeader>
          <CardTitle>Status das 7 Espadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 text-lg font-bold flex items-center justify-center mx-auto mb-2">
                {processo.espadaAtual}
              </div>
              <p className="text-sm font-medium">Espada Atual</p>
              <p className="text-xs text-gray-500">{processo.faseAtual}</p>
            </div>
            <div className="flex-1 mx-4">
              <div className="relative">
                <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded"></div>
                <div 
                  className="absolute top-1/2 left-0 h-2 bg-blue-500 rounded" 
                  style={{ width: `${(processo.espadaAtual / 7) * 100}%` }}
                ></div>
                <div className="flex justify-between">
                  {[1,2,3,4,5,6,7].map(num => (
                    <div 
                      key={num}
                      className={`w-4 h-4 rounded-full border-2 ${
                        num <= processo.espadaAtual 
                          ? 'bg-blue-500 border-blue-500' 
                          : num === processo.espadaAtual + 1 
                            ? 'bg-yellow-400 border-yellow-400'
                            : 'bg-white border-gray-300'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{Math.round((processo.espadaAtual / 7) * 100)}%</p>
              <p className="text-sm text-gray-500">Concluído</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Abas de Detalhamento */}
      <Tabs value={abaAtiva} onValueChange={setAbaAtiva} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="resumo">Resumo</TabsTrigger>
          <TabsTrigger value="linha-tempo">Linha do Tempo</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
        </TabsList>

        <TabsContent value="resumo" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Processo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Objeto do Processo</h4>
                  <p className="text-gray-700">{processo.objeto}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Responsáveis</h4>
                    <ul className="space-y-1 text-sm">
                      <li><strong>Gestor:</strong> {processo.responsavelGestor}</li>
                      <li><strong>Fiscal:</strong> {processo.responsavelFiscal}</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Informações Contratuais</h4>
                    <ul className="space-y-1 text-sm">
                      <li><strong>Fornecedor:</strong> {processo.fornecedor || 'Não definido'}</li>
                      <li><strong>Vigência:</strong> {processo.vigenciaAte || 'Não definida'}</li>
                    </ul>
                  </div>
                </div>

                {processo.notificacoes > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">Notificações Pendentes</h4>
                    <p className="text-yellow-700">Este processo possui {processo.notificacoes} notificação(ões) pendente(s) que requerem atenção.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="linha-tempo" className="mt-6">
          <LinhaTempoProcesso processo={processo} />
        </TabsContent>

        <TabsContent value="documentos" className="mt-6">
          <ArvoreDocumentos processo={processo} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
