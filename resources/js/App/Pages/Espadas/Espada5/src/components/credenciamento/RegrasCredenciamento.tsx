
import React from 'react';
import { FileText, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';

interface RegrasCredenciamentoProps {
  regulamentoCredenciamento: string;
  criteriosHabilitacao: string;
  formaConvocacao: string;
  updateCredenciamentoRules: (rules: any) => void;
}

const InfoAlert = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-1 flex items-center text-sm text-lumen-blue">
    <Info className="w-4 h-4 mr-1 text-lumen-gold" />
    <span>{children}</span>
  </div>
);

const RegrasCredenciamento: React.FC<RegrasCredenciamentoProps> = ({
  regulamentoCredenciamento,
  criteriosHabilitacao,
  formaConvocacao,
  updateCredenciamentoRules
}) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="font-montserrat font-semibold text-lg text-lumen-blue flex items-center">
          <FileText className="w-5 h-5 mr-2 text-lumen-gold" />
          2. Regras do Credenciamento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1">Regulamento do Credenciamento *</Label>
          <Textarea 
            value={regulamentoCredenciamento || 'Regulamento Municipal de Credenciamento nº XXX/XXXX - Estabelece critérios e procedimentos para o credenciamento de fornecedores conforme Lei 14.133/2021.'}
            onChange={(e) => updateCredenciamentoRules({ regulamentoCredenciamento: e.target.value })}
            className="w-full mt-1 focus:ring-2 focus:ring-lumen-blue"
            rows={4}
            placeholder="Descreva as regras e procedimentos para o credenciamento..."
          />
          <InfoAlert>Referência ao regulamento municipal específico.</InfoAlert>
        </div>
        
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1">Critérios de Habilitação para Credenciamento *</Label>
          <Textarea 
            value={criteriosHabilitacao || 'Habilitação jurídica, regularidade fiscal e trabalhista, qualificação técnica e econômico-financeira conforme Lei 14.133/2021.'}
            onChange={(e) => updateCredenciamentoRules({ criteriosHabilitacao: e.target.value })}
            className="w-full mt-1 focus:ring-2 focus:ring-lumen-blue"
            rows={4}
            placeholder="Descreva os critérios de habilitação exigidos..."
          />
          <InfoAlert>Critérios básicos conforme legislação federal.</InfoAlert>
        </div>
        
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1">Forma de Convocação dos Credenciados *</Label>
          <Textarea 
            value={formaConvocacao || 'Chamamento público mediante publicação em Diário Oficial e portal da transparência, com ampla divulgação nos meios de comunicação usuais.'}
            onChange={(e) => updateCredenciamentoRules({ formaConvocacao: e.target.value })}
            className="w-full mt-1 focus:ring-2 focus:ring-lumen-blue"
            rows={3}
            placeholder="Descreva como os credenciados serão convocados..."
          />
          <InfoAlert>Chamamento público conforme princípio da publicidade.</InfoAlert>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegrasCredenciamento;
