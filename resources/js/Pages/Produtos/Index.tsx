import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Search, Plus, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { PageProps, Produto, PaginatedResponse } from '@/types';

interface ProdutosIndexProps extends PageProps {
    produtos: PaginatedResponse<Produto>;
    categorias: string[];
    filtros: {
        categoria?: string;
        search?: string;
    };
}

export default function Index({ produtos, categorias, filtros }: ProdutosIndexProps) {
    const [search, setSearch] = useState(filtros.search || '');
    const [categoria, setCategoria] = useState(filtros.categoria || '');

    const handleSearch = () => {
        router.get(route('produtos.index'), {
            search: search || undefined,
            categoria: categoria || undefined,
        });
    };

    const handleClearFilters = () => {
        setSearch('');
        setCategoria('');
        router.get(route('produtos.index'));
    };

    const handleDelete = (id: number, nome: string) => {
        if (confirm(`Tem certeza que deseja excluir o produto "${nome}"?`)) {
            router.delete(route('produtos.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Produtos" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Cabeçalho */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Produtos
                        </h2>
                        <Link href={route('produtos.create')}>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="mr-2 w-4 h-4" />
                                Novo Produto
                            </Button>
                        </Link>
                    </div>

                    {/* Filtros */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Filter className="mr-2 w-4 h-4" />
                                Filtros
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">
                                        Buscar por nome
                                    </label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 w-4 h-4 text-gray-400 transform -translate-y-1/2" />
                                        <Input
                                            type="text"
                                            placeholder="Nome do produto..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="pl-10"
                                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">
                                        Categoria
                                    </label>
                                    <select
                                        value={categoria}
                                        onChange={(e) => setCategoria(e.target.value)}
                                        className="flex px-3 py-2 w-full h-10 text-sm rounded-md border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="">Todas as categorias</option>
                                        {categorias.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex gap-2 items-end">
                                    <Button onClick={handleSearch} className="flex-1">
                                        Buscar
                                    </Button>
                                    <Button onClick={handleClearFilters} variant="outline">
                                        Limpar
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Lista de Produtos */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {produtos.data.map((produto) => (
                            <Card key={produto.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                                <div className="overflow-hidden bg-gray-100 aspect-square">
                                    {produto.imagem_url ? (
                                        <img
                                            src={produto.imagem_url}
                                            alt={produto.nome}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <div className="flex justify-center items-center w-full h-full text-gray-400">
                                            <span className="text-4xl">📦</span>
                                        </div>
                                    )}
                                </div>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg leading-tight">
                                        {produto.nome}
                                    </CardTitle>
                                    <CardDescription>{produto.categoria}</CardDescription>
                                </CardHeader>
                                <CardContent className="pb-2">
                                    <div className="text-2xl font-bold text-green-600">
                                        R$ {produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-2">
                                    <div className="flex gap-1 w-full">
                                        <Link href={route('produtos.show', produto.id)} className="flex-1">
                                            <Button variant="outline" size="sm" className="w-full">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <Link href={route('produtos.edit', produto.id)} className="flex-1">
                                            <Button variant="outline" size="sm" className="w-full">
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => handleDelete(produto.id, produto.nome)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {/* Paginação */}
                    {produtos.total > produtos.per_page && (
                        <div className="flex justify-center mt-6">
                            <div className="flex items-center space-x-2">
                                {produtos.links.map((link, index) => (
                                    <Button
                                        key={index}
                                        variant={link.active ? "default" : "outline"}
                                        size="sm"
                                        disabled={!link.url}
                                        onClick={() => link.url && router.get(link.url)}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Estado vazio */}
                    {produtos.data.length === 0 && (
                        <Card className="py-12 text-center">
                            <CardContent>
                                <div className="mb-4 text-6xl text-gray-400">📦</div>
                                <h3 className="mb-2 text-lg font-medium text-gray-900">
                                    Nenhum produto encontrado
                                </h3>
                                <p className="mb-4 text-gray-600">
                                    Não há produtos cadastrados ou que correspondam aos filtros aplicados.
                                </p>
                                <Link href={route('produtos.create')}>
                                    <Button>
                                        <Plus className="mr-2 w-4 h-4" />
                                        Criar primeiro produto
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
