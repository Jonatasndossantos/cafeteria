import { FileText } from "lucide-react";
import { SugestoesIAComponent } from "../dfd/SugestoesIAComponent";
import { usePlanejamento } from '@/hooks/Espada1/usePlanejamento';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { StandardCard } from '@/Components/ui/standard-card';

export function DetalhamentoBloco() {
  const { data: planejamento, updateField } = usePlanejamento();

  const context = {
    documentType: 'planejamento',
    unidade: planejamento?.objeto?.tipoObjeto || ''
  };

  return (
    <StandardCard 
      title="Detalhamento"
      icon={FileText}
      className="mb-6"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Justificativa Técnica *
          </label>
          <SugestoesIAComponent
            field="justificativa_tecnica"
            value={planejamento?.detalhamento?.justificativaTecnica || ''}
            onChange={(value) => updateField('detalhamento.justificativaTecnica', value)}
            context={context}
            fieldType="textarea"
            rows={4}
            placeholder="Descreva a justificativa técnica..."
            onSelectSuggestion={(text) => updateField('detalhamento.justificativaTecnica', text)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Benefícios Esperados *
          </label>
          <SugestoesIAComponent
            field="beneficios_esperados"
            value={planejamento?.detalhamento?.beneficiosEsperados || ''}
            onChange={(value) => updateField('detalhamento.beneficiosEsperados', value)}
            context={context}
            fieldType="textarea"
            rows={3}
            placeholder="Descreva os benefícios esperados..."
            onSelectSuggestion={(text) => updateField('detalhamento.beneficiosEsperados', text)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Riscos Identificados
          </label>
          <SugestoesIAComponent
            field="riscos_identificados"
            value={planejamento?.detalhamento?.riscosIdentificados || ''}
            onChange={(value) => updateField('detalhamento.riscosIdentificados', value)}
            context={context}
            fieldType="textarea"
            rows={4}
            placeholder="Identifique os principais riscos..."
            onSelectSuggestion={(text) => updateField('detalhamento.riscosIdentificados', text)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alternativas Analisadas
          </label>
          <SugestoesIAComponent
            field="alternativas_analisadas"
            value={planejamento?.detalhamento?.alternativasAnalisadas || ''}
            onChange={(value) => updateField('detalhamento.alternativasAnalisadas', value)}
            context={context}
            rows={4}
            fieldType="textarea"
            placeholder="Descreva as alternativas consideradas..."
            onSelectSuggestion={(text) => updateField('detalhamento.alternativasAnalisadas', text)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mês Estimado
            </label>
            <Select
              value={planejamento?.detalhamento?.mesEstimado || ''}
              onValueChange={(value) => updateField('detalhamento.mesEstimado', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o mês" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="janeiro">Janeiro</SelectItem>
                <SelectItem value="fevereiro">Fevereiro</SelectItem>
                <SelectItem value="marco">Março</SelectItem>
                <SelectItem value="abril">Abril</SelectItem>
                <SelectItem value="maio">Maio</SelectItem>
                <SelectItem value="junho">Junho</SelectItem>
                <SelectItem value="julho">Julho</SelectItem>
                <SelectItem value="agosto">Agosto</SelectItem>
                <SelectItem value="setembro">Setembro</SelectItem>
                <SelectItem value="outubro">Outubro</SelectItem>
                <SelectItem value="novembro">Novembro</SelectItem>
                <SelectItem value="dezembro">Dezembro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grau de Importância
            </label>
            <Select
              value={planejamento?.detalhamento?.grauImportancia || ''}
              onValueChange={(value) => updateField('detalhamento.grauImportancia', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o grau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="baixa">Baixa</SelectItem>
                <SelectItem value="media">Média</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="critica">Crítica</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </StandardCard>
  );
}
