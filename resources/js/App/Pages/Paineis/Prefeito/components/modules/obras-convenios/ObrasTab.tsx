
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Construction } from 'lucide-react';
import { ObraDetailedCard } from './ObraDetailedCard';
import { obras } from './ObrasData';

export const ObrasTab = () => {
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Construction className="h-5 w-5" />
          <span>Obras em Execução</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {obras.map((obra) => (
            <ObraDetailedCard key={obra.id} obra={obra} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
