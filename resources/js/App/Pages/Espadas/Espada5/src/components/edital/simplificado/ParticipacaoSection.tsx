import React from 'react';
import { Settings } from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion';
import { Card, CardContent, CardTitle } from '@/Components/ui/card';
import { PreenchidoAlert } from '../shared/AlertComponents';
import MunicipalToggle from '../shared/MunicipalToggle';

interface ParticipacaoSectionProps {
  formData: any;
  setFormData: (setter: (prev: any) => any) => void;
}

const ParticipacaoSection: React.FC<ParticipacaoSectionProps> = ({ 
  formData, 
  setFormData 
}) => {
  return (
    <AccordionItem value="secao3">
      <Card className="shadow-md">
        <AccordionTrigger className="px-6 py-4 hover:no-underline">
          <CardTitle className="font-montserrat font-semibold text-lg text-lumen-blue flex items-center">
            <Settings className="w-5 h-5 mr-2 text-lumen-gold" />
            3. Condições de Participação
          </CardTitle>
        </AccordionTrigger>
        <AccordionContent>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Condições de Participação</Label>
              <Textarea 
                className="mt-1 bg-blue-50 border-blue-200"
                rows={3}
                value={formData.condicoesParticipacao}
                readOnly
              />
              <PreenchidoAlert>Cláusulas padrão AGU/TCU para bens e serviços comuns</PreenchidoAlert>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Documentação Necessária</Label>
              <Textarea 
                className="mt-1 bg-blue-50 border-blue-200"
                rows={4}
                value={formData.documentacaoNecessaria}
                readOnly
              />
              <PreenchidoAlert>Lista completa AGU/TCU para habilitação simplificada</PreenchidoAlert>
            </div>

            <div>
              <MunicipalToggle
                title="🏛️ Regulamentação Municipal"
                value={formData.regulamentacaoParticipacao}
                onChange={(value) => setFormData(prev => ({ ...prev, regulamentacaoParticipacao: value }))}
                placeholder="Inserir decretos e normas específicas do município"
              />
            </div>
          </CardContent>
        </AccordionContent>
      </Card>
    </AccordionItem>
  );
};

export default ParticipacaoSection;
