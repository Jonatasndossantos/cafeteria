import { Settings, Search, RefreshCw, Plus, X, AlertTriangle, CheckCircle, FileText, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { useFormData } from "@/hooks/useFormData";
import { StandardCard } from '@/Components/ui/standard-card';

interface PCAItem {
  id: number;
  descricao: string;
  codigo: string;
  valorPrevisto: number;
  periodo: string;
  compatibilidade: number;
}

export function PCAVinculacaoBloco() {
  const { formData, updateField, getFieldValue } = useFormData();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSolicitacaoModal, setShowSolicitacaoModal] = useState(false);
  const [solicitacaoData, setSolicitacaoData] = useState({
    descricao: '',
    justificativa: 'Esclarece-se que a presente demanda não consta no Plano de Contratações Anual (PCA) vigente, em razão de [justificativa técnica – ex: necessidade superveniente, falha de previsão, urgência operacional]',
    valor: 0,
    periodo: '',
    catmat: ''
  });

  // Simula busca automática no PCA
  useEffect(() => {
    // Auto busca quando Componente é montado
    handleAutoBusca();
  }, []);

  const handleAutoBusca = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleSelectItem = (item: PCAItem) => {
    const currentSelected = getFieldValue('pca.selectedItems') || [];
    const newSelection = [...currentSelected, item];
    updateField('pca.selectedItems', newSelection);
  };

  const handleRemoveItem = (itemId: number) => {
    const currentSelected = getFieldValue('pca.selectedItems') || [];
    const newSelection = currentSelected.filter((item: PCAItem) => item.id !== itemId);
    updateField('pca.selectedItems', newSelection);
  };

  const handleSolicitacaoSubmit = () => {
    // Simula envio da solicitação
    setLoading(true);
    setTimeout(() => {
      alert('Solicitação enviada para aprovação do Prefeito');
      setShowSolicitacaoModal(false);
      setLoading(false);
    }, 1000);
  };

  const pcaItems = getFieldValue('pca.items') || [];
  const selectedItems = getFieldValue('pca.selectedItems') || [];

  return (
    <StandardCard 
      title="Vinculação ao PCA"
      icon={Calendar}
      className="mb-6"
    >
      <div className="mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-lumen-blue transition-colors"
              placeholder="Buscar no PCA por descrição, código CATMAT/CATSER..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className="px-4 py-2 bg-lumen-blue text-white rounded-r-md hover:bg-lumen-blue/90 transition-colors flex items-center"
            onClick={handleAutoBusca}
          >
            <Search className="w-4 h-4 mr-2" />
            Buscar
          </button>
          <button 
            className="px-3 py-2 border border-lumen-blue text-lumen-blue rounded-md hover:bg-gray-50 transition-colors"
            onClick={handleAutoBusca}
            title="Recarregar análise automática"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin h-8 w-8 text-lumen-blue mx-auto mb-2">
            <RefreshCw className="w-8 h-8" />
          </div>
          <p className="text-gray-600">Analisando compatibilidade com PCA...</p>
        </div>
      ) : pcaItems.length > 0 ? (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-sm font-medium text-green-800">
                LUX encontrou {pcaItems.length} item(ns) compatível(is) no PCA
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Previsto</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Período</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compatibilidade</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ação</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pcaItems.map((item: PCAItem) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3 text-sm">{item.descricao}</td>
                    <td className="px-4 py-3 text-sm font-mono">{item.codigo}</td>
                    <td className="px-4 py-3 text-sm">R$ {item.valorPrevisto.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm">{item.periodo}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{width: `${item.compatibilidade}%`}}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">{item.compatibilidade}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button 
                        className="px-3 py-1 bg-lumen-blue text-white rounded-md hover:bg-lumen-blue/90 text-xs"
                        onClick={() => handleSelectItem(item)}
                      >
                        Vincular
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-2">Nenhum item encontrado no PCA com esses critérios</p>
          <p className="text-sm text-gray-500 mb-4">Esta demanda não foi prevista no PCA atual</p>
          <button 
            className="px-4 py-2 bg-lumen-blue text-white rounded-md hover:bg-lumen-blue/90 font-medium text-sm flex items-center mx-auto"
            onClick={() => setShowSolicitacaoModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Solicitar Aprovação do Prefeito para Inclusão no PCA
          </button>
        </div>
      )}
      
      {selectedItems.length > 0 && (
        <div className="mt-6">
          <h3 className="font-medium text-sm mb-3 text-lumen-blue">Itens do PCA vinculados:</h3>
          <div className="space-y-2">
            {selectedItems.map((item: PCAItem) => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-blue-50 border border-blue-200 rounded-md">
                <div>
                  <p className="text-sm font-medium">{item.descricao}</p>
                  <p className="text-xs text-gray-600">Código: {item.codigo} • Valor: R$ {item.valorPrevisto.toFixed(2)} • {item.periodo}</p>
                </div>
                <button 
                  className="text-red-500 hover:text-red-700 transition-colors"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botão adicional para solicitar aprovação do Prefeito */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-700">Demanda não prevista no PCA?</h4>
            <p className="text-xs text-gray-500">Solicite aprovação do Prefeito para inclusão no Plano de Contratação Anual</p>
          </div>
          <button 
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 font-medium text-sm flex items-center"
            onClick={() => setShowSolicitacaoModal(true)}
          >
            <FileText className="w-4 h-4 mr-2" />
            Solicitar Aprovação do Prefeito
          </button>
        </div>
      </div>
      
      {/* Modal de Solicitação de Aprovação do Prefeito */}
      {showSolicitacaoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Solicitar Aprovação do Prefeito para Inclusão no PCA</h3>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowSolicitacaoModal(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição da Demanda *</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue transition-colors"
                  value={solicitacaoData.descricao}
                  onChange={(e) => setSolicitacaoData({...solicitacaoData, descricao: e.target.value})}
                  rows={3}
                  placeholder="Descreva a demanda que precisa ser incluída no PCA"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Justificativa e inclusão no PCA *</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue transition-colors"
                  value={solicitacaoData.justificativa}
                  onChange={(e) => setSolicitacaoData({...solicitacaoData, justificativa: e.target.value})}
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valor Estimado *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">R$</span>
                    </div>
                    <input 
                      type="number" 
                      className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue transition-colors"
                      value={solicitacaoData.valor || ''}
                      onChange={(e) => setSolicitacaoData({...solicitacaoData, valor: parseFloat(e.target.value) || 0})}
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Período Previsto *</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue transition-colors"
                    value={solicitacaoData.periodo}
                    onChange={(e) => setSolicitacaoData({...solicitacaoData, periodo: e.target.value})}
                  >
                    <option value="">Selecione...</option>
                    <option value="1º Trimestre">1º Trimestre</option>
                    <option value="2º Trimestre">2º Trimestre</option>
                    <option value="3º Trimestre">3º Trimestre</option>
                    <option value="4º Trimestre">4º Trimestre</option>
                  </select>
                </div>
              </div>

            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
                onClick={() => setShowSolicitacaoModal(false)}
              >
                Cancelar
              </button>
              <button 
                className="px-4 py-2 bg-lumen-blue text-white rounded-md hover:bg-lumen-blue/90 text-sm transition-colors"
                onClick={handleSolicitacaoSubmit}
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar para Aprovação do Prefeito'}
              </button>
            </div>
          </div>
        </div>
      )}
    </StandardCard>
  );
}
