export const mockFormData = {
  // Identificação do Processo
  identificacao: {
    numeroMatriz: "MR-2024-0089",
    numeroTR: "TR-2024-0089",
    numeroETP: "ETP-2024-0089",
    objeto: "Aquisição de equipamentos de informática para modernização do parque tecnológico da Secretaria de Educação",
    status: "em_elaboracao"
  },

  // Introdução à Matriz de Riscos
  introducao: {
    objetivo: "Esta matriz de riscos tem por objetivo identificar, avaliar e estabelecer medidas de tratamento para os riscos inerentes à contratação de equipamentos de informática, conforme determina o Art. 103, § 1º da Lei 14.133/21, visando garantir a execução adequada do contrato e a entrega dos resultados esperados.",
    metodologia: "A avaliação dos riscos seguirá metodologia qualitativa baseada na análise de probabilidade e impacto, utilizando escalas de 1 a 5 pontos. Os riscos serão classificados em matriz 5x5, permitindo a priorização das ações de tratamento conforme o nível de exposição identificado.",
  },

  // Matriz de Riscos
  matrizRiscos: {
    riscos: [
      {
        id: 1,
        evento: "Atraso na entrega dos equipamentos",
        dano: "Comprometimento do cronograma de implementação",
        impacto: "4",
        probabilidade: "3",
        acao_preventiva: "Estabelecer cronograma detalhado com marcos de entrega e previsão de multas por atraso. Exigir relatórios periódicos de andamento.",
        responsavel_preventiva: "Fiscal do Contrato",
        acao_contingencia: "Aplicação de multas contratuais conforme previsto no TR. Possibilidade de contratação emergencial de outro fornecedor para itens críticos.",
        responsavel_contingencia: "Gestor do Contrato"
      },
      {
        id: 2,
        evento: "Entrega de produtos em desacordo com as especificações técnicas",
        dano: "Incompatibilidade com sistemas existentes",
        impacto: "4",
        probabilidade: "3",
        acao_preventiva: "Estabelecer procedimentos rigorosos de inspeção e aceite. Definir especificações técnicas detalhadas no TR.",
        responsavel_preventiva: "Fiscal Técnico",
        acao_contingencia: "Rejeição dos produtos não conformes e exigência de substituição sem custos adicionais.",
        responsavel_contingencia: "Gestor do Contrato"
      },
      {
        id: 3,
        evento: "Falha na qualidade dos produtos entregues",
        dano: "Defeitos e mau funcionamento dos equipamentos",
        impacto: "4",
        probabilidade: "2",
        acao_preventiva: "Exigir certificações de qualidade e garantia mínima. Estabelecer critérios de aceite claros.",
        responsavel_preventiva: "Fiscal Técnico",
        acao_contingencia: "Acionamento da garantia contratual e substituição dos produtos defeituosos.",
        responsavel_contingencia: "Gestor do Contrato"
      },
      {
        id: 4,
        evento: "Inadimplência ou falência da contratada",
        dano: "Interrupção do fornecimento",
        impacto: "5",
        probabilidade: "2",
        acao_preventiva: "Exigir garantia contratual e verificar situação financeira da empresa.",
        responsavel_preventiva: "Gestor do Contrato",
        acao_contingencia: "Execução da garantia contratual e nova licitação.",
        responsavel_contingencia: "Gestor do Contrato"
      },
      {
        id: 5,
        evento: "Danos a terceiros durante a entrega",
        dano: "Responsabilidade civil e danos materiais",
        impacto: "3",
        probabilidade: "1",
        acao_preventiva: "Exigir seguro de responsabilidade civil e procedimentos de segurança.",
        responsavel_preventiva: "Contratada",
        acao_contingencia: "Acionamento do seguro de responsabilidade civil.",
        responsavel_contingencia: "Contratada"
      }
    ]
  }
};

