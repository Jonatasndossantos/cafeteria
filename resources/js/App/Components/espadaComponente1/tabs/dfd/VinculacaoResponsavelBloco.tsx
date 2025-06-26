import { BookOpen, Users } from "lucide-react";
import { useState } from "react";
import { useFormData } from "@/hooks/useFormData";
import { StandardCard } from "@/Components/ui/standard-card";

export function VinculacaoResponsavelBloco() {
  const { formData, updateField, getFieldValue } = useFormData();

  return (
    <StandardCard 
      title="Vinculação e Responsáveis"
      icon={Users}
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Vinculação com outras demandas
        </label>
        <div className="flex items-center mb-2">
          <input 
            type="checkbox" 
            className="h-4 w-4 text-lumen-blue focus:ring-lumen-blue border-gray-300 rounded"
            id="vinculacaoOutrasDemandas"
            checked={getFieldValue('dfd.vinculacaoOutrasDemandas') || false}
            onChange={(e) => updateField('dfd.vinculacaoOutrasDemandas', e.target.checked)}
          />
          <label htmlFor="vinculacaoOutrasDemandas" className="ml-2 text-sm text-gray-700">
            Possui vinculação com outras demandas
          </label>
        </div>
        
        {getFieldValue('dfd.vinculacaoOutrasDemandas') && (
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição da Vinculação *
            </label>
            <textarea 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue transition-colors"
              rows={3}
              placeholder="Descreva a vinculação com outras demandas"
              value={getFieldValue('dfd.descricaoVinculacao') || 'Esta demanda está vinculada ao projeto de modernização tecnológica municipal, complementando as contratações já realizadas pela Secretaria de Administração para informatização dos demais setores.'}
              onChange={(e) => updateField('dfd.descricaoVinculacao', e.target.value)}
              required
            />
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Responsável requisitante (nome) *
          </label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue transition-colors"
            placeholder="Nome completo"
            value={getFieldValue('dfd.responsavelAprovacao')}
            onChange={(e) => updateField('dfd.responsavelAprovacao', e.target.value)}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cargo *
          </label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue transition-colors"
            placeholder="Cargo/função"
            value={getFieldValue('dfd.cargoResponsavel')}
            onChange={(e) => updateField('dfd.cargoResponsavel', e.target.value)}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Matrícula *
          </label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue transition-colors"
            placeholder="Número da matrícula"
            value={getFieldValue('dfd.matriculaResponsavel')}
            onChange={(e) => updateField('dfd.matriculaResponsavel', e.target.value)}
            required
          />
        </div>
      </div>
    </StandardCard>
  );
}
