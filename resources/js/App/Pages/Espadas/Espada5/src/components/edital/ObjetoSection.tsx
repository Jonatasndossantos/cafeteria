import React from 'react';
import { FileText, Target } from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import SectionCard from './SectionCard';
import { InfoAlert } from './shared/AlertComponents';
import MunicipalToggle from './shared/MunicipalToggle';

interface ObjetoSectionProps {
  data: any;
  updateField: (section: string, field: string, value: any) => void;
}

const ObjetoSection: React.FC<ObjetoSectionProps> = ({ data, updateField }) => (
  <SectionCard number="2" title="Objeto" icon={FileText}>
    <div>
      <Label className="text-sm font-medium text-gray-700">Definição Clara e Precisa do Objeto</Label>
      <Textarea 
        value={data.objeto.definicaoObjeto}
        onChange={(e) => updateField('objeto', 'definicaoObjeto', e.target.value)}
        rows={4}
        className="mt-1"
      />
      <InfoAlert>Baseado no objeto definido nas Espadas anteriores.</InfoAlert>
    </div>

    <div>
      <Label className="text-sm font-medium text-gray-700">Identificação do Processo Administrativo</Label>
      <Input 
        value={data.objeto.processoAdministrativo}
        onChange={(e) => updateField('objeto', 'processoAdministrativo', e.target.value)}
        className="mt-1"
      />
      <InfoAlert>Formato padrão conforme numeração administrativa.</InfoAlert>
    </div>

    <div>
      <MunicipalToggle
        title="🏛️ Nível de Detalhamento (Municipal)"
        value={data.objeto.nivelDetalhamento}
        onChange={(value) => updateField('objeto', 'nivelDetalhamento', value)}
        placeholder="Inserir aqui especificações técnicas detalhadas conforme Termo de Referência Municipal nº [NÚMERO] e normas técnicas locais."
      />
    </div>
  </SectionCard>
);

export default ObjetoSection;
