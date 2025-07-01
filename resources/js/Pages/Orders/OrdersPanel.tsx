import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

// Mock data para demonstração
const mockOrders = [
    {
        id: '001',
        tipo: 'mesa',
        local: 'Mesa 5',
        endereco: null,
        status: 'pending',
        total: 3850,
        created_at: '2024-01-20T14:30:00Z',
        items: [
            { id: 1, nome: 'Café Expresso', quantidade: 2, preco: 800, subtotal: 1600 },
            { id: 2, nome: 'Croissant de Chocolate', quantidade: 1, preco: 1200, subtotal: 1200 },
            { id: 3, nome: 'Suco de Laranja', quantidade: 1, preco: 1050, subtotal: 1050 }
        ]
    },
    {
        id: '002',
        tipo: 'mesa',
        local: 'Mesa 12',
        endereco: null,
        status: 'preparing',
        total: 2400,
        created_at: '2024-01-20T14:15:00Z',
        items: [
            { id: 3, nome: 'Cappuccino Grande', quantidade: 1, preco: 1200, subtotal: 1200 },
            { id: 4, nome: 'Pão de Açúcar', quantidade: 2, preco: 600, subtotal: 1200 }
        ]
    },
    {
        id: '003',
        tipo: 'balcao',
        local: 'Balcão - Cliente: João',
        endereco: null,
        status: 'ready',
        total: 1800,
        created_at: '2024-01-20T14:00:00Z',
        items: [
            { id: 5, nome: 'Café com Leite', quantidade: 1, preco: 900, subtotal: 900 },
            { id: 6, nome: 'Sanduíche Natural', quantidade: 1, preco: 900, subtotal: 900 }
        ]
    },
    {
        id: '004',
        tipo: 'delivery',
        local: 'Delivery - Maria Silva',
        endereco: 'Rua das Flores, 123 - Centro',
        status: 'preparing',
        total: 4200,
        created_at: '2024-01-20T13:45:00Z',
        items: [
            { id: 7, nome: 'Açaí Médio', quantidade: 1, preco: 1800, subtotal: 1800 },
            { id: 8, nome: 'Café Gelado', quantidade: 2, preco: 1200, subtotal: 2400 }
        ]
    },
    {
        id: '005',
        tipo: 'delivery',
        local: 'Delivery - Pedro Santos',
        endereco: 'Av. Brasil, 456 - Jardim América',
        status: 'ready',
        total: 3200,
        created_at: '2024-01-20T13:30:00Z',
        items: [
            { id: 9, nome: 'Combo Café da Manhã', quantidade: 1, preco: 2200, subtotal: 2200 },
            { id: 10, nome: 'Água Mineral', quantidade: 2, preco: 500, subtotal: 1000 }
        ]
    },
    {
        id: '006',
        tipo: 'mesa',
        local: 'Mesa 15',
        endereco: null,
        status: 'completed',
        total: 1600,
        created_at: '2024-01-20T13:15:00Z',
        items: [
            { id: 11, nome: 'Espresso Duplo', quantidade: 2, preco: 800, subtotal: 1600 }
        ]
    }
];

const getStatusInfo = (status: string) => {
    switch (status) {
        case 'pending':
            return {
                label: 'Aguardando',
                color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
                icon: '⏱️'
            };
        case 'preparing':
            return {
                label: 'Preparando',
                color: 'bg-blue-100 text-blue-800 border-blue-200',
                icon: '👨‍🍳'
            };
        case 'ready':
            return {
                label: 'Pronto',
                color: 'bg-green-100 text-green-800 border-green-200',
                icon: '✅'
            };
        case 'completed':
            return {
                label: 'Entregue',
                color: 'bg-gray-100 text-gray-800 border-gray-200',
                icon: '📦'
            };
        default:
            return {
                label: 'Desconhecido',
                color: 'bg-gray-100 text-gray-800 border-gray-200',
                icon: '❓'
            };
    }
};

const getTipoInfo = (tipo: string) => {
    switch (tipo) {
        case 'mesa':
            return {
                label: 'Mesa',
                color: 'bg-blue-50 text-blue-700 border-blue-200',
                icon: '🪑'
            };
        case 'balcao':
            return {
                label: 'Balcão',
                color: 'bg-purple-50 text-purple-700 border-purple-200',
                icon: '🏪'
            };
        case 'delivery':
            return {
                label: 'Delivery',
                color: 'bg-orange-50 text-orange-700 border-orange-200',
                icon: '🛵'
            };
        default:
            return {
                label: 'Outros',
                color: 'bg-gray-50 text-gray-700 border-gray-200',
                icon: '📋'
            };
    }
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value / 100);
};

const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

export default function OrdersPanel() {
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [orders, setOrders] = useState(mockOrders);

    const updateOrderStatus = (orderId: string, newStatus: string) => {
        setOrders(prev => prev.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    const getNextStatus = (currentStatus: string) => {
        switch (currentStatus) {
            case 'pending': return 'preparing';
            case 'preparing': return 'ready';
            case 'ready': return 'completed';
            default: return currentStatus;
        }
    };

    const pendingOrders = orders.filter(order => order.status === 'pending');
    const preparingOrders = orders.filter(order => order.status === 'preparing');
    const readyOrders = orders.filter(order => order.status === 'ready');
    const completedOrders = orders.filter(order => order.status === 'completed');

    return (
        <AuthenticatedLayout>
            <Head title="Painel de Pedidos" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Painel de Pedidos</h1>
                        <p className="text-gray-600">Gerencie todos os pedidos da cafeteria em tempo real</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-500">
                            Atualizado em: {new Date().toLocaleTimeString('pt-BR')}
                        </div>
                        <button
                            onClick={() => window.location.href = '/orders/create'}
                            className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
                        >
                            + Novo Pedido
                        </button>
                        <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                            🔄 Atualizar
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h3 className="text-lg font-semibold text-yellow-800">Aguardando</h3>
                        <p className="text-2xl font-bold text-yellow-900">{pendingOrders.length}</p>
                        <p className="text-sm text-yellow-600">Pedidos recebidos</p>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h3 className="text-lg font-semibold text-blue-800">Preparando</h3>
                        <p className="text-2xl font-bold text-blue-900">{preparingOrders.length}</p>
                        <p className="text-sm text-blue-600">Na cozinha</p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h3 className="text-lg font-semibold text-green-800">Prontos</h3>
                        <p className="text-2xl font-bold text-green-900">{readyOrders.length}</p>
                        <p className="text-sm text-green-600">Para entrega</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">Entregues</h3>
                        <p className="text-2xl font-bold text-gray-900">{completedOrders.length}</p>
                        <p className="text-sm text-gray-600">Hoje</p>
                    </div>
                </div>

                {/* Orders Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                    {orders.map((order) => {
                        const statusInfo = getStatusInfo(order.status);
                        const tipoInfo = getTipoInfo(order.tipo);
                        const canAdvance = order.status !== 'completed';

                        return (
                            <div
                                key={order.id}
                                className="bg-white rounded-lg border border-gray-200 shadow-md transition-shadow hover:shadow-lg"
                            >
                                {/* Order Header */}
                                <div className="p-4 border-b border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="flex gap-2 items-center mb-1">
                                                <h3 className="text-lg font-bold text-gray-900">
                                                    Pedido #{order.id}
                                                </h3>
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${tipoInfo.color}`}>
                                                    <span className="mr-1">{tipoInfo.icon}</span>
                                                    {tipoInfo.label}
                                                </span>
                                            </div>
                                            <p className="font-medium text-gray-600">{order.local}</p>
                                            {order.endereco && (
                                                <p className="text-sm text-gray-500">📍 {order.endereco}</p>
                                            )}
                                            <p className="text-sm text-gray-500">
                                                {formatTime(order.created_at)}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusInfo.color}`}>
                                                <span className="mr-1">{statusInfo.icon}</span>
                                                {statusInfo.label}
                                            </div>
                                            <div className="mt-2 text-lg font-bold text-gray-900">
                                                {formatCurrency(order.total)}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="p-4">
                                    <h4 className="mb-2 font-semibold text-gray-800">Produtos:</h4>
                                    <div className="space-y-2">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex justify-between items-center text-sm">
                                                <div className="flex-1">
                                                    <span className="font-medium text-gray-900">
                                                        {item.quantidade}x {item.nome}
                                                    </span>
                                                </div>
                                                <div className="text-gray-600">
                                                    {formatCurrency(item.subtotal)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Order Actions */}
                                <div className="flex justify-between items-center p-4 bg-gray-50 border-t border-gray-200">
                                    <button
                                        onClick={() => setSelectedOrder(order)}
                                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                    >
                                        Ver Detalhes
                                    </button>

                                    {canAdvance && (
                                        <button
                                            onClick={() => updateOrderStatus(order.id, getNextStatus(order.status))}
                                            className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                                        >
                                            {order.status === 'pending' && '👨‍🍳 Iniciar Preparo'}
                                            {order.status === 'preparing' && '✅ Marcar Pronto'}
                                            {order.status === 'ready' && (order.tipo === 'delivery' ? '🛵 Saiu p/ Entrega' : '📦 Marcar Entregue')}
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Order Details Modal */}
                {selectedOrder && (
                    <div className="flex fixed inset-0 z-50 justify-center items-center p-4 bg-black bg-opacity-50">
                        <div className="overflow-y-auto w-full max-w-2xl max-h-screen bg-white rounded-lg">
                            {/* Modal Header */}
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Detalhes do Pedido #{selectedOrder.id}
                                    </h2>
                                    <button
                                        onClick={() => setSelectedOrder(null)}
                                        className="text-2xl text-gray-400 hover:text-gray-600"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6">
                                <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <h3 className="mb-2 font-semibold text-gray-800">Informações do Pedido</h3>
                                        <p><strong>Tipo:</strong> {getTipoInfo(selectedOrder.tipo).icon} {getTipoInfo(selectedOrder.tipo).label}</p>
                                        <p><strong>Local:</strong> {selectedOrder.local}</p>
                                        {selectedOrder.endereco && (
                                            <p><strong>Endereço:</strong> {selectedOrder.endereco}</p>
                                        )}
                                        <p><strong>Horário:</strong> {new Date(selectedOrder.created_at).toLocaleString('pt-BR')}</p>
                                        <p><strong>Status:</strong> {getStatusInfo(selectedOrder.status).label}</p>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-semibold text-gray-800">Resumo Financeiro</h3>
                                        <p><strong>Total:</strong> {formatCurrency(selectedOrder.total)}</p>
                                        <p><strong>Itens:</strong> {selectedOrder.items.length} produtos</p>
                                        {selectedOrder.tipo === 'delivery' && (
                                            <p className="mt-2 font-medium text-orange-600">🛵 Pedido para Delivery</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-4 font-semibold text-gray-800">Produtos do Pedido</h3>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-2 text-sm font-medium text-left text-gray-500">Produto</th>
                                                    <th className="px-4 py-2 text-sm font-medium text-center text-gray-500">Qtd</th>
                                                    <th className="px-4 py-2 text-sm font-medium text-right text-gray-500">Preço Unit.</th>
                                                    <th className="px-4 py-2 text-sm font-medium text-right text-gray-500">Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {selectedOrder.items.map((item: any, index: number) => (
                                                    <tr key={index}>
                                                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                                            {item.nome}
                                                        </td>
                                                        <td className="px-4 py-3 text-sm text-center text-gray-500">
                                                            {item.quantidade}
                                                        </td>
                                                        <td className="px-4 py-3 text-sm text-right text-gray-500">
                                                            {formatCurrency(item.preco)}
                                                        </td>
                                                        <td className="px-4 py-3 text-sm font-medium text-right text-gray-900">
                                                            {formatCurrency(item.subtotal)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot className="bg-gray-50">
                                                <tr>
                                                    <td colSpan={3} className="px-4 py-3 text-sm font-medium text-right text-gray-900">
                                                        Total:
                                                    </td>
                                                    <td className="px-4 py-3 text-sm font-bold text-right text-gray-900">
                                                        {formatCurrency(selectedOrder.total)}
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 bg-gray-50 border-t border-gray-200">
                                <div className="flex justify-end items-center space-x-3">
                                    <button
                                        onClick={() => setSelectedOrder(null)}
                                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                                    >
                                        Fechar
                                    </button>
                                    {selectedOrder.status !== 'completed' && (
                                        <button
                                            onClick={() => {
                                                updateOrderStatus(selectedOrder.id, getNextStatus(selectedOrder.status));
                                                setSelectedOrder(null);
                                            }}
                                            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                        >
                                            Avançar Status
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Info Message */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="w-5 h-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">
                                Painel de Pedidos da Cafeteria
                            </h3>
                            <div className="mt-2 text-sm text-blue-700">
                                <p>
                                    Esta página mostra todos os pedidos em tempo real. Suporta pedidos de <strong>Mesa</strong> 🪑,
                                    <strong>Balcão</strong> 🏪 e <strong>Delivery</strong> 🛵. Clique nos botões para avançar o status
                                    e use "Ver Detalhes" para visualizar produtos completos.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
