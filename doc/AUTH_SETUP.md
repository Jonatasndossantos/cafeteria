# Configuração de Autenticação para Supabase Users

## 🔧 **Problema Resolvido**

O erro 401 (Unauthorized) foi resolvido implementando autenticação Bearer token no axios.

**✅ Erro de dependência circular corrigido!**

## 📋 **O que foi implementado**

### 1. **Helper de Autenticação** (`resources/js/lib/auth.ts`)
- ✅ Função `getAuthToken()` - Busca token de múltiplas fontes
- ✅ Função `configureAxiosAuth(axiosInstance)` - Configura headers do axios
- ✅ Função `saveAuthToken()` - Salva token no storage
- ✅ Função `clearAuthToken()` - Remove token
- ✅ Função `isAuthenticated()` - Verifica se está autenticado
- ✅ **Sem dependência circular** - Não importa axios diretamente

### 2. **Axios Configurado** (`resources/js/axios.ts`)
- ✅ Interceptor de requisição com autenticação automática
- ✅ Interceptor de resposta com tratamento de erro 401
- ✅ Configuração automática de headers Authorization
- ✅ Passa instância do axios para `configureAxiosAuth()`

### 3. **Hook Atualizado** (`resources/js/hooks/useSupabaseUsers.ts`)
- ✅ Usa helper de autenticação
- ✅ Configura token antes de cada requisição
- ✅ Tratamento de erros melhorado
- ✅ Passa instância do axios para `configureAxiosAuth()`

## 🔑 **Como obter o token de autenticação**

### **Opção 1: Token do Laravel Sanctum**

Se você está usando Laravel Sanctum, o token pode estar disponível em:

```php
// No seu controller ou middleware
$token = $request->user()->createToken('supabase-admin')->plainTextToken;
```

### **Opção 2: Token do localStorage/sessionStorage**

Salve o token após o login:

```javascript
// Após login bem-sucedido
import { saveAuthToken } from '../lib/auth';

// Salvar token
saveAuthToken('seu-token-aqui', true); // true = persistente
```

### **Opção 3: Meta tag no HTML**

Adicione no seu layout principal:

```html
<meta name="auth-token" content="seu-token-aqui">
```

### **Opção 4: Token do CSRF (temporário)**

O sistema também tenta usar o token CSRF como fallback.

## 🚀 **Como testar**

### 1. **Verificar se o token está sendo enviado**

Abra o DevTools (F12) → Network → Faça uma requisição → Verifique se o header `Authorization: Bearer <token>` está presente.

### 2. **Testar via console**

```javascript
// No console do navegador
import { getAuthToken } from './lib/auth';

// Verificar token
console.log('Token:', getAuthToken());

// Testar requisição
fetch('/api/supabase/users')
  .then(response => response.json())
  .then(data => console.log('Usuários:', data));
```

### 3. **Debug no Laravel**

Adicione logs no controller para verificar se a autenticação está chegando:

```php
public function index(Request $request): JsonResponse
{
    // Debug: verificar headers
    Log::info('Authorization header: ' . $request->header('Authorization'));
    Log::info('User: ' . ($request->user() ? $request->user()->id : 'null'));
    
    // ... resto do código
}
```

## 🔒 **Segurança**

### **Rotas Protegidas**
As rotas do Supabase estão protegidas por `auth:sanctum`:

```php
Route::middleware(['auth:sanctum'])->prefix('supabase')->group(function () {
    // Rotas protegidas aqui
});
```

### **Token Management**
- ✅ Tokens são verificados antes de cada requisição
- ✅ Tokens expirados redirecionam para login
- ✅ Tokens são limpos automaticamente

## 🐛 **Troubleshooting**

### **Erro 401 persistente**
1. Verifique se o token está sendo salvo corretamente
2. Verifique se o token não expirou
3. Verifique se o middleware `auth:sanctum` está funcionando

### **Token não encontrado**
1. Verifique se o token está sendo salvo após login
2. Verifique se o localStorage/sessionStorage está disponível
3. Verifique se as meta tags estão presentes

### **CORS errors**
1. Verifique configuração do Sanctum em `config/sanctum.php`
2. Verifique se `withCredentials: true` está configurado

### **Erro de dependência circular**
✅ **RESOLVIDO** - O helper `auth.ts` não importa mais o axios diretamente

## 📝 **Exemplo de uso completo**

```javascript
// 1. Após login, salvar token
import { saveAuthToken } from '../lib/auth';

const handleLogin = async (credentials) => {
  const response = await axios.post('/api/login', credentials);
  
  if (response.data.token) {
    saveAuthToken(response.data.token, true);
  }
};

// 2. Usar o hook (autenticação automática)
import { useSupabaseUsers } from '../hooks/useSupabaseUsers';

const MyComponent = () => {
  const { users, loading, fetchUsers } = useSupabaseUsers();
  
  useEffect(() => {
    fetchUsers(); // Token será enviado automaticamente
  }, []);
  
  // ... resto do componente
};
```

## ✅ **Status da Implementação**

- ✅ Autenticação Bearer token configurada
- ✅ Interceptors do axios funcionando
- ✅ Helper de autenticação criado (sem dependência circular)
- ✅ Hook atualizado
- ✅ Tratamento de erros implementado
- ✅ Redirecionamento para login em caso de erro 401
- ✅ **Erro de dependência circular corrigido**

Agora o sistema deve funcionar corretamente com autenticação! 🎉 
