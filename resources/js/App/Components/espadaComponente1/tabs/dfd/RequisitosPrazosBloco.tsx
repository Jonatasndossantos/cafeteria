import { Clock, AlertTriangle, FileText } from "lucide-react";
import { SugestoesIAComponent } from "./SugestoesIAComponent";
import { useFormData } from "@/hooks/useFormData";
import { StandardCard } from "@/Components/ui/standard-card";

export function RequisitosPrazosBloco() {
  const { formData, updateField, getFieldValue } = useFormData();

  const context = {
    documentType: 'dfd',
    tipo: 'bens',
    objeto: 'equipamentos_informatica'
  };

  return (
    <StandardCard 
      title="Requisitos e Prazos"
      icon={FileText}
      className="mb-6"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Requisitos Técnicos 
          </label>
          <SugestoesIAComponent
            field="requisitos_tecnicos"
            value={getFieldValue('dfd.requisitosTecnicos') || 'Computadores desktop com processador Intel Core i5 ou superior, 8GB RAM, 256GB SSD, Windows 11, garantia mínima de 12 meses. Notebooks com especificações similares para mobilidade. Tablets com tela mínima de 10 polegadas, 64GB armazenamento, Android ou iOS.'}
            onChange={(value) => updateField('dfd.requisitosTecnicos', value)}
            context={context}
            fieldType="textarea"
            rows={4}
            placeholder="Especifique os requisitos técnicos mínimos"
            onSelectSuggestion={(text) => updateField('dfd.requisitosTecnicos', text)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data Pretendida para Contratação *
            </label>
            <input 
              type="date" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue transition-colors"
              value={getFieldValue('dfd.dataPretendida') || '2024-08-15'}
              onChange={(e) => updateField('dfd.dataPretendida', e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grau de Prioridade *
            </label>
            <div className="space-y-2">
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    className="form-radio text-lumen-blue focus:ring-lumen-blue" 
                    name="prioridade_dfd" 
                    value="baixa"
                    checked={getFieldValue('dfd.grauPrioridade') === 'baixa'}
                    onChange={(e) => updateField('dfd.grauPrioridade', e.target.value)}
                  />
                  <span className="ml-2 text-sm">Baixa</span>
                </label>
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    className="form-radio text-lumen-blue focus:ring-lumen-blue" 
                    name="prioridade_dfd" 
                    value="media"
                    checked={getFieldValue('dfd.grauPrioridade') === 'media' || (!getFieldValue('dfd.grauPrioridade'))}
                    onChange={(e) => updateField('dfd.grauPrioridade', e.target.value)}
                  />
                  <span className="ml-2 text-sm">Média</span>
                </label>
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    className="form-radio text-lumen-blue focus:ring-lumen-blue" 
                    name="prioridade_dfd" 
                    value="alta"
                    checked={getFieldValue('dfd.grauPrioridade') === 'alta'}
                    onChange={(e) => updateField('dfd.grauPrioridade', e.target.value)}
                  />
                  <span className="ml-2 text-sm">Alta</span>
                </label>
              </div>
              
              {getFieldValue('dfd.grauPrioridade') === 'alta' && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Justificativa da Prioridade Alta *
                  </label>
                  <SugestoesIAComponent
                    field="justificativa_prioridade"
                    value={getFieldValue('dfd.justificativaPrioridade') || 'A modernização do parque tecnológico é urgente devido ao início do ano letivo e necessidade de implementar metodologias digitais de ensino conforme diretrizes pedagógicas atualizadas.'}
                    onChange={(value) => updateField('dfd.justificativaPrioridade', value)}
                    context={context}
                    fieldType="textarea"
                    rows={3}
                    placeholder="Justifique por que esta demanda tem prioridade alta"
                    onSelectSuggestion={(text) => updateField('dfd.justificativaPrioridade', text)}
                  />
                  <div className="mt-1 flex items-center text-sm text-yellow-600">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    <span>Justificativa obrigatória para prioridade alta</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </StandardCard>
  );
}
