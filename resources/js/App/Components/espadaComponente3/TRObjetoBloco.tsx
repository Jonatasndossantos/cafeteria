import { FileText } from 'lucide-react';
import { useTRObjeto } from '@/hooks/useTRObjeto';
import { StandardCard } from '@/Components/ui/standard-card';

const TRObjetoBloco = () => {
  const { metadata, objeto, updateObjeto, updateMetadata, isSaving } = useTRObjeto();

  const getRegimesDisponiveis = () => {
    switch (metadata.tipoObjeto) {
      case 'bens':
        return [
          { value: 'fornecimento_demanda', label: 'Fornecimento e Prestação de Serviço Associado' }
        ];
      case 'bens_dispensa':
        return [
          { value: 'dispensa_licitacao', label: 'Contratação Direta - Dispensa de Licitação' }
        ];
      case 'servicos_sem_mao_obra':
        return [
          { value: 'empreitada_preco_global', label: 'Empreitada por Preço Global' },
          { value: 'empreitada_preco_unitario', label: 'Empreitada por Preço Unitário' },
          { value: 'tarefa', label: 'Tarefa' }
        ];
      case 'servicos_com_mao_obra':
        return [
          { value: 'empreitada_preco_global', label: 'Empreitada por Preço Global' },
          { value: 'empreitada_preco_unitario', label: 'Empreitada por Preço Unitário' }
        ];
      case 'obras':
        return [
          { value: 'empreitada_preco_global', label: 'Empreitada por Preço Global' },
          { value: 'empreitada_preco_unitario', label: 'Empreitada por Preço Unitário' },
          { value: 'empreitada_integral', label: 'Empreitada Integral' },
          { value: 'contratacao_integrada', label: 'Contratação Integrada' },
          { value: 'contratacao_semi_integrada', label: 'Contratação Semi-integrada' }
        ];
      default:
        return [
          { value: 'empreitada_preco_global', label: 'Empreitada por Preço Global' },
          { value: 'empreitada_preco_unitario', label: 'Empreitada por Preço Unitário' },
          { value: 'tarefa', label: 'Tarefa' },
          { value: 'empreitada_integral', label: 'Empreitada Integral' },
          { value: 'contratacao_integrada', label: 'Contratação Integrada' },
          { value: 'contratacao_semi_integrada', label: 'Contratação Semi-integrada' },
          { value: 'fornecimento_demanda', label: 'Fornecimento e Prestação de Serviço Associado' }
        ];
    }
  };

  const getSpecificRequirements = () => {
    switch (metadata.tipoObjeto) {
      case 'servicos_com_mao_obra':
        return {
          requisitos: 'Incluir escala de trabalho e vínculo trabalhista',
          sustentabilidade: 'Considerar aspectos trabalhistas e previdenciários'
        };
      case 'tic_servicos':
        return {
          requisitos: 'Incluir SLA, continuidade e interoperabilidade',
          sustentabilidade: 'Considerar requisitos ambientais e compatibilidade'
        };
      case 'tic_compras':
        return {
          sustentabilidade: 'Considerar requisitos ambientais e compatibilidade'
        };
      default:
        return {};
    }
  };

  const mostrarFundamentacaoLegal = metadata.tipoObjeto === 'bens_dispensa';
  const specificRequirements = getSpecificRequirements();

  return (
    <StandardCard 
      title="Objeto e Justificativa"
      icon={FileText}
      className="hover:shadow-xl transition-all duration-200"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          1.1 Definição do Objeto *
          <div className="inline-flex items-center ml-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center cursor-help" title="Sugestão IA-LUX preenchida automaticamente">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </label>
        <textarea 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
          rows={3}
          placeholder="Descreva o objeto da contratação de forma clara e objetiva..."
          value={objeto.definicao || ''}
          onChange={(e) => updateObjeto('definicao', e.target.value)}
          required
        />
        <div className="mt-1 flex items-center text-sm text-lumen-blue">
          <svg className="w-4 h-4 mr-1 text-lumen-gold" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span className="font-roboto">Conforme Art. 6º, XXIII, 'a' da Lei 14.133/21.</span>
        </div>
      </div>

      {mostrarFundamentacaoLegal && (
        <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-medium text-sm text-yellow-800 mb-2">⚖️ Fundamentação Legal para Dispensa</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Artigo da Lei</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
                value="Art. 75, inciso I"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Modalidade</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
                value="Dispensa de Licitação"
                disabled
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição Legal</label>
            <textarea 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
              rows={2}
              value={objeto.fundamentacaoLegal || ''}
              onChange={(e) => updateObjeto('fundamentacaoLegal', e.target.value)}
              placeholder="Valor estimado inferior ao limite legal previsto para bens e serviços..."
            />
          </div>
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          1.2 Justificativa e Objetivo da Contratação *
          {mostrarFundamentacaoLegal && (
            <div className="inline-flex items-center ml-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center cursor-help" title="Sugestão IA-LUX preenchida">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}
        </label>
        <textarea 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
          rows={4}
          placeholder="Descreva a justificativa e o objetivo da contratação..."
          value={objeto.justificativa || ''}
          onChange={(e) => updateObjeto('justificativa', e.target.value)}
          required
        />
        {mostrarFundamentacaoLegal && (
          <div className="mt-2 bg-blue-50 border border-blue-200 rounded-md p-3">
            <p className="text-xs font-medium text-blue-800 mb-1">💡 Sugestão IA-LUX para Justificativa Econômica:</p>
            <p className="text-xs text-blue-700">
              A pesquisa de preços demonstra compatibilidade com o mercado, assegurando a vantajosidade da contratação.
            </p>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          1.3 Benefícios diretos e indiretos da contratação *
          <div className="inline-flex items-center ml-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center cursor-help" title="Descreva os benefícios que a contratação trará para a instituição e sociedade">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </label>
        <textarea 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
          rows={4}
          placeholder="Descreva os benefícios diretos e indiretos que a contratação trará para a instituição e sociedade..."
          value={objeto.beneficios || ''}
          onChange={(e) => updateObjeto('beneficios', e.target.value)}
          required
        />
      </div>

      {Object.keys(specificRequirements).length > 0 && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-sm font-medium text-green-800 mb-2">📌 Requisitos Específicos:</h3>
          <ul className="text-sm text-green-700 space-y-2">
            {specificRequirements.requisitos && (
              <li className="flex items-start">
                <svg className="w-4 h-4 mr-2 text-green-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span><strong>Requisitos:</strong> {specificRequirements.requisitos}</span>
              </li>
            )}
            {specificRequirements.sustentabilidade && (
              <li className="flex items-start">
                <svg className="w-4 h-4 mr-2 text-green-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span><strong>Sustentabilidade:</strong> {specificRequirements.sustentabilidade}</span>
              </li>
            )}
          </ul>
        </div>
      )}
    </StandardCard>
  );
};

export default TRObjetoBloco;
