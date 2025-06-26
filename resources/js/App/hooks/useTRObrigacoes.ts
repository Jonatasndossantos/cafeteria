import { useTRData } from '@/hooks/useTRData';

export const useTRObrigacoes = () => {
  const { data, updateField, isSaving } = useTRData();

  return {
    obrigacoes: data.obrigacoes,
    gestaoFiscalizacao: data.gestaoFiscalizacao,
    sancoes: data.sancoes,
    updateObrigacoes: (field: string, value: string) => updateField('obrigacoes', field, value),
    updateGestao: (field: string, value: string) => updateField('gestaoFiscalizacao', field, value),
    updateSancoes: (field: string, value: string) => updateField('sancoes', field, value),
    isSaving
  };
};
