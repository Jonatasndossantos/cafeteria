
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Progress } from '@/Components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Target, Clock, Users, AlertTriangle, CheckCircle, Calendar, Flag } from 'lucide-react';

export const Prioridades = () => {
  const [selectedCategory, setSelectedCategory] = useState('todas');

  const prioridades = [
    {
      id: 1,
      titulo: 'Implantação do Hospital Municipal',
      categoria: 'Saúde',
      prioridade: 'Crítica',
      prazo: '2024-12-31',
      progresso: 85,
      responsavel: 'Sec. Saúde',
      status: 'Em Andamento',
      descricao: 'Finalização das obras e equipamentos do novo hospital',
      marcos: [
        { nome: 'Obras Civis', concluido: true, data: '2024-05-15' },
        { nome: 'Equipamentos', concluido: true, data: '2024-06-30' },
        { nome: 'Licenças', concluido: false, data: '2024-08-15' },
        { nome: 'Inauguração', concluido: false, data: '2024-12-31' }
      ]
    },
    {
      id: 2,
      titulo: 'Programa Educação Digital',
      categoria: 'Educação',
      prioridade: 'Alta',
      prazo: '2024-09-30',
      progresso: 60,
      responsavel: 'Sec. Educação',
      status: 'Em Andamento',
      descricao: 'Implementação de tablets em todas as escolas municipais',
      marcos: [
        { nome: 'Licitação', concluido: true, data: '2024-03-15' },
        { nome: 'Compra Equipamentos', concluido: true, data: '2024-05-30' },
        { nome: 'Treinamento Professores', concluido: false, data: '2024-08-15' },
        { nome: 'Implementação', concluido: false, data: '2024-09-30' }
      ]
    },
    {
      id: 3,
      titulo: 'Revitalização do Centro Histórico',
      categoria: 'Obras',
      prioridade: 'Média',
      prazo: '2025-03-31',
      progresso: 35,
      responsavel: 'Sec. Obras',
      status: 'Em Andamento',
      descricao: 'Restauração de fachadas e infraestrutura do centro',
      marcos: [
        { nome: 'Projeto Executivo', concluido: true, data: '2024-02-28' },
        { nome: 'Licitação', concluido: false, data: '2024-07-15' },
        { nome: 'Início das Obras', concluido: false, data: '2024-09-01' },
        { nome: 'Conclusão', concluido: false, data: '2025-03-31' }
      ]
    },
    {
      id: 4,
      titulo: 'Ampliação da Rede de CRAS',
      categoria: 'Assistência Social',
      prioridade: 'Alta',
      prazo: '2024-11-30',
      progresso: 70,
      responsavel: 'Sec. Assistência Social',
      status: 'Em Andamento',
      descricao: 'Construção de 3 novos CRAS nos bairros periféricos',
      marcos: [
        { nome: 'Terrenos Definidos', concluido: true, data: '2024-01-30' },
        { nome: 'Projetos Aprovados', concluido: true, data: '2024-04-15' },
        { nome: 'Obras Iniciadas', concluido: true, data: '2024-06-01' },
        { nome: 'Inauguração', concluido: false, data: '2024-11-30' }
      ]
    }
  ];

  const decisoesPendentes = [
    {
      id: 1,
      titulo: 'Aprovação do Novo Código de Obras',
      urgencia: 'Alta',
      prazo: '2024-06-20',
      contexto: 'Adequação às normas federais de acessibilidade'
    },
    {
      id: 2,
      titulo: 'Autorização para Contratação Emergencial',
      urgencia: 'Crítica',
      prazo: '2024-06-15',
      contexto: 'Contratação de médicos para o pronto socorro'
    },
    {
      id: 3,
      titulo: 'Aprovação do Plano de Mobilidade Urbana',
      urgencia: 'Média',
      prazo: '2024-07-01',
      contexto: 'Implementação de ciclofaixas e faixas exclusivas'
    }
  ];

  const metasPlanoGoverno = [
    { area: 'Saúde', meta: 'Reduzir tempo de espera em 50%', progresso: 78 },
    { area: 'Educação', meta: 'IDEB acima de 6.0', progresso: 65 },
    { area: 'Segurança', meta: 'Reduzir criminalidade em 30%', progresso: 82 },
    { area: 'Infraestrutura', meta: '80% das ruas pavimentadas', progresso: 45 }
  ];

  const getPrioridadeColor = (prioridade) => {
    switch (prioridade) {
      case 'Crítica': return 'bg-red-100 text-red-800';
      case 'Alta': return 'bg-orange-100 text-orange-800';
      case 'Média': return 'bg-yellow-100 text-yellow-800';
      case 'Baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgenciaColor = (urgencia) => {
    switch (urgencia) {
      case 'Crítica': return 'bg-red-100 text-red-800';
      case 'Alta': return 'bg-orange-100 text-orange-800';
      case 'Média': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPrioridades = selectedCategory === 'todas' 
    ? prioridades 
    : prioridades.filter(p => p.categoria === selectedCategory);

  const categorias = ['todas', ...new Set(prioridades.map(p => p.categoria))];

  return (
    <div className="space-y-6">
      {/* Header com KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="dashboard-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Projetos Prioritários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-lumen-blue" />
              <span className="text-2xl font-bold text-lumen-blue">{prioridades.length}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Decisões Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <span className="text-2xl font-bold text-orange-600">{decisoesPendentes.length}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Projetos Críticos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span className="text-2xl font-bold text-red-600">2</span>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Metas do Plano</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Flag className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold text-green-600">67%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projetos" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="projetos">Projetos Estratégicos</TabsTrigger>
          <TabsTrigger value="decisoes">Decisões Pendentes</TabsTrigger>
          <TabsTrigger value="plano">Plano de Governo</TabsTrigger>
        </TabsList>

        <TabsContent value="projetos" className="space-y-4">
          <Card className="dashboard-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Projetos Prioritários em Andamento</span>
                </CardTitle>
                <div className="flex space-x-2">
                  {categorias.map((cat) => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(cat)}
                      className="capitalize"
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredPrioridades.map((projeto) => (
                  <div key={projeto.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-xl text-lumen-blue">{projeto.titulo}</h3>
                        <p className="text-gray-600 mt-1">{projeto.descricao}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                          <span className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{projeto.responsavel}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Prazo: {new Date(projeto.prazo).toLocaleDateString('pt-BR')}</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={getPrioridadeColor(projeto.prioridade)}>
                          {projeto.prioridade}
                        </Badge>
                        <Badge variant="outline">
                          {projeto.categoria}
                        </Badge>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Progresso Geral</span>
                        <span className="font-bold text-lumen-blue">{projeto.progresso}%</span>
                      </div>
                      <Progress value={projeto.progresso} className="h-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {projeto.marcos.map((marco, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            marco.concluido ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            {marco.concluido && <CheckCircle className="h-4 w-4 text-white" />}
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${
                              marco.concluido ? 'text-green-800' : 'text-gray-700'
                            }`}>
                              {marco.nome}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(marco.data).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="decisoes" className="space-y-4">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Decisões Aguardando Aprovação</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {decisoesPendentes.map((decisao) => (
                  <div key={decisao.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-lumen-blue">{decisao.titulo}</h3>
                        <p className="text-gray-600 mt-1">{decisao.contexto}</p>
                      </div>
                      <Badge className={getUrgenciaColor(decisao.urgencia)}>
                        {decisao.urgencia}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Prazo: {new Date(decisao.prazo).toLocaleDateString('pt-BR')}
                      </span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Revisar
                        </Button>
                        <Button size="sm" className="bg-lumen-blue hover:bg-lumen-blue-light">
                          Aprovar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plano" className="space-y-4">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Flag className="h-5 w-5" />
                <span>Acompanhamento do Plano de Governo</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {metasPlanoGoverno.map((meta, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-lumen-blue">{meta.area}</h3>
                        <p className="text-gray-600">{meta.meta}</p>
                      </div>
                      <span className="text-lg font-bold text-lumen-blue">{meta.progresso}%</span>
                    </div>
                    <Progress value={meta.progresso} className="h-2" />
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-lumen-blue mb-3">📊 Resumo Executivo do Mandato</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">Compromissos do Plano</p>
                    <p className="text-2xl font-bold text-lumen-blue">127</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Já Cumpridos</p>
                    <p className="text-2xl font-bold text-green-600">85</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Em Andamento</p>
                    <p className="text-2xl font-bold text-orange-600">42</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
