# TanStack Query - Melhores Práticas Implementadas

## Problema Resolvido

O usuário não conseguia editar dados em formulários porque eles estavam sendo atualizados constantemente, não permitindo que ele alterasse mais de 2 letras. Isso acontecia porque:

1. O componente estava usando `queryClient.getQueryData()` diretamente no render
2. Cada mudança disparava `updateField()` que atualizava o cache imediatamente
3. O cache atualizado causava re-render do componente
4. O ciclo se repetia infinitamente

## Solução Implementada

### 1. Hook Customizado para Formulários (`usePlanejamentoForm`)

Criamos um hook que segue as melhores práticas do TanStack Query:

```typescript
export function usePlanejamentoForm() {
  // Estado local para evitar re-renders excessivos
  const [formData, setFormData] = useState<Partial<Planejamento>>({});
  
  // Debounce para atualizações do cache
  const updateFieldWithDebounce = useCallback((path: string, value: any, delay: number = 500) => {
    // Atualiza estado local imediatamente
    setFormData(prev => { /* ... */ });
    
    // Agenda atualização do cache com delay
    debounceRefs.current[path] = setTimeout(() => {
      updateField(path, value);
    }, delay);
  }, [updateField]);
  
  // Atualização imediata para selects, botões, etc.
  const updateFieldImmediate = useCallback((path: string, value: any) => {
    setFormData(prev => { /* ... */ });
    updateField(path, value);
  }, [updateField]);
}
```

### 2. Cancelamento de Queries (`cancelQueries`)

Implementamos cancelamento de queries em andamento conforme documentação:

```typescript
const cancelQueries = async () => {
  await queryClient.cancelQueries({ queryKey: ['planejamento'], exact: true });
};
```

### 3. Atualizações Otimistas com `setQueryData`

Usamos a função updater conforme documentação:

```typescript
queryClient.setQueryData<Planejamento>(['planejamento'], (oldData) => {
  if (!oldData) return updatedData;
  
  const newData = { ...oldData };
  // Atualizações imutáveis
  return newData;
});
```

## Melhores Práticas Aplicadas

### 1. **Estado Local para Formulários**
- ✅ Usar estado local para campos de formulário
- ✅ Sincronizar com cache apenas quando necessário
- ❌ Evitar usar cache diretamente no render

### 2. **Debounce para Inputs de Texto**
- ✅ Implementar debounce para campos de texto
- ✅ Atualização imediata para selects e botões
- ❌ Evitar atualizações a cada caractere

### 3. **Cancelamento de Queries**
- ✅ Cancelar queries em andamento antes de otimistic updates
- ✅ Usar `cancelQueries()` conforme documentação
- ❌ Deixar queries conflitantes rodando

### 4. **Atualizações Imutáveis**
- ✅ Usar função updater em `setQueryData`
- ✅ Sempre criar novos objetos
- ❌ Mutar dados existentes

### 5. **Configuração de Cache**
- ✅ Usar `staleTime: Infinity` para dados estáticos
- ✅ Invalidar cache manualmente quando necessário
- ❌ Deixar cache expirar automaticamente

## Exemplo de Uso

```typescript
export function MeuComponente() {
  const { getFieldValue, updateFieldWithDebounce, updateFieldImmediate } = usePlanejamentoForm();
  
  return (
    <div>
      {/* Campo de texto com debounce */}
      <input
        value={getFieldValue('objeto.descricao') || ''}
        onChange={(e) => updateFieldWithDebounce('objeto.descricao', e.target.value)}
      />
      
      {/* Select com atualização imediata */}
      <Select
        value={getFieldValue('objeto.tipo') || ''}
        onValueChange={(value) => updateFieldImmediate('objeto.tipo', value)}
      >
        {/* options */}
      </Select>
    </div>
  );
}
```

## Benefícios

1. **Performance**: Sem re-renders excessivos
2. **UX**: Usuário pode digitar normalmente
3. **Cache**: Mantém sincronização com backend
4. **Manutenibilidade**: Código limpo e reutilizável
5. **Conformidade**: Segue documentação oficial do TanStack Query

## Referências

- [TanStack Query - QueryClient](https://tanstack.com/query/latest/docs/reference/QueryClient)
- [TanStack Query - Optimistic Updates](https://tanstack.com/query/latest/docs/guides/optimistic-updates)
- [TanStack Query - Cancellation](https://tanstack.com/query/latest/docs/guides/query-cancellation) 