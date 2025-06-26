
import React, { useState } from "react";
import {
  Card, CardHeader, CardTitle, CardContent
} from "@/Components/ui/card";
import {
  Collapsible, CollapsibleTrigger, CollapsibleContent
} from "@/Components/ui/collapsible";
import {
  ChevronDown,
  ChevronUp,
  Check,
  AlertTriangle,
  CheckCircle,
  FileText,
  LineChart,
  ZoomIn,
  PlaySquare,
  MessagesSquare,
  BotMessageSquare,
} from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/Components/ui/table";
import { Progress } from "@/Components/ui/progress";
import { Badge } from "@/Components/ui/badge";
import {
  LineChart as RechartsLineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line, ReferenceLine, ResponsiveContainer, Legend,
} from "recharts";

// Dados da Saúde conforme especificação
const details = {
  receitaBase: 42000000,
  despesaASPS: 6804000,
  percentual: 16.2,
  minimo: 15.0,
  status: "Conforme",
  fonte: "Art. 198 da CF/88, EC 29/2000, LC 141/2012",
};

const evolucaoMensal = [
  { mes: "Jan", percentual: 8.1 },
  { mes: "Fev", percentual: 10.3 },
  { mes: "Mar", percentual: 11.5 },
  { mes: "Abr", percentual: 12.8 },
  { mes: "Mai", percentual: 13.7 },
  { mes: "Jun", percentual: 14.2 },
  { mes: "Jul", percentual: 14.6 },
  { mes: "Ago", percentual: 15.0 },
  { mes: "Set", percentual: 15.4 },
  { mes: "Out", percentual: 15.8 },
  { mes: "Nov", percentual: 16.0 },
  { mes: "Dez", percentual: 16.2 },
];

const analiseQualidade = [
  {
    label: "Despesas em ASPS",
    valor: "92%",
    badge: "success",
    descricao: "da despesa está corretamente classificada como ASPS",
    icon: "check",
  },
  {
    label: "Função administrativa/não computável",
    valor: "8%",
    badge: "warning",
    descricao: "está em função administrativa ou não computável — verificado pela IA-LUX",
    icon: "alert-triangle",
  },
  {
    label: "Glosa TCE",
    valor: "Nenhuma",
    badge: "success",
    descricao: "nenhuma glosa identificada pelo TCE até o momento",
    icon: "check-circle",
  },
];

const execucaoProgramatica = [
  {
    acao: "Atenção Básica (UBS)",
    previsto: 2400000,
    liquidado: 1900000,
    execucao: 79,
    status: "ok",
  },
  {
    acao: "Farmácia Municipal",
    previsto: 1200000,
    liquidado: 850000,
    execucao: 71,
    status: "ok",
  },
  {
    acao: "Hospital Municipal",
    previsto: 2800000,
    liquidado: 1500000,
    execucao: 53,
    status: "alert",
  },
];

// Utilitários
function formataMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency", currency: "BRL", minimumFractionDigits: 0
  });
}

function formataPercentual(valor: number) {
  return `${valor.toFixed(1)}%`;
}

function corByExecucao(v: number) {
  if (v >= 70) return "text-green-700 bg-green-50 border-green-200";
  if (v >= 50) return "text-yellow-800 bg-yellow-50 border-yellow-200";
  return "text-red-800 bg-red-50 border-red-200";
}

// Mapeamento de ícones
const iconMap = {
  check: Check,
  "alert-triangle": AlertTriangle,
  "check-circle": CheckCircle,
};

export function AplicacaoSaudeCard() {
  const [open, setOpen] = useState(false);

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-4 flex flex-row items-start justify-between">
        <div>
          <CardTitle>Aplicação em Saúde</CardTitle>
        </div>
        <div className="flex items-center">
          <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="ml-2 flex items-center gap-1 text-lumen-blue hover:underline font-medium transition-all"
                aria-expanded={open}
                tabIndex={0}
              >
                Ver detalhes
                {open ? (
                  <ChevronUp className="w-4 h-4 ml-1" />
                ) : (
                  <ChevronDown className="w-4 h-4 ml-1" />
                )}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-6 grid gap-8">
                {/* DETALHAMENTO - TABELA DE VALORES PRINCIPAIS */}
                <section>
                  <h4 className="font-semibold text-md mb-2 text-lumen-blue flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Detalhamento da Aplicação Constitucional
                  </h4>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableHead>Receita Base (Impostos + Transf.)</TableHead>
                        <TableCell className="font-semibold">{formataMoeda(details.receitaBase)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead>Despesa em ASPS (liquidada)</TableHead>
                        <TableCell>{formataMoeda(details.despesaASPS)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead>Percentual Aplicado</TableHead>
                        <TableCell>
                          <span className="font-bold">
                            {formataPercentual(details.percentual)}
                          </span>
                          <Badge variant="default" className="ml-2 bg-green-100 text-green-700 border-green-200">
                            {details.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead>Mínimo Constitucional</TableHead>
                        <TableCell>{formataPercentual(details.minimo)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead>Fonte</TableHead>
                        <TableCell className="text-gray-500">{details.fonte}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </section>
                {/* GRÁFICO DE EVOLUÇÃO */}
                <section>
                  <h4 className="font-semibold text-md mb-2 text-lumen-blue flex items-center gap-2">
                    <LineChart className="w-4 h-4" />
                    Evolução Mensal da Aplicação (% acumulado)
                  </h4>
                  <div style={{ height: 260 }} className="bg-slate-50 rounded-lg border border-slate-200 px-2 py-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={evolucaoMensal}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis
                          domain={[8, 18]}
                          tickFormatter={formataPercentual}
                          width={38}
                        />
                        <Tooltip formatter={(value) => formataPercentual(value as number)} />
                        <Legend verticalAlign="bottom" height={24} />
                        <ReferenceLine y={15} label="Meta 15%" stroke="#fbbf24" strokeDasharray="4 4" />
                        <Line type="monotone" dataKey="percentual" name="% Acumulado" stroke="#2563eb" strokeWidth={2.5} dot />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </section>
                {/* ANÁLISE DE QUALIDADE DA DESPESA */}
                <section>
                  <h4 className="font-semibold text-md mb-2 text-lumen-blue flex items-center gap-2">
                    <ZoomIn className="w-4 h-4" />
                    Análise de Qualidade da Despesa
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {analiseQualidade.map((item, i) => {
                      const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                      return (
                        <div key={i}
                          className={`
                            flex flex-col items-center justify-center border rounded-lg px-3 py-2
                            ${item.badge === "success" ? "border-green-200 bg-green-50" : item.badge === "warning" ? "border-yellow-200 bg-yellow-50" : "border-red-200 bg-red-50"}
                          `}
                        >
                          {IconComponent && (
                            <IconComponent className={`mb-2 ${item.badge === "success" ? "text-green-700" : item.badge === "warning" ? "text-yellow-700" : "text-red-700"} w-5 h-5`} />
                          )}
                          <div className="text-sm text-center font-semibold">{item.label}</div>
                          <div className="text-lg font-bold mb-1">{item.valor}</div>
                          <div className="text-[0.85em] text-gray-700">{item.descricao}</div>
                        </div>
                      );
                    })}
                  </div>
                </section>
                {/* EXECUÇÃO PROGRAMÁTICA */}
                <section>
                  <h4 className="font-semibold text-md mb-2 text-lumen-blue flex items-center gap-2">
                    <PlaySquare className="w-4 h-4" />
                    Execução Programática da Saúde (top 3 ações)
                  </h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ação</TableHead>
                        <TableHead>Previsto</TableHead>
                        <TableHead>Liquidado</TableHead>
                        <TableHead>Execução</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {execucaoProgramatica.map((acao, i) => (
                        <TableRow key={i}>
                          <TableCell>{acao.acao}</TableCell>
                          <TableCell>{formataMoeda(acao.previsto)}</TableCell>
                          <TableCell>{formataMoeda(acao.liquidado)}</TableCell>
                          <TableCell>
                            <div className={`inline-flex items-center font-medium border rounded-full px-2 py-0.5 text-xs gap-1 ${corByExecucao(acao.execucao)}`}>
                              {acao.execucao}%
                              {acao.status === "alert" && (
                                <AlertTriangle className="ml-1 w-3.5 h-3.5 text-yellow-500" />
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </section>
                {/* ALERTA IA-LUX */}
                <section>
                  <h4 className="font-semibold text-md mb-2 text-lumen-blue flex items-center gap-2">
                    <MessagesSquare className="w-4 h-4" />
                    Alerta IA-LUX
                  </h4>
                  <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 flex items-start gap-3">
                    <BotMessageSquare className="w-8 h-8 text-yellow-500 mt-1" />
                    <div>
                      <div className="font-semibold text-yellow-800">
                        "A execução em unidades hospitalares está abaixo de 60%, com risco de atraso nas metas pactuadas do PPA. Avaliar reforço orçamentário ou reprogramação física."
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        Gerado automaticamente pela IA-LUX com base no tipo e progresso das despesas.
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardHeader>
      {/* Estado COMPACTO */}
      {!open && (
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-green-700">
                {formataPercentual(details.percentual)}
              </span>
              <span className="text-sm text-gray-600">
                Limite: {formataPercentual(details.minimo)}
              </span>
            </div>
            <Progress value={(details.percentual / details.minimo) * 100} className="h-2" />
          </div>
        </CardContent>
      )}
    </Card>
  );
}
