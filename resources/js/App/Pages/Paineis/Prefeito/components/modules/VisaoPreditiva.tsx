import React from "react";
import { PredictiveIndicators } from "./visao-preditiva/PredictiveIndicators";
import { AIRecommendations } from "./visao-preditiva/AIRecommendations";
import { TimelineProjections } from "./visao-preditiva/TimelineProjections";
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Progress } from '@/Components/ui/progress';

const riscos = [
  {
    titulo: 'Limite de Despesa com Pessoal',
    categoria: 'fiscal',
    gravidade: 'alta',
    probabilidade: 85,
    impacto: 'critico',
    status: 'ativo'
  },
  {
    titulo: 'Contratos com Risco de Glosa',
    categoria: 'legal',
    gravidade: 'media',
    probabilidade: 60,
    impacto: 'alto',
    status: 'monitoramento'
  },
  {
    titulo: 'Queda na Arrecadação de IPTU',
    categoria: 'financeiro',
    gravidade: 'media',
    probabilidade: 70,
    impacto: 'medio',
    status: 'plano_acao'
  },
  {
    titulo: 'Obras Paralisadas',
    categoria: 'operacional',
    gravidade: 'alta',
    probabilidade: 90,
    impacto: 'alto',
    status: 'ativo'
  }
];

const alertas = [
  { tipo: 'Contratos', quantidade: 8, criticidade: 'media' },
  { tipo: 'Receitas', quantidade: 3, criticidade: 'alta' },
  { tipo: 'Limites Legais', quantidade: 2, criticidade: 'alta' },
  { tipo: 'Prazos', quantidade: 5, criticidade: 'critica' }
];

const getGravidadeColor = (gravidade: string) => {
  switch (gravidade) {
    case 'alta': return 'text-red-600 bg-red-50 border-red-200';
    case 'media': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'baixa': return 'text-green-600 bg-green-50 border-green-200';
    default: return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'ativo': return { variant: 'destructive' as const, text: 'Ativo' };
    case 'monitoramento': return { variant: 'secondary' as const, text: 'Monitoramento' };
    case 'plano_acao': return { variant: 'outline' as const, text: 'Plano de Ação' };
    default: return { variant: 'outline' as const, text: status };
  }
};

const getCriticidadeColor = (criticidade: string) => {
  switch (criticidade) {
    case 'critica': return 'border-l-4 border-red-600 bg-red-50';
    case 'alta': return 'border-l-4 border-yellow-500 bg-yellow-50';
    case 'media': return 'border-l-4 border-blue-500 bg-blue-50';
    default: return 'border-l-4 border-gray-400 bg-gray-50';
  }
};

export const VisaoPreditiva = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="rounded-2xl border-2 border-lumen-gold/30 bg-gradient-to-bl from-lumen-gold/10 to-blue-50/60 p-6 shadow-lg">
        <h2 className="font-bold text-lumen-blue text-2xl mb-2">Visão Preditiva & Riscos <span className="ml-2 text-2xl">🔮⚠️</span></h2>
        <p className="text-gray-700 text-md max-w-3xl">
          Antecipe riscos e aja de forma proativa com base em análises consolidadas, inteligência da IA-LUX e gestão integrada de riscos.
        </p>
      </div>
      
      {/* Seção 1: Indicadores Preditivos */}
      <PredictiveIndicators />

      {/* Seção 2: Dashboard Executivo */}
      

      {/* Seção 3: Alertas Específicos e Análise de Riscos */}
      <div className="space-y-8">
        {/* Alertas Específicos */}
        <div>
          <h3 className="text-xl font-montserrat font-semibold text-lumen-blue mb-4">Alertas Específicos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {alertas.map((alerta, index) => (
              <Card key={index} className={`dashboard-card ${getCriticidadeColor(alerta.criticidade)}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-sm text-gray-700">{alerta.tipo}</h3>
                    <div className={`w-3 h-3 rounded-full ${
                      alerta.criticidade === 'critica' ? 'bg-red-600' :
                      alerta.criticidade === 'alta' ? 'bg-yellow-600' : 'bg-blue-600'
                    }`}></div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-2xl font-bold">{alerta.quantidade}</span>
                    <div className="text-sm text-gray-600">itens identificados</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Análise de Riscos */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Análise de Riscos Identificados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riscos.map((risco, index) => (
                <div key={index} className={`p-4 rounded-lg border ${getGravidadeColor(risco.gravidade)}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold">{risco.titulo}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Categoria: {risco.categoria} | Impacto: {risco.impacto}
                      </p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge {...getStatusBadge(risco.status)} className="text-xs">
                        {getStatusBadge(risco.status).text}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {risco.gravidade}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Probabilidade</span>
                      <span>{risco.probabilidade}%</span>
                    </div>
                    <Progress value={risco.probabilidade} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seção 4: Projeções por Prazo */}
      <TimelineProjections />

      {/* Seção 5: Recomendações Unificadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AIRecommendations />
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Recomendações de Mitigação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <h5 className="font-medium text-green-800">Contingenciamento Preventivo</h5>
                <p className="text-sm text-green-700 mt-1">
                  Implementar medidas de contenção de gastos com pessoal nos próximos 2 meses.
                </p>
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h5 className="font-medium text-blue-800">Revisão de Contratos</h5>
                <p className="text-sm text-blue-700 mt-1">
                  Analisar contratos com maior risco de glosa e implementar correções.
                </p>
              </div>
              
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h5 className="font-medium text-yellow-800">Monitoramento Intensivo</h5>
                <p className="text-sm text-yellow-700 mt-1">
                  Acompanhamento quinzenal dos indicadores críticos até final do exercício.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
