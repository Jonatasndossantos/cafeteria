import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Label } from '@/Components/ui/label';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/Components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { AssinaturaDocumento } from '@/Components/ambienteServidor/components/AssinaturaDocumento';
import { EncaminharDocumento } from '@/Components/ambienteServidor/components/EncaminharDocumento';
import { useToast } from '@/hooks/use-toast';
import React, { useState, useRef, useMemo  } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion';
import { ArrowLeft, FileText, Clock, User, Building, Calendar, DollarSign, Paperclip, Eye, X, Download, PenTool, Upload, File, Send, ChevronRight, CheckCircle, AlertCircle, Circle, RefreshCw, Play } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, Link } from '@inertiajs/react';
import { useQuery, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { processosAdministrativos, secretarias, modalidades, fasesProcesso } from '@/Components/ambienteServidor/types/processosAdministrativos';
import { ProcessoAdministrativo, DocumentoProcesso, AnexoProcesso, FiltrosProcesso } from '@/Components/ambienteServidor/types/painelProcessos';

interface ProcessoDetalhadoProps {
  processo: ProcessoAdministrativo;
  onVoltar: () => void;
}

interface Processo {
  id: number;
  numero_processo: string;
  modalidade: string;
  data: Date;
  objeto: string;
  setor_id: number;
  tipo: string;
  secretaria: string;
  numero_documento: string;
  status: string;
  tags: string[];
  valor?: string;
  previsaoConclusao?: string;
  espadaAtual?: number;
  usuario?: {
    nome: string;
    setor?: {
      nome: string;
    };
  };
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

interface Arquivo {
  id: number;
  document_type: string;
  status: string;
  arquivosAtual_id?: number;
  nome?: string;
  tipo?: string;
  tamanho?: number;
  created_at?: string;
  updated_at?: string;
}

type TipoDocumento = 'Anexo' | 'Ofício' | 'Memorando' | 'Nota Fiscal' | 'Relatório de Fiscalização' | 'Parecer Jurídico' | 'Informação Orçamentária';

interface Props {
  processo?: Processo[];
  arquivos?: Arquivo[];
  arquivosAtual?: Arquivo[];
}

const Show = ({ processo = [], arquivos = [], arquivosAtual = [] }: Props) => {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <ShowContent processo={processo} arquivos={arquivos} arquivosAtual={arquivosAtual} />
    </QueryClientProvider>
  );
};

const ShowContent = ({ processo = [], arquivos = [], arquivosAtual = [] }: Props) => {
  const { data: processosData } = useQuery<Processo[]>({
    queryKey: ['processo'],
    queryFn: () => {
      return processo;
    }
  });
  const { data: arquivosData } = useQuery<Arquivo[]>({
    queryKey: ['arquivos'],
    queryFn: () => {
      return arquivos;
    }
  });
  const { data: arquivosAtualData } = useQuery<Arquivo[]>({
    queryKey: ['arquivosAtual'],
    queryFn: () => {
      return arquivosAtual;
    }
  });
  const [abaSelecionada, setAbaSelecionada] = useState('em-andamento');
  const [termoBusca, setTermoBusca] = useState('');
  const [filtros, setFiltros] = useState<FiltrosProcesso>({});
  const [processoSelecionado, setProcessoSelecionado] = useState<ProcessoAdministrativo | null>(null);
  const [mostrarFiltrosAvancados, setMostrarFiltrosAvancados] = useState(false);

  // Filtrar processos
  const processosFiltrados = useMemo(() => {
    let resultado = processosAdministrativos;

    // Filtro por status da aba
    if (abaSelecionada === 'em-andamento') {
      resultado = resultado.filter(p => p.status === 'Em Andamento');
    } else if (abaSelecionada === 'proximo-vencimento') {
      resultado = resultado.filter(p => p.status === 'Próximo ao Vencimento');
    } else if (abaSelecionada === 'concluidos') {
      resultado = resultado.filter(p => p.status === 'Concluído');
    }

    // Filtro por termo de busca
    if (termoBusca) {
      resultado = resultado.filter(p =>
        p.numero.toLowerCase().includes(termoBusca.toLowerCase()) ||
        p.objeto.toLowerCase().includes(termoBusca.toLowerCase()) ||
        p.fornecedor?.toLowerCase().includes(termoBusca.toLowerCase()) ||
        p.responsavelGestor.toLowerCase().includes(termoBusca.toLowerCase())
      );
    }

    // Aplicar filtros avançados
    if (filtros.modalidade) {
      resultado = resultado.filter(p => p.modalidade === filtros.modalidade);
    }
    if (filtros.secretaria) {
      resultado = resultado.filter(p => p.secretaria === filtros.secretaria);
    }
    if (filtros.espada) {
      resultado = resultado.filter(p => p.espadaAtual === filtros.espada);
    }

    return resultado;
  }, [abaSelecionada, termoBusca, filtros]);

  // Calcular métricas
  const metricas = useMemo(() => {
    const emAndamento = processosAdministrativos.filter(p => p.status === 'Em Andamento').length;
    const proximoVencimento = processosAdministrativos.filter(p => p.status === 'Próximo ao Vencimento').length;
    const concluidos = processosAdministrativos.filter(p => p.status === 'Concluído').length;
    const totalNotificacoes = processosAdministrativos.reduce((acc, p) => acc + p.notificacoes, 0);

    return { emAndamento, proximoVencimento, concluidos, totalNotificacoes };
  }, []);

  const handleProcessoSelect = (processo: ProcessoAdministrativo) => {
    setProcessoSelecionado(processo);
  };

  const handleVoltar = () => {
    router.visit('/espada/processos');
  };

  if (processoSelecionado) {
    return <ProcessoDetalhado processo={processoSelecionado} onVoltar={handleVoltar} />;
  }
  return(
    <Pagina processos={processosFiltrados} onProcessoSelect={handleProcessoSelect} />
  )
};

export function Pagina({ onVoltar }: ProcessoDetalhadoProps) {
  const [abaAtiva, setAbaAtiva] = useState('linha-tempo');
  const queryClient = useQueryClient();
  const processo = queryClient.getQueryData<Processo[]>(['processo']);
  const arquivos = queryClient.getQueryData<Arquivo[]>(['arquivos']);
  const arquivosAtual = queryClient.getQueryData<Arquivo[]>(['arquivosAtual']);
  const [documentoParaAssinar, setDocumentoParaAssinar] = useState<DocumentoProcesso | null>(null);
  const [documentoParaEncaminhar, setDocumentoParaEncaminhar] = useState<DocumentoProcesso | null>(null);
  const [mostrarAnexarDocumento, setMostrarAnexarDocumento] = useState(false);
  const { toast } = useToast();

  const handleRefresh = () => {
    // Atualiza os dados da página
    router.reload();
  };

  const handleContinuarEspada = (espadaNumero: number) => {
    // Navega para a próxima espada baseada no número
    const routes = {
      1: '/document/Espada1',
      2: '/document/Espada2',
      3: '/document/Espada3',
      4: '/document/Espada4',
      5: '/document/Espada5',
      6: '/document/Espada6',
      7: '/document/Espada7'
    };

    const route = routes[espadaNumero as keyof typeof routes];
    if (route) {
      router.visit(route, {
        data: {
          processo_id: processo?.id,
          espada: espadaNumero
        }
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em Andamento':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Próximo ao Vencimento':
        return 'bg-orange-50 text-orange-600 border-orange-200';
      case 'Concluído':
        return 'bg-green-50 text-green-600 border-green-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  // Função para obter o status de uma espada baseada nos arquivos
  const getStatusEspada = (espadaNumero: number): StatusEspada => {
    if (!arquivos || !Array.isArray(arquivos)) return 'pendente';

    // Procurar arquivo com document_type = "EspadaX"
    const tipoDocumento = `Espada${espadaNumero}`;

    const arquivoEspada = arquivos.find(arquivo =>
      arquivo.document_type === tipoDocumento
    );

    if (!arquivoEspada) {
      return 'pendente';
    }

    // Retorna o status baseado no campo status do arquivo
    switch (arquivoEspada.status) {
      case 'concluido':
        return 'concluido';
      case 'em andamento':
        return 'em andamento';
      case 'cancelado':
        return 'cancelado';
      default:
        return 'pendente';
    }
  };

  // Função para determinar a próxima espada que pode ser iniciada
  const getProximaEspada = (): number => {
    for (let i = 1; i <= 7; i++) {
      const status = getStatusEspada(i);
      if (status === 'pendente') {
        return i;
      }
    }
    return 7; // Todas concluídas
  };

  const proximaEspada = (getProximaEspada() -1) ;

  return (
    <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
    <div className="container p-6 mx-auto">
      {/* Cabeçalho com botão voltar */}
      <div className="flex gap-4 items-center">
        <Button variant="outline" onClick={() => router.visit('/processos')} className="flex gap-2 items-center">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Painel
        </Button>
        <div>
          <h2 className="text-xl font-semibold">Informações Gerais</h2>
        </div>
      </div>

      {/* Informações Principais do Processo? */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Processo Administrativo: {processo?.numero_processo}</span>
            <Badge variant="outline" className={getStatusColor(processo?.status || '')}>
              {processo?.status}
            </Badge>
          </CardTitle>
          <CardDescription className="flex text-sm text-gray-600"> <span className="font-semibold">Objeto: </span> {processo?.objeto}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex gap-2 items-center">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Modalidade</p>
                  <p className="text-lg font-semibold">{processo?.modalidade}</p>
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Valor</p>
                  <p className="text-lg font-semibold text-green-600">{processo?.valor}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2 items-center">
                <Building className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Secretaria</p>
                  <p className="text-lg font-semibold">{processo?.usuario?.setor?.nome}</p>
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Gestor Responsável</p>
                  <p className="text-lg font-semibold">
                    {processo?.usuario?.nome}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2 items-center">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Data de Início</p>
                  <p className="text-lg font-semibold">
                    {processo?.data ? new Date(processo.data).toLocaleDateString('pt-BR') : 'N/A'}
                  </p>
                </div>
              </div>

              {/* <div className="flex gap-2 items-center">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Previsão de Conclusão</p>
                  <p className="text-lg font-semibold">{processo?.previsaoConclusao}</p>
                </div>
              </div> */}
              <div className="flex gap-2 items-center">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Matricula Responsável</p>
                  <p className="text-lg font-semibold">{processo?.usuario?.matricula}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          {/* <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-gray-600">Tags</p>
            <div className="flex flex-wrap gap-2">
              {processo?.tags?.map((tag, index) => (
                <Badge key={index} variant="secondary">#{tag}</Badge>
              ))}
            </div>
          </div> */}
        </CardContent>
      </Card>

      {/* Status Atual da Espada */}
      <Card>
        <CardHeader>
          <CardTitle>Status das 7 Espadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="text-center">
              <div className="flex justify-center items-center mx-auto mb-2 w-12 h-12 text-lg font-bold text-blue-600 bg-blue-100 rounded-full">
                {proximaEspada}
              </div>
              <p className="text-sm font-medium">Espada Atual</p>
            </div>
            <div className="flex-1 mx-4">
              <div className="relative">
                <div className="absolute right-0 left-0 top-1/2 h-2 bg-gray-200 rounded"></div>
                <div
                  className="absolute left-0 top-1/2 h-2 bg-blue-500 rounded"
                  style={{ width: `${((proximaEspada || 0) / 7) * 100}%` }}
                ></div>
                {/* <div className="flex justify-between">
                  {[1,2,3,4,5,6,7].map(num => (
                    <div
                      key={num}
                      className={`w-4 h-4 rounded-full border-2 ${
                        num <= (processo?.espadaAtual || 0)
                          ? 'bg-blue-500 border-blue-500'
                          : num === (processo?.espadaAtual || 0) + 1
                            ? 'bg-blue-500 border-blue-500'
                            : 'bg-white border-gray-300'
                      }`}
                    ></div>
                  ))}
                </div> */}
              </div>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{Math.round(((proximaEspada || 0) / 7) * 100)}%</p>
              <p className="text-sm text-gray-500">Concluído</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Abas de Detalhamento */}
      <Tabs value={abaAtiva} onValueChange={setAbaAtiva} className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="linha-tempo">Linha do Tempo</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
        </TabsList>

        <TabsContent value="linha-tempo" className="mt-6">
          <LinhaTempoProcesso />
        </TabsContent>

        <TabsContent value="documentos" className="mt-6">
          {processo && <ArvoreDocumentos processo={processo as unknown as ProcessoAdministrativo} />}
        </TabsContent>
      </Tabs>
    </div>
    </AuthenticatedLayout>
  );
};

export const LinhaTempoProcesso = () => {
    const queryClient = useQueryClient();
    const arquivos = queryClient.getQueryData(['arquivos']);
    const arquivosAtual = queryClient.getQueryData<Arquivo[]>(['arquivosAtual']);
    const processo = queryClient.getQueryData<Processo[]>(['processo']);
    // console.log(processo);

    const handleRefresh = () => {
      // Atualiza os dados da página
      router.reload();
    };



    // Função para obter o status de uma espada baseada nos arquivos
    const getStatusEspada = (espadaNumero: number): StatusEspada => {
      if (!arquivos || !Array.isArray(arquivos)) return 'pendente';

      // Procurar arquivo com document_type = "EspadaX"
      const tipoDocumento = `Espada${espadaNumero}`;

      const arquivoEspada = arquivos.find(arquivo =>
        arquivo.document_type === tipoDocumento
      );

      if (!arquivoEspada) {
        return 'pendente';
      }

      // Retorna o status baseado no campo status do arquivo
      switch (arquivoEspada.status) {
        case 'concluido':
          return 'concluido';
        case 'em andamento':
          return 'em andamento';
        case 'cancelado':
          return 'cancelado';
        default:
          return 'pendente';
      }
    };

    // Função para determinar a próxima espada que pode ser iniciada
    const getProximaEspada = (): number => {
      for (let i = 1; i <= 7; i++) {
        const status = getStatusEspada(i);
        if (status === 'pendente') {
          return i;
        }
      }
      return 7; // Todas concluídas
    };

    // Função para verificar se uma espada está concluída
    const isEspadaConcluida = (espadaNumero: number) => {
      return getStatusEspada(espadaNumero) === 'concluido';
    };

    const proximaEspada = (getProximaEspada() -1);
    const espadasConcluidas = Array.from({length: 7}, (_, i) => i + 1).filter(num => isEspadaConcluida(num)).length;

  type StatusEspada = 'pendente' | 'em andamento' | 'concluido' | 'cancelado';

  const getStatusIcon = (status: StatusEspada) => {
    switch (status) {
      case 'concluido':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'em andamento':
        return <Clock className="w-6 h-6 text-blue-500" />;
      case 'cancelado':
        return <X className="w-6 h-6 text-red-500" />;
      default:
        return <Circle className="w-6 h-6 text-gray-300" />;
    }
  };

  const getStatusColor = (status: StatusEspada) => {
    switch (status) {
      case 'concluido':
        return 'bg-green-50 text-green-600 border-green-200 hover:bg-green-700 hover:text-white';
      case 'em andamento':
        return 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-700 hover:text-white';
      case 'cancelado':
        return 'bg-red-50 text-red-600 border-red-200 hover:bg-red-700 hover:text-white';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-700 hover:text-white';
    }
  };

  const getStatusText = (status: StatusEspada) => {
    switch (status) {
      case 'concluido':
        return 'Concluído';
      case 'em andamento':
        return 'Em Andamento';
      case 'cancelado':
        return 'Cancelado';
      default:
        return 'Pendente';
    }
  };

  const getLineColor = (status: StatusEspada) => {
    return status === 'concluido' ? 'bg-green-500' : 'bg-gray-200';
  };

  const getButtonPlanejamento = (status: StatusEspada) => {
    const planejamento = arquivos?.find(arquivo => arquivo.document_type === 'Planejamento');
    if (status === 'concluido') {
      return <div className="flex gap-3 items-center mb-2">
        <Link href={route('planejamento.show', { id: planejamento?.id })}>
          <Button variant="outline" size="sm" className="text-green-600 bg-green-50 border-green-200 hover:bg-green-700 hover:text-white">
            <Eye className="w-4 h-4" />
            Ver Planejamento
          </Button>
        </Link>
      </div>
    }
    if (status === 'em andamento') {
      return <div className="flex gap-3 items-center mb-2">
        <Link href={route('planejamento.show', { id: planejamento?.id })}>
          <Button variant="outline" size="sm" className="text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-700 hover:text-white">
            <ChevronRight className="w-4 h-4" />
            Continuar Planejamento
          </Button>
        </Link>
      </div>
    }
    if (status === 'pendente') {
      return null;
    //   <div className="flex gap-3 items-center mb-2">
    //     <Link href={route('Planejamento', {
    //       id: planejamento?.id,
    //       processo_id: processo?.id,
    //       document_type: 'Planejamento',
    //       name: 'Planejamento e Demandas'
    //     })}>
    //       <Button variant="outline" size="sm" className="text-white bg-green-700 border-green-200 hover:bg-green-800 hover:text-white">
    //         <Play className="w-4 h-4" />
    //         Iniciar Planejamento
    //       </Button>
    //     </Link>
    //   </div>
    }
    return null;
  }

  const getButtonEspada = (espadaNumero: number) => {
    const espada = espadas?.find(espada => espada.document_type === `Espada${espadaNumero}`);
    // console.log(espada);
    if (getStatusEspada(espadaNumero) === 'concluido') {
      return <div className="flex gap-3 items-center mb-2">
        <Link href={route('Espadas.show', { id: espada?.id })}>
          <Button variant="outline" size="sm" className="text-green-600 bg-green-50 border-green-200 hover:bg-green-700 hover:text-white">
            <Eye className="w-4 h-4" />
            Ver Espada
          </Button>
        </Link>
      </div>
    }
    if (getStatusEspada(espadaNumero) === 'em andamento') {
      return <div className="flex gap-3 items-center mb-2">
        <Link href={route('Espadas.show', { id: espada?.id })}>
          <Button variant="outline" size="sm" className="text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-700 hover:text-white">
            <ChevronRight className="w-4 h-4" />
            Continuar Espada {espadaNumero}
          </Button>
        </Link>
      </div>
    }
    if (getStatusEspada(espadaNumero) === 'pendente') {
      return null
    }
  }
  const espadas = arquivos?.filter(arquivo => arquivo.document_type && arquivo.document_type.match(/^Espada[1-7]$/));
  const planejamento = arquivos?.find(arquivo => arquivo.document_type === 'Planejamento');
  // console.log(espadas?.[0]?.usuario?.nome);
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Linha do Tempo do Processo</span>
            <div className="flex gap-3 items-center">
            <Badge variant="outline" className="px-3 py-1 text-lg">
                Espada {proximaEspada} de 7
            </Badge>

              {/* Botão de Atualizar */}
              {/* <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="flex gap-2 items-center"
              >
                <RefreshCw className="w-4 h-4" />
                Atualizar
                </Button> */}

              {/* Botão para Iniciar Planejamento - só aparece se não há nenhuma espada nem planejamento */}
              {(() => {
                if (!arquivos || !Array.isArray(arquivos)) return false;

                // Verifica se existe alguma espada (Espada1 a Espada7)
                const temEspada = arquivos.some(arquivo =>
                  arquivo.document_type &&
                  arquivo.document_type.match(/^Espada[1-7]$/)
                );

                // Verifica se existe planejamento
                const temPlanejamento = arquivos.some(arquivo =>
                  arquivo.document_type === 'Planejamento'
                );

                // Se não tem espada nem planejamento, mostra o botão
                if (!temEspada && !temPlanejamento) {
                  return (
                    <Link
                      href={route('planejamento.store')}
                      data={{
                        processo_id: processo?.id,
                        document_type: 'Planejamento',
                        name: 'Planejamento e Demandas'
                      }}
                      method="post"
                      as="button"
                      className="flex gap-2 items-center px-4 py-2 font-medium text-white bg-green-600 rounded-md transition-colors hover:bg-green-700"
                    >
                      <Play className="w-4 h-4" />
                      Iniciar Planejamento
                    </Link>
                  );
                }

                return null;
              })()}

            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {/* Planejamento e Demandas */}
            <div className="flex gap-4 items-start">
              <div className="flex flex-col items-center">
                {getStatusIcon(planejamento?.status || 'pendente')}
                <div className={`w-0.5 h-12 mt-2 ${getLineColor(planejamento?.status || 'pendente')}`}></div>
            </div>

              <div className="flex-1 pb-6">
                <div className="flex gap-3 justify-between items-center mb-2">

                  <div className="flex gap-3 items-center mb-2">
                    <div className="text-lg font-semibold">
                      Planejamento
                    </div>
                    <Badge variant="outline" className={getStatusColor(planejamento?.status || 'pendente')}>
                      {getStatusText(planejamento?.status || 'pendente')}
                    </Badge>
                  </div>
                  {getButtonPlanejamento(planejamento?.status || 'pendente')}

                </div>

                <p className="mb-3 text-gray-600">Elaboração do DFD e identificação da necessidade</p>

                {planejamento?.status === 'concluido' && (
                  <div className="p-3 space-y-2 bg-gray-50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Responsável:</span>
                      <span className="font-medium">{planejamento?.usuario?.nome || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Data de Início:</span>
                      <span className="font-medium">{planejamento?.created_at ? new Date(planejamento!.created_at!).toLocaleDateString('pt-BR') : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Data de Conclusão:</span>
                      <span className="font-medium">{planejamento?.updated_at ? new Date(planejamento!.updated_at!).toLocaleDateString('pt-BR') : 'N/A'}</span>
                    </div>
                    {/* <div className="text-sm">
                      <span className="text-gray-600">Documentos:</span>
                      <span className="ml-2 font-medium">1 documento(s) vinculado(s)</span>
                    </div> */}
                  </div>
                )}
              </div>
            </div>
            {/* Espada 1: Planejamento e Demandas */}
            <div className="flex gap-4 items-start">
              <div className="flex flex-col items-center">
                {getStatusIcon(getStatusEspada(1))}
                <div className={`w-0.5 h-12 mt-2 ${getLineColor(getStatusEspada(1))}`}></div>
            </div>

              <div className="flex-1 pb-6">
                <div className="flex gap-3 justify-between items-center mb-2">

                  <div className="flex gap-3 items-center mb-2">
                    <div className="text-lg font-semibold">
                      Espada 1: Demandas
                    </div>
                    <Badge variant="outline" className={getStatusColor(getStatusEspada(1))}>
                      {getStatusText(getStatusEspada(1))}
                    </Badge>
                  </div>
                  {getButtonEspada(1)}

                </div>

                <p className="mb-3 text-gray-600">Elaboração do DFD e identificação da necessidade</p>

                {getStatusEspada(1) === 'concluido' && (
                  <div className="p-3 space-y-2 bg-gray-50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Responsável:</span>
                      <span className="font-medium">{espadas?.[0]?.usuario?.nome || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Data de Início:</span>
                      <span className="font-medium">{espadas?.[0]?.created_at ? new Date(espadas[0]!.created_at!).toLocaleDateString('pt-BR') : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Data de Conclusão:</span>
                      <span className="font-medium">{espadas?.[0]?.updated_at ? new Date(espadas[0]!.updated_at!).toLocaleDateString('pt-BR') : 'N/A'}</span>
                    </div>
                    {/* <div className="text-sm">
                      <span className="text-gray-600">Documentos:</span>
                      <span className="ml-2 font-medium">1 documento(s) vinculado(s)</span>
                    </div> */}
                  </div>
                )}
              </div>
            </div>

            {/* Espada 2: Estratégia de Contratação */}
          <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                {getStatusIcon(getStatusEspada(2))}
                <div className={`w-0.5 h-12 mt-2 ${getLineColor(getStatusEspada(2))}`}></div>
              </div>

              <div className="flex-1 pb-6">
                <div className="flex gap-3 justify-between items-center mb-2">
                  <div className="flex gap-3 items-center mb-2">
                    <div className="text-lg font-semibold">
                      Espada 2: Estratégia de Contratação
                    </div>
                    <Badge variant="outline" className={getStatusColor(getStatusEspada(2))}>
                      {getStatusText(getStatusEspada(2))}
                    </Badge>
                  </div>
                  {getButtonEspada(2)}
                </div>

                <p className="mb-3 text-gray-600">Estudo Técnico Preliminar e definição da modalidade</p>

                {getStatusEspada(2) === 'concluido' && (
                  <div className="p-3 space-y-2 bg-gray-50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Responsável:</span>
                      <span className="font-medium">{espadas?.[1]?.usuario?.nome || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Data de Início:</span>
                      <span className="font-medium">{espadas?.[1]?.created_at ? new Date(espadas[1]!.created_at!).toLocaleDateString('pt-BR') : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Data de Conclusão:</span>
                      <span className="font-medium">{espadas?.[1]?.updated_at ? new Date(espadas[1]!.updated_at!).toLocaleDateString('pt-BR') : 'N/A'}</span>
                    </div>
                    {/* <div className="text-sm">
                      <span className="text-gray-600">Documentos:</span>
                      <span className="ml-2 font-medium">1 documento(s) vinculado(s)</span>
                    </div> */}
                  </div>
                )}
              </div>
            </div>

            {/* Espada 3: Termo de Referência */}
            <div className="flex gap-4 items-start">
              <div className="flex flex-col items-center">
                {getStatusIcon(getStatusEspada(3))}
                <div className={`w-0.5 h-12 mt-2 ${getLineColor(getStatusEspada(3))}`}></div>
                </div>

                <div className="flex-1 pb-6">
                  <div className="flex gap-3 justify-between items-center mb-2">
                    <div className="flex gap-3 items-center mb-2">
                    <div className="text-lg font-semibold">
                    Espada 3: Termo de Referência
                    </div>
                  <Badge variant="outline" className={getStatusColor(getStatusEspada(3))}>
                    {getStatusText(getStatusEspada(3))}
                    </Badge>
                  </div>
                  {getButtonEspada(3)}
                </div>
                <p className="mb-3 text-gray-600">Especificações técnicas e critérios de aceitação</p>

                {getStatusEspada(3) === 'concluido' && (
                  <div className="p-3 space-y-2 bg-gray-50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Responsável:</span>
                      <span className="font-medium">{espadas?.[2]?.usuario?.nome || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Data de Início:</span>
                      <span className="font-medium">{espadas?.[2]?.created_at ? new Date(espadas[2]!.created_at!).toLocaleDateString('pt-BR') : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Data de Conclusão:</span>
                      <span className="font-medium">{espadas?.[2]?.updated_at ? new Date(espadas[2]!.updated_at!).toLocaleDateString('pt-BR') : 'N/A'}</span>
                    </div>
                    {/* <div className="text-sm">
                      <span className="text-gray-600">Documentos:</span>
                      <span className="ml-2 font-medium">1 documento(s) vinculado(s)</span>
                    </div> */}
                  </div>
                )}
              </div>
            </div>

            {/* Espada 4: Matriz de Riscos e Garantias */}
            <div className="flex gap-4 items-start">
              <div className="flex flex-col items-center">
                {getStatusIcon(getStatusEspada(4))}
                <div className={`w-0.5 h-12 mt-2 ${getLineColor(getStatusEspada(4))}`}></div>
              </div>

              <div className="flex-1 pb-6">
                <div className="flex gap-3 justify-between items-center mb-2">
                  <div className="flex gap-3 items-center mb-2">
                  <div className="text-lg font-semibold">
                    Espada 4: Matriz de Riscos e Garantias
                  </div>
                  <Badge variant="outline" className={getStatusColor(getStatusEspada(4))}>
                    {getStatusText(getStatusEspada(4))}
                  </Badge>
                  </div>
                  {getButtonEspada(4)}
                </div>

                <p className="mb-3 text-gray-600">Identificação e mitigação de riscos</p>

                {getStatusEspada(4) === 'concluido' && (
                    <div className="p-3 space-y-2 bg-gray-50 rounded-lg">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Responsável:</span>
                      <span className="font-medium">{espadas?.[3]?.usuario?.nome || 'N/A'}</span>
                            </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Data de Início:</span>
                      <span className="font-medium">{espadas?.[3]?.created_at ? new Date(espadas[3]!.created_at!).toLocaleDateString('pt-BR') : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Data de Conclusão:</span>
                      <span className="font-medium">{espadas?.[3]?.updated_at ? new Date(espadas[3]!.updated_at!).toLocaleDateString('pt-BR') : 'N/A'}</span>
                    </div>

                  </div>
                )}
              </div>
            </div>

            {/* Espada 5: Edital e Publicidade */}
            <div className="flex gap-4 items-start">
              <div className="flex flex-col items-center">
                {getStatusIcon(getStatusEspada(5))}
                <div className={`w-0.5 h-12 mt-2 ${getLineColor(getStatusEspada(5))}`}></div>
              </div>

              <div className="flex-1 pb-6">
                <div className="flex gap-3 justify-between items-center mb-2">
                  <div className="flex gap-3 items-center mb-2">
                  <div className="text-lg font-semibold">
                    Espada 5: Edital e Publicidade
                  </div>
                  <Badge variant="outline" className={getStatusColor(getStatusEspada(5))}>
                    {getStatusText(getStatusEspada(5))}
                  </Badge>
                  </div>
                  {getButtonEspada(5)}
                </div>

                <p className="mb-3 text-gray-600">Elaboração do edital e processo licitatório</p>

                {getStatusEspada(5) === 'concluido' && (
                  <div className="p-3 space-y-2 bg-gray-50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Responsável:</span>
                      <span className="font-medium">{espadas?.[4]?.usuario?.nome || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Data de Início:</span>
                      <span className="font-medium">{espadas?.[4]?.created_at ? new Date(espadas[4]!.created_at!).toLocaleDateString('pt-BR') : 'N/A'}</span>
                    </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Data de Conclusão:</span>
                      <span className="font-medium">{espadas?.[4]?.updated_at ? new Date(espadas[4]!.updated_at!).toLocaleDateString('pt-BR') : 'N/A'}</span>
                              </div>
                              {/* <div className="text-sm">
                                <span className="text-gray-600">Documentos:</span>
                      <span className="ml-2 font-medium">1 documento(s) vinculado(s)</span>
                              </div> */}
                  </div>
                )}
              </div>
                    </div>

            {/* Espada 6: Contrato e Execução */}
            <div className="flex gap-4 items-start">
              <div className="flex flex-col items-center">
                {getStatusIcon(getStatusEspada(6))}
                <div className={`w-0.5 h-12 mt-2 ${getLineColor(getStatusEspada(6))}`}></div>
              </div>

              <div className="flex-1 pb-6">
                <div className="flex gap-3 justify-between items-center mb-2">
                  <div className="flex gap-3 items-center mb-2">
                  <div className="text-lg font-semibold">
                    Espada 6: Contrato e Execução
                  </div>
                  <Badge variant="outline" className={getStatusColor(getStatusEspada(6))}>
                    {getStatusText(getStatusEspada(6))}
                  </Badge>
                  </div>
                  {getButtonEspada(6)}
                </div>

                <p className="mb-3 text-gray-600">Assinatura e acompanhamento da execução</p>

                {getStatusEspada(6) === 'concluido' && (
                  <div className="p-3 space-y-2 bg-gray-50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Responsável:</span>
                      <span className="font-medium">{espadas?.[5]?.usuario?.nome || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Data de Início:</span>
                      <span className="font-medium">{espadas?.[5]?.created_at ? new Date(espadas[5]!.created_at!).toLocaleDateString('pt-BR') : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Data de Conclusão:</span>
                      <span className="font-medium">{espadas?.[5]?.updated_at ? new Date(espadas[5]!.updated_at!).toLocaleDateString('pt-BR') : 'N/A'}</span>
                    </div>
                    {/* <div className="text-sm">
                      <span className="text-gray-600">Documentos:</span>
                      <span className="ml-2 font-medium">1 documento(s) vinculado(s)</span>
                    </div> */}
                  </div>
                )}
              </div>
            </div>

            {/* Espada 7: Penalidades e Responsabilização */}
            <div className="flex gap-4 items-start">
              <div className="flex flex-col items-center">
                {getStatusIcon(getStatusEspada(7))}
              </div>

              <div className="flex-1 pb-6">
                <div className="flex gap-3 justify-between items-center mb-2">
                  <div className="flex gap-3 items-center mb-2">
                  <div className="text-lg font-semibold">
                    Espada 7: Penalidades e Responsabilização
                  </div>
                  <Badge variant="outline" className={getStatusColor(getStatusEspada(7))}>
                    {getStatusText(getStatusEspada(7))}
                  </Badge>
                  </div>
                  {getButtonEspada(7)}
                </div>

                <p className="mb-3 text-gray-600">Encerramento e avaliação final</p>

                {getStatusEspada(7) === 'concluido' && (
                  <div className="p-3 space-y-2 bg-gray-50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Responsável:</span>
                      <span className="font-medium">{espadas?.[6]?.usuario?.nome || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Data de Início:</span>
                      <span className="font-medium">{espadas?.[6]?.created_at ? new Date(espadas[6]!.created_at!).toLocaleDateString('pt-BR') : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Data de Conclusão:</span>
                      <span className="font-medium">{espadas?.[6]?.updated_at ? new Date(espadas[6]!.updated_at!).toLocaleDateString('pt-BR') : 'N/A'}</span>
                    </div>
                    {/* <div className="text-sm">
                      <span className="text-gray-600">Documentos:</span>
                      <span className="ml-2 font-medium">1 documento(s) vinculado(s)</span>
                    </div> */}
                  </div>
                )}
              </div>
            </div>

              </div>

          {/* Resumo do progresso */}
          <div className="p-4 mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-800">Progresso Geral</h4>
                <p className="text-sm text-gray-600">
                  {espadasConcluidas} de 7 espadas concluídas
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">
                  {Math.round((espadasConcluidas / 7) * 100)}%
                </div>
                <p className="text-sm text-gray-600">Concluído</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  interface ArvoreDocumentosProps {
    processo: ProcessoAdministrativo;
  }

  export const ArvoreDocumentos = ({ processo }: ArvoreDocumentosProps) => {
    const [documentoParaAssinar, setDocumentoParaAssinar] = useState<DocumentoProcesso | null>(null);
    const [documentoParaEncaminhar, setDocumentoParaEncaminhar] = useState<DocumentoProcesso | null>(null);
    const [mostrarAnexarDocumento, setMostrarAnexarDocumento] = useState(false);
    const [documentoParaVisualizar, setDocumentoParaVisualizar] = useState<any>(null);
    const queryClient = useQueryClient();
    const arquivos = queryClient.getQueryData(['arquivos']);
    const usuario = queryClient.getQueryData(['usuario']);
    const { toast } = useToast();

    // Simulação do usuário logado
    const usuarioLogado = usuario?.nome; // Em uma aplicação real, viria do contexto

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'Assinado':
          return 'bg-green-50 text-green-600 border-green-200';
        case 'Pendente Assinatura':
          return 'bg-yellow-50 text-yellow-600 border-yellow-200';
        case 'Em Análise':
          return 'bg-blue-50 text-blue-600 border-blue-200';
        case 'Rejeitado':
          return 'bg-red-50 text-red-600 border-red-200';
        default:
          return 'bg-gray-50 text-gray-600 border-gray-200';
      }
    };

    const getStatusIcon = (status: string) => {
      switch (status) {
        case 'Assinado':
          return <CheckCircle className="w-4 h-4" />;
        case 'Pendente Assinatura':
          return <Clock className="w-4 h-4" />;
        case 'Em Análise':
          return <Eye className="w-4 h-4" />;
        case 'Rejeitado':
          return <X className="w-4 h-4" />;
        default:
          return <FileText className="w-4 h-4" />;
      }
    };

    const podeAssinarDocumento = (documento: DocumentoProcesso) => {
      return documento.requerAssinatura &&
             documento.status === 'Pendente Assinatura' &&
             documento.responsavel === usuarioLogado;
    };

    const podeEncaminharDocumento = (documento: DocumentoProcesso) => {
      return documento.podeSerEncaminhado &&
             documento.autor === usuarioLogado &&
             documento.status === 'Assinado';
    };

    const handleAssinarDocumento = (metodo: 'Digital' | 'Gov.br', observacoes?: string) => {
      if (!documentoParaAssinar) return;

      console.log('Assinando documento:', documentoParaAssinar.id, 'Método:', metodo);

      toast({
        title: "Documento assinado!",
        description: `O documento ${documentoParaAssinar.nome} foi assinado via ${metodo}.`,
      });

      setDocumentoParaAssinar(null);
    };

    const handleEncaminharDocumento = (responsavel: string, observacoes?: string) => {
      if (!documentoParaEncaminhar) return;

      console.log('Encaminhando documento:', documentoParaEncaminhar.id, 'Para:', responsavel);

      toast({
        title: "Documento encaminhado!",
        description: `O documento ${documentoParaEncaminhar.nome} foi encaminhado.`,
      });

      setDocumentoParaEncaminhar(null);
    };

    const handleAnexarDocumento = (anexoData: any) => {
      console.log('Anexando documento ao processo:', processo?.id, anexoData);

      toast({
        title: "Documento anexado!",
        description: `O documento ${anexoData?.nome} foi anexado ao processo.`,
      });

      setMostrarAnexarDocumento(false);
    };

    const handleVisualizarDocumento = (documento: DocumentoProcesso) => {
      setDocumentoParaVisualizar(documento);
    };

    const handleBaixarDocumento = (documento: DocumentoProcesso) => {
      toast({
        title: "Download iniciado",
        description: `Baixando ${documento?.nome}...`,
      });
    };

    const handleVisualizarAnexo = (anexo: AnexoProcesso) => {
      setDocumentoParaVisualizar(anexo);
    };
    const espadas = arquivos?.filter(arquivo => arquivo.document_type && arquivo.document_type.match(/^Espada[1-7]$/));

    return (
      <div className="space-y-6">
        {/* Cabeçalho com ação de anexar */}
        <div className="flex justify-between items-center">
          <div className=''></div>
          <Button
            onClick={() => setMostrarAnexarDocumento(true)}
            className="flex gap-2 items-center"
          >
            <Paperclip className="w-4 h-4" />
            Anexar Documento
          </Button>
        </div>

                {/* Seções Expansíveis de Documentos */}
        <Accordion type="multiple" defaultValue={["documentos-principais", "anexos"]} className="space-y-4 bg-white">
          {/* Documentos Principais */}
          <AccordionItem value="documentos-principais" className="rounded-lg border">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex gap-2 items-center">
                <FileText className="w-5 h-5" />
                <span className="font-semibold">Documentos Principais</span>
                {espadas?.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {espadas?.length}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-4">
                {espadas?.length > 0 ? (
                  espadas?.map((documento, index) => (
                    <div key={documento?.id} className="p-4 rounded-lg border">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex gap-2 items-center mb-2">
                            {getStatusIcon(documento?.status)}
                            <h4 className="font-semibold">{documento?.name}</h4>
                            <Badge variant="outline" className={getStatusColor(documento?.status)}>
                              {documento?.status}
                            </Badge>
                          </div>

                          <p className="mb-2 text-sm text-gray-600">
                            {documento?.description}
                          </p>

                          <div className="flex gap-4 items-center text-xs text-gray-500">
                            <div className="flex gap-1 items-center">
                              <Calendar className="w-3 h-3" />
                              {new Date(documento?.created_at).toLocaleDateString('pt-BR')}
                            </div>
                            <div className="flex gap-1 items-center">
                              <User className="w-3 h-3" />
                              {documento?.usuario?.nome}
                            </div>
                            {documento?.dataAssinatura && (
                              <div className="flex gap-1 items-center">
                                <CheckCircle className="w-3 h-3" />
                                Assinado em {documento?.dataAssinatura}
                              </div>
                            )}
                          </div>

                          {documento?.vinculacoes && (
                            <div className="p-2 mt-2 text-sm bg-gray-50 rounded">
                              <strong>Vinculações:</strong> {JSON.stringify(documento?.vinculacoes)}
                            </div>
                          )}
                        </div>

                        {/* Ações do Documento */}
                        <div className="flex flex-col gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleVisualizarDocumento(documento)}
                            className="flex gap-1 items-center"
                          >
                            <Eye className="w-3 h-3" />
                            Ver
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleBaixarDocumento(documento)}
                            className="flex gap-1 items-center"
                          >
                            <Download className="w-3 h-3" />
                            Baixar
                          </Button>

                          {podeAssinarDocumento(documento) && (
                            <Button
                              size="sm"
                              onClick={() => setDocumentoParaAssinar(documento)}
                              className="flex gap-1 items-center bg-blue-600 hover:bg-blue-700"
                            >
                              <PenTool className="w-3 h-3" />
                              Assinar
                            </Button>
                          )}

                          {podeEncaminharDocumento(documento) && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setDocumentoParaEncaminhar(documento)}
                              className="flex gap-1 items-center"
                            >
                              <Send className="w-3 h-3" />
                              Encaminhar
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Assinaturas */}
                      {/* {documento?.assinaturas.length > 0 && (
                        <div className="pt-3 mt-3 border-t">
                          <h5 className="mb-2 text-sm font-semibold">Assinaturas:</h5>
                          <div className="space-y-1">
                            {documento?.assinaturas?.map((assinatura) => (
                              <div key={assinatura.id} className="flex gap-2 items-center text-xs">
                                <CheckCircle className="w-3 h-3 text-green-600" />
                                <span>{assinatura.responsavel}</span>
                                <Badge variant="secondary" className="text-xs">
                                  {assinatura.tipo}
                                </Badge>
                                <span className="text-gray-500">
                                  {assinatura.dataAssinatura} via {assinatura.metodoAutenticacao}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )} */}
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-gray-500">
                    <FileText className="mx-auto mb-4 w-12 h-12 text-gray-300" />
                    <p>Nenhum documento principal encontrado</p>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Anexos */}
          <AccordionItem value="anexos" className="rounded-lg border">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex gap-2 items-center">
                <Paperclip className="w-5 h-5" />
                <span className="font-semibold">Anexos</span>
                {arquivos?.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {arquivos?.length}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-3">
                {arquivos?.length > 0 ? (
                  arquivos?.map((anexo) => (
                    <div key={anexo.id} className="flex justify-between items-center p-3 rounded-lg border">
                      <div className="flex gap-3 items-center">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">{anexo.name}</p>
                          <p className="text-xs text-gray-500">
                            Enviado por {anexo?.usuario?.nome} em {new Date(anexo?.created_at).toLocaleDateString('pt-BR')}
                          </p>
                          {anexo?.descricao && (
                            <p className="mt-1 text-xs text-gray-600">{anexo?.descricao}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleVisualizarAnexo(anexo)}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleBaixarDocumento(anexo as any)}
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-gray-500">
                    <Paperclip className="mx-auto mb-4 w-12 h-12 text-gray-300" />
                    <p>Nenhum anexo encontrado</p>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Modais */}
        {documentoParaAssinar && (
          <AssinaturaDocumento
            documento={documentoParaAssinar}
            isOpen={!!documentoParaAssinar}
            onClose={() => setDocumentoParaAssinar(null)}
            onAssinar={handleAssinarDocumento}
          />
        )}

        {documentoParaEncaminhar && (
          <EncaminharDocumento
            documento={documentoParaEncaminhar}
            isOpen={!!documentoParaEncaminhar}
            onClose={() => setDocumentoParaEncaminhar(null)}
            onEncaminhar={handleEncaminharDocumento}
          />
        )}

        <AnexarDocumento
          processo={processo}
          isOpen={mostrarAnexarDocumento}
          onClose={() => setMostrarAnexarDocumento(false)}
          onAnexar={handleAnexarDocumento}
        />

        {/* Modal de Visualização de Documento */}
        {documentoParaVisualizar && (
          <VisualizarDocumento
            documento={documentoParaVisualizar}
            isOpen={!!documentoParaVisualizar}
            onClose={() => setDocumentoParaVisualizar(null)}
          />
        )}
      </div>
    );
  };

interface VisualizarDocumentoProps {
  documento: any;
  isOpen: boolean;
  onClose: () => void;
}

export const VisualizarDocumento = ({ documento, isOpen, onClose }: VisualizarDocumentoProps) => {
  const { toast } = useToast();

  const handleBaixarDocumento = () => {
    toast({
      title: "Download iniciado",
      description: `Baixando ${documento?.nome || documento?.name}...`,
    });
  };

  const getTipoDocumento = () => {
    if (documento?.document_type) {
      return documento.document_type;
    }
    if (documento?.tipo) {
      return documento.tipo;
    }
    return 'Documento';
  };

  const getNomeDocumento = () => {
    return documento?.nome || documento?.name || 'Documento sem nome';
  };

  const getDescricaoDocumento = () => {
    return documento?.descricao || documento?.description || 'Sem descrição disponível';
  };

  const getDataCriacao = () => {
    if (documento?.created_at) {
      return new Date(documento.created_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return 'Data não disponível';
  };

  const getAutorDocumento = () => {
    return documento?.usuario?.nome || documento?.autor || 'Autor não identificado';
  };

  const getStatusDocumento = () => {
    return documento?.status || 'Status não definido';
  };

  const getTamanhoDocumento = () => {
    if (documento?.tamanho) {
      const tamanho = documento.tamanho;
      if (tamanho < 1024) {
        return `${tamanho} bytes`;
      } else if (tamanho < 1024 * 1024) {
        return `${(tamanho / 1024).toFixed(1)} KB`;
      } else {
        return `${(tamanho / (1024 * 1024)).toFixed(1)} MB`;
      }
    }
    return 'Tamanho não disponível';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <FileText className="w-5 h-5" />
            Visualizar Documento
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações do Documento */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{getNomeDocumento()}</CardTitle>
              <CardDescription>{getDescricaoDocumento()}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-semibold text-gray-600">Tipo</Label>
                    <p className="text-sm">{getTipoDocumento()}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-600">Status</Label>
                    <Badge variant="outline" className="ml-2">
                      {getStatusDocumento()}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-600">Tamanho</Label>
                    <p className="text-sm">{getTamanhoDocumento()}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-semibold text-gray-600">Autor</Label>
                    <p className="text-sm">{getAutorDocumento()}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-600">Data de Criação</Label>
                    <p className="text-sm">{getDataCriacao()}</p>
                  </div>
                  {documento?.dataAssinatura && (
                    <div>
                      <Label className="text-sm font-semibold text-gray-600">Data de Assinatura</Label>
                      <p className="text-sm">{documento.dataAssinatura}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visualização do Documento */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Conteúdo do Documento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-12 text-center bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed">
                <FileText className="mx-auto mb-4 w-16 h-16 text-gray-400" />
                <h3 className="mb-2 text-lg font-semibold text-gray-600">
                  Visualização do Documento
                </h3>
                <p className="mb-6 text-gray-500">
                  A visualização do documento seria exibida aqui.<br />
                  Em uma implementação real, você poderia integrar com visualizadores de PDF,
                  Word, ou outros formatos de documento.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Nome:</strong> {getNomeDocumento()}</p>
                  <p><strong>Tipo:</strong> {getTipoDocumento()}</p>
                  <p><strong>Status:</strong> {getStatusDocumento()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vinculações (se existirem) */}
          {documento?.vinculacoes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Vinculações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <pre className="overflow-x-auto text-sm">
                    {JSON.stringify(documento.vinculacoes, null, 2)}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleBaixarDocumento}
            className="flex gap-2 items-center"
          >
            <Download className="w-4 h-4" />
            Baixar Documento
          </Button>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface AnexarDocumentoProps {
    processo: ProcessoAdministrativo;
    isOpen: boolean;
    onClose: () => void;
    onAnexar: (anexo: {
      nome: string;
      tipo: string;
      tamanho: number;
      arquivo: string;
      descricao?: string;
      documentoVinculado?: string;
    }) => void;
  }

  export const AnexarDocumento = ({
    processo,
    isOpen,
    onClose,
    onAnexar
  }: AnexarDocumentoProps) => {
    const [arquivo, setArquivo] = useState<File | null>(null);
    const [nomeDocumento, setNomeDocumento] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState<TipoDocumento | ''>('');
    const [descricao, setDescricao] = useState('');
    const [documentoVinculado, setDocumentoVinculado] = useState('');
    const [anexando, setAnexando] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const tiposDocumento: TipoDocumento[] = [
      'Anexo', 'Ofício', 'Memorando', 'Nota Fiscal', 'Relatório de Fiscalização',
      'Parecer Jurídico', 'Informação Orçamentária'
    ];

    const validateFile = (file: File) => {
      // Verificar tamanho do arquivo (máximo 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "O arquivo deve ter no máximo 10MB.",
          variant: "destructive",
        });
        return false;
      }

      // Verificar tipo de arquivo
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain'
      ];

      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Tipo de arquivo não suportado",
          description: "Por favor, selecione um arquivo PDF, DOC, DOCX, JPG, JPEG, PNG, XLSX, XLS ou TXT.",
          variant: "destructive",
        });
        return false;
      }

      return true;
    };

    const processFile = (file: File) => {
      if (validateFile(file)) {
        setArquivo(file);

        // Auto-preencher nome se estiver vazio
        if (!nomeDocumento) {
          setNomeDocumento(file.name.split('.')[0]);
        }
      }
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        processFile(file);
      }
    };

    // Funções de Drag and Drop
    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // Só remove o estado de drag se realmente saiu da área
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;

      if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
        setIsDragOver(false);
      }
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(true);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        const file = files[0];
        processFile(file);
      }
    };

    const handleAnexar = async () => {
      if (!arquivo) {
        toast({
          title: "Selecione um arquivo",
          description: "É necessário selecionar um arquivo para anexar.",
          variant: "destructive",
        });
        return;
      }

      if (!nomeDocumento.trim()) {
        toast({
          title: "Nome obrigatório",
          description: "Digite um nome para o documento.",
          variant: "destructive",
        });
        return;
      }

      setAnexando(true);

      try {
        // Simular upload do arquivo
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Criar URL simulada para o arquivo
        const arquivoUrl = `anexos/${processo?.numero}/${arquivo.name}`;

        onAnexar({
          nome: nomeDocumento,
          tipo: arquivo.type,
          tamanho: arquivo.size,
          arquivo: arquivoUrl,
          descricao: descricao || undefined,
          documentoVinculado: documentoVinculado || undefined,
        });

        toast({
          title: "Documento anexado com sucesso!",
          description: `O arquivo ${nomeDocumento} foi anexado ao processo?.`,
        });

        onClose();

        // Limpar formulário
        setArquivo(null);
        setNomeDocumento('');
        setTipoDocumento('');
        setDescricao('');
        setDocumentoVinculado('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        toast({
          title: "Erro ao anexar documento",
          description: "Tente novamente ou entre em contato com o suporte.",
          variant: "destructive",
        });
      } finally {
        setAnexando(false);
      }
    };

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="container mx-auto my-auto max-w-2xl max-h-1/2">
          <DialogHeader>
            <DialogTitle className="flex gap-2 items-center">
              <Paperclip className="w-5 h-5" />
              Anexar Documento ao Processo
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Informações do Processo? */}
            {/* <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="mb-1 font-semibold">{processo?.objeto}</h3>
              <p className="text-sm text-gray-600">{processo?.numero} - {processo?.modalidade}</p>
            </div> */}

            {/* Seleção de Arquivo */}
            <div>
              <Label className="block mb-2 text-base font-semibold">
                Selecionar Arquivo:
              </Label>
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200 cursor-pointer min-h-[200px] flex flex-col justify-center items-center ${
                  isDragOver
                    ? 'bg-blue-50 border-blue-500 border-solid'
                    : 'bg-gray-50 border-gray-300 hover:border-gray-400 hover:bg-gray-100'
                }`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => !arquivo && fileInputRef.current?.click()}
              >
                {arquivo ? (
                  <div className="w-full max-w-md">
                    <div className="flex justify-between items-center p-4 bg-white rounded-lg border shadow-sm">
                      <div className="flex gap-3 items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <File className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-gray-900">{arquivo.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(arquivo.size)}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setArquivo(null);
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        className="hover:bg-red-100 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full">
                    {isDragOver ? (
                      <div className="space-y-4">
                        <div className="relative">
                          <Upload className="mx-auto w-16 h-16 text-blue-500 animate-bounce" />
                          <div className="absolute inset-0 bg-blue-200 rounded-full opacity-20 animate-ping"></div>
                        </div>
                        <div>
                          <p className="mb-2 text-xl font-semibold text-blue-600">
                            Solte o arquivo aqui!
                          </p>
                          <p className="text-sm text-blue-500">
                            O arquivo será carregado automaticamente
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div>
                          <Upload className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                          <div className="space-y-2">
                            <p className="text-lg font-medium text-gray-700">
                              Arraste e solte seu arquivo aqui
                            </p>
                            <p className="text-sm text-gray-500">
                              ou clique para procurar em seu computador
                            </p>
                          </div>
                        </div>

                          <div className="space-y-1 text-xs text-gray-500">
                            <p><strong>Formatos aceitos:</strong> PDF, DOC, DOCX, JPG, JPEG, PNG, XLSX, XLS, TXT</p>
                            <p><strong>Tamanho máximo:</strong> 10MB</p>
                          </div>
                      </div>
                    )}
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx,.xls,.txt"
                />
              </div>
            </div>

            {/* Informações do Documento */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nomeDocumento" className="block mb-2 text-base font-semibold">
                  Nome do Documento:
                </Label>
                <Input
                  id="nomeDocumento"
                  placeholder="Digite o nome do documento..."
                  value={nomeDocumento}
                  onChange={(e) => setNomeDocumento(e.target.value)}
                />
              </div>

              <div>
                <Label className="block mb-2 text-base font-semibold">
                  Tipo de Documento:
                </Label>
                <Select value={tipoDocumento} onValueChange={(value: TipoDocumento) => setTipoDocumento(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo..." />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposDocumento?.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Vinculação a Documento Existente */}
            {/* <div>
              <Label className="block mb-2 text-base font-semibold">
                Vincular a Documento Existente (opcional):
              </Label>
              <Select value={documentoVinculado} onValueChange={setDocumentoVinculado}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um documento..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nao_vincular">Não vincular</SelectItem>
                  {processo?.documentos?.map((doc) => (
                    <SelectItem key={doc.id} value={doc.id}>
                      {doc.numero} - {doc.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}

            {/* Descrição */}
            <div>
              <Label htmlFor="descricao" className="block mb-2 text-base font-semibold">
                Descrição (opcional):
              </Label>
              <Textarea
                id="descricao"
                placeholder="Adicione uma descrição sobre o documento anexado..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={3}
              />
            </div>

            {/* Aviso */}
            {/* <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex gap-2 items-start">
                <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800">Sobre a anexação:</p>
                  <p className="text-blue-700">
                    O documento será automaticamente integrado ao processo? e
                    ficará disponível na árvore de documentos. Tamanho máximo: 10MB.
                  </p>
                </div>
              </div>
            </div> */}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose} disabled={anexando}>
              Cancelar
            </Button>
            <Button onClick={handleAnexar} disabled={anexando || !arquivo}>
              {anexando ? (
                <>
                  <div className="mr-2 w-4 h-4 rounded-full border-b-2 border-white animate-spin"></div>
                  Anexando...
                </>
              ) : (
                <>
                  <Paperclip className="mr-2 w-4 h-4" />
                  Anexar Documento
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

export default Show;