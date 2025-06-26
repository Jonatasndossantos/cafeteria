
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";

const obrigacoesFiscais = [
  // Obrigações já entregues
  { documento: "RGF 1º Quadrimestre", competencia: "Jan-Abr", situacao: "entregue", dataEnvio: "28/05/2024", prazo: null },
  { documento: "RREO 3º Bimestre", competencia: "Mai-Jun", situacao: "entregue", dataEnvio: "05/07/2024", prazo: null },
  { documento: "CAPAG", competencia: "2024", situacao: "conforme", dataEnvio: "15/07/2024", prazo: null },
  
  // Próximas obrigações
  { documento: "RREO 4º Bimestre", competencia: "Jul-Ago", situacao: "pendente", dataEnvio: null, prazo: "2025-07-30" },
  { documento: "RGF 2º Quadrimestre", competencia: "Mai-Ago", situacao: "pendente", dataEnvio: null, prazo: "2025-08-30" },
  { documento: "RREO 5º Bimestre", competencia: "Set-Out", situacao: "pendente", dataEnvio: null, prazo: "2025-09-30" }
];

function calcularDiasRestantes(prazo: string | null) {
  if (!prazo) return null;
  const hoje = new Date();
  const dataPrazo = new Date(prazo);
  const diff = Math.ceil((dataPrazo.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

function getSituacaoBadge(situacao: string, prazo: string | null, dataEnvio: string | null) {
  if (situacao === "entregue") {
    return <Badge variant="default" className="bg-green-200 text-green-900 border-green-300">✅ Entregue</Badge>;
  }
  
  if (situacao === "conforme") {
    return <Badge variant="default" className="bg-green-200 text-green-900 border-green-300">✅ Conforme</Badge>;
  }
  
  if (situacao === "pendente" && prazo) {
    const dias = calcularDiasRestantes(prazo);
    if (dias === null) return <Badge variant="outline">Pendente</Badge>;
    
    if (dias > 14) return <Badge variant="default" className="bg-blue-100 text-blue-800 border-blue-200">⏳ {dias} dias</Badge>;
    if (dias > 0) return <Badge variant="secondary" className="bg-yellow-200 text-yellow-900 border-yellow-300">⏳ {dias} dias</Badge>;
    if (dias === 0) return <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200 animate-pulse">⚠️ Vence hoje</Badge>;
    return <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200 animate-pulse">⚠️ Atrasado</Badge>;
  }
  
  return <Badge variant="outline">Pendente</Badge>;
}

export function PainelObrigacoesFiscais() {
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle>Painel Unificado de Obrigações Fiscais</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome do Relatório</TableHead>
              <TableHead>Competência</TableHead>
              <TableHead>Situação</TableHead>
              <TableHead>Prazo ou Data de Envio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {obrigacoesFiscais.map((obrigacao, index) => (
              <TableRow key={index} className="hover:bg-gray-50/50">
                <TableCell className="font-medium">{obrigacao.documento}</TableCell>
                <TableCell>{obrigacao.competencia}</TableCell>
                <TableCell>
                  {getSituacaoBadge(obrigacao.situacao, obrigacao.prazo, obrigacao.dataEnvio)}
                </TableCell>
                <TableCell>
                  {obrigacao.dataEnvio ? (
                    <span className="text-sm text-green-700">Enviado em {obrigacao.dataEnvio}</span>
                  ) : obrigacao.prazo ? (
                    <span className="text-sm font-medium">
                      Prazo: {new Date(obrigacao.prazo).toLocaleDateString("pt-BR")}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-500">-</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption className="text-xs mt-2 text-gray-600">
            Acompanhamento unificado de obrigações fiscais: entregues, pendentes e com prazos críticos.
          </TableCaption>
        </Table>
      </CardContent>
    </Card>
  );
}
