import { useState, useCallback } from 'react';
import axios from 'axios';
import { configureAxiosAuth } from '../lib/auth';
import {
  SupabaseUser,
  SupabaseUsersResponse,
  CreateSupabaseUserData,
  UpdateSupabaseUserData,
  SupabaseApiError
} from '../types/supabase';

interface UseSupabaseUsersReturn {
  users: SupabaseUser[];
  loading: boolean;
  error: string | null;
  total: number;
  fetchUsers: (params?: { limit?: number; page?: number; search?: string }) => Promise<void>;
  createUser: (userData: CreateSupabaseUserData) => Promise<SupabaseUser | null>;
  updateUser: (id: string, userData: UpdateSupabaseUserData) => Promise<SupabaseUser | null>;
  deleteUser: (id: string) => Promise<boolean>;
  banUser: (id: string, duration?: string) => Promise<boolean>;
  unbanUser: (id: string) => Promise<boolean>;
  confirmEmail: (id: string) => Promise<boolean>;
  getUser: (id: string) => Promise<SupabaseUser | null>;
}

export const useSupabaseUsers = (): UseSupabaseUsersReturn => {
  const [users, setUsers] = useState<SupabaseUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const handleError = (err: any) => {
    if (err.response?.data) {
      const apiError = err.response.data as SupabaseApiError;
      setError(apiError.message || apiError.error || 'Erro desconhecido');
    } else {
      setError(err.message || 'Erro na requisição');
    }
    console.error('Erro na API:', err);
  };

  const fetchUsers = useCallback(async (params?: { limit?: number; page?: number; search?: string }) => {
    setLoading(true);
    setError(null);

    try {
      // Configura autenticação antes de cada requisição
      configureAxiosAuth(axios);

      const response = await axios.get('/api/supabase/users', { params });

      if (response.data.users) {
        setUsers(response.data.users);
        setTotal(response.data.total || response.data.users.length);
      } else {
        // Se a resposta for um array direto
        setUsers(Array.isArray(response.data) ? response.data : []);
        setTotal(Array.isArray(response.data) ? response.data.length : 0);
      }
    } catch (err) {
      handleError(err);
      setUsers([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(async (userData: CreateSupabaseUserData): Promise<SupabaseUser | null> => {
    setLoading(true);
    setError(null);

    try {
      configureAxiosAuth(axios);
      const response = await axios.post('/api/supabase/users', userData);
      const newUser = response.data;

      // Atualiza a lista local
      setUsers(prev => [newUser, ...prev]);
      setTotal(prev => prev + 1);

      return newUser;
    } catch (err) {
      handleError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (id: string, userData: UpdateSupabaseUserData): Promise<SupabaseUser | null> => {
    setLoading(true);
    setError(null);

    try {
      configureAxiosAuth(axios);
      const response = await axios.put(`/api/supabase/users/${id}`, userData);
      const updatedUser = response.data;

      // Atualiza a lista local
      setUsers(prev => prev.map(user => user.id === id ? updatedUser : user));

      return updatedUser;
    } catch (err) {
      handleError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUser = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      configureAxiosAuth(axios);
      await axios.delete(`/api/supabase/users/${id}`);

      // Remove da lista local
      setUsers(prev => prev.filter(user => user.id !== id));
      setTotal(prev => prev - 1);

      return true;
    } catch (err) {
      handleError(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const banUser = useCallback(async (id: string, duration = '24h'): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      configureAxiosAuth(axios);
      const response = await axios.post(`/api/supabase/users/${id}/ban`, { duration });
      const updatedUser = response.data.data;

      // Atualiza a lista local
      if (updatedUser) {
        setUsers(prev => prev.map(user => user.id === id ? updatedUser : user));
      }

      return true;
    } catch (err) {
      handleError(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const unbanUser = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      configureAxiosAuth(axios);
      const response = await axios.post(`/api/supabase/users/${id}/unban`);
      const updatedUser = response.data.data;

      // Atualiza a lista local
      if (updatedUser) {
        setUsers(prev => prev.map(user => user.id === id ? updatedUser : user));
      }

      return true;
    } catch (err) {
      handleError(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const confirmEmail = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      configureAxiosAuth(axios);
      const response = await axios.post(`/api/supabase/users/${id}/confirm-email`);
      const updatedUser = response.data.data;

      // Atualiza a lista local
      if (updatedUser) {
        setUsers(prev => prev.map(user => user.id === id ? updatedUser : user));
      }

      return true;
    } catch (err) {
      handleError(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const getUser = useCallback(async (id: string): Promise<SupabaseUser | null> => {
    setLoading(true);
    setError(null);

    try {
      configureAxiosAuth(axios);
      const response = await axios.get(`/api/supabase/users/${id}`);
      return response.data;
    } catch (err) {
      handleError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    users,
    loading,
    error,
    total,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    banUser,
    unbanUser,
    confirmEmail,
    getUser,
  };
};
