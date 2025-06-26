
import React from 'react';
import { Card, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';

interface EmendaSummary {
  totalEmendas: number;
  valorTotal: number;
  valorRecebido: number;
  valorPendente: number;
  emendasPIX: number;
  valorTotalPIX: number;
}

interface EmendasSummaryCardsProps {
  summary: EmendaSummary;
}

export const EmendasSummaryCards = ({ summary }: EmendasSummaryCardsProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const percentualRecebido = ((summary.valorRecebido / summary.valorTotal) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {/* Card 1: Total de Emendas */}
      <Card className="dashboard-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm text-gray-600">Total de Emendas</h3>
            <Badge variant="outline">{summary.totalEmendas}</Badge>
          </div>
          <div className="space-y-2">
            <span className="text-2xl font-bold">{formatCurrency(summary.valorTotal)}</span>
            <div className="text-sm text-gray-600">Valor total disponível</div>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Valor Recebido */}
      <Card className="dashboard-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm text-gray-600">Valor Recebido</h3>
            <div className="w-5 h-5 bg-green-500 rounded-full"></div>
          </div>
          <div className="space-y-2">
            <span className="text-2xl font-bold">{formatCurrency(summary.valorRecebido)}</span>
            <div className="text-sm text-gray-600">{percentualRecebido}% do total</div>
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Pendente */}
      <Card className="dashboard-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm text-gray-600">Pendente</h3>
            <div className="w-5 h-5 bg-yellow-500 rounded-full"></div>
          </div>
          <div className="space-y-2">
            <span className="text-2xl font-bold">{formatCurrency(summary.valorPendente)}</span>
            <div className="text-sm text-gray-600">Aguardando recebimento</div>
          </div>
        </CardContent>
      </Card>

      {/* Card 4: Emendas PIX (NOVO) */}
      <Card className="dashboard-card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm text-blue-700">Emendas PIX</h3>
            <Badge className="bg-blue-500 text-white">
              💸 {summary.emendasPIX}
            </Badge>
          </div>
          <div className="space-y-2">
            <span className="text-2xl font-bold text-blue-700">Transferência Especial</span>
            <div className="text-sm text-blue-600">Modalidade simplificada</div>
          </div>
        </CardContent>
      </Card>

      {/* Card 5: Valor Total PIX (NOVO) */}
      <Card className="dashboard-card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm text-purple-700">Valor Total PIX</h3>
            <div className="w-5 h-5 bg-purple-500 rounded-full"></div>
          </div>
          <div className="space-y-2">
            <span className="text-2xl font-bold text-purple-700">{formatCurrency(summary.valorTotalPIX)}</span>
            <div className="text-sm text-purple-600">
              {((summary.valorTotalPIX / summary.valorTotal) * 100).toFixed(1)}% do total
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
