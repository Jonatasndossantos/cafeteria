import React from 'react';
import { Info } from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { useEditalData, EditalData } from '../hooks/useEditalData';
import { useContratacaoData } from '../hooks/useContratacaoData';
import SectionCard from './edital/SectionCard';
import PreambuleSection from './edital/PreambuleSection';
import ObjetoSection from './edital/ObjetoSection';
import CredenciamentoSection from './edital/CredenciamentoSection';
import ApresentacaoPropostaSection from './edital/ApresentacaoPropostaSection';
import ClassificacaoPropostasSection from './edital/ClassificacaoPropostasSection';
import FaseLancesSection from './edital/FaseLancesSection';
import JulgamentoSection from './edital/JulgamentoSection';
import HabilitacaoSection from './edital/HabilitacaoSection';
import RecursosSection from './edital/RecursosSection';
import AdjudicacaoHomologacaoSection from './edital/AdjudicacaoHomologacaoSection';
import GarantiasSection from './edital/GarantiasSection';
import ContratacaoSection from './edital/ContratacaoSection';
import SancoesSection from './edital/SancoesSection';
import DisposicoesGeraisSection from './edital/DisposicoesGeraisSection';
import LoadingIndicator from './edital/LoadingIndicator';
import { InfoAlert } from './edital/shared/AlertComponents';
import MunicipalToggle from './edital/shared/MunicipalToggle';

interface EditalTabProps {
  inheritedData: {
    objeto: string;
    termoReferencia: string;
    matrizRiscos: string;
    numeroEdital: string;
    modalidade: string;
    tipoJulgamento: string;
    modoDisputa: string;
    valorEstimado: string;
  };
}

const EditalTab: React.FC<EditalTabProps> = ({ inheritedData }) => {
  const { data, updateField: originalUpdateField, isUpdating } = useEditalData();
  const { data: contratacaoData } = useContratacaoData();
  
  const isDispensaEletronica = contratacaoData?.modalidadeExecucao === 'eletronica';

  // Função wrapper para manter compatibilidade com componentes filhos
  const updateField = (section: string, field: string, value: any) => {
    originalUpdateField(section as keyof EditalData, field, value);
  };

  return (
    <div className="space-y-6">
      {/* TÍTULO DINÂMICO */}
      {/* <div className="mb-6">
        <h3 className="text-xl font-bold text-blue-600">
          {isDispensaEletronica 
            ? "📄 Aviso de Contratação Direta Eletrônica" 
            : "📄 Aviso de Contratação Direta"}
        </h3>
      </div> */}

      {/* 1. Preâmbulo */}
      <PreambuleSection data={data} updateField={updateField} />
      
      {/* 2. Objeto */}
      <ObjetoSection data={data} updateField={updateField} />

      {/* SEÇÃO CONDICIONAL - VEDAÇÕES (só para dispensa eletrônica) */}
      {isDispensaEletronica && (
        <SectionCard number="2.1" title="Vedações de Participação" icon={Info}>
          <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
            <h4 className="text-lg font-semibold mb-4">
              🚫 Vedações de Participação
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <input type="checkbox" readOnly checked className="mt-1" />
                  <span className="text-sm text-gray-700">
                    Autor do anteprojeto, projeto básico ou executivo
                  </span>
                </div>
                
                <div className="flex items-start gap-2">
                  <input type="checkbox" readOnly checked className="mt-1" />
                  <span className="text-sm text-gray-700">
                    Empresa responsável pela elaboração do projeto
                  </span>
                </div>
                
                <div className="flex items-start gap-2">
                  <input type="checkbox" readOnly checked className="mt-1" />
                  <span className="text-sm text-gray-700">
                    Pessoa com sanções impeditivas
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <input type="checkbox" readOnly checked className="mt-1" />
                  <span className="text-sm text-gray-700">
                    Vínculos com dirigentes do órgão
                  </span>
                </div>
                
                <div className="flex items-start gap-2">
                  <input type="checkbox" readOnly checked className="mt-1" />
                  <span className="text-sm text-gray-700">
                    Empresas controladoras/controladas
                  </span>
                </div>
                
                <div className="flex items-start gap-2">
                  <input type="checkbox" readOnly checked className="mt-1" />
                  <span className="text-sm text-gray-700">
                    Condenações por trabalho infantil/escravo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>
      )}

      {/* SEÇÃO CONDICIONAL - DECLARAÇÕES OBRIGATÓRIAS (só para dispensa eletrônica) */}
      {isDispensaEletronica && (
        <SectionCard number="2.2" title="Declarações Obrigatórias" icon={Info}>
          <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
            <h4 className="text-lg font-semibold mb-4">
              ✅ Declarações Obrigatórias (Termo de Aceitação)
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <input type="checkbox" readOnly checked className="mt-1" />
                <span className="text-sm text-gray-700">
                  <strong>Inexistência de fatos impeditivos:</strong> Declara que inexistem fatos impeditivos 
                  para sua habilitação no certame.
                </span>
              </div>
              
              <div className="flex items-start gap-2">
                <input type="checkbox" readOnly checked className="mt-1" />
                <span className="text-sm text-gray-700">
                  <strong>Concordância com condições:</strong> Declara que está ciente e concorda com as 
                  condições contidas no Aviso de Contratação Direta.
                </span>
              </div>
              
              <div className="flex items-start gap-2">
                <input type="checkbox" readOnly checked className="mt-1" />
                <span className="text-sm text-gray-700">
                  <strong>Responsabilidade pelas transações:</strong> Declara que se responsabiliza pelas 
                  transações efetuadas no sistema.
                </span>
              </div>
              
              <div className="flex items-start gap-2">
                <input type="checkbox" readOnly checked className="mt-1" />
                <span className="text-sm text-gray-700">
                  <strong>Cumprimento de cotas PCD:</strong> Declara que cumpre as exigências de reserva 
                  de cargos para pessoa com deficiência (Art. 93 da Lei nº 8.213/91).
                </span>
              </div>
              
              <div className="flex items-start gap-2">
                <input type="checkbox" readOnly checked className="mt-1" />
                <span className="text-sm text-gray-700">
                  <strong>Não emprego de menores:</strong> Declara que não emprega menor de 18 anos em 
                  trabalho noturno, perigoso ou insalubre.
                </span>
              </div>
            </div>
          </div>
        </SectionCard>
      )}

      {/* 3. Acesso ao Edital */}
      <SectionCard number="3" title="Acesso ao Edital" icon={Info}>
        <div>
          <Label className="text-sm font-medium text-gray-700">Data, Hora e Local/Plataforma para Acesso</Label>
          <Textarea 
            value={data.acessoEdital.dataHoraLocal}
            onChange={(e) => updateField('acessoEdital', 'dataHoraLocal', e.target.value)}
            rows={2}
            className="mt-1"
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700">Link Direto para o PNCP ou Portal Oficial</Label>
          <input 
            value={data.acessoEdital.linkPNCP}
            onChange={(e) => updateField('acessoEdital', 'linkPNCP', e.target.value)}
            className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="https://www.gov.br/compras/pt-br/acesso-a-sistemas/comprasnet-siasg"
          />
          <InfoAlert>Link obrigatório para acesso ao PNCP conforme Art. 7º da Lei 14.133/21.</InfoAlert>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">Prazo para Pedidos de Esclarecimento</Label>
            <input 
              value={data.acessoEdital.prazoEsclarecimento}
              onChange={(e) => updateField('acessoEdital', 'prazoEsclarecimento', e.target.value)}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <InfoAlert>Prazo mínimo AGU/TCU aplicado.</InfoAlert>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700">Prazo para Impugnação</Label>
            <input 
              value={data.acessoEdital.prazoImpugnacao}
              onChange={(e) => updateField('acessoEdital', 'prazoImpugnacao', e.target.value)}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <InfoAlert>Prazo mínimo AGU/TCU aplicado.</InfoAlert>
          </div>
        </div>

        <div>
          <MunicipalToggle
            title="🏛️ Procedimentos Específicos para Acesso (Municipal)"
            value={data.acessoEdital.procedimentosEspecificos}
            onChange={(value) => updateField('acessoEdital', 'procedimentosEspecificos', value)}
            placeholder="Inserir procedimentos específicos conforme regulamentação local."
          />
        </div>
      </SectionCard>

      {/* 4. Condições de Participação */}
      <SectionCard number="4" title="Condições de Participação" icon={Info}>
        <div>
          <Label className="text-sm font-medium text-gray-700">Requisitos de Participação</Label>
          <Textarea 
            value={data.condicoesParticipacao.requisitosParticipacao}
            onChange={(e) => updateField('condicoesParticipacao', 'requisitosParticipacao', e.target.value)}
            rows={3}
            className="mt-1"
          />
          <InfoAlert>Cláusulas padrão AGU/TCU aplicadas.</InfoAlert>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700">Vedações à Participação</Label>
          <Textarea 
            value={data.condicoesParticipacao.vedacoesParticipacao}
            onChange={(e) => updateField('condicoesParticipacao', 'vedacoesParticipacao', e.target.value)}
            rows={3}
            className="mt-1"
          />
          <InfoAlert>Conforme Art. 38 da Lei 14.133/21.</InfoAlert>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700">Condições para Consórcios</Label>
          <Textarea 
            value={data.condicoesParticipacao.condicoesConsorcios}
            onChange={(e) => updateField('condicoesParticipacao', 'condicoesConsorcios', e.target.value)}
            rows={2}
            className="mt-1"
          />
          <InfoAlert>Padrão: não permitido (pode ser alterado conforme necessidade).</InfoAlert>
        </div>

        <div>
          <MunicipalToggle
            title="🏛️ Requisitos Adicionais de Participação (Municipal)"
            value={data.condicoesParticipacao.requisitosAdicionais}
            onChange={(value) => updateField('condicoesParticipacao', 'requisitosAdicionais', value)}
            placeholder="Inserir requisitos específicos da legislação local."
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700">Tratamento Diferenciado para ME/EPP (LC 123/06)</Label>
          <Textarea 
            value={data.condicoesParticipacao.tratamentoME_EPP}
            onChange={(e) => updateField('condicoesParticipacao', 'tratamentoME_EPP', e.target.value)}
            rows={3}
            className="mt-1"
            placeholder="Previsão de tratamento diferenciado para Microempresas e Empresas de Pequeno Porte conforme Lei Complementar nº 123/2006..."
          />
          <InfoAlert>Conforme Art. 47 da Lei Complementar nº 123/2006 - tratamento diferenciado para ME/EPP.</InfoAlert>
        </div>
      </SectionCard>

      {/* 5. Credenciamento */}
      <CredenciamentoSection data={data} updateField={updateField} />
      
      {/* 6. Apresentação da Proposta */}
      <ApresentacaoPropostaSection data={data} updateField={updateField} />
      
      {/* 7. Classificação das Propostas */}
      <ClassificacaoPropostasSection data={data} updateField={updateField} />
      
      {/* 8. Fase de Lances */}
      <FaseLancesSection data={data} updateField={updateField} />
      
      {/* 9. Julgamento */}
      <JulgamentoSection data={data} updateField={updateField} />
      
      {/* 10. Habilitação */}
      <HabilitacaoSection data={data} updateField={updateField} inheritedData={inheritedData} />
      
      {/* 11. Recursos */}
      <RecursosSection data={data} updateField={updateField} />
      
      {/* 12. Adjudicação e Homologação */}
      <AdjudicacaoHomologacaoSection data={data} updateField={updateField} />
      
      {/* 13. Garantias */}
      <GarantiasSection data={data} updateField={updateField} />
      
      {/* 14. Contratação */}
      <ContratacaoSection data={data} updateField={updateField} />
      
      {/* 15. Sanções */}
      <SancoesSection data={data} updateField={updateField} />
      
      {/* 16. Disposições Gerais */}
      <DisposicoesGeraisSection data={data} updateField={updateField} />

      {/* 17. Foro */}
      <SectionCard number="17" title="Foro" icon={Info}>
        <div>
          <Label className="text-sm font-medium text-gray-700">Definição do Foro Competente</Label>
          <Textarea 
            value={data.foro.foroCompetente}
            onChange={(e) => updateField('foro', 'foroCompetente', e.target.value)}
            rows={2}
            className="mt-1"
          />
          <InfoAlert>Cláusula padrão AGU/TCU aplicada.</InfoAlert>
        </div>

        <div>
          <MunicipalToggle
            title="🏛️ Definição Específica do Foro (Municipal)"
            value={data.foro.definicaoEspecifica}
            onChange={(value) => updateField('foro', 'definicaoEspecifica', value)}
            placeholder="Inserir definição específica conforme regulamentação municipal."
          />
        </div>
      </SectionCard>

      <LoadingIndicator isUpdating={isUpdating} />
    </div>
  );
};

export default EditalTab;
