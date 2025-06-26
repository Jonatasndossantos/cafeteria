# Melhores Práticas de Integração: Laravel + Inertia + React + TanStack Query

Esta documentação complementa o fluxo de dados principal com práticas específicas de integração baseadas na documentação oficial e experiências da comunidade.

## 📋 Índice

1. [Configuração Inicial](#configuração-inicial)
2. [Estrutura de Projeto](#estrutura-de-projeto)
3. [Configuração do TanStack Query](#configuração-do-tanstack-query)
4. [Padrões de Queries](#padrões-de-queries)
5. [Gerenciamento de Estado](#gerenciamento-de-estado)
6. [Performance e Otimização](#performance-e-otimização)
7. [Tratamento de Erros](#tratamento-de-erros)
8. [Testing](#testing)

## Configuração Inicial

### 1. Instalação das Dependências

```bash
# Frontend
npm install @tanstack/react-query @tanstack/react-query-devtools
npm install @inertiajs/react
npm install react react-dom @types/react @types/react-dom

# Backend
composer require inertiajs/inertia-laravel
composer require laravel/framework
```

### 2. Setup do QueryClient Provider

Baseado na [documentação oficial do TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview):

```typescript
// resources/js/app.tsx
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      retry: (failureCount, error) => {
        // Não tentar novamente para erros 4xx
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

createInertiaApp({
  resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
  setup({ el, App, props }) {
    return createRoot(el).render(
      <QueryClientProvider client={queryClient}>
        <App {...props} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    );
  },
});
```

## Estrutura de Projeto

### Organização de Arquivos

```
resources/js/
├── App/
│   ├── Components/          # Componentes reutilizáveis
│   ├── contexts/           # Context providers
│   ├── hooks/              # Custom hooks
│   │   ├── queries/        # Hooks específicos para queries
│   │   └── mutations/      # Hooks específicos para mutations
│   ├── lib/                # Utilitários
│   ├── Pages/              # Páginas Inertia
│   └── types/              # Definições TypeScript
├── app.tsx                 # Entry point
└── bootstrap.js            # Bootstrap
```

## Configuração do TanStack Query

### Query Keys Strategy

Segundo as [melhores práticas do TanStack Query](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys):

```typescript
// resources/js/App/lib/queryKeys.ts
export const queryKeys = {
  all: ['queries'] as const,
  processos: () => [...queryKeys.all, 'processos'] as const,
  processo: (id: number) => [...queryKeys.processos(), id] as const,
  arquivos: (processoId: number) => [...queryKeys.all, 'arquivos', processoId] as const,
  setores: () => [...queryKeys.all, 'setores'] as const,
} as const;
```

## Padrões de Queries

### 1. Queries com Dados Iniciais (Inertia)

```typescript
// Para dados que vêm do Inertia
const ProcessoShow = ({ processo, arquivos }: Props) => {
  const { data: processoData } = useQuery({
    queryKey: ['processo', processo.id],
    queryFn: () => processo, // Retorna dados iniciais
    initialData: processo,
  });

  const { data: arquivosData } = useQuery({
    queryKey: ['arquivos', processo.id],
    queryFn: () => arquivos,
    initialData: arquivos,
  });

  // ...
};
```

### 2. Queries para Busca Dinâmica

```typescript
// Para dados que precisam ser buscados dinamicamente
const useProcessoSearch = (searchTerm: string) => {
  return useQuery({
    queryKey: ['processos', 'search', searchTerm],
    queryFn: async () => {
      const response = await axios.get('/api/processos/search', {
        params: { q: searchTerm }
      });
      return response.data;
    },
    enabled: searchTerm.length > 2, // Só busca com 3+ caracteres
    staleTime: 30 * 1000, // 30 segundos para buscas
  });
};
```

## Performance e Otimização

### 1. Prefetching

```typescript
// Prefetch dados que provavelmente serão necessários
const ProcessosList = () => {
  const queryClient = useQueryClient();

  const handleProcessoHover = (processoId: number) => {
    queryClient.prefetchQuery({
      queryKey: ['processo', processoId],
      queryFn: () => fetchProcesso(processoId),
      staleTime: 5 * 60 * 1000,
    });
  };

  // ...
};
```

### 2. Background Updates

```typescript
// Atualizar dados em background
const useProcessoWithBackgroundUpdate = (id: number, initialData: Processo) => {
  return useQuery({
    queryKey: ['processo', id],
    queryFn: () => fetchProcesso(id),
    initialData,
    staleTime: 0, // Sempre considerar stale
    refetchInterval: 5 * 60 * 1000, // Refetch a cada 5 minutos
    refetchIntervalInBackground: true,
  });
};
```

## Tratamento de Erros

### Error Handling em Queries

```typescript
const ProcessoPage = ({ processo }: Props) => {
  const { data, error, isError, refetch } = useQuery({
    queryKey: ['processo', processo.id],
    queryFn: () => fetchProcesso(processo.id),
    initialData: processo,
    onError: (error) => {
      console.error('Erro ao carregar processo:', error);
    },
  });

  if (isError) {
    return (
      <div className="p-4 border border-red-200 rounded">
        <p className="text-red-600">
          Erro ao carregar processo: {error?.message}
        </p>
        <button
          onClick={() => refetch()}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  // ...resto do componente
};
```

## Referências

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Inertia.js Documentation](https://inertiajs.com/)
- [Laravel Documentation](https://laravel.com/docs)

## Conclusão

Essas práticas garantem uma integração robusta e performática entre Laravel, Inertia.js, React e TanStack Query, baseadas nas melhores práticas da comunidade e documentações oficiais.
