
import TRObrigacoesPartes from './TRObrigacoesPartes';
import TRGestaoFiscalizacao from './TRGestaoFiscalizacao';
import TRSancoes from './TRSancoes';

const TRObrigacoes = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <TRObrigacoesPartes />
      <TRGestaoFiscalizacao />
      <TRSancoes />
    </div>
  );
};

export default TRObrigacoes;
