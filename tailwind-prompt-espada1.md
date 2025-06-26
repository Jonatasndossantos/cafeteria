# Tailwind CSS Prompt - Páginas Espada1

## Configuração do Tailwind

### Configuração Base

```typescript
export default {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            // ... configurações estendidas
        },
    },
    plugins: [require("tailwindcss-animate")],
};
```

## Cores Personalizadas

### Cores do Sistema Lumen

-   `lumen-blue: #0A3D62` - Azul principal do sistema
-   `lumen-gold: #D4AF37` - Dourado do sistema
-   `lumen-green: #E8F5E9` - Verde claro do sistema

### Cores do Design System

-   `primary` - Cor principal (HSL: 222.2 47.4% 11.2%)
-   `secondary` - Cor secundária (HSL: 210 40% 96.1%)
-   `muted` - Cor neutra (HSL: 210 40% 96.1%)
-   `accent` - Cor de destaque (HSL: 210 40% 96.1%)
-   `destructive` - Cor destrutiva/erro (HSL: 0 84.2% 60.2%)
-   `border` - Cor das bordas (HSL: 214.3 31.8% 91.4%)
-   `input` - Cor dos inputs (HSL: 214.3 31.8% 91.4%)
-   `ring` - Cor dos anéis de foco (HSL: 222.2 84% 4.9%)

### Cores Sidebar

-   `sidebar-background` - Fundo da sidebar
-   `sidebar-foreground` - Texto da sidebar
-   `sidebar-primary` - Primária da sidebar
-   `sidebar-accent` - Destaque da sidebar
-   `sidebar-border` - Borda da sidebar

## Tipografia

### Família de Fontes

-   `font-sans: ['Inter', 'sans-serif']` - Fonte principal do sistema

### Classes de Texto Utilizadas

-   `text-xl` - Títulos principais
-   `text-lg` - Títulos secundários
-   `text-sm` - Texto pequeno
-   `font-semibold` - Peso semibold
-   `font-medium` - Peso medium
-   `leading-tight` - Altura de linha compacta
-   `leading-6` - Altura de linha padrão

### Cores de Texto

-   `text-gray-800` - Texto escuro principal
-   `text-gray-900` - Texto muito escuro
-   `text-gray-700` - Texto médio
-   `text-gray-500` - Texto claro
-   `text-white` - Texto branco
-   `text-indigo-600` - Links e botões primários
-   `text-indigo-900` - Links hover
-   `text-red-600` - Ações destrutivas
-   `text-red-900` - Ações destrutivas hover

## Layout e Espaçamento

### Container e Larguras

-   `max-w-7xl` - Container máximo principal
-   `min-w-full` - Largura mínima total
-   `container mx-auto` - Container centralizado

### Padding e Margin

-   `py-6` - Padding vertical médio
-   `py-4` - Padding vertical pequeno
-   `py-2` - Padding vertical mínimo
-   `py-3.5` - Padding vertical específico
-   `px-4` - Padding horizontal pequeno
-   `px-3` - Padding horizontal mínimo
-   `px-6` - Padding horizontal médio
-   `sm:px-6 lg:px-8` - Padding responsivo
-   `mx-auto` - Margin horizontal auto (centralizar)
-   `mt-2`, `mt-4`, `mt-5`, `mt-8` - Margins top
-   `mr-4` - Margin right
-   `sm:ml-16` - Margin left responsivo

### Gap e Espaçamento

-   `gap-4` - Gap pequeno
-   `gap-6` - Gap médio

## Flexbox e Grid

### Flex Classes

-   `flex` - Display flex
-   `flex-col` - Direção coluna
-   `flex-1` - Flex grow
-   `flex-auto` - Flex auto
-   `flex-none` - Flex none
-   `items-center` - Align items center
-   `justify-center` - Justify content center
-   `sm:flex` - Flex responsivo
-   `sm:items-center` - Items center responsivo

### Posicionamento

-   `relative` - Posição relativa
-   `inline-block` - Display inline-block
-   `inline-flex` - Display inline-flex

## Backgrounds e Cores

### Backgrounds

-   `bg-white` - Fundo branco
-   `bg-gray-50` - Fundo cinza claro
-   `bg-gray-100` - Fundo cinza
-   `bg-indigo-600` - Fundo índigo (botões)
-   `bg-indigo-700` - Fundo índigo hover

### Estados Hover

-   `hover:bg-indigo-700` - Hover botões
-   `hover:text-indigo-900` - Hover links
-   `hover:text-red-900` - Hover links destrutivos

## Borders e Shadows

### Borders

-   `border` - Borda padrão
-   `border-transparent` - Borda transparente
-   `rounded-md` - Borda arredondada média
-   `rounded-lg` - Borda arredondada grande
-   `sm:rounded-lg` - Borda responsiva

### Shadows

-   `shadow` - Sombra padrão
-   `shadow-sm` - Sombra pequena
-   `ring-1 ring-black ring-opacity-5` - Anel de sombra

## Tabelas

### Classes de Tabela

-   `min-w-full` - Largura mínima total
-   `divide-y divide-gray-300` - Divisor vertical
-   `divide-y divide-gray-200` - Divisor mais claro

### Table Headers

-   `bg-gray-50` - Fundo do cabeçalho

### Table Cells

-   `whitespace-nowrap` - Não quebrar texto
-   `text-left` - Alinhamento à esquerda
-   `text-right` - Alinhamento à direita

## Botões e Links

### Botão Primário

```css
inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto
```

### Links

-   `text-indigo-600 hover:text-indigo-900` - Links padrão
-   `text-red-600 hover:text-red-900` - Links destrutivos

## Responsividade

### Breakpoints Utilizados

-   `sm:` - Small devices (640px+)
-   `md:` - Medium devices (768px+)
-   `lg:` - Large devices (1024px+)

### Classes Responsivas

-   `sm:px-6 lg:px-8` - Padding responsivo
-   `sm:flex` - Display responsivo
-   `sm:flex-auto` - Flex responsivo
-   `sm:mt-0` - Margin responsivo
-   `sm:w-auto` - Width responsivo
-   `md:px-6 lg:px-8` - Padding responsivo tabelas
-   `md:rounded-lg` - Border radius responsivo

## Focus States

### Classes de Foco

-   `focus:outline-none` - Remove outline padrão
-   `focus:ring-2` - Anel de foco
-   `focus:ring-indigo-500` - Cor do anel
-   `focus:ring-offset-2` - Offset do anel

## Animações

### Keyframes Personalizados

-   `accordion-down` - Animação acordeão para baixo
-   `accordion-up` - Animação acordeão para cima
-   `wave-text` - Animação de onda para texto

### Classes de Animação

-   `animate-accordion-down` - Aplicar animação acordeão
-   `animate-accordion-up` - Aplicar animação acordeão reversa
-   `animate-wave-text` - Aplicar animação de onda

## Utilitários Especiais

### Screen Reader

-   `sr-only` - Apenas para leitores de tela

### Overflow

-   `overflow-x-auto` - Scroll horizontal
-   `overflow-hidden` - Overflow oculto

### Alignment

-   `align-middle` - Alinhamento vertical médio

## Layout Específico

### Header Layout

```css
flex flex-col min-h-screen
```

### Main Content

```css
flex-1 bg-gray-100
```

### Container Pattern

```css
max-w-7xl mx-auto py-6 sm:px-6 lg:px-8
```

### Card Pattern

```css
bg-white shadow sm:rounded-lg
```

### Table Container Pattern

```css
mt-8 flex flex-col
-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8
inline-block min-w-full py-2 align-middle md:px-6 lg:px-8
overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg
```

## Dark Mode Support

O sistema suporta dark mode através da estratégia `class`, com variáveis CSS personalizadas para cada tema.

## Plugin Utilizado

-   `tailwindcss-animate` - Para animações avançadas

---

Este prompt pode ser usado para recriar ou estender o design system das páginas Espada1, mantendo consistência visual e funcional.
