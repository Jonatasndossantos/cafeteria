
import React from 'react';
import { Card, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';

interface FilterOptions {
  tipos: string[];
  origens: string[];
  status: string[];
  modalidades: string[];
  objetos: string[];
}

interface ActiveFilters {
  tipo?: string;
  origem?: string;
  status?: string;
  modalidade?: string;
  objeto?: string;
}

interface EmendasFiltersProps {
  options: FilterOptions;
  activeFilters: ActiveFilters;
  onFilterChange: (filterType: string, value: string) => void;
  onClearFilters: () => void;
}

export const EmendasFilters = ({ 
  options, 
  activeFilters, 
  onFilterChange, 
  onClearFilters 
}: EmendasFiltersProps) => {
  const hasActiveFilters = Object.values(activeFilters).some(filter => filter);

  const FilterGroup = ({ 
    title, 
    filterKey, 
    items 
  }: { 
    title: string; 
    filterKey: string; 
    items: string[] 
  }) => (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-700">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Badge
            key={item}
            variant={activeFilters[filterKey as keyof ActiveFilters] === item ? "default" : "outline"}
            className="cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => onFilterChange(filterKey, item)}
          >
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="dashboard-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center space-x-2">
            <span>🔍</span>
            <span>Filtros</span>
          </h3>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="text-red-600 hover:text-red-700"
            >
              Limpar Filtros
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <FilterGroup
            title="Tipo de Emenda"
            filterKey="tipo"
            items={options.tipos}
          />
          
          <FilterGroup
            title="Origem"
            filterKey="origem"
            items={options.origens}
          />
          
          <FilterGroup
            title="Status"
            filterKey="status"
            items={options.status}
          />
          
          <FilterGroup
            title="Modalidade"
            filterKey="modalidade"
            items={options.modalidades}
          />
          
          <FilterGroup
            title="Área/Objeto"
            filterKey="objeto"
            items={options.objetos}
          />
        </div>
      </CardContent>
    </Card>
  );
};
