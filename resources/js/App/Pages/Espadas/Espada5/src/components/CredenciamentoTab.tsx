import React, { useState } from 'react';
import { useCredenciamentoData } from '../hooks/useCredenciamentoData';
import AplicabilidadeCredenciamento from './credenciamento/AplicabilidadeCredenciamento';
import RegrasCredenciamento from './credenciamento/RegrasCredenciamento';
import CriteriosRemuneracao from './credenciamento/CriteriosRemuneracao';
import RegrasDistribuicao from './credenciamento/RegrasDistribuicao';
import CondicoesEspecificas from './credenciamento/CondicoesEspecificas';
import SancoesPenalidades from './credenciamento/SancoesPenalidades';
import GestaoCredenciados from './credenciamento/GestaoCredenciados';
import ObservacoesLegais from './credenciamento/ObservacoesLegais';
import CredenciamentoNaoAplicavel from './credenciamento/CredenciamentoNaoAplicavel';
import LegalFoundationForm from './LegalFoundationForm';
import AdaptiveCredenciamentoForm from './AdaptiveCredenciamentoForm';

type LegalFoundation = 'Lei 14.133' | 'Lei 13.019' | 'Outro';

const CredenciamentoTab = () => {
  const credenciamentoData = useCredenciamentoData();
  const [selectedFoundation, setSelectedFoundation] = useState<LegalFoundation>('Lei 14.133');

  if (credenciamentoData.isLoading) {
    return <div className="text-center py-8">Carregando dados de credenciamento...</div>;
  }

  return (
    <div className="space-y-6">
      <AplicabilidadeCredenciamento {...credenciamentoData} />
      
      {credenciamentoData.utilizarCredenciamento === 'sim' && (
        <>
          <RegrasCredenciamento {...credenciamentoData} />
          <CriteriosRemuneracao {...credenciamentoData} />
          <RegrasDistribuicao {...credenciamentoData} />
          <CondicoesEspecificas {...credenciamentoData} />
          <SancoesPenalidades {...credenciamentoData} />
          <GestaoCredenciados {...credenciamentoData} />
          <ObservacoesLegais />
        </>
      )}

      {credenciamentoData.utilizarCredenciamento === 'nao' && (
        <CredenciamentoNaoAplicavel />
      )}
    </div>
  );
};

export default CredenciamentoTab;
