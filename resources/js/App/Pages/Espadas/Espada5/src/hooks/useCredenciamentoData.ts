import { useFormData } from './useFormData';

export const useCredenciamentoData = () => {
  const { data, updateField, updateFields, isLoading } = useFormData();

  const setUtilizarCredenciamento = (value: string) => updateField('utilizarCredenciamento', value);

  const updateCredenciamentoRules = (rules: {
    regulamentoCredenciamento?: string;
    criteriosHabilitacao?: string;
    formaConvocacao?: string;
    prazoValidadeCredenciamento?: string;
    prazoManifestacao?: string;
    condicoesRenovacao?: string;
    criteriosDescredenciamento?: string;
    garantiasExigidas?: string;
    criteriosRemuneracao?: string;
    regrasDistribuicao?: string;
    sancoespenalidades?: string;
  }) => updateFields(rules);

  const updateGestaoData = (gestaoData: {
    responsavelGestao?: string;
    procedimentosAtualizacao?: string;
    controleMonitoramento?: string;
  }) => updateFields(gestaoData);

  return {
    // Dados existentes
    utilizarCredenciamento: data.utilizarCredenciamento,
    regulamentoCredenciamento: data.regulamentoCredenciamento,
    criteriosHabilitacao: data.criteriosHabilitacao,
    formaConvocacao: data.formaConvocacao,
    prazoValidadeCredenciamento: data.prazoValidadeCredenciamento,
    condicoesRenovacao: data.condicoesRenovacao,
    criteriosDescredenciamento: data.criteriosDescredenciamento,
    garantiasExigidas: data.garantiasExigidas,
    responsavelGestao: data.responsavelGestao,
    procedimentosAtualizacao: data.procedimentosAtualizacao,
    controleMonitoramento: data.controleMonitoramento,
    
    // Novos campos com fallbacks para evitar erros
    prazoManifestacao: data.prazoManifestacao || '8',
    criteriosRemuneracao: data.criteriosRemuneracao || '',
    regrasDistribuicao: data.regrasDistribuicao || '',
    sancoespenalidades: data.sancoespenalidades || '',
    
    // Funções
    setUtilizarCredenciamento,
    updateCredenciamentoRules,
    updateGestaoData,
    isLoading
  };
};
