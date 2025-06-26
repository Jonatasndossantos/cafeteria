import { Send, User, AlertCircle, FileText, Edit } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { useFormData } from "@/hooks/useFormData";
import { SugestoesIAComponent } from "./SugestoesIAComponent";
import { useState } from "react";
import { StandardCard } from "@/Components/ui/standard-card";

const secretarias = [
  { id: 1, nome: "Secretaria de Educação" },
  { id: 2, nome: "Secretaria de Saúde" },
  { id: 3, nome: "Secretaria de Administração" },
  { id: 4, nome: "Secretaria de Finanças" },
  { id: 5, nome: "Secretaria de Planejamento" },
  { id: 6, nome: "Secretaria de Infraestrutura" },
  { id: 7, nome: "Secretaria de Desenvolvimento Social" },
  { id: 8, nome: "Secretaria de Meio Ambiente" },
  { id: 9, nome: "Secretaria de Cultura" },
  { id: 10, nome: "Secretaria de Esportes" }
];

export const EncaminhamentoBloco = () => {
  const { formData, updateField, getFieldValue } = useFormData();
  const [selectedSecretarias, setSelectedSecretarias] = useState<number[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const context = {
    documentType: 'dfd',
    unidade: getFieldValue('dfd.unidade')
  };

  const handleSecretariaChange = (secretariaId: number) => {
    setSelectedSecretarias(prev => {
      const newSelection = prev.includes(secretariaId)
        ? prev.filter(id => id !== secretariaId)
        : [...prev, secretariaId];
      
      // Atualiza o valor no formData
      updateField('dfd.encaminharPara', newSelection);
      return newSelection;
    });
  };

  return (
    <StandardCard 
      title="Encaminhamento"
      icon={Send}
    >
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-sm mb-3 text-lumen-blue flex items-center">
            <User className="w-4 h-4 mr-2" />
            Responsável pela Aprovação
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo *
              </label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue transition-colors"
                placeholder="Nome do responsável"
                value={getFieldValue('dfd.responsavelAprovacao')}
                onChange={(e) => updateField('dfd.responsavelAprovacao', e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cargo/Função *
              </label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue transition-colors"
                placeholder="Cargo ou função"
                value={getFieldValue('dfd.cargoResponsavel')}
                onChange={(e) => updateField('dfd.cargoResponsavel', e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Matrícula *
              </label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue transition-colors"
                placeholder="Número da matrícula"
                value={getFieldValue('dfd.matriculaResponsavel')}
                onChange={(e) => updateField('dfd.matriculaResponsavel', e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-sm mb-3 text-lumen-blue flex items-center">
            <Send className="w-4 h-4 mr-2" />
            Encaminhamento
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Encaminhar para *
              </label>
              <div className="border rounded-md p-4 max-h-60 overflow-y-auto">
                {secretarias.map((secretaria) => (
                  <div key={secretaria.id} className="flex items-center mb-2 last:mb-0">
                    <input
                      type="checkbox"
                      id={`secretaria-${secretaria.id}`}
                      checked={selectedSecretarias.includes(secretaria.id)}
                      onChange={() => handleSecretariaChange(secretaria.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`secretaria-${secretaria.id}`}
                      className="ml-2 block text-sm text-gray-700"
                    >
                      {secretaria.nome}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Observações para Encaminhamento
          </label>
          <textarea 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue transition-colors"
            value={getFieldValue('dfd.observacoesEncaminhamento')}
            onChange={(e) => updateField('dfd.observacoesEncaminhamento', e.target.value)}
            rows={3}
            placeholder="Observações adicionais para o destinatário"
          />
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h4 className="font-medium text-sm text-blue-800 mb-2">Assinatura Digital</h4>
          <p className="text-sm text-blue-700 mb-3">
            Ao finalizar o DFD, será solicitada sua assinatura digital para validação do documento.
          </p>
          <SugestoesIAComponent
            field="assinatura_digital"
            value={getFieldValue('dfd.assinaturaDigital') || ''}
            onChange={(value: string) => updateField('dfd.assinaturaDigital', value)}
            context={formData}
            fieldType="textarea"
            rows={4}
            placeholder="Digite sua assinatura digital..."
            onSelectSuggestion={(text: string) => updateField('dfd.assinaturaDigital', text)}
          />
        </div>
      </div>
    </StandardCard>
  );
};
