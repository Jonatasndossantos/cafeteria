import React, { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Card, CardContent } from '@/Components/ui/card';
import { Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { FiltrosPortal } from '@/types/portalTransparencia';

interface Setor {
  id: number;
  nome: string;
  sigla: string;
}

interface FiltrosAvancadosProps {
  filtros: FiltrosPortal;
  onFiltrosChange: (filtros: FiltrosPortal) => void;
  setores?: Setor[];
}

export const FiltrosAvancados = ({ filtros, onFiltrosChange, setores = [] }: FiltrosAvancadosProps) => {
  const [expandido, setExpandido] = useState(false);

  const handleFiltroChange = (campo: keyof FiltrosPortal, valor: any) => {
    onFiltrosChange({
      ...filtros,
      [campo]: valor
    });
  };

  const limparFiltros = () => {
    onFiltrosChange({
      periodo: { inicio: '', fim: '' },
      tipoDocumento: 'Todos',
      modalidade: 'Todos',
      tipo: 'Todos',
      objeto: '',
      secretaria: 'Todas',
      status: 'Todos',
      espada: 'Todas',
      origem: 'Todas',
      statusAutenticacao: 'Todos',
      busca: '',
      tags: [],
      valorMin: undefined,
      valorMax: undefined,
      numeroProcesso: '',
      numeroDocumento: '',
      setor_id: ''
    });
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        {/* Filtros Primários */}
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Número do Processo */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Número do Processo</label>
            <Input
              placeholder="Ex: PA-2025/00042"
              value={filtros.numeroProcesso || ''}
              onChange={(e) => handleFiltroChange('numeroProcesso', e.target.value)}
              className="h-10"
            />
          </div>

          {/* Tipo */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Tipo</label>
            <Select value={filtros.tipo || 'Todos'} onValueChange={(value) => handleFiltroChange('tipo', value)}>
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="Obras">Obras</SelectItem>
                <SelectItem value="Serviços Comuns">Serviços Comuns</SelectItem>
                <SelectItem value="Serviços Especializados">Serviços Especializados</SelectItem>
                <SelectItem value="Serviços de Engenharia">Serviços de Engenharia</SelectItem>
                <SelectItem value="Tecnologia da Informação (TIC)">Tecnologia da Informação (TIC)</SelectItem>
                <SelectItem value="Locação de Bens">Locação de Bens</SelectItem>
                <SelectItem value="Aquisição de Bens Permanentes">Aquisição de Bens Permanentes</SelectItem>
                <SelectItem value="Aquisição de Materiais de Consumo">Aquisição de Materiais de Consumo</SelectItem>
                <SelectItem value="Obras e Serviços de Engenharia">Obras e Serviços de Engenharia</SelectItem>
                <SelectItem value="Parceria com OSC/Termo de Colaboração/Fomento">Parceria com OSC/Termo de Colaboração/Fomento</SelectItem>
                <SelectItem value="Consultoria Técnica/Estudo Especializado">Consultoria Técnica/Estudo Especializado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Modalidade */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Modalidade</label>
            <Select value={filtros.modalidade} onValueChange={(value) => handleFiltroChange('modalidade', value)}>
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                
                {/* Separador - Modalidades Tradicionais */}
                <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 bg-gray-50 border-t border-b border-gray-100">
                  🔹 MODALIDADES TRADICIONAIS
                </div>
                <SelectItem value="Pregão Eletrônico - Art. 28, inc. I">Pregão Eletrônico - Art. 28, inc. I</SelectItem>
                <SelectItem value="Pregão Presencial - Art. 28, inc. I">Pregão Presencial - Art. 28, inc. I</SelectItem>
                <SelectItem value="Concorrência - Art. 28, inc. II">Concorrência - Art. 28, inc. II</SelectItem>
                <SelectItem value="Concurso - Art. 28, inc. III">Concurso - Art. 28, inc. III</SelectItem>
                <SelectItem value="Leilão - Art. 28, inc. IV">Leilão - Art. 28, inc. IV</SelectItem>
                <SelectItem value="Diálogo Competitivo - Art. 28, inc. V">Diálogo Competitivo - Art. 28, inc. V</SelectItem>
                
                {/* Separador - Instrumentos Diretos */}
                <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 bg-gray-50 border-t border-b border-gray-100">
                  🔹 INSTRUMENTOS DIRETOS
                </div>
                <SelectItem value="Dispensa de Licitação - Art. 74 e Art. 75 da Lei 14.133/21">Dispensa de Licitação - Art. 74 e Art. 75 da Lei 14.133/21</SelectItem>
                <SelectItem value="Inexigibilidade de Licitação - Art. 74 e Art. 74-A da Lei 14.133/21">Inexigibilidade de Licitação - Art. 74 e Art. 74-A da Lei 14.133/21</SelectItem>
                <SelectItem value="Credenciamento">Credenciamento</SelectItem>
                <SelectItem value="Adesão à Ata (Carona) - Art. 86 a 88 da Lei 14.133/21 (Sistema de Registro de Preços - SRP)">Adesão à Ata (Carona) - Art. 86 a 88 da Lei 14.133/21 (Sistema de Registro de Preços - SRP)</SelectItem>
                
                {/* Separador - Terceiro Setor */}
                <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 bg-gray-50 border-t border-b border-gray-100">
                  🔹 TERCEIRO SETOR (MROSC)
                </div>
                <SelectItem value="Chamamento Público - Art. 23 a 27 da Lei 13.019/14">Chamamento Público - Art. 23 a 27 da Lei 13.019/14</SelectItem>
                <SelectItem value="Termo de Colaboração - Art. 16, inc. I da Lei 13.019/14">Termo de Colaboração - Art. 16, inc. I da Lei 13.019/14</SelectItem>
                <SelectItem value="Termo de Fomento - Art. 16, inc. II da Lei 13.019/14">Termo de Fomento - Art. 16, inc. II da Lei 13.019/14</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Secretaria */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Secretaria</label>
            <Select value={filtros.setor_id || 'todas'} onValueChange={(value) => handleFiltroChange('setor_id', value === 'todas' ? undefined : value)}>
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as Secretarias</SelectItem>
                {setores.map((setor: Setor) => (
                  <SelectItem key={setor.id} value={String(setor.id)}>{setor.nome}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Campo de Busca Global */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <Input
              placeholder="Buscar documentos, processos, objetos..."
              value={filtros.busca}
              onChange={(e) => handleFiltroChange('busca', e.target.value)}
              className="pl-10 h-10"
            />
          </div>
        </div>

        {/* Botão para Filtros Avançados */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setExpandido(!expandido)}
            className="flex items-center gap-2 h-10"
          >
            <Filter className="w-4 h-4" />
            Filtros Avançados
            {expandido ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>

          <Button variant="ghost" onClick={limparFiltros} className="h-10">
            Limpar Filtros
          </Button>
        </div>

        {/* Filtros Secundários (Expansíveis) */}
        {expandido && (
          <div className="pt-6 mt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Período */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Período</label>
                <div className="flex gap-2">
                  <Input
                    type="date"
                    value={filtros.periodo.inicio}
                    onChange={(e) => handleFiltroChange('periodo', { ...filtros.periodo, inicio: e.target.value })}
                    className="text-xs h-10"
                  />
                  <Input
                    type="date"
                    value={filtros.periodo.fim}
                    onChange={(e) => handleFiltroChange('periodo', { ...filtros.periodo, fim: e.target.value })}
                    className="text-xs h-10"
                  />
                </div>
              </div>
              
              {/* Espada */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Espada</label>
                <Select 
                  value={filtros.espada?.toString() || 'Todas'} 
                  onValueChange={(value) => handleFiltroChange('espada', value === 'Todas' ? 'Todas' : parseInt(value))}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todas">Todas</SelectItem>
                    {[1, 2, 3, 4, 5, 6, 7].map(espada => (
                      <SelectItem key={espada} value={espada.toString()}>Espada {espada}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Origem */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Origem do Documento</label>
                <Select value={filtros.origem} onValueChange={(value) => handleFiltroChange('origem', value)}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todas">Todas</SelectItem>
                    <SelectItem value="Criado na LUMEN">Criado na LUMEN</SelectItem>
                    <SelectItem value="Importado">Importado</SelectItem>
                    <SelectItem value="Sincronizado via integração">Sincronizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <Select value={filtros.status || 'Todos'} onValueChange={(value) => handleFiltroChange('status', value)}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="em andamento">Em andamento</SelectItem>
                    <SelectItem value="concluido">Concluído</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
