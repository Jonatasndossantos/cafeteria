export interface TRFormData {
  metadata: {
    numeroTR: string;
    numeroETP: string;
    numeroDFD: string;
    tipoObjeto: string;
    modalidadeSugerida: string;
    status: string;
  };
  objeto: {
    definicao: string;
    catmat: string;
    regime: string;
    justificativa: string;
    fundamentacaoLegal?: string;
    beneficios: string;
    detalhamentoSolucao: string;
    justificativaSolucao: string;
    referenciaETP: string;
    requisitosNecessarios: string;
    criteriosSustentabilidade: string;
    duracaoInicial: {
      quantidade: number;
      unidade: 'dias' | 'meses' | 'anos';
    };
    possibilidadeProrrogacao: string;
    rotinasExecucao: string;
    maoDeObra?: string;
    materiaisUtilizados: {
      items: Array<{
        id: number;
        descricao: string;
        unidade: string;
        quantidade: number;
        especificacao: string;
      }>;
    };
    cronogramaServicos: string;
    unidadeRequisitante: string;
    responsavelTecnico: {
      nome: string;
      cargo: string;
      setor: string;
      email: string;
      telefone: string;
    };
    atoresEnvolvidos: string;
    mecanismosComunicacao: string;
    formaAcompanhamento: string;
    formaMedicao: string;
    periodicidadeMedicao: string;
    criteriosAceitacao: string;
    prazosPagamento: string;
    modalidadeLicitacao: string;
    criterioJulgamento: string;
    requisitosHabilitacao: string;
    qualificacaoTecnicaEconomica: string;
    praticasSustentabilidade: string;
    criteriosAcessibilidade: string;
    rastreabilidadeCertificacoes: string;
    valorEstimado: string;
    memoriaCalculo: string;
    metodologiaPrecos: string;
    dotacaoOrcamentaria: string;
    compatibilidadeLDO: string;
    riscosContratuais: string;
    alocacaoRiscos: string;
    medidasMitigadoras: string;
    responsavelElaboracao: string;
    aprovacaoAutoridade: string;
    estruturaGestao: string;
    equipeFiscalizacao: string;
    procedimentosFiscalizacao: string;
    relatoriosDocumentacao: string;
    cronogramaFisicoFinanceiro: string;
    bdi: {
      administracaoCentral: number;
      custoFinanceiro: number;
      seguros: number;
      garantias: number;
      impostos: number;
      lucro: number;
    };
    planilhaPrecos: string;
    metodologiaExecucao: string;
  };
  quantitativos: {
    items: Array<{
      id: number;
      descricao: string;
      unidade: string;
      quantidade: number;
      valorUnitario: number;
      valorTotal: number;
    }>;
    valorTotalGeral: number;
    valorEstimadoETP: number;
  };
  especificacoes: {
    tecnicasDetalhadas: string;
    criteriosQualidade: string;
  };
  prazos: {
    execucao: {
      valor: number;
      unidade: string;
    };
    vigencia: {
      valor: number;
      unidade: string;
    };
    localEntrega: string;
    condicoesRecebimento: string;
  };
  garantias: {
    produto: {
      valor: number;
      unidade: string;
    };
    contratualExigida: boolean;
    contratualPercentual: number;
    modalidadesAceitas: string[];
    modalidadePagamento: string;
    condicoesPagamento: string;
  };
  requisitos: {
    habilitacaoTecnica: string;
    qualificacaoEconomica: string;
    vistoriaTecnica: string;
    informacoesVistoria: string;
  };
  sustentabilidade: {
    criteriosSustentabilidade: string;
    lgpdAplicavel: boolean;
    detalhamentoLGPD: string;
    contratoEficiencia: boolean;
    detalhamentoEficiencia: string;
  };
  obrigacoes: {
    contratante: string;
    contratada: string;
  };
  gestaoFiscalizacao: {
    modeloGestao: string;
    criteriosMedicao: string;
  };
  sancoes: {
    sancoesAdministrativas: string;
    procedimentosAplicacao: string;
  };
}

export const mockTRData: TRFormData = {
  metadata: {
    numeroTR: "TR-2024-0042",
    numeroETP: "ETP-2024-0038",
    numeroDFD: "DFD-2024-0035",
    tipoObjeto: "bens",
    modalidadeSugerida: "Pregão Eletrônico",
    status: "em_elaboracao"
  },
  objeto: {
    definicao: "Aquisição de materiais de escritório sustentáveis para promover um ambiente de trabalho mais verde e produtivo 🌱, incluindo itens ecológicos certificados para uso das diversas secretarias do município",
    catmat: "387623 - Material de Expediente Ecológico",
    regime: "fornecimento_demanda",
    justificativa: "A necessidade surge da urgência em renovar o estoque de materiais de escritório, priorizando produtos sustentáveis que contribuam para a preservação ambiental e melhoria da qualidade do ambiente de trabalho. A escolha por materiais ecológicos visa atender às diretrizes de responsabilidade socioambiental da administração pública, conforme estabelecido na Agenda 2030 e nos objetivos de desenvolvimento sustentável.",
    fundamentacaoLegal: "Conforme Art. 75, inciso I da Lei 14.133/21, a contratação direta por dispensa de licitação é aplicável quando o valor estimado da contratação for inferior aos limites estabelecidos para modalidade convite, considerando que a pesquisa de preços demonstra vantajosidade e compatibilidade com os valores praticados no mercado.",
    beneficios: "A contratação trará benefícios diretos como redução de custos a longo prazo, melhoria na qualidade dos materiais de escritório e otimização dos processos administrativos. Os benefícios indiretos incluem a promoção da sustentabilidade ambiental, fortalecimento da imagem institucional junto à sociedade e contribuição para o cumprimento das metas de desenvolvimento sustentável.",
    detalhamentoSolucao: "A solução proposta consiste na aquisição de um conjunto integrado de materiais de escritório sustentáveis, incluindo canetas ecológicas, papel certificado FSC, pastas suspensas recicladas e grampeadores sustentáveis. Todos os itens possuem certificações ambientais reconhecidas e são produzidos com materiais reciclados ou biodegradáveis, garantindo a sustentabilidade do ciclo de vida dos produtos.",
    justificativaSolucao: "Esta solução foi escolhida após análise comparativa com alternativas convencionais, demonstrando vantagens significativas em termos de custo-benefício, durabilidade e impacto ambiental. A solução atende integralmente às necessidades identificadas no ETP, oferecendo produtos de alta qualidade com certificações ambientais reconhecidas internacionalmente.",
    referenciaETP: "Esta solução está alinhada com o ETP-2024-0038, que estabeleceu a necessidade de renovação do estoque de materiais de escritório com foco em sustentabilidade. O ETP detalha os requisitos técnicos, critérios de sustentabilidade e especificações que foram considerados na escolha desta solução.",
    requisitosNecessarios: "Os materiais devem possuir certificações ambientais reconhecidas (FSC, ISO 14001), serem produzidos com pelo menos 30% de material reciclado, terem embalagens biodegradáveis e apresentarem documentação comprobatória de origem sustentável. O fornecedor deve comprovar capacidade técnica e operacional para atender à demanda estimada.",
    criteriosSustentabilidade: "Serão priorizados produtos com menor pegada de carbono, embalagens recicláveis, processos produtivos com baixo impacto ambiental e fornecedores com políticas de sustentabilidade documentadas. A avaliação considerará o ciclo de vida completo dos produtos, desde a extração da matéria-prima até o descarte final.",
    duracaoInicial: {
      quantidade: 12,
      unidade: 'meses'
    },
    possibilidadeProrrogacao: "O contrato poderá ser prorrogado por até 12 meses, desde que mantidas as condições originais de fornecimento e preços, mediante termo aditivo e justificativa técnica fundamentada. A prorrogação está condicionada à avaliação positiva do desempenho do fornecedor e à disponibilidade orçamentária.",
    rotinasExecucao: "O fornecedor deverá realizar entregas mensais programadas, com agendamento prévio de 48 horas. Cada entrega deve ser acompanhada de nota fiscal e certificados de origem sustentável. O recebimento será realizado pelo almoxarifado central, que verificará a conformidade dos produtos com as especificações técnicas e critérios de sustentabilidade.",
    maoDeObra: "Não se aplica para este objeto de contratação, pois trata-se de fornecimento de materiais.",
    materiaisUtilizados: {
      items: [
        {
          id: 1,
          descricao: "Canetas Ecológicas",
          unidade: "CX",
          quantidade: 50,
          especificacao: "Mínimo 30% de material reciclado, tinta à base d'água"
        },
        {
          id: 2,
          descricao: "Papel A4 Certificado FSC",
          unidade: "RESMA",
          quantidade: 200,
          especificacao: "Papel 75g/m², certificado FSC, 100% reciclado"
        },
        {
          id: 3,
          descricao: "Pastas Suspensas Recicladas",
          unidade: "UN",
          quantidade: 100,
          especificacao: "Material 100% reciclado, capacidade 50mm"
        },
        {
          id: 4,
          descricao: "Grampeadores Sustentáveis",
          unidade: "UN",
          quantidade: 20,
          especificacao: "Material reciclado, capacidade 20 folhas"
        }
      ]
    },
    cronogramaServicos: "O cronograma de fornecimento será dividido em 12 entregas mensais, com início em janeiro/2024. Cada entrega deve ser realizada até o dia 15 de cada mês, com agendamento prévio de 48 horas. O fornecedor deve apresentar um plano de fornecimento detalhado com as datas previstas para cada entrega.",
    unidadeRequisitante: "Secretaria Municipal de Administração e Planejamento",
    responsavelTecnico: {
      nome: "Maria Santos Silva",
      cargo: "Analista de Compras Pleno",
      setor: "Departamento de Licitações e Contratos",
      email: "maria.santos@prefeitura.gov.br",
      telefone: "(11) 3456-7890"
    },
    atoresEnvolvidos: "A gestão do contrato será realizada por uma equipe multidisciplinar composta por: 1) Gestor do Contrato - responsável pela coordenação geral e supervisão; 2) Fiscal do Contrato - responsável pelo acompanhamento técnico e fiscalização; 3) Almoxarifado Central - responsável pelo recebimento e armazenamento dos materiais; 4) Fornecedor - responsável pelo fornecimento e entrega dos materiais; 5) Comissão de Recebimento - responsável pela verificação da conformidade dos produtos.",
    mecanismosComunicacao: "A comunicação entre os atores será realizada através de: 1) Sistema Eletrônico de Gestão de Contratos - para registro formal de comunicações e documentos; 2) Reuniões mensais de acompanhamento - para alinhamento de processos e resolução de pendências; 3) E-mail institucional - para comunicações urgentes e encaminhamento de documentos; 4) WhatsApp corporativo - para comunicações emergenciais; 5) Relatórios mensais de desempenho - para acompanhamento dos indicadores contratuais.",
    formaAcompanhamento: "O acompanhamento da execução do contrato será realizado através de: 1) Visitas técnicas mensais ao almoxarifado - para verificação do recebimento e armazenamento dos materiais; 2) Inspeção de qualidade dos produtos - para verificação da conformidade com as especificações técnicas; 3) Análise dos certificados de origem sustentável - para comprovação da sustentabilidade dos produtos; 4) Avaliação do desempenho do fornecedor - com base em indicadores de qualidade, pontualidade e atendimento; 5) Relatórios periódicos de acompanhamento - para registro das atividades e resultados.",
    formaMedicao: "A medição dos fornecimentos será realizada através de: 1) Contagem física dos itens entregues - realizada pelo almoxarifado central; 2) Verificação da conformidade com as especificações técnicas - realizada pela comissão de recebimento; 3) Análise dos certificados de origem sustentável - realizada pelo fiscal do contrato; 4) Registro em sistema eletrônico - para controle e acompanhamento das entregas.",
    periodicidadeMedicao: "As medições serão realizadas mensalmente, com as seguintes etapas: 1) Entrega dos materiais - até o dia 15 de cada mês; 2) Verificação e contagem - em até 2 dias úteis após a entrega; 3) Análise de conformidade - em até 3 dias úteis após a verificação; 4) Emissão do relatório de medição - em até 5 dias úteis após a entrega.",
    criteriosAceitacao: "Os critérios para aceitação dos fornecimentos incluem: 1) Quantidade correta dos itens - conforme especificado no pedido; 2) Conformidade com as especificações técnicas - incluindo certificações ambientais; 3) Integridade das embalagens - sem avarias ou danos; 4) Documentação completa - nota fiscal e certificados de origem sustentável; 5) Prazo de entrega - dentro do cronograma estabelecido.",
    prazosPagamento: "Os pagamentos serão realizados em até 30 dias após a aceitação dos materiais, mediante: 1) Apresentação da nota fiscal eletrônica; 2) Relatório de medição aprovado; 3) Certificados de origem sustentável; 4) Comprovante de regularidade fiscal. O pagamento será proporcional aos itens efetivamente entregues e aceitos.",
    modalidadeLicitacao: "Pregão Eletrônico",
    criterioJulgamento: "Menor preço global",
    requisitosHabilitacao: "Certificação ISO 14001, experiência mínima de 3 anos em projetos similares, equipe técnica qualificada",
    qualificacaoTecnicaEconomica: "Capacidade técnica comprovada, situação regular com a Fazenda Pública, qualificação profissional da equipe",
    praticasSustentabilidade: "Uso de materiais reciclados, redução de consumo de energia, gestão de resíduos, logística reversa e compensação ambiental",
    criteriosAcessibilidade: "Conformidade com ABNT NBR 9050, adaptações para pessoas com deficiência, sinalização tátil e sonora, e treinamento de equipe",
    rastreabilidadeCertificacoes: "Certificação ISO 14001, Selo Verde, Certificação FSC, Rastreabilidade da cadeia produtiva e Auditorias periódicas",
    valorEstimado: "R$ 1.500.000,00 (um milhão e quinhentos mil reais)",
    memoriaCalculo: "1. Custos diretos: R$ 1.200.000,00\n2. Custos indiretos: R$ 200.000,00\n3. Taxas e impostos: R$ 100.000,00\n4. Margem de risco: R$ 50.000,00\n5. Margem de lucro: R$ 50.000,00",
    metodologiaPrecos: "Metodologia baseada em: 1) Pesquisa de mercado com 3 fornecedores similares; 2) Análise de custos históricos de projetos similares; 3) Composição de custos unitários; 4) Aplicação de BDI (Benefícios e Despesas Indiretas) de 15%; 5) Ajuste por índices de mercado",
    dotacaoOrcamentaria: "Dotação orçamentária: 04.122.20.20.3E.4701 - Serviços de Consultoria em Gestão Ambiental\nValor disponível: R$ 2.000.000,00\nExercício: 2024",
    compatibilidadeLDO: "A contratação está em conformidade com a LDO/LOA 2024, conforme:\n1. Art. 4º da LDO 2024 - Compatibilidade com as diretrizes e objetivos da administração pública\n2. Art. 15 da LOA 2024 - Dotação específica para serviços de consultoria\n3. Respeito aos limites de empenho e movimentação financeira\n4. Observância das metas fiscais estabelecidas",
    riscosContratuais: "1. Risco de atraso na execução\n2. Risco de não conformidade com especificações\n3. Risco de aumento de custos\n4. Risco de indisponibilidade de recursos\n5. Risco de mudanças regulatórias",
    alocacaoRiscos: "Contratante:\n- Risco de indisponibilidade de recursos\n- Risco de mudanças regulatórias\n\nContratado:\n- Risco de atraso na execução\n- Risco de não conformidade\n- Risco de aumento de custos operacionais",
    medidasMitigadoras: "1. Atraso na execução:\n   - Plano de contingência\n   - Penalidades por atraso\n   - Monitoramento semanal\n\n2. Não conformidade:\n   - Inspeções periódicas\n   - Testes de qualidade\n   - Garantias contratuais\n\n3. Aumento de custos:\n   - Revisão trimestral de preços\n   - Cláusula de reajuste\n   - Reserva técnica\n\n4. Indisponibilidade de recursos:\n   - Garantia de disponibilidade orçamentária\n   - Plano de contingência financeira\n\n5. Mudanças regulatórias:\n   - Cláusula de adaptação\n   - Revisão contratual",
    responsavelElaboracao: "Nome: João da Silva\nCargo: Analista de Contratações\nDepartamento: Diretoria de Gestão de Contratos\nMatrícula: 12345\nData: 15/03/2024",
    aprovacaoAutoridade: "Nome: Maria Oliveira\nCargo: Diretora de Gestão de Contratos\nDepartamento: Diretoria de Gestão de Contratos\nMatrícula: 54321\nData: 20/03/2024\nAssinatura: _________________",
    estruturaGestao: "Estrutura de Gestão",
    equipeFiscalizacao: "Equipe de Fiscalização",
    procedimentosFiscalizacao: "Procedimentos de Fiscalização",
    relatoriosDocumentacao: "Relatórios de Documentação",
    cronogramaFisicoFinanceiro: "Cronograma Físico e Financeiro",
    bdi: {
      administracaoCentral: 15,
      custoFinanceiro: 10,
      seguros: 5,
      garantias: 5,
      impostos: 5,
      lucro: 5
    },
    planilhaPrecos: "Planilha de Preços",
    metodologiaExecucao: "Metodologia de Execução"
  },
  quantitativos: {
    items: [
      {
        id: 1,
        descricao: "Canetas esferográficas ecológicas feitas de material reciclado, tinta à base de água, corpo biodegradável 🖊️",
        unidade: "Caixa com 50 unidades",
        quantidade: 20,
        valorUnitario: 45.80,
        valorTotal: 916.00
      },
      {
        id: 2,
        descricao: "Papel A4 certificado FSC - 100% sustentável, alvura 96%, gramatura 75g/m² 📄",
        unidade: "Resma 500 folhas",
        quantidade: 150,
        valorUnitario: 28.50,
        valorTotal: 4275.00
      },
      {
        id: 3,
        descricao: "Pastas suspensas feitas de papelão reciclado, com visor plástico PET reciclado 📁",
        unidade: "Pacote com 25 unidades",
        quantidade: 30,
        valorUnitario: 85.90,
        valorTotal: 2577.00
      },
      {
        id: 4,
        descricao: "Grampeadores sustentáveis, estrutura em metal reciclado, capacidade 20 folhas 📎",
        unidade: "Unidade",
        quantidade: 45,
        valorUnitario: 32.75,
        valorTotal: 1473.75
      }
    ],
    valorTotalGeral: 9241.75,
    valorEstimadoETP: 10000.00
  },
  especificacoes: {
    tecnicasDetalhadas: "Todos os materiais deverão possuir certificação ambiental reconhecida (FSC, ABNT NBR ISO 14001 ou equivalente). As canetas devem apresentar tinta fluida, secagem rápida e durabilidade mínima de 2km de escrita. O papel deve ser livre de cloro elementar e possuir certificação de origem sustentável. As pastas suspensas devem suportar peso mínimo de 2kg sem deformação e possuir etiquetas adesivas incluídas.",
    criteriosQualidade: "Os produtos serão aceitos mediante inspeção visual e testes funcionais. Será verificada a integridade das embalagens, conformidade com as especificações técnicas, presença de certificações ambientais válidas e funcionamento adequado dos itens. Produtos com defeitos, avarias ou não conformidades serão rejeitados e substituídos sem ônus adicional."
  },
  prazos: {
    execucao: {
      valor: 30,
      unidade: "dias"
    },
    vigencia: {
      valor: 12,
      unidade: "meses"
    },
    localEntrega: "Almoxarifado Central da Prefeitura Municipal - Rua das Flores, 123, Centro - São Paulo/SP, CEP: 01234-567, horário de recebimento: segunda a sexta das 8h às 17h",
    condicoesRecebimento: "O recebimento será realizado em duas etapas: provisório (verificação quantitativa e conferência da documentação) em até 5 dias úteis, e definitivo (verificação qualitativa e testes de funcionamento) em até 10 dias úteis após o recebimento provisório. A contratada deverá fornecer nota fiscal eletrônica e certificados de qualidade/sustentabilidade."
  },
  garantias: {
    produto: {
      valor: 12,
      unidade: "meses"
    },
    contratualExigida: true,
    contratualPercentual: 2,
    modalidadesAceitas: ["Caução em dinheiro ou títulos", "Seguro-garantia", "Fiança bancária"],
    modalidadePagamento: "por_etapa",
    condicoesPagamento: "O pagamento será efetuado em até 30 dias corridos após o recebimento definitivo dos materiais, mediante apresentação de nota fiscal eletrônica, certificado de qualidade e comprovação de regularidade fiscal. Em caso de entrega parcial, o pagamento será proporcional aos itens efetivamente entregues e aceitos."
  },
  requisitos: {
    habilitacaoTecnica: "A empresa deverá comprovar experiência em fornecimento de materiais de escritório sustentáveis através de atestados de capacidade técnica emitidos por pessoas jurídicas de direito público ou privado, que comprovem o fornecimento de itens similares nos últimos 3 anos. Deverá apresentar certificações ambientais válidas e comprovação de origem sustentável dos produtos.",
    qualificacaoEconomica: "Patrimônio líquido mínimo de 10% do valor estimado da contratação, comprovado através do balanço patrimonial do último exercício social. Capital mínimo ou patrimônio líquido de R$ 1.000,00. Certidões negativas de falência, concordata, recuperação judicial ou extrajudicial expedidas pelos cartórios de distribuição da sede da pessoa jurídica.",
    vistoriaTecnica: "facultativa",
    informacoesVistoria: "A vistoria é facultativa e poderá ser realizada no Almoxarifado Central, localizado na Rua das Flores, 123, Centro. Agendamento através do telefone (11) 3456-7890 com Maria Santos, de segunda a sexta-feira, das 8h às 17h. A vistoria tem como objetivo permitir ao licitante conhecer as condições locais de entrega e armazenamento."
  },
  sustentabilidade: {
    criteriosSustentabilidade: "Priorização de produtos com certificação ambiental (FSC, ABNT NBR ISO 14001, Cradle to Cradle). Preferência por materiais reciclados, recicláveis ou biodegradáveis. Embalagens reduzidas e preferencialmente reutilizáveis. Fornecedores com políticas ambientais documentadas e práticas de responsabilidade social. Logística reversa para recolhimento de embalagens e produtos ao final da vida útil. Atendimento à Política Nacional de Resíduos Sólidos (Lei 12.305/2010).",
    lgpdAplicavel: false,
    detalhamentoLGPD: "Não se aplica, pois a contratação não envolve tratamento de dados pessoais.",
    contratoEficiencia: false,
    detalhamentoEficiencia: "Não se aplica para esta modalidade de contratação."
  },
  obrigacoes: {
    contratante: "Fornecer local adequado para entrega dos materiais; efetuar o pagamento nas condições e prazos estabelecidos; designar servidor responsável pelo acompanhamento e fiscalização da entrega; comunicar por escrito qualquer irregularidade encontrada nos produtos; prestar as informações e esclarecimentos necessários que venham a ser solicitados pela contratada; aplicar as sanções administrativas quando couber.",
    contratada: "Entregar os materiais nas especificações, quantidades, prazos e local estabelecidos; substituir produtos com defeitos ou não conformidades sem ônus adicional; manter as condições de habilitação durante toda a vigência contratual; responsabilizar-se por todos os tributos incidentes sobre o objeto; manter sigilo sobre informações obtidas durante a execução; apresentar garantia dos produtos conforme especificado; fornecer produtos originais, novos e de primeiro uso."
  },
  gestaoFiscalizacao: {
    modeloGestao: "A gestão e fiscalização do contrato serão exercidas por servidor especialmente designado pela Secretaria Municipal de Administração. O gestor será responsável por acompanhar a execução, verificar o cumprimento das obrigações contratuais, atestar a conformidade dos produtos entregues e comunicar irregularidades. Será mantido registro detalhado das ocorrências e comunicações relacionadas ao contrato.",
    criteriosMedicao: "A medição será realizada por item entregue e aceito definitivamente. Para cada entrega, será verificada a conformidade quantitativa e qualitativa dos produtos, emitindo-se termo de recebimento provisório e, posteriormente, definitivo. O pagamento será autorizado somente após a medição e aceitação dos produtos pelo gestor do contrato."
  },
  sancoes: {
    sancoesAdministrativas: "Em caso de descumprimento das obrigações contratuais, a contratada estará sujeita às seguintes sanções: advertência por escrito; multa de 0,5% por dia de atraso sobre o valor da parcela em atraso; multa de 10% sobre o valor total do contrato em caso de inexecução total ou parcial; suspensão temporária do direito de licitar com a Administração Pública; declaração de inidoneidade para licitar ou contratar com a Administração Pública.",
    procedimentosAplicacao: "As sanções serão aplicadas mediante processo administrativo que assegure o contraditório e a ampla defesa. A contratada será notificada por escrito para apresentar defesa no prazo de 5 dias úteis. Após análise da defesa, será proferida decisão fundamentada. As multas poderão ser descontadas dos pagamentos devidos ou cobradas judicialmente. A aplicação das sanções não exime a contratada da reparação dos danos causados."
  }
};
