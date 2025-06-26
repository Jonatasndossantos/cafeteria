
import React, { useState } from 'react';
import { Card, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Download, Filter, MapPin, Calendar, Building, Briefcase } from 'lucide-react';

interface ObrasFiltersProps {
  activeFilters: {
    status: string;
    origem: string;
    secretaria: string;
    tipo: string;
    localizacao: string;
    vigencia: string;
    ordenacao: string;
  };
  onFilterChange: (filterType: string, value: string) => void;
  onClearFilters: () => void;
  onGenerateReport: () => void;
}

export const ObrasFilters = ({ 
  activeFilters, 
  onFilterChange, 
  onClearFilters, 
  onGenerateReport 
}: ObrasFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const statusOptions = [
    { value: 'todos', label: 'Todos os Status' },
    { value: 'em-andamento', label: 'Em Andamento' },
    { value: 'atrasada', label: 'Atrasada' },
    { value: 'paralisada', label: 'Paralisada' },
    { value: 'finalizando', label: 'Finalizando' },
    { value: 'concluida', label: 'Concluída' }
  ];

  const origemOptions = [
    { value: 'todos', label: 'Todas as Origens' },
    { value: 'federal', label: 'Federal' },
    { value: 'estadual', label: 'Estadual' },
    { value: 'municipal', label: 'Municipal' }
  ];

  const tipoOptions = [
    { value: 'todos', label: 'Todos os Tipos' },
    { value: 'saude', label: 'Saúde' },
    { value: 'educacao', label: 'Educação' },
    { value: 'infraestrutura', label: 'Infraestrutura' },
    { value: 'social', label: 'Assistência Social' }
  ];

  const getActiveFiltersCount = () => {
    return Object.values(activeFilters).filter(value => value && value !== 'todos').length;
  };

  return (
    <Card className="dashboard-card mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Botões principais */}
          <div className="flex items-center space-x-3">
            <Button
              onClick={onGenerateReport}
              className="bg-lumen-blue hover:bg-lumen-blue-dark text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              📥 Gerar Relatório Executivo (PDF)
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="relative"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
              {getActiveFiltersCount() > 0 && (
                <Badge className="ml-2 bg-lumen-gold text-lumen-blue">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </Button>

            {getActiveFiltersCount() > 0 && (
              <Button variant="ghost" onClick={onClearFilters} className="text-gray-600">
                Limpar Filtros
              </Button>
            )}
          </div>
        </div>

        {/* Filtros expandidos */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  Status
                </label>
                <Select value={activeFilters.status} onValueChange={(value) => onFilterChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Building className="h-4 w-4 mr-1" />
                  Origem
                </label>
                <Select value={activeFilters.origem} onValueChange={(value) => onFilterChange('origem', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {origemOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Tipo de Obra
                </label>
                <Select value={activeFilters.tipo} onValueChange={(value) => onFilterChange('tipo', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tipoOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  📆 Vigência
                </label>
                <Select value={activeFilters.vigencia} onValueChange={(value) => onFilterChange('vigencia', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas as Vigências</SelectItem>
                    <SelectItem value="60-dias">Até 60 dias</SelectItem>
                    <SelectItem value="30-dias">Até 30 dias</SelectItem>
                    <SelectItem value="vencidas">Vencidas</SelectItem>
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
