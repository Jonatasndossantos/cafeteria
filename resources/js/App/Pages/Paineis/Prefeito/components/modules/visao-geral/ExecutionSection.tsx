
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Progress } from '@/Components/ui/progress';
import { Badge } from '@/Components/ui/badge';
import { TrendingUp, DollarSign, Calendar } from 'lucide-react';

export const ExecutionSection = () => {
  const executionData = {
    orcado: 145000000,
    empenhado: 112800000,
    liquidado: 95200000,
    pago: 89400000,
    projecaoExecucao: 137750000
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getPercentage = (value: number, total: number) => (value / total * 100).toFixed(1);

  return (
    <Card className="dashboard-card border-l-4 border-l-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <DollarSign className="w-6 h-6 text-blue-500" />
          <span className="text-xl font-bold text-gray-800">Execução Orçamentária Detalhada</span>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {getPercentage(executionData.empenhado, executionData.orcado)}% Executado
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fluxo de Execução */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 mb-4">Fluxo de Execução</h4>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">Orçado</span>
                  <span className="font-bold text-gray-800">{formatCurrency(executionData.orcado)}</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-blue-700">Empenhado</span>
                  <span className="font-bold text-blue-800">{formatCurrency(executionData.empenhado)}</span>
                </div>
                <Progress value={parseFloat(getPercentage(executionData.empenhado, executionData.orcado))} className="h-2 [&>div]:bg-blue-500" />
                <div className="text-xs text-blue-600 mt-1">{getPercentage(executionData.empenhado, executionData.orcado)}% do orçado</div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-purple-700">Liquidado</span>
                  <span className="font-bold text-purple-800">{formatCurrency(executionData.liquidado)}</span>
                </div>
                <Progress value={parseFloat(getPercentage(executionData.liquidado, executionData.empenhado))} className="h-2 [&>div]:bg-purple-500" />
                <div className="text-xs text-purple-600 mt-1">{getPercentage(executionData.liquidado, executionData.empenhado)}% do empenhado</div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-green-700">Pago</span>
                  <span className="font-bold text-green-800">{formatCurrency(executionData.pago)}</span>
                </div>
                <Progress value={parseFloat(getPercentage(executionData.pago, executionData.liquidado))} className="h-2 [&>div]:bg-green-500" />
                <div className="text-xs text-green-600 mt-1">{getPercentage(executionData.pago, executionData.liquidado)}% do liquidado</div>
              </div>
            </div>
          </div>

          {/* Projeções e Metas */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 mb-4">Projeções 2024</h4>
            
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-start space-x-3 mb-3">
                <Calendar className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h5 className="font-medium text-yellow-800">Projeção para Dezembro</h5>
                  <p className="text-sm text-yellow-700">Baseada no ritmo atual de execução</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-yellow-700">Execução Projetada:</span>
                  <span className="font-bold text-yellow-800">{formatCurrency(executionData.projecaoExecucao)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-700">% da Meta Anual (95%):</span>
                  <span className="font-bold text-yellow-800">{getPercentage(executionData.projecaoExecucao, executionData.orcado * 0.95)}%</span>
                </div>
                <Progress value={parseFloat(getPercentage(executionData.projecaoExecucao, executionData.orcado * 0.95))} className="h-2 [&>div]:bg-yellow-500" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-lg border border-emerald-200">
              <div className="flex items-start space-x-3 mb-3">
                <TrendingUp className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                  <h5 className="font-medium text-emerald-800">Ritmo de Execução</h5>
                  <p className="text-sm text-emerald-700">Comparação mensal</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-emerald-700">Média Mensal:</span>
                  <span className="font-bold text-emerald-800">R$ 12.5M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-700">Necessário p/ Meta:</span>
                  <span className="font-bold text-emerald-800">R$ 11.8M</span>
                </div>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 w-full justify-center">
                  Ritmo Adequado
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
