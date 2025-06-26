
import React, { useState } from 'react';
import { Card, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { DollarSign, Calendar, FileCheck, ChevronDown, ChevronUp, Clock, Link, Building } from 'lucide-react';

interface Convenio {
  id: number;
  nome: string;
  objeto: string;
  orgaoConcedente: string;
  valorTotal: number;
  valorLiberado: number;
  saldoUtilizar: number;
  prazoFinal: string;
  diasRestantes: number;
  statusConvenio: string;
  statusPrestacaoContas: string;
  obrasVinculadas: string[];
}

interface ConvenioDetailedCardProps {
  convenio: Convenio;
}

export const ConvenioDetailedCard = ({ convenio }: ConvenioDetailedCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'bg-green-100 text-green-800';
      case 'Em Prestação de Contas': return 'bg-blue-100 text-blue-800';
      case 'Aguardando Aditivo': return 'bg-yellow-100 text-yellow-800';
      case 'Encerrado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPrestacaoColor = (status: string) => {
    switch (status) {
      case 'Aprovada': return 'bg-green-100 text-green-800';
      case 'Em Andamento': return 'bg-blue-100 text-blue-800';
      case 'Pendente': return 'bg-yellow-100 text-yellow-800';
      case 'Glosada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDiasRestantesColor = (dias: number) => {
    if (dias < 30) return 'text-red-600 font-bold';
    if (dias < 60) return 'text-yellow-600 font-medium';
    return 'text-green-600';
  };

  return (
    <Card className="dashboard-card hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-lumen-blue mb-2">{convenio.nome}</h3>
            <p className="text-gray-600 mb-2">{convenio.objeto}</p>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Building className="h-4 w-4" />
              <span>{convenio.orgaoConcedente}</span>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge className={getStatusColor(convenio.statusConvenio)}>
              {convenio.statusConvenio}
            </Badge>
            <Badge className={getPrestacaoColor(convenio.statusPrestacaoContas)}>
              {convenio.statusPrestacaoContas}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Valor Total</p>
            <p className="font-semibold text-lumen-blue">
              {convenio.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Valor Liberado</p>
            <p className="font-medium text-green-600">
              {convenio.valorLiberado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1 flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              💰 Saldo a Utilizar
            </p>
            <p className="font-semibold text-blue-600">
              {convenio.saldoUtilizar.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-1 flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Prazo Final
            </p>
            <p className="font-medium">{new Date(convenio.prazoFinal).toLocaleDateString('pt-BR')}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              ⏳ Dias Restantes
            </p>
            <p className={`font-medium ${getDiasRestantesColor(convenio.diasRestantes)}`}>
              {convenio.diasRestantes} dias
              {convenio.diasRestantes < 30 && (
                <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded">URGENTE</span>
              )}
            </p>
          </div>
        </div>

        {convenio.obrasVinculadas.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2 flex items-center">
              <Link className="h-4 w-4 mr-1" />
              Obras/Projetos Vinculados
            </p>
            <div className="flex flex-wrap gap-2">
              {convenio.obrasVinculadas.map((obra, index) => (
                <Badge key={index} variant="outline" className="cursor-pointer hover:bg-blue-50">
                  {obra}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setExpanded(!expanded)}
            className="flex items-center space-x-2"
          >
            <span>Ver Detalhes do Convênio</span>
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        {expanded && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Situação Financeira</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">% Liberado:</span>
                    <span className="text-sm font-medium">
                      {((convenio.valorLiberado / convenio.valorTotal) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">% Disponível:</span>
                    <span className="text-sm font-medium text-blue-600">
                      {((convenio.saldoUtilizar / convenio.valorTotal) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Próximas Ações</h4>
                {convenio.diasRestantes < 60 && (
                  <div className="text-sm text-yellow-800 bg-yellow-50 p-2 rounded">
                    ⚠️ Iniciar processo de aditivo
                  </div>
                )}
                {convenio.statusPrestacaoContas === 'Pendente' && (
                  <div className="text-sm text-red-800 bg-red-50 p-2 rounded mt-2">
                    🚨 Prestação de contas pendente
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
