import { useTRData } from '@/hooks/useTRData';

export const useTRQuantitativos = () => {
  const { data, updateQuantitativosItem, isSaving } = useTRData();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return {
    quantitativos: data.quantitativos,
    updateItem: updateQuantitativosItem,
    formatCurrency,
    isSaving
  };
};
