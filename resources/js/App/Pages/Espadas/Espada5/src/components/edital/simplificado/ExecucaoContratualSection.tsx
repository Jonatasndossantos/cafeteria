import React from 'react';
import { Settings } from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Input } from '@/Components/ui/input';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion';
import { Card, CardContent, CardTitle } from '@/Components/ui/card';
import { PreenchidoAlert } from '../shared/AlertComponents';
import MunicipalToggle from '../shared/MunicipalToggle';

interface ExecucaoContratualSectionProps {
  formData: any;
  setFormData: (setter: (prev: any) => any) => void;
}

const ExecucaoContratualSection: React.FC<ExecucaoContratualSectionProps> = ({ 
  formData, 
  setFormData 
}) => {
  return (
    <AccordionItem value="secao6">
      <Card className="shadow-md">
        <AccordionTrigger className="px-6 py-4 hover:no-underline">
          <CardTitle className="font-montserrat font-semibold text-lg text-lumen-blue flex items-center">
            <Settings className="w-5 h-5 mr-2 text-lumen-gold" />
            6. Condições de Execução
          </CardTitle>
        </AccordionTrigger>
        <AccordionContent>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Prazo de Vigência</Label>
                <Input 
                  value={formData.prazoVigencia}
                  onChange={(e) => setFormData(prev => ({ ...prev, prazoVigencia: e.target.value }))}
                  className="mt-1 focus:ring-2 focus:ring-lumen-blue"
                />
                <PreenchidoAlert>Sugestão padrão baseada no objeto</PreenchidoAlert>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Prazo de Entrega</Label>
                <Input 
                  value={formData.prazoEntrega}
                  onChange={(e) => setFormData(prev => ({ ...prev, prazoEntrega: e.target.value }))}
                  className="mt-1 focus:ring-2 focus:ring-lumen-blue"
                />
                <PreenchidoAlert>Baseado na complexidade do objeto</PreenchidoAlert>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Condições de Pagamento</Label>
              <Textarea 
                className="mt-1 bg-blue-50 border-blue-200"
                rows={2}
                value={formData.condicoesPagamento}
                readOnly
              />
              <PreenchidoAlert>Padrão AGU/TCU: 30 dias após entrega e aceite</PreenchidoAlert>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Penalidades</Label>
              <Textarea 
                className="mt-1 bg-blue-50 border-blue-200"
                rows={3}
                value={formData.penalidades}
                readOnly
              />
              <PreenchidoAlert>Penalidades padrão conforme Lei 14.133/2021</PreenchidoAlert>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Recursos Administrativos</Label>
              <Textarea 
                className="mt-1 bg-blue-50 border-blue-200"
                rows={2}
                value={formData.recursos}
                readOnly
              />
              <PreenchidoAlert>Prazos e procedimentos AGU/TCU</PreenchidoAlert>
            </div>

            <div>
              <MunicipalToggle
                title="🏛️ Condições Municipais"
                value={formData.regulamentacaoExecucao}
                onChange={(value) => setFormData(prev => ({ ...prev, regulamentacaoExecucao: value }))}
                placeholder="Inserir condições específicas conforme normas locais"
              />
            </div>
          </CardContent>
        </AccordionContent>
      </Card>
    </AccordionItem>
  );
};

export default ExecucaoContratualSection;
