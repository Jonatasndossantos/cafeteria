import { FileText, Plus, FileUp, FileDown, Calendar } from 'lucide-react';
import { useTRObjeto } from '@/hooks/useTRObjeto';
import { StandardCard } from '@/Components/ui/standard-card';
import { GestaoItensTable } from '@/Components/common/GestaoItensTable';
import { ObrasTable } from '@/Components/common/ObrasTable';
import { useState } from 'react';

const TRModeloExecucaoBloco = () => {
  const { metadata, objeto, updateObjeto, updateMetadata, isSaving } = useTRObjeto();
  const [items, setItems] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const shouldShowGestaoTable = ['bens', 'bens_dispensa', 'tic_compras', 'tic_servicos'].includes(metadata.tipoObjeto);
  const shouldShowObrasTable = metadata.tipoObjeto === 'obras';

  const handleAddItem = (item: any) => {
    const newItems = [...items, { ...item, id: Date.now().toString() }];
    setItems(newItems);
    updateObjeto('materiaisUtilizados', { items: newItems });
  };

  const handleRemoveItem = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    updateObjeto('materiaisUtilizados', { items: newItems });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatMateriaisToString = (materiais: any) => {
    if (!materiais || !materiais.items) return '';
    return materiais.items.map((item: any) => 
      `${item.descricao} - ${item.quantidade} ${item.unidade}${item.especificacao ? ` (${item.especificacao})` : ''}`
    ).join('\n');
  };

  const parseMateriaisFromString = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    const items = lines.map((line, index) => {
      const [descricao, rest] = line.split(' - ');
      const [quantidade, unidade, especificacao] = rest.split(' ');
      return {
        id: index + 1,
        descricao: descricao.trim(),
        quantidade: parseFloat(quantidade) || 0,
        unidade: unidade?.replace(/[()]/g, '') || '',
        especificacao: especificacao?.replace(/[()]/g, '') || ''
      };
    });
    return { items };
  };

  return (
    <StandardCard 
      title="Modelo de Execução"
      icon={Calendar}
      className="hover:shadow-xl transition-all duration-200"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          4.1 Cronograma Físico-Financeiro *
          <div className="inline-flex items-center ml-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center cursor-help" title="Descreva o cronograma físico-financeiro da execução">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </label>
        <textarea 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
          rows={4}
          placeholder="Descreva o cronograma físico-financeiro da execução..."
          value={objeto.cronogramaFisicoFinanceiro || ''}
          onChange={(e) => updateObjeto('cronogramaFisicoFinanceiro', e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          4.2 Composição do BDI *
          <div className="inline-flex items-center ml-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center cursor-help" title="Descreva a composição do BDI (Bonificação e Despesas Indiretas)">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Administração Central (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
              placeholder="0.00"
              value={objeto.bdi?.administracaoCentral || ''}
              onChange={(e) => updateObjeto('bdi', { ...objeto.bdi, administracaoCentral: parseFloat(e.target.value) })}
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Custo Financeiro (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
              placeholder="0.00"
              value={objeto.bdi?.custoFinanceiro || ''}
              onChange={(e) => updateObjeto('bdi', { ...objeto.bdi, custoFinanceiro: parseFloat(e.target.value) })}
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Seguros (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
              placeholder="0.00"
              value={objeto.bdi?.seguros || ''}
              onChange={(e) => updateObjeto('bdi', { ...objeto.bdi, seguros: parseFloat(e.target.value) })}
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Garantias (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
              placeholder="0.00"
              value={objeto.bdi?.garantias || ''}
              onChange={(e) => updateObjeto('bdi', { ...objeto.bdi, garantias: parseFloat(e.target.value) })}
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Impostos (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
              placeholder="0.00"
              value={objeto.bdi?.impostos || ''}
              onChange={(e) => updateObjeto('bdi', { ...objeto.bdi, impostos: parseFloat(e.target.value) })}
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Lucro (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
              placeholder="0.00"
              value={objeto.bdi?.lucro || ''}
              onChange={(e) => updateObjeto('bdi', { ...objeto.bdi, lucro: parseFloat(e.target.value) })}
              required
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          4.3 Planilha de Preços *
          <div className="inline-flex items-center ml-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center cursor-help" title="Descreva a planilha de preços unitários">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </label>
          <textarea 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
            rows={4}
          placeholder="Descreva a planilha de preços unitários..."
          value={objeto.planilhaPrecos || ''}
          onChange={(e) => updateObjeto('planilhaPrecos', e.target.value)}
            required
          />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          4.4 Metodologia de Execução *
          <div className="inline-flex items-center ml-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center cursor-help" title="Descreva a metodologia de execução do objeto">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </label>
        <textarea 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue focus:border-transparent transition-all duration-200"
          rows={4}
          placeholder="Descreva a metodologia de execução do objeto..."
          value={objeto.metodologiaExecucao || ''}
          onChange={(e) => updateObjeto('metodologiaExecucao', e.target.value)}
          required
        />
      </div>
    </StandardCard>
  );
};

export default TRModeloExecucaoBloco; 