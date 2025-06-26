
import React from 'react';
import { UnifiedRiskIndicators } from "./conformidade-legal/UnifiedRiskIndicators";
import { RecomendacoesInteligentes } from "./conformidade-legal/RecomendacoesInteligentes";
import { TimelineProjections } from "./visao-preditiva/TimelineProjections";
import { IndicadoresConformidade } from "./conformidade-legal/IndicadoresConformidade";
import { PainelObrigacoesFiscais } from "./conformidade-legal/PainelObrigacoesFiscais";

export const ConformidadeLegal = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <IndicadoresConformidade />
      <PainelObrigacoesFiscais />
      <UnifiedRiskIndicators />
      <RecomendacoesInteligentes />
      <TimelineProjections />
    </div>
  );
};
