
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';

export const AlertsSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🚨</span>
            <span>Alertas Críticos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-800">Prazo de Prestação de Contas</h4>
              <p className="text-sm text-yellow-700">Convênio Federal vence em 5 dias</p>
              <Badge variant="secondary" className="mt-2">Alta Prioridade</Badge>
            </div>
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <h4 className="font-medium text-red-800">Limite de Despesa com Pessoal</h4>
              <p className="text-sm text-red-700">Projeção indica risco para dezembro</p>
              <Badge variant="destructive" className="mt-2">Crítico</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <span>Recomendações IA-LUX</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800">Acelerar execução de emendas</h4>
              <p className="text-sm text-blue-700">R$ 15.2M em risco de perda por prazo</p>
              <Badge variant="default" className="mt-2">Alto Impacto</Badge>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800">Otimizar arrecadação de IPTU</h4>
              <p className="text-sm text-green-700">Potencial de aumento de 12% na receita</p>
              <Badge variant="outline" className="mt-2">Médio Impacto</Badge>
            </div>
          </div>
          <Button className="w-full mt-4 bg-lumen-blue hover:bg-lumen-blue-light">
            Conversar com IA-LUX
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
