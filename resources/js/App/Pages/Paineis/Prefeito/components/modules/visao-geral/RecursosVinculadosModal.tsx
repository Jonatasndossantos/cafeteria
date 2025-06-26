
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/Components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const dadosVinculados = [
  {
    fonte: "FUNDEB",
    valor: 6000000,
    finalidade: "Educação básica",
    vinculo: "EC 108/2020"
  },
  {
    fonte: "PAB",
    valor: 2200000,
    finalidade: "Saúde Básica",
    vinculo: "Portaria GM/MS 3.992/17"
  },
  {
    fonte: "Convênio FNDE",
    valor: 850000,
    finalidade: "Merenda Escolar",
    vinculo: "Portarias FNDE vigentes"
  },
  {
    fonte: "Piso Enfermagem",
    valor: 5150000,
    finalidade: "Complemento salarial enfermagem",
    vinculo: "Lei 14.434/22"
  },
];

const format = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export const RecursosVinculadosModal = ({ open, onOpenChange }: ModalProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Origem dos Recursos Vinculados</DialogTitle>
        <DialogDescription>
          Relação detalhada das principais fontes de recursos vinculados, seus valores, finalidade e vínculo legal.
        </DialogDescription>
      </DialogHeader>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fonte</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Finalidade</TableHead>
              <TableHead>Vínculo Legal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dadosVinculados.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.fonte}</TableCell>
                <TableCell>{format(item.valor)}</TableCell>
                <TableCell>{item.finalidade}</TableCell>
                <TableCell>{item.vinculo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <DialogClose asChild>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full">Fechar</button>
      </DialogClose>
    </DialogContent>
  </Dialog>
);

