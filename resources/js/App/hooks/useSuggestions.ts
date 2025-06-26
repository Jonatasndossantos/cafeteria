import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Interface para as sugestões retornadas pela API
export interface Suggestion {
  id: string;
  text: string;
  confidence: number;
  explanation?: string;
}
interface SuggestionsResponse {
  suggestions: Suggestion[];
}

// Função para buscar sugestões via API REST
async function fetchSuggestions(field: string, currentValue?: string): Promise<SuggestionsResponse> {
  try {
    const { data } = await axios.get('/api/suggestions', {
      params: { field, currentValue }
    });
    return data.suggestions || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching suggestions:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
    }
    throw error;
  }
}

// Hook personalizado para gerenciar sugestões usando TanStack Query
export function useSuggestions(
  field: string,
  enabled: boolean,
  currentValue?: string
) {
  // Usando o hook useQuery do TanStack Query para gerenciar o estado e cache das sugestões
  return useQuery({
    // Chave única para identificar esta query no cache
    queryKey: ['suggestions', field, currentValue],
    
    // Função que faz a requisição para a API via API REST
    queryFn: () => fetchSuggestions(field, currentValue),
    
    // Só executa a query quando enabled for true
    enabled,
    
    // Configurações adicionais
    staleTime: 1000 * 60 * 5, // Considera os dados "frescos" por 5 minutos
    gcTime: 1000 * 60 * 30, // Mantém no cache por 30 minutos
    retry: (failureCount, error) => {
      // Retry até 3 vezes, mas não para erros 400 ou 401
      if (axios.isAxiosError(error) && (error.response?.status === 400 || error.response?.status === 401)) {
        return false;
      }
      return failureCount < 1;
    },
    refetchOnWindowFocus: false, // Não refetch quando a janela ganha foco
  });
} 