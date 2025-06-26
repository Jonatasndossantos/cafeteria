
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Progress } from '@/Components/ui/progress';
import { Shield, Users, GraduationCap, Heart, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface LRFIndicator {
  title: string;
  current: number;
  limit: number;
  projection: number;
  status: string;
  icon: any;
  description: string;
}

export const LRFSection = () => {
  const lrfIndicators: LRFIndicator[] = [
    {
      title: 'Limite Despesa com Pessoal',
      current: 48.2,
      limit: 54,
      projection: 52.1,
      status: 'warning',
      icon: Users,
      description: 'Atual: 48.2% | Limite: 54%'
    },
    {
      title: 'Aplicação em Educação',
      current: 26.8,
      limit: 25,
      projection: 27.2,
      status: 'success',
      icon: GraduationCap,
      description: 'Atual: 26.8% | Meta: 25%'
    },
    {
      title: 'Aplicação em Saúde',
      current: 16.2,
      limit: 15,
      projection: 16.8,
      status: 'success',
      icon: Heart,
      description: 'Atual: 16.2% | Meta: 15%'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'critical': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
  };

  return (
    <Card className="dashboard-card border-l-4 border-l-lumen-blue">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-lumen-blue" />
            <span className="text-xl font-bold text-gray-800">Cumprimento da LRF</span>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Conformidade
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {lrfIndicators.map((indicator, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    indicator.status === 'success' ? 'bg-green-100' : 
                    indicator.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    <indicator.icon className={`w-5 h-5 ${
                      indicator.status === 'success' ? 'text-green-600' : 
                      indicator.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">{indicator.title}</h4>
                    <p className="text-xs text-gray-600">{indicator.description}</p>
                  </div>
                </div>
                {getStatusIcon(indicator.status)}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-800">{indicator.current}%</span>
                  <span className="text-sm text-gray-600">Limite: {indicator.limit}%</span>
                </div>
                
                <div className="space-y-2">
                  <Progress 
                    value={(indicator.current / indicator.limit) * 100} 
                    className={`h-3 ${
                      indicator.status === 'success' ? '[&>div]:bg-green-500' : 
                      indicator.status === 'warning' ? '[&>div]:bg-yellow-500' : '[&>div]:bg-red-500'
                    }`}
                  />
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">
                      Margem: {indicator.status === 'success' ? '+' : ''}{(indicator.limit - indicator.current).toFixed(1)}%
                    </span>
                    <span className="text-gray-600">
                      Projeção Dez: {indicator.projection}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-yellow-800">Atenção: Projeção de Pessoal</h5>
              <p className="text-sm text-yellow-700 mt-1">
                Projeção para dezembro indica 52.1% da RCL com pessoal. Monitorar contratações e reajustes para manter conformidade com o limite de 54%.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
