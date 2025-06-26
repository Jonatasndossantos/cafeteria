
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Progress } from '@/Components/ui/progress';
import { Badge } from '@/Components/ui/badge';
import { TrendingUp, Building2, PieChart } from 'lucide-react';

export const ExpenseCategorySection = () => {
  const despesasData = {
    correntes: {
      total: 89400000,
      gnd: {
        pessoalEncargos: 58200000, // 65% das correntes
        jurosEncargos: 3600000,    // 4% das correntes
        outrasCorrente: 27600000   // 31% das correntes
      }
    },
    capital: {
      total: 23400000,
      gnd: {
        investimentos: 18720000,   // 80% das capital
        inversoesFinanceiras: 1400000, // 6% das capital
        amortizacaoDivida: 3280000 // 14% das capital
      }
    },
    totalEmpenhado: 112800000
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number, total: number) => {
    return ((value / total) * 100).toFixed(1);
  };

  return (
    <Card className="dashboard-card border-l-4 border-l-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <PieChart className="w-6 h-6 text-blue-500" />
          <span className="text-xl font-bold text-gray-800">Despesas por Categoria Econômica</span>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Detalhamento GND
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Despesas Correntes */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-blue-800">Despesas Correntes</h4>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-blue-700">Total Empenhado:</span>
                  <span className="font-bold text-blue-800">{formatCurrency(despesasData.correntes.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">% do Orçamento:</span>
                  <span className="font-bold text-blue-800">
                    {formatPercentage(despesasData.correntes.total, despesasData.totalEmpenhado)}%
                  </span>
                </div>
                <Progress 
                  value={(despesasData.correntes.total / despesasData.totalEmpenhado) * 100} 
                  className="h-2 [&>div]:bg-blue-500" 
                />
              </div>

              <div className="space-y-3">
                <h5 className="font-medium text-blue-800 text-sm">Grupos de Natureza de Despesa:</h5>
                
                <div className="bg-white p-3 rounded border border-blue-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">1. Pessoal e Encargos Sociais</span>
                    <Badge variant="outline" className="text-xs">
                      {formatPercentage(despesasData.correntes.gnd.pessoalEncargos, despesasData.correntes.total)}%
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">{formatCurrency(despesasData.correntes.gnd.pessoalEncargos)}</div>
                  <Progress 
                    value={(despesasData.correntes.gnd.pessoalEncargos / despesasData.correntes.total) * 100} 
                    className="h-1 [&>div]:bg-blue-400" 
                  />
                </div>

                <div className="bg-white p-3 rounded border border-blue-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">2. Juros e Encargos da Dívida</span>
                    <Badge variant="outline" className="text-xs">
                      {formatPercentage(despesasData.correntes.gnd.jurosEncargos, despesasData.correntes.total)}%
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">{formatCurrency(despesasData.correntes.gnd.jurosEncargos)}</div>
                  <Progress 
                    value={(despesasData.correntes.gnd.jurosEncargos / despesasData.correntes.total) * 100} 
                    className="h-1 [&>div]:bg-blue-400" 
                  />
                </div>

                <div className="bg-white p-3 rounded border border-blue-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">3. Outras Despesas Correntes</span>
                    <Badge variant="outline" className="text-xs">
                      {formatPercentage(despesasData.correntes.gnd.outrasCorrente, despesasData.correntes.total)}%
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">{formatCurrency(despesasData.correntes.gnd.outrasCorrente)}</div>
                  <Progress 
                    value={(despesasData.correntes.gnd.outrasCorrente / despesasData.correntes.total) * 100} 
                    className="h-1 [&>div]:bg-blue-400" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Despesas de Capital */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center space-x-3 mb-4">
                <Building2 className="w-5 h-5 text-purple-600" />
                <h4 className="font-semibold text-purple-800">Despesas de Capital</h4>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-purple-700">Total Empenhado:</span>
                  <span className="font-bold text-purple-800">{formatCurrency(despesasData.capital.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">% do Orçamento:</span>
                  <span className="font-bold text-purple-800">
                    {formatPercentage(despesasData.capital.total, despesasData.totalEmpenhado)}%
                  </span>
                </div>
                <Progress 
                  value={(despesasData.capital.total / despesasData.totalEmpenhado) * 100} 
                  className="h-2 [&>div]:bg-purple-500" 
                />
              </div>

              <div className="space-y-3">
                <h5 className="font-medium text-purple-800 text-sm">Grupos de Natureza de Despesa:</h5>
                
                <div className="bg-white p-3 rounded border border-purple-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">4. Investimentos</span>
                    <Badge variant="outline" className="text-xs">
                      {formatPercentage(despesasData.capital.gnd.investimentos, despesasData.capital.total)}%
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">{formatCurrency(despesasData.capital.gnd.investimentos)}</div>
                  <Progress 
                    value={(despesasData.capital.gnd.investimentos / despesasData.capital.total) * 100} 
                    className="h-1 [&>div]:bg-purple-400" 
                  />
                </div>

                <div className="bg-white p-3 rounded border border-purple-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">5. Inversões Financeiras</span>
                    <Badge variant="outline" className="text-xs">
                      {formatPercentage(despesasData.capital.gnd.inversoesFinanceiras, despesasData.capital.total)}%
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">{formatCurrency(despesasData.capital.gnd.inversoesFinanceiras)}</div>
                  <Progress 
                    value={(despesasData.capital.gnd.inversoesFinanceiras / despesasData.capital.total) * 100} 
                    className="h-1 [&>div]:bg-purple-400" 
                  />
                </div>

                <div className="bg-white p-3 rounded border border-purple-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">6. Amortização da Dívida</span>
                    <Badge variant="outline" className="text-xs">
                      {formatPercentage(despesasData.capital.gnd.amortizacaoDivida, despesasData.capital.total)}%
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">{formatCurrency(despesasData.capital.gnd.amortizacaoDivida)}</div>
                  <Progress 
                    value={(despesasData.capital.gnd.amortizacaoDivida / despesasData.capital.total) * 100} 
                    className="h-1 [&>div]:bg-purple-400" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
