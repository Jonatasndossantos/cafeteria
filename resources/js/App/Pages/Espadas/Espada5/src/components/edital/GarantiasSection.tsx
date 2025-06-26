import React from 'react';
import { CheckCircle, Shield } from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Checkbox } from '@/Components/ui/checkbox';
import SectionCard from './SectionCard';
import { InfoAlert } from './shared/AlertComponents';
import MunicipalToggle from './shared/MunicipalToggle';

interface GarantiasSectionProps {
  data: any;
  updateField: (section: string, field: string, value: any) => void;
}

const GarantiasSection: React.FC<GarantiasSectionProps> = ({ data, updateField }) => (
  <SectionCard number="13" title="Garantias" icon={CheckCircle}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="garantiaProposta"
          checked={data.garantias.garantiaProposta}
          onCheckedChange={(checked) => updateField('garantias', 'garantiaProposta', checked)}
        />
        <Label htmlFor="garantiaProposta" className="text-sm text-gray-700">Garantia de Proposta (se exigida)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="garantiaExecucao"
          checked={data.garantias.garantiaExecucao}
          onCheckedChange={(checked) => updateField('garantias', 'garantiaExecucao', checked)}
        />
        <Label htmlFor="garantiaExecucao" className="text-sm text-gray-700">Garantia de Execução (se exigida)</Label>
      </div>
    </div>

    <div>
      <Label className="text-sm font-medium text-gray-700">Percentuais e Modalidades Aceitas</Label>
      <Textarea 
        value={data.garantias.percentuaisModalidades}
        onChange={(e) => updateField('garantias', 'percentuaisModalidades', e.target.value)}
        rows={3}
        className="mt-1"
      />
      <InfoAlert>Percentuais padrão AGU/TCU aplicados.</InfoAlert>
    </div>

    <div>
      <MunicipalToggle
        title="🏛️ Percentuais Específicos (Municipal)"
        value={data.garantias.percentuaisEspecificos}
        onChange={(value) => updateField('garantias', 'percentuaisEspecificos', value)}
        placeholder="Inserir aqui percentuais específicos do município conforme regulamentação local."
      />
    </div>
  </SectionCard>
);

export default GarantiasSection;
