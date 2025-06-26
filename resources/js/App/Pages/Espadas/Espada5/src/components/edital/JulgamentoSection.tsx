import React from 'react';
import { Scale, Gavel } from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import SectionCard from './SectionCard';
import { InfoAlert } from './shared/AlertComponents';
import MunicipalToggle from './shared/MunicipalToggle';

interface JulgamentoSectionProps {
  data: any;
  updateField: (section: string, field: string, value: any) => void;
}

const JulgamentoSection: React.FC<JulgamentoSectionProps> = ({ data, updateField }) => (
  <SectionCard number="9" title="Julgamento" icon={Scale}>
    <div>
      <Label className="text-sm font-medium text-gray-700">Critérios Objetivos</Label>
      <Textarea 
        value={data.julgamento.criteriosObjetivos}
        onChange={(e) => updateField('julgamento', 'criteriosObjetivos', e.target.value)}
        rows={3}
        className="mt-1"
      />
      <InfoAlert>Critério de menor preço conforme Lei 14.133/21.</InfoAlert>
    </div>

    <div>
      <Label className="text-sm font-medium text-gray-700">Fatores de Ponderação</Label>
      <Textarea 
        value={data.julgamento.fatoresPonderacao}
        onChange={(e) => updateField('julgamento', 'fatoresPonderacao', e.target.value)}
        rows={2}
        className="mt-1"
      />
      <InfoAlert>Aplicável apenas para outros critérios que não menor preço.</InfoAlert>
    </div>

    <div>
      <MunicipalToggle
        title="🏛️ Critérios Adicionais (Municipal)"
        value={data.julgamento.criteriosAdicionais}
        onChange={(value) => updateField('julgamento', 'criteriosAdicionais', value)}
        placeholder="Inserir aqui critérios adicionais específicos do município conforme regulamentação local."
      />
    </div>
  </SectionCard>
);

export default JulgamentoSection;
