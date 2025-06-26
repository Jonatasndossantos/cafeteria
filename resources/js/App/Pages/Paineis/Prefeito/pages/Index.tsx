import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { VisaoGeral } from '../components/modules/VisaoGeral';
import { VisaoFinanceira } from '../components/modules/VisaoFinanceira';
import { ConformidadeLegal } from '../components/modules/ConformidadeLegal';
import { ObrasConvenios } from '../components/modules/ObrasConvenios';
import { Emendas } from '../components/modules/Emendas';
import { Secretarias } from '../components/modules/Secretarias';
import { Prioridades } from '../components/modules/Prioridades';
import { AIAssistant } from '../components/AIAssistant';
import { VisaoPreditiva } from '../components/modules/VisaoPreditiva';

const Index = () => {
  const [activeModule, setActiveModule] = useState('visao-geral');

  const renderModule = () => {
    try {
      switch (activeModule) {
        case 'visao-geral':
          return <VisaoGeral />;
        case 'visao-financeira':
          return <VisaoFinanceira />;
        case 'conformidade-legal':
          return <ConformidadeLegal />;
        case 'obras-convenios':
          return <ObrasConvenios />;
        case 'emendas':
          return <Emendas />;
        case 'secretarias':
          return <Secretarias />;
        case 'prioridades':
          return <Prioridades />;
        default:
          return <VisaoGeral />;
      }
    } catch (error) {
      console.error('Error rendering module:', error);
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Erro ao carregar módulo</h2>
            <p className="text-gray-600 mb-4">Ocorreu um erro ao carregar o módulo {activeModule}</p>
            <button 
              onClick={() => setActiveModule('visao-geral')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Voltar para Visão Geral
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lumen-gray via-white to-blue-50/30">
      <Navigation activeModule={activeModule} setActiveModule={setActiveModule} />
      <main className="container mx-auto px-6 py-8">
        <div className="animate-fade-in">
          {renderModule()}
        </div>
      </main>
      <AIAssistant />
    </div>
  );
};

export default Index;
