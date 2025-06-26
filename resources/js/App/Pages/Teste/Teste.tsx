import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { useTeste } from '@/hooks/useTeste';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Criar o QueryClient fora do Componente para evitar recriação a cada render
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
});

// Componente interno que usa o hook
function TesteContent() {
    const [inputValue, setInputValue] = useState('');
    const { data, isLoading, error } = useTeste(inputValue, !!inputValue);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Teste Prisma
                </h2>
            }
        >
            <Head title="Teste Prisma" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Digite algo para testar..."
                                />
                            </div>
                            
                            {isLoading && <p>Carregando...</p>}
                            {error && <p className="text-red-500">Erro: {error.message}</p>}
                            {data && (
                                <div className="mt-4">
                                    <h3 className="font-semibold">Resultado:</h3>
                                    <pre className="mt-2 p-4 bg-gray-100 rounded">
                                        {JSON.stringify(data, null, 2)}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Componente principal que fornece o QueryClientProvider
export default function Teste() {
    return (
        <QueryClientProvider client={queryClient}>
            <TesteContent />
        </QueryClientProvider>
    );
}
