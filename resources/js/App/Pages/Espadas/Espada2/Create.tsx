import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Head } from '@inertiajs/react';
import { Header } from "@/Components/Header";
import TabNavigation from '@/Components/espadaComponente2/TabNavigation';
import RotaTab from '@/Components/espadaComponente2/RotaTab';
import PesquisaTab from '@/Components/espadaComponente2/PesquisaTab';
import ETPTab from '@/Components/espadaComponente2/ETPTab';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/Components/ui/tooltip';

// Instancia do QueryClient
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
});

interface Notificacao {
    id: number;
    titulo: string;
    urgencia: string;
}

const DFDCreate: React.FC = () => {
    const [activeTab, setActiveTab] = useState('rota');

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
                    <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                    
                    <main className="flex-1 bg-gray-100">
                        <div className="container px-4 py-6 mx-auto">
                            {activeTab === 'rota' && <RotaTab />}
                            {activeTab === 'pesquisa' && <PesquisaTab />}
                            {activeTab === 'etp' && <ETPTab />}
                        </div>
                    </main>
                </div>
                <TooltipProvider>
                    <Toaster />
                </TooltipProvider>
            </div>
        </QueryClientProvider>
    );
};

export default DFDCreate;