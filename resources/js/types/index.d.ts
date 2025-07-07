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

export interface ProdutoStats {
    total_produtos: number;
    categorias_count: number;
    preco_medio: number | null;
    preco_min: number | null;
    preco_max: number | null;
}

export interface OrderItem {
    id: string;
    produto_id: number;
    produto: Produto;
    quantidade: number;
    preco_unitario: number;
    subtotal: number;
}

export interface Order {
    id: string;
    user_id: string;
    user_email: string;
    user_name: string;
    status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
    payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
    payment_method: 'stripe' | 'pix' | 'cash';
    stripe_payment_intent_id?: string;
    stripe_customer_id?: string;
    total_amount: number;
    currency: string;
    items: OrderItem[];
    created_at: string;
    updated_at: string;
    paid_at?: string;
    cancelled_at?: string;
    notes?: string;
}

export interface OrderStats {
    total_orders: number;
    total_revenue: number;
    pending_orders: number;
    completed_orders: number;
    today_orders: number;
    today_revenue: number;
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
