import { FileText } from "lucide-react";
import { SugestoesIAComponent } from "../dfd/SugestoesIAComponent";
import { usePlanejamento } from '@/hooks/Espada1/usePlanejamento';
import { useGestaoItens } from '@/hooks/Espada1/useGestaoItens';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { StandardCard } from '@/Components/ui/standard-card';

export function ObjetoContratacaoBloco() {
  const { data: planejamento, updateField } = usePlanejamento();
  const { tipoContratacao, setTipoContratacao } = useGestaoItens('itens');

  const context = {
    documentType: 'planejamento',
    unidade: planejamento?.objeto?.tipoObjeto || ''
  };

  const handleTipoContratacaoChange = (value: string) => {
    setTipoContratacao(value as 'itens' | 'obras');
    updateField('objeto.tipoObjeto', value);
  };

  const handleObjetoContratacaoChange = (value: string) => {
    updateField('objeto.objetoContratacao', value);
  };

  return (
    <StandardCard
      title="Objeto da Contratação"
      icon={FileText}
      className="mb-6"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição e objetivo *
          </label>
          <SugestoesIAComponent
            field="objeto_contratacao"
            value={planejamento?.objeto?.objetoContratacao || ''}
            onChange={handleObjetoContratacaoChange}
            context={context}
            fieldType="textarea"
            rows={4}
            placeholder="Descreva o objeto da contratação..."
            onSelectSuggestion={(text) => {
              updateField('objeto.objetoContratacao', text);
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Contratação *
          </label>
          <Select
            value={planejamento?.objeto?.tipoObjeto || ''}
            onValueChange={handleTipoContratacaoChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="itens">Itens</SelectItem>
              <SelectItem value="obras">Obras</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </StandardCard>
  );
}
