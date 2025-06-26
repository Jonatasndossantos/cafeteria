// Dados fictícios centralizados para toda a aplicação
export const mockFormData = {
  // Dados gerais de identificação
  identificacao: {
    numeroETP: "ETP-2023-0001",
    numeroDFD: "DFD-2023-0001",
    objeto: "Aquisição de computadores para a Secretaria de Educação",
    fundamentacaoLegal: "Lei 14.133/2021 - Lei de Licitações e Contratos Administrativos",
    responsavelElaboracao: "João Silva - Analista de Compras"
  },

  // Dados da aba Pesquisa de Preços
  pesquisa: {
    metodologia: "A pesquisa de preços foi realizada conforme Instrução Normativa 73/2020, utilizando cotações de mercado, análise de contratos similares e consulta aos portais públicos de compras. Foi aplicada metodologia estatística para validação dos preços coletados, considerando pelo menos 3 fontes distintas para garantir a representatividade do mercado.",
    fontes: [
      {
        id: 1,
        fonte: 'Contrato Municipal 045/2022',
        tipo: 'Contrato Público',
        data: '15/11/2022',
        valor: 485.50,
        comprovante: 'contrato_045_2022.pdf'
      },
      {
        id: 2,
        fonte: 'Portal de Compras Governamentais',
        tipo: 'Portal Público',
        data: '20/11/2022',
        valor: 492.30,
        comprovante: 'portal_compras_nov2022.pdf'
      },
      {
        id: 3,
        fonte: 'Cotação Empresa TechSolutions',
        tipo: 'Cotação',
        data: '25/11/2022',
        valor: 503.75,
        comprovante: 'cotacao_techsolutions.pdf'
      },
      {
        id: 4,
        fonte: 'Ata SRP Federal 12/2022',
        tipo: 'Ata de Registro',
        data: '10/11/2022',
        valor: 478.90,
        comprovante: 'ata_srp_federal_12_2022.pdf'
      }
    ],
    estatisticas: {
      media: 490.11,
      mediana: 488.90,
      coeficienteVariacao: 2.1,
      valorEstimadoFinal: 490.00
    },
    uploadedFiles: [
      { name: 'mapa_precos_computadores.xlsx', size: 2.5 * 1024 * 1024 },
      { name: 'cotacoes_fornecedores.pdf', size: 1.8 * 1024 * 1024 },
      { name: 'analise_mercado_ti.docx', size: 3.2 * 1024 * 1024 }
    ]
  },

  // Dados da aba Decisão de Rota
  rota: {
    rotaSelecionada: 'pregao',
    sugestaoLux: {
      rota: 'pregao',
      modalidade: 'eletronico',
      tipo: 'menor_preco',
      modoDisputa: 'aberto',
      justificativa: 'Com base no valor estimado (R$ 49.000,00) e na natureza do objeto (aquisição de bens comuns), o pregão eletrônico é a modalidade mais adequada. O objeto possui especificações padronizadas no mercado, permitindo a aplicação do critério "menor preço". O modo de disputa "aberto" proporcionará maior competitividade e economicidade, atendendo aos princípios da eficiência e economicidade previstos na Lei 14.133/21.'
    },
    pregao: {
      tipo: 'eletronico',
      criterio: 'menor_preco',
      modoDisputa: 'aberto'
    },
    regimeExecucao: {
      regime: 'fornecimento',
      utilizarSRP: false,
      tipoSRP: 'comum',
      vigenciaSRP: 12,
      justificativa: 'O regime de fornecimento é adequado para aquisição de bens, conforme art. 46 da Lei 14.133/21. Não se justifica a utilização do SRP considerando que se trata de contratação específica e pontual, sem necessidade de contratações futuras recorrentes no período de validade da ata.'
    },
    viabilidade: {
      tecnica: 'viavel',
      economica: 'viavel',
      justificativa: 'A contratação é tecnicamente viável considerando a disponibilidade dos bens no mercado e a capacidade técnica do órgão para especificar e fiscalizar. Economicamente viável devido ao valor estimado estar compatível com os recursos orçamentários disponíveis e os preços praticados no mercado.'
    },
    cronograma: {
      dataPublicacaoEstimada: '2024-02-15',
      dataInicio: '2024-03-01',
      dataTermino: '2024-03-31',
      prazoExecucao: 30,
      observacoes: 'O cronograma foi definido considerando o prazo médio de entrega dos fornecedores (30-45 dias úteis) e a necessidade de implementação antes do início do ano letivo de 2024.'
    }
  },

  // Dados da aba ETP
  etp: {
    campo1: {
      descricaoNecessidade: 'A Secretaria de Educação necessita da aquisição de 100 computadores para modernização do parque tecnológico das escolas municipais. A necessidade surge da obsolescência dos equipamentos atuais (com mais de 8 anos de uso), que comprometem as atividades pedagógicas digitais e administrativas. Esta contratação visa garantir a continuidade dos serviços educacionais, melhorar a qualidade do ensino oferecido aos estudantes e adequar a infraestrutura tecnológica às demandas educacionais contemporâneas, incluindo o uso de plataformas digitais de ensino.',
      sugestaoLux: true
    },
    campo2: {
      previsaoContratacao: 'Item 45 do Plano Anual de Contratações 2024 - Aquisição de equipamentos de informática para unidades escolares, com previsão orçamentária de R$ 50.000,00 na rubrica 4.4.90.52 - Equipamentos e Material Permanente.',
      herdadoPlanejamento: true
    },
    campo3: {
      requisitosContratacao: 'Computadores desktop com processador mínimo Intel Core i5 (11ª geração) ou AMD Ryzen 5 equivalente, memória RAM 8GB DDR4, disco rígido SSD 256GB, monitor LED 21.5", teclado ABNT-2, mouse óptico, sistema operacional Windows 11 Pro licenciado. Garantia mínima de 36 meses on-site. Certificações obrigatórias: ISO 9001, ISO 14001, EPEAT Gold. Atendimento às normas de acessibilidade (ABNT NBR 9050) e sustentabilidade ambiental (RoHS, WEEE). Suporte técnico local com tempo de resposta máximo de 24 horas.',
      sugestaoLux: true,
      herdado: true,
      objetivosResultados: 'Modernizar o parque tecnológico das escolas municipais, garantindo equipamentos adequados para atividades pedagógicas e administrativas. Resultados esperados: melhoria na qualidade do ensino digital, aumento da eficiência administrativa, redução de custos com manutenção, e adequação às demandas educacionais contemporâneas. Indicadores de sucesso: redução de 50% nos chamados de suporte técnico, aumento de 30% na utilização de plataformas educacionais digitais, e satisfação de 90% dos usuários com os novos equipamentos.'
    },
    campo4: {
      quantidadeEstimada: 100,
      unidadeMedida: 'Unidade',
      memoriaCalculo: 'A quantidade foi definida com base no levantamento realizado junto às 10 escolas municipais, considerando a necessidade de substituição de equipamentos obsoletos (80 unidades) e a expansão das atividades pedagógicas digitais (20 unidades adicionais). Cada escola receberá em média 10 computadores, distribuídos entre laboratório de informática (6 unidades), secretaria (2 unidades), biblioteca (1 unidade) e sala dos professores (1 unidade). O dimensionamento considerou o número de alunos por turno, as atividades curriculares obrigatórias e os projetos educacionais em desenvolvimento.',
      herdadoPlanejamento: true,
      levantamentoMercado: 'O mercado de equipamentos de informática apresenta alta competitividade, com diversos fornecedores capacitados: Dell, HP, Lenovo, Positivo, Multilaser e outros. Análise de capacidade produtiva indica fornecimento adequado para atender a demanda no prazo estimado. Tecnologia madura e amplamente disponível no mercado nacional. Identificadas pelo menos 15 empresas com capacidade técnica e comercial para fornecimento. Não há restrições de importação ou limitações tecnológicas. Prazo médio de entrega: 30 a 45 dias úteis. Mercado oferece garantia estendida e suporte técnico especializado.',
      sugestaoLux: true
    },
    campo5: {
      levantamentoMercado: 'O mercado de equipamentos de informática apresenta alta competitividade, com diversos fornecedores capacitados: Dell, HP, Lenovo, Positivo, Multilaser e outros. Análise de capacidade produtiva indica fornecimento adequado para atender a demanda no prazo estimado. Tecnologia madura e amplamente disponível no mercado nacional. Identificadas pelo menos 15 empresas com capacidade técnica e comercial para fornecimento. Não há restrições de importação ou limitações tecnológicas. Prazo médio de entrega: 30 a 45 dias úteis. Mercado oferece garantia estendida e suporte técnico especializado.',
      sugestaoLux: true,
      descricaoSolucao: 'A solução recomendada consiste na aquisição de computadores desktop completos para renovação e expansão do parque tecnológico educacional municipal. Os equipamentos deverão atender às especificações técnicas modernas, garantindo desempenho adequado para atividades pedagógicas, administrativas e de gestão escolar. A solução inclui instalação, configuração inicial, migração de dados quando necessário, treinamento básico dos usuários e suporte técnico integral. Os equipamentos serão distribuídos estrategicamente nas unidades escolares conforme planejamento pedagógico, priorizando laboratórios de informática e áreas administrativas. A implementação será faseada para minimizar impactos nas atividades escolares.'
    },
    campo6: {
      valorUnitarioEstimado: 490.00,
      quantidade: 100,
      valorTotalEstimado: 49000.00,
      metodologiaEstimativa: 'A estimativa foi elaborada com base na pesquisa de preços realizada com 4 fontes distintas: contratos similares, portal de compras governamentais, cotações de mercado e atas de registro de preços federais. Foi aplicada análise estatística dos valores coletados, resultando em média de R$ 490,11 e coeficiente de variação de 2,1% (dentro dos parâmetros aceitáveis). O valor adotado de R$ 490,00 representa o valor mediano ajustado, garantindo economicidade e exequibilidade da contratação.',
      herdadoPesquisa: true,
      justificativaParcelamento: "A contratação será realizada em uma única etapa devido à necessidade de padronização dos equipamentos e para garantir a compatibilidade entre todos os sistemas. A aquisição em lote único também permite melhor negociação de preços e condições de pagamento, além de facilitar a gestão do projeto de implementação. A Secretaria de Educação possui recursos disponíveis no orçamento atual para realizar a contratação integral, sem necessidade de parcelamento.",
      sugestaoLux: true
    },
    campo7: {
      estimativaQuantidades: "A estimativa de quantidades foi elaborada com base em:\n\n1. Levantamento do número atual de computadores em uso nas escolas\n2. Análise da demanda por novos equipamentos considerando:\n   - Crescimento do número de alunos\n   - Necessidade de substituição de equipamentos obsoletos\n   - Requisitos mínimos para execução dos programas educacionais\n3. Critérios de distribuição:\n   - 1 computador para cada 3 alunos em laboratórios\n   - 1 computador para cada sala administrativa\n   - 1 computador para cada coordenador pedagógico\n\nTotal estimado: 100 unidades, distribuídas em 20 escolas da rede municipal.",
      sugestaoLux: true
    },
    campo8: {
      estimativaPrecos: "A estimativa de preços foi elaborada com base em:\n\n1. Fontes de pesquisa:\n   - Portal de Compras Governamentais\n   - Contratos similares de outras secretarias\n   - Cotações de mercado com fornecedores habilitados\n   - Atas de registro de preços federais\n\n2. Metodologia:\n   - Coleta de preços de 4 fontes distintas\n   - Análise estatística dos valores (média, mediana, desvio padrão)\n   - Ajuste por fatores de mercado e sazonalidade\n   - Consideração de descontos por volume\n\n3. Resultados:\n   - Preço unitário estimado: R$ 4.900,00\n   - Variação entre fontes: ±5%\n   - Justificativa: valores alinhados com mercado e contratos similares",
      sugestaoLux: true
    },
    campo9: {
      analiseCustoBeneficio: "Análise de Custo-Benefício:\n\n1. Custos Diretos:\n   - Aquisição dos equipamentos: R$ 490.000,00\n   - Instalação e configuração: R$ 10.000,00\n   - Treinamento de usuários: R$ 5.000,00\n   Total: R$ 505.000,00\n\n2. Benefícios Esperados:\n   - Redução de 50% nos custos de manutenção\n   - Aumento de 30% na produtividade administrativa\n   - Melhoria de 40% no desempenho das atividades pedagógicas\n   - Economia anual estimada: R$ 100.000,00\n\n3. Indicadores de Retorno:\n   - Payback: 5 anos\n   - ROI: 20% ao ano\n   - TIR: 15% ao ano\n\n4. Benefícios Intangíveis:\n   - Melhoria na qualidade do ensino\n   - Aumento da satisfação dos usuários\n   - Modernização da infraestrutura tecnológica\n   - Adequação às demandas educacionais contemporâneas",
      sugestaoLux: true
    },
    campo10: {
      analiseRiscos: "Análise de Riscos da Contratação:\n\n1. Riscos Técnicos:\n   - Incompatibilidade com sistemas existentes\n   - Mitigação: Especificações técnicas detalhadas e testes de compatibilidade\n\n2. Riscos Operacionais:\n   - Interrupção das atividades durante a implementação\n   - Mitigação: Implementação faseada e plano de contingência\n\n3. Riscos Financeiros:\n   - Variação cambial (para equipamentos importados)\n   - Mitigação: Cláusula de reajuste baseada em índices oficiais\n\n4. Riscos de Gestão:\n   - Resistência à mudança dos usuários\n   - Mitigação: Programa de treinamento e suporte\n\n5. Riscos de Fornecimento:\n   - Atraso na entrega\n   - Mitigação: Cláusulas de penalidade e monitoramento\n\n6. Riscos de Qualidade:\n   - Equipamentos com defeitos\n   - Mitigação: Garantia estendida e testes de qualidade",
      sugestaoLux: true
    },
    campo11: {
      providenciasPrevias: "Providências Prévias à Contratação:\n\n1. Preparação da Infraestrutura:\n   - Verificação da rede elétrica e pontos de energia\n   - Avaliação da infraestrutura de rede\n   - Preparação dos espaços físicos\n\n2. Capacitação da Equipe:\n   - Treinamento da equipe de TI\n   - Capacitação dos gestores escolares\n   - Preparação dos professores\n\n3. Documentação:\n   - Elaboração do termo de referência\n   - Preparação do edital\n   - Documentação técnica\n\n4. Planejamento:\n   - Cronograma de implementação\n   - Plano de contingência\n   - Estratégia de migração de dados\n\n5. Orçamento:\n   - Liberação de recursos\n   - Aprovação do orçamento\n   - Reserva de contingência\n\n6. Gestão de Mudança:\n   - Plano de comunicação\n   - Estratégia de engajamento\n   - Gestão de expectativas",
      sugestaoLux: true
    },
    campo12: {
      contratacoesCorrelatas: "Contratações Correlatas e Interdependentes:\n\n1. Infraestrutura de Rede:\n   - Atualização da infraestrutura de rede\n   - Instalação de novos pontos de rede\n   - Configuração de switches e roteadores\n\n2. Software e Licenças:\n   - Licenciamento de sistemas operacionais\n   - Pacote Office para educação\n   - Software antivírus corporativo\n\n3. Mobiliário:\n   - Mesas para computadores\n   - Cadeiras ergonômicas\n   - Armários para equipamentos\n\n4. Serviços de Suporte:\n   - Contrato de manutenção preventiva\n   - Suporte técnico especializado\n   - Treinamento de usuários\n\n5. Segurança:\n   - Nobreaks e estabilizadores\n   - Sistema de backup\n   - Proteção contra surtos elétricos\n\n6. Conectividade:\n   - Ampliação da banda de internet\n   - Serviços de cloud backup\n   - VPN para acesso remoto",
      sugestaoLux: true
    },
    campo13: {
      impactosAmbientais: "Análise de Impactos Ambientais:\n\n1. Geração de Resíduos Eletrônicos:\n   - Descarte adequado dos equipamentos obsoletos\n   - Plano de logística reversa\n   - Certificação de reciclagem\n\n2. Consumo de Energia:\n   - Equipamentos com certificação Energy Star\n   - Configurações de economia de energia\n   - Monitoramento do consumo\n\n3. Materiais e Sustentabilidade:\n   - Equipamentos com certificação EPEAT Gold\n   - Embalagens recicláveis\n   - Redução de plásticos\n\n4. Medidas Mitigadoras:\n   - Programa de conscientização ambiental\n   - Treinamento em práticas sustentáveis\n   - Monitoramento de impactos\n\n5. Benefícios Ambientais:\n   - Redução do consumo de energia\n   - Menor geração de resíduos\n   - Práticas sustentáveis\n\n6. Conformidade Legal:\n   - Atendimento à Política Nacional de Resíduos Sólidos\n   - Conformidade com normas ambientais\n   - Licenças e autorizações necessárias",
      sugestaoLux: true
    },
    campo14: {
      declaracaoViabilidade: "Declaração de Viabilidade da Contratação:\n\n1. Viabilidade Técnica:\n   - Objeto com especificações técnicas claras e adequadas\n   - Mercado com capacidade de fornecimento\n   - Equipe técnica capacitada para fiscalização\n   - Infraestrutura necessária disponível\n\n2. Viabilidade Econômico-Financeira:\n   - Recursos orçamentários disponíveis\n   - Valor estimado compatível com o mercado\n   - Análise de custo-benefício favorável\n   - Previsão orçamentária adequada\n\n3. Viabilidade Jurídica:\n   - Conformidade com a legislação aplicável\n   - Documentação necessária disponível\n   - Procedimentos licitatórios adequados\n   - Cláusulas contratuais em conformidade\n\n4. Viabilidade Operacional:\n   - Capacidade de gestão do contrato\n   - Cronograma de execução factível\n   - Recursos humanos disponíveis\n   - Infraestrutura operacional adequada\n\n5. Conclusão:\n   A contratação é viável sob todos os aspectos analisados, apresentando condições técnicas, econômicas, jurídicas e operacionais adequadas para sua execução.",
      sugestaoLux: true
    },
    campo15: {
      responsabilidade: "Declaração de Responsabilidade:\n\n1. Responsabilidade Técnica:\n   - Elaboração do ETP: João Silva - Analista de Compras\n   - Revisão Técnica: Maria Santos - Coordenadora de TI\n   - Aprovação: Pedro Oliveira - Diretor de Compras\n\n2. Responsabilidade Administrativa:\n   - Gestão do Contrato: Ana Costa - Gerente de Contratos\n   - Fiscalização: Carlos Mendes - Fiscal de Contratos\n   - Controle Orçamentário: Juliana Lima - Analista Financeiro\n\n3. Responsabilidade Legal:\n   - Assessoria Jurídica: Dr. Roberto Alves\n   - Conformidade: Dra. Fernanda Martins\n\n4. Responsabilidade Operacional:\n   - Implementação: Equipe de TI da Secretaria de Educação\n   - Suporte: Equipe de Suporte Técnico\n   - Treinamento: Equipe de Capacitação\n\n5. Compromissos:\n   - Cumprimento das especificações técnicas\n   - Observância dos prazos estabelecidos\n   - Gestão adequada dos recursos\n   - Prestação de contas conforme legislação\n\n6. Assinaturas:\n   _________________________\n   João Silva\n   Analista de Compras\n   Responsável Técnico\n\n   _________________________\n   Maria Santos\n   Coordenadora de TI\n   Revisora Técnica",
      sugestaoLux: true
    }
  }
};

// Funções auxiliares para simulação de APIs
export const simulateApiDelay = (ms: number = 1000) => 
  new Promise(resolve => setTimeout(resolve, ms));

export const simulateApiCall = async <T>(data: T): Promise<T> => {
  await simulateApiDelay();
  return data;
};
