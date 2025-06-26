
import React from 'react';
import { KPICards } from './visao-geral/KPICards';
import { LOASummaryCard } from './visao-geral/LOASummaryCard';
import { ExecutionSection } from './visao-geral/ExecutionSection';
import { FinancialHealthSection } from './visao-geral/FinancialHealthSection';
import { ExpenseCategorySection } from './visao-geral/ExpenseCategorySection';
import { TCESection } from './visao-geral/TCESection';
import { IEGMSection } from './visao-geral/IEGMSection';
import { ExecutiveSummary } from './visao-geral/ExecutiveSummary';

export const VisaoGeral = () => {
  console.log('VisaoGeral component rendering...');
  
  return (
    <div className="space-y-6">
      {/* PRIMEIRO: Resumo Orçamentário Anual - LOA */}
      <LOASummaryCard />

      {/* KPIs Críticos - Expandidos */}
      <KPICards />

      {/* Execução Orçamentária Detalhada */}
      <ExecutionSection />

      {/* Saúde Financeira */}
      <FinancialHealthSection />

      {/* Despesas por Categoria Econômica */}
      <ExpenseCategorySection />

      {/* Metas do TCE */}
      <TCESection />

      {/* IEGM */}
      <IEGMSection />

      {/* Resumo Executivo */}
      <ExecutiveSummary />
    </div>
  );
};
