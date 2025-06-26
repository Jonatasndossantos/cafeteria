import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import SectionCard from './SectionCard';
import { InfoAlert } from './shared/AlertComponents';
import MunicipalToggle from './shared/MunicipalToggle';

interface AdjudicacaoHomologacaoSectionProps {
  data: any;
  updateField: (section: string, field: string, value: any) => void;
}

const AdjudicacaoHomologacaoSection: React.FC<AdjudicacaoHomologacaoSectionProps> = ({ data, updateField }) => (
  <SectionCard number="12" title="Adjudicação e Homologação" icon={CheckCircle}>
    <div>
      <Label className="text-sm font-medium text-gray-700">Critérios de Adjudicação</Label>
      <Textarea 
        value={data.adjudicacaoHomologacao.criteriosAdjudicacao}
        onChange={(e) => updateField('adjudicacaoHomologacao', 'criteriosAdjudicacao', e.target.value)}
        rows={3}
        className="mt-1"
      />
      <InfoAlert>Procedimento padrão AGU/TCU aplicado.</InfoAlert>
    </div>

    <div>
      <Label className="text-sm font-medium text-gray-700">Procedimentos de Homologação</Label>
      <Textarea 
        value={data.adjudicacaoHomologacao.procedimentosHomologacao}
        onChange={(e) => updateField('adjudicacaoHomologacao', 'procedimentosHomologacao', e.target.value)}
        rows={3}
        className="mt-1"
      />
      <InfoAlert>Conforme Art. 172 da Lei 14.133/21.</InfoAlert>
    </div>

    <div>
      <MunicipalToggle
        title="🏛️ Procedimentos Específicos (Municipal)"
        value={data.adjudicacaoHomologacao.procedimentosEspecificos}
        onChange={(value) => updateField('adjudicacaoHomologacao', 'procedimentosEspecificos', value)}
        placeholder="Inserir aqui procedimentos específicos do município para adjudicação e homologação conforme regulamentação local."
      />
    </div>

    <div>
      <Label className="text-sm font-medium text-gray-700">Previsão de Homologação Parcial</Label>
      <Textarea 
        value={data.adjudicacaoHomologacao.homologacaoParcial}
        onChange={(e) => updateField('adjudicacaoHomologacao', 'homologacaoParcial', e.target.value)}
        rows={3}
        className="mt-1"
        placeholder="Previsão de homologação parcial, se aplicável, conforme Art. 172 da Lei 14.133/21..."
      />
      <InfoAlert>Previsão de homologação parcial conforme Art. 172 da Lei 14.133/21.</InfoAlert>
    </div>
  </SectionCard>
);

export default AdjudicacaoHomologacaoSection;
