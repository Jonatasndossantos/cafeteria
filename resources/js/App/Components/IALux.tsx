
import React from 'react';
import { Brain } from 'lucide-react';

interface IALuxProps {
  perfilUsuario: string;
}

export const IALux = ({ perfilUsuario }: IALuxProps) => {
  const obterSugestoesPorPerfil = (perfil: string) => {
    const sugestoesPorPerfil: { [key: string]: Array<{ id: number; texto: string }> } = {
      prefeito: [
        { id: 1, texto: "Como verificar a conformidade geral do município?" },
        { id: 2, texto: "Quais contratos vencem nos próximos 30 dias?" },
        { id: 3, texto: "Resumo das licitações em andamento" }
      ],
      controlador: [
        { id: 1, texto: "Verificar conformidade dos processos de dispensa" },
        { id: 2, texto: "Gerar relatório de conformidade por secretaria" },
        { id: 3, texto: "Quais os principais riscos identificados?" }
      ],
      fiscal: [
        { id: 1, texto: "Como notificar um fornecedor por descumprimento?" },
        { id: 2, texto: "Modelo de relatório de fiscalização" },
        { id: 3, texto: "Prazos para medição e pagamento" }
      ],
      cpl: [
        { id: 1, texto: "Modelos de editais atualizados" },
        { id: 2, texto: "Checklist para sessão de licitação" },
        { id: 3, texto: "Como tratar recursos administrativos?" }
      ],
      juridico: [
        { id: 1, texto: "Modelos de pareceres jurídicos" },
        { id: 2, texto: "Jurisprudência recente sobre a Lei 14.133/21" },
        { id: 3, texto: "Análise de cláusulas contratuais" }
      ]
    };
    
    return sugestoesPorPerfil[perfil] || [];
  };

  const sugestoes = obterSugestoesPorPerfil(perfilUsuario);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xl font-semibold text-[#0A3D62] mb-4 flex items-center">
        <Brain className="w-5 h-5 mr-2 text-[#D4AF37]" />
        IA-LUX
      </h3>
      
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Faça uma pergunta normativa..." 
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A3D62] focus:border-transparent"
        />
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Sugestões para você:</h4>
        <div className="space-y-2">
          {sugestoes.map((sugestao) => (
            <button 
              key={sugestao.id}
              className="w-full text-left text-xs p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {sugestao.texto}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
