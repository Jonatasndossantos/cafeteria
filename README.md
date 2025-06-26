# 🏛️ Cafeteria - Sistema de Gestão Municipal

Sistema web desenvolvido em Laravel 12 + React + TypeScript para gestão de processos administrativos municipais, incluindo contratos, licitações, planejamento e transparência pública.

## 🚀 Tecnologias

- **Backend**: Laravel 12 (PHP 8.2+)
- **Frontend**: React 18 + TypeScript + TailwindCSS
- **Build Tool**: Vite
- **State Management**: TanStack Query
- **UI Framework**: Radix UI + Headless UI
- **Database**: MySQL/PostgreSQL
- **AI Integration**: OpenAI API

## 📋 Pré-requisitos

- PHP 8.2 ou superior
- Composer 2.0+
- Node.js 18+ e npm
- MySQL 8.0+ ou PostgreSQL 13+
- Git

## 🛠️ Instalação

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd cafeteria
```

### 2. Instale as dependências PHP
```bash
composer install
```

### 3. Configure o ambiente
```bash
cp .env.example .env
php artisan key:generate
```

### 4. Configure o banco de dados
Edite o arquivo `.env` e configure as credenciais do banco:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cafeteria
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
```

### 5. Execute as migrações e seeders
```bash
php artisan migrate
php artisan db:seed
```

### 6. Instale as dependências JavaScript
```bash
npm install
```

### 7. Configure o Vite (opcional)
```bash
npm run build
```

### 8. Inicie o servidor de desenvolvimento
```bash
# Terminal 1 - Servidor Laravel
php artisan serve

# Terminal 2 - Vite (desenvolvimento)
npm run dev

# Ou use o comando combinado
composer run dev
```

## 🏗️ Estrutura do Projeto

```
cafeteria/
├── app/
│   ├── Http/Controllers/     # Controllers Laravel
│   ├── Models/              # Modelos Eloquent
│   ├── Services/            # Serviços de negócio
│   └── Traits/              # Traits compartilhados
├── resources/js/App/
│   ├── Components/          # Componentes React
│   ├── Pages/              # Páginas da aplicação
│   ├── hooks/              # Custom hooks
│   └── contexts/           # Contextos React
├── database/
│   ├── migrations/         # Migrações do banco
│   └── seeders/           # Seeders
└── docs/                  # Documentação técnica
```

## 🎯 Funcionalidades Principais


### 🤖 Integração com IA
- Sugestões automáticas para documentos
- Análise de riscos em contratos
- Geração de conteúdo inteligente
- Classificação automática de documentos

### 📊 Dashboards
- Painel do Prefeito
- Indicadores financeiros
- Gestão de usuários
- Relatórios gerenciais

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
composer run dev          # Inicia todos os serviços
php artisan serve         # Servidor Laravel
npm run dev              # Vite dev server

# Banco de dados
php artisan migrate       # Executa migrações
php artisan migrate:fresh # Recria banco
php artisan db:seed      # Executa seeders

# Cache e otimização
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan optimize

# Testes
php artisan test         # Executa testes
npm run test            # Testes JavaScript
```

## 🌐 Acesso

Após a instalação, acesse:
- **URL**: http://localhost:8000
- **Login padrão**: Verifique os seeders para credenciais

## 📚 Documentação

- [Fluxo de Dados](docs/ELOQUENT_INERTIA_REACT_TANSTACK_FLOW.md)
- [Integração com IA](docs/AI_SUGGESTIONS_IMPLEMENTATION.md)
- [Padrões de Desenvolvimento](docs/INTEGRATION_BEST_PRACTICES.md)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

Para dúvidas ou problemas:
- Abra uma [issue](../../issues)
- Consulte a [documentação](docs/)
- Entre em contato com a equipe de desenvolvimento

---

**Desenvolvido com ❤️ para a gestão pública eficiente**
