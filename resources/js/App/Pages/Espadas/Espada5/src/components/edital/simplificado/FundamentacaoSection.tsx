
import React from 'react';
import { Info } from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion';
import { Card, CardContent, CardTitle } from '@/Components/ui/card';
import { PreenchidoAlert } from '../shared/AlertComponents';

interface FundamentacaoSectionProps {
  formData: any;
  setFormData: (setter: (prev: any) => any) => void;
}

const FundamentacaoSection: React.FC<FundamentacaoSectionProps> = ({ 
  formData, 
  setFormData 
}) => {
  return (
    <AccordionItem value="secao2">
      <Card className="shadow-md">
        <AccordionTrigger className="px-6 py-4 hover:no-underline">
          <CardTitle className="font-montserrat font-semibold text-lg text-lumen-blue flex items-center">
            <Info className="w-5 h-5 mr-2 text-lumen-gold" />
            2. Outras Informações
          </CardTitle>
        </AccordionTrigger>
        <AccordionContent>
          <CardContent>
            <div>
              <Label className="text-sm font-medium text-gray-700">Informações Complementares</Label>
              <Textarea 
                className="mt-1 focus:ring-2 focus:ring-lumen-blue"
                rows={2}
                value={formData.outrasInformacoes}
                onChange={(e) => setFormData(prev => ({ ...prev, outrasInformacoes: e.target.value }))}
              />
              <PreenchidoAlert>Vinculações automáticas com TR e Matriz de Riscos</PreenchidoAlert>
            </div>
          </CardContent>
        </AccordionContent>
      </Card>
    </AccordionItem>
  );
};

export default FundamentacaoSection;
