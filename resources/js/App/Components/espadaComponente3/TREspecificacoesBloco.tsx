import { FileText } from 'lucide-react';
import { useTRPrazos } from '@/hooks/useTRPrazos';
import { StandardCard } from '@/Components/ui/standard-card';

const TREspecificacoesBloco = () => {
  const { especificacoes, updateEspecificacoes, isSaving } = useTRPrazos();

  return (
    <StandardCard 
      title="Especificações Técnicas"
      icon={FileText}
      className="animate-fade-in"
    >

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">3.1 Especificações Técnicas Detalhadas *</label>
        <textarea 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
          rows={6}
          placeholder="Descreva detalhadamente as especificações técnicas dos itens..."
          value={especificacoes.tecnicasDetalhadas}
          onChange={(e) => updateEspecificacoes('tecnicasDetalhadas', e.target.value)}
          disabled={isSaving}
          required
        />
        <div className="mt-1 flex items-center text-sm text-lumen-blue">
          <svg className="w-4 h-4 mr-1 text-lumen-gold" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span className="font-roboto">Conforme Art. 6º, XXIII, 'b' da Lei 14.133/21.</span>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">3.2 Critérios de Qualidade e Aceitação *</label>
        <textarea 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
          rows={4}
          placeholder="Descreva os critérios de qualidade e aceitação do objeto..."
          value={especificacoes.criteriosQualidade}
          onChange={(e) => updateEspecificacoes('criteriosQualidade', e.target.value)}
          disabled={isSaving}
          required
        />
      </div>
    </StandardCard>
  );
};

export default TREspecificacoesBloco;
