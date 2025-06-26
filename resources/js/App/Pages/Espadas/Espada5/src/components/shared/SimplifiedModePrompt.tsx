import React from 'react';
import { Wand2 } from 'lucide-react';
import { StandardCard } from '@/Components/ui/standard-card';
import { Button } from '@/Components/ui/button';
import { getMotivoSugestaoModoSimplificado, getRecomendacoesModoSimplificado } from '../../utils/modoSimplificado';

interface SimplifiedModePromptProps {
  inheritedData: {
    valorEstimado: string;
    objeto: string;
    modalidade: string;
  };
  onAtivarModoSimplificado: () => void;
}

const SimplifiedModePrompt = ({
  inheritedData,
  onAtivarModoSimplificado
}: SimplifiedModePromptProps) => {
  return (
    <div className="mb-6 animate-fade-in">
      <StandardCard 
        title="Modo Simplificado Recomendado"
        icon={Wand2}
        className="shadow-md bg-blue-50 border-blue-200"
      >
        <div className="space-y-4">
          <p className="text-blue-700">
            A IA-LUX detectou que esta contratação é elegível para o <strong>Modo Simplificado</strong>, 
            que otimiza o processo de elaboração do edital.
          </p>
          
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Motivos da recomendação:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700">
              {getMotivoSugestaoModoSimplificado({
                valorEstimado: inheritedData.valorEstimado,
                objeto: inheritedData.objeto,
                modalidade: inheritedData.modalidade
              }).map((motivo, index) => (
                <li key={index}>{motivo}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Benefícios:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700">
              {getRecomendacoesModoSimplificado().map((recomendacao, index) => (
                <li key={index}>{recomendacao}</li>
              ))}
            </ul>
          </div>
          
          <div className="flex space-x-4">
            <Button 
              onClick={onAtivarModoSimplificado}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Wand2 className="w-5 h-5 mr-2" />
              Ativar Modo Simplificado
            </Button>
          </div>
        </div>
      </StandardCard>
    </div>
  );
};

export default SimplifiedModePrompt;
