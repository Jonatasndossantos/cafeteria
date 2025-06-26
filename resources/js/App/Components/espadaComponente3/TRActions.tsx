
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';

const TRActions = () => {
  return (
    <div className="flex justify-between items-center mt-8 mb-12">
      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-montserrat font-medium flex items-center transition-all duration-200">
        <Save className="w-4 h-4 mr-2" />
        Salvar como rascunho
      </button>
      
      <div className="flex space-x-4">
        <button className="px-4 py-2 border border-lumen-blue text-lumen-blue rounded-md hover:bg-gray-50 font-montserrat font-medium flex items-center transition-all duration-200">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para ETP
        </button>
        <button className="px-6 py-2 bg-lumen-blue text-white rounded-md hover:bg-opacity-90 font-montserrat font-medium flex items-center transition-all duration-200 shadow-lg">
          <span>Avançar para Matriz de Riscos (Espada 4)</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default TRActions;
