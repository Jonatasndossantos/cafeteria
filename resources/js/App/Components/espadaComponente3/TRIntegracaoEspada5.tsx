import { Link, Download } from 'lucide-react';
import { useTRObjeto } from '@/hooks/useTRObjeto';
import { StandardCard } from '@/Components/ui/standard-card';

const TRIntegracaoEspada5 = () => {
  const { metadata, objeto } = useTRObjeto();

  const getModalidadeSugerida = () => {
    switch (metadata.tipoObjeto) {
      case 'bens':
      case 'tic_compras':
      case 'servicos_sem_mao_obra':
      case 'servicos_com_mao_obra':
        return 'Pregão Eletrônico';
      case 'obras':
        return 'Concorrência';
      case 'tic_servicos':
        return 'Pregão Eletrônico';
      default:
        return 'A definir';
    }
  };

  const getClausulasVinculadas = () => {
    const clausulas = [
      'Objeto e Especificações',
      'Condições de Entrega',
      'Pagamento',
      'Sanções',
      'Prazos'
    ];

    if (metadata.tipoObjeto === 'servicos_com_mao_obra') {
      clausulas.push('Planilha de Custos', 'Repactuação');
    }

    if (metadata.tipoObjeto === 'obras') {
      clausulas.push('Cronograma Físico-Financeiro', 'Materiais');
    }

    return clausulas;
  };

  return (
    <StandardCard 
      title="Integração com Espada 5 - Edital e Publicidade"
      icon={Link}
      className="bg-blue-50 border border-blue-200 animate-fade-in"
    >
      <div className="bg-white p-4 rounded-lg border border-blue-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Modalidade Sugerida</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
              value={getModalidadeSugerida()}
              disabled
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status da Integração</label>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-green-700 font-medium">Pronto para gerar edital</span>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Cláusulas que serão geradas automaticamente:</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {getClausulasVinculadas().map((clausula, index) => (
              <div key={index} className="flex items-center text-sm text-gray-700">
                <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {clausula}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Template:</span> TR para {metadata.tipoObjeto || 'Não definido'}
          </div>
          
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 text-sm font-medium transition-colors duration-200 flex items-center">
              <Download className="w-4 h-4 mr-1" />
              Exportar TR
            </button>
            <button className="px-3 py-1 bg-lumen-blue text-white rounded-md hover:bg-opacity-90 text-sm font-medium transition-colors duration-200">
              Gerar Edital (Espada 5)
            </button>
          </div>
        </div>
      </div>
    </StandardCard>
  );
};

export default TRIntegracaoEspada5;
