import { FileText, Edit } from "lucide-react";
import { SugestoesIAComponent } from "./SugestoesIAComponent";
import { useState } from "react";
import { useFormData } from "@/hooks/useFormData";
import { StandardCard } from "@/Components/ui/standard-card";

export function ObjetoJustificativaBloco() {
  const { formData, updateField, getFieldValue } = useFormData();
  const [isEditing, setIsEditing] = useState(false);

  const context = {
    documentType: 'dfd',
    unidade: getFieldValue('dfd.unidade')
  };

  return (
    <StandardCard 
      title="Objeto e Justificativa"
      icon={FileText}
    >
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center text-sm text-lumen-blue hover:text-lumen-gold transition-colors"
        >
          <Edit className="w-4 h-4 mr-1" />
          {isEditing ? 'Cancelar Edição' : 'Editar'}
        </button>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Objeto da Contratação *
          </label>
          <SugestoesIAComponent
            field="objeto_contratacao"
            value={getFieldValue('dfd.objeto') || ''}
            onChange={(value) => updateField('dfd.objeto', value)}
            context={context}
            fieldType="textarea"
            rows={4}
            placeholder="Descreva o objeto da contratação..."
            readOnly={!isEditing}
            onSelectSuggestion={(text) => updateField('dfd.objeto', text)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Justificativa da Contratação *
          </label>
          <SugestoesIAComponent
            field="justificativa_contratacao"
            value={getFieldValue('dfd.justificativa_contratacao') || ''}
            onChange={(value) => updateField('dfd.justificativa_contratacao', value)}
            context={context}
            fieldType="textarea"
            rows={4}
            placeholder="Justifique a necessidade da contratação..."
            readOnly={!isEditing}
            onSelectSuggestion={(text) => updateField('dfd.justificativa_contratacao', text)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Benefícios Esperados *
          </label>
          <SugestoesIAComponent
            field="beneficios_esperados"
            value={getFieldValue('dfd.beneficios') || ''}
            onChange={(value) => updateField('dfd.beneficios', value)}
            context={context}
            fieldType="textarea"
            rows={4}
            placeholder="Descreva os benefícios esperados..."
            readOnly={!isEditing}
            onSelectSuggestion={(text) => updateField('dfd.beneficios', text)}
          />
        </div>
      </div>
    </StandardCard>
  );
}
