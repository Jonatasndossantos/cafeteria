import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowLeft } from 'lucide-react';

interface Props {
    setor: {
        id: number;
        nome: string;
        sigla: string;
    };
}

export default function EditSetor({ setor }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nome: setor.nome,
        sigla: setor.sigla
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/setores/${setor.id}`);
    };

    return (
        <AuthenticatedLayout>
        <div className="container py-8 mx-auto">
                <Head title="Editar Setor" />
                <div className="flex justify-between items-center">
                    <Button variant="outline" onClick={() => window.history.back()}>
                        <ArrowLeft className="w-4 h-4" />
                        Voltar
                    </Button>
                </div>
            <Card>
                <CardHeader>
                    <CardTitle>Editar Setor</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="nome">Nome do Setor</Label>
                            <Input
                                id="nome"
                                type="text"
                                value={data.nome}
                                onChange={e => setData('nome', e.target.value)}
                                className={errors.nome ? 'border-red-500' : ''}
                            />
                            {errors.nome && (
                                <p className="text-sm text-red-500">{errors.nome}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="sigla">Sigla</Label>
                            <Input
                                id="sigla"
                                type="text"
                                value={data.sigla}
                                onChange={e => setData('sigla', e.target.value)}
                                className={errors.sigla ? 'border-red-500' : ''}
                            />
                            {errors.sigla && (
                                <p className="text-sm text-red-500">{errors.sigla}</p>
                            )}
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Salvando...' : 'Salvar'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
        </AuthenticatedLayout>
    );
} 