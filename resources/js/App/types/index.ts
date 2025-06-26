export interface PageProps {
    auth: {
        id: number;
        nome: string;
        cargo: string;
        cpf: string;
        dataNasc: string;
        matricula: string;
        setor?: {
            id: number;
            nome: string;
            sigla: string;
        };
    };
    errors: Record<string, string>;
    setores: Array<{
        id: number;
        nome: string;
        sigla: string;
        created_at: string;
        updated_at: string;
    }>;
} 