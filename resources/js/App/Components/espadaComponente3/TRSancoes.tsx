import { Shield } from 'lucide-react';
import { useTRObrigacoes } from '@/hooks/useTRObrigacoes';
import { StandardCard } from '@/Components/ui/standard-card';

const TRSancoes = () => {
  const { sancoes, updateSancoes } = useTRObrigacoes();

  return (
    <StandardCard 
      title="Sanções e Penalidades"
      icon={Shield}
      className="animate-fade-in"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Sanções Administrativas *</label>
        <textarea 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
          rows={4}
          placeholder="Descreva as sanções administrativas aplicáveis..."
          value={sancoes.sancoesAdministrativas}
          onChange={(e) => updateSancoes('sancoesAdministrativas', e.target.value)}
          required
        />
        <div className="mt-1 flex items-center text-sm text-lumen-blue">
          <svg className="w-4 h-4 mr-1 text-lumen-gold" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span className="font-roboto">Conforme Art. 155 a 163 da Lei 14.133/21.</span>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Procedimentos para Aplicação de Sanções *</label>
        <textarea 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
          rows={4}
          placeholder="Descreva os procedimentos para aplicação de sanções..."
          value={sancoes.procedimentosAplicacao}
          onChange={(e) => updateSancoes('procedimentosAplicacao', e.target.value)}
          required
        />
      </div>
    </StandardCard>
  );
};

export default TRSancoes;
