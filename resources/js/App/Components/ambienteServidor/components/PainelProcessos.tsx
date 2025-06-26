import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Search, Filter, FileText, Clock, CheckCircle, AlertTriangle, Plus } from 'lucide-react';
import { ProcessoAdministrativo, FiltrosProcesso } from '@/Components/ambienteServidor/types/painelProcessos';
import { processosAdministrativos, secretarias, modalidades, fasesProcesso } from '../types/processosAdministrativos';
import { TabelaProcessos } from './TabelaProcessos';
import { ProcessoDetalhado } from './ProcessoDetalhado';
import { router } from '@inertiajs/react';
import { VisualizacaoTabela } from '@/Components/portalTransparencia/VisualizacaoTabela';

export const PainelProcessos = ({ documentos }: { documentos: any[] }) => {
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
    setProcessoSelecionado(null);
  };

  if (processoSelecionado) {
    return <ProcessoDetalhado processo={processoSelecionado} onVoltar={handleVoltar} />;
  }

  return (
    <div className="space-y-6 container mx-auto">
      {/* Cabeçalho */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Painel de Processos</h2>
        <p className="text-gray-600 text-sm">Acompanhamento completo dos processos administrativos através das 7 espadas</p>
      </div>

      {/* Métricas-Resumo */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Processos Ativos</p>
                <p className="text-2xl font-bold text-blue-600">{metricas.emAndamento}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Próximo ao Vencimento</p>
                <p className="text-2xl font-bold text-orange-600">{metricas.proximoVencimento}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Concluídos</p>
                <p className="text-2xl font-bold text-green-600">{metricas.concluidos}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Notificações</p>
                <p className="text-2xl font-bold text-red-600">{metricas.totalNotificacoes}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Barra de Busca e Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por número, objeto, fornecedor..."
                  value={termoBusca}
                  onChange={(e) => setTermoBusca(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button 
                variant="outline" 
                onClick={() => setMostrarFiltrosAvancados(!mostrarFiltrosAvancados)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filtros Avançados
              </Button>
            </div>

            {mostrarFiltrosAvancados && (
              <div className="grid grid-cols-4 gap-4 pt-4 border-t">
                <Select value={filtros.modalidade || 'todas'} onValueChange={(value) => setFiltros({...filtros, modalidade: value === 'todas' ? undefined : value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Modalidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    {modalidades.map(modalidade => (
                      <SelectItem key={modalidade} value={modalidade}>{modalidade}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filtros.secretaria || 'todas'} onValueChange={(value) => setFiltros({...filtros, secretaria: value === 'todas' ? undefined : value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Secretaria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    {secretarias.map(secretaria => (
                      <SelectItem key={secretaria} value={secretaria}>{secretaria}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filtros.espada?.toString() || 'todas'} onValueChange={(value) => setFiltros({...filtros, espada: value === 'todas' ? undefined : parseInt(value)})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Espada Atual" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    {[1,2,3,4,5,6,7].map(espada => (
                      <SelectItem key={espada} value={espada.toString()}>Espada {espada}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button 
                  variant="outline" 
                  onClick={() => setFiltros({})}
                >
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Abas de Visualização */}
      <VisualizacaoTabela
        documentos={documentos}
      />

      {/* Botão Fixo para Criar Novo Processo */}
      <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">
        <Button
            onClick={() => router.visit('/processos/create')}
          className="h-12 px-6 rounded-full bg-[#0A3D62] hover:bg-[#CB991A] text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          <span>Novo Processo</span>
        </Button>
      </div>
    </div>
  );
};
