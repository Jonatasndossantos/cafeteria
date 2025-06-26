import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion';
import { Card, CardContent, CardTitle } from '@/Components/ui/card';
import { PreenchidoAlert } from '../shared/AlertComponents';
import MunicipalToggle from '../shared/MunicipalToggle';

interface HabilitacaoGarantiasSectionProps {
  formData: any;
  setFormData: (setter: (prev: any) => any) => void;
}

const HabilitacaoGarantiasSection: React.FC<HabilitacaoGarantiasSectionProps> = ({ 
  formData, 
  setFormData 
}) => {
  return (
    <AccordionItem value="secao5">
      <Card className="shadow-md">
        <AccordionTrigger className="px-6 py-4 hover:no-underline">
          <CardTitle className="font-montserrat font-semibold text-lg text-lumen-blue flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-lumen-gold" />
            5. Habilitação e Garantias
          </CardTitle>
        </AccordionTrigger>
        <AccordionContent>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Documentos de Habilitação</Label>
              <Textarea 
                className="mt-1 bg-blue-50 border-blue-200"
                rows={4}
                value={formData.habilitacao}
                readOnly
              />
              <PreenchidoAlert>Documentação completa AGU/TCU para contratações simples</PreenchidoAlert>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Garantias Exigidas</Label>
              <Textarea 
                className="mt-1 bg-blue-50 border-blue-200"
                rows={2}
                value={formData.garantias}
                readOnly
              />
              <PreenchidoAlert>Garantia de execução: 5% (padrão AGU/TCU)</PreenchidoAlert>
            </div>

            <div>
              <MunicipalToggle
                title="🏛️ Requisitos Municipais"
                value={formData.regulamentacaoHabilitacao}
                onChange={(value) => setFormData(prev => ({ ...prev, regulamentacaoHabilitacao: value }))}
                placeholder="Inserir exigências específicas conforme legislação local"
              />
            </div>
          </CardContent>
        </AccordionContent>
      </Card>
    </AccordionItem>
  );
};

export default HabilitacaoGarantiasSection;
