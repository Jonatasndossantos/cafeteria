import React from 'react';
import { FileText } from 'lucide-react';
import { StandardCard } from '@/Components/ui/standard-card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

interface ProcessIdentificationProps {
  inheritedData: {
    numeroEdital: string;
    matrizRiscos: string;
    termoReferencia: string;
    objeto: string;
  };
}

const ProcessIdentification = ({ inheritedData }: ProcessIdentificationProps) => {
  return (
    <div className="mb-6 animate-fade-in">
      <StandardCard 
        title="Identificação do Processo Licitatório"
        icon={FileText}
        className="shadow-md"
      >
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">Número do Edital</Label>
            <Input 
              value={inheritedData.numeroEdital}
              disabled
              className="bg-gray-100 mt-1"
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700">Vinculado à Matriz de Riscos</Label>
            <Input 
              value={inheritedData.matrizRiscos}
              disabled
              className="bg-gray-100 mt-1"
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700">Vinculado ao TR</Label>
            <Input 
              value={inheritedData.termoReferencia}
              disabled
              className="bg-gray-100 mt-1"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <Label className="text-sm font-medium text-gray-700">Objeto da Contratação</Label>
          <Input 
            value={inheritedData.objeto}
            disabled
            className="bg-gray-100 mt-1"
          />
        </div>
      </StandardCard>
    </div>
  );
};

export default ProcessIdentification;
