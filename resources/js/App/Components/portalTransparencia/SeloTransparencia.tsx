
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { SeloTransparencia as SeloType } from '@/types/portalTransparencia';
import { Shield, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface SeloTransparenciaProps {
  selo: SeloType;
  showDetails?: boolean;
}

export const SeloTransparencia = ({ selo, showDetails = false }: SeloTransparenciaProps) => {
  const getSeloConfig = (nivel: string) => {
    switch (nivel) {
      case 'Verde':
        return {
          icon: CheckCircle,
          color: 'bg-green-100 text-green-800 border-green-200',
          iconColor: 'text-green-600',
          title: 'PROCESSO 100% TRANSPARENTE - AUDITÁVEL DIGITALMENTE',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
      case 'Amarelo':
        return {
          icon: AlertTriangle,
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          iconColor: 'text-yellow-600',
          title: 'PROCESSO PARCIALMENTE TRANSPARENTE',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200'
        };
      case 'Vermelho':
        return {
          icon: XCircle,
          color: 'bg-red-100 text-red-800 border-red-200',
          iconColor: 'text-red-600',
          title: 'DOCUMENTOS PENDENTES - TRANSPARÊNCIA LIMITADA',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        };
      default:
        return {
          icon: Shield,
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          iconColor: 'text-gray-600',
          title: 'STATUS DE TRANSPARÊNCIA',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        };
    }
  };

  const config = getSeloConfig(selo.nivel);
  const IconComponent = config.icon;

  if (!showDetails) {
    // Versão compacta do selo
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${config.color}`}>
        <IconComponent className={`h-4 w-4 ${config.iconColor}`} />
        <span className="text-sm font-medium">{selo.percentual}% Transparente</span>
      </div>
    );
  }

  // Versão detalhada do selo
  return (
    <Card className={`${config.bgColor} ${config.borderColor} border-2`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3">
          <IconComponent className={`h-6 w-6 ${config.iconColor}`} />
          <div>
            <div className="text-lg font-bold">{config.title}</div>
            <div className="mt-1 text-sm font-normal text-gray-600">
              Percentual de Transparência: {selo.percentual}%
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Critérios Atendidos */}
        {selo.criteriosAtendidos.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-semibold text-green-700">
              Critérios Atendidos:
            </h4>
            <ul className="space-y-1">
              {selo.criteriosAtendidos.map((criterio, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{criterio}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Critérios Pendentes */}
        {selo.criteriosPendentes.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-semibold text-red-700">
              {selo.nivel === 'Vermelho' ? 'Critérios Não Atendidos:' : 'Critérios Pendentes:'}
            </h4>
            <ul className="space-y-1">
              {selo.criteriosPendentes.map((criterio, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  {selo.nivel === 'Vermelho' ? (
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  )}
                  <span>{criterio}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Informações de Verificação */}
        <div className="pt-3 border-t border-gray-200">
          <div className="space-y-1 text-xs text-gray-600">
            <div>
              <strong>Verificado em:</strong> {new Date(selo.dataVerificacao).toLocaleDateString('pt-BR')} às {new Date(selo.dataVerificacao).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div>
              <strong>ID de Verificação:</strong> {selo.idVerificacao}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
