
import React from 'react';
import { Card, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Eye, AlertTriangle, FileText } from 'lucide-react';

export const ApontamentosKanbanCards = () => {
  const statusCards = [
    {
      status: 'Em Andamento',
      count: 12,
      description: 'planos em execução',
      color: 'bg-yellow-100 border-yellow-300',
      iconColor: 'text-yellow-600',
      icon: Eye,
      buttonText: 'Ver detalhes',
      buttonColor: 'bg-yellow-600 hover:bg-yellow-700'
    },
    {
      status: 'Prazo em 7 dias',
      count: 4,
      description: 'com risco de vencimento',
      color: 'bg-red-100 border-red-300',
      iconColor: 'text-red-600',
      icon: AlertTriangle,
      buttonText: 'Acessar imediatamente',
      buttonColor: 'bg-red-600 hover:bg-red-700'
    },
    {
      status: 'Concluídos',
      count: 7,
      description: 'executados no período',
      color: 'bg-green-100 border-green-300',
      iconColor: 'text-green-600',
      icon: FileText,
      buttonText: 'Ver relatório',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    },
    {
      status: 'Total',
      count: 23,
      description: 'apontamentos ativos',
      color: 'bg-blue-100 border-blue-300',
      iconColor: 'text-blue-600',
      icon: FileText,
      buttonText: 'Ver todos',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statusCards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <Card key={index} className={`${card.color} border-2 hover:shadow-lg transition-all duration-200`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <IconComponent className={`w-6 h-6 ${card.iconColor}`} />
                <div className={`text-2xl font-bold ${card.iconColor}`}>
                  {card.count}
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className={`font-semibold text-sm ${card.iconColor}`}>
                  {card.status}
                </h4>
                <p className="text-xs text-gray-600 leading-tight">
                  {card.description}
                </p>
                
                <Button 
                  size="sm" 
                  className={`w-full text-xs ${card.buttonColor} text-white font-medium`}
                >
                  {card.buttonText}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
