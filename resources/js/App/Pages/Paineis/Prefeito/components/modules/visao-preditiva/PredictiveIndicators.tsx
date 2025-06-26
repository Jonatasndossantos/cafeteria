
import React from "react";
import { Circle, CircleAlert } from "lucide-react";

export const PredictiveIndicators = () => {
  // Mock de indicadores: risco, status (ok/atenção/crítico), valor, descrição e recomendação IA-LUX
  const indicators = [
    {
      title: "Gastos com Pessoal",
      value: "55,2%",
      status: "critico",
      color: "red",
      description: "Projeção de ultrapassar o limite legal de 54% ao final do exercício.",
      recomendacao: "Reduzir ritmo de novas contratações e replanejar folha para os próximos meses."
    },
    {
      title: "Execução Orçamentária",
      value: "95,1%",
      status: "ok",
      color: "green",
      description: "Execução projetada no limite saudável para o ano.",
      recomendacao: "Monitorar receitas para evitar necessidade de contingenciamento."
    },
    {
      title: "Tendência da Arrecadação",
      value: "-8,0%",
      status: "atencao",
      color: "yellow",
      description: "Arrecadações estão abaixo do projetado; tendência de queda se mantida até dezembro.",
      recomendacao: "Lançar campanhas de cobrança e intensificar fiscalização fiscal."
    },
    {
      title: "Obras Paralisadas",
      value: "3 obras",
      status: "atencao",
      color: "yellow",
      description: "Três obras públicas estão paralisadas há mais de 45 dias.",
      recomendacao: "Acelerar liberações documentais e mediações para retomada imediata."
    },
    {
      title: "Contratos em Risco de Sanção",
      value: "5 contratos",
      status: "critico",
      color: "red",
      description: "Cinco contratos apresentam pendências e risco iminente de sanção (Espada 7).",
      recomendacao: "Priorizar defesas e revisões, respondendo notificações do TCE."
    },
    {
      title: "Pressão Orçamentária da Saúde",
      value: "22,1%",
      status: "critico",
      color: "red",
      description: "Projeção indica que os gastos com Saúde podem ultrapassar 22% da RCL até o final do ano, comprometendo recursos de outras áreas essenciais.",
      recomendacao: "Mapear judicializações, revisar contratos hospitalares e criar reservas técnicas para remédios de alto custo."
    }
  ];

  const statusMap = {
    ok: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500", label: "Baixo risco", emoji: "🟢" },
    atencao: { bg: "bg-yellow-100", text: "text-yellow-800", dot: "bg-yellow-500", label: "Atenção", emoji: "🟡" },
    critico: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500", label: "Crítico", emoji: "🔴" }
  };

  return (
    <section>
      <h3 className="text-xl font-montserrat font-semibold text-lumen-blue mb-4">Indicadores Preditivos</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {indicators.map((ind, idx) => {
          const st = statusMap[ind.status];
          // Adicionar emoji específico para o card da Saúde
          const cardEmoji = ind.title === "Pressão Orçamentária da Saúde" ? "🩺" : st.emoji;
          
          return (
            <div key={idx} 
                className={`flex flex-col gap-3 p-5 rounded-xl border shadow-lg ${st.bg} hover:scale-105 transition-transform`}>
              <div className="flex items-center justify-between">
                <span className={`flex items-center gap-1 font-bold text-md ${st.text}`}>
                  <span className={`rounded-full w-3 h-3 mr-2 ${st.dot}`}></span>
                  {cardEmoji} {ind.title}
                </span>
                <span className={`font-semibold text-lg ${st.text}`}>{ind.value}</span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold mb-1 block">Problema:</span>
                {ind.description}
              </div>
              <div className="text-xs mt-auto">
                <span className="font-semibold text-lumen-blue">IA-LUX recomenda:</span>
                {" "}
                <span>{ind.recomendacao}</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  );
};
