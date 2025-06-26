
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { EmendasSummaryCards } from './emendas/EmendasSummaryCards';
import { EmendasChart } from './emendas/EmendasChart';
import { EmendasFilters } from './emendas/EmendasFilters';
import { EmendaCard, EmendaData } from './emendas/EmendaCard';

export const Emendas = () => {
  // Dados expandidos das emendas
  const emendas: EmendaData[] = [
    {
      numero: 'EM-2024-001',
      tipo: 'Individual - Impositiva',
      autor: 'Dep. João Silva',
      objeto: 'Reforma e ampliação da UBS Central',
      valor: 2500000,
      recebida: 1500000,
      status: 'em_execucao',
      origem: 'Federal',
      caracterImpositivo: true,
      destinatarioFinal: 'Município',
      exigeConvenio: true,
      modalidadeExecucao: 'Convênio',
      alertasRisco: []
    },
    {
      numero: 'EM-2024-015',
      tipo: 'Bancada - Coletiva',
      autor: 'Bancada Estadual',
      objeto: 'Aquisição de equipamentos hospitalares',
      valor: 1800000,
      recebida: 1800000,
      status: 'risco_prazo',
      origem: 'Estadual',
      caracterImpositivo: false,
      destinatarioFinal: 'Município',
      exigeConvenio: true,
      modalidadeExecucao: 'Convênio',
      alertasRisco: ['Risco de questionamento do TCE: Ausência de exigências documentais padrão']
    },
    {
      numero: 'EM-2024-032',
      tipo: 'Individual - Impositiva',
      autor: 'Sen. Maria Santos',
      objeto: 'Pavimentação da Rua das Flores',
      valor: 3200000,
      recebida: 0,
      status: 'aguardando',
      origem: 'Federal',
      caracterImpositivo: true,
      destinatarioFinal: 'Município',
      exigeConvenio: false,
      modalidadeExecucao: 'PIX',
      funcaoIndicada: 'Urbanismo (17)',
      statusPIX: 'aguardando_programacao',
      prazoLimite: new Date('2025-03-15'),
      alertasRisco: [
        'Risco de Glosa: Empenho incorreto da função indicada',
        'Alerta TCU: Falta de rastreabilidade na aplicação'
      ]
    },
    {
      numero: 'EM-2024-048',
      tipo: 'Relator (RP9)',
      autor: 'Rel. Carlos Oliveira',
      objeto: 'Construção de creche municipal',
      valor: 1500000,
      recebida: 750000,
      status: 'em_execucao',
      origem: 'Federal',
      caracterImpositivo: true,
      destinatarioFinal: 'Município',
      exigeConvenio: true,
      modalidadeExecucao: 'Convênio',
      alertasRisco: []
    },
    {
      numero: 'EM-2024-063',
      tipo: 'Individual - Impositiva',
      autor: 'Dep. Ana Costa',
      objeto: 'Equipamentos para Educação Digital',
      valor: 800000,
      recebida: 800000,
      status: 'concluido',
      origem: 'Federal',
      caracterImpositivo: true,
      destinatarioFinal: 'Município',
      exigeConvenio: false,
      modalidadeExecucao: 'PIX',
      funcaoIndicada: 'Educação (12)',
      statusPIX: 'liquidado',
      alertasRisco: []
    }
  ];

  // Estados para filtros
  const [activeFilters, setActiveFilters] = useState<{
    tipo?: string;
    origem?: string;
    status?: string;
    modalidade?: string;
    objeto?: string;
  }>({});

  // Opções de filtro dinâmicas
  const filterOptions = useMemo(() => {
    const tipos = [...new Set(emendas.map(e => e.tipo))];
    const origens = [...new Set(emendas.map(e => e.origem))];
    const status = [...new Set(emendas.map(e => e.status))];
    const modalidades = [...new Set(emendas.map(e => e.modalidadeExecucao))];
    const objetos = [...new Set(emendas.map(e => e.objeto.split(' ')[0]))]; // Primeira palavra do objeto

    return { tipos, origens, status, modalidades, objetos };
  }, [emendas]);

  // Emendas filtradas
  const emendasFiltradas = useMemo(() => {
    return emendas.filter(emenda => {
      if (activeFilters.tipo && !emenda.tipo.includes(activeFilters.tipo)) return false;
      if (activeFilters.origem && emenda.origem !== activeFilters.origem) return false;
      if (activeFilters.status && emenda.status !== activeFilters.status) return false;
      if (activeFilters.modalidade && emenda.modalidadeExecucao !== activeFilters.modalidade) return false;
      if (activeFilters.objeto && !emenda.objeto.toLowerCase().includes(activeFilters.objeto.toLowerCase())) return false;
      return true;
    });
  }, [emendas, activeFilters]);

  // Dados do resumo
  const summary = useMemo(() => {
    const totalEmendas = emendas.length;
    const valorTotal = emendas.reduce((acc, emenda) => acc + emenda.valor, 0);
    const valorRecebido = emendas.reduce((acc, emenda) => acc + emenda.recebida, 0);
    const valorPendente = valorTotal - valorRecebido;
    const emendasPIX = emendas.filter(e => e.modalidadeExecucao === 'PIX').length;
    const valorTotalPIX = emendas.filter(e => e.modalidadeExecucao === 'PIX').reduce((acc, e) => acc + e.valor, 0);

    return {
      totalEmendas,
      valorTotal,
      valorRecebido,
      valorPendente,
      emendasPIX,
      valorTotalPIX
    };
  }, [emendas]);

  // Dados do gráfico por tipo
  const chartData = useMemo(() => {
    const tiposMap = new Map();
    emendas.forEach(emenda => {
      const tipo = emenda.tipo.split(' - ')[0]; // Pega só a primeira parte
      tiposMap.set(tipo, (tiposMap.get(tipo) || 0) + emenda.valor);
    });

    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
    
    return Array.from(tiposMap.entries()).map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length]
    }));
  }, [emendas]);

  // Handlers
  const handleFilterChange = (filterType: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType as keyof typeof prev] === value ? undefined : value
    }));
  };

  const handleClearFilters = () => {
    setActiveFilters({});
  };

  const handleVerDetalhes = (numero: string) => {
    console.log(`Ver detalhes da emenda: ${numero}`);
    // Aqui seria implementada a navegação para outras abas
  };

  return (
    <div className="space-y-6">
      {/* Cards de Resumo Expandidos */}
      <EmendasSummaryCards summary={summary} />

      {/* Gráfico de Distribuição por Tipo */}
      <EmendasChart data={chartData} />

      {/* Sistema de Filtros */}
      <EmendasFilters
        options={filterOptions}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* Lista Detalhada de Emendas */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Emendas Parlamentares</span>
            <span className="text-sm font-normal text-gray-600">
              {emendasFiltradas.length} de {emendas.length} emendas
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emendasFiltradas.length > 0 ? (
              emendasFiltradas.map((emenda, index) => (
                <EmendaCard
                  key={index}
                  emenda={emenda}
                  onVerDetalhes={handleVerDetalhes}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Nenhuma emenda encontrada com os filtros aplicados.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
