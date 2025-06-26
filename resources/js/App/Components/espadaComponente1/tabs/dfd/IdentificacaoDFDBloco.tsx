import { FileText, Edit, ClipboardList } from "lucide-react";
import { SugestoesIAComponent } from "./SugestoesIAComponent";
import { useState } from "react";
import { useFormData } from "@/hooks/useFormData";
import { StandardCard } from "@/Components/ui/standard-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

export function IdentificacaoDFDBloco() {
  const { formData, updateField, getFieldValue } = useFormData();
  const [isEditing, setIsEditing] = useState(false);

  const context = {
    documentType: 'dfd',
    unidade: getFieldValue('dfd.unidade')
  };

  return (
    <>
      <StandardCard 
        title="Identificação da necessidade"
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
              Unidade Solicitante *
            </label>
            <Select
              value={getFieldValue('dfd.unidade')}
              onValueChange={(value) => updateField('dfd.unidade', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione a unidade" />
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
              Tipo de Demanda *
            </label>
            <Select
              value={getFieldValue('dfd.tipo')}
              onValueChange={(value) => updateField('dfd.tipo', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="material">Material</SelectItem>
                <SelectItem value="servico">Serviço</SelectItem>
                <SelectItem value="obras">Obras</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Justificativa da contratação *
            </label>
            <SugestoesIAComponent
              field="descricao_demanda"
              value={getFieldValue('dfd.descricao') || ''}
              onChange={(value) => updateField('dfd.descricao', value)}
              context={context}
              fieldType="textarea"
              rows={4}
              placeholder="Descreva a demanda..."
              readOnly={!isEditing}
              onSelectSuggestion={(text) => updateField('dfd.descricao', text)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Demonstração do interesse público *
            </label>
            <SugestoesIAComponent
              field="justificativa_demanda"
              value={getFieldValue('dfd.justificativa') || ''}
              onChange={(value) => updateField('dfd.justificativa', value)}
              context={context}
              fieldType="textarea"
              rows={4}
              placeholder="Justifique a necessidade da demanda..."
              readOnly={!isEditing}
              onSelectSuggestion={(text) => updateField('dfd.justificativa', text)}
            />
          </div>
        </div>
      </StandardCard>

      <StandardCard 
        title="Descrição do objeto"
        icon={ClipboardList}
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
              Descrição detalhada do objeto *
            </label>
            <SugestoesIAComponent
              field="descricao_objeto"
              value={getFieldValue('dfd.descricaoObjeto') || ''}
              onChange={(value) => updateField('dfd.descricaoObjeto', value)}
              context={context}
              fieldType="textarea"
              rows={4}
              placeholder="Descreva detalhadamente o objeto da contratação..."
              readOnly={!isEditing}
              onSelectSuggestion={(text) => updateField('dfd.descricaoObjeto', text)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Especificações técnicas *
            </label>
            <SugestoesIAComponent
              field="especificacoes_tecnicas"
              value={getFieldValue('dfd.especificacoesTecnicas') || ''}
              onChange={(value) => updateField('dfd.especificacoesTecnicas', value)}
              context={context}
              fieldType="textarea"
              rows={4}
              placeholder="Descreva as especificações técnicas necessárias..."
              readOnly={!isEditing}
              onSelectSuggestion={(text) => updateField('dfd.especificacoesTecnicas', text)}
            />
          </div>
        </div>
      </StandardCard>
    </>
  );
}
