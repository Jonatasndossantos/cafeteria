import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.tsx',
            ],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js/App'),
            '@components': path.resolve(__dirname, './resources/js/App/Components'),
            '@Components': path.resolve(__dirname, './resources/js/App/Components'),
            '@hooks': path.resolve(__dirname, './resources/js/App/hooks'),
            '@lib': path.resolve(__dirname, './resources/js/App/lib'),
            '@utils': path.resolve(__dirname, './resources/js/App/utils'),
            '@styles': path.resolve(__dirname, './resources/js/App/styles'),
            '@contexts': path.resolve(__dirname, './resources/js/App/contexts'),
            
            'react-dom/client': path.resolve(__dirname, './node_modules/react-dom/client.js'),
        },
    },
    optimizeDeps: {
        include: [
            'react',
            'react-dom/client', // Add this
            '@inertiajs/react',
            'laravel-vite-plugin/inertia-helpers'
        ],
    }
});
