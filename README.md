## Git Submodules - Guia Completo

### O que são Git Submodules?

Git Submodules são uma forma de incluir um repositório Git dentro de outro repositório Git como um subdiretório. É como ter "repositórios dentro de repositórios". No nosso projeto, temos 5 submodules que representam diferentes "Espadas":

```
resources/js/App/Pages/Espadas/
├── Espada1/Index/ (submodule)
├── Espada2/Index/ (submodule)
├── Espada3/Index/ (submodule)
├── Espada4/Index/ (submodule)
└── Espada5/Index/ (submodule)
```

### Por que usar Submodules?

✅ **Vantagens:**
- Manter código compartilhado em repositórios separados
- Cada "Espada" pode ser desenvolvida independentemente
- Controle de versão individual para cada componente
- Facilita o trabalho em equipe

❌ **Desvantagens:**
- Mais complexo para iniciantes
- Requer comandos específicos para sincronizar

### Como funciona o arquivo .gitmodules?

O arquivo `.gitmodules` é como um "mapa" que diz ao Git onde estão os submodules:

```ini
[submodule "resources/js/App/Pages/Espadas/Espada1/Index"]
    path = resources/js/App/Pages/Espadas/Espada1/Index
    url = https://github.com/plataforma-lumen-arsenal/espada1-novo.git
```

- **path**: Onde o submodule fica no seu projeto
- **url**: De onde baixar o código do submodule

### Comandos Essenciais

#### 1. Clonar um projeto com submodules
```bash
# Clona o projeto principal E todos os submodules
git clone --recursive https://github.com/seu-usuario/seu-projeto.git

# OU se já clonou sem os submodules:
git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto
git submodule update --init --recursive
```

#### 2. Adicionar um novo submodule
```bash
# Exemplo: adicionando Espada6
git submodule add https://github.com/plataforma-lumen-arsenal/espada6-novo.git resources/js/App/Pages/Espadas/Espada6/Index
git commit -m "Adiciona submodule Espada6"
```

#### 3. Atualizar submodules
```bash
# Atualiza TODOS os submodules para a versão mais recente
git submodule update --remote

# Atualiza apenas um submodule específico
git submodule update --remote resources/js/App/Pages/Espadas/Espada1/Index
```

#### 4. Verificar status dos submodules
```bash
# Mostra o status de todos os submodules
git submodule status

# Mostra se há mudanças nos submodules
git status
```

#### 5. Entrar em um submodule para fazer mudanças
```bash
# Navega para o submodule
cd resources/js/App/Pages/Espadas/Espada1/Index

# Agora você está DENTRO do repositório do submodule
# Pode fazer commits normalmente
git add .
git commit -m "Minha mudança na Espada1"
git push origin main

# Volta para o projeto principal
cd ../../../../../../../../
```

#### 6. Remover um submodule
```bash
# 1. Remove a entrada do .gitmodules
git config --remove-section submodule.resources/js/App/Pages/Espadas/Espada1/Index

# 2. Remove a pasta
git rm --cached resources/js/App/Pages/Espadas/Espada1/Index
rm -rf resources/js/App/Pages/Espadas/Espada1/Index

# 3. Commit das mudanças
git commit -m "Remove submodule Espada1"
```

### Fluxo de Trabalho Típico

#### Para Desenvolvedores:

1. **Primeira vez clonando o projeto:**
```bash
git clone --recursive https://github.com/plataforma-lumen-arsenal/lumen.git
cd lumen
```

2. **Atualizando o projeto (incluindo submodules):**
```bash
git pull origin main
git submodule update --init --recursive
```

3. **Trabalhando em uma Espada específica:**
```bash
# Vai para o submodule da Espada2
cd resources/js/App/Pages/Espadas/Espada2/Index

# Faz suas mudanças
# ... edita arquivos ...

# Commit no submodule
git add .
git commit -m "Melhoria na Espada2"
git push origin main

# Volta para o projeto principal
cd ../../../../../../../../

# Atualiza a referência do submodule no projeto principal
git add resources/js/App/Pages/Espadas/Espada2/Index
git commit -m "Atualiza Espada2 para nova versão"
git push origin main
```

### Dicas Importantes para Iniciantes

🔔 **Lembre-se sempre:**
- Submodules apontam para commits específicos, não para branches
- Quando alguém atualiza um submodule, outros devem rodar `git submodule update`
- Sempre use `git clone --recursive` ao clonar projetos com submodules

🚨 **Cuidados:**
- Não delete as pastas dos submodules manualmente
- Sempre commit primeiro no submodule, depois no projeto principal
- Use `git submodule update --init --recursive` após fazer pull

### Comandos Úteis para Diagnóstico

```bash
# Ver quais submodules estão configurados
git submodule

# Ver URLs dos submodules
cat .gitmodules

# Ver status detalhado
git submodule status --recursive

# Sincronizar URLs (se mudaram no .gitmodules)
git submodule sync --recursive
```

### Exemplo Prático com o Nosso Projeto

Se você quer trabalhar na Espada3:

```bash
# 1. Clone o projeto (primeira vez)
git clone --recursive https://github.com/plataforma-lumen-arsenal/lumen.git

# 2. Entre na Espada3
cd resources/js/App/Pages/Espadas/Espada3/Index

# 3. Verifique em que branch está
git branch

# 4. Faça suas mudanças
# ... edita arquivos ...

# 5. Commit na Espada3
git add .
git commit -m "Nova funcionalidade na Espada3"
git push origin main

# 6. Volte para o projeto principal
cd ../../../../../../../../

# 7. Atualize a referência no projeto principal
git add .
git commit -m "Atualiza Espada3"
git push origin main
```

Agora você está pronto para trabalhar com Git Submodules! 🚀

<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Redberry](https://redberry.international/laravel-development)**
- **[Active Logic](https://activelogic.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
