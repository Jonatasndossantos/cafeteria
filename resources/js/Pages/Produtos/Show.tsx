import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { ArrowLeft, Edit, Trash2, Tag, DollarSign } from 'lucide-react';
import { PageProps, Produto } from '@/types';

interface ProdutoShowProps extends PageProps {
    produto: Produto;
}

export default function Show({ produto }: ProdutoShowProps) {
    const handleDelete = () => {
        if (confirm(`Tem certeza que deseja excluir o produto "${produto.nome}"?`)) {
            router.delete(route('produtos.destroy', produto.id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={produto.nome} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    {/* Cabeçalho */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-4">
                            <Link href={route('produtos.index')}>
                                <Button variant="outline" size="sm">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Voltar
                                </Button>
                            </Link>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Detalhes do Produto
                            </h2>
                        </div>

                        <div className="flex space-x-2">
                            <Link href={route('produtos.edit', produto.id)}>
                                <Button variant="outline" className="text-blue-600 hover:text-blue-700">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Editar
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={handleDelete}
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Excluir
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Imagem do Produto */}
                        <div className="lg:col-span-1">
                            <Card>
                                <CardContent className="p-0">
                                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                                        {produto.imagem_url ? (
                                            <img
                                                src={produto.imagem_url}
                                                alt={produto.nome}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <div className="text-center">
                                                    <span className="text-6xl">📦</span>
                                                    <p className="mt-2 text-sm">Sem imagem</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Informações do Produto */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Informações Principais */}
                            <Card>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-2xl">{produto.nome}</CardTitle>
                                            <CardDescription className="flex items-center mt-2">
                                                <Tag className="w-4 h-4 mr-1" />
                                                {produto.categoria}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {/* Preço */}
                                        <div className="flex items-center space-x-2">
                                            <DollarSign className="w-5 h-5 text-green-600" />
                                            <span className="text-3xl font-bold text-green-600">
                                                R$ {produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Informações Adicionais */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informações Adicionais</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">ID do Produto</label>
                                            <p className="text-lg font-mono">#{produto.id}</p>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Categoria</label>
                                            <p className="text-lg">{produto.categoria}</p>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Preço</label>
                                            <p className="text-lg font-semibold text-green-600">
                                                R$ {produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Informações da Imagem */}
                            {produto.imagem && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Informações da Imagem</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <div>
                                                <label className="text-sm font-medium text-gray-500">URL/Arquivo</label>
                                                <p className="text-sm text-gray-700 break-all font-mono bg-gray-50 p-2 rounded">
                                                    {produto.imagem}
                                                </p>
                                            </div>
                                            {produto.imagem_url && produto.imagem_url !== produto.imagem && (
                                                <div>
                                                    <label className="text-sm font-medium text-gray-500">URL Completa</label>
                                                    <p className="text-sm text-gray-700 break-all font-mono bg-gray-50 p-2 rounded">
                                                        {produto.imagem_url}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
