import { useState, useEffect } from 'react';

// Interface para os dados herdados
export interface ProcessoLegadoData {
  numeroEdital: string;
  matrizRiscos: string;
  termoReferencia: string;
  objeto: string;
  modalidade: string;
  tipoJulgamento: string;
  modoDisputa: string;
  valorEstimado: string;
}

// Mock dos dados que viriam do backend
const mockProcessoLegadoData: ProcessoLegadoData = {
  numeroEdital: 'EDITAL-2023-0001',
  matrizRiscos: 'MR-2023-0001',
  termoReferencia: 'TR-2023-0001',
  objeto: 'Aquisição de computadores para a Secretaria de Educação',
  modalidade: 'Pregão',
  tipoJulgamento: 'Menor Preço',
  modoDisputa: 'Aberto',
  valorEstimado: 'R$ 150.000,00',
};

/**
 * Hook para buscar dados do processo legado (Espadas anteriores).
 *
 * NOTA: Atualmente, este hook retorna dados mockados. No futuro,
 * ele deve ser conectado a uma chamada de API real para buscar
 * os dados do processo principal.
 */
export const useProcessoLegadoData = () => {
  const [data, setData] = useState<ProcessoLegadoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula uma chamada de API
    const fetchLegacyData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simula latência da rede
      setData(mockProcessoLegadoData);
      setIsLoading(false);
    };

    fetchLegacyData();
  }, []);

  return { data, isLoading };
}; 