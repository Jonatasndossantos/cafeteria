import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { AlertTriangle, FileCheck, Upload, CheckCircle } from 'lucide-react';
import IdentificacaoContratacaoSection from './contratacao/IdentificacaoContratacaoSection';
import FundamentacaoSection from './contratacao/FundamentacaoSection';
import DadosEmpresaSection from './contratacao/DadosEmpresaSection';
import DocumentacaoSection from './contratacao/DocumentacaoSection';
import CondicoesContratuaisSection from './contratacao/CondicoesContratuaisSection';
import { useContratacaoData } from '../hooks/useContratacaoData';

interface ContratacaoTabProps {
  inheritedData: any;
}

const ContratacaoTab = ({ inheritedData }: ContratacaoTabProps) => {
  const { data, isLoading, updateField, validateLimites } = useContratacaoData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lumen-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dados da contratação...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Seção 1 - Identificação da Contratação Direta */}
      <IdentificacaoContratacaoSection 
        data={data} 
        updateField={updateField}
        inheritedData={inheritedData}
        validateLimites={validateLimites}
      />

      {/* Seção 2 - Fundamentação Detalhada */}
      <FundamentacaoSection 
        data={data} 
        updateField={updateField}
      />

      {/* Seção 3 - Dados da Empresa Contratada */}
      <DadosEmpresaSection 
        data={data} 
        updateField={updateField}
      />

      {/* Seção 4 - Documentação Obrigatória */}
      <DocumentacaoSection 
        data={data} 
        updateField={updateField}
      />

      {/* Seção 5 - Condições Contratuais */}
      <CondicoesContratuaisSection 
        data={data} 
        updateField={updateField}
      />

    </div>
  );
};

export default ContratacaoTab;
