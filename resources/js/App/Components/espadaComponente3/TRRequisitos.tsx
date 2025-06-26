
import TRRequisitosTecnicos from './TRRequisitosTecnicos';
import TRSustentabilidade from './TRSustentabilidade';

const TRRequisitos = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <TRRequisitosTecnicos />
      <TRSustentabilidade />
    </div>
  );
};

export default TRRequisitos;
