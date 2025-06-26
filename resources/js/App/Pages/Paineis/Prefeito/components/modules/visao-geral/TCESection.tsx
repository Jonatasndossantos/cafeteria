
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Progress } from '@/Components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/Components/ui/collapsible';
import { ChevronDown, ChevronUp, Building, TrendingUp } from 'lucide-react';

export const TCESection = () => {
  const [isTceExpanded, setIsTceExpanded] = useState(true);

  return (
    <Card className="dashboard-card">
      <Collapsible open={isTceExpanded} onOpenChange={setIsTceExpanded}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Building className="w-6 h-6 text-lumen-blue" />
                <span>Metas do TCE</span>
                <Badge variant="secondary" className="bg-yellow-50 text-yellow-700">3 Pendências</Badge>
              </div>
              {isTceExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">Apontamentos Pendentes</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Progresso das Correções</span>
                    <span className="font-medium">60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  <div className="text-xs text-gray-600">3 irregularidades restantes • 30 dias para correção</div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800">Índice de Governança (IGM)</h4>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-lumen-blue">7.2</div>
                    <div className="text-sm text-gray-600">Nota Atual</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-medium text-gray-600">6.8</div>
                    <div className="text-sm text-gray-600">Média Estadual</div>
                  </div>
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
