import { useState, FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { ArrowLeft, Save } from 'lucide-react';
import { PageProps } from '@/types';

interface ProdutoCreateProps extends PageProps {
    categorias: string[];
}

export default function Create({ categorias }: ProdutoCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        nome: '',
        preco: '',
        categoria: '',
        imagem: '',
    });

    const [novaCategoria, setNovaCategoria] = useState('');
    const [usarNovaCategoria, setUsarNovaCategoria] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Atualizar categoria se estiver criando uma nova
        if (usarNovaCategoria) {
            setData('categoria', novaCategoria);
        }

        post(route('produtos.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Criar Produto" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    {/* Cabeçalho */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-4">
                            <Link href={route('produtos.index')}>
                                <Button variant="outline" size="sm">
                                    <ArrowLeft className="mr-2 w-4 h-4" />
                                    Voltar
                                </Button>
                            </Link>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Criar Produto
                            </h2>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Informações do Produto</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Nome */}
                                    <div className="space-y-2">
                                        <Label htmlFor="nome">Nome do Produto *</Label>
                                        <Input
                                            id="nome"
                                            type="text"
                                            value={data.nome}
                                            onChange={(e) => setData('nome', e.target.value)}
                                            placeholder="Digite o nome do produto"
                                            className={errors.nome ? 'border-red-500' : ''}
                                        />
                                        {errors.nome && (
                                            <p className="text-sm text-red-600">{errors.nome}</p>
                                        )}
                                    </div>

                                    {/* Preço */}
                                    <div className="space-y-2">
                                        <Label htmlFor="preco">Preço *</Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 text-gray-500 transform -translate-y-1/2">
                                                R$
                                            </span>
                                            <Input
                                                id="preco"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={data.preco}
                                                onChange={(e) => setData('preco', e.target.value)}
                                                placeholder="0,00"
                                                className={`pl-10 ${errors.preco ? 'border-red-500' : ''}`}
                                            />
                                        </div>
                                        {errors.preco && (
                                            <p className="text-sm text-red-600">{errors.preco}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Categoria */}
                                <div className="space-y-2">
                                    <Label htmlFor="categoria">Categoria *</Label>
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id="nova-categoria"
                                                checked={usarNovaCategoria}
                                                onChange={(e) => setUsarNovaCategoria(e.target.checked)}
                                                className="text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                            />
                                            <Label htmlFor="nova-categoria" className="text-sm">
                                                Criar nova categoria
                                            </Label>
                                        </div>

                                        {usarNovaCategoria ? (
                                            <Input
                                                type="text"
                                                value={novaCategoria}
                                                onChange={(e) => setNovaCategoria(e.target.value)}
                                                placeholder="Digite o nome da nova categoria"
                                                className={errors.categoria ? 'border-red-500' : ''}
                                            />
                                        ) : (
                                            <select
                                                value={data.categoria}
                                                onChange={(e) => setData('categoria', e.target.value)}
                                                className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.categoria ? 'border-red-500' : ''}`}
                                            >
                                                <option value="">Selecione uma categoria</option>
                                                {categorias.map((categoria) => (
                                                    <option key={categoria} value={categoria}>
                                                        {categoria}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </div>
                                    {errors.categoria && (
                                        <p className="text-sm text-red-600">{errors.categoria}</p>
                                    )}
                                </div>

                                {/* Imagem */}
                                <div className="space-y-2">
                                    <Label htmlFor="imagem">URL da Imagem</Label>
                                    <Input
                                        id="imagem"
                                        type="url"
                                        value={data.imagem}
                                        onChange={(e) => setData('imagem', e.target.value)}
                                        placeholder="https://exemplo.com/imagem.jpg"
                                        className={errors.imagem ? 'border-red-500' : ''}
                                    />
                                    <p className="text-sm text-gray-600">
                                        Cole a URL da imagem do produto ou o nome do arquivo no bucket do Supabase
                                    </p>
                                    {errors.imagem && (
                                        <p className="text-sm text-red-600">{errors.imagem}</p>
                                    )}
                                </div>

                                {/* Botões */}
                                <div className="flex justify-end pt-6 space-x-4">
                                    <Link href={route('produtos.index')}>
                                        <Button type="button" variant="outline">
                                            Cancelar
                                        </Button>
                                    </Link>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        <Save className="mr-2 w-4 h-4" />
                                        {processing ? 'Salvando...' : 'Salvar Produto'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
