
import { useTRData } from './useTRData';

export const useTRRequisitos = () => {
  const { data, updateField, isSaving } = useTRData();

  return {
    requisitos: data.requisitos,
    sustentabilidade: data.sustentabilidade,
    updateRequisitos: (field: string, value: string) => updateField('requisitos', field, value),
    updateSustentabilidade: (field: string, value: any) => updateField('sustentabilidade', field, value),
    isSaving
  };
};
