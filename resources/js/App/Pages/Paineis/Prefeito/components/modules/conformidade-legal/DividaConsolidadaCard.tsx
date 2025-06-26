
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/Components/ui/collapsible";
import { Badge } from "@/Components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/Components/ui/table";
import { Progress } from "@/Components/ui/progress";
import { AlertTriangle, CreditCard, TrendingUp } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label
} from "recharts";

// Dados mockados
const detailsDivida = {
  rcl: 106400000,
  dcl: 21280000,
  percentual: 20.0,
  limiteMaximo: 120.0,
  status: "Conforme",
  fonte: "Res. SF nº 40/2001 e LRF arts. 29-31"
};

const composicaoDivida = [
  { tipo: "Parcelamento Previdenciário", valor: 8000000, percentualRCL: 7.5 },
  { tipo: "Contrato com Banco Público", valor: 6500000, percentualRCL: 6.1 },
  { tipo: "Restos a Pagar (processados)", valor: 4280000, percentualRCL: 4.0 },
  { tipo: "Outros Títulos da Dívida", valor: 2500000, percentualRCL: 2.4 }
];

// Simulação de evolução mensal (12 meses)
const evolucaoMensalDivida = [
  { mes: "Jul/23", valor: 19800000 },
  { mes: "Ago/23", valor: 19950000 },
  { mes: "Set/23", valor: 20070000 },
  { mes: "Out/23", valor: 20200000 },
  { mes: "Nov/23", valor: 20550000 },
  { mes: "Dez/23", valor: 20800000 },
  { mes: "Jan/24", valor: 20900000 },
  { mes: "Fev/24", valor: 21050000 },
  { mes: "Mar/24", valor: 21100000 },
  { mes: "Abr/24", valor: 21180000 },
  { mes: "Mai/24", valor: 21230000 },
  { mes: "Jun/24", valor: 21280000 },
];

// Formatação simple de valores
function currency(val: number) {
  return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });
}
function percent(val: number) {
  return val.toLocaleString("pt-BR", { minimumFractionDigits: 1 }) + "%";
}

export function DividaConsolidadaCard() {
  const [open, setOpen] = useState(false);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lumen-blue">
            <CreditCard size={22} className="text-lumen-blue" />
            Dívida Consolidada
          </CardTitle>
          <Badge variant="default" className="bg-green-100 text-green-700 border-green-200">Conforme</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Resumo compacto */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <div className="flex items-center gap-4">
            <div>
              <span className="block text-xs text-gray-500">Percentual sobre RCL</span>
              <span className="text-2xl font-bold text-lumen-blue">{percent(detailsDivida.percentual)}</span>
            </div>
            <span className="hidden md:inline-block text-gray-400">|</span>
            <div>
              <span className="block text-xs text-gray-500">Limite Legal</span>
              <span className="text-lg font-medium text-gray-800">{detailsDivida.limiteMaximo}%</span>
            </div>
          </div>
          <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger asChild>
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-lumen-blue to-lumen-blue-light text-white hover:from-blue-700 hover:to-blue-500 shadow transition"
              >
                {open ? "Ocultar" : "Ver detalhes"}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-6 animate-fade-in">
              {/* Cálculo da Situação Atual */}
              <section className="border rounded-lg bg-lumen-blue/10 p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-1 text-lumen-blue">
                  <CreditCard size={17} /> Cálculo da Situação Atual
                </h4>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-gray-600">Receita Corrente Líquida (RCL)</TableCell>
                      <TableCell className="font-semibold">{currency(detailsDivida.rcl)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-gray-600">Dívida Consolidada Líquida (DCL)</TableCell>
                      <TableCell className="font-semibold">{currency(detailsDivida.dcl)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-gray-600">Percentual sobre RCL</TableCell>
                      <TableCell>
                        <span className="font-bold text-lumen-blue">{percent(detailsDivida.percentual)} </span>
                        <Badge variant="default" className="ml-1 bg-green-100 text-green-700 border-green-200">Conforme</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-gray-600">Limite Legal</TableCell>
                      <TableCell className="font-semibold">{detailsDivida.limiteMaximo}% da RCL</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <p className="text-xs text-gray-500 mt-1">Fonte: {detailsDivida.fonte}</p>
              </section>
              {/* Composição da Dívida */}
              <section>
                <h4 className="font-semibold mb-2 flex items-center gap-1 text-lumen-blue">
                  <TrendingUp size={17} /> Composição da Dívida
                </h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo de Endividamento</TableHead>
                      <TableHead>Valor Atual</TableHead>
                      <TableHead>% da RCL</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {composicaoDivida.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{item.tipo}</TableCell>
                        <TableCell>{currency(item.valor)}</TableCell>
                        <TableCell>{percent(item.percentualRCL)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell className="font-semibold">Total DCL</TableCell>
                      <TableCell className="font-semibold">{currency(detailsDivida.dcl)}</TableCell>
                      <TableCell className="font-semibold">{percent(detailsDivida.percentual)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </section>
              {/* Gráfico de Evolução Mensal */}
              <section>
                <h4 className="font-semibold mb-2 flex items-center gap-1 text-lumen-blue">
                  <TrendingUp size={17} /> Evolução Mensal da DCL
                </h4>
                <div className="w-full h-60 bg-white rounded-lg p-2 border">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={evolucaoMensalDivida}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis tickFormatter={v => (v/1_000_000).toFixed(0) + "M"}>
                        <Label angle={-90} value="Valor (R$)" position="insideLeft" offset={-5} />
                      </YAxis>
                      <Tooltip formatter={(v: number) => currency(v as number)} />
                      <Bar dataKey="valor" fill="#255ad6" radius={[4, 4, 0, 0]} />
                      {/* Linha de limite */}
                      <ReferenceLine y={detailsDivida.rcl * detailsDivida.limiteMaximo / 100} stroke="#e11d48" strokeDasharray="4 2">
                        <Label value="Limite 120%" position="top" fill="#e11d48" fontSize={12} />
                      </ReferenceLine>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </section>
              {/* Alerta da IA-LUX */}
              <section className="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4 flex gap-3 items-start">
                <AlertTriangle size={30} className="text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-bold text-yellow-800">Alerta IA-LUX:</span>
                  <ul className="ml-2 mt-1 list-disc text-sm text-yellow-900 space-y-1">
                    <li>
                      O município mantém dívida consolidada <strong>dentro dos limites legais</strong>.
                      <span className="ml-1">Atenção ao aumento progressivo dos <b>parcelamentos previdenciários</b> — tendência de crescimento constante nos últimos 6 meses.</span>
                    </li>
                    <li>
                      Evite contratar novas operações de crédito sem comprovação de <b>capacidade de pagamento</b> e autorização legislativa formal.
                    </li>
                  </ul>
                </div>
              </section>
              {/* Consequências do Descumprimento */}
              <section>
                <h4 className="font-semibold mb-2 flex items-center gap-1 text-lumen-blue">
                  <AlertTriangle size={17} className="text-red-500" /> Consequências do Descumprimento
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="border-l-4 border-red-700 bg-red-50 rounded px-4 py-3 text-sm">
                    <span className="font-bold text-red-700">🚫 Impedimentos:</span>
                    <ul className="ml-3 list-disc">
                      <li>Impedido de receber transferências voluntárias</li>
                      <li>Proibição de novas operações de crédito</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-red-600 bg-red-50 rounded px-4 py-3 text-sm">
                    <span className="font-bold text-red-700">⏰ Obrigações:</span>
                    <ul className="ml-3 list-disc">
                      <li>Obrigação de reduzir o excedente da dívida em até 3 anos (mín. 25% ao ano)</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-red-500 bg-red-50 rounded px-4 py-3 text-sm">
                    <span className="font-bold text-red-700">⚖️ Sanções:</span>
                    <ul className="ml-3 list-disc">
                      <li>Sujeito a sanções do TCE e STN</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Base legal: LRF (Art. 31)</p>
              </section>
            </CollapsibleContent>
          </Collapsible>
        </div>
        {/* Progress bar visual rápida */}
        <div className="mt-2">
          <Progress className="h-2" value={detailsDivida.percentual / detailsDivida.limiteMaximo * 100} />
        </div>
      </CardContent>
    </Card>
  );
}
