
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Progress } from '@/Components/ui/progress';
import { Button } from '@/Components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/Components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Building2, Users, TrendingUp, Award, MessageSquare, Calendar } from 'lucide-react';

export const Secretarias = () => {
  const secretarias = [
    {
      id: 1,
      nome: 'Secretaria de Saúde',
      secretario: 'Dr. Maria Santos',
      orcamento: 12500000,
      execucao: 78,
      metas: 85,
      satisfacao: 92,
      funcionarios: 450,
      projetos: 12,
      status: 'Excelente',
      cor: '#10B981'
    },
    {
      id: 2,
      nome: 'Secretaria de Educação',
      secretario: 'Prof. João Silva',
      orcamento: 18200000,
      execucao: 82,
      metas: 79,
      satisfacao: 88,
      funcionarios: 780,
      projetos: 15,
      status: 'Bom',
      cor: '#3B82F6'
    },
    {
      id: 3,
      nome: 'Secretaria de Obras',
      secretario: 'Eng. Carlos Lima',
      orcamento: 8900000,
      execucao: 65,
      metas: 72,
      satisfacao: 76,
      funcionarios: 320,
      projetos: 25,
      status: 'Regular',
      cor: '#F59E0B'
    },
    {
      id: 4,
      nome: 'Secretaria de Assistência Social',
      secretario: 'Dra. Ana Costa',
      orcamento: 5600000,
      execucao: 89,
      metas: 95,
      satisfacao: 94,
      funcionarios: 180,
      projetos: 8,
      status: 'Excelente',
      cor: '#8B5CF6'
    },
    {
      id: 5,
      nome: 'Secretaria de Meio Ambiente',
      secretario: 'Biol. Pedro Oliveira',
      orcamento: 2800000,
      execucao: 71,
      metas: 68,
      satisfacao: 81,
      funcionarios: 95,
      projetos: 6,
      status: 'Regular',
      cor: '#059669'
    }
  ];

  const chartData = secretarias.map(sec => ({
    nome: sec.nome.replace('Secretaria de ', ''),
    execucao: sec.execucao,
    metas: sec.metas,
    satisfacao: sec.satisfacao
  }));

  const orcamentoData = secretarias.map(sec => ({
    nome: sec.nome.replace('Secretaria de ', ''),
    orcamento: sec.orcamento / 1000000,
    execucao: (sec.orcamento * sec.execucao / 100) / 1000000
  }));

  const getStatusColor = (status) => {
    switch (status) {
      case 'Excelente': return 'bg-green-100 text-green-800';
      case 'Bom': return 'bg-blue-100 text-blue-800';
      case 'Regular': return 'bg-yellow-100 text-yellow-800';
      case 'Crítico': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalOrcamento = secretarias.reduce((acc, sec) => acc + sec.orcamento, 0);
  const totalFuncionarios = secretarias.reduce((acc, sec) => acc + sec.funcionarios, 0);
  const mediaExecucao = secretarias.reduce((acc, sec) => acc + sec.execucao, 0) / secretarias.length;

  return (
    <div className="space-y-6">
      {/* Header com KPIs gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="dashboard-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total de Secretarias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-lumen-blue" />
              <span className="text-2xl font-bold text-lumen-blue">{secretarias.length}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Orçamento Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-lumen-gold" />
              <span className="text-2xl font-bold text-lumen-blue">
                R$ {(totalOrcamento / 1000000).toFixed(1)}M
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Funcionários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold text-lumen-blue">{totalFuncionarios}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Execução Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-purple-600" />
              <span className="text-2xl font-bold text-lumen-blue">{mediaExecucao.toFixed(0)}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="ranking">Ranking</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Execução Orçamentária por Secretaria</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={orcamentoData}>
                      <XAxis dataKey="nome" />
                      <YAxis />
                      <ChartTooltip />
                      <Bar dataKey="orcamento" fill="#3B82F6" name="Orçamento (M)" />
                      <Bar dataKey="execucao" fill="#10B981" name="Executado (M)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Indicadores de Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}}>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <XAxis dataKey="nome" />
                      <YAxis />
                      <ChartTooltip />
                      <Line type="monotone" dataKey="execucao" stroke="#3B82F6" name="Execução %" />
                      <Line type="monotone" dataKey="metas" stroke="#10B981" name="Metas %" />
                      <Line type="monotone" dataKey="satisfacao" stroke="#F59E0B" name="Satisfação %" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Secretarias - Resumo Detalhado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {secretarias.map((sec) => (
                  <div key={sec.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-lumen-blue">{sec.nome}</h3>
                        <p className="text-gray-600">Secretário(a): {sec.secretario}</p>
                      </div>
                      <Badge className={getStatusColor(sec.status)}>
                        {sec.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Orçamento</p>
                        <p className="font-semibold text-lumen-blue">
                          R$ {(sec.orcamento / 1000000).toFixed(1)}M
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Funcionários</p>
                        <p className="font-medium">{sec.funcionarios}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Projetos Ativos</p>
                        <p className="font-medium">{sec.projetos}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Satisfação</p>
                        <p className="font-medium">{sec.satisfacao}%</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Execução Orçamentária</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={sec.execucao} className="flex-1" />
                          <span className="text-sm font-medium">{sec.execucao}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Cumprimento de Metas</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={sec.metas} className="flex-1" />
                          <span className="text-sm font-medium">{sec.metas}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {secretarias.slice(0, 3).map((sec) => (
              <Card key={sec.id} className="dashboard-card">
                <CardHeader>
                  <CardTitle className="text-lg">{sec.nome.replace('Secretaria de ', '')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Performance Geral</span>
                      <Badge className={getStatusColor(sec.status)}>{sec.status}</Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Execução</span>
                          <span>{sec.execucao}%</span>
                        </div>
                        <Progress value={sec.execucao} />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Metas</span>
                          <span>{sec.metas}%</span>
                        </div>
                        <Progress value={sec.metas} />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Satisfação</span>
                          <span>{sec.satisfacao}%</span>
                        </div>
                        <Progress value={sec.satisfacao} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ranking" className="space-y-4">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Ranking de Performance das Secretarias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {secretarias
                  .sort((a, b) => (b.execucao + b.metas + b.satisfacao) - (a.execucao + a.metas + a.satisfacao))
                  .map((sec, index) => (
                    <div key={sec.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-lumen-blue text-white font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lumen-blue">{sec.nome}</h3>
                        <p className="text-sm text-gray-600">{sec.secretario}</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-lg text-lumen-blue">
                          {((sec.execucao + sec.metas + sec.satisfacao) / 3).toFixed(0)}
                        </p>
                        <p className="text-xs text-gray-600">Score Geral</p>
                      </div>
                      <Badge className={getStatusColor(sec.status)}>
                        {sec.status}
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
