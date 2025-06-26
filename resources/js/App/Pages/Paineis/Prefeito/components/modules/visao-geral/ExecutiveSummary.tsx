
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';

export const ExecutiveSummary = () => {
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle>📋 Resumo Executivo - Hoje</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 leading-relaxed">
            <strong>Destaque do dia:</strong> A execução orçamentária mantém-se em 78.5%, com excelente performance 
            nas aplicações constitucionais em Educação (26.8%) e Saúde (16.2%), ambas acima dos limites mínimos. 
            A receita municipal apresenta crescimento de 5.2% em relação ao mesmo período do ano anterior.
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            <strong>Atenção necessária:</strong> Identificamos risco potencial no limite de despesa com pessoal 
            para o final do exercício. Recomenda-se monitoramento próximo e eventual contenção de novas contratações.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
