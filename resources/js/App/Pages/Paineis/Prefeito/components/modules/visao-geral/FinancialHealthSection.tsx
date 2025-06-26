import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Progress } from '@/Components/ui/progress';
import { Badge } from '@/Components/ui/badge';
import { HeartHandshake, PiggyBank, TrendingDown, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { RecursosVinculadosModal } from './RecursosVinculadosModal';
import { DetalhamentoDividaModal } from './DetalhamentoDividaModal';
import { CalculoMargemModal } from './CalculoMargemModal';
import { PrecatoriosModal } from './PrecatoriosModal';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/Components/ui/tooltip";

export const FinancialHealthSection = () => {
  const [expandLivres, setExpandLivres] = useState(false);
  const [expandVinculados, setExpandVinculados] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // novos estados para os modais
  const [modalDividaOpen, setModalDividaOpen] = useState(false);
  const [modalMargemOpen, setModalMargemOpen] = useState(false);
  const [modalPrecatoriosOpen, setModalPrecatoriosOpen] = useState(false);

  const financialData = {
    saldoTotal: 32400000,
    recursosLivres: 18200000,
    recursosVinculados: 14200000,
    dividaConsolidada: 89500000,
    rcl: 180000000,
    capacidadeInvestimento: 25600000
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getPercentage = (value: number, total: number) => (value / total * 100).toFixed(1);

  return (
    <TooltipProvider>
    <Card className="dashboard-card border-l-4 border-l-emerald-500">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <HeartHandshake className="w-6 h-6 text-emerald-500" />
          <span className="text-xl font-bold text-gray-800">Saúde Financeira</span>
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
            Saudável
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Saldos Financeiros (renomeado) */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-3 mb-4">
              <PiggyBank className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-blue-800">Saldos Financeiros</h4>
            </div>
            <div className="space-y-4">
              {/* Total */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-blue-700">Total</span>
                  <span className="font-bold text-blue-800">{formatCurrency(financialData.saldoTotal)}</span>
                </div>
              </div>
              {/* Recursos Livres - Expansível */}
              <div className="bg-white/70 rounded p-2 border border-blue-100 mb-1">
                <button
                  className="flex items-center w-full justify-between text-blue-700 font-semibold hover:underline"
                  onClick={() => setExpandLivres((v) => !v)}
                  aria-expanded={expandLivres}
                  aria-controls="rec-livres-content"
                >
                  <span>
                    Recursos Livres 
                    <span className="ml-2 text-[13px] font-normal text-blue-500">
                      {formatCurrency(financialData.recursosLivres)} 
                      {" "}
                      ({getPercentage(financialData.recursosLivres, financialData.saldoTotal)}%)
                    </span>
                  </span>
                  {expandLivres ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {expandLivres && (
                  <div
                    id="rec-livres-content"
                    className="mt-2 text-sm text-blue-800 animate-fade-in"
                  >
                    <div>
                      <b>O que é?</b> Pode ser usado para qualquer despesa corrente da prefeitura, como folha de pagamento, manutenção, combustível, aluguel etc.
                    </div>
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
              {/* Recursos Vinculados - Expansível */}
              <div className="bg-white/70 rounded p-2 border border-indigo-100">
                <button
                  className="flex items-center w-full justify-between text-indigo-700 font-semibold hover:underline"
                  onClick={() => setExpandVinculados((v) => !v)}
                  aria-expanded={expandVinculados}
                  aria-controls="rec-vinculados-content"
                >
                  <span>
                    Recursos Vinculados 
                    <span className="ml-2 text-[13px] font-normal text-indigo-500">
                      {formatCurrency(financialData.recursosVinculados)}
                      {" "}
                      ({getPercentage(financialData.recursosVinculados, financialData.saldoTotal)}%)
                    </span>
                  </span>
                  {expandVinculados ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {expandVinculados && (
                  <div
                    id="rec-vinculados-content"
                    className="mt-2 text-sm text-indigo-800 animate-fade-in"
                  >
                    <div>
                      <b>O que é?</b> São recursos carimbados por lei, devendo ser usados exclusivamente para as finalidades definidas por sua fonte.
                    </div>
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
                      onClick={() => setModalOpen(true)}
                      type="button"
                    >
                      Ver Origem dos Recursos Vinculados
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Endividamento */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingDown className="w-5 h-5 text-yellow-600" />
              <h4 className="font-semibold text-yellow-800">Endividamento</h4>
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
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-yellow-700">Dívida Consolidada</span>
                  <span className="font-bold text-yellow-800">{formatCurrency(financialData.dividaConsolidada)}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-yellow-700">% da RCL</span>
                  <span className="font-medium text-yellow-800">{getPercentage(financialData.dividaConsolidada, financialData.rcl)}%</span>
                </div>
                <Progress value={parseFloat(getPercentage(financialData.dividaConsolidada, financialData.rcl))} className="h-2 [&>div]:bg-yellow-500" />
                <div className="text-xs text-yellow-600 mt-1">Limite: 200% RCL</div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 w-full justify-center">
                Dentro do Limite
              </Badge>
              <button
                type="button"
                className="w-full mt-2 px-4 py-1.5 rounded bg-yellow-700 text-white font-medium hover:bg-yellow-800 transition hover-scale animate-fade-in"
                onClick={() => setModalDividaOpen(true)}
              >
                Ver Detalhamento da Dívida
              </button>
              <button
                type="button"
                className="w-full mt-2 px-4 py-1.5 rounded bg-amber-200 text-yellow-900 font-medium hover:bg-amber-300 border border-amber-400 transition hover-scale"
                onClick={() => setModalPrecatoriosOpen(true)}
              >
                Ver Cronograma de Precatórios
              </button>
            </div>
          </div>

          {/* Capacidade de Investimento */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-lg border border-emerald-200">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingDown className="w-5 h-5 text-emerald-600" />
              <h4 className="font-semibold text-emerald-800">Capacidade de Investimento</h4>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-emerald-700">Disponível p/ Investimento</span>
                  <span className="font-bold text-emerald-800">{formatCurrency(financialData.capacidadeInvestimento)}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-emerald-700">% da Receita</span>
                  <span className="font-medium text-emerald-800">{getPercentage(financialData.capacidadeInvestimento, 145200000)}%</span>
                </div>
                <Progress value={parseFloat(getPercentage(financialData.capacidadeInvestimento, 145200000))} className="h-2 [&>div]:bg-emerald-500" />
              </div>
              <div className="text-xs text-emerald-600">
                Representa a margem da RCL disponível para novos projetos, após deduzidas as despesas obrigatórias como pessoal, RPPS, saúde e educação.
              </div>
              <button
                type="button"
                className="w-full mt-2 px-4 py-1.5 rounded bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition hover-scale animate-fade-in"
                onClick={() => setModalMargemOpen(true)}
              >
                Ver Cálculo da Margem
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-blue-800">Situação Financeira</h5>
              <p className="text-sm text-blue-700 mt-1">
                O município apresenta situação financeira saudável com {getPercentage(financialData.recursosLivres, financialData.saldoTotal)}% 
                dos recursos disponíveis sendo livres, permitindo flexibilidade na gestão orçamentária.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <RecursosVinculadosModal open={modalOpen} onOpenChange={setModalOpen} />
      <DetalhamentoDividaModal open={modalDividaOpen} onOpenChange={setModalDividaOpen} />
      <CalculoMargemModal open={modalMargemOpen} onOpenChange={setModalMargemOpen} />
      <PrecatoriosModal open={modalPrecatoriosOpen} onOpenChange={setModalPrecatoriosOpen} />
    </Card>
    </TooltipProvider>
  );
};
