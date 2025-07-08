import React, { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Card, CardContent } from '@/Components/ui/card';
import { Search, Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
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

  // Verificar se há filtros ativos
  const temFiltrosAtivos = 
    filtros.numeroProcesso || 
    filtros.busca || 
    filtros.tipo !== 'Todos' || 
    filtros.modalidade !== 'Todos' || 
    filtros.setor_id || 
    filtros.periodo.inicio || 
    filtros.periodo.fim || 
    filtros.valorMin || 
    filtros.valorMax || 
    filtros.status !== 'Todos';

  return (
    <Card className="mb-6 shadow-sm border-gray-200">
      <CardContent className="p-6">
        {/* Header com título e indicador de filtros ativos */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Filter className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Filtros de Busca</h3>
              <p className="text-sm text-gray-500">Encontre documentos específicos</p>
            </div>
          </div>
          
          {temFiltrosAtivos && (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Filtros ativos
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={limparFiltros}
                className="h-8 px-3 text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4 mr-1" />
                Limpar
              </Button>
            </div>
          )}
        </div>

        {/* Campo de Busca Global - Destaque */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Busca Global
          </label>
          <div className="relative">
            <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
            <Input
              placeholder="Buscar por número da solicitação, objeto, setor..."
              value={filtros.busca}
              onChange={(e) => handleFiltroChange('busca', e.target.value)}
              className="pl-12 h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Filtros Primários */}
        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Número do Processo */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Número da Solicitação
            </label>
            <Input
              placeholder="Ex: PA-2025/00042"
              value={filtros.numeroProcesso || ''}
              onChange={(e) => handleFiltroChange('numeroProcesso', e.target.value)}
              className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Tipo */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Tipo de Documento
            </label>
            <Select value={filtros.tipo || 'Todos'} onValueChange={(value) => handleFiltroChange('tipo', value)}>
              <SelectTrigger className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos os Tipos</SelectItem>
                <SelectItem value="Produtos de Consumo">Produtos de Consumo</SelectItem>
                <SelectItem value="Ingredientes Alimentares">Ingredientes Alimentares</SelectItem>
                <SelectItem value="Materiais de Limpeza e Higiene">Materiais de Limpeza e Higiene</SelectItem>
                <SelectItem value="Equipamentos e Utensílios">Equipamentos e Utensílios</SelectItem>
                <SelectItem value="Serviços">Serviços</SelectItem>
                <SelectItem value="Materiais Administrativos">Materiais Administrativos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Modalidade */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Modalidade
            </label>
            <Select value={filtros.modalidade} onValueChange={(value) => handleFiltroChange('modalidade', value)}>
              <SelectTrigger className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Selecione a modalidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todas as Modalidades</SelectItem>
                
                {/* Separador - Modalidades */}
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50 border-t border-b border-gray-100">
                  🔹 Modalidades Disponíveis
                </div>
                <SelectItem value="Compra Direta">Compra Direta</SelectItem>
                <SelectItem value="Cotação com Fornecedores (Orçamento)">Cotação com Fornecedores</SelectItem>
                <SelectItem value="Contrato com Fornecedor Fixo">Contrato com Fornecedor Fixo</SelectItem>
                <SelectItem value="Requisição Emergencial">Requisição Emergencial</SelectItem>
                <SelectItem value="Compra Programada">Compra Programada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Setores */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Setor Responsável
            </label>
            <Select value={filtros.setor_id || 'todas'} onValueChange={(value) => handleFiltroChange('setor_id', value === 'todas' ? undefined : value)}>
              <SelectTrigger className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Selecione o setor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todos os Setores</SelectItem>
                {setores.map((setor: Setor) => (
                  <SelectItem key={setor.id} value={String(setor.id)}>
                    {setor.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Botão para Filtros Avançados */}
        <div className="flex items-center justify-center">
          <Button
            variant="outline"
            onClick={() => setExpandido(!expandido)}
            className="flex items-center gap-2 h-11 px-6 border-gray-300 hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            {expandido ? 'Ocultar' : 'Mostrar'} Filtros Avançados
            {expandido ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>

        {/* Filtros Secundários (Expansíveis) */}
        {expandido && (
          <div className="pt-6 mt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Período */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Período de Publicação
                </label>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">De</label>
                    <Input
                      type="date"
                      value={filtros.periodo.inicio}
                      onChange={(e) => handleFiltroChange('periodo', { ...filtros.periodo, inicio: e.target.value })}
                      className="h-10 text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Até</label>
                    <Input
                      type="date"
                      value={filtros.periodo.fim}
                      onChange={(e) => handleFiltroChange('periodo', { ...filtros.periodo, fim: e.target.value })}
                      className="h-10 text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Valor Mínimo */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Valor Mínimo (R$)
                </label>
                <Input
                  type="number"
                  placeholder="0,00"
                  value={filtros.valorMin || ''}
                  onChange={(e) => handleFiltroChange('valorMin', e.target.value ? parseFloat(e.target.value) : undefined)}
                  className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Valor Máximo */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Valor Máximo (R$)
                </label>
                <Input
                  type="number"
                  placeholder="0,00"
                  value={filtros.valorMax || ''}
                  onChange={(e) => handleFiltroChange('valorMax', e.target.value ? parseFloat(e.target.value) : undefined)}
                  className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
          
              {/* Status */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Status do Processo
                </label>
                <Select value={filtros.status || 'Todos'} onValueChange={(value) => handleFiltroChange('status', value)}>
                  <SelectTrigger className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos os Status</SelectItem>
                    <SelectItem value="em andamento">Em Andamento</SelectItem>
                    <SelectItem value="concluido">Concluído</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                    <SelectItem value="suspenso">Suspenso</SelectItem>
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
