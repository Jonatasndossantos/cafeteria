
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

const rows = [
  {
    tipo: "Parcelamentos Previdenciários",
    valor: 35000000,
    obs: "INSS, parcelado em até 240 meses",
  },
  {
    tipo: "Financiamentos Bancários",
    valor: 40000000,
    obs: "Caixa/BNDES/FINISA etc.",
  },
  {
    tipo: "Precatórios Judiciais",
    valor: 14500000,
    obs: "Determinados judicialmente, CNJ",
  },
];

const format = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export function DetalhamentoDividaModal({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Detalhamento da Dívida Consolidada</DialogTitle>
          <DialogDescription>
            Composição da dívida conforme Resolução 40/2001 do Senado e Portaria STN nº 919/2022.
          </DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo de Dívida</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Observações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) =>
              <TableRow key={r.tipo}>
                <TableCell>{r.tipo}</TableCell>
                <TableCell>{format(r.valor)}</TableCell>
                <TableCell>{r.obs}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DialogClose asChild>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full">Fechar</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
