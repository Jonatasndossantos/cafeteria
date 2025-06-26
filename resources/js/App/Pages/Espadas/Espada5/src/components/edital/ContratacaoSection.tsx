import React from 'react';
import { FileCheck } from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Input } from '@/Components/ui/input';
import SectionCard from './SectionCard';
import { InfoAlert } from './shared/AlertComponents';
import MunicipalToggle from './shared/MunicipalToggle';

interface ContratacaoSectionProps {
  data: any;
  updateField: (section: string, field: string, value: any) => void;
}

const ContratacaoSection: React.FC<ContratacaoSectionProps> = ({ data, updateField }) => (
  <SectionCard number="14" title="Contratação" icon={FileCheck}>
    <div>
      <Label className="text-sm font-medium text-gray-700">Prazo para Assinatura</Label>
      <Input 
        value={data.contratacao.prazoAssinatura}
        onChange={(e) => updateField('contratacao', 'prazoAssinatura', e.target.value)}
        className="mt-1"
      />
      <InfoAlert>Prazo mínimo AGU/TCU aplicado.</InfoAlert>
    </div>

    <div>
      <Label className="text-sm font-medium text-gray-700">Condições para Assinatura</Label>
      <Textarea 
        value={data.contratacao.condicoesAssinatura}
        onChange={(e) => updateField('contratacao', 'condicoesAssinatura', e.target.value)}
        rows={3}
        className="mt-1"
      />
      <InfoAlert>Condições padrão conforme legislação.</InfoAlert>
    </div>

    <div>
      <MunicipalToggle
        title="🏛️ Procedimentos Específicos (Municipal)"
        value={data.contratacao.procedimentosEspecificos}
        onChange={(value) => updateField('contratacao', 'procedimentosEspecificos', value)}
        placeholder="Inserir aqui procedimentos específicos do município para contratação conforme regulamentação local."
      />
    </div>
  </SectionCard>
);

export default ContratacaoSection;
