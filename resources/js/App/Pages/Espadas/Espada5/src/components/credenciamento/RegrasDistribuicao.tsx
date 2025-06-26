
import React from 'react';
import { Shuffle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';

interface RegrasDistribuicaoProps {
  regrasDistribuicao: string;
  updateCredenciamentoRules: (rules: any) => void;
}

const InfoAlert = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-1 flex items-center text-sm text-lumen-blue">
    <Info className="w-4 h-4 mr-1 text-lumen-gold" />
    <span>{children}</span>
  </div>
);

const RegrasDistribuicao: React.FC<RegrasDistribuicaoProps> = ({
  regrasDistribuicao,
  updateCredenciamentoRules
}) => {
  return (
    <Card className="shadow-md border-green-200">
      <CardHeader>
        <CardTitle className="font-montserrat font-semibold text-lg text-lumen-blue flex items-center">
          <Shuffle className="w-5 h-5 mr-2 text-lumen-gold" />
          4. Regras de Distribuição de Demandas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1">Regras de Distribuição de Demandas *</Label>
          <Textarea 
            value={regrasDistribuicao || "A distribuição das demandas será realizada por rodízio equitativo entre os credenciados aptos, garantindo a isonomia e oportunidade igual de participação. O credenciado poderá recusar a demanda, sujeito às condições estabelecidas no regulamento, sem prejuízo para futuras convocações. Em caso de recusa ou indisponibilidade, a demanda será direcionada ao próximo credenciado da lista."}
            onChange={(e) => updateCredenciamentoRules({ regrasDistribuicao: e.target.value })}
            className="w-full mt-1 focus:ring-2 focus:ring-lumen-blue"
            rows={5}
            placeholder="Defina como as demandas serão distribuídas..."
          />
          <InfoAlert>Método de rodízio equitativo - Personalizar conforme necessidade (sorteio, menor preço por demanda, etc.).</InfoAlert>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegrasDistribuicao;
