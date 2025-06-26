import React from 'react';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import InfoIcon from '@/Components/espadaComponente2/InfoIcon';
import { Route, Calendar, FileCheck, Lightbulb } from 'lucide-react';
import { useRotaData } from '../../hooks/useFormDataEsp2';
import { StandardCard } from './standard-card';

const RotaTab = () => {
  const {
    rotaSelecionada,
    sugestaoLux,
    pregao,
    regimeExecucao,
    viabilidade,
    cronograma,
    updateRotaField,
    isLoading,
    isUpdating
  } = useRotaData();

  if (isLoading) {
    return <div className="animate-pulse">Carregando dados...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Bloco de Análise da Rota */}
      <StandardCard 
        title="Análise da Rota de Contratação"
        icon={Route}
      >
        {/* Sugestão da LUX */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <Lightbulb className="w-5 h-5 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-900 mb-2">Sugestão do Sistema LUX:</p>
              <p className="text-sm text-blue-800">
                Com base no valor estimado (R$ 49.000,00) e na natureza do objeto (aquisição de bens comuns), 
                recomenda-se <strong>Pregão Eletrônico</strong> como modalidade de licitação.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Rota de Contratação *</label>
          <Select 
            value={rotaSelecionada} 
            onValueChange={(value) => updateRotaField('rotaSelecionada', value)}
            disabled={isUpdating}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione a rota de contratação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pregao">Pregão (Sugerido pela LUX)</SelectItem>
              <SelectItem value="licitacao">Outras Modalidades de Licitação</SelectItem>
              <SelectItem value="direta">Contratação Direta</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Campos condicionais - Pregão */}
        {rotaSelecionada === 'pregao' && (
          <div className="border-t pt-6 mt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Detalhes do Pregão</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Pregão *</label>
                <Select 
                  value={pregao.tipo}
                  onValueChange={(value) => updateRotaField('pregao', { ...pregao, tipo: value })}
                  disabled={isUpdating}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Eletrônico (Sugerido)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eletronico">Pregão Eletrônico</SelectItem>
                    <SelectItem value="presencial">Pregão Presencial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo (Art. 33) *</label>
                <Select 
                  value={pregao.criterio}
                  onValueChange={(value) => updateRotaField('pregao', { ...pregao, criterio: value })}
                  disabled={isUpdating}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Menor Preço (Sugerido)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="menor_preco">Menor Preço</SelectItem>
                    <SelectItem value="melhor_tecnica">Melhor Técnica</SelectItem>
                    <SelectItem value="tecnica_preco">Técnica e Preço</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Modo de Disputa (Art. 56) *</label>
                <Select 
                  value={pregao.modoDisputa}
                  onValueChange={(value) => updateRotaField('pregao', { ...pregao, modoDisputa: value })}
                  disabled={isUpdating}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Aberto (Sugerido)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aberto">Aberto</SelectItem>
                    <SelectItem value="fechado">Fechado</SelectItem>
                    <SelectItem value="combinado">Combinado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <InfoIcon text="Pregão conforme art. 28, inciso I da Lei 14.133/21. Modalidade recomendada para bens e serviços comuns." />
          </div>
        )}
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Justificativa da Escolha da Rota (Sugerida pela LUX)</label>
          <Textarea 
            rows={4}
            value={sugestaoLux.justificativa}
            onChange={(e) => updateRotaField('sugestaoLux', { ...sugestaoLux, justificativa: e.target.value })}
            className="focus:ring-lumen-blue focus:border-lumen-blue text-sm"
            disabled={isUpdating}
          />
          <InfoIcon text="Justificativa gerada automaticamente pela LUX com base nas características da contratação." />
        </div>
      </StandardCard>

      {/* Bloco de Regime de Execução e SRP */}
      <StandardCard 
        title="Regime de Execução e SRP"
        icon={Calendar}
      >
        {/* Sugestão da LUX */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <Lightbulb className="w-5 h-5 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-900 mb-2">Sugestão do Sistema LUX:</p>
              <p className="text-sm text-blue-800">
                Para aquisição de bens, recomenda-se <strong>Fornecimento</strong> como regime de execução.
                <br />
                Não é recomendado o uso de SRP para esta contratação específica.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Regime de Execução (Art. 46) *</label>
            <Select 
              value={regimeExecucao.regime}
              onValueChange={(value) => updateRotaField('regimeExecucao', { ...regimeExecucao, regime: value })}
              disabled={isUpdating}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o regime de execução" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fornecimento">Fornecimento (Sugerido)</SelectItem>
                <SelectItem value="empreitada_preco_unitario">Empreitada por Preço Unitário</SelectItem>
                <SelectItem value="empreitada_preco_global">Empreitada por Preço Global</SelectItem>
                <SelectItem value="empreitada_integral">Empreitada Integral</SelectItem>
                <SelectItem value="tarefa">Tarefa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Utilizar Sistema de Registro de Preços (SRP)?</label>
            <div className="flex space-x-4 mt-2">
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  className="form-radio text-lumen-blue" 
                  name="srp" 
                  value="true"
                  checked={regimeExecucao.utilizarSRP === true}
                  onChange={() => updateRotaField('regimeExecucao', { ...regimeExecucao, utilizarSRP: true })}
                  disabled={isUpdating}
                />
                <span className="ml-2 text-sm text-gray-700">Sim</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  className="form-radio text-lumen-blue" 
                  name="srp" 
                  value="false"
                  checked={regimeExecucao.utilizarSRP === false}
                  onChange={() => updateRotaField('regimeExecucao', { ...regimeExecucao, utilizarSRP: false })}
                  disabled={isUpdating}
                />
                <span className="ml-2 text-sm text-gray-700">Não</span>
              </label>
            </div>
          </div>
        </div>
        
        {regimeExecucao.utilizarSRP && (
          <div className="mt-6 border-t pt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Detalhes do SRP</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de SRP *</label>
                <Select 
                  value={regimeExecucao.tipoSRP}
                  onValueChange={(value) => updateRotaField('regimeExecucao', { ...regimeExecucao, tipoSRP: value })}
                  disabled={isUpdating}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de SRP" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comum">SRP Comum</SelectItem>
                    <SelectItem value="especial">SRP Especial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vigência (meses) *</label>
                <Input 
                  type="number"
                  min="1"
                  max="12"
                  value={regimeExecucao.vigenciaSRP}
                  onChange={(e) => updateRotaField('regimeExecucao', { ...regimeExecucao, vigenciaSRP: parseInt(e.target.value) })}
                  className="focus:ring-lumen-blue focus:border-lumen-blue text-sm"
                  disabled={isUpdating}
                />
              </div>
            </div>
            <InfoIcon text="SRP conforme art. 15 da Lei 14.133/21. Permite a contratação de bens e serviços comuns por preços registrados." />
          </div>
        )}
      </StandardCard>

      {/* Bloco de Viabilidade e Cronograma */}
      <StandardCard 
        title="Viabilidade e Cronograma"
        icon={FileCheck}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Viabilidade Técnica *</label>
            <Select 
              value={viabilidade.tecnica}
              onValueChange={(value) => updateRotaField('viabilidade', { ...viabilidade, tecnica: value })}
              disabled={isUpdating}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a viabilidade técnica" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="viavel">Viável</SelectItem>
                <SelectItem value="inviavel">Inviável</SelectItem>
                <SelectItem value="parcial">Parcialmente Viável</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Viabilidade Econômica *</label>
            <Select 
              value={viabilidade.economica}
              onValueChange={(value) => updateRotaField('viabilidade', { ...viabilidade, economica: value })}
              disabled={isUpdating}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a viabilidade econômica" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="viavel">Viável</SelectItem>
                <SelectItem value="inviavel">Inviável</SelectItem>
                <SelectItem value="parcial">Parcialmente Viável</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Cronograma de Execução *</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data de Início</label>
              <Input 
                type="date"
                value={cronograma.dataInicio}
                onChange={(e) => updateRotaField('cronograma', { ...cronograma, dataInicio: e.target.value })}
                className="focus:ring-lumen-blue focus:border-lumen-blue text-sm"
                disabled={isUpdating}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data de Término</label>
              <Input 
                type="date"
                value={cronograma.dataTermino}
                onChange={(e) => updateRotaField('cronograma', { ...cronograma, dataTermino: e.target.value })}
                className="focus:ring-lumen-blue focus:border-lumen-blue text-sm"
                disabled={isUpdating}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prazo de Execução (dias)</label>
              <Input 
                type="number"
                min="1"
                value={cronograma.prazoExecucao}
                onChange={(e) => updateRotaField('cronograma', { ...cronograma, prazoExecucao: parseInt(e.target.value) })}
                className="focus:ring-lumen-blue focus:border-lumen-blue text-sm"
                disabled={isUpdating}
              />
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Observações</label>
          <Textarea 
            rows={4}
            value={cronograma.observacoes}
            onChange={(e) => updateRotaField('cronograma', { ...cronograma, observacoes: e.target.value })}
            className="focus:ring-lumen-blue focus:border-lumen-blue text-sm"
            disabled={isUpdating}
          />
        </div>
      </StandardCard>
    </div>
  );
};

export default RotaTab;
