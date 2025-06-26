import React from 'react';
import { Toaster } from "@/Components/ui/toaster";
import { Toaster as Sonner } from "@/Components/ui/sonner";
import { TooltipProvider } from "@/Components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from './pages/Index';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';


const queryClient = new QueryClient();

const DFDCreate: React.FC = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <AuthenticatedLayout>
                    <Head title="Painel Prefeito" />
                    <Index />
                </AuthenticatedLayout>
            </TooltipProvider>
        </QueryClientProvider>
    );
};

export default DFDCreate;