
import React from 'react';
import { FileText } from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Input } from '@/Components/ui/input';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion';
import { Card, CardContent, CardTitle } from '@/Components/ui/card';
import { PreenchidoAlert } from '../shared/AlertComponents';

interface DadosBasicosSectionProps {
  formData: any;
  inheritedData: any;
  setFormData: (setter: (prev: any) => any) => void;
}

const DadosBasicosSection: React.FC<DadosBasicosSectionProps> = ({ 
  formData, 
  inheritedData, 
  setFormData 
}) => {
  return (
    <AccordionItem value="secao1">
      <Card className="shadow-md">
        <AccordionTrigger className="px-6 py-4 hover:no-underline">
          <CardTitle className="font-montserrat font-semibold text-lg text-lumen-blue flex items-center">
            <FileText className="w-5 h-5 mr-2 text-lumen-gold" />
            1. Dados Básicos do Edital
          </CardTitle>
        </AccordionTrigger>
        <AccordionContent>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Número do Edital</Label>
                <Input value={inheritedData.numeroEdital} disabled className="bg-gray-100 mt-1" />
                <PreenchidoAlert>Gerado automaticamente pelo sistema</PreenchidoAlert>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Modalidade</Label>
                <Input value={inheritedData.modalidade} disabled className="bg-gray-100 mt-1" />
                <PreenchidoAlert>Selecionada conforme TR e valor estimado</PreenchidoAlert>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Objeto da Contratação *</Label>
              <Textarea 
                className="mt-1 focus:ring-2 focus:ring-lumen-blue"
                rows={2}
                value={formData.objeto}
                onChange={(e) => setFormData(prev => ({ ...prev, objeto: e.target.value }))}
              />
              <PreenchidoAlert>Herdado automaticamente do TR {inheritedData.termoReferencia}</PreenchidoAlert>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Justificativa da Contratação</Label>
              <Textarea 
                className="mt-1 bg-blue-50 border-blue-200 focus:ring-2 focus:ring-blue-400"
                rows={3}
                value={formData.justificativa}
                onChange={(e) => setFormData(prev => ({ ...prev, justificativa: e.target.value }))}
              />
              <PreenchidoAlert>Gerada automaticamente com base no TR e objeto</PreenchidoAlert>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Fundamentação Legal</Label>
              <Textarea 
                className="mt-1 bg-blue-50 border-blue-200"
                rows={2}
                value={formData.fundamentacaoLegal}
                readOnly
              />
              <PreenchidoAlert>Artigos AGU/TCU selecionados conforme modalidade: {inheritedData.modalidade}</PreenchidoAlert>
            </div>
          </CardContent>
        </AccordionContent>
      </Card>
    </AccordionItem>
  );
};

export default DadosBasicosSection;
