import React from 'react';
import { Users } from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import SectionCard from './SectionCard';
import { InfoAlert } from './shared/AlertComponents';
import MunicipalToggle from './shared/MunicipalToggle';

interface CredenciamentoSectionProps {
  data: any;
  updateField: (section: string, field: string, value: any) => void;
}

const CredenciamentoSection: React.FC<CredenciamentoSectionProps> = ({ data, updateField }) => (
  <SectionCard number="5" title="Credenciamento" icon={Users}>
    <div>
      <Label className="text-sm font-medium text-gray-700">Procedimentos de Credenciamento</Label>
      <Textarea 
        value={data.credenciamento.procedimentosCredenciamento}
        onChange={(e) => updateField('credenciamento', 'procedimentosCredenciamento', e.target.value)}
        rows={3}
        className="mt-1"
      />
      <InfoAlert>Procedimentos padrão AGU/TCU aplicados.</InfoAlert>
    </div>

    <div>
      <Label className="text-sm font-medium text-gray-700">Documentos Necessários</Label>
      <Textarea 
        value={data.credenciamento.documentosNecessarios}
        onChange={(e) => updateField('credenciamento', 'documentosNecessarios', e.target.value)}
        rows={3}
        className="mt-1"
      />
      <InfoAlert>Lista mínima conforme legislação federal.</InfoAlert>
    </div>

    <div>
      <MunicipalToggle
        title="🏛️ Procedimentos Específicos (Municipal)"
        value={data.credenciamento.procedimentosEspecificos}
        onChange={(value) => updateField('credenciamento', 'procedimentosEspecificos', value)}
        placeholder="Inserir aqui procedimentos específicos do município para credenciamento conforme regulamentação local."
      />
    </div>
  </SectionCard>
);

export default CredenciamentoSection;
