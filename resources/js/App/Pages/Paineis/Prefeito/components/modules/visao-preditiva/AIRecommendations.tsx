
import React from "react";
const recomendacoes = [
  {
    categoria: "Financeiras",
    itens: [
      "Antecipar empenhos críticos do próximo trimestre.",
      "Refaça a previsão de fluxo para setores essenciais.",
      "Reforçar aplicação em Saúde para evitar contingenciamento futuro."
    ]
  },
  {
    categoria: "Jurídicas",
    itens: [
      "Revisar contratos notificados com defesa em aberto (Espada 7).",
      "Agilizar resposta a autos do TCE para evitar sanções."
    ]
  },
  {
    categoria: "Orçamentárias",
    itens: [
      "Suplementar orçamento das secretarias com execução abaixo de 60%.",
      "Planejar remanejamento preventivo para projetos prioritários."
    ]
  }
];

export const AIRecommendations = () => {
  return (
    <section>
      <h3 className="text-xl font-montserrat font-semibold text-lumen-blue mb-4">Recomendações da IA-LUX</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recomendacoes.map((rec, idx) => (
          <div key={idx} className="bg-white/80 border-l-4 border-lumen-gold rounded-xl shadow p-5 animate-fade-in">
            <h4 className="font-bold text-lumen-blue text-md mb-2">{rec.categoria}</h4>
            <ul className="list-disc text-gray-700 pl-4 space-y-1 text-sm">
              {rec.itens.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
