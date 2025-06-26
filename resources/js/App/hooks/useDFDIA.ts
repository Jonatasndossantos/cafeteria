import { useState, useCallback } from 'react';
import { useDFD } from '../contexts/DFDContext';
import axios from 'axios';

interface SugestaoIA {
    campo: string;
    texto: string;
    confianca: number;
}

interface ValidacaoIA {
    tipo: 'erro' | 'aviso' | 'sucesso';
    mensagem: string;
    referencia?: string;
    sugestao?: string;
}

export const useDFDIA = () => {
    const { dfd, updateDFD } = useDFD();
    const [isLoadingSugestoes, setIsLoadingSugestoes] = useState(false);
    const [isLoadingValidacao, setIsLoadingValidacao] = useState(false);
    const [sugestoes, setSugestoes] = useState<SugestaoIA[]>([]);
    const [validacoes, setValidacoes] = useState<ValidacaoIA[]>([]);

    const obterSugestoes = useCallback(async (campo: string) => {
        if (!dfd) return;

        setIsLoadingSugestoes(true);
        try {
            const response = await axios.post('/api/ia-lux/sugestoes', {
                campo,
                contexto: {
                    tipoObjeto: dfd.tipoObjeto,
                    objeto: dfd.objeto,
                    valorEstimado: dfd.valorTotalEstimado,
                    unidade: dfd.unidadeRequisitante
                }
            });

            setSugestoes(response.data.sugestoes);
        } catch (error) {
            console.error('Erro ao obter sugestões:', error);
            setSugestoes([]);
        } finally {
            setIsLoadingSugestoes(false);
        }
    }, [dfd]);

    const aplicarSugestao = useCallback((campo: string, texto: string) => {
        updateDFD({ [campo]: texto });
        setSugestoes(prev => prev.filter(s => s.campo !== campo));
    }, [updateDFD]);

    const validarConformidade = useCallback(async () => {
        if (!dfd) return;

        setIsLoadingValidacao(true);
        try {
            const response = await axios.post('/api/ia-lux/validar-conformidade', {
                dados: dfd,
                tipoObjeto: dfd.tipoObjeto,
                fase: 'dfd'
            });

            setValidacoes(response.data.validacoes);
        } catch (error) {
            console.error('Erro ao validar conformidade:', error);
            setValidacoes([]);
        } finally {
            setIsLoadingValidacao(false);
        }
    }, [dfd]);

    const detectarDuplicidade = useCallback(async () => {
        if (!dfd || !dfd.objeto) return [];

        try {
            const response = await axios.post('/api/ia-lux/detectar-duplicidades', {
                item: {
                    descricao: dfd.objeto,
                    tipo: dfd.tipoObjeto,
                    valor: dfd.valorTotalEstimado
                }
            });

            return response.data.duplicidades || [];
        } catch (error) {
            console.error('Erro ao detectar duplicidades:', error);
            return [];
        }
    }, [dfd]);

    const gerarJustificativa = useCallback(async () => {
        if (!dfd) return '';

        setIsLoadingSugestoes(true);
        try {
            const response = await axios.post('/api/ia-lux/gerar-justificativa', {
                objeto: dfd.objeto,
                tipoObjeto: dfd.tipoObjeto,
                valorEstimado: dfd.valorTotalEstimado,
                beneficiosEsperados: dfd.beneficiosEsperados
            });

            const justificativa = response.data.justificativa;
            updateDFD({ justificativa });
            return justificativa;
        } catch (error) {
            console.error('Erro ao gerar justificativa:', error);
            return '';
        } finally {
            setIsLoadingSugestoes(false);
        }
    }, [dfd, updateDFD]);

    return {
        isLoadingSugestoes,
        isLoadingValidacao,
        sugestoes,
        validacoes,
        obterSugestoes,
        aplicarSugestao,
        validarConformidade,
        detectarDuplicidade,
        gerarJustificativa
    };
}; 