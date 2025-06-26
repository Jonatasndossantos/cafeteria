
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockTRData, TRFormData } from './mockTRData';

export const useTRData = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['trFormData'],
    queryFn: () => {
      // Simula uma API call com delay
      return new Promise<TRFormData>((resolve) => {
        setTimeout(() => {
          console.log('📋 Dados do TR carregados pela IA-LUX:', mockTRData);
          resolve(mockTRData);
        }, 500);
      });
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  const updateMutation = useMutation({
    mutationFn: (newData: Partial<TRFormData>) => {
      console.log('💾 Salvando dados do TR:', newData);
      return new Promise<TRFormData>((resolve) => {
        setTimeout(() => {
          const updatedData = { ...mockTRData, ...newData };
          resolve(updatedData);
        }, 300);
      });
    },
    onSuccess: (updatedData) => {
      queryClient.setQueryData(['trFormData'], updatedData);
      console.log('✅ Dados salvos com sucesso!');
    }
  });

  const updateField = (section: keyof TRFormData, field: string, value: any) => {
    if (!data) return;
    
    const currentData = queryClient.getQueryData(['trFormData']) as TRFormData;
    const updatedSection = {
      ...currentData[section],
      [field]: value
    };
    
    const updatedData = {
      ...currentData,
      [section]: updatedSection
    };
    
    // Otimistic update
    queryClient.setQueryData(['trFormData'], updatedData);
    
    // Trigger mutation
    updateMutation.mutate({ [section]: updatedSection } as Partial<TRFormData>);
  };

  const updateNestedField = (section: keyof TRFormData, nestedField: string, field: string, value: any) => {
    if (!data) return;
    
    const currentData = queryClient.getQueryData(['trFormData']) as TRFormData;
    const updatedSection = {
      ...currentData[section],
      [nestedField]: {
        ...(currentData[section] as any)[nestedField],
        [field]: value
      }
    };
    
    const updatedData = {
      ...currentData,
      [section]: updatedSection
    };
    
    queryClient.setQueryData(['trFormData'], updatedData);
    updateMutation.mutate({ [section]: updatedSection } as Partial<TRFormData>);
  };

  const updateQuantitativosItem = (itemId: number, field: string, value: any) => {
    if (!data) return;
    
    const currentData = queryClient.getQueryData(['trFormData']) as TRFormData;
    const updatedItems = currentData.quantitativos.items.map(item => 
      item.id === itemId ? { ...item, [field]: value } : item
    );
    
    // Recalcular valor total se necessário
    if (field === 'quantidade' || field === 'valorUnitario') {
      const item = updatedItems.find(i => i.id === itemId);
      if (item) {
        item.valorTotal = item.quantidade * item.valorUnitario;
      }
    }
    
    const valorTotalGeral = updatedItems.reduce((total, item) => total + item.valorTotal, 0);
    
    const updatedQuantitativos = {
      ...currentData.quantitativos,
      items: updatedItems,
      valorTotalGeral
    };
    
    const updatedData = {
      ...currentData,
      quantitativos: updatedQuantitativos
    };
    
    queryClient.setQueryData(['trFormData'], updatedData);
    updateMutation.mutate({ quantitativos: updatedQuantitativos });
  };

  return {
    data: data || mockTRData,
    isLoading,
    error,
    updateField,
    updateNestedField,
    updateQuantitativosItem,
    isSaving: updateMutation.isPending,
    saveError: updateMutation.error
  };
};
