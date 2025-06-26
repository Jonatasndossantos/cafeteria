
import React from "react";

const prazos = [
  {
    prazo: "Curto Prazo (30 dias)",
    itens: [
      "Pagamento da folha de pessoal e fornecedores.",
      "Transferências constitucionais e repasses obrigatórios.",
      "Envio do relatório RREO ao TCE."
    ]
  },
  {
    prazo: "Médio Prazo (90 dias)",
    itens: [
      "Monitorar risco fiscal pela evolução da receita.",
      "Acompanhar andamento de obras com baixa execução.",
      "Preparar revisão do PPA para próximo exercício."
    ]
  },
  {
    prazo: "Longo Prazo (até dezembro)",
    itens: [
      "Evitar descumprimento das metas da LRF.",
      "Assegurar aplicação mínima em Educação e Saúde.",
      "Finalizar obras públicas e contratos críticos."
    ]
  }
];


export const TimelineProjections = () => {
  return (
    <section>
      <h3 className="text-xl font-montserrat font-semibold text-lumen-blue mb-4">Projeções por Prazo</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {prazos.map((p, idx) => (
          <div key={idx} className="bg-gray-50 border-l-4 border-lumen-blue rounded-xl shadow p-5 animate-fade-in">
            <h4 className="font-semibold text-lumen-blue">{p.prazo}</h4>
            <ul className="list-disc text-gray-700 pl-4 space-y-1 mt-1 text-sm">
              {p.itens.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
