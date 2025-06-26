import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface Espada1 {
    dfd: {
        orgaoRequisitante: string;
        numero: string;
        dataCriacao: string;
        objetoContratacao: string;
        tipoObjeto: string;
        codigoCatmat: string;
        justificativa: string;
        fontePesquisa: string;
        pcaItemId: string;
        responsavelAprovacao: string;
        cargoResponsavel: string;
        matriculaResponsavel: string;
        justificativaPca: string;
        requisitosTecnicos: string;
        dataPretendida: string;
        grauPrioridade: string;
        justificativaPrioridade: string;
        vinculacaoOutrasDemandas: boolean;
        descricaoVinculacao: string;
        programa: string;
        acao: string;
        elementoDespesa: string;
        fonteRecursos: string;
        mapaCotacao: string;
        destinatario: string;
        observacoesEncaminhamento: string;
        impactosEsperados: string;
        riscosPreliminares: string;
        responsavelNome: string;
        responsavelCargo: string;
        responsavelMatricula: string;
        modalidadeLicitacao: string;
        tipoLicitacao: string;
        criterioJulgamento: string;
        regimeExecucao: string;
        prazoEntrega: string;
        localEntrega: string;
    };
}

// Dados iniciais vazios
const simplificada: Espada1 = {
    dfd: {
        orgaoRequisitante: 'secretaria_educacao',
        numero: 'DFD-2024-0001',
        dataCriacao: '29/05/2024',
        objetoContratacao: 'Aquisição de Equipamentos de Informática',
        tipoObjeto: 'Equipamentos de Informática',
        codigoCatmat: '123456',
        justificativa: 'A aquisição destes equipamentos é fundamental para modernizar o ambiente educacional das escolas municipais, proporcionando aos estudantes acesso a tecnologias atuais e preparando-os para os desafios do século XXI.',
        fontePesquisa: 'painel_precos',
        pcaItemId: 'item1',
        responsavelAprovacao: 'João Carlos Oliveira',
        cargoResponsavel: 'Secretário de Educação',
        matriculaResponsavel: '123456',
        justificativaPca: 'Considerando a identificação da necessidade de contratação do objeto, informamos que a presente demanda consta no PCA vigente desta unidade gestora, item 140.000.001 - Aquisição de Equipamentos de Informática, com previsão orçamentária de R$ 300.000,00 para o 2º trimestre de 2024.',
        requisitosTecnicos: 'Computadores desktop com processador Intel Core i5 ou superior, 8GB RAM, 256GB SSD, Windows 11, garantia mínima de 12 meses. Notebooks com especificações similares para mobilidade. Tablets com tela mínima de 10 polegadas, 64GB armazenamento, Android ou iOS.',
        dataPretendida: '2024-08-15',
        grauPrioridade: 'media',
        justificativaPrioridade: '',
        vinculacaoOutrasDemandas: true,
        descricaoVinculacao: 'Esta demanda está vinculada ao projeto de modernização tecnológica municipal, complementando as contratações já realizadas pela Secretaria de Administração para informatização dos demais setores.',
        programa: '2001',
        acao: '2001.001',
        elementoDespesa: '449052',
        fonteRecursos: 'recursos_proprios',
        mapaCotacao: '',
        destinatario: 'secretario_administracao',
        observacoesEncaminhamento: 'Solicito prioridade na análise desta demanda devido ao cronograma de implementação das metodologias digitais de ensino previstas para o próximo semestre letivo. A modernização dos equipamentos é fundamental para o cumprimento das metas educacionais estabelecidas no Plano Municipal de Educação.',
        impactosEsperados: 'Melhoria na qualidade educacional através da modernização tecnológica das escolas, redução de custos operacionais com manutenção de equipamentos obsoletos, maior eficiência administrativa, capacitação digital de professores e alunos, e alinhamento com as metas do Plano Municipal de Educação Digital.',
        riscosPreliminares: 'Possível atraso na entrega dos equipamentos devido à alta demanda no mercado, necessidade de adequação da infraestrutura elétrica em algumas escolas, risco de furto ou vandalismo, resistência à mudança por parte de alguns usuários, e necessidade de capacitação intensiva para uso adequado dos equipamentos.',
        responsavelNome: 'João Carlos Oliveira',
        responsavelCargo: 'Secretário de Educação',
        responsavelMatricula: '123456',
        modalidadeLicitacao: 'pregao_eletronico',
        tipoLicitacao: 'menor_preco',
        criterioJulgamento: 'menor_preco_por_item',
        regimeExecucao: 'empreitada_integral',
        prazoEntrega: '30',
        localEntrega: 'Almoxarifado Central da Secretaria de Educação'
    }
};

const completa: Espada1 = {
    dfd: {
        orgaoRequisitante: 'secretaria_educacao',
        numero: 'DFD-2024-0001',
        dataCriacao: '29/05/2024',
        objetoContratacao: 'Aquisição de Equipamentos de Informática',
        tipoObjeto: 'Equipamentos de Informática',
        codigoCatmat: '123456',
        justificativa: 'A aquisição destes equipamentos é fundamental para modernizar o ambiente educacional das escolas municipais, proporcionando aos estudantes acesso a tecnologias atuais e preparando-os para os desafios do século XXI.',
        fontePesquisa: 'painel_precos',
        pcaItemId: 'item1',
        responsavelAprovacao: 'João Carlos Oliveira',
        cargoResponsavel: 'Secretário de Educação',
        matriculaResponsavel: '123456',
        justificativaPca: 'Considerando a identificação da necessidade de contratação do objeto, informamos que a presente demanda consta no PCA vigente desta unidade gestora, item 140.000.001 - Aquisição de Equipamentos de Informática, com previsão orçamentária de R$ 300.000,00 para o 2º trimestre de 2024.',
        requisitosTecnicos: 'Computadores desktop com processador Intel Core i5 ou superior, 8GB RAM, 256GB SSD, Windows 11, garantia mínima de 12 meses. Notebooks com especificações similares para mobilidade. Tablets com tela mínima de 10 polegadas, 64GB armazenamento, Android ou iOS.',
        dataPretendida: '2024-08-15',
        grauPrioridade: 'media',
        justificativaPrioridade: '',
        vinculacaoOutrasDemandas: true,
        descricaoVinculacao: 'Esta demanda está vinculada ao projeto de modernização tecnológica municipal, complementando as contratações já realizadas pela Secretaria de Administração para informatização dos demais setores.',
        programa: '2001',
        acao: '2001.001',
        elementoDespesa: '449052',
        fonteRecursos: 'recursos_proprios',
        mapaCotacao: '',
        destinatario: 'secretario_administracao',
        observacoesEncaminhamento: 'Solicito prioridade na análise desta demanda devido ao cronograma de implementação das metodologias digitais de ensino previstas para o próximo semestre letivo. A modernização dos equipamentos é fundamental para o cumprimento das metas educacionais estabelecidas no Plano Municipal de Educação.',
        impactosEsperados: 'Melhoria na qualidade educacional através da modernização tecnológica das escolas, redução de custos operacionais com manutenção de equipamentos obsoletos, maior eficiência administrativa, capacitação digital de professores e alunos, e alinhamento com as metas do Plano Municipal de Educação Digital.',
        riscosPreliminares: 'Possível atraso na entrega dos equipamentos devido à alta demanda no mercado, necessidade de adequação da infraestrutura elétrica em algumas escolas, risco de furto ou vandalismo, resistência à mudança por parte de alguns usuários, e necessidade de capacitação intensiva para uso adequado dos equipamentos.',
        responsavelNome: 'João Carlos Oliveira',
        responsavelCargo: 'Secretário de Educação',
        responsavelMatricula: '123456',
        modalidadeLicitacao: 'pregao_eletronico',
        tipoLicitacao: 'menor_preco',
        criterioJulgamento: 'menor_preco_por_item',
        regimeExecucao: 'empreitada_integral',
        prazoEntrega: '30',
        localEntrega: 'Almoxarifado Central da Secretaria de Educação'
    }
};

export function useEspada1() {
    const queryClient = useQueryClient();
    const [tipo, setTipo] = useState<'simplificada' | 'completa'>('simplificada');

    const { data: espada1Data, isLoading } = useQuery({
        queryKey: ['espada1', tipo],
        queryFn: () => tipo === 'simplificada' ? simplificada : completa
    });

    // Mutation para atualizar o tipo de DFD
    const updateTipoMutation = useMutation({
        mutationFn: async (newTipo: 'simplificada' | 'completa') => {
            setTipo(newTipo);
            return newTipo;
        },
        onSuccess: (newTipo) => {
            queryClient.setQueryData(['espada1', newTipo], newTipo === 'simplificada' ? simplificada : completa);
        }
    });

    // Função para atualizar o tipo de DFD
    const updateTipo = (newTipo: 'simplificada' | 'completa') => {
        updateTipoMutation.mutate(newTipo);
    };

    return {
        espada1Data,
        isLoading,
        tipo,
        updateTipo,
        isUpdating: updateTipoMutation.isPending,
        error: updateTipoMutation.error
    };
}
