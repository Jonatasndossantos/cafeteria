import React from 'react';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Badge } from '@/Components/ui/badge';
import InfoIcon from './InfoIcon';
import { FileText, Lightbulb } from 'lucide-react';
import { useETPData } from '@/hooks/useFormDataEsp2';
import { StandardCard } from './standard-card';

const ETPTab = () => {
  const {
    campo1,
    campo2,
    campo3,
    campo4,
    campo5,
    campo6,
    campo7,
    campo8,
    campo9,
    campo10,
    campo11,
    campo12,
    campo13,
    campo14,
    campo15,
    identificacao,
    pesquisaData,
    updateETPSubField,
    isLoading,
    isUpdating
  } = useETPData();

  if (isLoading) {
    return <div className="animate-pulse">Carregando dados...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Bloco de Identificação e Vinculação */}
      <StandardCard 
        title="1. Identificação e fundamentação"
        icon={FileText}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Número do ETP</label>
            <Input 
              value={identificacao.numeroETP}
              disabled
              className="bg-gray-100 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vinculado ao DFD</label>
            <Input 
              value={identificacao.numeroDFD}
              disabled
              className="bg-gray-100 text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Objeto da Contratação</label>
            <Input 
              value={identificacao.objeto}
              disabled
              className="bg-gray-100 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fundamentação legal</label>
            <Input 
              value={identificacao.fundamentacaoLegal}
              onChange={(e) => updateETPSubField('identificacao', 'fundamentacaoLegal', e.target.value)}
              className="focus:ring-lumen-blue focus:border-lumen-blue text-sm"
              disabled={isUpdating}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Responsáveis pela elaboração</label>
            <Input 
              value={identificacao.responsavelElaboracao}
              onChange={(e) => updateETPSubField('identificacao', 'responsavelElaboracao', e.target.value)}
              className="focus:ring-lumen-blue focus:border-lumen-blue text-sm"
              disabled={isUpdating}
            />
          </div>
        </div>
      </StandardCard>

      {/* Campo 1: Descrição da Necessidade */}
      <StandardCard 
        title="2. Descrição da necessidade da contratação"
        icon={FileText}
      >
        {campo1.sugestaoLux && (
          <div className="mb-4 flex items-center text-blue-600">
            <Lightbulb className="w-4 h-4 mr-1" />
            <span className="text-xs font-normal">Sugerido pela LUX</span>
          </div>
        )}
        
        <Textarea 
          rows={5}
          value={campo1.descricaoNecessidade}
          onChange={(e) => updateETPSubField('campo1', 'descricaoNecessidade', e.target.value)}
          className="focus:ring-lumen-blue focus:border-lumen-blue text-sm"
          disabled={isUpdating}
        />
        <InfoIcon text="Conforme Art. 18, § 1º, I da Lei 14.133/21. Descrição preenchida automaticamente pela LUX com base no contexto da contratação." />
      </StandardCard>

      {/* Campo 3: Objetivos e Resultados */}
      <StandardCard 
        title="3. Objetivos e resultados pretendidos"
        icon={FileText}
      >
        {campo3.sugestaoLux && (
          <div className="mb-4 flex items-center text-blue-600">
            <Lightbulb className="w-4 h-4 mr-1" />
            <span className="text-xs font-normal">Sugerido pela LUX</span>
          </div>
        )}
        
        <Textarea 
          rows={5}
          value={campo3.objetivosResultados}
          onChange={(e) => updateETPSubField('campo3', 'objetivosResultados', e.target.value)}
          className="focus:ring-lumen-blue focus:border-lumen-blue text-sm"
          disabled={isUpdating}
        />
        <InfoIcon text="Descreva os objetivos e resultados esperados com a contratação, incluindo indicadores de sucesso e benefícios esperados." />
      </StandardCard>

      {/* Campo 4: Levantamento de Mercado */}
      <StandardCard 
        title="4. Levantamento de Mercado e Alternativas de Solução"
        icon={FileText}
      >
        {campo4.sugestaoLux && (
          <div className="mb-4 flex items-center text-blue-600">
            <Lightbulb className="w-4 h-4 mr-1" />
            <span className="text-xs font-normal">Sugerido pela LUX</span>
          </div>
        )}
        
        <Textarea 
          rows={5}
          value={campo4.levantamentoMercado}
          onChange={(e) => updateETPSubField('campo4', 'levantamentoMercado', e.target.value)}
          className="focus:ring-lumen-blue focus:border-lumen-blue text-sm"
          disabled={isUpdating}
        />
        <InfoIcon text="Descreva o levantamento de mercado realizado, incluindo as alternativas de solução identificadas, análise comparativa e justificativa para a solução escolhida." />
      </StandardCard>

      {/* Campo 5: Descrição da Solução */}
      <StandardCard 
        title="5. Descrição da Solução Recomendada"
        icon={FileText}
      >
        {campo5.sugestaoLux && (
          <div className="mb-4 flex items-center text-blue-600">
            <Lightbulb className="w-4 h-4 mr-1" />
            <span className="text-xs font-normal">Sugerido pela LUX</span>
          </div>
        )}
        
        <Textarea 
          rows={5}
          value={campo5.descricaoSolucao}
          onChange={(e) => updateETPSubField('campo5', 'descricaoSolucao', e.target.value)}
          className="focus:ring-lumen-blue focus:border-lumen-blue text-sm"
          disabled={isUpdating}
        />
        <InfoIcon text="Descreva a solução recomendada, incluindo especificações técnicas, características principais, requisitos de implementação e benefícios esperados." />
      </StandardCard>

      {/* Campo 6: Justificativa Parcelamento */}
      <StandardCard 
        title="6. Justificativa para Parcelamento ou Não da Contratação"
        icon={FileText}
      >
        {campo6.sugestaoLux && (
          <div className="mb-4 flex items-center text-blue-600">
            <Lightbulb className="w-4 h-4 mr-1" />
            <span className="text-xs font-normal">Sugerido pela LUX</span>
          </div>
        )}
        
        <Textarea 
          rows={5}
          value={campo6.justificativaParcelamento}
          onChange={(e) => updateETPSubField('campo6', 'justificativaParcelamento', e.target.value)}
          className="focus:ring-lumen-blue focus:border-lumen-blue text-sm"
          disabled={isUpdating}
        />
        <InfoIcon text="Justifique a decisão de parcelar ou não a contratação, considerando aspectos técnicos, operacionais, financeiros e de gestão." />
      </StandardCard>

      {/* Campo 7: Estimativa de Quantidades */}
      <StandardCard 
        title="7. Estimativa de Quantidades"
        icon={FileText}
      >
        {campo7.sugestaoLux && (
          <div className="mb-4 flex items-center text-blue-600">
            <Lightbulb className="w-4 h-4 mr-1" />
            <span className="text-xs font-normal">Sugerido pela LUX</span>
          </div>
        )}
        
        <Textarea 
          rows={5}
          value={campo7.estimativaQuantidades}
          onChange={(e) => updateETPSubField('campo7', 'estimativaQuantidades', e.target.value)}
          className="focus:ring-lumen-blue focus:border-lumen-blue text-sm"
          disabled={isUpdating}
        />
        <InfoIcon text="Descreva a metodologia utilizada para estimar as quantidades necessárias, incluindo critérios técnicos, operacionais e de gestão considerados." />
      </StandardCard>

      {/* Campo 8: Estimativa de Preços */}
      <StandardCard 
        title="8. Estimativa de Preços"
        icon={FileText}
      >
        {campo8.sugestaoLux && (
          <div className="mb-4 flex items-center text-blue-600">
            <Lightbulb className="w-4 h-4 mr-1" />
            <span className="text-xs font-normal">Sugerido pela LUX</span>
          </div>
        )}
        
        <Textarea 
          rows={5}
          value={campo8.estimativaPrecos}
          onChange={(e) => updateETPSubField('campo8', 'estimativaPrecos', e.target.value)}
          className="focus:ring-lumen-blue focus:border-lumen-blue text-sm"
          disabled={isUpdating}
        />
        <InfoIcon text="Descreva a metodologia utilizada para estimar os preços, incluindo fontes de pesquisa, critérios de análise e justificativa dos valores estimados." />
      </StandardCard>

      {/* Campo 9: Análise Custo-Benefício */}
      <StandardCard 
        title="9. Análise Custo-Benefício"
        icon={FileText}
      >
        {campo9.sugestaoLux && (
          <div className="mb-4 flex items-center text-blue-600">
            <Lightbulb className="w-4 h-4 mr-1" />
            <span className="text-xs font-normal">Sugerido pela LUX</span>
          </div>
        )}
        
        <Textarea 
          rows={5}
          value={campo9.analiseCustoBeneficio}
          onChange={(e) => updateETPSubField('campo9', 'analiseCustoBeneficio', e.target.value)}
          className="focus:ring-lumen-blue focus:border-lumen-blue text-sm"
          disabled={isUpdating}
        />
        <InfoIcon text="Descreva a análise de custo-benefício da contratação, incluindo benefícios esperados, custos diretos e indiretos, e indicadores de retorno." />
      </StandardCard>

      {/* Campo 10: Análise de Riscos */}
      <StandardCard 
        title="10. Análise de Riscos"
        icon={FileText}
      >
        {campo10.sugestaoLux && (
          <div className="mb-4 flex items-center text-blue-600">
            <Lightbulb className="w-4 h-4 mr-1" />
            <span className="text-xs font-normal">Sugerido pela LUX</span>
          </div>
        )}
        
        <Textarea 
          rows={5}
          value={campo10.analiseRiscos}
          onChange={(e) => updateETPSubField('campo10', 'analiseRiscos', e.target.value)}
          className="focus:ring-lumen-blue focus:border-lumen-blue text-sm"
          disabled={isUpdating}
        />
        <InfoIcon text="Descreva a análise de riscos da contratação, incluindo riscos técnicos, operacionais, financeiros e de gestão, bem como as medidas mitigadoras." />
      </StandardCard>

      {/* Campo 11: Providências Prévias */}
      <StandardCard 
        title="11. Providências Prévias à Contratação"
        icon={FileText}
      >
        {campo11.sugestaoLux && (
          <div className="mb-4 flex items-center text-blue-600">
            <Lightbulb className="w-4 h-4 mr-1" />
            <span className="text-xs font-normal">Sugerido pela LUX</span>
          </div>
        )}
        
        <Textarea 
          rows={5}
          value={campo11.providenciasPrevias}
          onChange={(e) => updateETPSubField('campo11', 'providenciasPrevias', e.target.value)}
          className="focus:ring-lumen-blue focus:border-lumen-blue text-sm"
          disabled={isUpdating}
        />
        <InfoIcon text="Descreva as providências necessárias antes da contratação, incluindo preparação da infraestrutura, capacitação de equipe, e outras medidas preparatórias." />
      </StandardCard>

      {/* Campo 12: Contratações Correlatas */}
      <StandardCard 
        title="12. Contratações Correlatas ou Interdependentes"
        icon={FileText}
      >
        {campo12.sugestaoLux && (
          <div className="mb-4 flex items-center text-blue-600">
            <Lightbulb className="w-4 h-4 mr-1" />
            <span className="text-xs font-normal">Sugerido pela LUX</span>
          </div>
        )}
        
        <Textarea 
          rows={5}
          value={campo12.contratacoesCorrelatas || ''}
          onChange={(e) => updateETPSubField('campo12', 'contratacoesCorrelatas', e.target.value)}
          className="focus:ring-lumen-blue focus:border-lumen-blue text-sm"
          disabled={isUpdating}
        />
        <InfoIcon text="Descreva as contratações correlatas ou interdependentes necessárias para o sucesso do projeto, incluindo dependências e impactos." />
      </StandardCard>

      {/* Campo 13: Impactos Ambientais */}
      <StandardCard 
        title="13. Impactos Ambientais"
        icon={FileText}
      >
        {campo13.sugestaoLux && (
          <div className="mb-4 flex items-center text-blue-600">
            <Lightbulb className="w-4 h-4 mr-1" />
            <span className="text-xs font-normal">Sugerido pela LUX</span>
          </div>
        )}
        
        <Textarea 
          rows={5}
          value={campo13.impactosAmbientais || ''}
          onChange={(e) => updateETPSubField('campo13', 'impactosAmbientais', e.target.value)}
          className="focus:ring-lumen-blue focus:border-lumen-blue text-sm"
          disabled={isUpdating}
        />
        <InfoIcon text="Descreva os impactos ambientais da contratação, incluindo geração de resíduos, consumo de energia, medidas mitigadoras e benefícios ambientais." />
      </StandardCard>

      {/* Campo 14: Declaração de Viabilidade */}
      <StandardCard 
        title="14. Declaração de Viabilidade"
        icon={FileText}
      >
        {campo14?.sugestaoLux && (
          <div className="mb-4 flex items-center text-blue-600">
            <Lightbulb className="w-4 h-4 mr-1" />
            <span className="text-xs font-normal">Sugerido pela LUX</span>
          </div>
        )}
        
        <Textarea 
          rows={5}
          value={campo14?.declaracaoViabilidade || ''}
          onChange={(e) => updateETPSubField('campo14', 'declaracaoViabilidade', e.target.value)}
          className="focus:ring-lumen-blue focus:border-lumen-blue text-sm"
          disabled={isUpdating}
        />
        <InfoIcon text="Declare a viabilidade da contratação, considerando aspectos técnicos, econômicos, jurídicos e operacionais." />
      </StandardCard>

      {/* Campo 15: Responsabilidade */}
      <StandardCard 
        title="15. Responsabilidade"
        icon={FileText}
      >
        {campo15?.sugestaoLux && (
          <div className="mb-4 flex items-center text-blue-600">
            <Lightbulb className="w-4 h-4 mr-1" />
            <span className="text-xs font-normal">Sugerido pela LUX</span>
          </div>
        )}
        
        <Textarea 
          rows={5}
          value={campo15?.responsabilidade || ''}
          onChange={(e) => updateETPSubField('campo15', 'responsabilidade', e.target.value)}
          className="focus:ring-lumen-blue focus:border-lumen-blue text-sm"
          disabled={isUpdating}
        />
        <InfoIcon text="Declare as responsabilidades técnicas, administrativas, legais e operacionais da contratação, incluindo os responsáveis e seus compromissos." />
      </StandardCard>
    </div>
  );
};

export default ETPTab;
