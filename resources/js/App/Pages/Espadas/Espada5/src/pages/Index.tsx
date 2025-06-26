import React, { useState, useEffect } from 'react';
import { Header } from "@/Components/Header";
import TabNavigation from '../components/layout/TabNavigation';
import ProcessIdentification from '../components/shared/ProcessIdentification';
import SimplifiedModePrompt from '../components/shared/SimplifiedModePrompt';
import ActionButtons from '../components/shared/ActionButtons';
import EditalTab from '../components/EditalTab';
import CredenciamentoTab from '../components/CredenciamentoTab';
import ContratacaoTab from '../components/ContratacaoTab';
import ModoSimplificado from '../components/ModoSimplificado';
import { verificarGatilhosModoSimplificado } from '../utils/modoSimplificado';
import { useProcessoLegadoData } from '../hooks/useProcessoLegadoData';
import { Skeleton } from '@/Components/ui/skeleton';

const Index = () => {
  const [activeTab, setActiveTab] = useState('edital');
  const [modoSimplificado, setModoSimplificado] = useState(false);
  const [mostrarSugestaoSimplificado, setMostrarSugestaoSimplificado] = useState(false);

  // Buscar dados herdados do processo
  const { data: processoData, isLoading: isLoadingProcesso } = useProcessoLegadoData();

  // Verificar se deve sugerir modo simplificado
  useEffect(() => {
    if (activeTab === 'edital' && !modoSimplificado && processoData) {
      const deveSerSimplificado = verificarGatilhosModoSimplificado({
        valorEstimado: processoData.valorEstimado,
        objeto: processoData.objeto,
        modalidade: processoData.modalidade
      });
      setMostrarSugestaoSimplificado(deveSerSimplificado);
    }
  }, [activeTab, processoData, modoSimplificado]);

  const ativarModoSimplificado = () => {
    setModoSimplificado(true);
    setMostrarSugestaoSimplificado(false);
  };

  const voltarModoCompleto = () => {
    setModoSimplificado(false);
  };

  // Renderiza um skeleton enquanto os dados do processo estão carregando
  if (isLoadingProcesso || !processoData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="container mx-auto py-6 px-4 space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  // Dados para o painel de identificação (versão resumida)
  const identificationData = {
      numeroEdital: processoData.numeroEdital,
      matrizRiscos: processoData.matrizRiscos,
      termoReferencia: processoData.termoReferencia,
      objeto: processoData.objeto,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cabeçalho Global */}
      <Header />

      {/* Navegação por Abas */}
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Conteúdo Principal */}
      <div className="container mx-auto py-6 px-4">
        {/* Bloco de Identificação e Vinculação */}
        {(activeTab === 'edital' || activeTab === 'contratacao') && <ProcessIdentification inheritedData={identificationData} />}

        {/* Sugestão de Modo Simplificado */}
        {mostrarSugestaoSimplificado && activeTab === 'edital' && !modoSimplificado && (
          <SimplifiedModePrompt 
            inheritedData={{
              valorEstimado: processoData.valorEstimado,
              objeto: processoData.objeto,
              modalidade: processoData.modalidade
            }}
            onAtivarModoSimplificado={ativarModoSimplificado}
          />
        )}

        {/* Conteúdo das Abas */}
        <div className="animate-fade-in">
          {activeTab === 'contratacao' && <ContratacaoTab inheritedData={identificationData} />}
          {activeTab === 'edital' && (
            modoSimplificado ? (
              <ModoSimplificado 
                inheritedData={processoData} 
                onVoltarModoCompleto={voltarModoCompleto}
              />
            ) : (
              <EditalTab inheritedData={processoData} />
            )
          )}
          {activeTab === 'credenciamento' && <CredenciamentoTab />}
        </div>

        {/* Botões de Ação */}
        <ActionButtons />
      </div>
    </div>
  );
};

export default Index;
