
import React from 'react';
import { Card, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';

export const ApontamentosStatusCards = () => {
  const statusData = [
    { label: 'Total de Apontamentos', value: 23, color: 'bg-blue-500', textColor: 'text-blue-600' },
    { label: 'Em Andamento', value: 12, color: 'bg-yellow-500', textColor: 'text-yellow-600' },
    { label: 'Prazo Próximo (7 dias)', value: 4, color: 'bg-red-500', textColor: 'text-red-600' },
    { label: 'Concluídos (no período)', value: 7, color: 'bg-green-500', textColor: 'text-green-600' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {statusData.map((item, index) => (
        <Card key={index} className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <div className={`w-16 h-16 ${item.color} rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl`}>
              {item.value}
            </div>
            <h4 className="font-semibold text-gray-800 text-sm mb-1">{item.label}</h4>
            <Badge variant="outline" className={`${item.textColor} text-xs`}>
              {index === 0 ? 'Total' : index === 1 ? 'Ativo' : index === 2 ? 'Urgente' : 'Finalizado'}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
