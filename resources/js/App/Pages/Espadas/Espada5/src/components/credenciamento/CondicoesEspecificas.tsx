
import React from 'react';
import { Users, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Input } from '@/Components/ui/input';

interface CondicoesEspecificasProps {
  prazoValidadeCredenciamento: string;
  prazoManifestacao: string;
  condicoesRenovacao: string;
  criteriosDescredenciamento: string;
  updateCredenciamentoRules: (rules: any) => void;
}

const InfoAlert = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-1 flex items-center text-sm text-lumen-blue">
    <Info className="w-4 h-4 mr-1 text-lumen-gold" />
    <span>{children}</span>
  </div>
);

const CondicoesEspecificas: React.FC<CondicoesEspecificasProps> = ({
  prazoValidadeCredenciamento,
  prazoManifestacao,
  condicoesRenovacao,
  criteriosDescredenciamento,
  updateCredenciamentoRules
}) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="font-montserrat font-semibold text-lg text-lumen-blue flex items-center">
          <Users className="w-5 h-5 mr-2 text-lumen-gold" />
          5. Condições Específicas do Credenciamento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1">Prazo de Validade do Credenciamento</Label>
          <Input 
            value={prazoValidadeCredenciamento || '24 meses'}
            onChange={(e) => updateCredenciamentoRules({ prazoValidadeCredenciamento: e.target.value })}
            className="w-full mt-1 focus:ring-2 focus:ring-lumen-blue"
            placeholder="Ex: 24 meses"
          />
          <InfoAlert>Prazo padrão de 24 meses conforme boas práticas.</InfoAlert>
        </div>

        <div className="border border-green-200 p-3 rounded-lg bg-green-50">
          <Label className="text-sm font-medium text-gray-700 mb-1">Prazo para Manifestação do Interesse *</Label>
          <Input 
            type="number"
            value={prazoManifestacao || "8"}
            onChange={(e) => updateCredenciamentoRules({ prazoManifestacao: e.target.value })}
            className="w-full mt-1 focus:ring-2 focus:ring-lumen-blue"
            placeholder="Dias úteis (mínimo 8)"
            min="8"
          />
          <InfoAlert>Prazo mínimo de 8 dias úteis conforme Art. 79, § 4º da Lei 14.133/21.</InfoAlert>
        </div>
        
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1">Condições de Renovação</Label>
          <Textarea 
            value={condicoesRenovacao || 'Renovação automática por períodos iguais, mediante comprovação de manutenção das condições de habilitação e avaliação satisfatória de desempenho.'}
            onChange={(e) => updateCredenciamentoRules({ condicoesRenovacao: e.target.value })}
            className="w-full mt-1 focus:ring-2 focus:ring-lumen-blue"
            rows={3}
            placeholder="Descreva as condições para renovação do credenciamento..."
          />
        </div>
        
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1">Critérios de Descredenciamento</Label>
          <Textarea 
            value={criteriosDescredenciamento || 'Descumprimento de obrigações contratuais, perda das condições de habilitação, avaliação insatisfatória de desempenho, ou a pedido do credenciado mediante aviso prévio de 30 dias.'}
            onChange={(e) => updateCredenciamentoRules({ criteriosDescredenciamento: e.target.value })}
            className="w-full mt-1 focus:ring-2 focus:ring-lumen-blue"
            rows={4}
            placeholder="Descreva as hipóteses e critérios para descredenciamento..."
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CondicoesEspecificas;
