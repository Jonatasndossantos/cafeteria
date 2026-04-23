# ☕ Espresso D'Amore - Sistema de Gestão para Cafeterias

Sistema web moderno desenvolvido em **Laravel 12**, **React** e **TypeScript** para gestão de fluxo de alta demanda em cafeterias. O projeto atua como o painel central da operação, integrando-se a um aplicativo mobile via **Supabase** e utilizando **Inteligência Artificial (OpenAI)** para geração inteligente de documentos de pedidos.

## 🚀 Tecnologias

- **Backend**: Laravel 12 (PHP 8.2+)
- **Frontend**: React 18 + TypeScript + TailwindCSS
- **Integração Backend/Frontend**: Inertia.js
- **Build Tool**: Vite
- **Sincronização Mobile/Real-time**: Supabase
- **Inteligência Artificial**: API da OpenAI (Integração nativa)
- **Database**: MySQL/PostgreSQL

## 🎯 Funcionalidades Principais

- 🍽️ **Painel de Pedidos (KDS)**: Acompanhamento em tempo real dos pedidos recebidos (via PDV Web ou App Mobile) para a equipe de baristas/cozinha.
- 📱 **Integração Mobile**: Pedidos realizados no aplicativo mobile dos clientes chegam automaticamente ao painel da cozinha utilizando o backend-as-a-service do Supabase.
- 🤖 **Automação com IA**: Geração inteligente de resumos, tickets detalhados e notas de pedidos através da integração com Inteligência Artificial.
- 📦 **Gestão de Cardápio (CRUD)**: Controle completo de produtos (Cafés, Chás, Salgados, Doces) com preços, categorias e imagens.
- ✨ **Vitrine Premium**: Landing page elegante e responsiva com animações fluidas para atrair clientes.

## 📋 Pré-requisitos

- PHP 8.2 ou superior
- Composer 2.0+
- Node.js 18+ e npm
- MySQL 8.0+ ou PostgreSQL 13+
- Conta ativa no Supabase (para integração Mobile/Storage)
- Chave de API da OpenAI

## 🛠️ Instalação

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd cafeteria
```

### 2. Instale as dependências PHP e JS
```bash
composer install
npm install
```

### 3. Configure o ambiente
Copie o arquivo de exemplo e gere a chave da aplicação:
```bash
cp .env.example .env
php artisan key:generate
```

### 4. Configure as Variáveis de Ambiente
Edite o arquivo `.env` e configure as credenciais do banco de dados, Supabase e OpenAI:
```env
# Banco de Dados
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cafeteria
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha

# Supabase (Integração Mobile e Imagens)
SUPABASE_URL=sua_url_supabase
SUPABASE_KEY=sua_chave_supabase

# OpenAI (Geração de Tickets e Resumos)
OPENAI_API_KEY=sua_chave_openai
```

### 5. Banco de Dados e Seeders
```bash
php artisan migrate
php artisan db:seed
```

### 6. Inicie o Servidor de Desenvolvimento
Você pode rodar os serviços separadamente ou através do comando combinado do Composer:
```bash
composer run dev
```

*(Isso iniciará simultaneamente o `php artisan serve`, fila de jobs, Laravel Pail e o `npm run dev` do Vite).*

## 🏗️ Estrutura do Projeto

```
cafeteria/
├── app/
│   ├── Http/Controllers/    # Controladores do fluxo da Cafeteria
│   ├── Models/              # Modelos (Produto, Pedido, etc.)
│   └── Services/            # Lógica de negócio e integrações (IA, Supabase)
├── resources/js/
│   ├── Pages/               # Páginas da aplicação React
│   │   ├── Welcome.tsx      # Landing page Premium
│   │   ├── Produtos/        # CRUD do Cardápio
│   │   └── Orders/          # PDV e Painel de Cozinha (OrdersPanel)
│   └── Components/          # Componentes reutilizáveis
└── database/                # Migrations e Seeders
```

## 🤝 Como Contribuir

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovoRecurso`)
3. Faça commit de suas mudanças (`git commit -m 'Add NovoRecurso'`)
4. Faça push para a branch (`git push origin feature/NovoRecurso`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ☕ e ❤️ para elevar a experiência em cafeterias.**
