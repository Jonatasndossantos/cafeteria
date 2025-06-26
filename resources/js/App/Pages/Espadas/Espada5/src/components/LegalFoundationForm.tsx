import React, { useState } from 'react';
import { Card } from '@/Components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { InfoIcon } from 'lucide-react';

type LegalFoundation = 'Lei 14.133' | 'Lei 13.019' | 'Outro';

interface LegalFoundationFormProps {
  onFoundationChange: (foundation: LegalFoundation) => void;
}

const LegalFoundationForm: React.FC<LegalFoundationFormProps> = ({ onFoundationChange }) => {
  const [foundation, setFoundation] = useState<LegalFoundation>('Lei 14.133');
  const [otherFoundation, setOtherFoundation] = useState('');

  const handleFoundationChange = (value: LegalFoundation) => {
    setFoundation(value);
    onFoundationChange(value);
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Fundamento Jurídico do Credenciamento</h2>
        
        <RadioGroup
          value={foundation}
          onValueChange={(value) => handleFoundationChange(value as LegalFoundation)}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Lei 14.133" id="lei14133" />
            <Label htmlFor="lei14133">Lei 14.133/2021 – Credenciamento por Inexigibilidade</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Lei 13.019" id="lei13019" />
            <Label htmlFor="lei13019">Lei 13.019/2014 – Parceria com OSCs (MROSC)</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Outro" id="outro" />
            <Label htmlFor="outro">Outro (especificar manualmente)</Label>
          </div>
        </RadioGroup>

        {foundation === 'Outro' && (
          <div className="mt-4">
            <Label htmlFor="otherFoundation">Especifique o fundamento legal:</Label>
            <Input
              id="otherFoundation"
              value={otherFoundation}
              onChange={(e) => setOtherFoundation(e.target.value)}
              placeholder="Digite o fundamento legal..."
              className="mt-2"
            />
          </div>
        )}

        {foundation === 'Lei 13.019' && (
          <Alert className="mt-4 bg-blue-50">
            <InfoIcon className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-blue-700">
              Este procedimento exige plano de trabalho com metas, cronograma e indicadores sociais, conforme arts. 22 a 25 da Lei 13.019.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </Card>
  );
};

export default LegalFoundationForm; 