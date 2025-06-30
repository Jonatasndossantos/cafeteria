export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Produto {
    id: number;
    nome: string;
    preco: number;
    categoria: string;
    imagem?: string;
    preco_formatado?: string;
    imagem_url?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
