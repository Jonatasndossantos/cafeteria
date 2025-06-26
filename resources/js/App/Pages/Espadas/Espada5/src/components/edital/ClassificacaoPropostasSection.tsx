import React from 'react';
import { Filter } from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import SectionCard from './SectionCard';
import { InfoAlert } from './shared/AlertComponents';
import MunicipalToggle from './shared/MunicipalToggle';

interface ClassificacaoPropostasSectionProps {
  data: any;
  updateField: (section: string, field: string, value: any) => void;
}

const ClassificacaoPropostasSection: React.FC<ClassificacaoPropostasSectionProps> = ({ data, updateField }) => (
  <SectionCard number="7" title="Classificação das Propostas" icon={Filter}>
    <div>
      <Label className="text-sm font-medium text-gray-700">Critérios de Classificação</Label>
      <Textarea 
        value={data.classificacaoPropostas.criteriosClassificacao}
        onChange={(e) => updateField('classificacaoPropostas', 'criteriosClassificacao', e.target.value)}
        rows={3}
        className="mt-1"
      />
      <InfoAlert>Critérios padrão AGU/TCU aplicados.</InfoAlert>
    </div>

    <div>
      <Label className="text-sm font-medium text-gray-700">Critérios de Desempate</Label>
      <Textarea 
        value={data.classificacaoPropostas.criteriosDesempate}
        onChange={(e) => updateField('classificacaoPropostas', 'criteriosDesempate', e.target.value)}
        rows={3}
        className="mt-1"
      />
      <InfoAlert>Conforme Art. 60 da Lei 14.133/21.</InfoAlert>
    </div>

    <div>
      <MunicipalToggle
        title="🏛️ Critérios Adicionais (Municipal)"
        value={data.classificacaoPropostas.criteriosAdicionais}
        onChange={(value) => updateField('classificacaoPropostas', 'criteriosAdicionais', value)}
        placeholder="Inserir aqui critérios adicionais específicos do município conforme regulamentação local."
      />
    </div>
  </SectionCard>
);

export default ClassificacaoPropostasSection;
