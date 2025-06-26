
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Progress } from "@/Components/ui/progress";
import { Button } from "@/Components/ui/button";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

const unifiedIndicators = [
  {
    title: "Gastos com Pessoal",
    value: "47,8%",
    status: "atencao",
    color: "yellow",
    icon: "👥",
    probabilidade: 75,
    description: "Folha de pagamento próxima ao limite da LRF",
    detalhes: [
      { item: "Secretaria de Educação", valor: "15,2%" },
      { item: "Secretaria de Saúde", valor: "12,8%" },
      { item: "Administração Geral", valor: "8,9%" }
    ],
    acao: "Espada 3 - Gestão de Pessoal"
  },
  {
    title: "Execução Orçamentária",
    value: "95,1%",
    status: "ok",
    color: "green",
    icon: "💰",
    probabilidade: 30,
    description: "Execução dentro do limite saudável",
    detalhes: [
      { item: "Investimentos", valor: "78,5%" },
      { item: "Custeio", valor: "92,3%" },
      { item: "Pessoal", valor: "98,7%" }
    ],
    acao: "Espada 1 - Orçamento"
  },
  {
    title: "Tendência da Arrecadação",
    value: "-8,0%",
    status: "atencao",
    color: "yellow",
    icon: "📊",
    probabilidade: 70,
    description: "Queda na arrecadação comprometendo receitas",
    detalhes: [
      { item: "IPTU", valor: "-12,5%" },
      { item: "ISS", valor: "-5,3%" },
      { item: "Taxas", valor: "-3,2%" }
    ],
    acao: "Espada 2 - Receitas"
  },
  {
    title: "Obras Paralisadas",
    value: "3 obras",
    status: "atencao",
    color: "yellow",
    icon: "🏗️",
    probabilidade: 90,
    description: "Obras paradas há mais de 45 dias",
    detalhes: [
      { item: "Centro de Saúde Bairro Norte", valor: "67 dias" },
      { item: "Pavimentação Rua Principal", valor: "52 dias" },
      { item: "Escola Municipal Sul", valor: "48 dias" }
    ],
    acao: "Espada 4 - Obras"
  },
  {
    title: "Contratos em Risco",
    value: "5 contratos",
    status: "critico",
    color: "red",
    icon: "📋",
    probabilidade: 85,
    description: "Contratos com risco de sanção do TCE",
    detalhes: [
      { item: "Limpeza Urbana S/A", valor: "Pendência documental" },
      { item: "Transporte Escolar Ltda", valor: "Atraso prestação contas" },
      { item: "Manutenção Pred. Públicos", valor: "Irregularidade fiscal" }
    ],
    acao: "Espada 7 - Contratos"
  },
  {
    title: "Pressão Orçamentária da Saúde",
    value: "22,1%",
    status: "critico",
    color: "red",
    icon: "🩺",
    probabilidade: 85,
    description: "Gastos da Saúde comprometendo outras áreas",
    detalhes: [
      { item: "Medicamentos Alto Custo", valor: "35% do orçamento" },
      { item: "Ações Judiciais", valor: "18 ações ativas" },
      { item: "Contratos OSs", valor: "R$ 2,8 MI/mês" }
    ],
    acao: "Espada 6 - Saúde"
  }
];

const statusMap = {
  ok: { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500", border: "border-green-200" },
  atencao: { bg: "bg-yellow-50", text: "text-yellow-800", dot: "bg-yellow-500", border: "border-yellow-200" },
  critico: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500", border: "border-red-200" }
};

export function UnifiedRiskIndicators() {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const toggleCard = (index: number) => {
    setExpandedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle>Indicadores Preditivos & Análise de Riscos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {unifiedIndicators.map((indicator, index) => {
            const st = statusMap[indicator.status];
            const isExpanded = expandedCards.includes(index);
            
            return (
              <div key={index} className={`border rounded-xl shadow-lg ${st.bg} ${st.border} hover:scale-105 transition-transform`}>
                {/* Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${st.dot}`}></span>
                      <span className="text-lg">{indicator.icon}</span>
                      <span className={`font-bold text-sm ${st.text}`}>{indicator.title}</span>
                    </div>
                    <Badge variant={indicator.status === 'critico' ? 'destructive' : indicator.status === 'atencao' ? 'secondary' : 'default'}>
                      {indicator.value}
                    </Badge>
                  </div>
                  
                  {/* Barra de Risco */}
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Probabilidade de Risco</span>
                      <span>{indicator.probabilidade}%</span>
                    </div>
                    <Progress value={indicator.probabilidade} className="h-2" />
                  </div>
                  
                  <p className="text-sm text-gray-600">{indicator.description}</p>
                </div>

                {/* Detalhes Expansíveis */}
                {isExpanded && (
                  <div className="p-4 border-b border-gray-200">
                    <h5 className="font-semibold text-sm mb-2">Detalhamento:</h5>
                    <div className="space-y-1">
                      {indicator.detalhes.map((detalhe, idx) => (
                        <div key={idx} className="flex justify-between text-xs">
                          <span>{detalhe.item}</span>
                          <span className="font-medium">{detalhe.valor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="p-4 flex justify-between items-center">
                  <Button
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleCard(index)}
                    className="text-xs"
                  >
                    {isExpanded ? <ChevronUp className="w-3 h-3 mr-1" /> : <ChevronDown className="w-3 h-3 mr-1" />}
                    {isExpanded ? 'Menos' : 'Detalhes'}
                  </Button>
                  
                  <Button variant="default" size="sm" className="text-xs">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    {indicator.acao}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
