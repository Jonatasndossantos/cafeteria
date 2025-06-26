
import React from "react";
import { Card, CardContent, CardTitle } from "@/Components/ui/card";
import { InteractiveTributesChart } from "./InteractiveTributesChart";
import { TributeDetailModal } from "./TributeDetailModal";
import { RevenueEvolutionModal } from "./RevenueEvolutionModal";

export const RevenueAnalysisSection = () => {
  // Cards dos Tributos: mantidos
  const [selectedTribute, setSelectedTribute] = React.useState<null | any>(null);
  const [detailOpen, setDetailOpen] = React.useState(false);
  const [evoOpen, setEvoOpen] = React.useState(false);

  // (Os mesmos tributos do chart)
  const tributos = [
    {
      name: "IPTU",
      valor: 18_000_000,
      meta: 20_000_000,
      mesAtual: 2_000_000,
      anterior: 1_800_000,
      status: "success",
    },
    {
      name: "ISSQN",
      valor: 11_500_000,
      meta: 11_600_000,
      mesAtual: 1_100_000,
      anterior: 1_400_000,
      status: "warning",
    },
    {
      name: "ITBI",
      valor: 3_400_000,
      meta: 3_000_000,
      mesAtual: 300_000,
      anterior: 250_000,
      status: "success",
    },
    {
      name: "Taxas",
      valor: 1_800_000,
      meta: 2_000_000,
      mesAtual: 150_000,
      anterior: 190_000,
      status: "danger",
    },
    {
      name: "Multas",
      valor: 700_000,
      meta: 1_000_000,
      mesAtual: 60_000,
      anterior: 70_000,
      status: "danger",
    },
    {
      name: "Outras",
      valor: 500_000,
      meta: 900_000,
      mesAtual: 40_000,
      anterior: 60_000,
      status: "warning",
    },
  ];

  const statusColor = {
    success: "text-green-600",
    danger: "text-red-600",
    warning: "text-yellow-500",
  };
  const format = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

  return (
    <section className="space-y-12 mt-20">
      {/* Gráfico de Barras Interativo */}
      <Card>
        <CardContent className="py-8">
          <InteractiveTributesChart
            onBarClick={(tribute) => {
              setSelectedTribute(tribute);
              setDetailOpen(true);
            }}
            onVerMaisClick={() => setEvoOpen(true)}
          />
          <TributeDetailModal
            open={detailOpen}
            onOpenChange={setDetailOpen}
            tribute={selectedTribute}
          />
          <RevenueEvolutionModal
            open={evoOpen}
            onOpenChange={setEvoOpen}
          />
        </CardContent>
      </Card>

      {/* Cards dos Tributos (mantidos, para rápida visualização individual) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {tributos.map((t) => (
          <Card key={t.name} className="min-h-[220px]">
            <CardContent className="py-8 px-6 flex flex-col gap-4 h-full">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">{t.name}</span>
                <span className={`font-bold text-xl ${statusColor[t.status as keyof typeof statusColor]}`}>
                  {t.valor >= t.meta ? "✓" : t.anterior > t.mesAtual ? "↓" : "↑"}
                </span>
              </div>
              <div className="text-3xl font-mono text-blue-700">{format(t.valor)}</div>
              <div className="space-y-3 flex-1">
                <div className="text-sm text-gray-600">
                  Atingimento da meta: <span className="font-semibold">{(t.valor / t.meta * 100).toFixed(1)}%</span>
                </div>
                <div className="flex flex-col gap-2 text-xs text-gray-500">
                  <div>Este mês: {format(t.mesAtual)}</div>
                  <div>Mês anterior: {format(t.anterior)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Potencial arrecadação - mantido */}
      <Card>
        <CardContent className="py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="font-semibold text-lg">Potencial de Arrecadação</span>
            <div className="text-sm text-gray-600">Dívida Ativa - recuperação de curto prazo</div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="text-3xl font-mono text-blue-600">R$ 4.500.000</span>
            <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold px-6 py-2 rounded-full text-sm transition whitespace-nowrap">
              Ver Detalhes da Fiscalização
            </button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
