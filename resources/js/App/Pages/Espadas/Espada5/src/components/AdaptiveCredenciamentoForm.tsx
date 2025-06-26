import React from 'react';
import { Card } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Checkbox } from '@/Components/ui/checkbox';

type LegalFoundation = 'Lei 14.133' | 'Lei 13.019' | 'Outro';

interface AdaptiveCredenciamentoFormProps {
  foundation: LegalFoundation;
}

const AdaptiveCredenciamentoForm: React.FC<AdaptiveCredenciamentoFormProps> = ({ foundation }) => {
  const isLei14133 = foundation === 'Lei 14.133';
  const isLei13019 = foundation === 'Lei 13.019';

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-6">
        {/* Campos específicos para Lei 14.133 */}
        {isLei14133 && (
          <>
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
          </>
        )}

        {/* Campos específicos para Lei 13.019 */}
        {isLei13019 && (
          <>
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
          </>
        )}

        {/* Campos comuns para ambos */}
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
    </Card>
  );
};

export default AdaptiveCredenciamentoForm; 