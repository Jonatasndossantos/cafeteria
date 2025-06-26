
import React from "react";
import { Card, CardContent } from "@/Components/ui/card";

const alertas = [
  { tipo: "Contratos", quantidade: 8, criticidade: "media" },
  { tipo: "Receitas", quantidade: 3, criticidade: "alta" },
  { tipo: "Limites Legais", quantidade: 2, criticidade: "alta" },
  { tipo: "Prazos", quantidade: 5, criticidade: "critica" }
];

const getCriticidadeColor = (criticidade: string) => {
  switch (criticidade) {
    case "critica": return "border-l-4 border-red-600 bg-red-50";
    case "alta": return "border-l-4 border-yellow-500 bg-yellow-50";
    case "media": return "border-l-4 border-blue-500 bg-blue-50";
    default: return "border-l-4 border-gray-400 bg-gray-50";
  }
};

export function AlertasEspecificos() {
  return (
    <div>
      <h3 className="text-xl font-montserrat font-semibold text-lumen-blue mb-4">Alertas Específicos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {alertas.map((alerta, index) => (
          <Card key={index} className={`dashboard-card ${getCriticidadeColor(alerta.criticidade)}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm text-gray-700">{alerta.tipo}</h3>
                <div className={`w-3 h-3 rounded-full ${
                  alerta.criticidade === "critica" ? "bg-red-600" :
                  alerta.criticidade === "alta" ? "bg-yellow-600" : "bg-blue-600"
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
  );
}
