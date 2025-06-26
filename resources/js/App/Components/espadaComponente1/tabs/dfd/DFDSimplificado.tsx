import { Eye, Package, FileText, DollarSign, Calendar, CheckSquare } from "lucide-react";
import { SugestoesIAComponent } from "./SugestoesIAComponent";
import { ActionButtons } from "@/Components/common/ActionButtons";
import { useEspada1 } from "@hooks/Espada1/useEspada1";
import { StandardCard } from "@/Components/ui/standard-card";

interface DFDSimplificadoProps {
  formData: any;
  setFormData: (data: any) => void;
  setActiveTab: (tab: string) => void;
}

interface DFDData {
  orgaoRequisitante?: string;
  responsavelNome?: string;
  numero?: string;
  objetoContratacao?: string;
  tipoObjeto?: string;
  codigoCatmat?: string;
  justificativa?: string;
  valorTotal?: number;
  fontePesquisa?: string;
  pcaItemId?: string;
  justificativaPca?: string;
  responsavelAprovacao?: string;
  cargoResponsavel?: string;
  matriculaResponsavel?: string;
}

export function DFDSimplificado({ setActiveTab }: DFDSimplificadoProps) {
  const { espada1Data, isLoading } = useEspada1();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-b-2 rounded-full animate-spin border-lumen-gold"></div>
      </div>
    );
  }

  const dfdData = (espada1Data?.dfd || {}) as DFDData;

  return (
    <div className="space-y-6">
      {/* Banner informativo */}
      <div className="p-4 border-l-4 bg-amber-50 border-lumen-gold">
        <div className="flex">
          <div className="flex-shrink-0">
            <CheckSquare className="w-5 h-5 text-lumen-gold" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-amber-800">
              <strong>DFD Simplificado:</strong> Esta demanda atende aos critérios da Lei 14.133/21 para processo simplificado.
            </p>
          </div>
        </div>
      </div>

      {/* Seção 1: Identificação Básica */}
      <StandardCard 
        title="Identificação da Demanda"
        icon={Eye}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Unidade Requisitante
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
              value={dfdData.orgaoRequisitante}
            />
            <p className="mt-1 text-xs text-gray-500">Herdado do planejamento</p>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Responsável pela Demanda</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
              value={dfdData.responsavelNome}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Número do DFD</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
            value={dfdData.numero || 'Será gerado automaticamente'}
          />
        </div>
      </StandardCard>

      {/* Seção 2: Objeto da Contratação */}
      <StandardCard 
        title="Objeto da Contratação"
        icon={Package}
      >
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Objeto *
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
            value={dfdData.objetoContratacao}
            rows={3}
          />
          <p className="mt-1 text-xs text-gray-500">Herdado do planejamento</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Tipo de Objeto *
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
              value={dfdData.tipoObjeto}
            />
            <p className="mt-1 text-xs text-gray-500">Herdado do planejamento</p>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Código CATMAT/CATSER *
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
              value={dfdData.codigoCatmat}
            />
            <p className="mt-1 text-xs text-gray-500">Herdado do planejamento</p>
          </div>
        </div>
      </StandardCard>

      {/* Seção 3: Justificativa Simplificada */}
      <StandardCard 
        title="Justificativa da Necessidade"
        icon={FileText}
      >
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Justificativa</label>
          <SugestoesIAComponent
            field="justificativa"
            value={dfdData.justificativa || ''}
            onChange={(newValue) => {}}
            onSelectSuggestion={(suggestion) => {}}
            context={{
              documentType: 'dfd',
              tipo: dfdData.tipoObjeto || '',
              objeto: dfdData.objetoContratacao || ''
            }}
            rows={4}
            fieldType="textarea"
            placeholder="Descreva de forma resumida a necessidade da contratação"
          />
        </div>
      </StandardCard>

      {/* Seção 4: Valor Estimado */}
      <StandardCard 
        title="Valor Estimado"
        icon={DollarSign}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Valor Total Estimado (R$) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
              value={dfdData.valorTotal}
            />
            <p className="mt-1 text-xs text-gray-500">Herdado do planejamento</p>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Fonte da Pesquisa de Preços *</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
              value={dfdData.fontePesquisa || ''}
            >
              <option value="">Selecione...</option>
              <option value="painel_precos">Painel de Preços</option>
              <option value="contratacoes_similares">Contratações Similares</option>
              <option value="sites_especializados">Sites Especializados</option>
              <option value="fornecedores">Pesquisa com Fornecedores</option>
              <option value="banco_precos">Banco de Preços</option>
            </select>
          </div>
        </div>
      </StandardCard>

      {/* Seção 5: Vinculação ao PCA */}
      <StandardCard 
        title="Vinculação ao PCA"
        icon={Calendar}
      >
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Item do PCA</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
            value={dfdData.pcaItemId || ''}
          >
            <option value="">Selecione...</option>
            <option value="item1">Equipamentos de Informática - PCA.2024.001</option>
            <option value="item2">Material de Escritório - PCA.2024.002</option>
            <option value="item3">Combustível - PCA.2024.003</option>
          </select>
          <p className="mt-1 text-xs text-gray-500">Herdado do planejamento</p>
        </div>

        <div className="mt-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Justificativa e inclusão no PCA
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
            value={dfdData.justificativaPca}
            rows={4}
          />
        </div>
      </StandardCard>

      {/* Seção 6: Aprovação */}
      <StandardCard 
        title="Aprovação"
        icon={CheckSquare}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Responsável pela Aprovação *</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
              value={dfdData.responsavelAprovacao}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Cargo/Função *</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
              value={dfdData.cargoResponsavel}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Matrícula *</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
              value={dfdData.matriculaResponsavel}
            />
          </div>
        </div>

        <div className="p-4 mt-4 border border-gray-200 rounded-md bg-gray-50">
          <p className="text-sm text-gray-600">
            <strong>Assinatura Digital:</strong> A assinatura será aplicada automaticamente ao finalizar o DFD.
          </p>
        </div>
      </StandardCard>

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
            text: "Finalizar DFD Simplificado",
            variant: "primary",
            icon: "check"
          }
        ]}
      />
    </div>
  );
}
