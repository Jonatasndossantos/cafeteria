
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Construction, DollarSign, FileCheck, AlertTriangle, PauseCircle, Clock, Calendar } from 'lucide-react';

export const ObrasConveniosSummaryCards = () => {
  const summaryData = [
    {
      title: 'Obras em Andamento',
      value: '12',
      icon: Construction,
      color: 'text-lumen-blue',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Valor Total Investido',
      value: 'R$ 8,2M',
      icon: DollarSign,
      color: 'text-lumen-gold',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Convênios Ativos',
      value: '24',
      icon: FileCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Alertas',
      value: '3',
      icon: AlertTriangle,
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Obras Paralisadas',
      value: '2',
      icon: PauseCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      critical: true
    },
    {
      title: '🚧 Obras com Risco',
      value: '2',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      critical: true,
      subtitle: '+60 dias parada ou -20% cronograma'
    },
    {
      title: 'Convênios Próximos do Vencimento',
      value: '5',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      subtitle: 'Necessitam aditivo urgente'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
      {summaryData.map((item, index) => (
        <Card 
          key={index} 
          className={`dashboard-card ${item.critical ? 'ring-2 ring-red-300 animate-pulse-slow' : ''}`}
        >
          <CardHeader className="pb-3">
            <CardTitle className={`text-sm font-medium text-gray-600 ${item.critical ? 'text-red-700' : ''}`}>
              {item.title}
            </CardTitle>
            {item.subtitle && (
              <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
            )}
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className={`p-2 rounded-lg ${item.bgColor}`}>
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <span className={`text-2xl font-bold ${item.critical ? 'text-red-600' : 'text-lumen-blue'}`}>
                {item.value}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
