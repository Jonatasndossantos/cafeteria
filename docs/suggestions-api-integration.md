# Integração de Hooks React com TanStack Query, API REST e Segurança de Rotas

## 1. Objetivo

Permitir que componentes React busquem dados dinâmicos de um backend usando hooks personalizados, TanStack Query e uma API REST, com segurança adequada nas rotas.

---

## 2. Estrutura do Hook

- O hook personalizado utiliza o TanStack Query para gerenciar cache e estado dos dados.
- A busca é feita via `axios` para uma rota de API REST, recebendo dados JSON do backend.

```ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface DataType {
  // Defina os campos conforme sua necessidade
  id: string;
  value: string;
}

async function fetchData(param1: string, param2?: string): Promise<DataType[]> {
  const { data } = await axios.get('/api/data', {
    params: { param1, param2 }
  });
  return data;
}

export function useCustomData(
  param1: string,
  enabled: boolean,
  param2?: string
) {
  return useQuery({
    queryKey: ['customData', param1, param2],
    queryFn: () => fetchData(param1, param2),
    enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
```

---

## 3. Backend (Exemplo em Laravel)

- O controller retorna dados JSON puros, ideais para consumo por hooks/data-fetching:

```php
public function index(Request $request)
{
    // ... lógica de dados ...
    return response()->json($dados);
}
```

- A rota é definida em `routes/api.php`:

```php
Route::get('/data', [DataController::class, 'index']);
```

---

## 4. Segurança das Rotas

- Para proteger a rota, utilize middlewares como autenticação e limite de requisições:

```php
Route::middleware(['auth:sanctum', 'throttle:30,1'])
    ->get('/secure-data', [DataController::class, 'index']);
```
- `auth:sanctum`: exige autenticação do usuário.
- `throttle:30,1`: limita a 30 requisições por minuto por usuário.

---

## 5. Decisões Técnicas

- **Por que não usar Inertia para hooks?**
  - O Inertia é feito para navegação SPA e espera sempre um componente como resposta.
  - Para hooks/data-fetching, o ideal é usar `axios` ou `fetch` para consumir endpoints REST que retornam JSON puro.
- **Por que usar axios?**
  - Sintaxe simples, tratamento de erros e integração fácil com TanStack Query.

---

## 6. Resumo do Fluxo

1. O componente React chama o hook personalizado.
2. O hook faz uma requisição GET para a API REST via axios.
3. O backend retorna dados em formato JSON.
4. O TanStack Query gerencia cache, loading e refetch.
5. (Opcional) A rota pode ser protegida por autenticação e limite de requisições.

---

## 7. Referências
- [TanStack Query](https://tanstack.com/query/latest)
- [Laravel API Authentication (Sanctum)](https://laravel.com/docs/10.x/sanctum)
- [Inertia.js - Shared Data](https://inertiajs.com/shared-data#sharing-data) 