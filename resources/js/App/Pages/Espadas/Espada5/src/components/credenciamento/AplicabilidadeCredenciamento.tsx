import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group';
import { CheckCircle, InfoIcon } from 'lucide-react';
import InfoAlert from '../shared/InfoAlert';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Alert, AlertDescription } from '@/Components/ui/alert';

type LegalFoundation = 'Lei 14.133' | 'Lei 13.019' | 'Outro';

interface AplicabilidadeCredenciamentoProps {
  utilizarCredenciamento: string;
  setUtilizarCredenciamento: (value: string) => void;
}

const AplicabilidadeCredenciamento: React.FC<AplicabilidadeCredenciamentoProps> = ({
  utilizarCredenciamento,
  setUtilizarCredenciamento
}) => {
  const [foundation, setFoundation] = useState<LegalFoundation>('Lei 14.133');
  const [otherFoundation, setOtherFoundation] = useState('');

  const isLei14133 = foundation === 'Lei 14.133';
  const isLei13019 = foundation === 'Lei 13.019';

  return (
    <Card className="shadow-lg border-2 border-lumen-blue/10">
      <CardHeader className="bg-gradient-to-r from-lumen-blue/5 to-transparent border-b border-lumen-blue/10">
        <CardTitle className="font-montserrat font-semibold text-xl text-lumen-blue flex items-center">
          <CheckCircle className="w-6 h-6 mr-3 text-lumen-gold" />
          1. Aplicabilidade do Credenciamento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="bg-white rounded-lg p-4 border border-gray-100">
          <Label className="text-base font-medium text-gray-800 mb-3 block">Utilizar Credenciamento?</Label>
          <RadioGroup 
            value={utilizarCredenciamento} 
            onValueChange={setUtilizarCredenciamento} 
            className="flex space-x-6 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sim" id="credenciamento-sim" className="text-lumen-blue" />
              <Label htmlFor="credenciamento-sim" className="text-sm font-medium">Sim</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nao" id="credenciamento-nao" className="text-lumen-blue" />
              <Label htmlFor="credenciamento-nao" className="text-sm font-medium">Não</Label>
            </div>
          </RadioGroup>
          <InfoAlert>Conforme Art. 79 da Lei 14.133/21.</InfoAlert>
        </div>
        
        {utilizarCredenciamento === 'sim' && (
          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <div className="space-y-6">
              <div>
                <RadioGroup
                  value={foundation}
                  onValueChange={(value) => setFoundation(value as LegalFoundation)}
                  className="space-y-4"
                >
                  <Label className="text-base font-medium text-gray-800 mb-3 block">Fundamento Jurídico</Label>
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

              {/* Campos específicos para Lei 14.133 */}
              {isLei14133 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="remuneracao">Remuneração por tabela pública</Label>
                    <Input id="remuneracao" placeholder="Digite o valor da remuneração" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minuta">Minuta de Termo de Credenciamento contratual</Label>
                    <Textarea id="minuta" placeholder="Digite a minuta do termo..." />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pncp">Registro no PNCP como Inexigibilidade</Label>
                    <Input id="pncp" placeholder="Digite o número do registro PNCP" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clausulas">Cláusulas típicas de contrato administrativo</Label>
                    <Textarea id="clausulas" placeholder="Digite as cláusulas..." />
                  </div>
                </div>
              )}

              {/* Campos específicos para Lei 13.019 */}
              {isLei13019 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="planoTrabalho">Upload de Plano de Trabalho e Metas</Label>
                    <Input type="file" id="planoTrabalho" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="indicadores">Avaliação por indicadores sociais</Label>
                    <Textarea id="indicadores" placeholder="Descreva os indicadores sociais..." />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="justificativa">Justificativa de dispensa de chamamento (art. 30 da Lei 13.019)</Label>
                    <Textarea id="justificativa" placeholder="Digite a justificativa..." />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="termoFomento">Termo de Fomento/Colaboração</Label>
                    <Textarea id="termoFomento" placeholder="Digite o termo de fomento..." />
                  </div>
                </div>
              )}

              {/* Campos comuns para ambos */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="entidade">
                    {isLei13019 ? 'Entidade Parceira' : 'Credenciado'}
                  </Label>
                  <Input id="entidade" placeholder="Digite o nome da entidade" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="valor">
                    {isLei13019 ? 'Repasse por metas' : 'Remuneração'}
                  </Label>
                  <Input id="valor" placeholder="Digite o valor" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipoContrato">
                    {isLei13019 ? 'Termo de Fomento/Colaboração' : 'Termo de Credenciamento'}
                  </Label>
                  <Textarea id="tipoContrato" placeholder="Digite o tipo de contrato..." />
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AplicabilidadeCredenciamento;
