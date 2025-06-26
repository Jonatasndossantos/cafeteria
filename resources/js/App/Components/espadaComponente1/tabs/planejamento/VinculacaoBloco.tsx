import { Filter, AlertTriangle, HelpCircle, Send, Link } from "lucide-react";
import { useState, useEffect } from "react";
import { useFormData } from "@/hooks/useFormData";
import { StandardCard } from '@/Components/ui/standard-card';

export function VinculacaoBloco() {
  const { formData, updateField, getFieldValue } = useFormData();
  const [showDotacaoModal, setShowDotacaoModal] = useState(false);
  const [dotacaoData, setDotacaoData] = useState({
    motivo: '',
    observacoes: '',
    urgencia: 'normal'
  });
  const [loading, setLoading] = useState(false);

  const handleSolicitarDotacao = () => {
    setLoading(true);
    setTimeout(() => {
      alert('Solicitação enviada ao Departamento de Contabilidade');
      setShowDotacaoModal(false);
      setLoading(false);
    }, 1000);
  };

  const hasValidVinculacao = getFieldValue('vinculacoes.ppa') && getFieldValue('vinculacoes.ldo') && getFieldValue('vinculacoes.loa');

  return (
    <StandardCard 
      title="Vinculação ao PPA, LDO, LOA"
      icon={Link}
      className="mb-6"
    >
      <div className="bg-gray-50 p-4 rounded-md mb-4 text-sm text-gray-700">
        A alocação orçamentária necessária à execução da presente demanda será providenciada oportunamente pelo setor de contabilidade da Prefeitura, observada a disponibilidade financeira e os créditos orçamentários pertinentes, em conformidade com os artigos 16 e 17 da Lei Complementar nº 101/2000 (LRF) e o art. 18 da Lei 14.133/2021.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">PPA *</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none"
            value={getFieldValue('vinculacoes.ppa')}
            disabled
          />
          <p className="text-xs text-gray-500 mt-1">Preenchido automaticamente</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LDO *</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none"
            value={getFieldValue('vinculacoes.ldo')}
            disabled
          />
          <p className="text-xs text-gray-500 mt-1">Preenchido automaticamente</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LOA *</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none"
            value={getFieldValue('vinculacoes.loa')}
            disabled
          />
          <p className="text-xs text-gray-500 mt-1">Preenchido automaticamente</p>
        </div>
      </div>

      {!hasValidVinculacao && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
            <div>
              <p className="text-sm font-medium text-amber-800">Vinculação Orçamentária Pendente</p>
              <p className="text-xs text-amber-700 mt-1">
                Esta demanda ainda não possui vinculação completa com PPA, LDO e LOA. 
                Será necessária aprovação do setor de contabilidade.
              </p>
            </div>
          </div>
          <div className="mt-3">
            <button 
              className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 text-sm"
              onClick={() => setShowDotacaoModal(true)}
            >
              Solicitar Dotação Orçamentária
            </button>
          </div>
        </div>
      )}

      {/* Modal de Solicitação de Dotação Orçamentária */}
      {showDotacaoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Solicitar Dotação Orçamentária</h3>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowDotacaoModal(false)}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Motivo da Solicitação *</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue transition-colors"
                  value={dotacaoData.motivo}
                  onChange={(e) => setDotacaoData({...dotacaoData, motivo: e.target.value})}
                >
                  <option value="">Selecione o motivo...</option>
                  <option value="sem_vinculacao">Não há vinculação com PPA/LDO/LOA</option>
                  <option value="duvida_vinculacao">Dúvida sobre vinculação existente</option>
                  <option value="dotacao_insuficiente">Dotação orçamentária insuficiente</option>
                  <option value="nova_dotacao">Necessidade de nova dotação</option>
                  <option value="outros">Outros motivos</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nível de Urgência</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue transition-colors"
                  value={dotacaoData.urgencia}
                  onChange={(e) => setDotacaoData({...dotacaoData, urgencia: e.target.value})}
                >
                  <option value="normal">Normal</option>
                  <option value="urgente">Urgente</option>
                  <option value="muito_urgente">Muito Urgente</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Observações Adicionais</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue transition-colors"
                  value={dotacaoData.observacoes}
                  onChange={(e) => setDotacaoData({...dotacaoData, observacoes: e.target.value})}
                  rows={4}
                  placeholder="Descreva detalhes sobre a solicitação de dotação orçamentária..."
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
                onClick={() => setShowDotacaoModal(false)}
              >
                Cancelar
              </button>
              <button 
                className="px-4 py-2 bg-lumen-blue text-white rounded-md hover:bg-lumen-blue/90 text-sm transition-colors"
                onClick={handleSolicitarDotacao}
                disabled={loading || !dotacaoData.motivo}
              >
                {loading ? 'Enviando...' : 'Enviar Solicitação'}
              </button>
            </div>
          </div>
        </div>
      )}
    </StandardCard>
  );
}
