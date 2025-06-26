import { useState, useCallback, useRef } from 'react';

export interface EditalData {
  preambulo: {
    numeroOrdem: string;
    nomeOrgao: string;
    modalidadeLicitacao: string;
    regimeExecucao: string;
    tipoJulgamento: string;
    formatoPreambulo: string;
    termoReferencia: string;
    regulamentacaoMunicipal: string;
  };
  objeto: {
    definicaoObjeto: string;
    processoAdministrativo: string;
    nivelDetalhamento: string;
  };
  acessoEdital: {
    dataHoraLocal: string;
    linkPNCP: string;
    prazoEsclarecimento: string;
    prazoImpugnacao: string;
    procedimentosEspecificos: string;
  };
  condicoesParticipacao: {
    requisitosParticipacao: string;
    vedacoesParticipacao: string;
    condicoesConsorcios: string;
    requisitosAdicionais: string;
    tratamentoME_EPP: string;
  };
  credenciamento: {
    procedimentosCredenciamento: string;
    documentosNecessarios: string;
    procedimentosEspecificos: string;
  };
  apresentacaoProposta: {
    formaApresentacao: string;
    prazoValidade: string;
    conteudoMinimo: string;
    formatoEspecifico: string;
    declaracaoExequibilidade: string;
  };
  classificacaoPropostas: {
    criteriosClassificacao: string;
    criteriosDesempate: string;
    criteriosAdicionais: string;
  };
  faseLances: {
    aplicavel: boolean;
    modoDisputa: string;
    intervaloMinimo: string;
    regrasProrrogacao: string;
    procedimentosEspecificos: string;
  };
  julgamento: {
    criteriosObjetivos: string;
    fatoresPonderacao: string;
    criteriosAdicionais: string;
  };
  habilitacao: {
    documentacaoJuridica: string;
    documentacaoFiscal: string;
    qualificacaoTecnica: string;
    qualificacaoEconomica: string;
    requisitosAdicionais: string;
    comprovantesEquivalentes: string;
    sistemasOficiais: string;
  };
  recursos: {
    prazosRecursos: string;
    procedimentos: string;
    efeitos: string;
    procedimentosEspecificos: string;
  };
  adjudicacaoHomologacao: {
    criteriosAdjudicacao: string;
    procedimentosHomologacao: string;
    procedimentosEspecificos: string;
    homologacaoParcial: string;
  };
  garantias: {
    garantiaProposta: boolean;
    garantiaExecucao: boolean;
    percentuaisModalidades: string;
    percentuaisEspecificos: string;
  };
  contratacao: {
    prazoAssinatura: string;
    condicoesAssinatura: string;
    procedimentosEspecificos: string;
  };
  sancoes: {
    infracoesAdministrativas: string;
    penalidadesAplicaveis: string;
    procedimentoSancionatorio: string;
    dosimetriaEspecifica: string;
  };
  disposicoesGerais: {
    regrasAnulacaoRevogacao: string;
    casosOmissos: string;
    disposicoesEspecificas: string;
  };
  foro: {
    foroCompetente: string;
    definicaoEspecifica: string;
  };
}

// Dados mock inline para evitar problemas de importação
// revisado todos os campos e conferemm com o front end !
const initialData: EditalData = {
  preambulo: {
    numeroOrdem: "042/2025",
    nomeOrgao: "PREFEITURA MUNICIPAL DE LUMINAR",
    modalidadeLicitacao: "Pregão Eletrônico",
    regimeExecucao: "Empreitada por Preço Global",
    tipoJulgamento: "Menor Preço",
    formatoPreambulo: "EDITAL DE PREGÃO ELETRÔNICO Nº [NÚMERO], de [DATA]. A PREFEITURA MUNICIPAL DE LUMINAR, por meio de sua Comissão Permanente de Licitação, torna público que realizará licitação na modalidade PREGÃO ELETRÔNICO, do tipo MENOR PREÇO, em regime de EMPREITADA POR PREÇO GLOBAL, conforme Lei nº 14.133/2021.",
    termoReferencia: "Termo de Referência pré-preenchido automaticamente pela IA-LUX com base nos modelos e diretrizes da AGU/TCU, garantindo conformidade legal e agilidade na elaboração do documento.",
    regulamentacaoMunicipal: ""
  },
  objeto: {
    definicaoObjeto: "Contratação de serviços de limpeza e conservação predial para o Centro Administrativo Municipal, incluindo fornecimento de mão de obra, materiais e equipamentos necessários à execução dos serviços.",
    processoAdministrativo: "Processo Administrativo nº 2025.001.042",
    nivelDetalhamento: ""
  },
  acessoEdital: {
    dataHoraLocal: "15 de julho de 2025, às 09:00 horas, exclusivamente através do sistema eletrônico www.licitacoes.prefeitura-luminar.gov.br",
    linkPNCP: "https://www.gov.br/compras/pt-br/acesso-a-sistemas/comprasnet-siasg",
    prazoEsclarecimento: "até 3 (três) dias úteis antes da data fixada para abertura da sessão pública",
    prazoImpugnacao: "até 3 (três) dias úteis antes da data fixada para abertura da sessão pública",
    procedimentosEspecificos: ""
  },
  condicoesParticipacao: {
    requisitosParticipacao: "Poderão participar desta licitação pessoas jurídicas legalmente constituídas, cujo objeto social seja pertinente e compatível com o objeto desta licitação, que satisfaçam as condições de habilitação estabelecidas neste edital.",
    vedacoesParticipacao: "Não poderão participar da presente licitação as empresas enquadradas nas vedações previstas no art. 38 da Lei nº 14.133/2021, bem como aquelas declaradas inidôneas por qualquer órgão da Administração Pública.",
    condicoesConsorcios: "Não será permitida a participação de empresas reunidas em consórcio.",
    requisitosAdicionais: "",
    tratamentoME_EPP: "Será aplicado tratamento diferenciado para Microempresas e Empresas de Pequeno Porte conforme Lei Complementar nº 123/2006, garantindo preferência na igualdade de condições."
  },
  credenciamento: {
    procedimentosCredenciamento: "O credenciamento dar-se-á pela atribuição de chave de identificação e de senha, pessoal e intransferível, para acesso ao sistema eletrônico.",
    documentosNecessarios: "Para o credenciamento deverão ser apresentados: atos constitutivos da empresa; prova de inscrição no CNPJ; documento de procuração do representante legal com poderes para formular lances e praticar demais atos.",
    procedimentosEspecificos: ""
  },
  apresentacaoProposta: {
    formaApresentacao: "A proposta de preços deverá ser encaminhada por meio do sistema eletrônico até a data e horário estabelecidos no preâmbulo, quando então encerrar-se-á automaticamente a etapa de recebimento de propostas.",
    prazoValidade: "60 (sessenta) dias, contados a partir da data de sua apresentação",
    conteudoMinimo: "A proposta de preços deverá conter: descrição do objeto ofertado; preço unitário e total; prazo de entrega ou execução; condições de pagamento; prazo de validade da proposta; especificação completa do bem ou serviço.",
    formatoEspecifico: "",
    declaracaoExequibilidade: "O licitante declara, sob as penas da lei, que o objeto desta licitação é exequível e que possui capacidade técnica e econômica para executá-lo conforme especificações e condições estabelecidas no edital."
  },
  classificacaoPropostas: {
    criteriosClassificacao: "Serão desclassificadas as propostas que não atenderem às exigências do edital, apresentarem preços manifestamente inexequíveis ou superiores ao máximo admitido.",
    criteriosDesempate: "Em caso de empate, será assegurada preferência sucessivamente aos bens e serviços produzidos no País; produzidos por empresas brasileiras; produzidos por empresas que invistam em pesquisa e desenvolvimento no País.",
    criteriosAdicionais: ""
  },
  faseLances: {
    aplicavel: true,
    modoDisputa: "Disputa Aberta",
    intervaloMinimo: "R$ 100,00 (cem reais) ou 1% (um por cento) do valor da proposta",
    regrasProrrogacao: "Havendo lance ofertado nos últimos 2 (dois) minutos do período de duração da sessão pública, será prorrogada automaticamente por mais 2 (dois) minutos.",
    procedimentosEspecificos: ""
  },
  julgamento: {
    criteriosObjetivos: "O julgamento será realizado pelo critério de menor preço, considerando-se vencedora a licitante que apresentar a proposta de menor valor para o objeto licitado.",
    fatoresPonderacao: "Não se aplica ao critério de menor preço",
    criteriosAdicionais: ""
  },
  habilitacao: {
    documentacaoJuridica: "Prova de constituição da empresa (atos constitutivos, estatutos ou contratos sociais em vigor, devidamente registrados); prova de regularidade perante a Fazenda Nacional.",
    documentacaoFiscal: "Prova de regularidade fiscal perante a Fazenda Nacional, Estadual e Municipal; prova de regularidade relativa ao FGTS; prova de inexistência de débitos inadimplidos perante a Justiça do Trabalho.",
    qualificacaoTecnica: "Comprovação de aptidão para o desempenho de atividade pertinente e compatível com o objeto da licitação; indicação das instalações, do aparelhamento e do pessoal técnico adequados.",
    qualificacaoEconomica: "Balanço patrimonial e demonstrações contábeis do último exercício; certidão negativa de falência; comprovação de patrimônio líquido mínimo correspondente a 10% do valor estimado.",
    requisitosAdicionais: "",
    comprovantesEquivalentes: "Serão aceitos comprovantes equivalentes aos documentos exigidos, conforme Art. 67 da Lei 14.133/2021, desde que demonstrem a mesma finalidade probatória.",
    sistemasOficiais: "Será aceita a regularidade comprovada via sistemas oficiais como CRC, SICAF, SICONV e demais sistemas governamentais, conforme regulamentação específica."
  },
  recursos: {
    prazosRecursos: "Recurso contra a habilitação ou inabilitação de licitantes e julgamento das propostas: 3 (três) dias úteis; Contrarrazões: 3 (três) dias úteis.",
    procedimentos: "Os recursos deverão ser interpostos exclusivamente por meio eletrônico, dirigidos ao Pregoeiro, que poderá reconsiderar sua decisão ou encaminhá-lo à autoridade competente.",
    efeitos: "Os recursos terão efeito suspensivo, exceto quando manifestamente protelatórios ou quando a manutenção da decisão recorrida for necessária por motivo de interesse público.",
    procedimentosEspecificos: ""
  },
  adjudicacaoHomologacao: {
    criteriosAdjudicacao: "A adjudicação será feita pelo Pregoeiro à licitante vencedora, por menor preço, após verificação da conformidade da proposta com os requisitos do edital.",
    procedimentosHomologacao: "A homologação será realizada pela autoridade competente após verificação da regularidade dos atos praticados.",
    procedimentosEspecificos: "",
    homologacaoParcial: "Poderá ser homologada parcialmente a licitação, quando o objeto for divisível, conforme Art. 172 da Lei 14.133/2021."
  },
  garantias: {
    garantiaProposta: false,
    garantiaExecucao: true,
    percentuaisModalidades: "Garantia de execução: 5% (cinco por cento) do valor do contrato. Modalidades aceitas: caução em dinheiro, títulos da dívida pública, seguro-garantia ou fiança bancária.",
    percentuaisEspecificos: ""
  },
  contratacao: {
    prazoAssinatura: "5 (cinco) dias úteis contados da convocação",
    condicoesAssinatura: "A contratação fica condicionada à comprovação das condições de habilitação consignadas neste edital, as quais deverão ser mantidas pelo licitante durante toda a vigência do contrato.",
    procedimentosEspecificos: ""
  },
  sancoes: {
    infracoesAdministrativas: "Não apresentar situação regular no ato da contratação; não manter a proposta; não celebrar o contrato; deixar de entregar documentação exigida; apresentar documentação falsa; não manter as condições de habilitação; não cumprir obrigações contratuais.",
    penalidadesAplicaveis: "Advertência; multa de 0,1% a 20% sobre o valor do contrato; suspensão temporária de participação em licitação; declaração de inidoneidade para licitar.",
    procedimentoSancionatorio: "A aplicação das penalidades observará o devido processo legal, garantindo-se o direito ao contraditório e à ampla defesa.",
    dosimetriaEspecifica: ""
  },
  disposicoesGerais: {
    regrasAnulacaoRevogacao: "A Administração poderá revogar a licitação por razões de interesse público ou anulá-la por ilegalidade, de ofício ou por provocação de terceiros.",
    casosOmissos: "Os casos omissos serão resolvidos pela Comissão de Licitação, com base na legislação vigente.",
    disposicoesEspecificas: ""
  },
  foro: {
    foroCompetente: "Fica eleito o foro da Comarca de Luminar para dirimir quaisquer dúvidas ou litígios oriundos da licitação e do contrato dela decorrente.",
    definicaoEspecifica: ""
  }
};

export const useEditalData = () => {
  const [data, setData] = useState<EditalData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const updateField = useCallback((
    section: keyof EditalData, 
    field: string, 
    value: any
  ) => {
    // Cancelar o debounce anterior se existir
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Atualizar o estado imediatamente para UI responsiva
    setData((prevData: EditalData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value
      }
    }));

    // Debounce para salvar após 500ms de inatividade
    debounceRef.current = setTimeout(() => {
      console.log(`Campo ${section}.${field} atualizado:`, value);
    }, 500);
  }, []);

  const saveAll = useCallback(async () => {
    setIsSaving(true);
    try {
      // Simula salvamento na API
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log('Edital salvo com sucesso:', data);
    } catch (error) {
      console.error('Erro ao salvar edital:', error);
    } finally {
      setIsSaving(false);
    }
  }, [data]);

  return {
    data,
    isLoading,
    error: null,
    updateField,
    saveAll,
    isUpdating: false,
    isSaving,
    updateError: null,
    saveError: null
  };
};
