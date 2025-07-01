import { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useSupabaseUsers } from '@/hooks/useSupabaseUsers';

// Mock data dos produtos disponíveis
const mockProdutos = [
    { id: 1, nome: 'Café Expresso', preco: 800, categoria: 'Bebidas Quentes', imagem: '☕', disponivel: true },
    { id: 2, nome: 'Cappuccino Grande', preco: 1200, categoria: 'Bebidas Quentes', imagem: '☕', disponivel: true },
    { id: 3, nome: 'Café com Leite', preco: 900, categoria: 'Bebidas Quentes', imagem: '☕', disponivel: true },
    { id: 4, nome: 'Café Gelado', preco: 1200, categoria: 'Bebidas Geladas', imagem: '🧊', disponivel: true },
    { id: 5, nome: 'Suco de Laranja', preco: 1050, categoria: 'Bebidas Geladas', imagem: '🧃', disponivel: true },
    { id: 6, nome: 'Água Mineral', preco: 500, categoria: 'Bebidas Geladas', imagem: '💧', disponivel: true },
    { id: 7, nome: 'Croissant de Chocolate', preco: 1200, categoria: 'Doces', imagem: '🥐', disponivel: true },
    { id: 8, nome: 'Pão de Açúcar', preco: 600, categoria: 'Doces', imagem: '🍞', disponivel: true },
    { id: 9, nome: 'Sanduíche Natural', preco: 900, categoria: 'Salgados', imagem: '🥪', disponivel: true },
    { id: 10, nome: 'Açaí Médio', preco: 1800, categoria: 'Especiais', imagem: '🍇', disponivel: true },
    { id: 11, nome: 'Combo Café da Manhã', preco: 2200, categoria: 'Especiais', imagem: '🍽️', disponivel: true }
];

interface CartItem {
    produto: typeof mockProdutos[0];
    quantidade: number;
    subtotal: number;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value / 100);
};

export default function CreateOrder() {
    const { users, loading: loadingUsers, fetchUsers } = useSupabaseUsers();

    const [cart, setCart] = useState<CartItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [orderType, setOrderType] = useState<'mesa' | 'balcao' | 'delivery'>('mesa');
    const [orderData, setOrderData] = useState({
        user_id: '',
        user_name: '',
        user_email: '',
        mesa: '',
        endereco: '',
        observacoes: ''
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const categorias = [...new Set(mockProdutos.map(p => p.categoria))];

    const filteredProdutos = mockProdutos.filter(produto => {
        const matchCategory = !selectedCategory || produto.categoria === selectedCategory;
        const matchSearch = !searchTerm || produto.nome.toLowerCase().includes(searchTerm.toLowerCase());
        return matchCategory && matchSearch && produto.disponivel;
    });

    const addToCart = (produto: typeof mockProdutos[0]) => {
        setCart(prev => {
            const existingItem = prev.find(item => item.produto.id === produto.id);
            if (existingItem) {
                return prev.map(item =>
                    item.produto.id === produto.id
                        ? { ...item, quantidade: item.quantidade + 1, subtotal: (item.quantidade + 1) * produto.preco }
                        : item
                );
            } else {
                return [...prev, { produto, quantidade: 1, subtotal: produto.preco }];
            }
        });
    };

    const updateQuantity = (produtoId: number, newQuantity: number) => {
        if (newQuantity === 0) {
            setCart(prev => prev.filter(item => item.produto.id !== produtoId));
        } else {
            setCart(prev => prev.map(item =>
                item.produto.id === produtoId
                    ? { ...item, quantidade: newQuantity, subtotal: newQuantity * item.produto.preco }
                    : item
            ));
        }
    };

    const getTotalItems = () => cart.reduce((total, item) => total + item.quantidade, 0);
    const getTotalPrice = () => cart.reduce((total, item) => total + item.subtotal, 0);

    const handleUserSelect = (userId: string) => {
        const user = users.find(u => u.id === userId);
        if (user) {
            setOrderData(prev => ({
                ...prev,
                user_id: userId,
                user_name: user.user_metadata?.name || user.email || 'Usuário',
                user_email: user.email || ''
            }));
        }
    };

    const handleSubmitOrder = () => {
        if (cart.length === 0) {
            alert('Adicione pelo menos um produto ao carrinho!');
            return;
        }

        if (!orderData.user_id) {
            alert('Selecione um cliente!');
            return;
        }

        if (orderType === 'mesa' && !orderData.mesa) {
            alert('Informe o número da mesa!');
            return;
        }

        if (orderType === 'delivery' && !orderData.endereco) {
            alert('Informe o endereço de entrega!');
            return;
        }

        const order = {
            tipo: orderType,
            user_id: orderData.user_id,
            user_name: orderData.user_name,
            user_email: orderData.user_email,
            local: orderType === 'mesa' ? `Mesa ${orderData.mesa}`
                  : orderType === 'balcao' ? `Balcão - ${orderData.user_name}`
                  : `Delivery - ${orderData.user_name}`,
            endereco: orderType === 'delivery' ? orderData.endereco : null,
            observacoes: orderData.observacoes,
            items: cart,
            total: getTotalPrice(),
            status: 'pending'
        };

        console.log('Novo pedido:', order);
        alert('Pedido criado com sucesso! (Em desenvolvimento - integração com API)');

        // Redirecionar para o painel de pedidos
        router.visit('/orders');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Novo Pedido" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Novo Pedido</h1>
                        <p className="text-gray-600">Adicione produtos e crie um novo pedido</p>
                    </div>
                    <button
                        onClick={() => router.visit('/orders')}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        ← Voltar para Pedidos
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Products Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Filters */}
                        <div className="bg-white p-4 rounded-lg shadow">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Buscar Produto
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Digite o nome do produto..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Categoria
                                    </label>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Todas as categorias</option>
                                        {categorias.map(categoria => (
                                            <option key={categoria} value={categoria}>{categoria}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {filteredProdutos.map(produto => (
                                <div key={produto.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                                    <div className="text-center mb-3">
                                        <div className="text-4xl mb-2">{produto.imagem}</div>
                                        <h3 className="font-semibold text-gray-900">{produto.nome}</h3>
                                        <p className="text-sm text-gray-500">{produto.categoria}</p>
                                        <p className="text-lg font-bold text-green-600">{formatCurrency(produto.preco)}</p>
                                    </div>
                                    <button
                                        onClick={() => addToCart(produto)}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                                    >
                                        + Adicionar
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cart and Order Details */}
                    <div className="space-y-6">
                        {/* Cart */}
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Carrinho ({getTotalItems()} itens)
                            </h2>

                            {cart.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">
                                    Carrinho vazio<br />
                                    Adicione produtos para continuar
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {cart.map(item => (
                                        <div key={item.produto.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900">{item.produto.nome}</h4>
                                                <p className="text-sm text-gray-500">{formatCurrency(item.produto.preco)} cada</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => updateQuantity(item.produto.id, item.quantidade - 1)}
                                                    className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full"
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center font-medium">{item.quantidade}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.produto.id, item.quantidade + 1)}
                                                    className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <div className="text-right ml-3">
                                                <p className="font-bold text-gray-900">{formatCurrency(item.subtotal)}</p>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="border-t pt-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xl font-bold text-gray-900">Total:</span>
                                            <span className="text-xl font-bold text-green-600">{formatCurrency(getTotalPrice())}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Order Details Form */}
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Dados do Pedido</h2>

                            <div className="space-y-4">
                                {/* Cliente */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Cliente *
                                    </label>
                                    {loadingUsers ? (
                                        <p className="text-gray-500">Carregando clientes...</p>
                                    ) : (
                                        <select
                                            value={orderData.user_id}
                                            onChange={(e) => handleUserSelect(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Selecione um cliente</option>
                                            {users.map(user => (
                                                <option key={user.id} value={user.id}>
                                                    {user.user_metadata?.name || user.email} - {user.email}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>

                                {/* Tipo de Pedido */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tipo de Pedido *
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setOrderType('mesa')}
                                            className={`p-3 text-center rounded-lg border ${orderType === 'mesa'
                                                ? 'bg-blue-50 border-blue-500 text-blue-700'
                                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                                        >
                                            🪑<br />Mesa
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setOrderType('balcao')}
                                            className={`p-3 text-center rounded-lg border ${orderType === 'balcao'
                                                ? 'bg-purple-50 border-purple-500 text-purple-700'
                                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                                        >
                                            🏪<br />Balcão
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setOrderType('delivery')}
                                            className={`p-3 text-center rounded-lg border ${orderType === 'delivery'
                                                ? 'bg-orange-50 border-orange-500 text-orange-700'
                                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                                        >
                                            🛵<br />Delivery
                                        </button>
                                    </div>
                                </div>

                                {/* Mesa (apenas se tipo for mesa) */}
                                {orderType === 'mesa' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Número da Mesa *
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Ex: 5, 12, 15..."
                                            value={orderData.mesa}
                                            onChange={(e) => setOrderData(prev => ({ ...prev, mesa: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                )}

                                {/* Endereço (apenas se tipo for delivery) */}
                                {orderType === 'delivery' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Endereço de Entrega *
                                        </label>
                                        <textarea
                                            placeholder="Rua, número, bairro, referências..."
                                            value={orderData.endereco}
                                            onChange={(e) => setOrderData(prev => ({ ...prev, endereco: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            rows={3}
                                            required
                                        />
                                    </div>
                                )}

                                {/* Observações */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Observações
                                    </label>
                                    <textarea
                                        placeholder="Observações adicionais (opcional)..."
                                        value={orderData.observacoes}
                                        onChange={(e) => setOrderData(prev => ({ ...prev, observacoes: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        rows={2}
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    onClick={handleSubmitOrder}
                                    disabled={cart.length === 0}
                                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors"
                                >
                                    🛒 Criar Pedido - {formatCurrency(getTotalPrice())}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
