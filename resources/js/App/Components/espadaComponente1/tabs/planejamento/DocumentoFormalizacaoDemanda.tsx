import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Save, FileText } from "lucide-react";
import { StandardCard } from '@/Components/ui/standard-card';

const DocumentoFormalizacaoDemanda: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#0A3D62]">Documento de Formalização da Demanda</h2>
                <Button 
                    variant="outline" 
                    className="flex items-center gap-2 text-[#0A3D62] hover:text-[#CB991A] border-[#0A3D62] hover:border-[#CB991A]"
                >
                    <Save className="h-4 w-4" />
                    Salvar Rascunho
                </Button>
            </div>
            <StandardCard 
                title="Documento de Formalização da Demanda"
                icon={FileText}
            >
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Número do Processo
                            </label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Digite o número do processo"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Data de Início
                            </label>
                            <input
                                type="date"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Título da Demanda
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Digite o título da demanda"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descrição da Demanda
                        </label>
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded-md h-32"
                            placeholder="Digite a descrição da demanda"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Objetivos
                        </label>
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded-md h-32"
                            placeholder="Digite os objetivos da demanda"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Justificativa
                        </label>
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded-md h-32"
                            placeholder="Digite a justificativa da demanda"
                        />
                    </div>
                </div>
            </StandardCard>
        </div>
    );
};

export default DocumentoFormalizacaoDemanda; 