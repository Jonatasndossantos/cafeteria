import { useTRData } from '@/hooks/useTRData';

export const useTRObjeto = () => {
  const { data, updateField, updateNestedField, isSaving } = useTRData();

  return {
    objeto: data.objeto,
    metadata: data.metadata,
    updateObjeto: (field: string, value: any) => updateField('objeto', field, value),
    updateResponsavel: (field: string, value: string) => 
      updateNestedField('objeto', 'responsavelTecnico', field, value),
    updateMetadata: (field: string, value: string) => updateField('metadata', field, value),
    isSaving
  };
};
