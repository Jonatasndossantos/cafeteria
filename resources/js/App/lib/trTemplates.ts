
export interface TRTemplate {
  id: string;
  titulo: string;
  referenciaLegal: string;
  aplicabilidade: string[];
  modalidade: string[];
  campos: {
    [key: string]: any;
  };
  raciocinio?: {
    espadaAnterior: string;
    dadosHerdados: string[];
    validacoes: string[];
  };
}

export const TR_TEMPLATES: { [key: string]: TRTemplate } = {
  'bens': {
    id: 'termo_referencia_compras_materiais',
    titulo: 'Termo de Referência – Aquisição de Materiais',
    referenciaLegal: 'Lei 14.133/21',
    aplicabilidade: ['Aquisição de bens permanentes ou de consumo'],
    modalidade: ['Pregão Eletrônico', 'Concorrência'],
    raciocinio: {
      espadaAnterior: 'Espada 2 - ETP',
      dadosHerdados: ['Objeto definido', 'Justificativa técnica', 'Valor estimado', 'Quantitativos'],
      validacoes: ['Pesquisa de preços validada', 'Especificações técnicas adequadas', 'Prazo de entrega compatível']
    },
    campos: {
      objeto: 'Aquisição de [materiais/permanentes/consumo] para [finalidade/setor solicitante]',
      prazoEntrega: { valor: 15, unidade: 'dias' },
      garantiaProduto: { valor: 12, unidade: 'meses' },
      garantiaContratual: { exigida: false },
      modalidadePagamento: 'entrega_total',
      especificacoes: {
        obrigatorias: ['Marca', 'Modelo', 'Características técnicas'],
        criteriosAceitacao: ['Produtos devem atender integralmente às especificações', 'Entrega dentro do prazo pactuado']
      },
      fundamentacaoPreco: 'Pesquisa de mercado conforme IN SEGES 65/2021 (mínimo 3 cotações válidas ou base pública)'
    }
  },
  'bens_dispensa': {
    id: 'termo_referencia_simplificado_dispensa',
    titulo: 'Termo de Referência Simplificado – Contratação por Dispensa de Licitação',
    referenciaLegal: 'Lei 14.133/21, Art. 75',
    aplicabilidade: ['Aquisição direta com fundamento legal de dispensa'],
    modalidade: ['Contratação Direta - Dispensa'],
    raciocinio: {
      espadaAnterior: 'Espada 1 - DFD',
      dadosHerdados: ['Demanda identificada', 'Valor dentro dos limites legais', 'Urgência justificada'],
      validacoes: ['Valor inferior aos limites do Art. 75', 'Justificativa técnica e econômica', 'Pesquisa de preços simplificada']
    },
    campos: {
      objeto: 'Aquisição direta de [bem/serviço] para atender à demanda da [secretaria/setor] conforme justificativa técnica anexa',
      fundamentacaoLegal: {
        modalidade: 'Dispensa de Licitação',
        artigo: 'Art. 75, inciso I',
        descricao: 'Valor estimado inferior ao limite legal previsto para bens e serviços'
      },
      justificativa: {
        tecnica: 'A contratação é necessária para suprir uma demanda urgente, sem possibilidade de aguardar processo licitatório regular',
        economica: 'A pesquisa de preços demonstra compatibilidade com o mercado, assegurando a vantajosidade da contratação'
      },
      pesquisaPrecos: {
        metodologia: 'Consulta a 3 fornecedores ou base pública disponível',
        minimoFornecedores: 3
      },
      prazoEntrega: { valor: 10, unidade: 'dias' },
      modalidadePagamento: 'entrega_total'
    }
  },
  'servicos_sem_mao_obra': {
    id: 'termo_referencia_servicos_obras',
    titulo: 'Termo de Referência – Serviços sem Mão de Obra',
    referenciaLegal: 'Lei 14.133/21',
    aplicabilidade: ['Serviços sem dedicação exclusiva de mão de obra'],
    modalidade: ['Pregão Eletrônico', 'Concorrência'],
    raciocinio: {
      espadaAnterior: 'Espada 2 - ETP',
      dadosHerdados: ['Escopo técnico definido', 'Cronograma de execução', 'Indicadores de resultado'],
      validacoes: ['Especificações técnicas detalhadas', 'Critérios de medição definidos', 'Prazos compatíveis com complexidade']
    },
    campos: {
      objeto: 'Prestação de serviços de [INSERIR OBJETO]',
      prazoExecucao: { valor: 12, unidade: 'meses' },
      prazoVigencia: { valor: 12, unidade: 'meses' },
      garantiaProduto: { valor: 12, unidade: 'meses' },
      garantiaContratual: { exigida: true, percentual: 5 },
      modalidadePagamento: 'por_medicao',
      gestao: {
        fiscalTecnico: true,
        fiscalAdministrativo: true,
        responsabilidades: ['acompanhamento', 'registros', 'relatórios']
      },
      repactuacao: { permitida: true, tipos: ['insumos'], periodicidade: 'anual' }
    }
  },
  'servicos_com_mao_obra': {
    id: 'termo_referencia_servicos_simples',
    titulo: 'TR Enxuto – Serviços Comuns com Dedicação Exclusiva',
    referenciaLegal: 'Lei 14.133/21',
    aplicabilidade: ['Serviços contínuos com dedicação exclusiva de mão de obra'],
    modalidade: ['Pregão Eletrônico'],
    raciocinio: {
      espadaAnterior: 'Espada 2 - ETP',
      dadosHerdados: ['Planilha de custos validada', 'Convenções coletivas vigentes', 'Postos de trabalho dimensionados'],
      validacoes: ['Custos alinhados com IN 05/2017', 'Encargos sociais corretos', 'Jornada de trabalho adequada']
    },
    campos: {
      objeto: 'Prestação de serviços de [limpeza/vigilância/outro] com dedicação exclusiva de mão de obra',
      prazoExecucao: { valor: 12, unidade: 'meses' },
      prazoVigencia: { valor: 12, unidade: 'meses' },
      garantiaProduto: { valor: 12, unidade: 'meses' },
      garantiaContratual: { exigida: true, percentual: 5 },
      modalidadePagamento: 'mensal',
      cronograma: ['Segunda a sexta-feira, horário comercial'],
      planilhaCustos: {
        itens: ['Salário base', 'Encargos sociais', 'Benefícios legais', 'Uniformes', 'EPIs'],
        referencia: 'IN nº 05/2017 e convenções coletivas'
      },
      gestao: {
        fiscalTecnico: true,
        fiscalAdministrativo: true,
        responsabilidades: ['acompanhar cumprimento contratual', 'registrar não conformidades']
      },
      repactuacao: { permitida: true, tipos: ['mão de obra', 'insumos'], periodicidade: 'anual' },
      documentosReferencia: ['Planilha de custos e formação de preços', 'Convenção coletiva vigente', 'IN SEGES nº 05/2017']
    }
  },
  'obras': {
    id: 'termo_referencia_obras_engenharia',
    titulo: 'Termo de Referência – Obras e Serviços de Engenharia',
    referenciaLegal: 'Lei 14.133/21',
    aplicabilidade: ['Obras', 'Serviços de Engenharia'],
    modalidade: ['Concorrência', 'Pregão Eletrônico'],
    raciocinio: {
      espadaAnterior: 'Espada 2 - ETP',
      dadosHerdados: ['Projeto básico validado', 'Cronograma físico-financeiro', 'Composições de custos SINAPI'],
      validacoes: ['Memorial descritivo completo', 'Planilhas orçamentárias validadas', 'Licenças ambientais verificadas']
    },
    campos: {
      objeto: 'Execução de obras de [INSERIR OBJETO]',
      prazoExecucao: { valor: 180, unidade: 'dias' },
      prazoVigencia: { valor: 12, unidade: 'meses' },
      garantiaProduto: { valor: 60, unidade: 'meses' },
      garantiaContratual: { exigida: true, percentual: 5 },
      modalidadePagamento: 'por_medicao',
      cronograma: ['Etapa 1: Serviços preliminares', 'Etapa 2: Estrutura', 'Etapa 3: Acabamentos'],
      materiais: ['Fornecimento e aplicação de todos os materiais'],
      gestao: {
        fiscalTecnico: true,
        fiscalAdministrativo: true,
        responsabilidades: ['acompanhamento técnico', 'medições', 'registros', 'relatórios']
      },
      repactuacao: { permitida: true, tipos: ['mão de obra', 'insumos'], periodicidade: 'anual' }
    }
  },
  'tic_compras': {
    id: 'termo_referencia_tic_compras',
    titulo: 'Termo de Referência – TIC Compras',
    referenciaLegal: 'Lei 14.133/21 e IN SGD/ME 1/2019',
    aplicabilidade: ['Aquisição de bens de TIC'],
    modalidade: ['Pregão Eletrônico'],
    raciocinio: {
      espadaAnterior: 'Espada 2 - ETP',
      dadosHerdados: ['Requisitos técnicos de TIC', 'Análise de capacidade', 'Sustentabilidade validada'],
      validacoes: ['Compatibilidade tecnológica', 'Certificações obrigatórias', 'Padrões de interoperabilidade']
    },
    campos: {
      objeto: 'Aquisição de equipamentos de TIC para [finalidade]',
      prazoEntrega: { valor: 30, unidade: 'dias' },
      garantiaProduto: { valor: 36, unidade: 'meses' },
      garantiaContratual: { exigida: false },
      modalidadePagamento: 'entrega_total',
      especificacoesTecnicas: {
        obrigatorias: ['Compatibilidade', 'Certificações', 'Padrões técnicos'],
        sustentabilidade: ['Certificação EPEAT', 'Energy Star', 'RoHS']
      },
      suporteTecnico: { incluido: true, prazo: '36 meses' }
    }
  },
  'tic_servicos': {
    id: 'termo_referencia_tic_servicos',
    titulo: 'Termo de Referência – TIC Serviços',
    referenciaLegal: 'Lei 14.133/21 e IN SGD/ME 1/2019',
    aplicabilidade: ['Serviços de TIC'],
    modalidade: ['Pregão Eletrônico', 'Concorrência'],
    raciocinio: {
      espadaAnterior: 'Espada 2 - ETP',
      dadosHerdados: ['Análise de riscos de TIC', 'Requisitos de segurança', 'SLA definidos'],
      validacoes: ['Níveis de serviço adequados', 'Requisitos de segurança atendidos', 'Gestão de dados validada']
    },
    campos: {
      objeto: 'Prestação de serviços de TIC para [finalidade]',
      prazoExecucao: { valor: 12, unidade: 'meses' },
      prazoVigencia: { valor: 48, unidade: 'meses' },
      garantiaProduto: { valor: 12, unidade: 'meses' },
      garantiaContratual: { exigida: true, percentual: 5 },
      modalidadePagamento: 'mensal',
      nivelServico: {
        disponibilidade: '99.5%',
        tempoResposta: '4 horas',
        resolucao: '24 horas'
      },
      gestao: {
        fiscalTecnico: true,
        fiscalAdministrativo: true,
        responsabilidades: ['acompanhamento técnico', 'SLA', 'relatórios']
      }
    }
  }
};

export const getTemplateByType = (tipoObjeto: string): TRTemplate | null => {
  return TR_TEMPLATES[tipoObjeto] || null;
};

export const getSugestoesPorTipo = (tipoObjeto: string) => {
  const template = getTemplateByType(tipoObjeto);
  if (!template) return [];

  const sugestoes = [
    {
      tipo: 'objeto',
      titulo: 'Definição do Objeto',
      sugestao: template.campos.objeto,
      justificativa: 'Baseado no template padrão para este tipo de contratação'
    }
  ];

  if (template.campos.prazoEntrega || template.campos.prazoExecucao) {
    const prazo = template.campos.prazoEntrega || template.campos.prazoExecucao;
    sugestoes.push({
      tipo: 'prazo',
      titulo: 'Prazo de Execução',
      sugestao: `${prazo.valor} ${prazo.unidade}`,
      justificativa: 'Prazo adequado conforme análise histórica e complexidade do objeto'
    });
  }

  if (template.campos.modalidadePagamento) {
    sugestoes.push({
      tipo: 'pagamento',
      titulo: 'Modalidade de Pagamento',
      sugestao: template.campos.modalidadePagamento,
      justificativa: 'Modalidade mais adequada para este tipo de contratação'
    });
  }

  return sugestoes;
};
