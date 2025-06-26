import React from 'react';
import { Lock, Building2, Info } from 'lucide-react';

export const InfoAlert = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-1 flex items-center text-sm text-amber-800 bg-amber-50 px-2 py-1 rounded border border-amber-200">
    <Info className="w-3 h-3 mr-1 text-amber-600" />
    <span>{children}</span>
  </div>
);

export const PreenchidoAlert = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-1 flex items-center text-sm text-blue-700 bg-blue-50 px-2 py-1 rounded">
    <Lock className="w-3 h-3 mr-1 text-blue-600" />
    <span>{children}</span>
  </div>
);

export const MunicipalAlert = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-1 flex items-center text-sm text-lumen-blue bg-blue-50 px-2 py-1 rounded border border-lumen-blue/30">
    <Building2 className="w-3 h-3 mr-1 text-lumen-blue" />
    <span>{children}</span>
  </div>
);

// Versão alternativa com fundo azul escuro (comentada para teste)
export const MunicipalAlertDark = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-1 flex items-center text-sm text-white bg-lumen-blue px-2 py-1 rounded border border-lumen-blue/20">
    <Building2 className="w-3 h-3 mr-1 text-white" />
    <span>{children}</span>
  </div>
);
