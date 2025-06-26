# Estrutura do Planejamento - Documentação

## Visão Geral

O sistema de Planejamento foi simplificado para usar uma estrutura unificada onde o `document` é o planejamento e o `DocumentResource` sempre retorna a estrutura correta dos dados.

## Arquitetura

### Backend (PHP)

#### 1. DocumentResource
```php
// app/Http/Resources/DocumentResource.php
class DocumentResource extends JsonResource
{
    use PlanejamentoTrait, DFDTrait, ETPTrait, TRTrait;

    public function toArray(Request $request): array
    {
        $baseData = [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'document_type' => $this->document_type,
            'status' => $this->status,
            'processo_id' => $this->processo_id,
            'usuario_id' => $this->usuario_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];

        // Garante estrutura consistente baseada no tipo de documento
        $transformedMetadata = $this->transformMetadataByType($this->document_type, $this->metadata ?? []);
        
        return array_merge($baseData, [
            'metadata' => $transformedMetadata,
            'vinculacoes' => $this->vinculacoes ?? [],
        ]);
    }
}
```

#### 2. PlanejamentoTrait
```php
// app/Traits/Documents/PlanejamentoTrait.php
trait PlanejamentoTrait
{
    public function transformToPlanejamento(array $metadata): array
    {
        $structure = [
            'objeto' => [
                'objetoContratacao' => $metadata['objeto'] ?? '',
                'tipoObjeto' => $metadata['tipoObjeto'] ?? 'bens',
            ],
            'detalhamento' => [
                'justificativaTecnica' => $metadata['descricaoNecessidade'] ?? '',
                'beneficiosEsperados' => $metadata['beneficiosEsperados'] ?? '',
                // ... outros campos
            ],
            // ... outras seções
        ];
        
        return array_merge($structure, $metadata);
    }
}
```

#### 3. DocumentController
```php
// app/Http/Controllers/DocumentController.php
public function getOrCreateDocument(string $type, Request $request)
{
    $document = Arquivo::where('processo_id', $processo_id)
        ->where('document_type', $type)
        ->first();
        
    if ($document) {
        return Inertia::render("Espadas/{$type}/Create", [
            'auth' => ['user' => Auth::user()],
            'setor' => Setor::all()->toArray(),
            'document' => new DocumentResource($document) // Estrutura já transformada
        ]);
    }
    
    // Criação de novo documento...
}
```

### Frontend (React/TypeScript)

#### 1. Interface Planejamento
```typescript
// resources/js/App/hooks/Espada1/usePlanejamento.ts
export interface Planejamento {
    objeto: {
        objetoContratacao: string;
        tipoObjeto: string;
    };
    detalhamento: {
        justificativaTecnica: string;
        beneficiosEsperados: string;
        riscosIdentificados: string;
        alternativasAnalisadas: string;
        mesEstimado: string;
        grauImportancia: string;
        historicoConsumo: string;
        criteriosSustentabilidade: boolean;
        detalheSustentabilidade: string;
        normasTecnicas: string;
    };
    vinculacoes: {
        [key: string]: string;
    };
}
```

#### 2. Hook usePlanejamento
```typescript
// resources/js/App/hooks/Espada1/usePlanejamento.ts
export function usePlanejamento() {
    const queryClient = useQueryClient();
    const { props } = usePage();

    const { data: planejamentoData, isLoading } = useQuery({
        queryKey: ['planejamento'],
        queryFn: async () => {
            return props.document?.data?.metadata;
        },
        initialData: props.data?.metadata,
        staleTime: Infinity,
    });

    const updateField = (path: string, value: any) => {
        const currentData = queryClient.getQueryData<Planejamento>(['planejamento']);
        if (!currentData) return;

        const keys = path.split('.');
        const updatedData = { ...currentData };
        let current: any = updatedData;

        for (let i = 0; i < keys.length - 1; i++) {
            if (current[keys[i]] === undefined) {
                current[keys[i]] = {};
            }
            current = current[keys[i]];
        }

        current[keys[keys.length - 1]] = value;
        queryClient.setQueryData<Planejamento>(['planejamento'], updatedData);
    };

    return {
        data: planejamentoData,
        isLoading,
        updateField,
    };
}
```

#### 3. Componente Principal
```typescript
// resources/js/App/Pages/Espadas/Planejamento/Create.tsx
const Planejamento: React.FC = () => {
    const { data: planejamentoData } = usePlanejamento();
    const { props } = usePage();
    
    const handleSaveDraft = async () => {
        const documentDataToSave = {
            id: props.document?.data?.id,
            processo_id: props.document?.data?.processo_id || 1,
            name: props.document?.data?.name || 'Planejamento',
            document_type: 'Planejamento',
            description: planejamentoData?.objeto?.objetoContratacao,
            metadata: {
                ...planejamentoData,
                // ... outros dados
            }
        };
        // ... lógica de salvamento
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {props.document?.data?.id ? (
                // Renderiza o formulário
            ) : (
                // Renderiza erro
            )}
        </div>
    );
};
```

#### 4. Componentes de Formulário
```typescript
// resources/js/App/Components/espadaComponente1/tabs/planejamento/ObjetoContratacaoBloco.tsx
export function ObjetoContratacaoBloco() {
    const { data: planejamento, updateField } = usePlanejamento();

    return (
        <div>
            <SugestoesIAComponent
                value={planejamento?.objeto?.objetoContratacao || ''}
                onChange={(value) => updateField('objeto.objetoContratacao', value)}
                // ... outras props
            />
            
            <Select
                value={planejamento?.objeto?.tipoObjeto || ''}
                onValueChange={(value) => updateField('objeto.tipoObjeto', value)}
            >
                {/* ... opções */}
            </Select>
        </div>
    );
}
```

#### 5. Componente de Visualização
```typescript
// resources/js/App/Components/espadaComponente1/tabs/planejamento/PlanejamentoViewer.tsx
export function PlanejamentoViewer() {
    const { data: planejamento } = usePlanejamento();

    if (!planejamento) {
        return <div>Carregando dados do planejamento...</div>;
    }

    return (
        <div>
            <section>
                <h2>Objeto da Contratação</h2>
                <p>{planejamento.objeto?.objetoContratacao || 'Não informado'}</p>
                <p>{planejamento.objeto?.tipoObjeto || 'Não informado'}</p>
            </section>
            
            <section>
                <h2>Detalhamento</h2>
                <p>{planejamento.detalhamento?.justificativaTecnica || 'Não informado'}</p>
                <p>{planejamento.detalhamento?.beneficiosEsperados || 'Não informado'}</p>
            </section>
        </div>
    );
}
```

## Fluxo de Dados

### 1. Criação/Atualização
```
Frontend (formData) → DocumentController → DocumentResource → Frontend (document)
```

### 2. Leitura
```
Database → DocumentResource → Frontend (document) → usePlanejamento → Componentes
```

### 3. Estrutura de Props
```typescript
{
  auth: { user: User },
  setor: Setor[],
  document: {
    data: {
      id: number,
      name: string,
      description: string,
      document_type: string,
      status: string,
      processo_id: number,
      usuario_id: number,
      created_at: string,
      updated_at: string,
      metadata: Planejamento, // Dados estruturados
      vinculacoes: object
    }
  }
}
```

## Vantagens da Estrutura

### ✅ Simplicidade
- **Um único ponto de verdade**: `document` contém todos os dados
- **Resource único**: `DocumentResource` sempre retorna estrutura correta
- **Menos props**: Apenas `document` nos props

### ✅ Tipagem Forte
- **Interface Planejamento**: Garante consistência dos dados
- **TypeScript**: Detecta erros em tempo de desenvolvimento
- **Operador `?`**: Tratamento seguro de campos opcionais

### ✅ Manutenibilidade
- **Estrutura clara**: Fácil de entender e modificar
- **Separação de responsabilidades**: Backend estrutura, frontend consome
- **Reutilização**: Mesma estrutura para diferentes tipos de documento

### ✅ Performance
- **Cache otimizado**: React Query gerencia o estado
- **Atualizações otimistas**: Interface responsiva
- **Dados estruturados**: Evita transformações desnecessárias

## Exemplos de Uso

### Acesso a Campos
```typescript
// Campos simples
planejamento?.objeto?.objetoContratacao

// Campos aninhados
planejamento?.detalhamento?.justificativaTecnica

// Campos com fallback
planejamento?.vinculacoes?.ppa || 'Não informado'
```

### Atualização de Campos
```typescript
// Campo simples
updateField('objeto.objetoContratacao', 'Novo valor');

// Campo aninhado
updateField('detalhamento.justificativaTecnica', 'Nova justificativa');
```

### Validação
```typescript
// Verificação de existência
if (!planejamento) {
    return <div>Carregando...</div>;
}

// Verificação de campos obrigatórios
if (!planejamento.objeto?.objetoContratacao) {
    return <div>Campo obrigatório não preenchido</div>;
}
```

## Considerações

### Operador `?` (Optional Chaining)
- **Uso consistente**: Todos os componentes usam `?` para campos opcionais
- **Fallbacks**: Sempre fornecer valor padrão (`|| ''`, `|| 'Não informado'`)
- **Performance**: Evita erros de runtime

### Estrutura de Dados
- **Consistência**: Mesma estrutura no backend e frontend
- **Extensibilidade**: Fácil adicionar novos campos
- **Compatibilidade**: Mantém compatibilidade com dados existentes

### Cache e Estado
- **React Query**: Gerencia cache automaticamente
- **Atualizações otimistas**: Interface responsiva
- **Sincronização**: Estado sempre sincronizado com props 