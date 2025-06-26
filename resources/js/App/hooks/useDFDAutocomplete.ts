import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useDFD } from '../contexts/DFDContext';
import { useSharedData } from '../contexts/SharedDataContext';
import { useAuth } from '../contexts/AuthContext';

interface AutocompleteResponse {
    sugestoes: {
        justificativa?: string;
        beneficiosEsperados?: string;
        codigoCatmat?: string;
        valorEstimado?: number;
        naturezaDespesa?: string;
        classificacaoOrcamentaria?: string;
    };
}

interface UseAutocompleteOptions {
    minLength?: number;
    debounceDelay?: number;
    onSuccess?: (data: AutocompleteResponse['sugestoes']) => void;
    onError?: (error: any) => void;
}

export const useDFDAutocomplete = (options: UseAutocompleteOptions = {}) => {
    const { minLength = 3, debounceDelay = 500, onSuccess, onError } = options;
    
    const { dfd, updateDFD } = useDFD();
    const { updateSharedData } = useSharedData();
    const { user } = useAuth();
    
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<AutocompleteResponse['sugestoes'] | null>(null);
    const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const fetchAutocomplete = useCallback(async (objeto: string, tipoObjeto: string) => {
        if (objeto.length < minLength) return;
        
        setIsLoading(true);
        try {
            const response = await axios.post<AutocompleteResponse>('/api/dfd/autocomplete', {
                tipoObjeto,
                objeto,
                unidade: user?.orgaoNome || dfd?.unidadeRequisitante
            });
            
            const sugestoes = response.data.sugestoes;
            setSuggestions(sugestoes);
            
            // Atualizar contexto DFD com sugestões
            if (sugestoes) {
                updateDFD({
                    justificativa: sugestoes.justificativa || dfd?.justificativa || '',
                    beneficiosEsperados: sugestoes.beneficiosEsperados || dfd?.beneficiosEsperados || '',
                    codigoCatmat: sugestoes.codigoCatmat || dfd?.codigoCatmat || ''
                });
                
                // Atualizar dados compartilhados
                updateSharedData({
                    objeto: {
                        descricao: objeto,
                        tipo: tipoObjeto,
                        codigoCatmat: sugestoes.codigoCatmat
                    },
                    financeiro: {
                        valorEstimado: sugestoes.valorEstimado || 0,
                        naturezaDespesa: sugestoes.naturezaDespesa || '',
                        fonteRecurso: '',
                        dotacaoOrcamentaria: sugestoes.classificacaoOrcamentaria || ''
                    }
                });
            }
            
            onSuccess?.(sugestoes);
        } catch (error) {
            console.error('Erro ao buscar autocomplete:', error);
            onError?.(error);
        } finally {
            setIsLoading(false);
        }
    }, [minLength, dfd, updateDFD, updateSharedData, user, onSuccess, onError]);

    const triggerAutocomplete = useCallback((objeto: string, tipoObjeto: string) => {
        // Cancelar timer anterior
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        
        // Criar novo timer
        debounceTimerRef.current = setTimeout(() => {
            fetchAutocomplete(objeto, tipoObjeto);
        }, debounceDelay);
    }, [fetchAutocomplete, debounceDelay]);

    // Limpar timer ao desmontar
    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    const reset = useCallback(() => {
        setSuggestions(null);
        setIsLoading(false);
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
    }, []);

    return {
        isLoading,
        suggestions,
        triggerAutocomplete,
        reset
    };
}; 