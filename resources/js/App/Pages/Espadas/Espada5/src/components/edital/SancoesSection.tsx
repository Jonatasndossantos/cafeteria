import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import SectionCard from './SectionCard';
import { InfoAlert } from './shared/AlertComponents';
import MunicipalToggle from './shared/MunicipalToggle';

interface SancoesSectionProps {
  data: any;
  updateField: (section: string, field: string, value: any) => void;
}

const SancoesSection: React.FC<SancoesSectionProps> = ({ data, updateField }) => (
  <SectionCard number="15" title="Sanções" icon={AlertTriangle}>
    <div>
      <Label className="text-sm font-medium text-gray-700">Infrações Administrativas</Label>
      <Textarea 
        value={data.sancoes.infracoesAdministrativas}
        onChange={(e) => updateField('sancoes', 'infracoesAdministrativas', e.target.value)}
        rows={3}
        className="mt-1"
      />
      <InfoAlert>Infrações conforme Art. 155 da Lei 14.133/21.</InfoAlert>
    </div>

    <div>
      <Label className="text-sm font-medium text-gray-700">Penalidades Aplicáveis</Label>
      <Textarea 
        value={data.sancoes.penalidadesAplicaveis}
        onChange={(e) => updateField('sancoes', 'penalidadesAplicaveis', e.target.value)}
        rows={3}
        className="mt-1"
      />
      <InfoAlert>Penalidades conforme Art. 156 da Lei 14.133/21.</InfoAlert>
    </div>

    <div>
      <Label className="text-sm font-medium text-gray-700">Procedimento Sancionatório</Label>
      <Textarea 
        value={data.sancoes.procedimentoSancionatorio}
        onChange={(e) => updateField('sancoes', 'procedimentoSancionatorio', e.target.value)}
        rows={2}
        className="mt-1"
      />
      <InfoAlert>Devido processo legal garantido.</InfoAlert>
    </div>

    <div>
      <MunicipalToggle
        title="🏛️ Dosimetria Específica (Municipal)"
        value={data.sancoes.dosimetriaEspecifica}
        onChange={(value) => updateField('sancoes', 'dosimetriaEspecifica', value)}
        placeholder="Inserir aqui dosimetria específica das sanções conforme regulamentação municipal."
      />
    </div>
  </SectionCard>
);

export default SancoesSection;
