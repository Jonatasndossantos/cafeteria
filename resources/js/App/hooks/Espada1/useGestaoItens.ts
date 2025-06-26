import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

export interface Item {
  id: number;
  descricao: string;
  catmat: string;
  unidade: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}

export interface ObraItem {
  id: number;
  item: string;
  codigo: string;
  descricao: string;
  unidade: string;
  quantidade: number;
  precoUnitario: number;
  precoComBDI: number;
  total: number;
}

// Estado global compartilhado
let globalGestaoItensState: {
  tipoContratacao: 'itens' | 'obras';
  items: (Item | ObraItem)[];
} | null = null;

let gestaoListeners: Array<(state: any) => void> = [];

// Função para notificar listeners
const notifyGestaoListeners = (newState: any) => {
  gestaoListeners.forEach(listener => listener(newState));
};

// Função para inicializar o estado global
const initializeGlobalGestaoState = (initialData: any, defaultType: 'itens' | 'obras') => {
  if (globalGestaoItensState === null) {
    globalGestaoItensState = {
      tipoContratacao: initialData?.metadata?.tipoContratacao || defaultType,
      items: initialData?.metadata?.items || []
    };
  }
  return globalGestaoItensState;
};

// T é o nome do tipo que será usado para referenciar os dois tipos de itens
export function useGestaoItens<T extends Item | ObraItem>(type: 'itens' | 'obras') {
  const { props } = usePage();
  const document = (props as any).document;

  // Inicializa o estado global se necessário
  const initialState = initializeGlobalGestaoState(document, type);

  // Estado local para re-render
  const [localState, setLocalState] = useState(initialState!);

  useEffect(() => {
    // Registra listener para atualizações
    const listener = (newState: any) => {
      setLocalState({ ...newState });
    };

    gestaoListeners.push(listener);

    // Cleanup
    return () => {
      gestaoListeners = gestaoListeners.filter(l => l !== listener);
    };
  }, []);

  // Função para adicionar item
  const addItem = (item: Omit<T, 'id'>) => {
    if (globalGestaoItensState) {
      const newId = globalGestaoItensState.items.length
        ? Math.max(...globalGestaoItensState.items.map(item => item.id)) + 1
        : 1;

      globalGestaoItensState = {
        ...globalGestaoItensState,
        items: [...globalGestaoItensState.items, { ...item, id: newId } as T]
      };

      notifyGestaoListeners(globalGestaoItensState);
    }
  };

  // Função para atualizar item
  const updateItem = (updatedItem: T) => {
    if (globalGestaoItensState) {
      globalGestaoItensState = {
        ...globalGestaoItensState,
        items: globalGestaoItensState.items.map(item =>
          item.id === updatedItem.id ? updatedItem : item
        )
      };

      notifyGestaoListeners(globalGestaoItensState);
    }
  };

  // Função para remover item
  const removeItem = (id: number) => {
    if (globalGestaoItensState) {
      globalGestaoItensState = {
        ...globalGestaoItensState,
        items: globalGestaoItensState.items.filter(item => item.id !== id)
      };

      notifyGestaoListeners(globalGestaoItensState);
    }
  };

  // Função para alterar tipo de contratação
  const handleTipoContratacaoChange = (newType: 'itens' | 'obras') => {
    if (globalGestaoItensState) {
      globalGestaoItensState = {
        ...globalGestaoItensState,
        tipoContratacao: newType,
        // Opcional: limpar itens ao mudar tipo
        items: []
      };

      notifyGestaoListeners(globalGestaoItensState);
    }
  };

  // Função para calcular o valor total
  const getTotalValue = (): number => {
    if (!globalGestaoItensState) return 0;

    return globalGestaoItensState.items.reduce((total, item) => {
      if ('valorTotal' in item) {
        return total + (item as Item).valorTotal;
      } else if ('total' in item) {
        return total + (item as ObraItem).total;
      }
      return total;
    }, 0);
  };

  // Função para obter todos os dados atuais
  const getAllData = () => {
    return globalGestaoItensState ? {
      tipoContratacao: globalGestaoItensState.tipoContratacao,
      items: [...globalGestaoItensState.items]
    } : {
      tipoContratacao: type,
      items: []
    };
  };

  // Função para obter dados atuais
  const getCurrentData = () => {
    return globalGestaoItensState ? { ...globalGestaoItensState } : null;
  };

  return {
    items: localState.items as T[],
    isLoading: false,
    isSaving: false,
    addItem,
    updateItem,
    removeItem,
    getTotalValue,
    tipoContratacao: localState.tipoContratacao,
    setTipoContratacao: handleTipoContratacaoChange,
    getAllData,
    getCurrentData,
  };
}
