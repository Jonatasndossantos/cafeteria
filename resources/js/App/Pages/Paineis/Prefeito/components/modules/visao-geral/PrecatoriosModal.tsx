
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/Components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/Components/ui/table";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

const precatorioData = {
  totalAberto: 14500000,
  valorExercicio: 2800000,
  comprometimento: 1.9, // %
};

const format = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export function PrecatoriosModal({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Cronograma de Precatórios</DialogTitle>
          <DialogDescription>
            Detalhes sobre compromissos judiciais do município.
          </DialogDescription>
        </DialogHeader>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Total em Aberto</TableCell>
              <TableCell>{format(precatorioData.totalAberto)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Valor programado p/ este exercício</TableCell>
              <TableCell>{format(precatorioData.valorExercicio)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Comprometimento % da RCL</TableCell>
              <TableCell className="font-semibold">{precatorioData.comprometimento}%</TableCell>
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
