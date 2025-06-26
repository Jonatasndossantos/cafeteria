
import React from 'react';
import { DollarSign, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';

interface CriteriosRemuneracaoProps {
  criteriosRemuneracao: string;
  updateCredenciamentoRules: (rules: any) => void;
}

const InfoAlert = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-1 flex items-center text-sm text-lumen-blue">
    <Info className="w-4 h-4 mr-1 text-lumen-gold" />
    <span>{children}</span>
  </div>
);

const CriteriosRemuneracao: React.FC<CriteriosRemuneracaoProps> = ({
  criteriosRemuneracao,
  updateCredenciamentoRules
}) => {
  return (
    <Card className="shadow-md border-green-200">
      <CardHeader>
        <CardTitle className="font-montserrat font-semibold text-lg text-lumen-blue flex items-center">
          <DollarSign className="w-5 h-5 mr-2 text-lumen-gold" />
          3. Critérios de Remuneração
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1">Critérios de Remuneração *</Label>
          <Textarea 
            value={criteriosRemuneracao}
            onChange={(e) => updateCredenciamentoRules({ criteriosRemuneracao: e.target.value })}
            className="w-full mt-1 focus:ring-2 focus:ring-lumen-blue"
            rows={5}
            placeholder="Defina como os credenciados serão remunerados..."
          />
          <InfoAlert>Texto padrão AGU/TCU - Personalizar conforme especificidades locais.</InfoAlert>
        </div>
      </CardContent>
    </Card>
  );
};

export default CriteriosRemuneracao;
