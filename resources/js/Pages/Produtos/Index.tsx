import { useState, useEffect, useCallback } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Search, Plus, Filter, Eye, Edit, Trash2, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { PageProps, Produto, PaginatedResponse, ProdutoStats } from '@/types';

interface ProdutosIndexProps extends PageProps {
    produtos: PaginatedResponse<Produto>;
    categorias: string[];
    filtros: {
        categoria?: string;
        search?: string;
        preco_min?: string;
        preco_max?: string;
        order_by?: string;
        order_direction?: string;
    };
    stats: ProdutoStats;
}

export default function Index({ produtos, categorias, filtros, stats }: ProdutosIndexProps) {
    const [search, setSearch] = useState(filtros.search || '');
    const [categoria, setCategoria] = useState(filtros.categoria || '');
    const [precoMin, setPrecoMin] = useState(filtros.preco_min || '');
    const [precoMax, setPrecoMax] = useState(filtros.preco_max || '');
    const [orderBy, setOrderBy] = useState(filtros.order_by || 'nome');
    const [orderDirection, setOrderDirection] = useState(filtros.order_direction || 'asc');
    const [isSearching, setIsSearching] = useState(false);

    // Debounce para busca automática
    const debouncedSearch = useCallback(
        (() => {
            let timeoutId: NodeJS.Timeout;
            return (value: string) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    setIsSearching(true);
                    router.get(route('produtos.index'), {
                        search: value || undefined,
                        categoria: categoria || undefined,
                        preco_min: precoMin || undefined,
                        preco_max: precoMax || undefined,
                        order_by: orderBy,
                        order_direction: orderDirection,
                    }, {
                        preserveState: true,
                        onFinish: () => setIsSearching(false)
                    });
                }, 500);
            };
        })(),
        [categoria, precoMin, precoMax, orderBy, orderDirection]
    );

    // Busca automática ao digitar
    useEffect(() => {
        debouncedSearch(search);
    }, [search, debouncedSearch]);

    // Filtro automático ao selecionar categoria
    useEffect(() => {
        if (categoria !== filtros.categoria) {
            router.get(route('produtos.index'), {
                search: search || undefined,
                categoria: categoria || undefined,
                preco_min: precoMin || undefined,
                preco_max: precoMax || undefined,
                order_by: orderBy,
                order_direction: orderDirection,
            }, {
                preserveState: true
            });
        }
    }, [categoria]);

    // Filtro automático ao alterar preços
    useEffect(() => {
        if (precoMin !== filtros.preco_min || precoMax !== filtros.preco_max) {
            router.get(route('produtos.index'), {
                search: search || undefined,
                categoria: categoria || undefined,
                preco_min: precoMin || undefined,
                preco_max: precoMax || undefined,
                order_by: orderBy,
                order_direction: orderDirection,
            }, {
                preserveState: true
            });
        }
    }, [precoMin, precoMax]);

    // Ordenação automática
    useEffect(() => {
        if (orderBy !== filtros.order_by || orderDirection !== filtros.order_direction) {
            router.get(route('produtos.index'), {
                search: search || undefined,
                categoria: categoria || undefined,
                preco_min: precoMin || undefined,
                preco_max: precoMax || undefined,
                order_by: orderBy,
                order_direction: orderDirection,
            }, {
                preserveState: true
            });
        }
    }, [orderBy, orderDirection]);

    const handleClearFilters = () => {
        setSearch('');
        setCategoria('');
        setPrecoMin('');
        setPrecoMax('');
        setOrderBy('nome');
        setOrderDirection('asc');
        router.get(route('produtos.index'));
    };

    const handleDelete = (id: number, nome: string) => {
        if (confirm(`Tem certeza que deseja excluir o produto "${nome}"?`)) {
            router.delete(route('produtos.destroy', id));
        }
    };

    const toggleOrderDirection = () => {
        setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
    };

    const getOrderIcon = () => {
        if (orderDirection === 'asc') return <ArrowUp className="w-4 h-4" />;
        return <ArrowDown className="w-4 h-4" />;
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

                    {/* Estatísticas */}
                    <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-5">
                        <Card>
                            <CardContent className="p-4">
                                <div className="text-2xl font-bold text-blue-600">{stats.total_produtos}</div>
                                <div className="text-sm text-gray-600">Total de Produtos</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="text-2xl font-bold text-green-600">{stats.categorias_count}</div>
                                <div className="text-sm text-gray-600">Categorias</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="text-2xl font-bold text-purple-600">
                                    R$ {stats.preco_medio ? Number(stats.preco_medio).toFixed(2) : '0.00'}
                                </div>
                                <div className="text-sm text-gray-600">Preço Médio</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="text-2xl font-bold text-orange-600">
                                    R$ {stats.preco_min ? Number(stats.preco_min).toFixed(2) : '0.00'}
                                </div>
                                <div className="text-sm text-gray-600">Preço Mínimo</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="text-2xl font-bold text-red-600">
                                    R$ {stats.preco_max ? Number(stats.preco_max).toFixed(2) : '0.00'}
                                </div>
                                <div className="text-sm text-gray-600">Preço Máximo</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Filtros */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Filter className="mr-2 w-4 h-4" />
                                Filtros
                                {isSearching && (
                                    <div className="ml-2 text-sm text-gray-500">Buscando...</div>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">
                                        Buscar por nome ou categoria
                                    </label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 w-4 h-4 text-gray-400 transform -translate-y-1/2" />
                                        <Input
                                            type="text"
                                            placeholder="Digite para buscar..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="pl-10"
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

                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">
                                        Preço Mínimo
                                    </label>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        placeholder="R$ 0,00"
                                        value={precoMin}
                                        onChange={(e) => setPrecoMin(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">
                                        Preço Máximo
                                    </label>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        placeholder="R$ 999,99"
                                        value={precoMax}
                                        onChange={(e) => setPrecoMax(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">
                                        Ordenar por
                                    </label>
                                    <select
                                        value={orderBy}
                                        onChange={(e) => setOrderBy(e.target.value)}
                                        className="flex px-3 py-2 w-full h-10 text-sm rounded-md border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="nome">Nome</option>
                                        <option value="preco">Preço</option>
                                        <option value="categoria">Categoria</option>
                                    </select>
                                </div>

                                <div className="flex gap-2 items-end">
                                    <Button
                                        onClick={toggleOrderDirection}
                                        variant="outline"
                                        className="flex-1"
                                    >
                                        {getOrderIcon()}
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
                                    {produto.imagem ? (
                                        <img
                                            src={`https://ioqmugedsxyximfdhjzp.supabase.co/storage/v1/object/public/images/${produto.imagem}`}
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
