
import React, { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';

export const ApontamentosFilters = ({ onFilterChange }: { onFilterChange: (filters: any) => void }) => {
  const [activeFilters, setActiveFilters] = useState({
    orgao: 'todos',
    prazo: 'todos',
    status: 'todos'
  });

  const filterOptions = {
    orgao: [
      { value: 'todos', label: 'Todos os Órgãos' },
      { value: 'tce', label: 'TCE' },
      { value: 'mp', label: 'Ministério Público' },
      { value: 'cgu', label: 'CGU' },
      { value: 'auditoria', label: 'Auditoria Interna' },
      { value: 'outros', label: 'Outros' }
    ],
    prazo: [
      { value: 'todos', label: 'Todos os Prazos' },
      { value: 'urgente', label: 'Mais Urgentes' },
      { value: 'medio', label: 'Prazo Médio' },
      { value: 'longo', label: 'Prazo Longo' }
    ],
    status: [
      { value: 'todos', label: 'Todos os Status' },
      { value: 'andamento', label: 'Em Andamento' },
      { value: 'aguardando', label: 'Aguardando Ação' },
      { value: 'analise', label: 'Em Análise' },
      { value: 'recurso', label: 'Em Recurso' },
      { value: 'concluido', label: 'Concluído' }
    ]
  };

  const handleFilterChange = (type: string, value: string) => {
    const newFilters = { ...activeFilters, [type]: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <h4 className="font-semibold text-gray-800 mb-4">Filtros</h4>
      
      <div className="space-y-4">
        {/* Filtro por Órgão */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Por Órgão:</label>
          <div className="flex flex-wrap gap-2">
            {filterOptions.orgao.map((option) => (
              <Button
                key={option.value}
                variant={activeFilters.orgao === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterChange('orgao', option.value)}
                className="text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Filtro por Prazo */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Por Prazo:</label>
          <div className="flex flex-wrap gap-2">
            {filterOptions.prazo.map((option) => (
              <Button
                key={option.value}
                variant={activeFilters.prazo === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterChange('prazo', option.value)}
                className="text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Filtro por Status */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Por Status:</label>
          <div className="flex flex-wrap gap-2">
            {filterOptions.status.map((option) => (
              <Button
                key={option.value}
                variant={activeFilters.status === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterChange('status', option.value)}
                className="text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Filtros Ativos */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600">Filtros ativos:</span>
          {Object.entries(activeFilters).map(([key, value]) => {
            if (value !== 'todos') {
              const option = filterOptions[key as keyof typeof filterOptions].find(opt => opt.value === value);
              return (
                <Badge key={key} variant="secondary" className="text-xs">
                  {option?.label}
                </Badge>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};
