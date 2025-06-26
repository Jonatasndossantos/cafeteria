import { ObjetoContratacaoBloco } from "./ObjetoContratacaoBloco";
import { DetalhamentoBloco } from "./DetalhamentoBloco";
import { ActionButtons } from "@/Components/common/ActionButtons";
import { GestaoItensContainer } from "./GestaoItensContainer";
import { router } from "@inertiajs/react";
import { useQueryClient } from "@tanstack/react-query";



export function PlanejamentoTab() {

  const queryClient = useQueryClient();
  const planejamento = queryClient.getQueryData(['planejamento']);
  console.log(planejamento);

  return (
    <div className="space-y-6">
      {/* <Identificacao/> */}
      <ObjetoContratacaoBloco />
      <GestaoItensContainer />
      <DetalhamentoBloco />
      {/* <CompartilhamentoBloco /> */}
      {/* <PCAVinculacaoBloco />
      <VinculacaoBloco /> */}
      {/* <DuplicidadeBloco /> */}

    </div>
  );
}
