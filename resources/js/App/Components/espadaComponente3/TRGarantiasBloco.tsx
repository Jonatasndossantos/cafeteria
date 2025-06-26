import { Shield } from 'lucide-react';
import { useTRGarantias } from '../../hooks/useTRGarantias';
import { StandardCard } from '@/Components/ui/standard-card';

const TRGarantiasBloco = () => {
  const { garantias, updateGarantias, updateGarantiaProduto, toggleModalidadeAceita, isSaving } = useTRGarantias();

  return (
    <StandardCard 
      title="5. Garantias e Pagamento"
      icon={Shield}
      className="animate-fade-in"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">5.1 Garantia do Produto/Serviço *</label>
        <div className="flex">
          <input 
            type="number" 
            className="w-20 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
            min="1"
            value={garantias.produto.valor}
            onChange={(e) => updateGarantiaProduto('valor', parseInt(e.target.value) || 0)}
            disabled={isSaving}
            required
          />
          <select 
            className="px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent -ml-px transition-all duration-200"
            value={garantias.produto.unidade}
            onChange={(e) => updateGarantiaProduto('unidade', e.target.value)}
            disabled={isSaving}
            required
          >
            <option value="dias">Dias</option>
            <option value="semanas">Semanas</option>
            <option value="meses">Meses</option>
            <option value="anos">Anos</option>
          </select>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">5.2 Garantia Contratual (Art. 96 da Lei 14.133/21)</label>
        <div className="flex items-center mb-2">
          <input 
            type="checkbox" 
            className="h-4 w-4 text-lumen-blue focus:ring-lumen-blue border-gray-300 rounded"
            checked={garantias.contratualExigida}
            onChange={(e) => updateGarantias('contratualExigida', e.target.checked)}
            disabled={isSaving}
          />
          <span className="ml-2 text-sm text-gray-700">Exigir garantia contratual</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Percentual da Garantia</label>
            <div className="relative">
              <input 
                type="number" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
                min="0"
                max="5"
                step="0.5"
                value={garantias.contratualPercentual}
                onChange={(e) => updateGarantias('contratualPercentual', parseFloat(e.target.value) || 0)}
                disabled={isSaving}
                placeholder="Até 5% do valor do contrato"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">%</span>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Modalidades Aceitas</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 text-lumen-blue focus:ring-lumen-blue border-gray-300 rounded"
                  checked={garantias.modalidadesAceitas.includes('Caução em dinheiro ou títulos')}
                  onChange={() => toggleModalidadeAceita('Caução em dinheiro ou títulos')}
                  disabled={isSaving}
                />
                <span className="ml-2 text-sm text-gray-700">Caução em dinheiro ou títulos</span>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 text-lumen-blue focus:ring-lumen-blue border-gray-300 rounded"
                  checked={garantias.modalidadesAceitas.includes('Seguro-garantia')}
                  onChange={() => toggleModalidadeAceita('Seguro-garantia')}
                  disabled={isSaving}
                />
                <span className="ml-2 text-sm text-gray-700">Seguro-garantia</span>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 text-lumen-blue focus:ring-lumen-blue border-gray-300 rounded"
                  checked={garantias.modalidadesAceitas.includes('Fiança bancária')}
                  onChange={() => toggleModalidadeAceita('Fiança bancária')}
                  disabled={isSaving}
                />
                <span className="ml-2 text-sm text-gray-700">Fiança bancária</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          5.3 Modalidade de Pagamento *
          <div className="inline-flex items-center ml-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center cursor-help" title="Sugestão IA-LUX: Modalidades adequadas ao tipo de contratação foram pré-selecionadas">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </label>
        <select 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200 mb-3"
          value={garantias.modalidadePagamento}
          onChange={(e) => updateGarantias('modalidadePagamento', e.target.value)}
          disabled={isSaving}
          required
        >
          <option value="">Selecione a modalidade de pagamento</option>
          <option value="entrega_total">Após entrega total</option>
          <option value="por_etapa">Por etapa de execução</option>
          <option value="por_medicao">Por medição/verificação</option>
          <option value="mensal">Pagamento mensal</option>
          <option value="parcelado">Parcelado conforme cronograma</option>
          <option value="antecipado">Pagamento antecipado (justificado)</option>
        </select>
        
        <label className="block text-sm font-medium text-gray-700 mb-1">5.4 Condições de Pagamento Detalhadas *</label>
        <textarea 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
          rows={4}
          placeholder="Descreva as condições específicas de pagamento, prazos, documentação necessária..."
          value={garantias.condicoesPagamento}
          onChange={(e) => updateGarantias('condicoesPagamento', e.target.value)}
          disabled={isSaving}
          required
        />
        <div className="mt-1 flex items-center text-sm text-lumen-blue">
          <svg className="w-4 h-4 mr-1 text-lumen-gold" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span className="font-roboto">Conforme Art. 141 a 146 da Lei 14.133/21.</span>
        </div>
      </div>
    </StandardCard>
  );
};

export default TRGarantiasBloco;
