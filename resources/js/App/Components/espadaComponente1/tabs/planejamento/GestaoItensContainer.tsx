import { GestaoItensBloco } from "./GestaoItensBloco";
import { ObrasContent } from "./ObrasContent";
import { useGestaoItens } from '@/hooks/Espada1/useGestaoItens';

export function GestaoItensContainer() {
  const { tipoContratacao, isLoading } = useGestaoItens('itens');

  // console.log('Tipo de Contratação recebido:', tipoContratacao);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div >
      {tipoContratacao === 'obras' ? (
        <ObrasContent />
      ) : (
        <GestaoItensBloco />
      )}
    </div>
  );
}
