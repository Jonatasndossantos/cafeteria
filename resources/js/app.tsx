import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ThemeProvider } from './App/Components/theme-provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './App/Components/ui/toaster';

const appName = import.meta.env.VITE_APP_NAME || 'Lumen';

const queryClient = new QueryClient();

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./App/Pages/${name}.tsx`, import.meta.glob('./App/Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider defaultTheme="light" storageKey="lumen-theme">
                <QueryClientProvider client={queryClient}>
                    <App {...props} />
                    <Toaster />
                    <ReactQueryDevtools />
                </QueryClientProvider>
            </ThemeProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});