
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Progress } from "@/Components/ui/progress";

const riscos = [
  { titulo: "Limite de Despesa com Pessoal", categoria: "fiscal", gravidade: "alta", probabilidade: 85, impacto: "critico", status: "ativo" },
  { titulo: "Contratos com Risco de Glosa", categoria: "legal", gravidade: "media", probabilidade: 60, impacto: "alto", status: "monitoramento" },
  { titulo: "Queda na Arrecadação de IPTU", categoria: "financeiro", gravidade: "media", probabilidade: 70, impacto: "medio", status: "plano_acao" },
  { titulo: "Obras Paralisadas", categoria: "operacional", gravidade: "alta", probabilidade: 90, impacto: "alto", status: "ativo" }
];

const getGravidadeColor = (gravidade: string) => {
  switch (gravidade) {
    case "alta": return "text-red-600 bg-red-50 border-red-200";
    case "media": return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case "baixa": return "text-green-600 bg-green-50 border-green-200";
    default: return "text-gray-600 bg-gray-50 border-gray-200";
  }
};

const getStatusBadgePred = (status: string) => {
  switch (status) {
    case "ativo": return { variant: "destructive" as const, text: "Ativo" };
    case "monitoramento": return { variant: "secondary" as const, text: "Monitoramento" };
    case "plano_acao": return { variant: "outline" as const, text: "Plano de Ação" };
    default: return { variant: "outline" as const, text: status };
  }
};

export function AnaliseRiscos() {
  return (
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
                  <Badge {...getStatusBadgePred(risco.status)} className="text-xs">
                    {getStatusBadgePred(risco.status).text}
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
  );
}
