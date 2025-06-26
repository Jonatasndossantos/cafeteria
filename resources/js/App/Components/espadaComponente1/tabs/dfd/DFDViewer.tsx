interface DFDViewerProps {
  metadata: {
    dfd: {
      numero: string;
      dataCriacao: string;
      orgaoRequisitante: string;
      responsavelNome: string;
      responsavelCargo: string;
      responsavelMatricula: string;
      justificativa: string;
      requisitosTecnicos: string;
      dataPretendida: string;
      grauPrioridade: string;
      justificativaPrioridade: string;
      modalidadeLicitacao: string;
      tipoLicitacao: string;
      criterioJulgamento: string;
      regimeExecucao: string;
      prazoEntrega: string;
      localEntrega: string;
    };
    objeto: {
      objetoContratacao: string;
      tipoObjeto: string;
      subcategoriaTecnica: string;
      codigoCatmat: string;
    };
    itens: Array<{
      id: number;
      descricao: string;
      catmat: string;
      unidade: string;
      quantidade: number;
      valorUnitario: number;
      valorTotal: number;
    }>;
  };
}

export function DFDViewer({ metadata }: DFDViewerProps) {
  const { dfd, objeto, itens } = metadata;

  return (
    <div className="p-6">
      <div className="space-y-6">
        {/* Identificação */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Identificação</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Número</p>
              <p>{dfd.numero}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Data de Criação</p>
              <p>{new Date(dfd.dataCriacao).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Órgão Requisitante</p>
              <p>{dfd.orgaoRequisitante}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Responsável</p>
              <p>{dfd.responsavelNome} - {dfd.responsavelCargo}</p>
            </div>
          </div>
        </section>

        {/* Objeto */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Objeto</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Objeto da Contratação</p>
              <p>{objeto.objetoContratacao}</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Tipo</p>
                <p>{objeto.tipoObjeto}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Subcategoria</p>
                <p>{objeto.subcategoriaTecnica}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Código CATMAT</p>
                <p>{objeto.codigoCatmat}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Itens */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Itens</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CATMAT</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Unitário</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {itens.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.descricao}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.catmat}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.unidade}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.quantidade}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valorUnitario)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valorTotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Detalhes da Licitação */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Detalhes da Licitação</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Modalidade</p>
              <p>{dfd.modalidadeLicitacao}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tipo</p>
              <p>{dfd.tipoLicitacao}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Critério de Julgamento</p>
              <p>{dfd.criterioJulgamento}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Regime de Execução</p>
              <p>{dfd.regimeExecucao}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Prazo de Entrega</p>
              <p>{dfd.prazoEntrega} dias</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Local de Entrega</p>
              <p>{dfd.localEntrega}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 