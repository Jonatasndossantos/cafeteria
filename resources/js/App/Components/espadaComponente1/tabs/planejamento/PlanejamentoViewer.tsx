import { usePlanejamento } from '@/hooks/Espada1/usePlanejamento';

export function PlanejamentoViewer() {
  const { data: planejamento } = usePlanejamento();

  if (!planejamento) {
    return <div>Carregando dados do planejamento...</div>;
  }

  return (
    <div className="p-6">
      <div className="space-y-6">
        {/* Objeto */}
        <section>
          <h2 className="mb-4 text-lg font-semibold">Objeto da Contratação</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Descrição</p>
              <p>{planejamento.objeto?.objetoContratacao || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tipo de Objeto</p>
              <p>{planejamento.objeto?.tipoObjeto || 'Não informado'}</p>
            </div>
          </div>
        </section>

        {/* Detalhamento */}
        <section>
          <h2 className="mb-4 text-lg font-semibold">Detalhamento</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Justificativa Técnica</p>
              <p>{planejamento.detalhamento?.justificativaTecnica || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Benefícios Esperados</p>
              <p>{planejamento.detalhamento?.beneficiosEsperados || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Riscos Identificados</p>
              <p>{planejamento.detalhamento?.riscosIdentificados || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Alternativas Analisadas</p>
              <p>{planejamento.detalhamento?.alternativasAnalisadas || 'Não informado'}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Mês Estimado</p>
                <p>{planejamento.detalhamento?.mesEstimado || 'Não informado'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Grau de Importância</p>
                <p>{planejamento.detalhamento?.grauImportancia || 'Não informado'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Vinculações */}
        <section>
          <h2 className="mb-4 text-lg font-semibold">Vinculações</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">PPA</p>
              <p>{planejamento.vinculacoes?.ppa || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">LDO</p>
              <p>{planejamento.vinculacoes?.ldo || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">LOA</p>
              <p>{planejamento.vinculacoes?.loa || 'Não informado'}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 