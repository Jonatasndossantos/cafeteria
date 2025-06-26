import { FileText } from 'lucide-react';
import { useTRObjeto } from '@/hooks/useTRObjeto';
import { StandardCard } from '@/Components/ui/standard-card';

const TRVersionSelector = () => {
  const { metadata, updateMetadata, isSaving } = useTRObjeto();

  const getRequiredBlocks = (tipoObjeto: string) => {
    const baseBlocks = [
      'objeto',
      'solucao',
      'requisitos',
      'forma_selecao',
      'sustentabilidade',
      'estimativa_precos',
      'adequacao_orcamentaria',
      'responsabilidade'
    ];

    switch (tipoObjeto) {
      case 'bens':
      case 'bens_dispensa':
        return baseBlocks;
      case 'obras':
        return [
          ...baseBlocks,
          'modelo_execucao',
          'modelo_gestao',
          'medicao_pagamento',
          'matriz_riscos'
        ];
      case 'servicos_sem_mao_obra':
        return [
          ...baseBlocks,
          'modelo_execucao',
          'modelo_gestao',
          'medicao_pagamento'
        ];
      case 'servicos_com_mao_obra':
        return [
          ...baseBlocks,
          'modelo_execucao',
          'modelo_gestao',
          'medicao_pagamento',
          'matriz_riscos'
        ];
      case 'tic_compras':
        return [
          ...baseBlocks,
          'modelo_execucao',
          'modelo_gestao',
          'medicao_pagamento',
          'matriz_riscos'
        ];
      case 'tic_servicos':
        return [
          ...baseBlocks,
          'modelo_execucao',
          'modelo_gestao',
          'medicao_pagamento',
          'matriz_riscos'
        ];
      default:
        return baseBlocks;
    }
  };

  const handleTipoObjetoChange = (tipoObjeto: string) => {
    const requiredBlocks = getRequiredBlocks(tipoObjeto);
    updateMetadata('tipoObjeto', tipoObjeto);
    updateMetadata('requiredBlocks', JSON.stringify(requiredBlocks));
  };

  return (
    <StandardCard 
      title="Selecionar Versão do TR" 
      icon={FileText}
      className="animate-fade-in"
    >
      {isSaving && (
        <span className="ml-2 text-sm text-blue-600">💾 Salvando...</span>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Objeto *</label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
            required
            value={metadata.tipoObjeto}
            onChange={(e) => handleTipoObjetoChange(e.target.value)}
          >
            <option value="">Selecione o tipo de objeto</option>
            <option value="bens">Bens (Compras)</option>
            <option value="bens_dispensa">Bens (Dispensa de Licitação)</option>
            <option value="servicos_sem_mao_obra">Serviços sem Mão de Obra Exclusiva</option>
            <option value="servicos_com_mao_obra">Serviços com Mão de Obra Exclusiva</option>
            <option value="obras">Obras e Serviços de Engenharia</option>
            <option value="tic_compras">TIC - Compras</option>
            <option value="tic_servicos">TIC - Serviços</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Número do TR</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none cursor-not-allowed"
            value={metadata.numeroTR}
            disabled
          />
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Vinculado ao ETP</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none cursor-not-allowed"
            value={metadata.numeroETP}
            disabled
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Vinculado ao DFD</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none cursor-not-allowed"
            value={metadata.numeroDFD}
            disabled
          />
        </div>
      </div>

      {metadata.tipoObjeto && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 mb-2">📋 Blocos Obrigatórios:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            {getRequiredBlocks(metadata.tipoObjeto).map((block) => (
              <li key={block} className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {block.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </li>
            ))}
          </ul>
        </div>
      )}
    </StandardCard>
  );
};

export default TRVersionSelector;
