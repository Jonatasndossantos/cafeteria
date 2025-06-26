
import React from 'react';
import { Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';

const ObservacoesLegais = () => {
  return (
    <Card className="shadow-md bg-yellow-50 border-yellow-200">
      <CardHeader>
        <CardTitle className="font-montserrat font-semibold text-lg text-lumen-blue flex items-center">
          <Info className="w-5 h-5 mr-2 text-lumen-gold" />
          8. Observações Legais sobre Credenciamento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-lumen-gold rounded-full mt-2"></div>
            <p><strong>Art. 79, § 1º:</strong> O credenciamento deve observar os princípios da isonomia, impessoalidade e moralidade.</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-lumen-gold rounded-full mt-2"></div>
            <p><strong>Art. 79, § 2º:</strong> A chamada pública para credenciamento deve ser amplamente divulgada.</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-lumen-gold rounded-full mt-2"></div>
            <p><strong>Art. 79, § 3º:</strong> O credenciamento não gera direito subjetivo à contratação.</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-lumen-gold rounded-full mt-2"></div>
            <p><strong>Art. 79, § 4º:</strong> Deve ser estabelecido prazo para manifestação de interesse não inferior a 8 dias úteis.</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-lumen-gold rounded-full mt-2"></div>
            <p><strong>Art. 79, § 5º:</strong> O credenciamento permite contratação paralela e não excludente de fornecedores.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ObservacoesLegais;
