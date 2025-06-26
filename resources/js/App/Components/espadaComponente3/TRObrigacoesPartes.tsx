import { FileText } from 'lucide-react';
import { useTRObrigacoes } from '@/hooks/useTRObrigacoes';
import { StandardCard } from '@/Components/ui/standard-card';

const TRObrigacoesPartes = () => {
  const { obrigacoes, updateObrigacoes } = useTRObrigacoes();

  return (
    <StandardCard 
      title="Obrigações das Partes"
      icon={FileText}
      className="animate-fade-in"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Obrigações da Contratante *</label>
        <textarea 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
          rows={6}
          placeholder="Descreva as obrigações da contratante..."
          value={obrigacoes.contratante}
          onChange={(e) => updateObrigacoes('contratante', e.target.value)}
          required
        />
        <div className="mt-1 flex items-center text-sm text-lumen-blue">
          <svg className="w-4 h-4 mr-1 text-lumen-gold" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span className="font-roboto">Conforme Art. 115 da Lei 14.133/21.</span>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Obrigações da Contratada *</label>
        <textarea 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
          rows={6}
          placeholder="Descreva as obrigações da contratada..."
          value={obrigacoes.contratada}
          onChange={(e) => updateObrigacoes('contratada', e.target.value)}
          required
        />
        <div className="mt-1 flex items-center text-sm text-lumen-blue">
          <svg className="w-4 h-4 mr-1 text-lumen-gold" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span className="font-roboto">Conforme Art. 115 da Lei 14.133/21.</span>
        </div>
      </div>
      
      <div className="mt-4">
        <button className="px-4 py-2 bg-lumen-green text-lumen-blue border border-green-200 rounded-md hover:bg-green-100 font-montserrat font-medium text-sm flex items-center transition-all duration-200">
          <svg className="w-5 h-5 mr-2 text-lumen-gold" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
          </svg>
          Gerar Obrigações com IA-LUX
        </button>
        <p className="mt-1 text-xs text-gray-500">A IA-LUX irá sugerir obrigações com base no tipo de objeto e requisitos.</p>
      </div>
    </StandardCard>
  );
};

export default TRObrigacoesPartes;
