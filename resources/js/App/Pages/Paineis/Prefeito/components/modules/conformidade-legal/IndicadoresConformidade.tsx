
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Progress } from "@/Components/ui/progress";
import { AplicacaoEducacaoCard } from "./AplicacaoEducacaoCard";
import { AplicacaoSaudeCard } from "./AplicacaoSaudeCard";
import { DespesaPessoalCard } from "./DespesaPessoalCard";
import { DividaConsolidadaCard } from "./DividaConsolidadaCard";

export function IndicadoresConformidade() {
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle>Indicadores de Conformidade Legal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AplicacaoEducacaoCard />
          <AplicacaoSaudeCard />
          <DespesaPessoalCard />
          <DividaConsolidadaCard />
        </div>
      </CardContent>
    </Card>
  );
}
