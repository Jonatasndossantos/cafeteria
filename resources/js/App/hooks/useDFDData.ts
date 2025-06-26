import { usePage } from '@inertiajs/react';
import { DFDCompleteData, DFDPageProps } from '../types/dfd-data';

export const useDFDData = () => {
    const { props } = usePage<DFDPageProps>();
    
    // Dados padrão para criação
    const defaultDFDData: DFDCompleteData = {
        identificacao: {
            numero: '',
            ano: new Date().getFullYear().toString(),
            unidadeRequisitante: '',
            dataAbertura: new Date().toISOString().split('T')[0],
            responsavel: props.auth?.user?.name || ''
        },
        objetoJustificativa: {
            descricaoObjeto: '',
            justificativa: '',
            objetivoContratacao: '',
            beneficiosEsperados: ''
        },
        quantitativos: {
            itens: [],
            valorTotalEstimado: 0
        },
        requisitosPrazos: {
            prazoEntrega: '',
            localEntrega: '',
            condicoesRecebimento: '',
            garantia: '',
            criteriosAceitacao: ''
        },
        demandasCorrelatas: {
            demandas: []
        },
        vinculacaoResponsavel: {
            responsavelDemanda: props.auth?.user?.name || '',
            cargoResponsavel: '',
            emailResponsavel: props.auth?.user?.email || '',
            telefoneResponsavel: ''
        },
        anexosClassificacao: {
            classificacaoOrcamentaria: '',
            naturezaDespesa: '',
            fonteRecurso: '',
            programaTrabalho: '',
            anexos: []
        },
        encaminhamento: {
            destinatario: '',
            prioridade: 'media',
            observacoes: ''
        },
        validacaoIA: {
            status: 'pendente',
            analise: '',
            sugestoes: [],
            pontuacao: 0
        },
        formData: {
            objeto: 'Aquisição de equipamentos de informática',
            tipoObjeto: 'Bens',
            valorTotal: 45000,
            codigoCatmat: '140.000.001',
            unidade: 'Secretaria de Administração'
        }
    };
    
    // Retorna os dados do DFD ou os dados padrão
    const dfdData = props.dfd || defaultDFDData;
    const mode = props.mode || 'create';
    const auth = props.auth;
    
    return {
        dfdData,
        mode,
        auth,
        isCreateMode: mode === 'create',
        isEditMode: mode === 'edit',
        isViewMode: mode === 'view'
    };
}; 