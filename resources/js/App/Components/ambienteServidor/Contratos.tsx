
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { contratos } from '../../hooks/AmbienteServidorData/ambienteServidorData';

export const Contratos = () => {
  // Separar contratos por status
  const contratosEmVigor = contratos.filter(contrato => contrato.status === 'Vigente');
  const contratosProximoVencimento = contratos.filter(contrato => contrato.status === 'Próximo ao vencimento');
  const contratosEncerrados = contratos.filter(contrato => contrato.status === 'Encerrado');

  const renderTabelaContratos = (listaContratos: typeof contratos, statusColor: string) => (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contrato</TableHead>
              <TableHead>Objeto</TableHead>
              <TableHead>Fornecedor</TableHead>
              <TableHead>Vigência até</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listaContratos.map((contrato) => (
              <TableRow key={contrato.id}>
                <TableCell className="font-medium">{contrato.id}</TableCell>
                <TableCell>{contrato.objeto}</TableCell>
                <TableCell>{contrato.fornecedor}</TableCell>
                <TableCell>{contrato.vigencia}</TableCell>
                <TableCell>{contrato.valor}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColor}>
                    {contrato.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="link" className="p-0 h-auto">
                    Visualizar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Contratos</h2>
        <p className="text-gray-600 text-sm">Contratos sob sua fiscalização ou gestão</p>
      </div>
      
      <Tabs defaultValue="em-vigor" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="em-vigor">
            Em Vigor ({contratosEmVigor.length})
          </TabsTrigger>
          <TabsTrigger value="proximo-vencimento">
            Próximo ao Vencimento ({contratosProximoVencimento.length})
          </TabsTrigger>
          <TabsTrigger value="encerrados">
            Encerrados ({contratosEncerrados.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="em-vigor" className="mt-6">
          {renderTabelaContratos(contratosEmVigor, "bg-green-50 text-green-600 border-green-200")}
        </TabsContent>

        <TabsContent value="proximo-vencimento" className="mt-6">
          {renderTabelaContratos(contratosProximoVencimento, "bg-yellow-50 text-yellow-600 border-yellow-200")}
        </TabsContent>

        <TabsContent value="encerrados" className="mt-6">
          {renderTabelaContratos(contratosEncerrados, "bg-gray-50 text-gray-600 border-gray-200")}
        </TabsContent>
      </Tabs>
    </div>
  );
};
