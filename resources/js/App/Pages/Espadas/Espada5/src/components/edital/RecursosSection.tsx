import React from 'react';
import { MessageSquare, AlertTriangle } from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import SectionCard from './SectionCard';
import { InfoAlert } from './shared/AlertComponents';
import MunicipalToggle from './shared/MunicipalToggle';

interface RecursosSectionProps {
  data: any;
  updateField: (section: string, field: string, value: any) => void;
}

const RecursosSection: React.FC<RecursosSectionProps> = ({ data, updateField }) => (
  <SectionCard number="11" title="Recursos" icon={MessageSquare}>
    <div>
      <Label className="text-sm font-medium text-gray-700">Prazos para Recursos</Label>
      <Textarea 
        value={data.recursos.prazosRecursos}
        onChange={(e) => updateField('recursos', 'prazosRecursos', e.target.value)}
        rows={2}
        className="mt-1"
      />
      <InfoAlert>Prazos conforme Art. 165 da Lei 14.133/21.</InfoAlert>
    </div>

    <div>
      <Label className="text-sm font-medium text-gray-700">Procedimentos</Label>
      <Textarea 
        value={data.recursos.procedimentos}
        onChange={(e) => updateField('recursos', 'procedimentos', e.target.value)}
        rows={3}
        className="mt-1"
      />
      <InfoAlert>Procedimento padrão AGU/TCU aplicado.</InfoAlert>
    </div>

    <div>
      <Label className="text-sm font-medium text-gray-700">Efeitos dos Recursos</Label>
      <Textarea 
        value={data.recursos.efeitos}
        onChange={(e) => updateField('recursos', 'efeitos', e.target.value)}
        rows={3}
        className="mt-1"
      />
      <InfoAlert>Efeito suspensivo padrão com exceções previstas em lei.</InfoAlert>
    </div>

    <div>
      <MunicipalToggle
        title="🏛️ Procedimentos Específicos (Municipal)"
        value={data.recursos.procedimentosEspecificos}
        onChange={(value) => updateField('recursos', 'procedimentosEspecificos', value)}
        placeholder="Inserir aqui procedimentos específicos do município para recursos conforme regulamentação local."
      />
    </div>
  </SectionCard>
);

export default RecursosSection;
