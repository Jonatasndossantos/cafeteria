
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "@/Components/ui/button";

// Mock para os 5 anos, usando valores fictícios (a produção usaria API)
const evolutionYears = [
  { ano: "2020", IPTU: 16200000, ISSQN: 10000000, ITBI: 2600000, Taxas: 1500000, Multas: 690000, Outras: 400000 },
  { ano: "2021", IPTU: 17200000, ISSQN: 10500000, ITBI: 2890000, Taxas: 1580000, Multas: 810000, Outras: 500000 },
  { ano: "2022", IPTU: 17800000, ISSQN: 11200000, ITBI: 3100000, Taxas: 1720000, Multas: 860000, Outras: 560000 },
  { ano: "2023", IPTU: 17980000, ISSQN: 11400000, ITBI: 3280000, Taxas: 1750000, Multas: 870000, Outras: 570000 },
  { ano: "2024", IPTU: 18000000, ISSQN: 11500000, ITBI: 3400000, Taxas: 1800000, Multas: 700000, Outras: 500000 },
];

const colors = {
  IPTU: "#36B37E", ISSQN: "#FFAB00", ITBI: "#0052CC", Taxas: "#6554C0", Multas: "#F44336", Outras: "#89B6FA"
};

export const RevenueEvolutionModal: React.FC<{ open: boolean; onOpenChange: (open: boolean) => void }> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Evolução dos Principais Tributos (últimos 5 anos)</DialogTitle>
        </DialogHeader>
        <div className="w-full pt-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={evolutionYears}>
              <XAxis dataKey="ano" />
              <YAxis tickFormatter={v => `R$ ${(v/1_000_000).toFixed(0)} mi`} />
              <Tooltip
                formatter={(v: number, key: string) =>
                  [`R$ ${(v as number).toLocaleString("pt-BR")}`, key]
                }
              />
              <Legend />
              {Object.keys(colors).map(key => (
                <Bar key={key} dataKey={key} fill={colors[key as keyof typeof colors]} stackId="a" radius={[4, 4, 0, 0]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6">
          <span className="font-semibold">Outras Funcionalidades:</span>
          <ul className="list-disc ml-6 text-gray-700 mt-2 text-sm space-y-1">
            <li>Receita por faixa: Ex (IPTU até 200 mil / acima de 1 milhão), detalhamento futuro.</li>
            <li>Comparativo orçado x realizado: incluir próximo release.</li>
            <li>Projeção e tendências: personalizar conforme necessidade.</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};
