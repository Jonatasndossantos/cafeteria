
import React from 'react';
import { Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';

const CredenciamentoNaoAplicavel = () => {
  return (
    <Card className="shadow-md bg-gray-50 border-gray-200">
      <CardHeader>
        <CardTitle className="font-montserrat font-semibold text-lg text-gray-600 flex items-center">
          <Info className="w-5 h-5 mr-2" />
          Credenciamento Não Aplicável
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          Para esta licitação, o credenciamento não será utilizado. O processo seguirá o modelo tradicional 
          de licitação com apresentação de propostas e habilitação conforme as regras definidas no edital.
        </p>
      </CardContent>
    </Card>
  );
};

export default CredenciamentoNaoAplicavel;
