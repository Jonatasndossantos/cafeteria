import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import SectionCard from './SectionCard';
import { InfoAlert } from './shared/AlertComponents';
import MunicipalToggle from './shared/MunicipalToggle';

interface HabilitacaoSectionProps {
  data: any;
  updateField: (section: string, field: string, value: any) => void;
  inheritedData: any;
}

const HabilitacaoSection: React.FC<HabilitacaoSectionProps> = ({ data, updateField, inheritedData }) => (
  <SectionCard number="10" title="Habilitação" icon={CheckCircle}>
    <div>
      <Label className="text-sm font-medium text-gray-700">Documentação Jurídica</Label>
      <Textarea 
        value={data.habilitacao.documentacaoJuridica}
        onChange={(e) => updateField('habilitacao', 'documentacaoJuridica', e.target.value)}
        rows={3}
        className="mt-1"
      />
      <InfoAlert>Lista padrão AGU/TCU aplicada.</InfoAlert>
    </div>

    <div>
      <Label className="text-sm font-medium text-gray-700">Documentação Fiscal e Trabalhista</Label>
      <Textarea 
        value={data.habilitacao.documentacaoFiscal}
        onChange={(e) => updateField('habilitacao', 'documentacaoFiscal', e.target.value)}
        rows={3}
        className="mt-1"
      />
      <InfoAlert>Conforme Art. 68 da Lei 14.133/21.</InfoAlert>
    </div>

    <div>
      <Label className="text-sm font-medium text-gray-700">Qualificação Técnica</Label>
      <Textarea 
        value={data.habilitacao.qualificacaoTecnica}
        onChange={(e) => updateField('habilitacao', 'qualificacaoTecnica', e.target.value)}
        rows={3}
        className="mt-1"
      />
      <InfoAlert>Adaptado ao objeto da contratação.</InfoAlert>
    </div>

    <div>
      <Label className="text-sm font-medium text-gray-700">Qualificação Econômico-Financeira</Label>
      <Textarea 
        value={data.habilitacao.qualificacaoEconomica}
        onChange={(e) => updateField('habilitacao', 'qualificacaoEconomica', e.target.value)}
        rows={3}
        className="mt-1"
      />
      <InfoAlert>Baseado no valor estimado: {inheritedData.valorEstimado}.</InfoAlert>
    </div>

    <div>
      <MunicipalToggle
        title="🏛️ Requisitos Adicionais de Habilitação (Municipal)"
        value={data.habilitacao.requisitosAdicionais}
        onChange={(value) => updateField('habilitacao', 'requisitosAdicionais', value)}
        placeholder="Inserir aqui requisitos adicionais específicos do município conforme regulamentação local."
      />
    </div>

    <div>
      <Label className="text-sm font-medium text-gray-700">Aceitação de Comprovantes Equivalentes (Art. 67)</Label>
      <Textarea 
        value={data.habilitacao.comprovantesEquivalentes}
        onChange={(e) => updateField('habilitacao', 'comprovantesEquivalentes', e.target.value)}
        rows={3}
        className="mt-1"
        placeholder="Previsão de aceitação de comprovantes equivalentes conforme Art. 67 da Lei 14.133/21..."
      />
      <InfoAlert>Conforme Art. 67 da Lei 14.133/21 - aceitação de comprovantes equivalentes.</InfoAlert>
    </div>

    <div>
      <Label className="text-sm font-medium text-gray-700">Admissão de Regularidade via Sistemas Oficiais</Label>
      <Textarea 
        value={data.habilitacao.sistemasOficiais}
        onChange={(e) => updateField('habilitacao', 'sistemasOficiais', e.target.value)}
        rows={3}
        className="mt-1"
        placeholder="Aceitação de regularidade via CRC, SICAF, SICONV e demais sistemas oficiais..."
      />
      <InfoAlert>Aceitação de regularidade via sistemas oficiais (CRC, SICAF, SICONV, etc.).</InfoAlert>
    </div>
  </SectionCard>
);

export default HabilitacaoSection;
