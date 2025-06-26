
import React from 'react';
import { Badge } from '@/Components/ui/badge';

interface EmendaAlertsProps {
  alertas: string[];
}

export const EmendaAlerts = ({ alertas }: EmendaAlertsProps) => {
  const getAlertStyle = (alerta: string) => {
    if (alerta.includes('TCE')) {
      return { icon: '⚖️', variant: 'destructive' as const, color: 'text-red-700' };
    }
    if (alerta.includes('Glosa')) {
      return { icon: '⚠️', variant: 'secondary' as const, color: 'text-orange-700' };
    }
    if (alerta.includes('TCU')) {
      return { icon: '🔍', variant: 'outline' as const, color: 'text-yellow-700' };
    }
    return { icon: '⚠️', variant: 'outline' as const, color: 'text-gray-700' };
  };

  if (alertas.length === 0) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-xl">🚨</span>
        <h5 className="font-semibold text-red-800">Alertas de Risco</h5>
      </div>
      
      <div className="space-y-2">
        {alertas.map((alerta, index) => {
          const alertStyle = getAlertStyle(alerta);
          return (
            <div key={index} className="flex items-start space-x-2">
              <span className="text-sm">{alertStyle.icon}</span>
              <div className="flex-1">
                <p className={`text-sm ${alertStyle.color} font-medium`}>
                  {alerta}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
