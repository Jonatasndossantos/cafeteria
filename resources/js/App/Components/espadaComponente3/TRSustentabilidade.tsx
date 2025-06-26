import { Leaf } from 'lucide-react';
import { useTRRequisitos } from '@/hooks/useTRRequisitos';
import { StandardCard } from '@/Components/ui/standard-card';

const TRSustentabilidade = () => {
  const { sustentabilidade, updateSustentabilidade } = useTRRequisitos();

  return (
    <StandardCard 
      title="Sustentabilidade"
      icon={Leaf}
      className="animate-fade-in"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Critérios e Práticas de Sustentabilidade *</label>
        <textarea 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
          rows={4}
          placeholder="Descreva os critérios e práticas de sustentabilidade aplicáveis à contratação..."
          value={sustentabilidade.criteriosSustentabilidade}
          onChange={(e) => updateSustentabilidade('criteriosSustentabilidade', e.target.value)}
          required
        />
        <div className="mt-1 flex items-center text-sm text-lumen-blue">
          <svg className="w-4 h-4 mr-1 text-lumen-gold" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span className="font-roboto">Conforme Art. 144 da Lei 14.133/21.</span>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Tratamento de Dados Pessoais (LGPD)</label>
        <div className="flex items-center mb-2">
          <input 
            type="checkbox" 
            className="h-4 w-4 text-lumen-blue focus:ring-lumen-blue border-gray-300 rounded"
            checked={sustentabilidade.lgpdAplicavel}
            onChange={(e) => updateSustentabilidade('lgpdAplicavel', e.target.checked)}
          />
          <span className="ml-2 text-sm text-gray-700">A contratação envolve tratamento de dados pessoais</span>
        </div>
        
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Detalhamento do Tratamento de Dados</label>
          <textarea 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
            rows={4}
            placeholder="Descreva quais dados pessoais serão tratados, finalidade, compartilhamento, medidas de segurança..."
            value={sustentabilidade.detalhamentoLGPD}
            onChange={(e) => updateSustentabilidade('detalhamentoLGPD', e.target.value)}
          />
          <div className="mt-1 flex items-center text-sm text-lumen-blue">
            <svg className="w-4 h-4 mr-1 text-lumen-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="font-roboto">Conforme Lei 13.709/2018 (LGPD).</span>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Contrato de Eficiência</label>
        <div className="flex items-center mb-2">
          <input 
            type="checkbox" 
            className="h-4 w-4 text-lumen-blue focus:ring-lumen-blue border-gray-300 rounded"
            checked={sustentabilidade.contratoEficiencia}
            onChange={(e) => updateSustentabilidade('contratoEficiencia', e.target.checked)}
          />
          <span className="ml-2 text-sm text-gray-700">Aplicar contrato de eficiência</span>
        </div>
        
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Detalhamento do Contrato de Eficiência</label>
          <textarea 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
            rows={4}
            placeholder="Descreva os parâmetros de medição, economia esperada, remuneração baseada em desempenho..."
            value={sustentabilidade.detalhamentoEficiencia}
            onChange={(e) => updateSustentabilidade('detalhamentoEficiencia', e.target.value)}
          />
          <div className="mt-1 flex items-center text-sm text-lumen-blue">
            <svg className="w-4 h-4 mr-1 text-lumen-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="font-roboto">Conforme Art. 6º, LIII da Lei 14.133/21.</span>
          </div>
        </div>
      </div>
    </StandardCard>
  );
};

export default TRSustentabilidade;
