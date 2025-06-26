
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/Components/ui/card";

export function RecomendacoesMitigacao() {
  return (
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
  );
}
