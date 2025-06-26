
import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';

interface SancoesPenalidadesProps {
  sancoespenalidades: string;
  garantiasExigidas: string;
  updateCredenciamentoRules: (rules: any) => void;
}

const InfoAlert = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-1 flex items-center text-sm text-lumen-blue">
    <Info className="w-4 h-4 mr-1 text-lumen-gold" />
    <span>{children}</span>
  </div>
);

const SancoesPenalidades: React.FC<SancoesPenalidadesProps> = ({
  sancoespenalidades,
  garantiasExigidas,
  updateCredenciamentoRules
}) => {
  return (
    <Card className="shadow-md border-red-200">
      <CardHeader>
        <CardTitle className="font-montserrat font-semibold text-lg text-lumen-blue flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-lumen-gold" />
          6. Sanções e Penalidades Aplicáveis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1">Sanções e Penalidades Aplicáveis *</Label>
          <Textarea 
            value={sancoespenalidades || "As infrações sujeitar-se-ão às seguintes penalidades graduais: a) Advertência por escrito; b) Multa de 0,1% a 20% sobre o valor da contratação; c) Suspensão temporária de participação em credenciamento por até 24 meses; d) Descredenciamento definitivo; e) Declaração de inidoneidade para licitar. O procedimento sancionatório observará o contraditório e ampla defesa conforme Lei 14.133/21, Arts. 155 a 163."}
            onChange={(e) => updateCredenciamentoRules({ sancoespenalidades: e.target.value })}
            className="w-full mt-1 focus:ring-2 focus:ring-lumen-blue"
            rows={6}
            placeholder="Detalhe as infrações e penalidades aplicáveis..."
          />
          <InfoAlert>Penalidades graduais conforme Lei 14.133/21 com procedimento sancionatório.</InfoAlert>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1">Outras Garantias Específicas</Label>
          <Textarea 
            value={garantiasExigidas || 'Poderão ser exigidas garantias específicas para execução de contratos de maior complexidade ou valor, conforme regulamento e natureza do objeto contratado.'}
            onChange={(e) => updateCredenciamentoRules({ garantiasExigidas: e.target.value })}
            className="w-full mt-1 focus:ring-2 focus:ring-lumen-blue"
            rows={3}
            placeholder="Descreva outras garantias específicas, se houver..."
          />
          <InfoAlert>Garantias adicionais apenas quando justificadas pela complexidade ou valor.</InfoAlert>
        </div>
      </CardContent>
    </Card>
  );
};

export default SancoesPenalidades;
