# Fluxo de Dados Frontend-Backend

## Resumo do Processo

1. **Backend (Laravel + Inertia)**
   - Controlador carrega dados iniciais
   - Envia para o frontend via `Inertia::render()`
   - Dados são injetados como props no componente React

2. **Frontend (React + TanStack Query)**
   - Dados iniciais vêm do Inertia via `usePage()`
   - TanStack Query gerencia o estado e cache
   - Hooks personalizados encapsulam a lógica de dados

3. **Fluxo de Dados**
   ```
   Backend (Laravel) → Inertia → Props React → TanStack Query → Componentes
   ```

4. **Vantagens**
   - Dados iniciais carregados com a página
   - Cache e gerenciamento de estado com TanStack
   - Experiência SPA mantida
   - Tipagem forte com TypeScript

## Exemplo de Implementação Padrão

### 1. Backend (Controller)
```php
// app/Http/Controllers/DFDController.php
public function create()
{
    return Inertia::render('DFD/Create', [
        'formData' => [
            'identificacao' => [
                'unidadeIniciadora' => '',
                'responsavelNome' => '',
                // ... outros campos
            ],
            // ... outras seções
        ]
    ]);
}
```

### 2. Frontend (Hook)
```typescript
// resources/js/App/hooks/useFormData.ts
import { useQuery } from '@tanstack/react-query';
import { usePage } from '@inertiajs/react';

export function useFormData() {
    const { props } = usePage(); //Props é oque chama os dados do inertia::render
    
    return useQuery({
        queryKey: ['formData'],
        queryFn: () => Promise.resolve(props.formData),
        initialData: props.formData,
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
}
```

### 3. Frontend (Componente)
```typescript
// resources/js/App/Pages/DFD/Create.tsx
import { useFormData } from '@/App/hooks/useFormData';

export default function Create() {
    const { data: formData, isLoading } = useFormData();

    if (isLoading) return <div>Carregando...</div>;

    return (
        <div>
            <h1>Novo DFD</h1>
            <form>
                <input 
                    value={formData.identificacao.responsavelNome}
                    onChange={e => updateField('identificacao.responsavelNome', e.target.value)}
                />
                {/* ... outros campos */}
            </form>
        </div>
    );
}
```

## Padrão de Importação

```typescript
// 1. Imports do React e bibliotecas principais
import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';

// 2. Imports de hooks personalizados
import { useFormData } from '@/App/hooks/useFormData';
import { useUserData } from '@/App/hooks/useUserData';

// 3. Imports de componentes
import { FormField } from '@/App/Components/FormField';
import { Button } from '@/App/Components/Button';

// 4. Imports de tipos
import type { FormData } from '@/App/types/form';
```

## Estrutura de Comunicação

### 1. Backend (Laravel + Inertia)

```php
// app/Http/Controllers/Web/Espadas/DfdController.php

public function index()
{
    // Carrega o usuário com seus relacionamentos
    $user = auth()->user()->load(['setor.orgao']);
    
    // Envia apenas os dados necessários para o frontend
    return Inertia::render('Espadas/Espada1/Create', [
        'auth' => [
            'user' => [
                // Dados básicos do usuário
                'name' => $user->name,
                'email' => $user->email,
                
                // Dados do setor (apenas nome)
                'setor' => [
                    'nome' => $user->setor?->nome,
                ],
                
                // Dados do órgão (apenas nome e sigla)
                'orgao' => [
                    'nome' => $user->orgao?->nome,
                    'sigla' => $user->orgao?->sigla,
                ],
            ],
        ],
    ]);
}
```

### 2. Frontend (React + TanStack Query)

#### 2.1 Configuração do TanStack Query

```typescript
// resources/js/App/Pages/Espadas/Espada1/Create.tsx

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Configuração global do cliente de queries
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Tempo que os dados são considerados "frescos"
            staleTime: 5 * 60 * 1000, // 5 minutos
            
            // Tempo que os dados ficam em cache após ficarem inativos
            gcTime: 10 * 60 * 1000, // 10 minutos
            
            // Não refetch em foco da janela
            refetchOnWindowFocus: false,
            
            // Não refetch em reconexão
            refetchOnReconnect: false,
        },
    },
});

// Componente principal
const DFDCreate = () => {
    return (
        <QueryClientProvider client={queryClient}>
            {/* ... resto do componente ... */}
        </QueryClientProvider>
    );
};
```

#### 2.2 Hook para Gerenciamento de Dados

```typescript
// resources/js/hooks/useUserData.ts

import { usePage } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';

// Interface para os dados do usuário
interface UserData {
    name: string;
    email: string;
    setor?: {
        nome: string;
    };
    orgao?: {
        nome: string;
        sigla: string;
    };
}

// Interface para as props do Inertia
interface PageProps {
    auth: {
        user: UserData;
    };
}

// Hook principal para acessar os dados do usuário
export const useUserData = () => {
    // usePage é um hook do Inertia que dá acesso às props
    const { props } = usePage<PageProps>();
    
    // useQuery é um hook do TanStack Query para gerenciar o estado
    return useQuery({
        // Chave única para identificar esta query la no component
        queryKey: ['userData'],
        
        // Função que retorna os dados
        queryFn: () => Promise.resolve(props.auth.user),
        
        // Dados iniciais (vindos do Inertia)
        initialData: props.auth.user,
        
        // Tempo que os dados são considerados "frescos"
        staleTime: 5 * 60 * 1000,
    });
};

// Hook para acessar informações formatadas do usuário
export const useUserInfo = () => {
    // Desestruturação do resultado do useQuery
    const { data: user } = useUserData();
    
    // Retorna um objeto com os dados formatados
    return {
        user,
        // Valores padrão caso os dados não existam
        responsavelNome: user?.name ?? '',
        responsavelSetor: user?.setor?.nome ?? '',
        responsavelOrgao: user?.orgao?.nome ?? '',
        orgaoSigla: user?.orgao?.sigla ?? '',
    };
};
```

#### 2.3 Uso nos Componentes

```typescript
// resources/js/App/Pages/Espadas/Espada1/espada1/src/components/tabs/planejamento/IdentificacaoBloco.tsx

import { useUserInfo } from "@/hooks/useUserData";

export function IdentificacaoBloco() {
    // Desestruturação dos dados do hook
    const { 
        user, 
        responsavelNome, 
        responsavelSetor, 
        responsavelOrgao 
    } = useUserInfo();
    
    // Estado local do formulário
    const [formData, setFormData] = useState({
        // Valores iniciais usando os dados do usuário
        unidadeIniciadora: user?.orgao?.nome ?? '',
        responsavelNome: responsavelNome,
        responsavelCargo: '',
        responsavelSetor: responsavelOrgao,
        descricaoNecessidade: '',
        statusPlanejamento: ''
    });

    // ... resto do componente
}
```

## Pontos Chave

### 1. Desestruturação de Objetos

```typescript
// Forma básica
const { name, email } = user;

// Com valores padrão
const { name = 'Anônimo', email = '' } = user;

// Com alias
const { name: userName, email: userEmail } = user;

// Desestruturação aninhada
const { 
    setor: { nome: setorNome } = { nome: '' },
    orgao: { nome: orgaoNome } = { nome: '' }
} = user;
```

### 2. Importação de Módulos

```typescript
// Importação padrão
import Component from './Component';

// Importação nomeada
import { Component } from './Component';

// Importação com alias
import { Component as MyComponent } from './Component';

// Importação de múltiplos itens
import { 
    Component1,
    Component2,
    Component3 as MyComponent3
} from './Components';
```

### 3. Boas Práticas

1. **Tipagem**:
   - Sempre defina interfaces para seus dados
   - Use TypeScript para type safety
   - Documente estruturas de dados

2. **Desestruturação**:
   - Use valores padrão para evitar undefined
   - Dê nomes significativos aos alias
   - Mantenha a desestruturação próxima ao uso

3. **Imports**:
   - Agrupe imports por tipo (React, hooks, componentes, etc.)
   - Use aliases para imports longos
   - Mantenha imports organizados

4. **Hooks**:
   - Crie hooks específicos para cada necessidade
   - Documente o propósito de cada hook
   - Mantenha hooks pequenos e focados

## Exemplo de Uso Completo

```typescript
// Componente que usa os dados
function MeuComponente() {
    // Hook personalizado para dados do usuário
    const { 
        user,
        responsavelNome,
        responsavelSetor 
    } = useUserInfo();
    
    // Estado local
    const [formData, setFormData] = useState({
        nome: responsavelNome,
        setor: responsavelSetor,
    });

    // Renderização
    return (
        <div>
            <h1>Bem-vindo, {responsavelNome}</h1>
            <p>Setor: {responsavelSetor}</p>
            <p>Órgão: {user?.orgao?.nome}</p>
        </div>
    );
}
```

## Considerações Finais

1. **Performance**:
   - Use desestruturação para evitar re-renders
   - Mantenha objetos pequenos e focados
   - Evite aninhamento profundo

2. **Manutenibilidade**:
   - Documente interfaces e tipos
   - Use nomes descritivos
   - Mantenha código organizado

3. **Segurança**:
   - Valide dados no backend
   - Use tipos estritos
   - Trate casos de erro