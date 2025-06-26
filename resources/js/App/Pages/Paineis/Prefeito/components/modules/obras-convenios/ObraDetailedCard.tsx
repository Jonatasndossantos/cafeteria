
import React, { useState } from 'react';
import { Card, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Progress } from '@/Components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/Components/ui/tooltip';
import { MapPin, Calendar, DollarSign, ChevronDown, ChevronUp, AlertTriangle, Scale, User, FileText } from 'lucide-react';

interface Obra {
  id: number;
  nome: string;
  valor: number;
  execucaoFisica: number;
  execucaoFinanceira: number;
  status: string;
  prazo: string;
  convenio: string;
  localizacao: string;
  tipo: string;
  impactoFinanceiro?: 'baixo' | 'medio' | 'alto';
  impactoLegal?: 'baixo' | 'medio' | 'alto';
  ultimaMedicao?: {
    data: string;
    valor: number;
  };
  responsavelTecnico?: string;
  valorLiberado?: number;
  valorPendente?: number;
  diasRestantes?: number;
}

interface ObraDetailedCardProps {
  obra: Obra;
}

export const ObraDetailedCard = ({ obra }: ObraDetailedCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em Andamento': return 'bg-blue-100 text-blue-800';
      case 'Finalizando': return 'bg-green-100 text-green-800';
      case 'Atrasada': return 'bg-red-100 text-red-800';
      case 'Paralisada': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impacto?: string) => {
    switch (impacto) {
      case 'alto': return 'text-red-600';
      case 'medio': return 'text-yellow-600';
      case 'baixo': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getImpactIcon = (impacto?: string) => {
    switch (impacto) {
      case 'alto': return '🔴';
      case 'medio': return '🟡';
      case 'baixo': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <Card className="dashboard-card hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-lumen-blue mb-2">{obra.nome}</h3>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{obra.localizacao}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Prazo: {new Date(obra.prazo).toLocaleDateString('pt-BR')}</span>
              </span>
              {obra.diasRestantes && (
                <span className={`flex items-center space-x-1 ${obra.diasRestantes < 30 ? 'text-red-600 font-medium' : ''}`}>
                  ⏰ {obra.diasRestantes} dias restantes
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(obra.status)}>
              {obra.status}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Valor Total</p>
            <p className="font-semibold text-lumen-blue">
              {obra.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Convênio</p>
            <p className="font-medium">{obra.convenio}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Tipo</p>
            <p className="font-medium">{obra.tipo}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Execução Física</p>
            <div className="flex items-center space-x-3">
              <Progress value={obra.execucaoFisica} className="flex-1" />
              <span className="text-sm font-medium">{obra.execucaoFisica}%</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Execução Financeira</p>
            <div className="flex items-center space-x-3">
              <Progress value={obra.execucaoFinanceira} className="flex-1" />
              <span className="text-sm font-medium">{obra.execucaoFinanceira}%</span>
            </div>
          </div>
        </div>

        {/* Indicadores de Impacto Cruzado */}
        <div className="flex items-center space-x-6 mb-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center space-x-2 cursor-help">
                  <DollarSign className={`h-5 w-5 ${getImpactColor(obra.impactoFinanceiro)}`} />
                  <span className="text-sm">Impacto Financeiro</span>
                  <span>{getImpactIcon(obra.impactoFinanceiro)}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Risco de custos adicionais: {obra.impactoFinanceiro}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center space-x-2 cursor-help">
                  <Scale className={`h-5 w-5 ${getImpactColor(obra.impactoLegal)}`} />
                  <span className="text-sm">Impacto Legal</span>
                  <span>{getImpactIcon(obra.impactoLegal)}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Risco de apontamentos TCE/glosas: {obra.impactoLegal}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setExpanded(!expanded)}
            className="flex items-center space-x-2"
          >
            <span>Ver Detalhes</span>
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        {/* Detalhes Expandidos */}
        {expanded && (
          <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {obra.ultimaMedicao && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Última Medição
                  </h4>
                  <p className="text-sm text-gray-600">
                    Data: {new Date(obra.ultimaMedicao.data).toLocaleDateString('pt-BR')}
                  </p>
                  <p className="text-sm text-gray-600">
                    Valor: {obra.ultimaMedicao.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                </div>
              )}

              {obra.responsavelTecnico && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Responsável Técnico
                  </h4>
                  <p className="text-sm text-gray-600">{obra.responsavelTecnico}</p>
                </div>
              )}
            </div>

            {(obra.valorLiberado || obra.valorPendente) && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Situação do Repasse do Convênio</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {obra.valorLiberado && (
                    <div>
                      <p className="text-sm text-gray-600">Valor Liberado</p>
                      <p className="font-medium text-green-600">
                        {obra.valorLiberado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                    </div>
                  )}
                  {obra.valorPendente && (
                    <div>
                      <p className="text-sm text-gray-600">Valor Pendente</p>
                      <p className="font-medium text-orange-600">
                        {obra.valorPendente.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
