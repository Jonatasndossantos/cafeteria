import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Interface para o retorno da API
export interface TesteResponse {
  message: string;
  data?: any;
}

// Função para fazer a requisição à API
async function fetchTeste(input: string): Promise<TesteResponse> {
  try {
    const { data } = await axios.get('/api/teste', {
      params: { input }
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching teste:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
    }
    throw error;
  }
}

// Hook personalizado para gerenciar o teste
export function useTeste(
  input: string,
  enabled: boolean
) {
  return useQuery({
    queryKey: ['teste', input],
    queryFn: () => fetchTeste(input),
    enabled,
    staleTime: 1000 * 60 * 60 * 24, // 24 horas - mesmo tempo do cache do backend
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 dias
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error) && (error.response?.status === 400 || error.response?.status === 401)) {
        return false;
      }
      return failureCount < 3;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false, // Não refetch ao montar o Componente
    refetchOnReconnect: false, // Não refetch ao reconectar
  });
} 