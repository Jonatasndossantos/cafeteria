
import React from 'react';
import { Badge } from '@/Components/ui/badge';

interface PIXEmendaSectionProps {
  funcaoIndicada: string;
  statusPIX: string;
  prazoLimite?: Date;
}

export const PIXEmendaSection = ({ funcaoIndicada, statusPIX, prazoLimite }: PIXEmendaSectionProps) => {
  const getStatusPIXBadge = (status: string) => {
    switch (status) {
      case 'aguardando_programacao': return { variant: 'outline' as const, text: 'Aguardando Programação' };
      case 'recebido': return { variant: 'default' as const, text: 'Recebido' };
      case 'empenhado': return { variant: 'secondary' as const, text: 'Empenhado' };
      case 'liquidado': return { variant: 'default' as const, text: 'Liquidado' };
      default: return { variant: 'outline' as const, text: status };
    }
  };

  const isPrazoProximo = prazoLimite && prazoLimite.getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000; // 30 dias

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-xl">💸</span>
        <h5 className="font-semibold text-blue-800">Transferência Especial (PIX)</h5>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-blue-700">Função Indicada:</span>
            <span className="font-medium">{funcaoIndicada}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-700">Status PIX:</span>
            <Badge {...getStatusPIXBadge(statusPIX)} className="text-xs">
              {getStatusPIXBadge(statusPIX).text}
            </Badge>
          </div>
        </div>
        
        {prazoLimite && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-blue-700">Prazo Limite:</span>
              <span className={`font-medium ${isPrazoProximo ? 'text-red-600' : 'text-gray-800'}`}>
                {formatDate(prazoLimite)}
              </span>
            </div>
            {isPrazoProximo && (
              <div className="flex items-center space-x-1">
                <span className="text-red-500">⚠️</span>
                <span className="text-xs text-red-600">Prazo próximo do vencimento</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
