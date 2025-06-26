import React, { useState } from 'react';
import { FiltrosAvancados } from '@/Components/portalTransparencia/FiltrosAvancados';
import { VisualizacaoTabela } from '@/Components/portalTransparencia/VisualizacaoTabela';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { VisualizacaoTipo } from '@/types/portalTransparencia';
import { Table, Plus } from 'lucide-react';
// @ts-ignore
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { useQuery } from '@tanstack/react-query';
import { usePortalTransparencia } from '@/hooks/usePortalTransparencia';

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
  setores?: Setor[];
}

const Documentos = ({ processos = [], setores = [] }: Props) => {

  console.log('Processos recebidos no componente:', processos);
  console.log('Setores recebidos no componente:', setores);

  const [visualizacao, setVisualizacao] = useState<VisualizacaoTipo>('Tabela');

  // Usar o hook personalizado para gerenciar filtros e dados
  const { filtros, setFiltros, documentosFiltrados, totalDocumentos, totalFiltrados } = usePortalTransparencia(processos);

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-gray-100">
        <main className="container px-4 py-8 mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center">

              <span className="text-sm text-gray-500">
                {totalFiltrados} de {totalDocumentos} documento{totalDocumentos !== 1 ? 's' : ''} encontrado{totalFiltrados !== 1 ? 's' : ''}
              </span>
              <Tabs value={visualizacao} onValueChange={(value) => setVisualizacao(value as VisualizacaoTipo)}>
                <TabsList>
                  <TabsTrigger value="Tabela" className="flex gap-2 items-center">
                    <Table className="w-4 h-4" />
                    <span className="hidden sm:inline">Tabela</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
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

          {/* Botão flutuante Novo Processo */}
          <Button
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#4E1F14] text-white hover:bg-[#4E1F14]/90 shadow-lg rounded-full px-6 py-4 text-base"
            style={{ minWidth: 0 }}
            onClick={() => window.location.href = '/processos/create'}
            aria-label="Novo Processo"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Nova Solicitação</span>
          </Button>
        </main>
      </div>
    </AuthenticatedLayout>
  );
};

export default Documentos;
