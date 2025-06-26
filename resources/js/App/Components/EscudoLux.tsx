import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

interface Alerta {
  id: number;
  titulo: string;
  descricao: string;
  nivel: string;
  referencia?: string;
}

interface EscudoLuxProps {
  conformidadeMunicipio: number;
  alertasCriticos: Alerta[];
}

export const EscudoLux = ({ conformidadeMunicipio, alertasCriticos }: EscudoLuxProps) => {
  const getConformidadeColor = (percentual: number) => {
    if (percentual >= 80) return 'bg-green-500';
    if (percentual >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getAlertaColor = (nivel: string) => {
    switch (nivel) {
      case 'critico': return 'bg-red-500';
      case 'importante': return 'bg-yellow-500';
      case 'informativo': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xl font-semibold text-[#0A3D62] mb-4 flex items-center">
        <Shield className="w-5 h-5 mr-2 text-[#D4AF37]" />
        Escudo LUX
      </h3>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Conformidade do Município</span>
          <span className="font-semibold">{conformidadeMunicipio}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${getConformidadeColor(conformidadeMunicipio)}`} 
            style={{ width: `${conformidadeMunicipio}%` }}
          ></div>
        </div>
      </div>

      {alertasCriticos.length === 0 ? (
        <div className="text-center py-4 text-gray-500 text-sm">
          Nenhum alerta crítico no momento.
        </div>
      ) : (
        <div className="space-y-3">
          {alertasCriticos.map((alerta) => (
            <div key={alerta.id} className="flex items-start">
              <div className={`p-1 rounded-full ${getAlertaColor(alerta.nivel)} mr-3 flex-shrink-0`}>
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">{alerta.titulo}</p>
                <p className="text-xs text-gray-600">{alerta.descricao}</p>
                {alerta.referencia && (
                  <p className="text-xs text-[#0A3D62] mt-1">
                    Ref: {alerta.referencia}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
