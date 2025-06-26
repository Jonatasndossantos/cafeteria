
import React from "react";
import { Card, CardContent, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { ArrowRight, Info, History } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/Components/ui/tooltip";
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, CartesianGrid, BarChart, Bar, Cell } from "recharts";

export const RemainingPaymentsSection = () => {
  // Mock de dados
  const totalRAP = 5_800_000;
  const processados = 3_100_000;
  const naoProcessados = 2_700_000;
  const evolucaoRAP = [
    { mes: "Jan", valor: 4200000 },
    { mes: "Fev", valor: 5300000 },
    { mes: "Mar", valor: 5700000 },
    { mes: "Abr", valor: 5600000 },
    { mes: "Mai", valor: 5800000 },
  ];
  const idadeRAP = [
    { faixa: "< 90d", valor: 2_300_000, cor: "#10B981" },
    { faixa: "91-180d", valor: 1_000_000, cor: "#F59E0B" },
    { faixa: "> 180d", valor: 1_500_000, cor: "#EF4444" },
    { faixa: "> 1 ano", valor: 1_000_000, cor: "#7C2D12" }
  ];

  const dangerFaixa = idadeRAP.some(i => i.faixa === "> 1 ano" && i.valor > 800_000);

  const pct = (valor: number) => (valor / totalRAP * 100).toFixed(1) + "%";
  const format = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  const formatTooltip = (value: number) => format(value);

  return (
    <TooltipProvider>
      <section className="mt-20 space-y-16">
        <Card>
          <CardContent className="py-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-3">
                <CardTitle className="text-xl">Restos a Pagar (RAP) - Total</CardTitle>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-5 h-5 text-blue-500 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm">
                    <div className="text-sm space-y-2">
                      <p><strong>RAP Processado:</strong> Empenho liquidado, mas não pago.</p>
                      <p><strong>RAP Não Processado:</strong> Empenho feito, mas ainda sem liquidação.</p>
                      <p className="text-yellow-600"><strong>Impacto:</strong> Ambos comprometem a execução orçamentária do próximo exercício.</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <span className="font-mono text-3xl text-blue-700">{format(totalRAP)}</span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Badge variant="destructive" className="text-sm font-semibold">
                    RAP Não processados: {format(naoProcessados)} ({pct(naoProcessados)})
                  </Badge>
                  <Badge variant="secondary" className="text-sm font-semibold">
                    RAP Processados: {format(processados)} ({pct(processados)})
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="bg-amber-100 hover:bg-amber-200 text-amber-700 font-semibold px-6 py-2 rounded-full text-sm transition flex items-center gap-2 whitespace-nowrap">
                <History size={16} />
                Ver Histórico RAPs
              </button>
              <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold px-6 py-2 rounded-full text-sm transition flex items-center gap-2 whitespace-nowrap">
                Detalhar RAPs <ArrowRight size={14}/>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Análise por Idade dos RAPs */}
        <Card>
          <CardContent className="py-8">
            <CardTitle className="mb-6 text-lg">Análise por Idade dos RAPs</CardTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {idadeRAP.map((item, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4 border-l-4" style={{ borderLeftColor: item.cor }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">{item.faixa}</span>
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.cor }}></div>
                  </div>
                  <div className="text-xl font-bold font-mono" style={{ color: item.cor }}>
                    {format(item.valor)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {pct(item.valor)} do total
                  </div>
                </div>
              ))}
            </div>
            {dangerFaixa && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-700">
                  <Info className="w-4 h-4" />
                  <span className="text-sm font-semibold">Atenção: RAPs com mais de 1 ano representam risco de prescrição.</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </TooltipProvider>
  );
};
