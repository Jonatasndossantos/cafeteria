
interface DadosContratacao {
  valorEstimado: string;
  objeto: string;
  modalidade: string;
  tipoObjeto?: string;
}

interface ConfigModoSimplificado {
  valorLimite: number;
  tiposObjetoSimples: string[];
  modalidadesAceitas: string[];
}

const CONFIG_MODO_SIMPLIFICADO: ConfigModoSimplificado = {
  valorLimite: 100000,
  tiposObjetoSimples: [
    'Material de Consumo',
    'Serviço Comum', 
    'Equipamento',
    'Material Permanente',
    'Aquisição'
  ],
  modalidadesAceitas: ['Pregão', 'Concorrência', 'Convite']
};

export const verificarGatilhosModoSimplificado = (dados: DadosContratacao): boolean => {
  // Extrair valor numérico do string
  const valorNumerico = extrairValorNumerico(dados.valorEstimado);
  
  // Verificar valor limite
  const valorBaixo = valorNumerico > 0 && valorNumerico < CONFIG_MODO_SIMPLIFICADO.valorLimite;
  
  // Verificar se o objeto sugere simplicidade
  const objetoSimples = CONFIG_MODO_SIMPLIFICADO.tiposObjetoSimples.some(tipo => 
    dados.objeto.toLowerCase().includes(tipo.toLowerCase()) ||
    dados.tipoObjeto?.toLowerCase().includes(tipo.toLowerCase())
  );
  
  // Verificar modalidade aceita
  const modalidadeAceita = CONFIG_MODO_SIMPLIFICADO.modalidadesAceitas.includes(dados.modalidade);
  
  // Retorna true se pelo menos 2 dos 3 critérios forem atendidos
  const criteriosAtendidos = [valorBaixo, objetoSimples, modalidadeAceita].filter(Boolean).length;
  
  return criteriosAtendidos >= 2;
};

export const extrairValorNumerico = (valorString: string): number => {
  // Remove "R$", pontos, vírgulas e espaços, depois converte para número
  const valorLimpo = valorString
    .replace(/R\$\s?/g, '')
    .replace(/\./g, '')
    .replace(/,/g, '.');
  
  return parseFloat(valorLimpo) || 0;
};

export const getMotivoSugestaoModoSimplificado = (dados: DadosContratacao): string[] => {
  const motivos: string[] = [];
  const valorNumerico = extrairValorNumerico(dados.valorEstimado);
  
  if (valorNumerico < CONFIG_MODO_SIMPLIFICADO.valorLimite) {
    motivos.push(`Valor estimado abaixo de R$ ${CONFIG_MODO_SIMPLIFICADO.valorLimite.toLocaleString('pt-BR')}`);
  }
  
  const objetoSimples = CONFIG_MODO_SIMPLIFICADO.tiposObjetoSimples.some(tipo => 
    dados.objeto.toLowerCase().includes(tipo.toLowerCase())
  );
  
  if (objetoSimples) {
    motivos.push('Objeto classificado como bem ou serviço comum');
  }
  
  if (CONFIG_MODO_SIMPLIFICADO.modalidadesAceitas.includes(dados.modalidade)) {
    motivos.push(`Modalidade ${dados.modalidade} compatível com simplificação`);
  }
  
  return motivos;
};

export const getRecomendacoesModoSimplificado = (): string[] => {
  return [
    'Campos preenchidos automaticamente pela IA-LUX',
    'Validação automática de consistência com TR',
    'Cláusulas padrão baseadas em boas práticas',
    'Interface compacta focada no essencial',
    'Processo otimizado para menor tempo de elaboração'
  ];
};
