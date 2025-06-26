import { Paperclip, DollarSign } from "lucide-react";
import { useFormData } from "@/hooks/useFormData";
import { StandardCard } from "@/Components/ui/standard-card";

export function AnexosClassificacaoBloco() {
  const { formData, updateField, getFieldValue } = useFormData();

  return (
    <StandardCard 
      title="Classificação Orçamentária"
      icon={DollarSign}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Programa *
            </label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue transition-colors"
              placeholder="Código do programa"
              value={getFieldValue('dfd.programa') || '2001'}
              onChange={(e) => updateField('dfd.programa', e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ação *
            </label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue transition-colors"
              placeholder="Código da ação"
              value={getFieldValue('dfd.acao') || '2001.001'}
              onChange={(e) => updateField('dfd.acao', e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Elemento de Despesa *
            </label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue transition-colors"
              placeholder="Código do elemento"
              value={getFieldValue('dfd.elementoDespesa') || '449052'}
              onChange={(e) => updateField('dfd.elementoDespesa', e.target.value)}
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fonte de Recursos *
          </label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue transition-colors"
            value={getFieldValue('dfd.fonteRecursos') || 'recursos_proprios'}
            onChange={(e) => updateField('dfd.fonteRecursos', e.target.value)}
            required
          >
            <option value="">Selecione a fonte de recursos</option>
            <option value="recursos_proprios">Recursos Próprios</option>
            <option value="fundeb">FUNDEB</option>
            <option value="federais">Recursos Federais</option>
            <option value="estaduais">Recursos Estaduais</option>
            <option value="convenios">Convênios</option>
          </select>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="font-medium text-gray-800 mb-2">Observação sobre Alocação Orçamentária</h3>
          <p className="text-sm text-gray-700">
            A alocação orçamentária necessária à execução da presente demanda será providenciada oportunamente pelo setor de contabilidade da Prefeitura, observada a disponibilidade financeira e os créditos orçamentários pertinentes, em conformidade com os artigos 16 e 17 da Lei Complementar nº 101/2000 (LRF) e o art. 18 da Lei 14.133/2021.
          </p>
        </div>
      </div>
    </StandardCard>
  );
}
