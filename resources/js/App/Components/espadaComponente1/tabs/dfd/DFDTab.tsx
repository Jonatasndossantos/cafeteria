import { IdentificacaoDFDBloco } from "./IdentificacaoDFDBloco";
import { ObjetoJustificativaBloco } from "./ObjetoJustificativaBloco";
import { QuantitativosBloco } from "./QuantitativosBloco";
import { RequisitosPrazosBloco } from "./RequisitosPrazosBloco";
import { DemandasCorrelatasBloco } from "./DemandasCorrelatasBloco";
import { VinculacaoResponsavelBloco } from "./VinculacaoResponsavelBloco";
import { AnexosClassificacaoBloco } from "./AnexosClassificacaoBloco";
import { EncaminhamentoBloco } from "./EncaminhamentoBloco";
import { ActionButtons } from "@/Components/common/ActionButtons";
import { AnaliseDFDSimplificadoComponent } from "./AnaliseDFDSimplificadoComponent";
import { DFDSimplificado } from "./DFDSimplificado";
import { PlanejamentoBloco } from "./PlanejamentoBloco";
import { useState } from "react";
import { Info, Calendar } from "lucide-react";
import { useFormData, FormData } from "@/hooks/useFormData";
import { StandardCard } from "@/Components/ui/standard-card";
import { SugestoesIAComponent } from "./SugestoesIAComponent";
import { useEspada1 } from "@hooks/Espada1/useEspada1";
import { Identificacao } from "@/Components/common/Identificação";

interface DFDTabProps {
  setActiveTab: (tab: string) => void;
}

export function DFDTab({ setActiveTab }: DFDTabProps) {
  const { formData = {} as FormData } = useFormData();
  const { tipo, updateTipo, espada1Data, isLoading: isLoadingEspada1 } = useEspada1();

  // Ensure formData has required properties
  const safeFormData: FormData = {
    ...formData,
    itens: formData?.itens || [],
    objeto: formData?.objeto || {
      objetoContratacao: '',
      tipoObjeto: '',
      subcategoriaTecnica: '',
      codigoCatmat: ''
    },
    detalhamento: formData?.detalhamento || {
      justificativaTecnica: '',
      beneficiosEsperados: '',
      riscosIdentificados: '',
      alternativasAnalisadas: '',
      mesEstimado: '',
      grauImportancia: '',
      historicoConsumo: '',
      criteriosSustentabilidade: false,
      detalheSustentabilidade: '',
      normasTecnicas: ''
    },
    compartilhamento: formData?.compartilhamento || {
      podeCompartilhar: false,
      outrasUnidades: [],
      justificativaCompartilhamento: ''
    },
    vinculacoes: formData?.vinculacoes || {
      ppa: '',
      ldo: '',
      loa: ''
    },
    pca: formData?.pca || {
      items: [],
      selectedItems: []
    },
    duplicidade: formData?.duplicidade || {
      demandasSimilares: [],
      analiseCompleta: false
    },
    demandasCorrelatas: formData?.demandasCorrelatas || {
      vinculacaoOutrasDemandas: false,
      justificativaVinculacao: '',
      impactosEsperados: '',
      riscosPreliminares: ''
    },
    dfd: formData?.dfd || {
      orgaoRequisitante: '',
      numero: '',
      dataCriacao: '',
      justificativa: '',
      fontePesquisa: '',
      pcaItemId: '',
      responsavelAprovacao: '',
      cargoResponsavel: '',
      matriculaResponsavel: '',
      justificativaPca: '',
      requisitosTecnicos: '',
      dataPretendida: '',
      grauPrioridade: '',
      justificativaPrioridade: '',
      vinculacaoOutrasDemandas: false,
      descricaoVinculacao: '',
      programa: '',
      acao: '',
      elementoDespesa: '',
      fonteRecursos: '',
      mapaCotacao: '',
      destinatario: '',
      observacoesEncaminhamento: '',
      impactosEsperados: '',
      riscosPreliminares: '',
      responsavelNome: '',
      responsavelCargo: '',
      responsavelMatricula: '',
      modalidadeLicitacao: '',
      tipoLicitacao: '',
      criterioJulgamento: '',
      regimeExecucao: '',
      prazoEntrega: '',
      localEntrega: '',
      cronogramaExecucao: '',
      metasObjetivos: ''
    }
  };

  const handleRouteChange = (useSimplified: boolean) => {
    updateTipo(useSimplified ? 'simplificada' : 'completa');
  };

  const renderDFDCompleto = () => (
    <div className="space-y-6">
      {/* Banner informativo para DFD Completo */}
      <div className="p-4 border-l-4 bg-blue-50 border-lumen-blue">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="w-5 h-5 text-lumen-blue" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-800">
              <strong>DFD Completo:</strong> Esta demanda requer processo licitatório completo conforme a Lei 14.133/21.
            </p>
          </div>
        </div>
      </div>

      <Identificacao />
      <QuantitativosBloco />
      <RequisitosPrazosBloco />
      <PlanejamentoBloco />
      <DemandasCorrelatasBloco />
      <VinculacaoResponsavelBloco />
      <AnexosClassificacaoBloco />
      <EncaminhamentoBloco />
      <ActionButtons
        leftButton={{
          text: "Salvar como rascunho",
          variant: "outline"
        }}
        rightButtons={[
          {
            text: "Voltar",
            variant: "outline",
            onClick: () => setActiveTab('planejamento')
          },
          {
            text: "Formalizar DFD",
            variant: "primary",
            icon: "check"
          }
        ]}
      />
    </div>
  );

  if (isLoadingEspada1) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-b-2 rounded-full animate-spin border-lumen-gold"></div>
      </div>
    );
  }

  return (
    <div className="container p-6 mx-auto">
      {/* Banner de informação sobre DFD Simplificado */}
      <div className="p-4 mb-6 border-l-4 border-blue-500 bg-blue-50">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="w-5 h-5 text-blue-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              A Lei 14.133/21 permite o uso de DFD simplificado para contratações de pequeno valor, objetos padronizados e de baixo risco.
              A LUX analisará automaticamente a elegibilidade desta demanda.
            </p>
          </div>
        </div>
      </div>

      {/* Componente de Análise de Elegibilidade */}
      <AnaliseDFDSimplificadoComponent
        formData={safeFormData}
        onRouteChange={handleRouteChange}
      />

      {/* Renderização condicional do template adequado */}
      {tipo === 'simplificada' ? (
        <DFDSimplificado formData={safeFormData} setFormData={() => {}} setActiveTab={setActiveTab} />
      ) : tipo === 'completa' ? (
        renderDFDCompleto()
      ) : (
        <div className="py-8 text-center text-gray-500">
          <p>Selecione o tipo de DFD adequado para esta demanda.</p>
        </div>
      )}
    </div>
  );
}
