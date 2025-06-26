
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/Components/ui/collapsible";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import { Progress } from "@/Components/ui/progress";
import { AlertTriangle, Users, Scale } from "lucide-react";
import { ChartContainer } from "@/Components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ReferenceLine, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

// Dados mockados conforme instrução
const detailsPessoal = {
  rcl: 106400000, // Receita Corrente Líquida
  despesaTotal: 50840000, // Últimos 12 meses
  percentual: 47.8,
  limitePrudencial: 51.3, // 95% de 54%
  limiteMaximo: 54.0,
  status: "Atenção",
  fonte: "Art. 19 e 20 da LRF",
};

const composicaoPessoal = [
  { categoria: "Efetivos e Estatutários", valor: 2400000, percentual: 27.0 },
  { categoria: "Comissionados", valor: 620000, percentual: 7.0 },
  { categoria: "Contratados Temporários", valor: 410000, percentual: 4.6 },
  { categoria: "Encargos e Obrigações", valor: 790000, percentual: 9.2 },
];

const evolucaoMensalPessoal = [
  { mes: "Jan", percentual: 45.2 },
  { mes: "Fev", percentual: 46.1 },
  { mes: "Mar", percentual: 46.5 },
  { mes: "Abr", percentual: 46.8 },
  { mes: "Mai", percentual: 47.0 },
  { mes: "Jun", percentual: 47.2 },
  { mes: "Jul", percentual: 47.3 },
  { mes: "Ago", percentual: 47.4 },
  { mes: "Set", percentual: 47.6 },
  { mes: "Out", percentual: 47.7 },
  { mes: "Nov", percentual: 47.8 },
  { mes: "Dez", percentual: 47.8 },
];

export function DespesaPessoalCard() {
  return (
    <Card className={cn("kpi-card", detailsPessoal.status === "Atenção" && "border-yellow-400/80")}>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <Users className="text-blue-900/80" size={22} />
            Despesa com Pessoal
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Collapsible>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold">{detailsPessoal.percentual}%</span>
                <span className="ml-2">
                  <Badge variant="secondary" className="bg-yellow-400/80 text-yellow-900">{detailsPessoal.status}</Badge>
                </span>
              </div>
              <CollapsibleTrigger asChild>
                <button className="text-lumen-blue hover:underline font-medium text-sm transition-all">
                  Ver detalhes
                </button>
              </CollapsibleTrigger>
            </div>
            <Progress
              value={(detailsPessoal.percentual / detailsPessoal.limiteMaximo) * 100}
              className="h-2 bg-yellow-100/80"
            />
          </div>
          <CollapsibleContent>
            {/* Cálculo do Limite Legal */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-2">
                <Scale className="text-lumen-blue" size={18} />
                <span className="font-semibold text-base">Cálculo do Limite Legal</span>
              </div>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-muted-foreground font-medium">Receita Corrente Líquida (RCL)</TableCell>
                    <TableCell className="text-right font-mono">R$ {detailsPessoal.rcl.toLocaleString("pt-BR")}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-muted-foreground font-medium">Despesa total com pessoal (12 meses)</TableCell>
                    <TableCell className="text-right font-mono">R$ {detailsPessoal.despesaTotal.toLocaleString("pt-BR")}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-muted-foreground font-medium">Percentual Aplicado</TableCell>
                    <TableCell className="text-right font-bold text-yellow-800">{detailsPessoal.percentual}%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-muted-foreground font-medium">Limite Prudencial (95%)</TableCell>
                    <TableCell className="text-right font-mono">{detailsPessoal.limitePrudencial}%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-muted-foreground font-medium">Limite Máximo (Art. 20 LRF)</TableCell>
                    <TableCell className="text-right font-mono">{detailsPessoal.limiteMaximo}%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-muted-foreground font-medium">Fonte</TableCell>
                    <TableCell className="text-right">{detailsPessoal.fonte}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Composição da Despesa */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-2">
                <Users className="text-lumen-blue" size={18} />
                <span className="font-semibold text-base">Composição da Despesa com Pessoal</span>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Valor Mensal</TableHead>
                    <TableHead className="text-right">% da RCL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {composicaoPessoal.map((cat, i) => (
                    <TableRow key={i}>
                      <TableCell>{cat.categoria}</TableCell>
                      <TableCell className="text-right font-mono">R$ {cat.valor.toLocaleString("pt-BR")}</TableCell>
                      <TableCell className="text-right">{cat.percentual}%</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell className="font-bold">TOTAL</TableCell>
                    <TableCell className="text-right font-bold font-mono">R$ {composicaoPessoal.reduce((sum, c) => sum + c.valor, 0).toLocaleString("pt-BR")}</TableCell>
                    <TableCell className="text-right font-bold">{detailsPessoal.percentual}%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Gráfico de Evolução */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-2">
                <Scale className="text-lumen-blue" size={18} />
                <span className="font-semibold text-base">Evolução Mensal do Gasto com Pessoal</span>
              </div>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={evolucaoMensalPessoal}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="mes" />
                    <YAxis domain={[44, 56]} tickFormatter={v => v + "%"} />
                    <Tooltip formatter={v => v + "%"} />
                    <Line type="monotone" dataKey="percentual" stroke="#facc15" strokeWidth={3} dot={{ r: 4 }} name="Percentual Aplicado"/>
                    <ReferenceLine y={detailsPessoal.limitePrudencial} label="Prudencial (51,3%)" stroke="#f59e42" strokeDasharray="6 4" />
                    <ReferenceLine y={detailsPessoal.limiteMaximo} label="Máximo (54%)" stroke="#dc2626" strokeDasharray="3 3" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Alertas da IA-LUX */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-600" size={18} />
                <span className="font-semibold text-base">Alerta da IA-LUX</span>
              </div>
              <div className="alert-warning border rounded-lg px-3 py-2 mb-2">
                <p className="text-yellow-900 text-sm">
                  O município está acima de 47%, próximo ao limite prudencial.
                  Recomenda-se contenção de despesas com pessoal não essencial e suspensão de novas contratações.
                </p>
              </div>
              <div className="alert-critical border rounded-lg px-3 py-2">
                <p className="text-red-800 text-sm">
                  Não se recomenda reajuste ou contratação no último quadrimestre do mandato. <br />
                  <span className="font-medium">[Art. 21 e 42 da LRF]</span>
                </p>
              </div>
            </div>

            {/* Situação Jurídica e Consequências */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-2">
                <Scale className="text-lumen-blue" size={18} />
                <span className="font-semibold text-base">Situação Jurídica e Consequências</span>
              </div>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="text-yellow-800 font-bold">Acima de 51,3% </span>
                  <span className="ml-1">
                    🚫 Vedado: Concessão de vantagens, aumentos salariais, contratação de pessoal (salvo reposição)
                  </span>
                </li>
                <li>
                  <span className="text-red-800 font-bold">Acima de 54% </span>
                  <span className="ml-1">
                    🚫 Obrigação: Exoneração de cargos comissionados e não estáveis (8 meses), apontamento pelo TCE, responsabilização do gestor
                  </span>
                </li>
              </ul>
            </div>

          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
