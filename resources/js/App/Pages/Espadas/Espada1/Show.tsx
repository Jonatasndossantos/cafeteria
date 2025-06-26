import React, { useState } from 'react';
import { DFDPageProviders } from '@/contexts/AppProviders';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Head, router } from '@inertiajs/react';
import { Header } from "@/Components/Header";
import { Navigation } from "@/Components/espadaComponente1/Navigation";
import { PlanejamentoTab } from "@/Components/espadaComponente1/tabs/planejamento/PlanejamentoTab";
import { DFDTab } from "@/Components/espadaComponente1/tabs/dfd/DFDTab";
import { Button } from "@/Components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Notificacao {
  id: number;
  titulo: string;
  urgencia: string;
}

// Instancia do QueryClient
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
});

const DFDShow: React.FC = () => {
    const [activeTab, setActiveTab] = useState("planejamento");

    const usuario = {
        nome: "Usuário Teste",
        setor: "Setor Teste",
        funcao: "Função Teste"
    };

    const notificacoes: Notificacao[] = [];

    return (
        <QueryClientProvider client={queryClient}>
            <div className="min-h-screen bg-gray-100">
                <div className="flex flex-col min-h-screen">
                    <Header usuario={usuario} notificacoes={notificacoes} />
                    <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

                    <main className="flex-1 bg-gray-100">
                        <div className="container px-4 py-6 mx-auto">
                            {/* Botão Voltar */}
                            <div className="mb-6">
                                <Button
                                    variant="outline"
                                    onClick={() => router.visit('/ambienteservidor')}
                                    className="flex items-center gap-2 text-[#0A3D62] hover:text-[#CB991A] border-[#0A3D62] hover:border-[#CB991A]"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Voltar ao Ambiente do Servidor
                                </Button>
                            </div>

                            {activeTab === "planejamento" && <PlanejamentoTab setActiveTab={setActiveTab} />}
                            {activeTab === "dfd" && <DFDTab setActiveTab={setActiveTab} />}
                        </div>
                    </main>
                </div>
            </div>
        </QueryClientProvider>
    );
};

export default DFDShow;