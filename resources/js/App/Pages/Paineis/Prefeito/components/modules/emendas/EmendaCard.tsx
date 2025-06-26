
import React from 'react';
import { Card, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Progress } from '@/Components/ui/progress';
import { PIXEmendaSection } from './PIXEmendaSection';
import { EmendaAlerts } from './EmendaAlerts';

export interface EmendaData {
  numero: string;
  tipo: string;
  autor: string;
  objeto: string;
  valor: number;
  recebida: number;
  status: string;
  origem: string;
  caracterImpositivo: boolean;
  destinatarioFinal: string;
  exigeConvenio: boolean;
  modalidadeExecucao: 'Convênio' | 'PIX';
  funcaoIndicada?: string;
  statusPIX?: string;
  alertasRisco: string[];
  prazoLimite?: Date;
}

interface EmendaCardProps {
  emenda: EmendaData;
  onVerDetalhes: (numero: string) => void;
}

export const EmendaCard = ({ emenda, onVerDetalhes }: EmendaCardProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'em_execucao': return { variant: 'default' as const, text: 'Em Execução' };
      case 'risco_prazo': return { variant: 'secondary' as const, text: 'Risco de Prazo' };
      case 'aguardando': return { variant: 'outline' as const, text: 'Aguardando' };
      case 'concluido': return { variant: 'default' as const, text: 'Concluído' };
      default: return { variant: 'outline' as const, text: status };
    }
  };

  const percentualExecutado = (emenda.recebida / emenda.valor) * 100;
  const isPIX = emenda.modalidadeExecucao === 'PIX';

  return (
    <Card className={`dashboard-card ${isPIX ? 'border-l-4 border-l-blue-500' : ''}`}>
      <CardContent className="p-6">
        {/* Header da Emenda */}
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h4 className="font-bold text-lg">{emenda.numero}</h4>
              {isPIX && (
                <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                  💸 PIX
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600">{emenda.tipo} - {emenda.autor}</p>
            <p className="text-sm font-medium text-gray-800">{emenda.objeto}</p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge {...getStatusBadge(emenda.status)}>
              {getStatusBadge(emenda.status).text}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {emenda.origem}
            </Badge>
          </div>
        </div>

        {/* Valores e Progresso */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Valor Total</span>
              <span className="font-medium">{formatCurrency(emenda.valor)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Recebido</span>
              <span className="font-medium text-green-600">{formatCurrency(emenda.recebida)}</span>
            </div>
            <Progress value={percentualExecutado} className="h-2" />
            <div className="text-right text-sm text-gray-600">
              {percentualExecutado.toFixed(1)}% executado
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Caráter Impositivo:</span>
              <Badge variant={emenda.caracterImpositivo ? "default" : "outline"} className="text-xs">
                {emenda.caracterImpositivo ? 'Sim' : 'Não'}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Destinatário:</span>
              <span className="font-medium">{emenda.destinatarioFinal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Exige Convênio:</span>
              <Badge variant={emenda.exigeConvenio ? "secondary" : "outline"} className="text-xs">
                {emenda.exigeConvenio ? 'Sim' : 'Não'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Seção PIX (se aplicável) */}
        {isPIX && (
          <PIXEmendaSection
            funcaoIndicada={emenda.funcaoIndicada || ''}
            statusPIX={emenda.statusPIX || ''}
            prazoLimite={emenda.prazoLimite}
          />
        )}

        {/* Alertas de Risco */}
        {emenda.alertasRisco.length > 0 && (
          <EmendaAlerts alertas={emenda.alertasRisco} />
        )}

        {/* Botão de Ação */}
        <div className="flex justify-end mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onVerDetalhes(emenda.numero)}
            className="text-blue-600 hover:text-blue-700"
          >
            Ver Detalhes do Projeto
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
