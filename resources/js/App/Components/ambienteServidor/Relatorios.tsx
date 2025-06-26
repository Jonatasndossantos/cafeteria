import React from 'react';
import { Card, CardContent } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Button } from '@/Components/ui/button';
import { Eye, Download, FileText } from 'lucide-react';

export const Relatorios = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Relatórios</h2>
        <p className="text-gray-600 text-sm">Gere e visualize relatórios personalizados</p>
      </div>
      
      {/* Relatórios recentes */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Data de geração</TableHead>
                <TableHead>Formato</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Contratos sob minha fiscalização</TableCell>
                <TableCell>01/06/2025 14:30</TableCell>
                <TableCell>PDF</TableCell>
                <TableCell className="space-x-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Botão Fixo para Gerar Relatório */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          onClick={() => {/* TODO: Implementar geração de relatório */}}
          className="h-12 px-6 rounded-full bg-[#0A3D62] hover:bg-[#CB991A] text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
        >
          <FileText className="h-5 w-5" />
          <span>Gerar Relatório</span>
        </Button>
      </div>
    </div>
  );
};
