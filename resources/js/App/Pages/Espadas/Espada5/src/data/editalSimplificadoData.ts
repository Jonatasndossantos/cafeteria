
// Base de dados para o Edital Simplificado com textos padrão AGU/TCU
export const textosAguTcu = {
  fundamentacaoLegal: {
    pregao: "Lei nº 14.133/2021, art. 28 (modalidade Pregão), Decreto nº 10.024/2019 e Lei Complementar nº 123/2006.",
    concorrencia: "Lei nº 14.133/2021, art. 28 (modalidade Concorrência) e demais normas correlatas.",
    convite: "Lei nº 14.133/2021, art. 28 (modalidade Convite) e demais normas correlatas."
  },
  
  condicoesParticipacao: `Poderão participar desta licitação pessoas jurídicas legalmente constituídas, cujo objeto social seja pertinente e compatível com o objeto desta licitação, que satisfaçam as condições de habilitação estabelecidas neste edital e que não estejam impedidas de contratar com a Administração Pública, conforme art. 38 da Lei nº 14.133/2021.`,
  
  documentacaoNecessaria: `1) Habilitação Jurídica: atos constitutivos da empresa, prova de inscrição no CNPJ; 2) Regularidade Fiscal: regularidade perante Fazenda Nacional, Estadual e Municipal, FGTS e inexistência de débitos trabalhistas; 3) Qualificação Técnica: comprovação de aptidão para desempenho de atividade pertinente ao objeto; 4) Qualificação Econômico-Financeira: balanço patrimonial, certidão negativa de falência e patrimônio líquido mínimo.`,
  
  apresentacaoPropostas: `As propostas deverão ser encaminhadas exclusivamente por meio do sistema eletrônico até a data e horário estabelecidos, contendo descrição do objeto, preço unitário e total, prazo de execução, condições de pagamento e prazo de validade de 60 (sessenta) dias.`,
  
  classificacaoPropostas: `Serão desclassificadas as propostas que não atenderem às exigências do edital, apresentarem preços manifestamente inexequíveis ou superiores ao valor máximo admitido. Em caso de empate, aplicam-se os critérios do art. 60 da Lei nº 14.133/2021.`,
  
  condicoesPagamento: `O pagamento será efetuado em até 30 (trinta) dias após a entrega do objeto e aceite definitivo, mediante apresentação de nota fiscal e comprovação de regularidade fiscal, trabalhista e previdenciária.`,
  
  penalidades: `Aplicam-se as penalidades previstas na Lei nº 14.133/2021: a) advertência; b) multa de 0,1% a 20% sobre o valor do contrato; c) suspensão temporária de participação em licitação; d) declaração de inidoneidade para licitar, conforme a gravidade da infração.`,
  
  recursos: `Os recursos deverão ser interpostos no prazo de 3 (três) dias úteis, por meio eletrônico, dirigidos ao Pregoeiro, que poderá reconsiderar sua decisão ou encaminhá-lo à autoridade competente. Contrarrazões em igual prazo.`,
  
  garantias: `Será exigida garantia de execução no percentual de 5% (cinco por cento) do valor do contrato, nas modalidades: caução em dinheiro, títulos da dívida pública, seguro-garantia ou fiança bancária.`,
  
  adjudicacaoHomologacao: `A adjudicação será feita pelo Pregoeiro à licitante vencedora, após verificação da conformidade da proposta. A homologação será realizada pela autoridade competente após verificação da regularidade dos atos.`,
  
  sancoes: `O descumprimento de cláusulas contratuais sujeitará o contratado às sanções previstas na Lei nº 14.133/2021, garantido o direito ao contraditório e à ampla defesa, com aplicação proporcional à gravidade da infração.`,
  
  disposicoesGerais: `A Administração poderá revogar a licitação por razões de interesse público ou anulá-la por ilegalidade. Os casos omissos serão resolvidos com base na legislação vigente e nos princípios gerais de direito.`,
  
  foro: `Fica eleito o foro da Comarca onde se situa o órgão licitante para dirimir quaisquer dúvidas ou litígios oriundos da licitação e do contrato dela decorrente.`
};

export const validacoesObrigatorias = [
  'Objeto compatível com o Termo de Referência',
  'Fundamentação legal adequada à modalidade',
  'Prazos compatíveis com a complexidade',
  'Todas as cláusulas obrigatórias presentes',
  'Documentação de habilitação completa',
  'Condições de pagamento definidas',
  'Penalidades e recursos especificados'
];

export const orientacoesMunicipais = {
  texto: "Inserir regulamentações específicas conforme legislação municipal local e decretos aplicáveis.",
  exemplos: [
    "Decreto Municipal de Licitações",
    "Regulamento de Credenciamento Local", 
    "Normas Específicas do Tribunal de Contas",
    "Procedimentos Internos do Órgão"
  ]
};
