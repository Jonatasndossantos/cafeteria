import React from 'react';
import { StandardCard } from '@/Components/ui/standard-card';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { CheckCircle, Building2 } from 'lucide-react';
import { ContratacaoData } from '../../hooks/useContratacaoData';

interface DadosEmpresaSectionProps {
  data: ContratacaoData;
  updateField: (field: keyof ContratacaoData, value: any) => void;
}

const DadosEmpresaSection = ({ data, updateField }: DadosEmpresaSectionProps) => {
  // Verificar se seção está completa
  const isSectionComplete = data.nomeEmpresa && 
    data.cnpjEmpresa && 
    data.representanteLegal && 
    data.cpfRepresentante;

  return (
    <StandardCard 
      title="Dados do fornecedor"
      icon={Building2}
      className="shadow-md"
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nome/Razão Social */}
          <div>
            <Label htmlFor="nomeEmpresa" className="text-sm font-medium text-gray-700 mb-3 block">
              Nome/Razão Social *
            </Label>
            <Input
              id="nomeEmpresa"
              value={data.nomeEmpresa}
              onChange={(e) => updateField('nomeEmpresa', e.target.value)}
              placeholder="Digite o nome ou razão social"
              className="h-12"
            />
          </div>

          {/* CNPJ */}
          <div>
            <Label htmlFor="cnpjEmpresa" className="text-sm font-medium text-gray-700 mb-3 block">
              CNPJ *
            </Label>
            <Input
              id="cnpjEmpresa"
              value={data.cnpjEmpresa}
              onChange={(e) => updateField('cnpjEmpresa', e.target.value)}
              placeholder="00.000.000/0000-00"
              className="h-12"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Representante Legal */}
          <div>
            <Label htmlFor="representanteLegal" className="text-sm font-medium text-gray-700 mb-3 block">
              Representante Legal *
            </Label>
            <Input
              id="representanteLegal"
              value={data.representanteLegal}
              onChange={(e) => updateField('representanteLegal', e.target.value)}
              placeholder="Digite o nome do representante legal"
              className="h-12"
            />
          </div>

          {/* CPF do Representante */}
          <div>
            <Label htmlFor="cpfRepresentante" className="text-sm font-medium text-gray-700 mb-3 block">
              CPF do Representante *
            </Label>
            <Input
              id="cpfRepresentante"
              value={data.cpfRepresentante}
              onChange={(e) => updateField('cpfRepresentante', e.target.value)}
              placeholder="000.000.000-00"
              className="h-12"
            />
          </div>
        </div>

        {/* Comprovação de Exclusividade ou Notório Saber */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-medium text-blue-800 mb-3">Comprovação de Exclusividade ou Notório Saber</h4>
          <ul className="text-sm text-blue-700 space-y-2">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
              <span>Para inexigibilidade, anexe documentos que comprovem a exclusividade ou notório saber</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
              <span>Inclua certificados, registros, publicações ou outros documentos relevantes</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
              <span>Documente a experiência e qualificação técnica do fornecedor</span>
            </li>
          </ul>
        </div>

        {/* Status da Seção */}
        {isSectionComplete && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <h4 className="font-medium text-green-800">Seção Completa</h4>
                <p className="text-sm text-green-700">Dados do fornecedor preenchidos corretamente.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </StandardCard>
  );
};

export default DadosEmpresaSection;
