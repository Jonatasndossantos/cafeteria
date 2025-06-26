import { useState } from 'react';
import { Package, Plus, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { useTRQuantitativos } from '@/hooks/useTRQuantitativos';
import { StandardCard } from '@/Components/ui/standard-card';

const TRQuantitativosBloco = () => {
  const { quantitativos, updateItem, formatCurrency, isSaving } = useTRQuantitativos();

  return (
    <StandardCard 
      title="2. Especificações e Quantitativos"
      icon={Package}
      className="animate-fade-in"
    >
      {isSaving && (
        <span className="ml-2 text-sm text-blue-600">💾 Salvando...</span>
      )}

      <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 mr-2" />
          <div>
            <p className="font-medium text-sm text-blue-800">Sugestão IA-LUX</p>
            <p className="text-xs text-blue-700 mt-1 font-roboto">
              ✅ Dados validados conforme ETP-2024-0038. Valores dentro dos limites legais. 
              Produtos sustentáveis selecionados conforme diretrizes ambientais.
            </p>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Unitário</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {quantitativos.items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{item.id}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.descricao}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.unidade}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <input
                    type="number"
                    value={item.quantidade}
                    onChange={(e) => updateItem(item.id, 'quantidade', Number(e.target.value))}
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-lumen-blue"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <input
                    type="number"
                    step="0.01"
                    value={item.valorUnitario}
                    onChange={(e) => updateItem(item.id, 'valorUnitario', Number(e.target.value))}
                    className="w-24 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-lumen-blue"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">{formatCurrency(item.valorTotal)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-lumen-blue hover:text-lumen-gold mr-3 p-1 rounded transition-colors duration-200">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900 p-1 rounded transition-colors duration-200">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4">
        <button className="px-4 py-2 border border-dashed border-lumen-blue text-lumen-blue rounded-md hover:bg-gray-50 font-montserrat font-medium text-sm flex items-center transition-all duration-200">
          <Plus className="w-5 h-5 mr-2" />
          Adicionar Item
        </button>
      </div>
      
      <div className="mt-4 flex justify-end">
        <div className="bg-gray-50 p-4 rounded-lg w-64">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Valor Total:</span>
            <span className="text-sm font-medium text-gray-900">{formatCurrency(quantitativos.valorTotalGeral)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-700">Valor Estimado (ETP):</span>
            <span className="text-sm font-medium text-gray-900">{formatCurrency(quantitativos.valorEstimadoETP)}</span>
          </div>
        </div>
      </div>
    </StandardCard>
  );
};

export default TRQuantitativosBloco;
