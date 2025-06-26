# Fluxo Genérico de Dados em Aplicações SPA (React + Inertia + TanStack Query + Backend)

## 1. Navegação e Carregamento Inicial
- O usuário acessa uma URL (ex: `/pagina`), que dispara uma rota backend (ex: Laravel).
- O backend prepara os dados iniciais necessários para a página (ex: listas, dados de exemplo, configurações).
- O backend retorna uma resposta Inertia, enviando um componente e os dados como props.

```php
// Exemplo Laravel
Route::get('/pagina', [PaginaController::class, 'show']);

// Controller
return Inertia::render('MinhaPagina', [
    'dadosIniciais' => $dados,
    'outraLista' => $outraLista,
]);
```

---

## 2. Consumo dos Dados no Frontend
- O componente React recebe os dados via `usePage` (Inertia):

```ts
import { usePage } from '@inertiajs/react';

const { props } = usePage<{ dadosIniciais: any, outraLista: any[] }>();
```
- Os dados podem ser usados diretamente ou passados para hooks personalizados.

---

## 3. Gerenciamento de Estado e Edição
- Para dados que podem ser editados, use hooks personalizados com TanStack Query para cache, atualização e mutação.
- O hook pode inicializar o estado com os dados vindos do backend:

```ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useMeuDado() {
  const { props } = usePage<{ dadosIniciais: any }>();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['meuDado'],
    queryFn: () => Promise.resolve(props.dadosIniciais),
    initialData: props.dadosIniciais,
  });

  // Exemplo de mutation para salvar
  const mutation = useMutation({
    mutationFn: async (novoDado) => {/* chamada API */},
    onSuccess: (novoDado) => queryClient.setQueryData(['meuDado'], novoDado),
  });

  return { data, isLoading, mutation };
}
```

---

## 4. Atualização e Exibição dos Dados
- O componente consome o hook e exibe os dados na tela.
- Ao editar ou salvar, o hook pode atualizar o cache local e/ou fazer uma chamada para o backend.

```tsx
const { data, isLoading, mutation } = useMeuDado();

if (isLoading) return <div>Carregando...</div>;

return <div>{data.campo}</div>;
```

---

## 5. Resumo do Fluxo
1. Usuário acessa a URL → backend retorna componente + props via Inertia.
2. Componente React consome os dados via `usePage`.
3. Hooks personalizados (com TanStack Query) gerenciam estado, cache e mutações.
4. Dados são exibidos e podem ser atualizados na interface.

---

## 6. Observações
- Para dados dinâmicos (busca sob demanda), use hooks com `axios`/`fetch` e endpoints REST.
- Para dados globais, utilize o middleware `share` do Inertia.
- Sempre que possível, centralize a lógica de dados no backend e envie via props para facilitar manutenção e SSR.

---

## 7. Referências
- [Inertia.js - Shared Data](https://inertiajs.com/shared-data#sharing-data)
- [TanStack Query](https://tanstack.com/query/latest)
- [Laravel Controllers](https://laravel.com/docs/10.x/controllers) 