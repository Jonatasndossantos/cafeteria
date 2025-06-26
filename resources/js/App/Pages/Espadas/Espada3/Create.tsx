import React from 'react';
import { Toaster } from "@/Components/ui/toaster";
import { Toaster as Sonner } from "@/Components/ui/sonner";
import { TooltipProvider } from "@/Components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EspadaTR from '@/Components/espadaComponente3/EspadaTR';
import { Head } from '@inertiajs/react';

interface DFDCreateProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
    dfd?: any;
    processo?: any;
    sharedData?: any;
    mode?: 'create' | 'edit' | 'view';
}

const queryClient = new QueryClient();

const DFDCreate: React.FC<DFDCreateProps> = (props) => {
    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <Head title="Dashboard" />
                <div className="min-h-screen bg-gray-50">
                    <EspadaTR />
                </div>
            </TooltipProvider>
        </QueryClientProvider>
    );
};

export default DFDCreate;