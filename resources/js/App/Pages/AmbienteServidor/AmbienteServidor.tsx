import React, { useMemo, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Header } from '@/Components/Header';
import { Footer } from '@/Components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Button } from '@/Components/ui/button';
import { Clipboard, FileText, Shield, BarChart3, MessageCircle, Settings, ArrowLeft, Plus } from 'lucide-react';
import { router } from '@inertiajs/react';
import {
  usuarioAtual,
  notificacoes,
  espadas,
  tarefasPendentes,
  alertasCriticos,
  legislacaoMunicipal,
  modulos
} from '../../hooks/AmbienteServidorData/mockData';
import { usuario } from '../../hooks/AmbienteServidorData/ambienteServidorData';
import { MinhasDemandas } from '../../Components/ambienteServidor/MinhasDemandas';
import { PainelProcessos } from '../../Components/ambienteServidor/components/PainelProcessos';
import { ChatMensagens } from '../../Components/ambienteServidor/ChatMensagens';
import { Relatorios } from '../../Components/ambienteServidor/Relatorios';
import { ConfiguracoesServidor } from '../../Components/ambienteServidor/ConfiguracoesServidor';
import { FiltrosPortal, TipoDocumento, VisualizacaoTipo, StatusDocumento, OrigemDocumento } from '@/types/portalTransparencia';
import { useQuery } from '@tanstack/react-query';

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

const AmbienteServidor = ({ processos = [] }: Props) => {
  const { data: processosData } = useQuery<Processo[]>({
    queryKey: ['processos'],
    queryFn: () => {
      return processos;
    }
  });

  const [visualizacao, setVisualizacao] = useState<VisualizacaoTipo>('Tabela');
  const [filtros, setFiltros] = useState<FiltrosPortal>({
    periodo: { inicio: '', fim: '' },
    tipoDocumento: 'Todos',
    modalidade: 'Todos',
    objeto: '',
    secretaria: 'Todas',
    status: 'Todos',
    espada: 'Todas',
    origem: 'Todas',
    statusAutenticacao: 'Todos',
    busca: '',
    tags: []
  });

  // Convert processos to DocumentoPublico format
  const documentosFiltrados = useMemo(() => {
    // console.log('Convertendo processos:', processos); // Debug log

    if (!processos || processos.length === 0) {
      console.log('Nenhum processo encontrado'); // Debug log
      return [];
    }

    const documentos = processos.map(processo => {
    //   console.log('Processando processo:', processo); // Debug log

      return {
        id: processo.id.toString(),
        numeroProcesso: processo.numero_processo,
        numeroDocumento: processo.numero_documento,
        tipo: processo.tipo as TipoDocumento,
        nome: processo.objeto,
        descricao: '',
        dataCriacao: processo.created_at,
        dataPublicacao: processo.data,
        objeto: processo.objeto,
        secretaria: processo.setor?.nome || processo.secretaria,
        modalidade: processo.modalidade,
        status: processo.status as StatusDocumento,
        espada: 1,
        origem: 'Criado na LUMEN' as OrigemDocumento,
        autenticidade: {
          nivel: processo.autenticidade?.nivel || 'Pendente',
          assinaturaDigital: processo.autenticidade?.assinaturaDigital || false,
          certificadoICP: false,
          hashVerificado: true,
          dataVerificacao: new Date().toISOString()
        },
        assinaturas: [],
        documentosRelacionados: [],
        tags: processo.tags || [],
        urlVisualizacao: `/documentos/${processo.numero_processo}`,
        urlDownload: `/api/documentos/${processo.numero_processo}/download`,
        versao: '1.0',
        hash: '',
        tempoPublicacao: 0,
        valor: 0 // Adding valor field
      };
    });


    return documentos.filter(documento => {
      // Filtro por tipo
      if (filtros.tipoDocumento !== 'Todos' && documento.tipo !== filtros.tipoDocumento) {
        return false;
      }

      // Filtro por modalidade
      if (filtros.modalidade !== 'Todos' && documento.modalidade !== filtros.modalidade) {
        return false;
      }

      // Filtro por secretaria
      if (filtros.secretaria !== 'Todas' && documento.secretaria !== filtros.secretaria) {
        return false;
      }

      // Filtro por status
      if (filtros.status !== 'Todos' && documento.status !== filtros.status) {
        return false;
      }

      // Filtro por período
      if (filtros.periodo.inicio && documento.dataPublicacao < filtros.periodo.inicio) {
        return false;
      }
      if (filtros.periodo.fim && documento.dataPublicacao > filtros.periodo.fim) {
        return false;
      }

      // Filtro por busca
      if (filtros.busca) {
        const busca = filtros.busca.toLowerCase();
        return (
          documento.numeroProcesso.toLowerCase().includes(busca) ||
          documento.objeto.toLowerCase().includes(busca) ||
          documento.secretaria.toLowerCase().includes(busca)
        );
      }

      return true;
    });
  }, [processos, filtros]);

  // console.log('AmbienteServidor montado');
  const [abaSelecionada, setAbaSelecionada] = useState('processos');
  const [perfilUsuario] = useState('master');
  const [conformidadeMunicipio] = useState(78);

  return (
    <AuthenticatedLayout>

    <div className="flex flex-col min-h-screen bg-gray-50">


      <div className="flex flex-1">
        <main className="flex-1">
          <div className="min-h-screen bg-[#f8fafc]">
            {/* Cabeçalho com informações do servidor */}
            <header className="px-6 py-4 bg-white border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex gap-2 items-center"
                    onClick={() => router.visit('/documentos')}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Menu Principal
                  </Button>
                  <div>
                    <h1 className="text-2xl font-bold text-[#0A3D62]">Ambiente do Servidor</h1>
                    <p className="text-gray-600">Bem-vindo, {usuario.nome} – {usuario.cargo} / {usuario.setor}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <Button variant="outline">Ajuda</Button>
                </div>
              </div>
            </header>

            {/* Menu de navegação principal */}
            <nav className="bg-white border-b border-gray-200">
              <div className="px-6">
                <Tabs value={abaSelecionada} onValueChange={setAbaSelecionada} className="w-full">


                  {/* Conteúdo principal */}
                  <div className="p-6">
                    {/* <TabsContent value="minhas-demandas">
                      <MinhasDemandas />
                    </TabsContent> */}

                    <TabsContent value="processos">
                      <PainelProcessos documentos={documentosFiltrados} />
                    </TabsContent>

                    {/* <TabsContent value="chat-mensagens">
                      <ChatMensagens />
                    </TabsContent> */}

                    {/* <TabsContent value="relatorios">
                      <Relatorios />
                    </TabsContent> */}

                    <TabsContent value="configuracoes">
                      <ConfiguracoesServidor />
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </nav>
          </div>
        </main>
      </div>

    </div>
    </AuthenticatedLayout>
  );
};

export default AmbienteServidor;
