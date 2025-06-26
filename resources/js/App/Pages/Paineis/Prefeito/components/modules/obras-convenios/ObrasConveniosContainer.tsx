
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { ObrasConveniosSummaryCards } from './ObrasConveniosSummaryCards';
import { ObrasFilters } from './ObrasFilters';
import { ObrasTab } from './ObrasTab';
import { ConveniosTab } from './ConveniosTab';
import { AlertasCriticosRecomendacoes } from './AlertasCriticosRecomendacoes';

export const ObrasConveniosContainer = () => {
  const [activeFilters, setActiveFilters] = useState({
    status: 'todos',
    origem: 'todos',
    secretaria: 'todos',
    tipo: 'todos',
    localizacao: 'todos',
    vigencia: 'todos',
    ordenacao: 'prazo'
  });

  const handleFilterChange = (filterType: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setActiveFilters({
      status: 'todos',
      origem: 'todos',
      secretaria: 'todos',
      tipo: 'todos',
      localizacao: 'todos',
      vigencia: 'todos',
      ordenacao: 'prazo'
    });
  };

  const handleGenerateReport = () => {
    console.log('Gerando relatório executivo...');
    // Implementar geração de relatório PDF
  };

  return (
    <div className="space-y-6">
      <ObrasConveniosSummaryCards />

      <ObrasFilters
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        onGenerateReport={handleGenerateReport}
      />

      <Tabs defaultValue="obras" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="obras">Obras</TabsTrigger>
          <TabsTrigger value="convenios">Convênios</TabsTrigger>
        </TabsList>

        <TabsContent value="obras" className="space-y-4">
          <ObrasTab />
        </TabsContent>

        <TabsContent value="convenios" className="space-y-4">
          <ConveniosTab />
        </TabsContent>
      </Tabs>

      <AlertasCriticosRecomendacoes />
    </div>
  );
};
