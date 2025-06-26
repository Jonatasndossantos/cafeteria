
import React from 'react';
import { Shield, Loader2, RefreshCw } from 'lucide-react';

interface AutoRiskGenerationProps {
  onGenerate: () => void;
  isGenerating: boolean;
  contractData: {
    objectType: string;
    contractValue: number;
    description: string;
  };
}

const AutoRiskGeneration: React.FC<AutoRiskGenerationProps> = ({
  onGenerate,
  isGenerating,
  contractData
}) => {
  return (
    <div className="bg-[#E8F5E9] border border-green-200 rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 bg-[#D4AF37] rounded-full flex items-center justify-center">
            <Shield className="h-6 w-6 text-[#0A3D62]" />
          </div>
        </div>
        <div className="ml-4 flex-1">
          <h2 className="font-semibold text-lg text-[#0A3D62] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Geração Automática da Matriz de Riscos - IA LUX
          </h2>
          
          <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
            <h3 className="font-medium text-base text-[#0A3D62] mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Análise do Contexto Contratual
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Objeto</label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm">
                  {contractData.objectType === 'bens' ? 'Bens (Compras)' : contractData.objectType}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valor Estimado</label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm">
                  R$ {contractData.contractValue.toLocaleString('pt-BR')}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Complexidade</label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm">
                  Baixa a Média
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Objeto da Contratação</label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm">
                {contractData.description}
              </div>
            </div>
            
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md mb-4">
              <p className="text-sm text-blue-800">
                <strong>IA LUX Detectou:</strong> Com base nas informações das Espadas 1, 2 e 3, identifiquei padrões de risco 
                típicos para contratos de aquisição de bens tecnológicos. A matriz será gerada automaticamente considerando 
                o valor, prazo e especificações técnicas.
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={onGenerate}
              disabled={isGenerating}
              className="px-6 py-3 bg-[#0A3D62] text-white rounded-md text-sm font-medium flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Gerando Matriz de Riscos...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Gerar Matriz de Riscos Automaticamente
                </>
              )}
            </button>
            
            {isGenerating && (
              <div className="text-sm text-gray-600">
                Analisando dados das espadas anteriores e gerando riscos personalizados...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoRiskGeneration;
