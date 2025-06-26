import TRVersionSelector from './TRVersionSelector';
import TRObjetoBloco from './TRObjetoBloco';
import TRSolucaoBloco from './TRSolucaoBloco';
import TRModeloExecucaoBloco from './TRModeloExecucaoBloco';
import TRGestaoBloco from './TRGestaoBloco';
import TRMedicaoPagamentoBloco from './TRMedicaoPagamentoBloco';
import TRSelecaoFornecedorBloco from './TRSelecaoFornecedorBloco';
import TRSustentabilidadeBloco from './TRSustentabilidadeBloco';
import TREstimativaPrecosBloco from './TREstimativaPrecosBloco';
import TRAdequacaoOrcamentariaBloco from './TRAdequacaoOrcamentariaBloco';
import TRIntegracaoEspada5 from './TRIntegracaoEspada5';
import TRQuantitativosBloco from './TRQuantitativosBloco';
import TRMatrizRiscosBloco from './TRMatrizRiscosBloco';
import TRResponsabilidadeBloco from './TRResponsabilidadeBloco';

const TRForm = () => {
  return (
    <div className="space-y-6">
      <TRVersionSelector />
      <TRObjetoBloco />
      <TRSolucaoBloco />
      <TRModeloExecucaoBloco />
      <TRGestaoBloco />
      <TRMedicaoPagamentoBloco />
      <TRSelecaoFornecedorBloco />
      <TRSustentabilidadeBloco />
      <TREstimativaPrecosBloco />
      <TRAdequacaoOrcamentariaBloco />
      <TRMatrizRiscosBloco />
      <TRResponsabilidadeBloco />
      <TRIntegracaoEspada5 />
      <TRQuantitativosBloco />
    </div>
  );
};

export default TRForm;
