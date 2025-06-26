import { useMemo } from 'react';
import { useDFD } from '../contexts/DFDContext';

interface ValidationError {
    field: string;
    message: string;
    type: 'error' | 'warning';
}

interface ValidationResult {
    isValid: boolean;
    errors: ValidationError[];
    warnings: ValidationError[];
    canFormalize: boolean;
}

export const useDFDValidation = (): ValidationResult => {
    const { dfd } = useDFD();

    const validation = useMemo(() => {
        const errors: ValidationError[] = [];
        const warnings: ValidationError[] = [];

        if (!dfd) {
            return { isValid: false, errors, warnings, canFormalize: false };
        }

        // Validações obrigatórias
        if (!dfd.objeto || dfd.objeto.length < 10) {
            errors.push({
                field: 'objeto',
                message: 'Objeto da contratação deve ter pelo menos 10 caracteres',
                type: 'error'
            });
        }

        if (!dfd.justificativa || dfd.justificativa.length < 50) {
            errors.push({
                field: 'justificativa',
                message: 'Justificativa deve ter pelo menos 50 caracteres',
                type: 'error'
            });
        }

        if (!dfd.tipoObjeto) {
            errors.push({
                field: 'tipoObjeto',
                message: 'Tipo do objeto é obrigatório',
                type: 'error'
            });
        }

        if (dfd.itens.length === 0) {
            errors.push({
                field: 'itens',
                message: 'Deve haver pelo menos um item especificado',
                type: 'error'
            });
        }

        if (dfd.valorTotalEstimado <= 0) {
            errors.push({
                field: 'valorTotalEstimado',
                message: 'Valor total estimado deve ser maior que zero',
                type: 'error'
            });
        }

        if (!dfd.prazoEntrega) {
            errors.push({
                field: 'prazoEntrega',
                message: 'Prazo de entrega é obrigatório',
                type: 'error'
            });
        }

        // Validações de vinculação
        if (!dfd.vinculacaoPCA.consta && !dfd.vinculacaoPCA.justificativa) {
            warnings.push({
                field: 'vinculacaoPCA',
                message: 'Se não consta no PCA, é recomendável incluir justificativa',
                type: 'warning'
            });
        }

        if (!dfd.vinculacaoOrcamentaria.classificacaoOrcamentaria) {
            errors.push({
                field: 'vinculacaoOrcamentaria',
                message: 'Classificação orçamentária é obrigatória',
                type: 'error'
            });
        }

        // Validações de responsável
        if (!dfd.responsavelDemanda) {
            errors.push({
                field: 'responsavelDemanda',
                message: 'Responsável pela demanda é obrigatório',
                type: 'error'
            });
        }

        if (!dfd.emailResponsavel || !isValidEmail(dfd.emailResponsavel)) {
            errors.push({
                field: 'emailResponsavel',
                message: 'Email do responsável inválido',
                type: 'error'
            });
        }

        // Validações de encaminhamento
        if (!dfd.encaminhamento.destinatario) {
            warnings.push({
                field: 'encaminhamento',
                message: 'Destinatário do encaminhamento não especificado',
                type: 'warning'
            });
        }

        // Validações específicas por tipo de objeto
        if (dfd.tipoObjeto === 'bem' && !dfd.codigoCatmat) {
            warnings.push({
                field: 'codigoCatmat',
                message: 'Código CATMAT é recomendável para bens',
                type: 'warning'
            });
        }

        const isValid = errors.length === 0;
        const canFormalize = isValid && dfd.status === 'aguardando_aprovacao';

        return { isValid, errors, warnings, canFormalize };
    }, [dfd]);

    return validation;
};

function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
} 