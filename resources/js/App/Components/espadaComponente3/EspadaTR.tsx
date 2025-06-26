import { useTRObjeto } from '@/hooks/useTRObjeto';
import TRVersionSelector from './TRVersionSelector';
import TRObjetoBloco from './TRObjetoBloco';
import TRSolucaoBloco from './TRSolucaoBloco';
import TRRequisitosBloco from './TRRequisitosBloco';
import TRFormaSelecaoBloco from './TRFormaSelecaoBloco';
import TRSustentabilidadeBloco from './TRSustentabilidadeBloco';
import TREstimativaPrecosBloco from './TREstimativaPrecosBloco';
import TRAdequacaoOrcamentariaBloco from './TRAdequacaoOrcamentariaBloco';
import TRResponsabilidadeBloco from './TRResponsabilidadeBloco';
import TRModeloExecucaoBloco from './TRModeloExecucaoBloco';
import TRGestaoBloco from './TRGestaoBloco';
import TRMedicaoPagamentoBloco from './TRMedicaoPagamentoBloco';
import TRMatrizRiscosBloco from './TRMatrizRiscosBloco';
import TRHeader from './TRHeader';

const EspadaTR = () => {
  const { metadata } = useTRObjeto();

  const getRequiredBlocks = () => {
    // Blocos obrigatórios para todos os tipos
    const blocks = [
      <TRObjetoBloco key="objeto" />,
      <TRSolucaoBloco key="solucao" />,
      <TRRequisitosBloco key="requisitos" />,
      <TRFormaSelecaoBloco key="formaSelecao" />,
      <TRSustentabilidadeBloco key="sustentabilidade" />,
      <TREstimativaPrecosBloco key="estimativaPrecos" />,
      <TRAdequacaoOrcamentariaBloco key="adequacaoOrcamentaria" />,
      <TRResponsabilidadeBloco key="responsabilidade" />
    ];

    // Se for bens ou bens_dispensa, retorna apenas os blocos obrigatórios
    if (['bens', 'bens_dispensa'].includes(metadata.tipoObjeto)) {
      return blocks;
    }

    // Blocos adicionais específicos por tipo de objeto
    if (['obras', 'servicos_sem_mao_obra', 'servicos_com_mao_obra', 'tic_compras', 'tic_servicos'].includes(metadata.tipoObjeto)) {
      blocks.push(<TRModeloExecucaoBloco key="modeloExecucao" />);
    }

    if (['obras', 'servicos_sem_mao_obra', 'servicos_com_mao_obra', 'tic_compras', 'tic_servicos'].includes(metadata.tipoObjeto)) {
      blocks.push(<TRGestaoBloco key="gestao" />);
    }

    if (['obras', 'servicos_sem_mao_obra', 'servicos_com_mao_obra', 'tic_compras', 'tic_servicos'].includes(metadata.tipoObjeto)) {
      blocks.push(<TRMedicaoPagamentoBloco key="medicaoPagamento" />);
    }

    if (['obras', 'servicos_com_mao_obra', 'tic_compras', 'tic_servicos'].includes(metadata.tipoObjeto)) {
      blocks.push(<TRMatrizRiscosBloco key="matrizRiscos" />);
    }

    return blocks;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TRHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <TRVersionSelector />
        </div>
        <div className="grid grid-cols-1 gap-6">
          {getRequiredBlocks()}
        </div>
      </div>
    </div>
  );
};

export default EspadaTR;
