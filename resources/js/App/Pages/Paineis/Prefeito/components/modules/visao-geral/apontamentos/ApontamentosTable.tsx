
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { ApontamentoModal } from './ApontamentoModal';

interface Apontamento {
  id: number;
  apontamento: string;
  orgao: string;
  prazoFinal: string;
  status: string;
  responsavel: string;
  proximosPassos: string;
  urgente: boolean;
}

export const ApontamentosTable = ({ filters }: { filters: any }) => {
  const [selectedApontamento, setSelectedApontamento] = useState<Apontamento | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const apontamentosData: Apontamento[] = [
    {
      id: 1,
      apontamento: "Regularizar contratação de serviço de limpeza conforme procedimento licitatório",
      orgao: "TCE",
      prazoFinal: "15/07/2025",
      status: "Em Andamento",
      responsavel: "Secretaria de Administração",
      proximosPassos: "Elaborar termo de referência e iniciar processo licitatório",
      urgente: false
    },
    {
      id: 2,
      apontamento: "Implementar controles internos na execução orçamentária",
      orgao: "MP",
      prazoFinal: "22/06/2025",
      status: "Aguardando Ação",
      responsavel: "Secretaria de Finanças",
      proximosPassos: "Definir equipe responsável e cronograma de implementação",
      urgente: true
    },
    {
      id: 3,
      apontamento: "Adequar portal da transparência às exigências da LAI",
      orgao: "CGU",
      prazoFinal: "30/08/2025",
      status: "Em Andamento",
      responsavel: "Secretaria de Governo",
      proximosPassos: "Contratar empresa especializada em desenvolvimento web",
      urgente: false
    },
    {
      id: 4,
      apontamento: "Regularizar situação de servidores em desvio de função",
      orgao: "TCE",
      prazoFinal: "10/07/2025",
      status: "Em Análise",
      responsavel: "Secretaria de RH",
      proximosPassos: "Realizar levantamento completo e propor soluções",
      urgente: false
    },
    {
      id: 5,
      apontamento: "Implementar sistema de controle patrimonial",
      orgao: "Auditoria Interna",
      prazoFinal: "20/06/2025",
      status: "Aguardando Ação",
      responsavel: "Secretaria de Administração",
      proximosPassos: "Adquirir software de gestão patrimonial",
      urgente: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em Andamento': return 'bg-yellow-100 text-yellow-800';
      case 'Aguardando Ação': return 'bg-red-100 text-red-800';
      case 'Em Análise': return 'bg-blue-100 text-blue-800';
      case 'Concluído': return 'bg-green-100 text-green-800';
      case 'Em Recurso': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrgaoColor = (orgao: string) => {
    switch (orgao) {
      case 'TCE': return 'bg-blue-100 text-blue-800';
      case 'MP': return 'bg-purple-100 text-purple-800';
      case 'CGU': return 'bg-green-100 text-green-800';
      case 'Auditoria Interna': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isUrgent = (prazoFinal: string) => {
    const hoje = new Date();
    const prazo = new Date(prazoFinal.split('/').reverse().join('-'));
    const diasRestantes = Math.ceil((prazo.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
    return diasRestantes <= 7;
  };

  const handleVerPlano = (apontamento: Apontamento) => {
    setSelectedApontamento(apontamento);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-semibold text-gray-800">Apontamentos Críticos/Pendentes</h4>
          <p className="text-sm text-gray-600 mt-1">Lista detalhada dos apontamentos por órgão de controle</p>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Apontamento/Recomendação</TableHead>
              <TableHead>Órgão</TableHead>
              <TableHead>Prazo Final</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apontamentosData.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-50">
                <TableCell className="max-w-md">
                  <div className="font-medium text-gray-900">{item.apontamento}</div>
                  <div className="text-sm text-gray-600 mt-1">{item.proximosPassos}</div>
                </TableCell>
                <TableCell>
                  <Badge className={`${getOrgaoColor(item.orgao)} text-xs`}>
                    {item.orgao}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className={`font-medium ${isUrgent(item.prazoFinal) ? 'text-red-600' : 'text-gray-900'}`}>
                    {item.prazoFinal}
                  </div>
                  {isUrgent(item.prazoFinal) && (
                    <Badge className="bg-red-100 text-red-800 text-xs mt-1">
                      Urgente
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(item.status)} text-xs`}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {item.responsavel}
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleVerPlano(item)}
                    className="text-xs"
                  >
                    Ver Plano Detalhado
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ApontamentoModal
        apontamento={selectedApontamento}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
