import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../axios';
import { usePage } from '@inertiajs/react';

interface Document {
  id: number;
  name: string;
  description: string | null;
  file_path: string;
  file_type: string;
  document_type: string | null;
  usuario_id: number | null;
  status: string;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

interface SaveDocumentData {
  id?: number;
  processo_id: number;
  name: string;
  description?: string | null;
  document_type: string;
  metadata: Record<string, any>;
}

export function useDocument() {
  const queryClient = useQueryClient();

  // Buscar documento específico
  const getDocument = (id: number) => {
    return useQuery({
      queryKey: ['document', id],
      queryFn: async () => {
        const { data } = await axios.get(`/api/documents/${id}`);
        return data as Document;
      }
    });
  };

  // Listar documentos
  const listDocuments = (type?: string) => {
    return useQuery({
      queryKey: ['documents', type],
      queryFn: async () => {
        const { data } = await axios.get('/api/documents', { params: { type } });
        return data as Document[];
      }
    });
  };
  

  // Salvar documento
  const saveDocument = useMutation({
    mutationFn: async (data: SaveDocumentData) => {
      const { data: response } = await axios.post('/api/documents', data);
      return response as Document;
    },
    onSuccess: (savedDocument) => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.setQueryData(['document'], savedDocument);
    }
  });

  // Atualizar documento
  const updateDocument = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<SaveDocumentData> }) => {
      const { data: response } = await axios.put(`/api/documents/${id}`, data);
      return response as Document;
    },
    onSuccess: (updatedDocument) => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.setQueryData(['document'], updatedDocument);
    }
  });

  return {
    getDocument,
    listDocuments,
    saveDocument,
    updateDocument,
    documentData
  };
} 