
import React, { useState } from "react";
import { Card, CardContent, CardTitle } from "@/Components/ui/card";
import { Progress } from "@/Components/ui/progress";
import {
  Calculator, TrendingUp, DollarSign, AlertCircle,
  PiggyBank, TrendingDown, ChevronUp, ChevronDown
} from "lucide-react";
import { InvestmentCapacityModal } from "./InvestmentCapacityModal";
import { RecursosVinculadosModal } from "../visao-geral/RecursosVinculadosModal";
import { DetalhamentoDividaModal } from "../visao-geral/DetalhamentoDividaModal";
import { PrecatoriosModal } from "../visao-geral/PrecatoriosModal";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/Components/ui/tooltip";

export const FinancialHealthSection = () => {
  // Expansion toggles
  const [expandLivres, setExpandLivres] = useState(false);
  const [expandVinculados, setExpandVinculados] = useState(false);
  // Modal state for vinculados/dívida/precatórios
  const [modalVinculados, setModalVinculados] = useState(false);
  const [modalDivida, setModalDivida] = useState(false);
  const [modalPrecatorios, setModalPrecatorios] = useState(false);
  // Investment capacity modal
  const [modalInvestOpen, setModalInvestOpen] = useState(false);

  // Mocked values, similar to the original but structured for breakdown
  const saldos = 32_400_000;
  const recursosLivres = 18_200_000;
  const recursosVinculados = 14_200_000;
  const endividamento = 98_000_000;
  const dividaRcl = 180_000_000;
  const dividaPercent = (endividamento / dividaRcl * 100);
  const capacidadeInvest = 20_000_000;
  const execucao = 77.7;

  const format = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

  const getPercentage = (value: number, total: number) => (value / total * 100).toFixed(1);

  return (
    <TooltipProvider>
      <section className="mt-20 grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Saldos Disponíveis */}
        <Card className="min-h-[330px] border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="py-8 px-6 h-full flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-5">
              <PiggyBank className="w-6 h-6 text-blue-600" />
              <CardTitle className="text-lg text-blue-800">Saldos Disponíveis</CardTitle>
            </div>
            <div className="space-y-3 flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-blue-700">Total</span>
                <span className="font-bold text-blue-800 text-2xl">{format(saldos)}</span>
              </div>
              {/* Recursos Livres - expansível */}
              <div className="bg-white/70 rounded p-2 border border-blue-100 mb-1">
                <button
                  className="flex items-center w-full justify-between text-blue-700 font-semibold hover:underline"
                  onClick={() => setExpandLivres((v) => !v)}
                  aria-expanded={expandLivres}
                  aria-controls="rec-livres-content"
                  type="button"
                >
                  <span>
                    Recursos Livres
                    <span className="ml-2 text-[13px] font-normal text-blue-500">
                      {format(recursosLivres)} ({getPercentage(recursosLivres, saldos)}%)
                    </span>
                  </span>
                  {expandLivres ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {expandLivres && (
                  <div
                    id="rec-livres-content"
                    className="mt-2 text-sm text-blue-800 animate-fade-in"
                  >
                    <b>O que é?</b> Pode ser usado para qualquer despesa corrente, como folha de pagamento, manutenção, combustível, aluguel etc.
                    <div className="mt-1">
                      <b>Exemplos de uso:</b>
                      <ul className="list-disc ml-5 mt-1">
                        <li>Folha de pagamento</li>
                        <li>Material de expediente</li>
                        <li>Energia elétrica das escolas</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              {/* Recursos Vinculados - expansível */}
              <div className="bg-white/70 rounded p-2 border border-indigo-100">
                <button
                  className="flex items-center w-full justify-between text-indigo-700 font-semibold hover:underline"
                  onClick={() => setExpandVinculados((v) => !v)}
                  aria-expanded={expandVinculados}
                  aria-controls="rec-vinculados-content"
                  type="button"
                >
                  <span>
                    Recursos Vinculados
                    <span className="ml-2 text-[13px] font-normal text-indigo-500">
                      {format(recursosVinculados)} ({getPercentage(recursosVinculados, saldos)}%)
                    </span>
                  </span>
                  {expandVinculados ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {expandVinculados && (
                  <div
                    id="rec-vinculados-content"
                    className="mt-2 text-sm text-indigo-800 animate-fade-in"
                  >
                    <b>O que é?</b> São recursos carimbados por lei, devendo ser usados exclusivamente para as finalidades definidas por sua fonte.
                    <div className="mt-1">
                      <b>Exemplos de fontes:</b>
                      <ul className="list-disc ml-5 mt-1">
                        <li>FUNDEB (educação)</li>
                        <li>PAB (atenção básica em saúde)</li>
                        <li>Convênios federais/estaduais</li>
                        <li>Piso nacional da enfermagem</li>
                      </ul>
                    </div>
                    <button
                      className="mt-3 inline-flex items-center px-4 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition text-xs font-semibold shadow"
                      onClick={() => setModalVinculados(true)}
                      type="button"
                    >
                      Ver Origem dos Recursos Vinculados
                    </button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Endividamento */}
        <Card className="min-h-[330px] border border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
          <CardContent className="py-8 px-6 h-full flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-5">
              <TrendingDown className="w-6 h-6 text-yellow-600" />
              <CardTitle className="text-lg text-yellow-800">Endividamento</CardTitle>
              <Tooltip>
                <TooltipTrigger type="button" className="ml-1">
                  <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                </TooltipTrigger>
                <TooltipContent>
                  A Dívida Consolidada inclui parcelamentos com o INSS, financiamentos de longo prazo e precatórios judiciais.<br />
                  <span className="font-medium text-xs block mt-1">Conforme Resolução 40/2001 do Senado e Portaria STN nº 919/2022</span>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="space-y-3 flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-yellow-700">Dívida Consolidada</span>
                <span className="font-bold text-yellow-800 text-2xl">{format(endividamento)}</span>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-yellow-700">% da RCL</span>
                  <span className="font-medium text-yellow-800">{getPercentage(endividamento, dividaRcl)}%</span>
                </div>
                <Progress value={dividaPercent} className="h-2 [&>div]:bg-yellow-500" />
                <div className="text-xs text-yellow-600 mt-1">Limite: 200% RCL</div>
              </div>
              <span className="inline-block w-full mt-1 mb-2">
                <span className="bg-green-50 text-green-700 border border-green-200 text-xs rounded px-2 py-1 font-semibold block text-center">
                  Dentro do Limite
                </span>
              </span>
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  className="w-full px-4 py-1.5 rounded bg-yellow-700 text-white font-medium hover:bg-yellow-800 transition hover-scale animate-fade-in"
                  onClick={() => setModalDivida(true)}
                >
                  Ver Detalhamento da Dívida
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-1.5 rounded bg-amber-200 text-yellow-900 font-medium hover:bg-amber-300 border border-amber-400 transition hover-scale"
                  onClick={() => setModalPrecatorios(true)}
                >
                  Ver Cronograma de Precatórios
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Capacidade de Investimento */}
        <Card className="min-h-[330px] border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="py-8 px-6 h-full flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-5">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <CardTitle className="text-lg text-green-800">Capacidade de Investimento</CardTitle>
            </div>
            <div className="space-y-6 flex-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-mono text-green-600">{format(capacidadeInvest)}</span>
                <span className="text-sm text-green-500 italic">Disponível</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">Execução atual</span>
                  <span className="text-sm font-semibold text-green-600">{execucao}%</span>
                </div>
                <Progress value={execucao} className="h-3" />
                <div className="text-xs text-green-500">Meta: 90% até fim do ano</div>
              </div>
              <button
                onClick={() => setModalInvestOpen(true)}
                className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 font-medium"
              >
                <Calculator className="w-4 h-4" />
                🔎 Entenda o Cálculo
              </button>
            </div>
          </CardContent>
        </Card>
      </section>
      {/* Modals for detalhamentos */}
      <RecursosVinculadosModal open={modalVinculados} onOpenChange={setModalVinculados} />
      <DetalhamentoDividaModal open={modalDivida} onOpenChange={setModalDivida} />
      <PrecatoriosModal open={modalPrecatorios} onOpenChange={setModalPrecatorios} />
      <InvestmentCapacityModal open={modalInvestOpen} onOpenChange={setModalInvestOpen} />
    </TooltipProvider>
  );
};
