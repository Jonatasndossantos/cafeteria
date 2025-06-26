
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts";
import { Button } from "@/Components/ui/button";

const tributosMock = [
  { name: "IPTU", atual: 18000000, meta: 20000000, inadimplencia: "11%", historico: [17800000, 17200000, 16500000], principaisContribuintes: ["Construtora Alpha", "Supermercados Beta"], legislacao: "Lei 101/2009" },
  { name: "ISSQN", atual: 11500000, meta: 11600000, inadimplencia: "7%", historico: [11200000, 10800000, 10300000], principaisContribuintes: ["Clínica Gama", "Serviços Delta"], legislacao: "Lei 32/2011" },
  { name: "ITBI", atual: 3400000, meta: 3000000, inadimplencia: "3%", historico: [3100000, 2950000, 2890000], principaisContribuintes: ["Imobiliária Zeta"], legislacao: "Lei 91/2012" },
  { name: "Taxas", atual: 1800000, meta: 2000000, inadimplencia: "5%", historico: [1720000, 1600000, 1580000], principaisContribuintes: ["Market XYZ"], legislacao: "Lei 89/2018" },
  { name: "Multas", atual: 700000, meta: 1000000, inadimplencia: "21%", historico: [840000, 900000, 860000], principaisContribuintes: ["Auto Posto Fast"], legislacao: "Lei 51/2014" },
  { name: "Outras", atual: 500000, meta: 900000, inadimplencia: "18%", historico: [560000, 530000, 580000], principaisContribuintes: ["Diversos"], legislacao: "Lei 12/2016" },
];

const tributosWithPercentual = tributosMock.map((t) => ({
  ...t,
  percentual: `${Math.round((t.atual / t.meta) * 100)}%`,
}));

const colorArr = [
  "#36B37E", // IPTU
  "#FFAB00", // ISSQN
  "#0052CC", // ITBI
  "#6554C0", // Taxas
  "#F44336", // Multas
  "#89B6FA", // Outras
];

export type Tribute = typeof tributosMock[0];

export const InteractiveTributesChart: React.FC<{
  onBarClick: (t: Tribute) => void;
  onVerMaisClick: () => void;
}> = ({ onBarClick, onVerMaisClick }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-3">
        <h2 className="font-bold text-xl ml-2">Composição da Receita Própria</h2>
        <Button
          size="sm"
          variant="outline"
          className="text-blue-700 border-blue-100 bg-blue-50 hover:bg-blue-100"
          onClick={onVerMaisClick}
        >
          Ver Mais
        </Button>
      </div>
      <div className="w-full max-w-2xl mx-auto">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={tributosWithPercentual}
            layout="vertical"
            margin={{ top: 12, right: 32, left: 10, bottom: 30 }}
            barGap={10}
          >
            <XAxis
              type="number"
              tickFormatter={(v) => `R$ ${(v / 1_000_000).toFixed(0)} mi`}
              domain={[0, Math.max(...tributosWithPercentual.map(t => Math.max(t.atual, t.meta))) * 1.1]}
              axisLine={false}
              tickLine={false}
              className="text-xs"
            />
            <YAxis
              dataKey="name"
              type="category"
              width={85}
              axisLine={false}
              tickLine={false}
              className="font-bold"
            />
            <Tooltip
              formatter={(value: number, key) => [`R$ ${(value as number).toLocaleString("pt-BR")}`, key === "atual" ? "Arrecadado" : "Meta"]}
            />
            <Bar
              dataKey="meta"
              radius={[0, 12, 12, 0]}
              fill="#e8ebf8"
              maxBarSize={18}
              background={false}
              isAnimationActive={false}
              label={false}
            />
            <Bar
              dataKey="atual"
              radius={[0, 12, 12, 0]}
              isAnimationActive={false}
              onClick={(_, idx) => onBarClick(tributosWithPercentual[idx])}
              fill="#2563eb"
            >
              <LabelList
                dataKey="percentual"
                position="insideRight"
                style={{ fontSize: 12, fill: "#fff", fontWeight: 600 }}
              />
              {tributosWithPercentual.map((_, idx) => (
                <Cell key={idx} fill={colorArr[idx]} cursor="pointer" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="text-sm text-gray-600 text-center mt-2">
          Clique em um tributo para detalhar histórico e inadimplência.
        </div>
      </div>
    </div>
  );
};
