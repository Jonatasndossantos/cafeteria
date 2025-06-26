import React, { useState } from 'react';
import { Card, CardContent } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Clock, Search, Plus } from 'lucide-react';
import { demandas } from '../../hooks/AmbienteServidorData/ambienteServidorData';
import { router } from '@inertiajs/react';

export const MinhasDemandas = () => {
  const [filtroStatus, setFiltroStatus] = useState('todos');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 text-xl font-semibold">Minhas Etapas e Prazos</h2>
        <p className="text-sm text-gray-600">Demandas vinculadas ao seu cargo e setor</p>
      </div>

      {/* Filtros e busca */}
      <div className="flex justify-between gap-4">
        <div className="relative max-w-sm">
          <Search className="absolute w-4 h-4 text-gray-400 left-3 top-3" />
          <Input placeholder="Buscar demanda..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Select value={filtroStatus} onValueChange={setFiltroStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os status</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="em-andamento">Em andamento</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabela de demandas */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Processo</TableHead>
                <TableHead>Modalidade</TableHead>
                <TableHead>Prazo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demandas.map((demanda) => (
                <TableRow key={demanda.id}>
                  <TableCell className="font-medium">{demanda.id}</TableCell>
                  <TableCell>{demanda.tipo}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{demanda.prazo}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        demanda.status === 'Pendente' ? 'destructive' :
                        demanda.status === 'Em acompanhamento' ? 'outline' :
                        'default'
                      }
                    >
                      {demanda.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="link" className="h-auto p-0">
                      {demanda.tipo === 'Planejamento' ? 'Abrir' : 'Visualizar'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Botão Fixo para Criar Novo Processo */}
      <div className="fixed z-50 bottom-8 right-8">
        <Button
          onClick={() => router.visit('/processos/create')}
          className="h-12 px-6 rounded-full bg-[#0A3D62] hover:bg-[#CB991A] text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Novo Processo</span>
        </Button>
      </div>
    </div>
  );
};
