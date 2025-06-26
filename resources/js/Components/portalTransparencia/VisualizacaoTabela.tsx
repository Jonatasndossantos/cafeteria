import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { DocumentoPublico } from '@/types/portalTransparencia';
import { Download, Share, CheckCircle, Lock, AlertTriangle, Loader2 } from 'lucide-react';
import { router } from '@inertiajs/react';
import axios from 'axios';

interface VisualizacaoTabelaProps {
  documentos: DocumentoPublico[];
  onDownload?: (documento: DocumentoPublico) => Promise<void>;
}

export const VisualizacaoTabela = ({ 
  documentos,
  onDownload
}: VisualizacaoTabelaProps) => {
  const [downloadingIds, setDownloadingIds] = useState<Set<string>>(new Set());
  
  //console.log('Documentos recebidos na tabela:', documentos); // Debug log
  
  const getIconeAutenticidade = (nivel: string) => {
    switch (nivel) {
      case 'Válida':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Parcial':
        return <Lock className="w-4 h-4 text-yellow-600" />;
      case 'Pendente':
      case 'Inválida':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'concluído':
      case 'concluido':
        return 'bg-green-100 text-green-800';
      case 'em andamento':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatarMoeda = (valor?: number) => {
    if (!valor) return '-';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const formatarData = (data: string) => {
    if (!data) return '-';
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const handleRowClick = (documento: DocumentoPublico) => {
    router.visit(`/processos/${documento.id}`);
  };

  const handleDownload = async (documento: DocumentoPublico, e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que o clique propague para a linha
    
    // Adicionar ao estado de loading
    setDownloadingIds(prev => new Set(prev).add(documento.id));
    
    try {
      if (onDownload) {
        // Usar a função personalizada se fornecida
        await onDownload(documento);
      } else {
        // Implementação padrão
        const response = await axios.get(`/api/documentos/${documento.id}/pdf`, {
          responseType: 'blob'
        });
        
        // Criar um link para download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `documento-${documento.numeroProcesso}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Erro ao baixar PDF:', error);
      alert('Erro ao baixar o PDF. Tente novamente.');
    } finally {
      // Remover do estado de loading
      setDownloadingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(documento.id);
        return newSet;
      });
    }
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Processo/Documento</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Objeto</TableHead>
            <TableHead>Secretaria</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documentos?.map((documento) => (
            <TableRow 
              key={documento.id} 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleRowClick(documento)}
            >
              <TableCell>
                <div>
                  <div className="text-sm font-medium">{documento.numeroProcesso}</div>
                  <div className="text-xs text-gray-500">{documento.numeroDocumento}</div>
                </div>
              </TableCell>
              
              <TableCell>
                <Badge variant="outline" className="text-xs">
                  {documento.tipo}
                </Badge>
              </TableCell>
              
              <TableCell className="text-sm">
                {formatarData(documento.dataPublicacao)}
              </TableCell>
              
              <TableCell>
                <div className="max-w-xs text-sm truncate" title={documento.objeto}>
                  {documento.objeto}
                </div>
              </TableCell>
              
              <TableCell className="text-sm">
                {documento.secretaria}
              </TableCell>
              
              <TableCell className="text-sm font-medium">
                {formatarMoeda(documento.valor)}
              </TableCell>
              
              <TableCell>
                <Badge className={`text-xs ${getStatusColor(documento.status)}`}>
                  {documento.status}
                </Badge>
              </TableCell>
              
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    title="Baixar PDF"
                    onClick={(e) => handleDownload(documento, e)}
                    disabled={downloadingIds.has(documento.id)}
                  >
                    {downloadingIds.has(documento.id) ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Download className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {documentos?.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          Nenhum documento encontrado com os filtros aplicados.
        </div>
      )}
    </div>
  );
};
