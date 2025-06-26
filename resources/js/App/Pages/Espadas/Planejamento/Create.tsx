import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Header } from "@/Components/Header";
import { Navigation } from "@/Components/espadaComponente1/Navigation";
import { PlanejamentoTab } from "@/Components/espadaComponente1/tabs/planejamento/PlanejamentoTab";
import { Button } from "@/Components/ui/button";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

import { usePlanejamento } from '@/hooks/Espada1/usePlanejamento';
import { useGestaoItens, Item, ObraItem } from '@/hooks/Espada1/useGestaoItens';

interface Props {
    document: any;
}

const Planejamento: React.FC<Props> = ({ document }) => {
    const [isSaving, setIsSaving] = useState(false);

    // Hooks simplificados
    const planejamentoHook = usePlanejamento();
    const gestaoItens = useGestaoItens<Item | ObraItem>('itens');

    useEffect(() => {
        if (isSaving) {
            handleSaveDraft();
        }
    }, [isSaving]);

    // Salvar rascunho
    const handleSaveDraft = async () => {
        try {
            setIsSaving(true);

            // Pega os dados atualizados dos hooks
            const currentPlanejamentoData = planejamentoHook.getCurrentData();
            const currentGestaoData = gestaoItens.getCurrentData();

            // Dados para envio com estrutura JSON preservada
            const metadataJson = {
                ...(currentPlanejamentoData || {}),
                items: currentGestaoData?.items || [],
                tipoContratacao: currentGestaoData?.tipoContratacao || 'itens',
                lastSaved: new Date().toISOString()
            };

            const dataToSend = {
                processo_id: document?.processo_id || null,
                name: document?.name || 'Planejamento',
                document_type: 'Planejamento',
                description: currentPlanejamentoData?.objeto?.objetoContratacao || '',
                metadata: JSON.stringify(metadataJson)
            };

            console.log('Dados para envio:', dataToSend);
            console.log('Planejamento atual:', currentPlanejamentoData);
            console.log('Gestão atual:', currentGestaoData);

            router.visit(`/planejamento/${document?.id}`, {
                data: dataToSend,
                method: 'post',
                preserveState: true,
                replace: true,
                onSuccess: (page) => {
                    console.log('Documento salvo com sucesso!');
                    alert('Rascunho salvo com sucesso!');
                },
                onError: (errors) => {
                    console.error('Erro ao salvar:', errors);
                    alert('Erro ao salvar rascunho. Verifique os dados.');
                }
            });

        } catch (error) {
            console.error('Erro ao salvar rascunho:', error);
            alert('Erro ao salvar rascunho. Tente novamente.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleNextStep = () => {
        console.log(document?.processo_id);
        router.visit('/espadas/espada1/create', {
            data: {
                processo_id: document?.processo_id,
                document_type: 'Espada1',
            },
            method: 'post'
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {document ? (
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <Navigation
                        activeTab="planejamento"
                        setActiveTab={() => {}}
                        isSaving={isSaving}
                        setIsSaving={setIsSaving}
                    />
                    <main className="flex-1 bg-gray-100">
                        <div className="container px-4 py-6 mx-auto">
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

                            <PlanejamentoTab/>

                            <div className="container px-4 py-6 mx-auto">
                                <div className="flex justify-between items-center">
                                    <Button
                                        onClick={() => window.history.back()}
                                        variant="outline"
                                        className="transition-all duration-200 border-lumen-blue text-lumen-blue hover:bg-gray-50 hover:scale-105"
                                    >
                                        <X className="mr-2 w-4 h-4" />
                                        Cancelar
                                    </Button>
                                    <div className="flex space-x-4">
                                        <Button
                                            onClick={handleNextStep}
                                            className="text-white transition-all duration-200 bg-lumen-blue hover:bg-lumen-blue/90 hover:scale-105"
                                        >
                                            <ArrowRight className="mr-2 w-4 h-4" />
                                            Avançar para DFD
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            ) : (
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <div className="flex flex-col justify-center items-center min-h-screen">
                        <h1 className="text-2xl font-bold">Erro ao carregar o documento...</h1>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Planejamento;
