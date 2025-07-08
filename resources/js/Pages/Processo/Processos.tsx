import React from 'react';
import { router, Head } from '@inertiajs/react';
import IdentificacaoBloco from '@/Components/IdentificacaoBloco';
import { Button } from '@/Components/ui/button';
import { Header } from '@/Components/Header';

import { ArrowLeft } from 'lucide-react';

interface Setor {
    id: number;
    nome: string;
    sigla: string;
}

export default function Processos(props: { setores: Setor[] }) {
    const handleBack = () => {
        router.visit('/documentos');
    };

    const handleBackToDemandas = () => {
        router.visit('/dashboard');
    };

    return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="container px-4 py-8 mx-auto mt-20">
                    <div className="p-6 bg-white rounded-lg shadow">
                        <div className="flex justify-between items-center mb-6">
                            <Button
                                variant="outline"
                                onClick={handleBack}
                                className="flex items-center gap-2 text-[#0A3D62] hover:text-[#CB991A] border-[#0A3D62] hover:border-[#CB991A]"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Voltar
                            </Button>
                            <h1 className="text-2xl font-bold">Novo Processo</h1>
                        </div>
                        <IdentificacaoBloco setores={props.setores}/>
                    </div>
                </main>

            </div>
    );
}
