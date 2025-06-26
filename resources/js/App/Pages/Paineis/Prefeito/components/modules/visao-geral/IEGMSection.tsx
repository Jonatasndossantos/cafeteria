
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/Components/ui/collapsible';
import { ChevronDown, ChevronUp, FileText, AlertTriangle, Book, Heart, Briefcase, BarChart, Search, Clock } from 'lucide-react';
import { ApontamentosKanbanCards } from './apontamentos/ApontamentosKanbanCards';
import { ApontamentosChart } from './apontamentos/ApontamentosChart';
import { ApontamentosTable } from './apontamentos/ApontamentosTable';

interface IEGMItem {
  name: string;
  score: number;
  color: string;
  icon: any;
}

export const IEGMSection = () => {
  const [isIegmExpanded, setIsIegmExpanded] = useState(true);
  const [isApontamentosExpanded, setIsApontamentosExpanded] = useState(true);
  const [filters, setFilters] = useState({});

  const iegmData: IEGMItem[] = [
    { name: 'Educação', score: 8.1, color: 'bg-green-500', icon: Book },
    { name: 'Saúde', score: 7.8, color: 'bg-green-500', icon: Heart },
    { name: 'Fiscal', score: 7.5, color: 'bg-green-500', icon: Briefcase },
    { name: 'Planejamento', score: 6.1, color: 'bg-yellow-500', icon: BarChart },
    { name: 'Transparência', score: 5.8, color: 'bg-red-500', icon: Search }
  ];

  const acoesPrioritariasDinamicas = [
    {
      titulo: "Implementar controles internos na execução orçamentária",
      orgao: "MP",
      prazo: "22/06/2025",
      status: "Urgente - 7 dias",
      link: "#apontamento-2"
    },
    {
      titulo: "Implementar sistema de controle patrimonial",
      orgao: "Auditoria Interna", 
      prazo: "20/06/2025",
      status: "Urgente - 5 dias",
      link: "#apontamento-5"
    },
    {
      titulo: "Regularizar contratação de serviço de limpeza",
      orgao: "TCE",
      prazo: "15/07/2025",
      status: "Em Andamento",
      link: "#apontamento-1"
    }
  ];

  return (
    <div className="space-y-6">
      {/* IEGM - Seção Aprimorada com Ícones */}
      <Card className="dashboard-card bg-gray-50 border-gray-200">
        <Collapsible open={isIegmExpanded} onOpenChange={setIsIegmExpanded}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-100 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-lumen-blue" />
                  <div>
                    <span className="text-lg font-semibold">IEGM - Efetividade da Gestão</span>
                    <div className="text-sm text-gray-600 mt-1">
                      Nota Geral: 7.1 – Última Avaliação: 2024 (fonte TCE-SP)
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                    Avaliação Oficial
                  </Badge>
                </div>
                {isIegmExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="bg-white rounded-lg mx-6 mb-6 p-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {iegmData.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="text-center space-y-3">
                      <div className={`w-20 h-20 rounded-full ${item.color} mx-auto flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                        {item.score}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-center space-x-2">
                          <IconComponent className="w-4 h-4 text-gray-600" />
                          <div className="text-sm font-semibold text-gray-800">{item.name}</div>
                        </div>
                        <div className="text-xs text-gray-600">
                          {item.score >= 7 ? 'Adequado' : item.score >= 6 ? 'Atenção' : 'Crítico'}
                        </div>
                        <Button size="sm" variant="outline" className="text-xs bg-white border-gray-300 hover:bg-gray-50">
                          <Clock className="w-3 h-3 mr-1" />
                          Ver histórico
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* NOVO: Painel de Apontamentos - Layout Kanban */}
      <Card className="dashboard-card">
        <Collapsible open={isApontamentosExpanded} onOpenChange={setIsApontamentosExpanded}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                  <span>Apontamentos Pendentes & Planos de Ação</span>
                  <Badge variant="outline" className="bg-orange-50 text-orange-700">Quadro de Ações</Badge>
                </div>
                {isApontamentosExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-6">
              {/* Cards Kanban Horizontais */}
              <ApontamentosKanbanCards />

              {/* Gráfico de Progresso */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ApontamentosChart />
                
                {/* Ações Prioritárias Dinâmicas */}
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      Ações Prioritárias
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {acoesPrioritariasDinamicas.map((acao, index) => (
                        <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <div className="font-medium text-sm text-gray-900 flex-1">
                              {acao.titulo}
                            </div>
                            <Badge className={`ml-2 text-xs ${acao.status.includes('Urgente') ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {acao.status}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>Órgão: {acao.orgao}</span>
                            <span>Prazo: {acao.prazo}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tabela Detalhada */}
              <ApontamentosTable filters={filters} />
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
};
