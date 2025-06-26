
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Progress } from '@/Components/ui/progress';
import { Badge } from '@/Components/ui/badge';
import { Building2, AlertTriangle } from 'lucide-react';

export const ExpenseAnalysisSection = () => {
  const secretariasData = [
    {
      nome: 'Educação',
      orcado: 45000000,
      empenhado: 38250000,
      pago: 32400000,
      execucao: 85.0,
      status: 'success'
    },
    {
      nome: 'Saúde',
      orcado: 38000000,
      empenhado: 34580000,
      pago: 31200000,
      execucao: 91.0,
      status: 'success'
    },
    {
      nome: 'Infraestrutura',
      orcado: 28000000,
      empenhado: 18200000,
      pago: 12600000,
      execucao: 65.0,
      status: 'warning'
    },
    {
      nome: 'Assistência Social',
      orcado: 15000000,
      empenhado: 13200000,
      pago: 11100000,
      execucao: 88.0,
      status: 'success'
    },
    {
      nome: 'Administração',
      orcado: 19000000,
      empenhado: 8550000,
      pago: 2850000,
      execucao: 45.0,
      status: 'critical'
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-500';
      case 'warning': return 'text-yellow-600 bg-yellow-500';
      case 'critical': return 'text-red-600 bg-red-500';
      default: return 'text-gray-600 bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-50 text-green-700 border-green-200';
      case 'warning': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="dashboard-card border-l-4 border-l-orange-500">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <Building2 className="w-6 h-6 text-orange-500" />
          <span className="text-xl font-bold text-gray-800">Execução Orçamentária por Secretaria</span>
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            Top 5 Secretarias
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Execução por Secretaria */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 mb-4">Ranking de Execução Orçamentária</h4>
            <div className="space-y-4">
              {secretariasData.map((secretaria, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(secretaria.status).split(' ')[1]}`}></div>
                      <div>
                        <h5 className="font-medium text-gray-800">{secretaria.nome}</h5>
                        <p className="text-sm text-gray-600">{formatCurrency(secretaria.orcado)} orçados</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={getStatusBadge(secretaria.status)}>
                      {secretaria.execucao}%
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Empenhado: {formatCurrency(secretaria.empenhado)}</span>
                      <span className="text-gray-600">Pago: {formatCurrency(secretaria.pago)}</span>
                    </div>
                    <Progress value={secretaria.execucao} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance e Alertas */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 mb-4">Análise de Performance</h4>
            
            {/* Melhores Performers */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
              <h5 className="font-medium text-green-800 mb-3">🏆 Melhores Desempenhos</h5>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-green-700 text-sm">Saúde</span>
                  <Badge className="bg-green-100 text-green-800">91% executado</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-700 text-sm">Assistência Social</span>
                  <Badge className="bg-green-100 text-green-800">88% executado</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-700 text-sm">Educação</span>
                  <Badge className="bg-green-100 text-green-800">85% executado</Badge>
                </div>
              </div>
            </div>

            {/* Necessitam Atenção */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
              <h5 className="font-medium text-yellow-800 mb-3">⚠️ Necessitam Atenção</h5>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-yellow-700 text-sm">Infraestrutura</span>
                  <Badge className="bg-yellow-100 text-yellow-800">65% executado</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-700 text-sm">Administração</span>
                  <Badge className="bg-red-100 text-red-800">45% executado</Badge>
                </div>
              </div>
            </div>

            {/* Resumo Estatístico */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
              <h5 className="font-medium text-blue-800 mb-3">📊 Resumo Estatístico</h5>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-blue-700">Média de Execução:</span>
                  <div className="font-bold text-blue-800">74.8%</div>
                </div>
                <div>
                  <span className="text-blue-700">Total Empenhado:</span>
                  <div className="font-bold text-blue-800">R$ 112.8M</div>
                </div>
                <div>
                  <span className="text-blue-700">Acima da Meta ({'>'}80%):</span>
                  <div className="font-bold text-blue-800">3 de 5</div>
                </div>
                <div>
                  <span className="text-blue-700">Necessitam Ação:</span>
                  <div className="font-bold text-blue-800">2 de 5</div>
                </div>
              </div>
            </div>

            {/* Alertas Específicos */}
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <h5 className="font-medium text-red-800">Alertas Críticos</h5>
                  <ul className="text-sm text-red-700 mt-2 space-y-1">
                    <li>• Administração: execução muito baixa (45%)</li>
                    <li>• Infraestrutura: risco de suborçamento</li>
                    <li>• Necessário acelerar empenhos no 4º trimestre</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
