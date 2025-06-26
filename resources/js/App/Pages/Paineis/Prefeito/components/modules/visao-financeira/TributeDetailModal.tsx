
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Tribute } from "./InteractiveTributesChart";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tribute: Tribute | null;
}
export const TributeDetailModal: React.FC<Props> = ({ open, onOpenChange, tribute }) => {
  if (!tribute) return null;

  // Dados históricos de exemplo fictício
  const historicoData = tribute.historico.map((v, i) => {
    const ano = new Date().getFullYear() - (tribute.historico.length - 1 - i);
    return { ano, arrecadado: v };
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex flex-col">
            Detalhes do Tributo: <span className="text-blue-800">{tribute.name}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div>
            <span className="font-semibold">Arrecadação dos últimos 3 anos</span>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={historicoData}>
                <XAxis dataKey="ano" />
                <Tooltip
                  formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`]}
                />
                <Bar dataKey="arrecadado" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <div>
              <span className="font-medium">Inadimplência estimada: </span>
              <span className="text-red-600 font-mono">{tribute.inadimplencia}</span>
            </div>
            <div>
              <span className="font-medium">Principais Contribuintes: </span>
              {tribute.principaisContribuintes.join(", ")}
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Legislação de referência: <span className="font-semibold">{tribute.legislacao}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
