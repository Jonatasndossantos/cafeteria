
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockFormData, mockApiResponse } from '../data/mockData';

export const useFormData = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['formData'],
    queryFn: async () => {
      // Simula busca de dados da API
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockFormData;
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  const updateMutation = useMutation({
    mutationFn: async (newData: Partial<typeof mockFormData>) => {
      return await mockApiResponse(newData);
    },
    onSuccess: (updatedData) => {
      queryClient.setQueryData(['formData'], updatedData);
      console.log('Dados atualizados com sucesso:', updatedData);
    },
    onError: (error) => {
      console.error('Erro ao atualizar dados:', error);
    }
  });

  const saveMutation = useMutation({
    mutationFn: async (data: typeof mockFormData) => {
      console.log('Salvando dados completos:', data);
      return await mockApiResponse(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['formData'] });
      console.log('Dados salvos com sucesso!');
    }
  });

  const updateField = (field: string, value: any) => {
    if (data) {
      const updatedData = { ...data, [field]: value };
      updateMutation.mutate({ [field]: value });
    }
  };

  const updateFields = (fields: Partial<typeof mockFormData>) => {
    updateMutation.mutate(fields);
  };

  const saveAll = () => {
    if (data) {
      saveMutation.mutate(data);
    }
  };

  return {
    data: data || mockFormData,
    isLoading,
    error,
    updateField,
    updateFields,
    saveAll,
    isUpdating: updateMutation.isPending,
    isSaving: saveMutation.isPending,
    updateError: updateMutation.error,
    saveError: saveMutation.error
  };
};
