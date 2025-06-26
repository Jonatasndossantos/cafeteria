
import { useTRData } from './useTRData';

export const useTRGarantias = () => {
  const { data, updateField, updateNestedField, isSaving } = useTRData();

  return {
    garantias: data.garantias,
    updateGarantias: (field: string, value: any) => updateField('garantias', field, value),
    updateGarantiaProduto: (field: string, value: any) => 
      updateNestedField('garantias', 'produto', field, value),
    toggleModalidadeAceita: (modalidade: string) => {
      const current = data.garantias.modalidadesAceitas;
      const updated = current.includes(modalidade)
        ? current.filter(m => m !== modalidade)
        : [...current, modalidade];
      updateField('garantias', 'modalidadesAceitas', updated);
    },
    isSaving
  };
};
