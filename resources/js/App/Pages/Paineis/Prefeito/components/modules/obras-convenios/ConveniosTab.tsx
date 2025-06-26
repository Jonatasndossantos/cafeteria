
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { FileCheck } from 'lucide-react';
import { ConvenioDetailedCard } from './ConvenioDetailedCard';
import { convenios } from './ObrasData';

export const ConveniosTab = () => {
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileCheck className="h-5 w-5" />
          <span>Convênios Ativos</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {convenios.map((convenio) => (
            <ConvenioDetailedCard key={convenio.id} convenio={convenio} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
