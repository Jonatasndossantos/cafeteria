import { useState, useCallback } from 'react';
import axios from 'axios';
import { configureAxiosAuth } from '../lib/auth';
import { Order, OrderStats } from '../types';

interface UseOrdersParams {
    limit?: number;
    page?: number;
    search?: string;
    status?: string;
    payment_status?: string;
    date_from?: string;
    date_to?: string;
}

interface UseOrdersReturn {
    orders: Order[];
    stats: OrderStats | null;
    loading: boolean;
    error: string | null;
    total: number;
    fetchOrders: (params?: UseOrdersParams) => Promise<void>;
    fetchOrderStats: () => Promise<void>;
    updateOrderStatus: (id: string, status: Order['status']) => Promise<Order | null>;
    updatePaymentStatus: (id: string, paymentStatus: Order['payment_status']) => Promise<Order | null>;
    getOrder: (id: string) => Promise<Order | null>;
    refreshOrders: () => Promise<void>;
}

export const useOrders = (): UseOrdersReturn => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [stats, setStats] = useState<OrderStats | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);
    const [lastParams, setLastParams] = useState<UseOrdersParams>({});

    const handleError = (err: any) => {
        if (err.response?.data) {
            const apiError = err.response.data;
            setError(apiError.message || apiError.error || 'Erro desconhecido');
        } else {
            setError(err.message || 'Erro na requisição');
        }
        console.error('Erro na API de pedidos:', err);
    };

    const fetchOrders = useCallback(async (params: UseOrdersParams = {}) => {
        setLoading(true);
        setError(null);
        setLastParams(params);

        try {
            configureAxiosAuth(axios);
            const response = await axios.get('/api/orders', { params });

            if (response.data.orders) {
                setOrders(response.data.orders);
                setTotal(response.data.total || response.data.orders.length);
            } else {
                setOrders(Array.isArray(response.data) ? response.data : []);
                setTotal(Array.isArray(response.data) ? response.data.length : 0);
            }
        } catch (err) {
            handleError(err);
            setOrders([]);
            setTotal(0);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchOrderStats = useCallback(async () => {
        try {
            configureAxiosAuth(axios);
            const response = await axios.get('/api/orders/stats');
            setStats(response.data);
        } catch (err) {
            handleError(err);
        }
    }, []);

    const updateOrderStatus = useCallback(async (id: string, status: Order['status']): Promise<Order | null> => {
        setLoading(true);
        setError(null);

        try {
            configureAxiosAuth(axios);
            const response = await axios.patch(`/api/orders/${id}/status`, { status });
            const updatedOrder = response.data;

            setOrders(prev => prev.map(order => order.id === id ? updatedOrder : order));
            return updatedOrder;
        } catch (err) {
            handleError(err);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const updatePaymentStatus = useCallback(async (id: string, paymentStatus: Order['payment_status']): Promise<Order | null> => {
        setLoading(true);
        setError(null);

        try {
            configureAxiosAuth(axios);
            const response = await axios.patch(`/api/orders/${id}/payment-status`, { payment_status: paymentStatus });
            const updatedOrder = response.data;

            setOrders(prev => prev.map(order => order.id === id ? updatedOrder : order));
            return updatedOrder;
        } catch (err) {
            handleError(err);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const getOrder = useCallback(async (id: string): Promise<Order | null> => {
        setLoading(true);
        setError(null);

        try {
            configureAxiosAuth(axios);
            const response = await axios.get(`/api/orders/${id}`);
            return response.data;
        } catch (err) {
            handleError(err);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const refreshOrders = useCallback(async () => {
        await fetchOrders(lastParams);
    }, [fetchOrders, lastParams]);

    return {
        orders,
        stats,
        loading,
        error,
        total,
        fetchOrders,
        fetchOrderStats,
        updateOrderStatus,
        updatePaymentStatus,
        getOrder,
        refreshOrders,
    };
};
