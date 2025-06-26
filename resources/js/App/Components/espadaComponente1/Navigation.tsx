import React from 'react';
import { Button } from "@/Components/ui/button";
import { Save } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isSaving: boolean;
  setIsSaving: (isSaving: boolean) => void;
}



export function Navigation({ activeTab, setActiveTab, isSaving, setIsSaving }: NavigationProps) {

  return (
    <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          <div className="flex">
            <button
              className={`relative py-4 px-6 font-medium text-sm transition-all duration-200 ${
                activeTab === 'planejamento'
                  ? 'text-lumen-blue'
                  : 'text-gray-600 hover:text-lumen-blue/80'
              }`}
              onClick={() => setActiveTab('planejamento')}
            >
              <span className="relative z-10">Planejamento Integrado entre Unidades</span>
              {activeTab === 'planejamento' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-lumen-gold via-lumen-gold to-[#E5C158] transform scale-x-100 transition-transform duration-200" />
              )}
            </button>
            {/* <button
              className={`relative py-4 px-6 font-medium text-sm transition-all duration-200 ${
                activeTab === 'dfd'
                  ? 'text-lumen-blue'
                  : 'text-gray-600 hover:text-lumen-blue/80'
              }`}
              onClick={() => setActiveTab('dfd')}
            >
              <span className="relative z-10">Documento de Formalização da Demanda (DFD)</span>
              {activeTab === 'dfd' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-lumen-gold via-lumen-gold to-[#E5C158] transform scale-x-100 transition-transform duration-200" />
              )}
            </button> */}
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2 text-[#0A3D62] hover:text-[#CB991A] border-[#0A3D62] hover:border-[#CB991A] mr-4"
            onClick={() => setIsSaving(true)}
            disabled={isSaving}
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Salvando...' : 'Salvar Rascunho'}
          </Button>
        </nav>
      </div>
    </div>
  );
}
