import { FileText, Edit } from "lucide-react";
import { SugestoesIAComponent } from "../dfd/SugestoesIAComponent";
import { useState } from "react";
import { useFormData } from "@/hooks/useFormData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { StandardCard } from '@/Components/ui/standard-card';

export function CompartilhamentoBloco() {
  const { formData, updateField, getFieldValue } = useFormData();
  const [isEditing, setIsEditing] = useState(false);

  const context = {
    documentType: 'planejamento',
    unidade: getFieldValue('planejamento.unidade')
  };

  return (
    <StandardCard 
      title="Compartilhamento"
      icon={FileText}
      className="mb-6"
    >
      <div className="flex items-center justify-end mb-4">
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
            Unidades Compartilhadas *
          </label>
          <Select
            value={getFieldValue('planejamento.unidadesCompartilhadas')}
            onValueChange={(value) => updateField('planejamento.unidadesCompartilhadas', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione as unidades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="secretaria_educacao">Secretaria de Educação</SelectItem>
              <SelectItem value="secretaria_saude">Secretaria de Saúde</SelectItem>
              <SelectItem value="secretaria_seguranca">Secretaria de Segurança</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Justificativa do Compartilhamento *
          </label>
          <SugestoesIAComponent
            field="justificativa_compartilhamento"
            value={getFieldValue('planejamento.justificativaCompartilhamento') || ''}
            onChange={(value) => updateField('planejamento.justificativaCompartilhamento', value)}
            context={context}
            fieldType="textarea"
            rows={4}
            placeholder="Justifique a necessidade do compartilhamento..."
            readOnly={!isEditing}
            onSelectSuggestion={(text) => updateField('planejamento.justificativaCompartilhamento', text)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantidade por Unidade *
          </label>
          <SugestoesIAComponent
            field="quantidade_unidade"
            value={getFieldValue('planejamento.quantidadePorUnidade') || ''}
            onChange={(value) => updateField('planejamento.quantidadePorUnidade', value)}
            context={context}
            fieldType="input"
            placeholder="Informe a quantidade por unidade..."
            readOnly={!isEditing}
            onSelectSuggestion={(text) => updateField('planejamento.quantidadePorUnidade', text)}
          />
        </div>
      </div>
    </StandardCard>
  );
}
