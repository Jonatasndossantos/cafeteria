import { Calendar } from "lucide-react";
import { SugestoesIAComponent } from "./SugestoesIAComponent";
import { useFormData } from "@/hooks/useFormData";
import { StandardCard } from "@/Components/ui/standard-card";

export const PlanejamentoBloco = () => {
  const { formData, updateField, getFieldValue } = useFormData();

  return (
    <StandardCard 
      title="Planejamento"
      icon={Calendar}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vinculação ao PCA ou Justificativa para não previstos
          </label>
          <SugestoesIAComponent
            field="cronograma_execucao"
            value={getFieldValue('dfd.cronogramaExecucao') || ''}
            onChange={(value: string) => updateField('dfd.cronogramaExecucao', value)}
            context={formData}
            fieldType="textarea"
            rows={4}
            placeholder="Descreva a vinculação ao PCA ou justificativa para não previstos..."
            onSelectSuggestion={(text: string) => updateField('dfd.cronogramaExecucao', text)}
          />
        </div>
      </div>
    </StandardCard>
  );
}; 