
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/Components/ui/table";
import { ExternalLink } from "lucide-react";

const recomendacoes = [
  {
    categoria: "Financeira",
    acao: "Implementar contingenciamento preventivo da folha",
    origem: "Gastos com Pessoal",
    status: "urgente",
    espada: "Espada 3",
    detalhamento: "Conter crescimento da folha nos próximos 60 dias"
  },
  {
    categoria: "Financeira", 
    acao: "Intensificar cobrança administrativa do IPTU",
    origem: "Tendência da Arrecadação",
    status: "importante",
    espada: "Espada 2",
    detalhamento: "Campanha de regularização até final do ano"
  },
  {
    categoria: "Jurídica",
    acao: "Responder notificações do TCE pendentes",
    origem: "Contratos em Risco",
    status: "urgente", 
    espada: "Espada 7",
    detalhamento: "5 contratos com prazo vencendo em 15 dias"
  },
  {
    categoria: "Jurídica",
    acao: "Mapear ações judiciais de medicamentos",
    origem: "Pressão Orçamentária da Saúde",
    status: "urgente",
    espada: "Espada 6",
    detalhamento: "18 ações ativas comprometendo orçamento"
  },
  {
    categoria: "Orçamentária",
    acao: "Acelerar liberações para obras paralisadas",
    origem: "Obras Paralisadas",
    status: "importante",
    espada: "Espada 4", 
    detalhamento: "3 obras paradas há mais de 45 dias"
  },
  {
    categoria: "Orçamentária",
    acao: "Criar reserva técnica para medicamentos",
    origem: "Pressão Orçamentária da Saúde", 
    status: "importante",
    espada: "Espada 6",
    detalhamento: "Provisionar 15% a mais para alto custo"
  },
  {
    categoria: "Financeira",
    acao: "Monitorar execução mensal intensivamente",
    origem: "Execução Orçamentária",
    status: "rotina",
    espada: "Espada 1",
    detalhamento: "Acompanhamento quinzenal até dezembro"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "urgente": return { variant: "destructive" as const, text: "🔴 Urgente" };
    case "importante": return { variant: "secondary" as const, text: "🟡 Importante" };
    case "rotina": return { variant: "outline" as const, text: "🟢 Rotina" };
    default: return { variant: "outline" as const, text: status };
  }
};

const getCategoriaColor = (categoria: string) => {
  switch (categoria) {
    case "Financeira": return "text-blue-700 bg-blue-50 border-blue-200";
    case "Jurídica": return "text-red-700 bg-red-50 border-red-200";
    case "Orçamentária": return "text-green-700 bg-green-50 border-green-200";
    default: return "text-gray-700 bg-gray-50 border-gray-200";
  }
};

export function RecomendacoesInteligentes() {
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle>📌 Recomendações Inteligentes (IA-LUX)</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Categoria</TableHead>
              <TableHead>Ação Sugerida</TableHead>
              <TableHead>Origem do Risco</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recomendacoes.map((rec, index) => {
              const statusBadge = getStatusBadge(rec.status);
              
              return (
                <TableRow key={index} className="hover:bg-gray-50/50">
                  <TableCell>
                    <Badge className={`text-xs ${getCategoriaColor(rec.categoria)}`}>
                      {rec.categoria}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-sm">{rec.acao}</div>
                      <div className="text-xs text-gray-500 mt-1">{rec.detalhamento}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium">{rec.origem}</span>
                  </TableCell>
                  <TableCell>
                    <Badge {...statusBadge} className="text-xs">
                      {statusBadge.text}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="text-xs">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      {rec.espada}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
