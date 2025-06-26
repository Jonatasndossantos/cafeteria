
import React from "react";
import { Card, CardContent, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { AlertTriangle, Clock, Lightbulb, HandHeart, ArrowRight } from "lucide-react";

export const FinancialAlertsSection = () => {
  // Mock de alertas, pode extrair da lógica real depois.
  const alerts = [
    {
      tipo: "danger",
      icon: AlertTriangle,
      titulo: "Volume de RAP Crescendo",
      msg: "Volume de RAP não processados crescendo acima do limite prudencial.",
      acao: "Revisar Empenhos"
    },
    {
      tipo: "warning",
      icon: Clock,
      titulo: "RAPs Antigos",
      msg: "Existência de RAPs com mais de 180 dias sem liquidação.",
      acao: "Priorizar Liquidação"
    },
    {
      tipo: "info",
      icon: Lightbulb,
      titulo: "Oportunidade de Arrecadação",
      msg: "Intensificar fiscalização de ISSQN na categoria de serviços.",
      acao: "Ver Detalhes"
    },
    {
      tipo: "success",
      icon: HandHeart,
      titulo: "Renegociação Recomendada",
      msg: "Avaliar renegociação de RAPs antigos para redução de passivos.",
      acao: "Analisar Propostas"
    },
  ];

  const alertConfig = {
    danger: {
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-800",
      iconColor: "text-red-600",
      badgeColor: "bg-red-100 text-red-700",
      buttonColor: "bg-red-600 hover:bg-red-700"
    },
    warning: {
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-800",
      iconColor: "text-yellow-600",
      badgeColor: "bg-yellow-100 text-yellow-700",
      buttonColor: "bg-yellow-600 hover:bg-yellow-700"
    },
    info: {
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-800",
      iconColor: "text-blue-600",
      badgeColor: "bg-blue-100 text-blue-700",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    success: {
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-800",
      iconColor: "text-green-600",
      badgeColor: "bg-green-100 text-green-700",
      buttonColor: "bg-green-600 hover:bg-green-700"
    }
  };

  return (
    <section className="mt-20">
      <div className="mb-8">
        <h3 className="font-bold text-2xl text-gray-800 mb-2">Alertas e Recomendações Inteligentes</h3>
        <p className="text-gray-600">Insights automáticos baseados na análise dos dados financeiros</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {alerts.map((alert, idx) => {
          const config = alertConfig[alert.tipo as keyof typeof alertConfig];
          const IconComponent = alert.icon;
          
          return (
            <Card key={idx} className={`${config.bgColor} border-2 ${config.borderColor} hover:shadow-lg transition-all duration-200`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 p-2 rounded-lg ${config.badgeColor}`}>
                    <IconComponent className={`w-6 h-6 ${config.iconColor}`} />
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div>
                      <h4 className={`font-semibold text-lg ${config.textColor} mb-1`}>
                        {alert.titulo}
                      </h4>
                      <p className={`text-sm ${config.textColor} opacity-90`}>
                        {alert.msg}
                      </p>
                    </div>
                    
                    <button className={`w-full px-4 py-2 ${config.buttonColor} text-white font-medium rounded-lg transition flex items-center justify-center gap-2`}>
                      {alert.acao}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <Lightbulb className="w-5 h-5 text-amber-600" />
          <div>
            <h5 className="font-medium text-gray-800">IA-LUX - Análise Inteligente</h5>
            <p className="text-sm text-gray-600 mt-1">
              Os alertas são gerados automaticamente com base na análise dos dados financeiros e padrões identificados pela inteligência artificial.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
