import React, { useState } from 'react';
import { FiltrosAvancados } from '@/Components/portalTransparencia/FiltrosAvancados';
import { VisualizacaoTabela } from '@/Components/portalTransparencia/VisualizacaoTabela';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { VisualizacaoTipo } from '@/types/portalTransparencia';
import { Table } from 'lucide-react';
// @ts-ignore
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePortalTransparencia } from '@/hooks/usePortalTransparencia';
import { Link } from '@inertiajs/react';

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

  //console.log('Processos recebidos no componente:', processos);
  //console.log('Setores recebidos no componente:', setores);

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
              <h1 className="text-2xl font-bold">Portal da Transparência</h1>
              <div className="flex gap-4 items-center">
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
        {/* Botão fixo inferior direito */}
        <Link
          href="/processos"
          className="fixed bottom-6 right-6 z-50 px-6 py-4 rounded-full bg-[#D09290] text-white font-bold shadow-lg hover:bg-[#4E1F14] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D09290] focus:ring-offset-2"
          aria-label="Nova Solicitação"
        >
          Nova Solicitação
        </Link>
      </div>
    </AuthenticatedLayout>
  );
};

export default Documentos;
