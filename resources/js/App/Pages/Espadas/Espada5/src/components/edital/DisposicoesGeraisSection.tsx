import React from 'react';
import { FileText } from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import SectionCard from './SectionCard';
import { InfoAlert } from './shared/AlertComponents';
import MunicipalToggle from './shared/MunicipalToggle';

interface DisposicoesGeraisSectionProps {
  data: any;
  updateField: (section: string, field: string, value: any) => void;
}

const DisposicoesGeraisSection: React.FC<DisposicoesGeraisSectionProps> = ({ data, updateField }) => (
  <SectionCard number="16" title="Disposições Gerais" icon={FileText}>
    <div>
      <Label className="text-sm font-medium text-gray-700">Regras de Anulação e Revogação</Label>
      <Textarea 
        value={data.disposicoesGerais.regrasAnulacaoRevogacao}
        onChange={(e) => updateField('disposicoesGerais', 'regrasAnulacaoRevogacao', e.target.value)}
        rows={3}
        className="mt-1"
      />
      <InfoAlert>Conforme Art. 176 da Lei 14.133/21.</InfoAlert>
    </div>

    <div>
      <Label className="text-sm font-medium text-gray-700">Casos Omissos</Label>
      <Textarea 
        value={data.disposicoesGerais.casosOmissos}
        onChange={(e) => updateField('disposicoesGerais', 'casosOmissos', e.target.value)}
        rows={2}
        className="mt-1"
      />
      <InfoAlert>Resolução com base na legislação vigente.</InfoAlert>
    </div>

    <div>
      <MunicipalToggle 
        title="🏛️ Disposições Específicas (Municipal)"
        value={data.disposicoesGerais.disposicoesEspecificas}
        onChange={(value) => updateField('disposicoesGerais', 'disposicoesEspecificas', value)}
        placeholder="Inserir aqui disposições específicas locais conforme regulamentação municipal."
      />
    </div>
  </SectionCard>
);

export default DisposicoesGeraisSection;
