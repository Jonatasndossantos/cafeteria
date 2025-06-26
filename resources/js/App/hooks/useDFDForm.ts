import { useState, useCallback } from 'react';
import { useDFD } from '../contexts/DFDContext';
import { router } from '@inertiajs/react';
import { DFDCreateData, DFDUpdateData } from '../types/modules/dfd';

interface UseDFDFormProps {
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

export const useDFDForm = ({ onSuccess, onError }: UseDFDFormProps = {}) => {
    const { dfd, updateDFD, saveDFD, formalizeDFD } = useDFD();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFieldChange = useCallback((field: string, value: any) => {
        const fieldParts = field.split('.');
        
        if (fieldParts.length === 1) {
            updateDFD({ [field]: value });
        } else {
            // Handle nested fields
            const updateData: any = {};
            let current = updateData;
            
            for (let i = 0; i < fieldParts.length - 1; i++) {
                current[fieldParts[i]] = {};
                current = current[fieldParts[i]];
            }
            
            current[fieldParts[fieldParts.length - 1]] = value;
            updateDFD(updateData);
        }
    }, [updateDFD]);

    const handleSave = async () => {
        if (!dfd) return;
        
        setIsSubmitting(true);
        try {
            await saveDFD(dfd);
            onSuccess?.();
        } catch (error) {
            onError?.('Erro ao salvar DFD');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFormalizar = async () => {
        if (!dfd) return;
        
        setIsSubmitting(true);
        try {
            await formalizeDFD();
            
            // Redirecionar para próxima espada (ETP)
            router.post('/processos/avancar-fase', {
                processoId: dfd.processoId,
                observacao: 'DFD formalizado com sucesso'
            });
            
            onSuccess?.();
        } catch (error) {
            onError?.('Erro ao formalizar DFD');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData: dfd,
        isSubmitting,
        handleFieldChange,
        handleSave,
        handleFormalizar
    };
}; 