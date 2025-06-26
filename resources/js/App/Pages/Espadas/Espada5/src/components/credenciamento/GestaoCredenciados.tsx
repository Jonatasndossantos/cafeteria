
import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';

interface GestaoCredenciadosProps {
  responsavelGestao: string;
  procedimentosAtualizacao: string;
  controleMonitoramento: string;
  updateGestaoData: (data: any) => void;
}

const GestaoCredenciados: React.FC<GestaoCredenciadosProps> = ({
  responsavelGestao,
  procedimentosAtualizacao,
  controleMonitoramento,
  updateGestaoData
}) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="font-montserrat font-semibold text-lg text-lumen-blue flex items-center">
          <FileText className="w-5 h-5 mr-2 text-lumen-gold" />
          7. Gestão do Cadastro de Credenciados
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1">Responsável pela Gestão do Cadastro</Label>
          <Textarea 
            value={responsavelGestao || 'Setor de Licitações e Contratos - Servidor designado pela Portaria nº XXX/XXXX'}
            onChange={(e) => updateGestaoData({ responsavelGestao: e.target.value })}
            className="w-full mt-1 focus:ring-2 focus:ring-lumen-blue"
            rows={2}
            placeholder="Identifique o setor/servidor responsável..."
          />
        </div>
        
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1">Procedimentos de Atualização</Label>
          <Textarea 
            value={procedimentosAtualizacao || 'Atualização semestral de documentos e/ou via sistema eletrônico de credenciamento, com notificação prévia aos credenciados sobre prazos e procedimentos.'}
            onChange={(e) => updateGestaoData({ procedimentosAtualizacao: e.target.value })}
            className="w-full mt-1 focus:ring-2 focus:ring-lumen-blue"
            rows={3}
            placeholder="Descreva os procedimentos para atualização..."
          />
        </div>
        
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-1">Controle e Monitoramento</Label>
          <Textarea 
            value={controleMonitoramento || 'Sistema informatizado com controle de performance e avaliação bimestral dos credenciados, incluindo indicadores de qualidade, prazo e satisfação.'}
            onChange={(e) => updateGestaoData({ controleMonitoramento: e.target.value })}
            className="w-full mt-1 focus:ring-2 focus:ring-lumen-blue"
            rows={3}
            placeholder="Descreva os mecanismos de controle..."
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default GestaoCredenciados;
