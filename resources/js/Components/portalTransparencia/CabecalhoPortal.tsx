
import React from 'react';
import { MetricasTransparencia } from '@/types/portalTransparencia';
import { Shield, FileText, Clock, TrendingUp } from 'lucide-react';

interface CabecalhoPortalProps {
  metricas: MetricasTransparencia;
}

export const CabecalhoPortal = ({ metricas }: CabecalhoPortalProps) => {
  return (
    <div className="bg-gradient-to-r from-[#0A3D62] to-[#1e5a8b] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Título Principal */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Portal de Documentos LUMEN
          </h1>
          <p className="text-lg opacity-90">
            Acesso público a documentos de processos licitatórios
          </p>
        </div>

        {/* Estatísticas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <FileText className="h-6 w-6 mr-2" />
              <span className="text-sm font-medium">Total de Documentos</span>
            </div>
            <div className="text-2xl font-bold">{metricas.totalDocumentos.toLocaleString()}</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Shield className="h-6 w-6 mr-2" />
              <span className="text-sm font-medium">Total de Processos</span>
            </div>
            <div className="text-2xl font-bold">{metricas.totalProcessos}</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-6 w-6 mr-2" />
              <span className="text-sm font-medium">Transparência Média</span>
            </div>
            <div className="text-2xl font-bold">{metricas.processoCompletosPorcentual}%</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-6 w-6 mr-2" />
              <span className="text-sm font-medium">Tempo Médio Publicação</span>
            </div>
            <div className="text-2xl font-bold">{metricas.tempoMedioPublicacao} dias</div>
          </div>
        </div>

        {/* Atualização */}
        <div className="text-center text-sm opacity-75">
          Última atualização: {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};
