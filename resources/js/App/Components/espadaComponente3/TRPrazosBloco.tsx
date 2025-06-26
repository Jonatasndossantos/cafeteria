import { Calendar } from 'lucide-react';
import { useTRPrazos } from '@/hooks/useTRPrazos';
import { StandardCard } from '@/Components/ui/standard-card';

const TRPrazosBloco = () => {
  const { prazos, updatePrazos, updatePrazoExecucao, updatePrazoVigencia, isSaving } = useTRPrazos();

  return (
    <StandardCard 
      title="4. Prazos e Condições"
      icon={Calendar}
      className="animate-fade-in"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            4.1 Prazo de Entrega/Execução *
            <div className="inline-flex items-center ml-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center cursor-help" title="Sugestão IA-LUX: Prazo padrão para este tipo de objeto conforme análise histórica">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </label>
          <div className="flex">
            <input 
              type="number" 
              className="w-20 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
              min="1"
              value={prazos.execucao.valor}
              onChange={(e) => updatePrazoExecucao('valor', parseInt(e.target.value) || 0)}
              disabled={isSaving}
              required
            />
            <select 
              className="px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent -ml-px transition-all duration-200"
              value={prazos.execucao.unidade}
              onChange={(e) => updatePrazoExecucao('unidade', e.target.value)}
              disabled={isSaving}
              required
            >
              <option value="dias">Dias</option>
              <option value="semanas">Semanas</option>
              <option value="meses">Meses</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            4.2 Prazo de Vigência Contratual *
            <div className="inline-flex items-center ml-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center cursor-help" title="Sugestão IA-LUX: Vigência adequada conforme Art. 107 da Lei 14.133/21">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </label>
          <div className="flex">
            <input 
              type="number" 
              className="w-20 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
              min="1"
              value={prazos.vigencia.valor}
              onChange={(e) => updatePrazoVigencia('valor', parseInt(e.target.value) || 0)}
              disabled={isSaving}
              required
            />
            <select 
              className="px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent -ml-px transition-all duration-200"
              value={prazos.vigencia.unidade}
              onChange={(e) => updatePrazoVigencia('unidade', e.target.value)}
              disabled={isSaving}
              required
            >
              <option value="dias">Dias</option>
              <option value="semanas">Semanas</option>
              <option value="meses">Meses</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">4.3 Local de Entrega/Execução *</label>
        <textarea 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
          rows={2}
          placeholder="Informe o(s) local(is) de entrega ou execução..."
          value={prazos.localEntrega}
          onChange={(e) => updatePrazos('localEntrega', e.target.value)}
          disabled={isSaving}
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">4.4 Condições de Recebimento *</label>
        <textarea 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
          rows={4}
          placeholder="Descreva as condições de recebimento provisório e definitivo..."
          value={prazos.condicoesRecebimento}
          onChange={(e) => updatePrazos('condicoesRecebimento', e.target.value)}
          disabled={isSaving}
          required
        />
        <div className="mt-1 flex items-center text-sm text-lumen-blue">
          <svg className="w-4 h-4 mr-1 text-lumen-gold" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span className="font-roboto">Conforme Art. 140 da Lei 14.133/21.</span>
        </div>
      </div>
    </StandardCard>
  );
};

export default TRPrazosBloco;
