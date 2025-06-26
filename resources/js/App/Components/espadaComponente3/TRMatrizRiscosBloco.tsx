import { AlertTriangle } from 'lucide-react';
import { useTRObjeto } from '@/hooks/useTRObjeto';
import { StandardCard } from '@/Components/ui/standard-card';

const TRMatrizRiscosBloco = () => {
  const { metadata, objeto, updateObjeto, updateMetadata, isSaving } = useTRObjeto();

  return (
    <StandardCard 
      title="Matriz de Riscos"
      icon={AlertTriangle}
      className="hover:shadow-xl transition-all duration-200"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          7.1 Riscos Contratuais *
          <div className="inline-flex items-center ml-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center cursor-help" title="Descreva os riscos contratuais identificados">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </label>
        <textarea 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
          rows={4}
          placeholder="Descreva os riscos contratuais identificados..."
          value={objeto.riscosContratuais || ''}
          onChange={(e) => updateObjeto('riscosContratuais', e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          7.2 Alocação de Riscos *
          <div className="inline-flex items-center ml-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center cursor-help" title="Descreva a alocação de riscos entre as partes">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </label>
        <textarea 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
          rows={4}
          placeholder="Descreva a alocação de riscos entre as partes..."
          value={objeto.alocacaoRiscos || ''}
          onChange={(e) => updateObjeto('alocacaoRiscos', e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          7.3 Medidas Mitigadoras *
          <div className="inline-flex items-center ml-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center cursor-help" title="Descreva as medidas mitigadoras para os riscos identificados">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </label>
        <textarea 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
          rows={4}
          placeholder="Descreva as medidas mitigadoras para os riscos identificados..."
          value={objeto.medidasMitigadoras || ''}
          onChange={(e) => updateObjeto('medidasMitigadoras', e.target.value)}
          required
        />
      </div>
    </StandardCard>
  );
};

export default TRMatrizRiscosBloco; 