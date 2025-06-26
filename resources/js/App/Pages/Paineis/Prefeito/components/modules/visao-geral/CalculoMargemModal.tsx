
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/Components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

const valores = {
  receitaCorrenteLiquida: 145000000,
  gastoComPessoal: 68000000,
  saudeEducacao: 42000000,
  rppsOutrosVinculados: 9400000,
  disponivel: 25600000,
};

const format = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export function CalculoMargemModal({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Cálculo da Margem Para Investir</DialogTitle>
          <DialogDescription>
            Demonstrativo simplificado dos fatores que compõem a capacidade atual de investimento.
          </DialogDescription>
        </DialogHeader>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Receita Corrente Líquida</TableCell>
              <TableCell className="font-semibold">{format(valores.receitaCorrenteLiquida)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gasto com Pessoal</TableCell>
              <TableCell>{format(valores.gastoComPessoal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Saúde + Educação</TableCell>
              <TableCell>{format(valores.saudeEducacao)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>RPPS + Outros vinculados</TableCell>
              <TableCell>{format(valores.rppsOutrosVinculados)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Disponível p/ Investir</TableCell>
              <TableCell className="font-bold text-emerald-700">{format(valores.disponivel)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <DialogClose asChild>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full">Fechar</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
