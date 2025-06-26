import { useTRData } from '@/hooks/useTRData';

export const useTRPrazos = () => {
  const { data, updateField, updateNestedField, isSaving } = useTRData();

  return {
    prazos: data.prazos,
    especificacoes: data.especificacoes,
    updatePrazos: (field: string, value: any) => updateField('prazos', field, value),
    updatePrazoExecucao: (field: string, value: any) => 
      updateNestedField('prazos', 'execucao', field, value),
    updatePrazoVigencia: (field: string, value: any) => 
      updateNestedField('prazos', 'vigencia', field, value),
    updateEspecificacoes: (field: string, value: string) => updateField('especificacoes', field, value),
    isSaving
  };
};
