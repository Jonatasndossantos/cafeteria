
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { AlertTriangle, Lightbulb, FileText, Clock, DollarSign, Scale } from 'lucide-react';

interface Alerta {
  id: number;
  tipo: 'critico' | 'aviso';
  categoria: 'obra' | 'convenio';
  titulo: string;
  descricao: string;
  acao?: string;
}

interface Recomendacao {
  id: number;
  titulo: string;
  descricao: string;
  prioridade: 'alta' | 'media' | 'baixa';
  categoria: string;
}

export const AlertasCriticosRecomendacoes = () => {
  const alertas: Alerta[] = [
    {
      id: 1,
      tipo: 'critico',
      categoria: 'obra',
      titulo: 'UBS Jardim Esperança: obra atrasada em 60 dias',
      descricao: 'Risco de penalidades contratuais e impacto na prestação de serviços de saúde',
      acao: 'Revisar cronograma e renegociar prazo'
    },
    {
      id: 2,
      tipo: 'aviso',
      categoria: 'obra',
      titulo: 'Pavimentação Avenida Principal: risco de estouro de orçamento em 15%',
      descricao: 'Necessário reajuste de valores ou redimensionamento do escopo',
      acao: 'Avaliar aditivo contratual'
    },
    {
      id: 3,
      tipo: 'critico',
      categoria: 'convenio',
      titulo: 'Convênio FNDE com prazo final se encerrando em 18 dias',
      descricao: 'Risco de perda de recursos federais por não execução',
      acao: 'Solicitar aditivo urgente'
    },
    {
      id: 4,
      tipo: 'aviso',
      categoria: 'convenio',
      titulo: 'Prestação de contas do Convênio MS pendente',
      descricao: 'Documentação em análise há 45 dias',
      acao: 'Acompanhar junto ao órgão concedente'
    }
  ];

  const recomendacoes: Recomendacao[] = [
    {
      id: 1,
      titulo: 'Priorizar renegociação de prazo da obra UBS',
      descricao: 'Agendar reunião com construtora para definir novo cronograma físico-financeiro',
      prioridade: 'alta',
      categoria: 'Gestão de Contratos'
    },
    {
      id: 2,
      titulo: 'Iniciar processo de aditivo do Convênio FNDE',
      descricao: 'Preparar documentação técnica para solicitação de prorrogação de prazo',
      prioridade: 'alta',
      categoria: 'Convênios'
    },
    {
      id: 3,
      titulo: 'Auditar contrato da pavimentação',
      descricao: 'Revisar planilha orçamentária e verificar adequação dos preços unitários',
      prioridade: 'media',
      categoria: 'Controle Interno'
    },
    {
      id: 4,
      titulo: 'Implementar sistema de monitoramento semanal',
      descricao: 'Criar rotina de acompanhamento físico-financeiro para todas as obras',
      prioridade: 'media',
      categoria: 'Gestão'
    }
  ];

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'critico': return 'bg-red-100 text-red-800 border-red-200';
      case 'aviso': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Alertas Críticos */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-700">
            <AlertTriangle className="h-5 w-5" />
            <span>Alertas Críticos</span>
            <Badge className="bg-red-100 text-red-800">{alertas.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alertas.map((alerta) => (
              <div 
                key={alerta.id} 
                className={`border rounded-lg p-4 ${getTipoColor(alerta.tipo)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm">{alerta.titulo}</h4>
                  <Badge variant="outline" className="text-xs">
                    {alerta.categoria === 'obra' ? '🏗️' : '📄'}
                  </Badge>
                </div>
                <p className="text-sm opacity-80 mb-3">{alerta.descricao}</p>
                {alerta.acao && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">💡 Ação Sugerida:</span>
                    <Button size="sm" variant="outline" className="text-xs h-8">
                      {alerta.acao}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recomendações IA-LUX */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lumen-blue">
            <Lightbulb className="h-5 w-5" />
            <span>Recomendações IA-LUX</span>
            <Badge className="ia-lux-gradient text-lumen-blue">{recomendacoes.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recomendacoes.map((rec) => (
              <div 
                key={rec.id} 
                className="border border-blue-200 rounded-lg p-4 bg-blue-50/50"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm text-lumen-blue">{rec.titulo}</h4>
                  <Badge className={getPrioridadeColor(rec.prioridade)}>
                    {rec.prioridade}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 mb-2">{rec.descricao}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded">
                    {rec.categoria}
                  </span>
                  <Button size="sm" className="bg-lumen-blue hover:bg-lumen-blue-dark text-white text-xs h-8">
                    Implementar
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="pt-4 border-t border-blue-200">
              <Button className="w-full ia-lux-gradient text-lumen-blue hover:opacity-90">
                <FileText className="h-4 w-4 mr-2" />
                🤖 Gerar Plano de Ação Completo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
