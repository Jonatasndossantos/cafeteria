# Teste da API Supabase

## 🔧 **Status Atual**

✅ **Rotas temporariamente sem autenticação** para testes
❌ **Erro 401 resolvido** - rotas agora são públicas

## 🧪 **Como Testar**

### 1. **Teste Direto da API**

```bash
# Teste básico da API
curl -X GET "http://127.0.0.1:8000/api/supabase/users" \
  -H "Accept: application/json"
```

### 2. **Teste via Browser**

Abra no navegador:
```
http://127.0.0.1:8000/api/supabase/users
```

### 3. **Teste via Console do Navegador**

```javascript
// No console do DevTools (F12)
fetch('/api/supabase/users')
  .then(response => response.json())
  .then(data => console.log('Resposta:', data))
  .catch(error => console.error('Erro:', error));
```

### 4. **Teste via Postman/Insomnia**

- **Method**: GET
- **URL**: `http://127.0.0.1:8000/api/supabase/users`
- **Headers**: `Accept: application/json`

## 🔍 **Possíveis Respostas**

### ✅ **Sucesso (200)**
```json
{
  "users": [
    {
      "id": "uuid-do-usuario",
      "email": "usuario@exemplo.com",
      "created_at": "2024-01-01T00:00:00Z",
      // ... outros campos
    }
  ],
  "total": 1
}
```

### ❌ **Erro de Configuração Supabase (500)**
```json
{
  "error": "Erro ao buscar usuários",
  "message": "Detalhes do erro..."
}
```

### ❌ **Erro de Variáveis de Ambiente (500)**
```json
{
  "error": "Erro ao buscar usuários",
  "message": "cURL error 6: Could not resolve host..."
}
```

## 🐛 **Troubleshooting**

### **Erro 500 - Configuração Supabase**
1. Verifique se as variáveis estão no `.env`:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE=your-service-role-key
```

2. Verifique se o Laravel está carregando as variáveis:
```php
// No tinker ou controller
echo config('services.supabase.url');
echo config('services.supabase.service_role');
```

### **Erro 500 - Service Role Inválida**
1. Verifique se a Service Role está correta no painel do Supabase
2. Verifique se tem permissões administrativas
3. Teste a API diretamente no Supabase

### **Erro 500 - URL Inválida**
1. Verifique se a URL do Supabase está correta
2. Teste se consegue acessar o painel do Supabase
3. Verifique se não há espaços extras na URL

## 📋 **Logs para Debug**

Adicione logs no controller para debug:

```php
// Em app/Http/Controllers/Api/SupabaseUsersController.php
public function index(Request $request): JsonResponse
{
    // Debug: verificar configuração
    Log::info('Supabase URL: ' . config('services.supabase.url'));
    Log::info('Service Role exists: ' . (!empty(config('services.supabase.service_role')) ? 'Yes' : 'No'));
    
    $limit = $request->get('limit', 50);
    $page = $request->get('page', 1);
    $search = $request->get('search');

    if ($search) {
        $result = $this->supabaseAuth->searchUsersByEmail($search);
    } else {
        $result = $this->supabaseAuth->listUsers($limit, $page);
    }

    // Debug: verificar resultado
    Log::info('Supabase result: ' . json_encode($result));

    if (!$result['success']) {
        return response()->json([
            'error' => $result['error'],
            'message' => $result['message'] ?? null
        ], 500);
    }

    return response()->json($result['data']);
}
```

## 🚀 **Próximos Passos**

1. **Teste a API** usando um dos métodos acima
2. **Verifique os logs** do Laravel (`storage/logs/laravel.log`)
3. **Configure as variáveis** se necessário
4. **Teste a página** `/usuarios/supabase` após confirmar que a API funciona

## ⚠️ **Importante**

- As rotas estão **temporariamente sem autenticação** para testes
- **Reative a autenticação** após confirmar que tudo funciona
- **Configure as variáveis do Supabase** antes de testar

## 🔄 **Reativar Autenticação (Quando Funcionar)**

```php
// Em routes/api.php
Route::middleware(['auth:sanctum'])->prefix('supabase')->group(function () {
    // Rotas protegidas aqui
});
``` 
