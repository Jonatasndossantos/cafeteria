import React, { useState } from 'react';
import { FiltrosAvancados } from '@/Components/portalTransparencia/FiltrosAvancados';
import { VisualizacaoTabela } from '@/Components/portalTransparencia/VisualizacaoTabela';
import { Button } from '@/Components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { VisualizacaoTipo } from '@/types/portalTransparencia';
import { Table } from 'lucide-react';
// @ts-ignore
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { useQuery } from '@tanstack/react-query';
import { usePortalTransparencia } from '@/hooks/usePortalTransparencia';
import axios from 'axios';

interface Setor {
  id: number;
  nome: string;
  sigla: string;
}

interface Processo {
  id: number;
  numero_processo: string;
  modalidade: string;
  data: string;
  objeto: string;
  setor_id: number;
  tipo: string;
  secretaria: string;
  numero_documento: string;
  status: string;
  tags: string[];
  autenticidade: {
    nivel: 'Válida' | 'Parcial' | 'Pendente' | 'Inválida';
    assinaturaDigital: boolean;
  };
  created_at: string;
  updated_at: string;
  setor?: {
    id: number;
    nome: string;
    sigla: string;
  };
}

interface Props {
  processos?: Processo[];
}

const Documentos = ({ processos = [] }: Props) => {
  const { data: processosData } = useQuery<Processo[]>({
    queryKey: ['processos'],
    queryFn: () => {
      return processos;
    }
  });

  // Buscar setores da API
  const { data: setores = [], isLoading: setoresLoading } = useQuery<Setor[]>({
    queryKey: ['setores'],
    queryFn: async () => {
      const response = await axios.get('/api/setores-public');
      return response.data;
    }
  });

  console.log('Processos recebidos no componente:', processos);
  console.log('ProcessosData do useQuery:', processosData);

  const [visualizacao, setVisualizacao] = useState<VisualizacaoTipo>('Tabela');
  
  // Usar o hook personalizado para gerenciar filtros e dados
  const { filtros, setFiltros, documentosFiltrados, totalDocumentos, totalFiltrados } = usePortalTransparencia(processos);

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Portal da Transparência</h1>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  {totalFiltrados} de {totalDocumentos} documento{totalDocumentos !== 1 ? 's' : ''} encontrado{totalFiltrados !== 1 ? 's' : ''}
                </span>
                <Tabs value={visualizacao} onValueChange={(value) => setVisualizacao(value as VisualizacaoTipo)}>
                  <TabsList>
                    <TabsTrigger value="Tabela" className="flex items-center gap-2">
                      <Table className="w-4 h-4" />
                      <span className="hidden sm:inline">Tabela</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="mb-8">
            <FiltrosAvancados
              filtros={filtros}
              onFiltrosChange={setFiltros}
              setores={setores}
            />
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-lg shadow">
            <Tabs defaultValue="Tabela">
              <TabsContent value="Tabela">
                <VisualizacaoTabela
                  documentos={documentosFiltrados}
                />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </AuthenticatedLayout>
  );
};

export default Documentos;
