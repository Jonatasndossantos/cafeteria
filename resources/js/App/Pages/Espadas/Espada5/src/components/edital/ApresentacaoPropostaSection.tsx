import React from 'react';
import { FileText } from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import SectionCard from './SectionCard';
import { InfoAlert } from './shared/AlertComponents';
import MunicipalToggle from './shared/MunicipalToggle';

interface ApresentacaoPropostaSectionProps {
  data: any;
  updateField: (section: string, field: string, value: any) => void;
}

const ApresentacaoPropostaSection: React.FC<ApresentacaoPropostaSectionProps> = ({ data, updateField }) => (
  <SectionCard number="6" title="Apresentação da Proposta" icon={FileText}>
    <div>
      <Label className="text-sm font-medium text-gray-700">Forma de Apresentação</Label>
      <Textarea 
        value={data.apresentacaoProposta.formaApresentacao}
        onChange={(e) => updateField('apresentacaoProposta', 'formaApresentacao', e.target.value)}
        rows={2}
        className="mt-1"
      />
      <InfoAlert>Modalidade eletrônica padrão AGU/TCU.</InfoAlert>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="text-sm font-medium text-gray-700">Prazo de Validade</Label>
        <Input 
          value={data.apresentacaoProposta.prazoValidade}
          onChange={(e) => updateField('apresentacaoProposta', 'prazoValidade', e.target.value)}
          className="mt-1"
        />
        <InfoAlert>Prazo mínimo conforme legislação.</InfoAlert>
      </div>
      <div>
        <Label className="text-sm font-medium text-gray-700">Conteúdo Mínimo</Label>
        <Textarea 
          value={data.apresentacaoProposta.conteudoMinimo}
          onChange={(e) => updateField('apresentacaoProposta', 'conteudoMinimo', e.target.value)}
          rows={3}
          className="mt-1"
        />
      </div>
    </div>

    <div>
      <MunicipalToggle
        title="🏛️ Formato Específico (Municipal)"
        value={data.apresentacaoProposta.formatoEspecifico}
        onChange={(value) => updateField('apresentacaoProposta', 'formatoEspecifico', value)}
        placeholder="Inserir aqui formato específico de proposta conforme modelo municipal padrão."
      />
    </div>

    <div>
      <Label className="text-sm font-medium text-gray-700">Declaração de Exequibilidade (Art. 59, Lei 14.133/21)</Label>
      <Textarea 
        value={data.apresentacaoProposta.declaracaoExequibilidade}
        onChange={(e) => updateField('apresentacaoProposta', 'declaracaoExequibilidade', e.target.value)}
        rows={3}
        className="mt-1"
        placeholder="Declaração obrigatória de que o objeto é exequível e que o licitante possui capacidade técnica e econômica para executá-lo..."
      />
      <InfoAlert>Declaração obrigatória conforme Art. 59 da Lei 14.133/21 - exequibilidade do objeto.</InfoAlert>
    </div>
  </SectionCard>
);

export default ApresentacaoPropostaSection;
