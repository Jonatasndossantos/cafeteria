import React from 'react';
import { useTRObjeto } from '@/hooks/useTRObjeto';
import TRBlockCard from './TRBlockCard';
import {
  FileText,
  ClipboardList,
  Settings,
  Calendar,
  Users,
  DollarSign,
  Award,
  Leaf,
  Calculator,
  Wallet,
  AlertTriangle,
  Shield
} from 'lucide-react';

const TRBlocks: React.FC = () => {
  const { metadata } = useTRObjeto();

  const getRequiredBlocks = (tipoObjeto: string) => {
    const baseBlocks = [
      'objeto',
      'solucao',
      'requisitos',
      'forma_selecao',
      'sustentabilidade',
      'estimativa_precos',
      'adequacao_orcamentaria',
      'responsabilidade'
    ];

    switch (tipoObjeto) {
      case 'bens':
      case 'bens_dispensa':
        return baseBlocks;
      case 'obras':
        return [
          ...baseBlocks,
          'modelo_execucao',
          'modelo_gestao',
          'medicao_pagamento',
          'matriz_riscos'
        ];
      case 'servicos_sem_mao_obra':
        return [
          ...baseBlocks,
          'modelo_execucao',
          'modelo_gestao',
          'medicao_pagamento'
        ];
      case 'servicos_com_mao_obra':
        return [
          ...baseBlocks,
          'modelo_execucao',
          'modelo_gestao',
          'medicao_pagamento',
          'matriz_riscos'
        ];
      case 'tic_compras':
        return [
          ...baseBlocks,
          'modelo_execucao',
          'modelo_gestao',
          'medicao_pagamento',
          'matriz_riscos'
        ];
      case 'tic_servicos':
        return [
          ...baseBlocks,
          'modelo_execucao',
          'modelo_gestao',
          'medicao_pagamento',
          'matriz_riscos'
        ];
      default:
        return baseBlocks;
    }
  };

  const getSpecificRequirements = (tipoObjeto: string) => {
    switch (tipoObjeto) {
      case 'servicos_com_mao_obra':
        return {
          requisitos: {
            requisitos: 'Incluir escala de trabalho e vínculo trabalhista',
            sustentabilidade: 'Considerar aspectos trabalhistas e previdenciários'
          }
        };
      case 'tic_servicos':
        return {
          requisitos: {
            requisitos: 'Incluir SLA, continuidade e interoperabilidade',
            sustentabilidade: 'Considerar requisitos ambientais e compatibilidade'
          }
        };
      case 'tic_compras':
        return {
          sustentabilidade: {
            sustentabilidade: 'Considerar requisitos ambientais e compatibilidade'
          }
        };
      default:
        return {};
    }
  };

  const requiredBlocks = getRequiredBlocks(metadata.tipoObjeto);
  const specificRequirements = getSpecificRequirements(metadata.tipoObjeto);

  const blocks = [
    {
      id: 'objeto',
      title: 'Objeto e Justificativa',
      icon: FileText,
      description: 'Definição clara do objeto da contratação, justificativa e benefícios esperados.',
      component: 'TRObjetoBloco'
    },
    {
      id: 'solucao',
      title: 'Descrição da Solução',
      icon: ClipboardList,
      description: 'Detalhamento da solução a ser contratada.',
      component: 'TRSolucaoBloco'
    },
    {
      id: 'requisitos',
      title: 'Requisitos da Contratação',
      icon: Settings,
      description: 'Especificações técnicas e requisitos necessários para a contratação.',
      component: 'TRRequisitosBloco'
    },
    {
      id: 'modelo_execucao',
      title: 'Modelo de Execução',
      icon: Calendar,
      description: 'Cronograma físico-financeiro, BDI e planilha de preços.',
      component: 'TRModeloExecucaoBloco'
    },
    {
      id: 'modelo_gestao',
      title: 'Modelo de Gestão',
      icon: Users,
      description: 'Estrutura de gestão e fiscalização do contrato.',
      component: 'TRGestaoBloco'
    },
    {
      id: 'medicao_pagamento',
      title: 'Medição e Pagamento',
      icon: DollarSign,
      description: 'Critérios e procedimentos para medição e pagamento.',
      component: 'TRMedicaoPagamentoBloco'
    },
    {
      id: 'forma_selecao',
      title: 'Forma de Seleção',
      icon: Award,
      description: 'Critérios e procedimentos para seleção do fornecedor.',
      component: 'TRSelecaoFornecedorBloco'
    },
    {
      id: 'sustentabilidade',
      title: 'Sustentabilidade',
      icon: Leaf,
      description: 'Aspectos de sustentabilidade e responsabilidade socioambiental.',
      component: 'TRSustentabilidadeBloco'
    },
    {
      id: 'estimativa_precos',
      title: 'Estimativa de Preços',
      icon: Calculator,
      description: 'Estimativa de preços e análise de mercado.',
      component: 'TREstimativaPrecosBloco'
    },
    {
      id: 'adequacao_orcamentaria',
      title: 'Adequação Orçamentária',
      icon: Wallet,
      description: 'Análise da adequação orçamentária da contratação.',
      component: 'TRAdequacaoOrcamentariaBloco'
    },
    {
      id: 'matriz_riscos',
      title: 'Matriz de Riscos',
      icon: AlertTriangle,
      description: 'Identificação e análise dos riscos da contratação.',
      component: 'TRMatrizRiscosBloco'
    },
    {
      id: 'responsabilidade',
      title: 'Responsabilidade',
      icon: Shield,
      description: 'Definição das responsabilidades das partes.',
      component: 'TRResponsabilidadeBloco'
    }
  ];

  return (
    <div className="space-y-6">
      {blocks.map((block) => {
        const isRequired = requiredBlocks.includes(block.id);
        const blockSpecificRequirements = specificRequirements[block.id as keyof typeof specificRequirements];

        return (
          <TRBlockCard
            key={block.id}
            title={block.title}
            icon={block.icon}
            isRequired={isRequired}
            description={block.description}
            specificRequirements={blockSpecificRequirements}
          >
            {/* Here we would render the actual block component */}
            <div className="text-sm text-gray-500 italic">
              Componente: {block.component}
            </div>
          </TRBlockCard>
        );
      })}
    </div>
  );
};

export default TRBlocks; 