import React, { useState } from 'react';
import { Toaster } from "../../../Components/ui/toaster";
import { Toaster as Sonner } from "../../../Components/ui/sonner";
import { TooltipProvider } from "../../../Components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Head } from '@inertiajs/react';
import { useFormData } from '../../../hooks/useFormDataEsp4';
import { Navigation } from '../../../Components/espadaComponente4/Navigation';
import { MatrizTab } from '../../../Components/espadaComponente4/tabs/MatrizTab';
import { Header } from '../../../Components/Header';

interface DFDCreateProps {
    auth: any;
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
});

const DFDCreate: React.FC<DFDCreateProps> = ({ auth }) => {
    const [activeTab, setActiveTab] = useState('matriz');
    const { isGeneratingRisks } = useFormData();    

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    if (isGeneratingRisks) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A3D62] mx-auto mb-4"></div>
                    <p className="text-gray-600">Gerando matriz de riscos...</p>
                </div>
            </div>
        );
    }

    return (
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    <Head title="Matriz de Riscos e Garantias" />
                    <div className="min-h-screen bg-gray-100">
                        <div className="flex flex-col min-h-screen">
                            <Header />
                            <Navigation activeTab={activeTab} setActiveTab={handleTabChange} />
                            
                            <main className="flex-1 bg-gray-100">
                                <div className="container px-4 py-6 mx-auto">
                                    {activeTab === 'matriz' && (
                                        <MatrizTab setActiveTab={handleTabChange} />
                                    )}
                                </div>
                            </main>
                        </div>
                    </div>
                    <Toaster />
                    <Sonner />
                </TooltipProvider>
            </QueryClientProvider>
    );
};

export default DFDCreate;