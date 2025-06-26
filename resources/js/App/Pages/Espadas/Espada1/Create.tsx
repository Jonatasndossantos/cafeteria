import React, { useState } from 'react';
import { QueryClient } from "@tanstack/react-query";
import { router } from '@inertiajs/react';
import { Header } from "@/Components/Header";
import { Navigation } from "@/Components/espadaComponente1/Navigation";
import { PlanejamentoTab } from "@/Components/espadaComponente1/tabs/planejamento/PlanejamentoTab";
import { DFDTab } from "@/Components/espadaComponente1/tabs/dfd/DFDTab";
import { Button } from "@/Components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useDocument } from '@/hooks/useDocument';
import { useEspada1 } from '@/hooks/Espada1/useEspada1';

// Instancia do QueryClient


const Espada1Create: React.FC = (document: any) => {
    const queryClient = new QueryClient();
    queryClient.setQueryData(['document'], document);
    const [activeTab, setActiveTab] = useState("dfd");

    const handleSaveDraft = async () => {
        return;
    };


    return (
            <div className="min-h-screen bg-gray-100">
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-1 bg-gray-100">
                        <div className="container px-4 py-6 mx-auto">
                            {/* Botão Voltar */}
                            <div className="mb-6">
                                <Button
                                    variant="outline"
                                    onClick={() => router.visit('/processos')}
                                    className="flex items-center gap-2 text-[#0A3D62] hover:text-[#CB991A] border-[#0A3D62] hover:border-[#CB991A]"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Voltar para Processos
                                </Button>
                            </div>

                            <DFDTab setActiveTab={setActiveTab} />
                        </div>
                    </main>
                </div>
            </div>
    );
};

export default Espada1Create;