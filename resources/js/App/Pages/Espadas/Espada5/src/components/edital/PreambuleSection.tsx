import React from 'react';
import { FileText } from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import SectionCard from './SectionCard';
import { InfoAlert } from './shared/AlertComponents';
import MunicipalToggle from './shared/MunicipalToggle';

interface PreambuleSectionProps {
  data: any;
  updateField: (section: string, field: string, value: any) => void;
}

const PreambuleSection: React.FC<PreambuleSectionProps> = ({ data, updateField }) => (
  <SectionCard number="1" title="Preâmbulo" icon={FileText}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="text-sm font-medium text-gray-700">Número de Ordem em Série Anual</Label>
        <Input 
          value={data.preambulo.numeroOrdem}
          onChange={(e) => updateField('preambulo', 'numeroOrdem', e.target.value)}
          className="mt-1"
          placeholder="Ex: 042/2025"
        />
        <InfoAlert>Formato padrão AGU/TCU aplicado automaticamente.</InfoAlert>
      </div>
      <div>
        <Label className="text-sm font-medium text-gray-700">Nome do Órgão/Entidade</Label>
        <Input 
          value={data.preambulo.nomeOrgao}
          onChange={(e) => updateField('preambulo', 'nomeOrgao', e.target.value)}
          className="mt-1"
        />
        <InfoAlert>Pré-preenchido com dados da prefeitura.</InfoAlert>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Label className="text-sm font-medium text-gray-700">Modalidade de Licitação</Label>
        <Select value={data.preambulo.modalidadeLicitacao} onValueChange={(value) => updateField('preambulo', 'modalidadeLicitacao', value)}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pregão Eletrônico">Pregão Eletrônico</SelectItem>
            <SelectItem value="Concorrência">Concorrência</SelectItem>
            <SelectItem value="Tomada de Preços">Tomada de Preços</SelectItem>
            <SelectItem value="Convite">Convite</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-sm font-medium text-gray-700">Regime de Execução</Label>
        <Select value={data.preambulo.regimeExecucao} onValueChange={(value) => updateField('preambulo', 'regimeExecucao', value)}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Empreitada por Preço Global">Empreitada por Preço Global</SelectItem>
            <SelectItem value="Empreitada por Preço Unitário">Empreitada por Preço Unitário</SelectItem>
            <SelectItem value="Empreitada Integral">Empreitada Integral</SelectItem>
            <SelectItem value="Tarefa">Tarefa</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-sm font-medium text-gray-700">Tipo de Julgamento</Label>
        <Select value={data.preambulo.tipoJulgamento} onValueChange={(value) => updateField('preambulo', 'tipoJulgamento', value)}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Menor Preço">Menor Preço</SelectItem>
            <SelectItem value="Melhor Técnica">Melhor Técnica</SelectItem>
            <SelectItem value="Técnica e Preço">Técnica e Preço</SelectItem>
            <SelectItem value="Maior Lance">Maior Lance</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <div>
      <Label className="text-sm font-medium text-gray-700">Formato do Preâmbulo (Texto Padrão AGU/TCU)</Label>
      <Textarea 
        value={data.preambulo.formatoPreambulo}
        onChange={(e) => updateField('preambulo', 'formatoPreambulo', e.target.value)}
        rows={4}
        className="mt-1"
      />
      <InfoAlert>Texto base conforme modelos AGU/TCU.</InfoAlert>
    </div>

    <div>
      <Label className="text-sm font-medium text-gray-700">• Termo de Referência pré-preenchido automaticamente (IA-LUX)</Label>
      <Textarea 
        value={data.preambulo.termoReferencia}
        onChange={(e) => updateField('preambulo', 'termoReferencia', e.target.value)}
        rows={4}
        className="mt-1"
        placeholder="Termo de Referência pré-preenchido automaticamente pela IA-LUX..."
      />
      <InfoAlert>Termo de Referência pré-preenchido automaticamente pela IA-LUX.</InfoAlert>
    </div>

    <div>
      <MunicipalToggle 
        title="🏛️ Regulamentável pelo Município"
        value={data.preambulo.regulamentacaoMunicipal}
        onChange={(value) => updateField('preambulo', 'regulamentacaoMunicipal', value)}
        placeholder="Inserir aqui regulamentações específicas do município conforme Decreto Municipal nº [NÚMERO] e demais normas locais aplicáveis."
      />
    </div>
  </SectionCard>
);

export default PreambuleSection;
