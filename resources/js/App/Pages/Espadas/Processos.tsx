import React from 'react';
import { router, Head } from '@inertiajs/react';
import IdentificacaoBloco from '@/Components/espadaComponente1/tabs/planejamento/IdentificacaoBloco';
import { Button } from '@/Components/ui/button';
import { Header } from '@/Components/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';

const queryClient = new QueryClient();

export default function Processos() {

    const handleBack = () => {
        router.visit('/ambienteservidor');
    };

    return (

            <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="container px-4 py-8 mx-auto">
                    <div className="p-6 bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between mb-6">
                            <Button
                                variant="outline"
                                onClick={handleBack}
                                className="flex items-center gap-2 text-[#0A3D62] hover:text-[#CB991A] border-[#0A3D62] hover:border-[#CB991A]"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Voltar para Minhas Demandas
                            </Button>
                            <h1 className="text-2xl font-bold">Novo Processo</h1>
                        </div>
                        <IdentificacaoBloco />

                    </div>
                </main>
            </div>
    );
}
