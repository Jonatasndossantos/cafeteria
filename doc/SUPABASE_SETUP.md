# Configuração do Supabase Auth Administration

Este documento contém as instruções para configurar a administração de usuários do Supabase Auth no Laravel.

## 📋 Pré-requisitos

- Projeto Supabase configurado
- Service Role Key do Supabase (com permissões administrativas)
- Laravel com Inertia.js e React configurado

## 🔧 Configuração

### 1. Variáveis de Ambiente

Adicione as seguintes variáveis ao seu arquivo `.env`:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE=your-supabase-service-role-key
```

**⚠️ IMPORTANTE**: A `SUPABASE_SERVICE_ROLE` é uma chave secreta que não deve ser exposta no frontend. Ela permite acesso administrativo total aos usuários.

### 2. Onde encontrar as chaves

No painel do Supabase:
1. Acesse `Settings` → `API`
2. **URL**: Copie a `Project URL`
3. **Anon Key**: Copie a `anon public` key
4. **Service Role**: Copie a `service_role secret` key

### 3. Registro do Service Provider (se necessário)

Se não estiver funcionando automaticamente, registre o service no `config/app.php`:

```php
'providers' => [
    // ... outros providers
    App\Services\SupabaseAuthService::class,
],
```

## 🎯 Funcionalidades Implementadas

### Backend (Laravel)

#### SupabaseAuthService
- ✅ Listagem de usuários com paginação
- ✅ Busca de usuário por ID
- ✅ Criação de novos usuários
- ✅ Atualização de dados do usuário
- ✅ Exclusão de usuários
- ✅ Banimento temporário
- ✅ Confirmação de email
- ✅ Busca por email

#### SupabaseUsersController
- ✅ API RESTful completa
- ✅ Validação de dados
- ✅ Tratamento de erros
- ✅ Autenticação via Sanctum

### Frontend (React/TypeScript)

#### Componentes
- ✅ Lista de usuários com cards informativos
- ✅ Formulário de criação de usuário
- ✅ Formulário de edição de usuário
- ✅ Busca e filtros
- ✅ Confirmação de ações destrutivas
- ✅ Feedback visual com toasts

#### Funcionalidades da Interface
- ✅ Listagem com estatísticas
- ✅ Status de confirmação de email
- ✅ Ações rápidas (banir, confirmar email, deletar)
- ✅ Edição de metadata em JSON
- ✅ Indicadores visuais de loading

## 🛣️ Rotas Configuradas

### API Routes (`/api/supabase/`)
```
GET    /users              # Listar usuários
POST   /users              # Criar usuário
GET    /users/{id}         # Buscar usuário específico
PUT    /users/{id}         # Atualizar usuário
DELETE /users/{id}         # Deletar usuário
POST   /users/{id}/ban     # Banir usuário
POST   /users/{id}/unban   # Desbanir usuário
POST   /users/{id}/confirm-email # Confirmar email
```

### Web Routes
```
GET /usuarios/supabase      # Página de administração
```

## 📊 Estrutura de Dados

### Usuário Supabase (TypeScript)
```typescript
interface SupabaseUser {
  id: string;
  email?: string;
  email_confirmed_at?: string;
  created_at: string;
  updated_at?: string;
  last_sign_in_at?: string;
  app_metadata: SupabaseAppMetadata;
  user_metadata: SupabaseUserMetadata;
  // ... outros campos
}
```

## 🔒 Segurança

### Autenticação
- Todas as rotas da API são protegidas por `auth:sanctum`
- A página web requer autenticação e verificação de email
- Service Role é usada apenas no backend

### Validações
- Email obrigatório na criação
- Validação de formato JSON para metadata
- Sanitização de dados antes do envio

### Logs
- Todos os erros são logados
- Operações administrativas são trackeadas

## 🚀 Como Usar

### 1. Acessar a Página
Navegue para `/usuarios/supabase` após fazer login.

### 2. Criar Usuário
1. Clique em "Criar Usuário"
2. Preencha email (obrigatório)
3. Senha é opcional (será gerada se não fornecida)
4. Adicione metadata em formato JSON se necessário
5. Escolha se quer confirmar email automaticamente

### 3. Editar Usuário
1. Clique em "Editar" no card do usuário
2. Modifique os campos desejados
3. Para metadata, use formato JSON válido
4. Salve as alterações

### 4. Ações Rápidas
- **Confirmar Email**: Para usuários com email pendente
- **Banir**: Bane por 24h (padrão)
- **Deletar**: Remove permanentemente (confirma antes)

## 🐛 Troubleshooting

### 1. Erro 401/403
- Verifique se `SUPABASE_SERVICE_ROLE` está correta
- Confirme se a chave tem permissões administrativas

### 2. Erro de CORS
- Configure as URLs permitidas no painel do Supabase
- Verifique configuração do Laravel Sanctum

### 3. Usuários não aparecem
- Verifique se existem usuários no Supabase Auth
- Teste a conexão com a API diretamente

### 4. Erro de JSON no metadata
- Certifique-se de usar JSON válido: `{"chave": "valor"}`
- Use aspas duplas para strings

## 📈 Próximas Melhorias

- [ ] Paginação avançada
- [ ] Filtros por data de criação
- [ ] Export de dados de usuários
- [ ] Logs de atividade
- [ ] Bulk operations
- [ ] Integração com roles/permissions

## 🔗 Links Úteis

- [Supabase Auth Admin API](https://supabase.com/docs/reference/api/admin-auth)
- [Laravel HTTP Client](https://laravel.com/docs/http-client)
- [Inertia.js](https://inertiajs.com/)
- [Tailwind UI Components](https://tailwindui.com/) 
