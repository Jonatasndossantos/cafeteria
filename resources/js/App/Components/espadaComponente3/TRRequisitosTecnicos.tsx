import { Shield } from 'lucide-react';
import { useTRRequisitos } from '@/hooks/useTRRequisitos';
import { StandardCard } from '@/Components/ui/standard-card';

const TRRequisitosTecnicos = () => {
  const { requisitos, updateRequisitos } = useTRRequisitos();

  return (
    <StandardCard 
      title="Requisitos Técnicos"
      icon={Shield}
      className="animate-fade-in"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Requisitos de Habilitação Técnica *</label>
        <textarea 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
          rows={4}
          placeholder="Descreva os requisitos de habilitação técnica exigidos dos licitantes..."
          value={requisitos.habilitacaoTecnica}
          onChange={(e) => updateRequisitos('habilitacaoTecnica', e.target.value)}
          required
        />
        <div className="mt-1 flex items-center text-sm text-lumen-blue">
          <svg className="w-4 h-4 mr-1 text-lumen-gold" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span className="font-roboto">Conforme Art. 67 da Lei 14.133/21.</span>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Requisitos de Qualificação Econômico-Financeira *</label>
        <textarea 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
          rows={4}
          placeholder="Descreva os requisitos de qualificação econômico-financeira exigidos dos licitantes..."
          value={requisitos.qualificacaoEconomica}
          onChange={(e) => updateRequisitos('qualificacaoEconomica', e.target.value)}
          required
        />
        <div className="mt-1 flex items-center text-sm text-lumen-blue">
          <svg className="w-4 h-4 mr-1 text-lumen-gold" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span className="font-roboto">Conforme Art. 69 da Lei 14.133/21.</span>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Vistoria Técnica</label>
        <div className="space-y-2 mb-2">
          <div className="flex items-center">
            <input 
              type="radio" 
              className="text-lumen-blue focus:ring-lumen-blue border-gray-300" 
              name="vistoria" 
              value="obrigatoria"
              checked={requisitos.vistoriaTecnica === 'obrigatoria'}
              onChange={(e) => updateRequisitos('vistoriaTecnica', e.target.value)}
            />
            <span className="ml-2 text-sm text-gray-700">Obrigatória</span>
          </div>
          <div className="flex items-center">
            <input 
              type="radio" 
              className="text-lumen-blue focus:ring-lumen-blue border-gray-300" 
              name="vistoria" 
              value="facultativa"
              checked={requisitos.vistoriaTecnica === 'facultativa'}
              onChange={(e) => updateRequisitos('vistoriaTecnica', e.target.value)}
            />
            <span className="ml-2 text-sm text-gray-700">Facultativa</span>
          </div>
          <div className="flex items-center">
            <input 
              type="radio" 
              className="text-lumen-blue focus:ring-lumen-blue border-gray-300" 
              name="vistoria" 
              value="nao_aplicavel"
              checked={requisitos.vistoriaTecnica === 'nao_aplicavel'}
              onChange={(e) => updateRequisitos('vistoriaTecnica', e.target.value)}
            />
            <span className="ml-2 text-sm text-gray-700">Não aplicável</span>
          </div>
        </div>
        
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Informações sobre a Vistoria</label>
          <textarea 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
            rows={3}
            placeholder="Descreva as condições para realização da vistoria (local, data, horário, contato)..."
            value={requisitos.informacoesVistoria}
            onChange={(e) => updateRequisitos('informacoesVistoria', e.target.value)}
          />
        </div>
      </div>
    </StandardCard>
  );
};

export default TRRequisitosTecnicos;
