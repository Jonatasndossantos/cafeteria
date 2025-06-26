import React from 'react';
import { Card, CardContent } from '@/Components/ui/card';
import { Progress } from '@/Components/ui/progress';

interface KPI {
  title: string;
  value: string;
  target: string;
  percentage: number;
  trend: string;
  color: string;
}

export const KPICards = () => {
  const kpis: KPI[] = [
    {
      title: 'Receita Realizada',
      value: 'R$ 145.2M',
      target: 'R$ 180M',
      percentage: 80.7,
      trend: 'up',
      color: 'text-green-600'
    },
    {
      title: 'Despesa Empenhada',
      value: 'R$ 112.8M',
      target: 'R$ 145M',
      percentage: 77.8,
      trend: 'up',
      color: 'text-blue-600'
    },
    {
      title: 'Despesa Paga',
      value: 'R$ 89.4M',
      target: 'R$ 145M',
      percentage: 61.7,
      trend: 'up',
      color: 'text-purple-600'
    },
    {
      title: 'Aplicação em Educação',
      value: '26.8%',
      target: '25%',
      percentage: 107.2,
      trend: 'up',
      color: 'text-green-600'
    },
    {
      title: 'Aplicação em Saúde',
      value: '16.2%',
      target: '15%',
      percentage: 108.0,
      trend: 'up',
      color: 'text-green-600'
    },
    {
      title: 'Aplicação em Desenvolvimento Social',
      value: '9.2%',
      target: '8%',
      percentage: 115.0,
      trend: 'up',
      color: 'text-green-600'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'text-green-600': return 'bg-green-500';
      case 'text-blue-600': return 'bg-blue-500';
      case 'text-purple-600': return 'bg-purple-500';
      case 'text-emerald-600': return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {kpis.map((kpi, index) => (
        <Card key={index} className="kpi-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm text-gray-600">{kpi.title}</h3>
              <div className={`w-5 h-5 ${getColorClasses(kpi.color)} rounded-full`}></div>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold">{kpi.value}</span>
                <span className="text-sm text-gray-500">de {kpi.target}</span>
              </div>
              <Progress value={kpi.percentage} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{kpi.percentage.toFixed(1)}%</span>
                <span>Meta: {kpi.target}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
