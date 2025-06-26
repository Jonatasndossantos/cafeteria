import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Progress } from '@/Components/ui/progress';
import { ExpenseAnalysisSection } from './visao-geral/ExpenseAnalysisSection';
import { FinancialSummaryCards } from "./visao-financeira/FinancialSummaryCards";
import { RevenueAnalysisSection } from "./visao-financeira/RevenueAnalysisSection";
import { RemainingPaymentsSection } from "./visao-financeira/RemainingPaymentsSection";
import { FinancialHealthSection } from "./visao-financeira/FinancialHealthSection";
import { FinancialAlertsSection } from "./visao-financeira/FinancialAlertsSection";

export const VisaoFinanceira = () => {
  const dados = {
    receitaTotal: 145200000,
    despesaEmpenhada: 112800000,
    disponivel: 32400000,
    execucaoPercentual: 77.7
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-20">
      {/* Resumo Executivo (Cards Principais) */}
      <FinancialSummaryCards />

      {/* Seções detalhadas */}
      <RevenueAnalysisSection />
      <RemainingPaymentsSection />
      <FinancialHealthSection />

      {/* Mantém análise de despesas por secretaria */}
      <div className="mt-24">
        <h3 className="font-bold text-2xl mb-8">Análise de Despesas por Secretaria</h3>
        <ExpenseAnalysisSection />
      </div>

      {/* Alertas Inteligentes e Recomendações */}
      <FinancialAlertsSection />
    </div>
  );
};
