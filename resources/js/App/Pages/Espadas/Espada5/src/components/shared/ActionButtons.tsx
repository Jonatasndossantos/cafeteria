
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/Components/ui/button';

const ActionButtons = () => {
  return (
    <div className="flex justify-between items-center mt-8 mb-12">
      <Button variant="outline" className="font-montserrat font-medium">
        Salvar como rascunho
      </Button>
      
      <div className="flex space-x-4">
        <Button variant="outline" className="border-lumen-blue text-lumen-blue font-montserrat font-medium">
          Voltar para Matriz de Riscos
        </Button>
        <Button className="bg-lumen-blue hover:bg-lumen-blue/90 font-montserrat font-medium">
          <CheckCircle className="w-5 h-5 mr-2" />
          Avançar para Contrato (Espada 6)
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;
