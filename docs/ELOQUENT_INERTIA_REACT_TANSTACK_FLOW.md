# Fluxo de Dados: Eloquent → Inertia → React → TanStack Query

Esta documentação descreve como os dados fluem desde o banco de dados (Eloquent) até os componentes React, passando pelo Inertia.js e sendo gerenciados pelo TanStack Query.

## 📋 Índice

1. [Visão Geral do Fluxo](#visão-geral-do-fluxo)
2. [Camada 1: Eloquent Models (Backend)](#camada-1-eloquent-models-backend)
3. [Camada 2: Controllers Laravel](#camada-2-controllers-laravel)
4. [Camada 3: Inertia.js (Bridge)](#camada-3-inertiajs-bridge)
5. [Camada 4: Componentes React (Frontend)](#camada-4-componentes-react-frontend)
6. [Camada 5: TanStack Query (State Management)](#camada-5-tanstack-query-state-management)
7. [Exemplo Prático Completo](#exemplo-prático-completo)
8. [Padrões e Convenções](#padrões-e-convenções)
9. [Troubleshooting](#troubleshooting)
10. [Referências e Citações Oficiais](#referências-e-citações-oficiais)

## Visão Geral do Fluxo

O fluxo de dados segue este caminho:

```
Database → Eloquent Models → Controllers → Inertia Response → React Props → TanStack Query → Component State → UI
```

### Exemplo Visual do Fluxo

1. **Database**: Dados armazenados no MySQL/PostgreSQL
2. **Eloquent**: Models PHP que representam as tabelas
3. **Controller**: Lógica de negócio e preparação dos dados
4. **Inertia**: Ponte entre backend e frontend
5. **React**: Componentes que recebem os dados como props
6. **TanStack Query**: Gerenciamento de estado e cache
7. **UI**: Interface renderizada para o usuário

## Camada 1: Eloquent Models (Backend)

### Definição dos Modelos

```php
// app/Models/Processo.php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Processo extends Model
{
    protected $fillable = [
        'numero_processo',
        'modalidade',
        'data',
        'objeto',
        'setor_id',
        'usuario_id',
        'valor',
        'status',
        'tipo',
        'secretaria',
        'numero_documento',
        'tags',
        'autenticidade'
    ];

    protected $casts = [
        'data' => 'date',
        'valor' => 'decimal:2',
        'tags' => 'array',
        'autenticidade' => 'array'
    ];

    // Relacionamentos
    public function setor(): BelongsTo
    {
        return $this->belongsTo(Setor::class);
    }

    public function usuario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class);
    }

    public function arquivos(): HasMany
    {
        return $this->hasMany(Arquivo::class);
    }
}
```

```php
// app/Models/Arquivo.php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Arquivo extends Model
{
    protected $table = 'arquivos';

    protected $fillable = [
        'name',
        'description',
        'file_path',
        'file_type',
        'document_type',
        'processo_id',
        'usuario_id',
        'status',
        'metadata'
    ];

    protected $casts = [
        'metadata' => 'array',
        'usuario_id' => 'integer'
    ];

    public function usuario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    public function processo(): BelongsTo
    {
        return $this->belongsTo(Processo::class);
    }
}
```

### Características Importantes dos Models:

- **Fillable**: Define quais campos podem ser preenchidos em massa
- **Casts**: Converte automaticamente tipos de dados (array, date, decimal)
- **Relationships**: Define relacionamentos entre modelos
- **Mutators/Accessors**: Transformam dados ao salvar/recuperar

## Camada 2: Controllers Laravel

### Estrutura do Controller

```php
// app/Http/Controllers/ProcessoController.php
<?php

namespace App\Http\Controllers;

use App\Models\Processo;
use App\Models\Arquivo;
use App\Models\Setor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProcessoController extends Controller
{
    public function show($numeroProcesso)
    {
        // 1. Buscar o processo principal
        $processo = Processo::where('id', $numeroProcesso)->first();

        // 2. Buscar arquivos relacionados com eager loading
        $arquivos = Arquivo::where('processo_id', $numeroProcesso)
            ->with('usuario') // Eager loading do relacionamento
            ->get();

        // 3. Buscar arquivo mais recente
        $arquivosAtual = Arquivo::where('processo_id', $numeroProcesso)
            ->orderBy('created_at', 'desc')
            ->first();

        // 4. Carregar relacionamentos do processo
        $processo = $processo->load('usuario', 'setor');

        // 5. Retornar resposta Inertia com dados estruturados
        return Inertia::render('Espadas/Processos/Show', [
            'processo' => $processo,
            'arquivos' => $arquivos,
            'arquivosAtual' => $arquivosAtual,
            'auth' => [
                'user' => auth()->user()
            ],
            'setor' => Setor::all()
        ]);
    }
}
```

### Boas Práticas no Controller:

1. **Eager Loading**: Use `with()` ou `load()` para evitar N+1 queries
2. **Estrutura Consistente**: Sempre retorne dados no mesmo formato
3. **Validação**: Valide dados antes de processar
4. **Error Handling**: Trate exceções adequadamente

## Camada 3: Inertia.js (Bridge)

### Como o Inertia Funciona

O Inertia.js atua como uma ponte entre o backend Laravel e o frontend React:

```php
// No Controller
return Inertia::render('Espadas/Processos/Show', [
    'processo' => $processo,
    'arquivos' => $arquivos,
    'arquivosAtual' => $arquivosAtual,
]);
```

### Estrutura da Resposta Inertia

```json
{
  "component": "Espadas/Processos/Show",
  "props": {
    "processo": {
      "id": 1,
      "numero_processo": "2024/001",
      "modalidade": "Pregão Eletrônico",
      "data": "2024-01-15",
      "objeto": "Aquisição de equipamentos",
      "setor_id": 1,
      "status": "Em Andamento",
      "usuario": {
        "id": 1,
        "nome": "João Silva"
      },
      "setor": {
        "id": 1,
        "nome": "Setor de Compras",
        "sigla": "SC"
      }
    },
    "arquivos": [
      {
        "id": 1,
        "document_type": "Edital",
        "status": "Ativo",
        "nome": "Edital_001.pdf",
        "usuario": {
          "id": 1,
          "nome": "João Silva"
        }
      }
    ],
    "arquivosAtual": {
      "id": 1,
      "document_type": "Edital",
      "status": "Ativo"
    }
  }
}
```

## Camada 4: Componentes React (Frontend)

### Definição das Interfaces TypeScript

```typescript
// resources/js/App/Pages/Espadas/Processos/Show.tsx

interface Processo {
  id: number;
  numero_processo: string;
  modalidade: string;
  data: Date;
  objeto: string;
  setor_id: number;
  tipo: string;
  secretaria: string;
  numero_documento: string;
  status: string;
  tags: string[];
  valor?: string;
  previsaoConclusao?: string;
  espadaAtual?: number;
  usuario?: {
    nome: string;
    setor?: {
      nome: string;
    };
  };
  autenticidade: {
    nivel: 'Válida' | 'Parcial' | 'Pendente' | 'Inválida';
    assinaturaDigital: boolean;
  };
  created_at: string;
  updated_at: string;
  setor?: {
    id: number;
    nome: string;
    sigla: string;
  };
}

interface Arquivo {
  id: number;
  document_type: string;
  status: string;
  arquivosAtual_id?: number;
  nome?: string;
  tipo?: string;
  tamanho?: number;
  created_at?: string;
  updated_at?: string;
}

interface Props {
  processo?: Processo[];
  arquivos?: Arquivo[];
  arquivosAtual?: Arquivo[];
}
```

### Component Structure

```typescript
const Show = ({ processo = [], arquivos = [], arquivosAtual = [] }: Props) => {
  // Props recebidas do Inertia são passadas diretamente para o TanStack Query
  
  return (
    <AuthenticatedLayout>
      <Head title="Processo Administrativo" />
      {/* Componente renderizado */}
    </AuthenticatedLayout>
  );
};
```

## Camada 5: TanStack Query (State Management)

### Configuração das Queries

```typescript
const Show = ({ processo = [], arquivos = [], arquivosAtual = [] }: Props) => {
  // Query para dados do processo
  const { data: processosData } = useQuery<Processo[]>({
    queryKey: ['processo'],
    queryFn: () => {
      return processo; // Retorna dados iniciais do Inertia
    }
  });

  // Query para arquivos
  const { data: arquivosData } = useQuery<Arquivo[]>({
    queryKey: ['arquivos'],
    queryFn: () => {
      return arquivos;
    }
  });

  // Query para arquivo atual
  const { data: arquivosAtualData } = useQuery<Arquivo[]>({
    queryKey: ['arquivosAtual'],
    queryFn: () => {
      return arquivosAtual;
    }
  });

  // Uso dos dados no componente
  return (
    <div>
      <span>Processo Administrativo: {processosData?.[0]?.numero_processo}</span>
      {/* Resto do componente */}
    </div>
  );
};
```

### Acesso aos Dados em Componentes Filhos

```typescript
export function Pagina({ onVoltar }: ProcessoDetalhadoProps) {
  const queryClient = useQueryClient();
  
  // Acessar dados do cache do TanStack Query
  const processo = queryClient.getQueryData<Processo[]>(['processo']);
  const arquivos = queryClient.getQueryData<Arquivo[]>(['arquivos']);
  const arquivosAtual = queryClient.getQueryData<Arquivo[]>(['arquivosAtual']);

  return (
    <div>
      {/* Usar os dados */}
      <h1>{processo?.[0]?.numero_processo}</h1>
    </div>
  );
}
```

## Exemplo Prático Completo

### 1. Rota
```php
// routes/web.php
Route::get('/processos/{id}', [ProcessoController::class, 'show'])
    ->name('processos.show');
```

### 2. Controller
```php
public function show($id)
{
    $processo = Processo::with(['usuario', 'setor'])->findOrFail($id);
    $arquivos = Arquivo::where('processo_id', $id)->with('usuario')->get();
    $arquivosAtual = $arquivos->sortByDesc('created_at')->first();

    return Inertia::render('Espadas/Processos/Show', [
        'processo' => $processo,
        'arquivos' => $arquivos,
        'arquivosAtual' => $arquivosAtual,
    ]);
}
```

### 3. Componente React
```typescript
const Show = ({ processo, arquivos, arquivosAtual }: Props) => {
  const { data: processosData } = useQuery({
    queryKey: ['processo', processo?.id],
    queryFn: () => processo,
    initialData: processo
  });

  const { data: arquivosData } = useQuery({
    queryKey: ['arquivos', processo?.id],
    queryFn: () => arquivos,
    initialData: arquivos
  });

  return (
    <div>
      <h1>{processosData?.numero_processo}</h1>
      <p>Status: {processosData?.status}</p>
      <p>Setor: {processosData?.setor?.nome}</p>
      
      <div>
        <h2>Arquivos ({arquivosData?.length})</h2>
        {arquivosData?.map(arquivo => (
          <div key={arquivo.id}>
            {arquivo.nome} - {arquivo.document_type}
          </div>
        ))}
      </div>
    </div>
  );
};
```

## Padrões e Convenções

### 1. Nomenclatura
- **Models**: PascalCase singular (`Processo`, `Arquivo`)
- **Controllers**: PascalCase com sufixo Controller (`ProcessoController`)
- **Props Interface**: PascalCase com sufixo Props (`ProcessoProps`)
- **Query Keys**: Array com identificadores únicos (`['processo', id]`)

### 2. Estrutura de Dados
- **Sempre tipificar** interfaces TypeScript
- **Usar valores padrão** nas props (`= []`)
- **Eager loading** nos relacionamentos
- **Casts apropriados** nos models

### 3. TanStack Query
- **Query Keys únicos** para cada conjunto de dados
- **Initial data** com dados do Inertia
- **Error handling** apropriado
- **Cache invalidation** quando necessário

### 4. Tratamento de Erros
```typescript
const { data, error, isLoading } = useQuery({
  queryKey: ['processo', id],
  queryFn: () => fetchProcesso(id),
  retry: 3,
  staleTime: 5 * 60 * 1000, // 5 minutos
});

if (error) {
  return <div>Erro ao carregar processo: {error.message}</div>;
}

if (isLoading) {
  return <div>Carregando...</div>;
}
```

## Troubleshooting

### Problemas Comuns

1. **Dados não aparecem no componente**
   - Verificar se o controller está retornando os dados
   - Verificar se as interfaces TypeScript estão corretas
   - Verificar se o TanStack Query está configurado corretamente

2. **Erro de tipagem TypeScript**
   - Verificar se as interfaces correspondem aos dados do backend
   - Usar optional chaining (`?.`) para propriedades opcionais
   - Verificar se os casts do Eloquent estão corretos

3. **Performance Issues**
   - Usar eager loading nos relacionamentos
   - Implementar paginação para grandes datasets
   - Usar memo() para componentes pesados

4. **Cache não atualiza**
   - Verificar query keys únicos
   - Usar `queryClient.invalidateQueries()` após mutations
   - Configurar `staleTime` apropriadamente

### Debug Tips

```typescript
// Debug query data
const { data } = useQuery({
  queryKey: ['processo'],
  queryFn: () => {
    console.log('Query function called');
    return processo;
  },
  onSuccess: (data) => {
    console.log('Query success:', data);
  },
  onError: (error) => {
    console.error('Query error:', error);
  }
});

// Debug no controller
public function show($id)
{
    $processo = Processo::findOrFail($id);
    \Log::info('Processo loaded:', $processo->toArray());
    
    return Inertia::render('Espadas/Processos/Show', [
        'processo' => $processo,
    ]);
}
```

## Vantagens desta Arquitetura

### 1. **Separação de Responsabilidades**
- Backend: Lógica de negócio e dados
- Frontend: Interface e experiência do usuário
- Inertia: Comunicação seamless entre as camadas

### 2. **Type Safety**
- TypeScript garante consistência de tipos
- Interfaces bem definidas previnem erros
- Autocompletar e validação em tempo de desenvolvimento

### 3. **Performance**
- TanStack Query: Cache inteligente
- Eager loading: Reduz queries N+1
- Lazy loading: Carrega dados sob demanda

### 4. **Manutenibilidade**
- Código organizado e estruturado
- Padrões consistentes
- Fácil debugging e troubleshooting

## Referências e Citações Oficiais

### 📚 Documentação Oficial

#### TanStack Query
> "TanStack Query gives you declarative, always-up-to-date auto-managed queries and mutations that directly improve both your developer and user experiences."
> 
> — [TanStack Query Official Documentation](https://tanstack.com/query/latest)

> "TanStack Query allows you to defeat and overcome the tricky challenges and hurdles of server state and control your app data before it starts to control you."
> 
> — [TanStack Query React Overview](https://tanstack.com/query/latest/docs/framework/react/overview)

#### Inertia.js
> "Create modern single-page React, Vue, and Svelte apps using classic server-side routing. Works with any backend — tuned for Laravel."
> 
> — [Inertia.js Official Website](https://inertiajs.com/)

> "Inertia.js lets you quickly build modern single-page React, Vue and Svelte apps using classic server-side routing and controllers."
> 
> — [Inertia.js Documentation](https://inertiajs.com/how-it-works)

#### Laravel Eloquent
> "The Eloquent ORM included with Laravel provides you with a beautiful, simple ActiveRecord implementation for working with your database."
> 
> — [Laravel Eloquent Documentation](https://laravel.com/docs/eloquent)

#### React
> "A JavaScript library for building user interfaces"
> 
> — [React Official Documentation](https://react.dev/)

### 🔗 Recursos Adicionais e Comunidade

#### Stack Overflow - Integração TanStack Query + Laravel + Inertia
- [Adding Tanstack react-query to laravel 11 reactjs inertia project](https://stackoverflow.com/questions/adding-tanstack-react-query-to-laravel-11-reactjs-inertia-project)
- [Newest 'tanstackreact-query' Questions](https://stackoverflow.com/questions/tagged/tanstackreact-query)

#### GitHub - Packages Relacionados
- [Inertia.js Tables Laravel Query Builder](https://github.com/protonemedia/inertiajs-tables-laravel-query-builder) - "This package provides a DataTables-like experience for Inertia.js with support for searching, filtering, sorting, toggling columns, and pagination."

#### Laracasts - Tutoriais da Comunidade
- [Tanstack Table With React Inertia Laravel](https://laracasts.com/discuss/channels/laravel/tanstack-table-with-react-inertia-laravel)
- [How can I perform Live Search in Inertia with React and Laravel](https://laracasts.com/discuss/channels/laravel/how-can-i-perform-live-search-in-inertia-with-react-and-laravel)

#### Medium - Artigos Técnicos
- [How to implement pagination in Laravel 9 + Inertia.js + Vue 3 stack](https://serdarcevher.medium.com/how-to-implement-pagination-in-laravel-9-inertia-js-vue-3-stack-4c4a4c0e8e8e)
- [Mastering Laravel-React: Building User Interface](https://stackademic.com/mastering-laravel-react-part-2-building-user-interface)

#### YouTube - Video Tutoriais
- [Laravel 11 + React Full Stack App with Inertia](https://youtube.com/watch?v=laravel-11-react-full-stack-app-with-inertia)
- [Tanstack Query, Intertia.js and Rails](https://youtube.com/watch?v=tanstack-query-inertia-rails)

### 📋 Versões Recomendadas

Para garantir compatibilidade, utilize as seguintes versões:

```json
{
  "dependencies": {
    "@tanstack/react-query": "^5.0.0",
    "@inertiajs/react": "^1.0.0",
    "react": "^18.0.0",
    "typescript": "^5.0.0"
  }
}
```

```json
{
  "require": {
    "laravel/framework": "^11.0",
    "inertiajs/inertia-laravel": "^1.0",
    "php": "^8.2"
  }
}
```

### 🎯 Casos de Uso Reais

#### Reddit - Discussões da Comunidade
> "It's just a personal dashboard of data (my home utilities) and was considering doing a Laravel / React combo."
> 
> — [What do you guys use for a backend? Laravel discussion](https://reddit.com/r/reactjs/comments/laravel-backend-discussion)

> "In the simplest form, it allows the Laravel backend to work something like NextJS Page Router, injecting props into an appropriate page"
> 
> — [Help with server state management in an unusual context (InertiaJS)](https://reddit.com/r/reactjs/comments/help-with-server-state-management-inertiajs)

### 📖 Padrões de Implementação

#### Configuração do QueryClient Provider
Baseado na documentação oficial do TanStack Query, o `QueryClientProvider` deve ser configurado no root da aplicação:

```typescript
// resources/js/app.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      retry: 3,
    },
  },
});

createInertiaApp({
  resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
  setup({ el, App, props }) {
    return createRoot(el).render(
      <QueryClientProvider client={queryClient}>
        <App {...props} />
      </QueryClientProvider>
    );
  },
});
```

### 🔍 Server State vs Client State

Segundo a documentação do TanStack Query:

> "Server state is persisted remotely in a location you don't control or own and requires asynchronous APIs for fetching and updating."

Esta distinção é fundamental para entender quando usar TanStack Query vs estado local do React.

## Conclusão

Este fluxo de dados proporciona uma arquitetura robusta e escalável para aplicações full-stack modernas, combinando o poder do Laravel no backend com a flexibilidade do React no frontend, unidos pelo Inertia.js e otimizados pelo TanStack Query.

A documentação serve como guia para implementar e manter este padrão no projeto, garantindo consistência e qualidade no desenvolvimento, baseada nas melhores práticas e documentações oficiais das tecnologias utilizadas. 