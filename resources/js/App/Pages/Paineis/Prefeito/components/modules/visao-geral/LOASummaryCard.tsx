
import React from 'react';
import { Card, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';

export const LOASummaryCard = () => {
  const loaData = {
    receitaEstimada: 180000000,
    despesaFixada: 178000000
  };

  const diferenca = loaData.receitaEstimada - loaData.despesaFixada;
  const isSuperavit = diferenca > 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-2xl">📘</span>
          <h3 className="text-lg font-semibold text-gray-800">Resumo Orçamentário Anual</h3>
          <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
            LOA 2025
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">Receita Estimada</p>
            <p className="text-2xl font-bold text-blue-700">{formatCurrency(loaData.receitaEstimada)}</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">Despesa Fixada</p>
            <p className="text-2xl font-bold text-purple-700">{formatCurrency(loaData.despesaFixada)}</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">Resultado Orçamentário Previsto</p>
            <div className="flex items-center space-x-2">
              <p className={`text-2xl font-bold ${isSuperavit ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(Math.abs(diferenca))}
              </p>
              <Badge 
                className={`text-xs ${
                  isSuperavit 
                    ? 'bg-green-100 text-green-800 border-green-300' 
                    : 'bg-red-100 text-red-800 border-red-300'
                }`}
              >
                {isSuperavit ? 'Superávit previsto' : 'Déficit previsto'}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
