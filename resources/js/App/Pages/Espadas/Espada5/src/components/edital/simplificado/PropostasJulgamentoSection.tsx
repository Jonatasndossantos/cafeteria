import React from 'react';
import { FileText } from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion';
import { Card, CardContent, CardTitle } from '@/Components/ui/card';
import { PreenchidoAlert } from '../shared/AlertComponents';
import MunicipalToggle from '../shared/MunicipalToggle';

interface PropostasJulgamentoSectionProps {
  formData: any;
  inheritedData: any;
  setFormData: (setter: (prev: any) => any) => void;
}

const PropostasJulgamentoSection: React.FC<PropostasJulgamentoSectionProps> = ({ 
  formData, 
  inheritedData, 
  setFormData 
}) => {
  return (
    <AccordionItem value="secao4">
      <Card className="shadow-md">
        <AccordionTrigger className="px-6 py-4 hover:no-underline">
          <CardTitle className="font-montserrat font-semibold text-lg text-lumen-blue flex items-center">
            <FileText className="w-5 h-5 mr-2 text-lumen-gold" />
            4. Apresentação e Julgamento das Propostas
          </CardTitle>
        </AccordionTrigger>
        <AccordionContent>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Apresentação das Propostas</Label>
              <Textarea 
                className="mt-1 bg-blue-50 border-blue-200"
                rows={3}
                value={formData.apresentacaoPropostas}
                readOnly
              />
              <PreenchidoAlert>Procedimentos padrão AGU/TCU para envio eletrônico</PreenchidoAlert>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Classificação das Propostas</Label>
              <Textarea 
                className="mt-1 bg-blue-50 border-blue-200"
                rows={3}
                value={formData.classificacaoPropostas}
                readOnly
              />
              <PreenchidoAlert>Critérios AGU/TCU: {inheritedData.tipoJulgamento}</PreenchidoAlert>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Fase de Lances</Label>
              <Textarea 
                className="mt-1 bg-blue-50 border-blue-200"
                rows={2}
                value={formData.faseLances}
                readOnly
              />
              <PreenchidoAlert>Modo de disputa: {inheritedData.modoDisputa}</PreenchidoAlert>
            </div>

            <div>
              <MunicipalToggle
                title="🏛️ Procedimentos Municipais"
                value={formData.regulamentacaoPropostas}
                onChange={(value) => setFormData(prev => ({ ...prev, regulamentacaoPropostas: value }))}
                placeholder="Inserir procedimentos específicos do sistema local"
              />
            </div>
          </CardContent>
        </AccordionContent>
      </Card>
    </AccordionItem>
  );
};

export default PropostasJulgamentoSection;
