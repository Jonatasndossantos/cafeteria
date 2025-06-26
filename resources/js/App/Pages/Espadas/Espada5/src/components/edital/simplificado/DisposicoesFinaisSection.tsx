import React from 'react';
import { FileText } from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import SectionCard from '../SectionCard';
import { PreenchidoAlert } from '../shared/AlertComponents';
import MunicipalToggle from '../shared/MunicipalToggle';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion';
import { Card, CardContent, CardTitle } from '@/Components/ui/card';

interface DisposicoesFinaisSectionProps {
  formData: any;
  setFormData: (setter: (prev: any) => any) => void;
}

const DisposicoesFinaisSection: React.FC<DisposicoesFinaisSectionProps> = ({ 
  formData, 
  setFormData 
}) => {
  return (
    <AccordionItem value="secao7">
      <Card className="shadow-md">
        <AccordionTrigger className="px-6 py-4 hover:no-underline">
          <CardTitle className="font-montserrat font-semibold text-lg text-lumen-blue flex items-center">
            <FileText className="w-5 h-5 mr-2 text-lumen-gold" />
            7. Disposições Finais
          </CardTitle>
        </AccordionTrigger>
        <AccordionContent>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Adjudicação e Homologação</Label>
              <Textarea 
                className="mt-1 bg-blue-50 border-blue-200"
                rows={2}
                value={formData.adjudicacaoHomologacao}
                readOnly
              />
              <PreenchidoAlert>Procedimentos padrão AGU/TCU</PreenchidoAlert>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Sanções Administrativas</Label>
              <Textarea 
                className="mt-1 bg-blue-50 border-blue-200"
                rows={2}
                value={formData.sancoes}
                readOnly
              />
              <PreenchidoAlert>Sanções conforme Lei 14.133/2021</PreenchidoAlert>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Disposições Gerais</Label>
              <Textarea 
                className="mt-1 bg-blue-50 border-blue-200"
                rows={2}
                value={formData.disposicoesGerais}
                readOnly
              />
              <PreenchidoAlert>Cláusulas AGU/TCU para casos omissos</PreenchidoAlert>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Foro Competente</Label>
              <Textarea 
                className="mt-1 bg-blue-50 border-blue-200"
                rows={1}
                value={formData.foro}
                readOnly
              />
              <PreenchidoAlert>Foro da comarca do órgão licitante</PreenchidoAlert>
            </div>

            <div>
              <MunicipalToggle 
                title="🏛️ Disposições Municipais"
                value={formData.regulamentacaoFinais}
                onChange={(value) => setFormData(prev => ({ ...prev, regulamentacaoFinais: value }))}
                placeholder="Inserir disposições específicas conforme regulamentação municipal"
              />
            </div>
          </CardContent>
        </AccordionContent>
      </Card>
    </AccordionItem>
  );
};

export default DisposicoesFinaisSection;
