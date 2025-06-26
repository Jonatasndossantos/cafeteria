
import React from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Progress } from "@/Components/ui/progress";
import { Badge } from "@/Components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, ArrowRight, DollarSign, TrendingDown, BarChart, Banknote, PiggyBank } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/Components/ui/tooltip";

const statusMap = {
  success: { color: "bg-green-500", icon: <CheckCircle className="text-green-600" size={20} />, label: "Confortável" },
  warning: { color: "bg-yellow-500", icon: <AlertTriangle className="text-yellow-600" size={20} />, label: "Atenção" },
  danger: { color: "bg-red-500", icon: <XCircle className="text-red-600" size={20} />, label: "Crítico" },
};

const cardIcons = {
  receita: DollarSign,
  despesa: TrendingDown,
  execucao: BarChart,
  saldo: Banknote,
  liquidez: PiggyBank
};

export const FinancialSummaryCards = () => {
  // Dados fictícios, trocar por dados dinâmicos ao integrar.
  const cards = [
    {
      title: "Receita Total",
      value: 145_200_000,
      meta: 150_000_000,
      status: "success",
      sub: "Meta anual: R$ 150M",
      details: "Ver Detalhes",
      icon: "receita",
      tooltip: "Total de receitas arrecadadas no exercício, incluindo receitas próprias e transferências."
    },
    {
      title: "Despesa Empenhada",
      value: 112_800_000,
      meta: 145_200_000,
      status: "warning",
      sub: "77,7% da Receita",
      details: "Ver Detalhes",
      icon: "despesa",
      tooltip: "Valor dos empenhos realizados, representando compromissos assumidos pela administração."
    },
    {
      title: "Disponível para Execução",
      value: 32_400_000,
      meta: null,
      status: "success",
      sub: "Saldo atual",
      details: "Ver Detalhes",
      icon: "saldo",
      tooltip: "Recursos disponíveis para novas despesas, após deduzidas as despesas empenhadas."
    },
    {
      title: "Execução Orçamentária",
      value: 77.7,
      meta: 90,
      status: "warning",
      sub: "Meta: 90%",
      percent: true,
      details: "Ver Detalhes",
      icon: "execucao",
      tooltip: "Percentual de execução do orçamento aprovado. Meta recomendada: 90% até o final do exercício."
    },
    {
      title: "Saldo em Caixa / Liquidez Imediata",
      value: 21_800_000,
      meta: 7_000_000,
      status: "success",
      sub: "Compromissos próximos 7 dias: R$7M",
      details: "Ver Detalhes",
      icon: "liquidez",
      tooltip: "Recursos disponíveis em conta corrente para pagamento de compromissos de curto prazo."
    },
  ];

  const formatCurrency = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        {cards.map((c, idx) => {
          const IconComponent = cardIcons[c.icon as keyof typeof cardIcons];
          return (
            <Card key={idx} className="relative dashboard-card group ring-1 ring-gray-100 hover:shadow-xl transition-all duration-200 h-48">
              <CardContent className="py-6 px-4 flex flex-col gap-3 h-full">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger>
                        <IconComponent className="w-5 h-5 text-blue-600" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs max-w-xs">{c.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                    <h3 className="font-semibold text-xs text-gray-600 uppercase tracking-wide">{c.title}</h3>
                  </div>
                  <span className={`inline-block w-5 h-5 rounded-full ${statusMap[c.status as keyof typeof statusMap].color}`}></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold font-mono">
                    {c.percent ? `${c.value}%` : formatCurrency(c.value)}
                  </span>
                  <Badge 
                    variant="outline"
                    className={`rounded-full px-2 ${statusMap[c.status as keyof typeof statusMap].color} bg-opacity-10 text-xs`}>
                    {statusMap[c.status as keyof typeof statusMap].label}
                  </Badge>
                </div>
                {c.meta && (
                  <div className="text-xs text-gray-500">Meta: {c.percent ? `${c.meta}%` : formatCurrency(c.meta)}</div>
                )}
                <div className="flex-1 text-xs text-gray-400">{c.sub}</div>
                {c.percent && <Progress value={c.value as number} className="h-2 mt-3" />}
                <button className="mt-4 font-semibold flex items-center gap-2 text-blue-700 hover:underline transition group-hover:text-blue-900 text-xs">
                  {c.details}
                  <ArrowRight size={14} strokeWidth={2} />
                </button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </TooltipProvider>
  );
};
