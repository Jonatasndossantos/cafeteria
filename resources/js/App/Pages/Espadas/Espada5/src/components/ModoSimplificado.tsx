import React, { useState, useEffect } from 'react';
import { Wand2, CheckCircle, AlertTriangle, Eye } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Accordion } from '@/Components/ui/accordion';
import { StandardCard } from '@/Components/ui/standard-card';
import { textosAguTcu, orientacoesMunicipais } from '../data/editalSimplificadoData';

// Import section components
import DadosBasicosSection from './edital/simplificado/DadosBasicosSection';
import FundamentacaoSection from './edital/simplificado/FundamentacaoSection';
import ParticipacaoSection from './edital/simplificado/ParticipacaoSection';
import PropostasJulgamentoSection from './edital/simplificado/PropostasJulgamentoSection';
import HabilitacaoGarantiasSection from './edital/simplificado/HabilitacaoGarantiasSection';
import ExecucaoContratualSection from './edital/simplificado/ExecucaoContratualSection';
import DisposicoesFinaisSection from './edital/simplificado/DisposicoesFinaisSection';

interface ModoSimplificadoProps {
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
  onVoltarModoCompleto: () => void;
}

const ModoSimplificado: React.FC<ModoSimplificadoProps> = ({ inheritedData, onVoltarModoCompleto }) => {
  const [formData, setFormData] = useState({
    // Dados Básicos (Seção 1)
    objeto: '',
    justificativa: '',
    fundamentacaoLegal: '',
    outrasInformacoes: '',
    
    // Participação e Credenciamento (Seção 3)
    condicoesParticipacao: '',
    documentacaoNecessaria: '',
    regulamentacaoParticipacao: '',
    
    // Propostas e Julgamento (Seção 4)
    apresentacaoPropostas: '',
    classificacaoPropostas: '',
    faseLances: '',
    regulamentacaoPropostas: '',
    
    // Habilitação e Garantias (Seção 5)
    habilitacao: '',
    garantias: '',
    regulamentacaoHabilitacao: '',
    
    // Execução Contratual (Seção 6)
    prazoVigencia: '12 meses',
    prazoEntrega: '30 dias',
    condicoesPagamento: '',
    penalidades: '',
    recursos: '',
    regulamentacaoExecucao: '',
    
    // Disposições Finais (Seção 7)
    adjudicacaoHomologacao: '',
    sancoes: '',
    disposicoesGerais: '',
    foro: '',
    regulamentacaoFinais: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // Função para gerar textos AGU/TCU automaticamente
  const gerarTextosAguTcu = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      const modalidade = inheritedData.modalidade.toLowerCase();
      let fundamentacao = textosAguTcu.fundamentacaoLegal.pregao;
      
      if (modalidade.includes('concorrência')) {
        fundamentacao = textosAguTcu.fundamentacaoLegal.concorrencia;
      } else if (modalidade.includes('convite')) {
        fundamentacao = textosAguTcu.fundamentacaoLegal.convite;
      }

      const textosGerados = {
        objeto: inheritedData.objeto,
        justificativa: `A presente contratação justifica-se pela necessidade de ${inheritedData.objeto.toLowerCase()}, conforme especificado no Termo de Referência ${inheritedData.termoReferencia}, visando atender às demandas operacionais da Administração Pública de forma eficiente e econômica.`,
        fundamentacaoLegal: fundamentacao,
        outrasInformacoes: `Processo Administrativo vinculado ao TR ${inheritedData.termoReferencia} e Matriz de Riscos ${inheritedData.matrizRiscos}.`,
        
        condicoesParticipacao: textosAguTcu.condicoesParticipacao,
        documentacaoNecessaria: textosAguTcu.documentacaoNecessaria,
        regulamentacaoParticipacao: orientacoesMunicipais.texto,
        
        apresentacaoPropostas: textosAguTcu.apresentacaoPropostas,
        classificacaoPropostas: textosAguTcu.classificacaoPropostas,
        faseLances: inheritedData.modoDisputa === 'Aberto' ? 'Aplicável conforme modalidade, com intervalos mínimos e regras de prorrogação automática conforme sistema eletrônico.' : 'Não aplicável para esta modalidade.',
        regulamentacaoPropostas: orientacoesMunicipais.texto,
        
        habilitacao: textosAguTcu.documentacaoNecessaria,
        garantias: textosAguTcu.garantias,
        regulamentacaoHabilitacao: orientacoesMunicipais.texto,
        
        prazoVigencia: '12 meses',
        prazoEntrega: '30 dias',
        condicoesPagamento: textosAguTcu.condicoesPagamento,
        penalidades: textosAguTcu.penalidades,
        recursos: textosAguTcu.recursos,
        regulamentacaoExecucao: orientacoesMunicipais.texto,
        
        adjudicacaoHomologacao: textosAguTcu.adjudicacaoHomologacao,
        sancoes: textosAguTcu.sancoes,
        disposicoesGerais: textosAguTcu.disposicoesGerais,
        foro: textosAguTcu.foro,
        regulamentacaoFinais: orientacoesMunicipais.texto
      };

      setFormData(textosGerados);
      setIsProcessing(false);
    }, 1500);
  };

  // Gerar textos automaticamente quando o componente carrega
  useEffect(() => {
    gerarTextosAguTcu();
  }, [inheritedData]);

  return (
    <div className="space-y-6">
      {/* Banner Modo Simplificado */}
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <div className="flex justify-between items-center">
            <div>
              <strong>Edital Simplificado AGU/TCU</strong> - Todas as cláusulas obrigatórias da Lei 14.133/2021 pré-preenchidas. 
              Ideal para bens e serviços comuns de baixa complexidade.
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="border-green-300 text-green-700 hover:bg-green-100"
              onClick={onVoltarModoCompleto}
            >
              <Eye className="w-4 h-4 mr-1" />
              Modo Completo
            </Button>
          </div>
        </AlertDescription>
      </Alert>

      {/* Alerta de Complexidade */}
      <Alert className="border-amber-200 bg-amber-50">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          <strong>Atenção:</strong> Este modo é recomendado para contratações de baixa complexidade e risco. 
          Para casos mais complexos, utilize o Modo Completo para maior customização.
        </AlertDescription>
      </Alert>

      {/* Processamento IA-LUX */}
      {isProcessing && (
        <StandardCard 
          title="Processamento IA-LUX"
          icon={Wand2}
          className="shadow-md bg-blue-50 border-blue-200"
        >
          <div className="flex items-center justify-center">
            <Wand2 className="w-5 h-5 mr-2 text-blue-600 animate-spin" />
            <span className="text-blue-800 font-medium">IA-LUX aplicando padrões AGU/TCU...</span>
          </div>
        </StandardCard>
      )}

      {/* Seções do Edital Simplificado */}
      <Accordion type="multiple" defaultValue={["secao1", "secao2"]} className="space-y-4">
        <DadosBasicosSection 
          formData={formData} 
          inheritedData={inheritedData} 
          setFormData={setFormData} 
        />
        <FundamentacaoSection 
          formData={formData} 
          setFormData={setFormData} 
        />
        <ParticipacaoSection 
          formData={formData} 
          setFormData={setFormData} 
        />
        <PropostasJulgamentoSection 
          formData={formData} 
          inheritedData={inheritedData} 
          setFormData={setFormData} 
        />
        <HabilitacaoGarantiasSection 
          formData={formData} 
          setFormData={setFormData} 
        />
        <ExecucaoContratualSection 
          formData={formData} 
          setFormData={setFormData} 
        />
        <DisposicoesFinaisSection 
          formData={formData} 
          setFormData={setFormData} 
        />
      </Accordion>

    </div>
  );
};

export default ModoSimplificado;
