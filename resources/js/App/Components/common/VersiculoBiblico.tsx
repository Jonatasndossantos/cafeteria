import React from 'react';
import { versiculos } from '@/data/versiculosData';

const getRandomVersiculo = () => {
  const idx = Math.floor(Math.random() * versiculos.length);
  return versiculos[idx];
};

const VersiculoBiblico: React.FC = () => {
  const versiculo = React.useMemo(getRandomVersiculo, []);
  const [referencia, texto] = versiculo.versiculo.split('–');
  
  return (
    <div className="text-center mt-6" aria-label="Versículo bíblico do dia">
      <p className="text-white/80 text-sm font-inter italic leading-relaxed" tabIndex={0}>
        {`"${texto?.trim()}"`}
      </p>
      <p className="text-[#FFD700]/70 text-xs font-inter mt-1" tabIndex={0}>
        {referencia?.trim()}
      </p>
    </div>
  );
};

export default VersiculoBiblico; 