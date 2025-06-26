import React from 'react';
import { Button } from '@/Components/ui/button';
import { Save, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

interface ActionButtonsProps {
  activeTab: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ activeTab }) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" className="border-gray-300 text-gray-900 hover:bg-gray-50 hover:scale-105 transition-all duration-200">
          <Save className="w-4 h-4 mr-2" />
          Salvar Rascunho
        </Button>
        
        <div className="flex space-x-4">
          <Button variant="outline" className="border-lumen-blue text-lumen-blue hover:bg-gray-50 hover:scale-105 transition-all duration-200">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para DFD
          </Button>
          {activeTab === 'etp' && (
            <Button className="bg-lumen-gold text-lumen-blue hover:bg-lumen-gold/90 hover:scale-105 transition-all duration-200">
              <CheckCircle className="w-4 h-4 mr-2" />
              Finalizar Espada 2
            </Button>
          )}
          <Button className="bg-lumen-blue text-white hover:bg-lumen-blue/90 hover:scale-105 transition-all duration-200">
            <ArrowRight className="w-4 h-4 mr-2" />
            Avançar para TR (Espada 3)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;
