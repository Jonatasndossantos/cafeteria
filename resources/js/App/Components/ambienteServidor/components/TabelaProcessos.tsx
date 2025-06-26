
import React from 'react';
import { Card, CardContent } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Eye, Clock, MoreVertical } from 'lucide-react';
import { ProcessoAdministrativo } from '@/Components/ambienteServidor/types/painelProcessos';

interface TabelaProcessosProps {
  processos: ProcessoAdministrativo[];
  onProcessoSelect: (processo: ProcessoAdministrativo) => void;
}

export const TabelaProcessos = ({ processos, onProcessoSelect }: TabelaProcessosProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em Andamento':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Próximo ao Vencimento':
        return 'bg-orange-50 text-orange-600 border-orange-200';
      case 'Concluído':
        return 'bg-green-50 text-green-600 border-green-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'Alta':
        return 'bg-red-50 text-red-600 border-red-200';
      case 'Média':
        return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'Baixa':
        return 'bg-gray-50 text-gray-600 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  if (processos.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">Nenhum processo encontrado com os filtros aplicados.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nº Processo</TableHead>
              <TableHead>Modalidade</TableHead>
              <TableHead>Objeto</TableHead>
              <TableHead>Espada</TableHead>
              <TableHead>Fase Atual</TableHead>
              <TableHead>Fornecedor</TableHead>
              <TableHead>Vigência até</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Notificações</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {processos.map((processo) => (
              <TableRow key={processo.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{processo.numero}</TableCell>
                <TableCell>
                  <Badge variant="outline">{processo.modalidade}</Badge>
                </TableCell>
                <TableCell className="max-w-xs">
                  <div className="truncate" title={processo.objeto}>
                    {processo.objeto}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-semibold">
                      {processo.espadaAtual}
                    </div>
                    <span className="text-sm text-gray-600">Espada {processo.espadaAtual}</span>
                  </div>
                </TableCell>
                <TableCell>{processo.faseAtual}</TableCell>
                <TableCell>{processo.fornecedor || '-'}</TableCell>
                <TableCell>
                  {processo.vigenciaAte ? (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      {processo.vigenciaAte}
                    </div>
                  ) : '-'}
                </TableCell>
                <TableCell className="font-semibold">{processo.valor}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(processo.status)}>
                    {processo.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getPrioridadeColor(processo.prioridade)}>
                    {processo.prioridade}
                  </Badge>
                </TableCell>
                <TableCell>
                  {processo.notificacoes > 0 ? (
                    <Badge variant="destructive" className="rounded-full">
                      {processo.notificacoes}
                    </Badge>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onProcessoSelect(processo)}
                      className="flex items-center gap-1"
                    >
                      <Eye className="h-4 w-4" />
                      Visualizar
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
