import React from 'react';
import { TrendingUp, Gavel } from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Checkbox } from '@/Components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import SectionCard from './SectionCard';
import { InfoAlert } from './shared/AlertComponents';
import MunicipalToggle from './shared/MunicipalToggle';

interface FaseLancesSectionProps {
  data: any;
  updateField: (section: string, field: string, value: any) => void;
}

const FaseLancesSection: React.FC<FaseLancesSectionProps> = ({ data, updateField }) => (
  <SectionCard number="8" title="Fase de Lances" icon={TrendingUp}>
    <div className="flex items-center space-x-2">
      <Checkbox 
        id="aplicavel"
        checked={data.faseLances.aplicavel}
        onCheckedChange={(checked) => updateField('faseLances', 'aplicavel', checked)}
      />
      <Label htmlFor="aplicavel" className="text-sm font-medium text-gray-700">Fase de lances aplicável</Label>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="text-sm font-medium text-gray-700">Modo de Disputa</Label>
        <Input 
          value={data.faseLances.modoDisputa}
          onChange={(e) => updateField('faseLances', 'modoDisputa', e.target.value)}
          className="mt-1"
        />
        <InfoAlert>Disputa aberta é o padrão.</InfoAlert>
      </div>
      <div>
        <Label className="text-sm font-medium text-gray-700">Intervalo Mínimo</Label>
        <Input 
          value={data.faseLances.intervaloMinimo}
          onChange={(e) => updateField('faseLances', 'intervaloMinimo', e.target.value)}
          className="mt-1"
        />
      </div>
    </div>

    <div>
      <Label className="text-sm font-medium text-gray-700">Regras de Prorrogação</Label>
      <Textarea 
        value={data.faseLances.regrasProrrogacao}
        onChange={(e) => updateField('faseLances', 'regrasProrrogacao', e.target.value)}
        rows={2}
        className="mt-1"
      />
      <InfoAlert>Padrão: prorrogação automática de 2 minutos.</InfoAlert>
    </div>

    <div>
      <MunicipalToggle
        title="🏛️ Procedimentos Específicos (Municipal)"
        value={data.faseLances.procedimentosEspecificos}
        onChange={(value) => updateField('faseLances', 'procedimentosEspecificos', value)}
        placeholder="Inserir aqui procedimentos específicos do município para fase de lances conforme regulamentação local."
      />
    </div>
  </SectionCard>
);

export default FaseLancesSection;
