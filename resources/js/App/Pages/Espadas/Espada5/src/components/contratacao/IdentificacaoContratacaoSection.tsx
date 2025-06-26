import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { AlertTriangle, FileText, DollarSign, CheckCircle } from 'lucide-react';
import { ContratacaoData } from '../../hooks/useContratacaoData';
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group';

interface IdentificacaoContratacaoSectionProps {
  data: ContratacaoData;
  updateField: (field: keyof ContratacaoData, value: any) => void;
  inheritedData: any;
  validateLimites: (tipoObjeto: string, valor: number) => boolean;
}

const IdentificacaoContratacaoSection = ({ 
  data, 
  updateField, 
  inheritedData, 
  validateLimites 
}: IdentificacaoContratacaoSectionProps) => {
  // Verificar se seção está completa
  const isSectionComplete = data.tipoContratacaoFundamento && 
    data.numeroProcesso && 
    data.dataProcesso && 
    data.unidadeDemandante;

  const tiposContratacao = [
    {
      category: "Inexigibilidade de Licitação (Art. 74 - Lei 14.133/21)",
      options: [
        { value: "inexigibilidade-74-i", label: "Art. 74, I - Fornecedor exclusivo" },
        { value: "inexigibilidade-74-ii", label: "Art. 74, II - Credenciamento com múltiplos interessados habilitados" },
        { value: "inexigibilidade-74-iii", label: "Art. 74, III - Profissional artístico com empresário exclusivo" },
        { value: "inexigibilidade-74-iv", label: "Art. 74, IV - Notório saber / singularidade técnica especializada" },
        { value: "inexigibilidade-74-v", label: "Art. 74, V - Aquisição ou locação de imóvel com características únicas" }
      ]
    },
    {
      category: "Dispensa de Licitação (Art. 75 - Lei 14.133/21)",
      subcategories: [
        {
          title: "1. Por valor (atualizado 2025 - Portaria ME nº 709/2024)",
          options: [
            { value: "dispensa-75-i", label: "Art. 75, I - Até R$ 118.266,50 – obras e serviços de engenharia" },
            { value: "dispensa-75-ii", label: "Art. 75, II - Até R$ 59.133,27 – compras e outros serviços" }
          ]
        },
        {
          title: "2. Por situação emergencial",
          options: [
            { value: "dispensa-75-iii", label: "Art. 75, III - Guerra ou grave perturbação da ordem" },
            { value: "dispensa-75-iv", label: "Art. 75, IV - Emergência ou calamidade pública" },
            { value: "dispensa-75-v", label: "Art. 75, V - Licitação deserta ou fracassada" }
          ]
        },
        {
          title: "3. Por motivos operacionais",
          options: [
            { value: "dispensa-75-vi", label: "Art. 75, VI - Contratação de remanescente de contrato rescindido" },
            { value: "dispensa-75-vii", label: "Art. 75, VII - Bens e insumos produzidos por órgãos públicos" },
            { value: "dispensa-75-viii", label: "Art. 75, VIII - Contratações com entidades da administração indireta" },
            { value: "dispensa-75-ix", label: "Art. 75, IX - Aquisição de bens de pequeno valor para pesquisa científica" }
          ]
        },
        {
          title: "4. Outras hipóteses específicas",
          options: [
            { value: "dispensa-75-x", label: "Art. 75, X - Transferência de tecnologia com instituição pública" },
            { value: "dispensa-75-xi", label: "Art. 75, XI - Contratação de entidade nacional de serviço social" },
            { value: "dispensa-75-xii", label: "Art. 75, XII - Instituições de educação superior ou pesquisa" },
            { value: "dispensa-75-xiii", label: "Art. 75, XIII - Contratação com organizações internacionais" },
            { value: "dispensa-75-xiv", label: "Art. 75, XIV - Doações com encargo" },
            { value: "dispensa-75-xv", label: "Art. 75, XV - Parcerias público-privadas" },
            { value: "dispensa-75-xvi", label: "Art. 75, XVI - Fornecimento para projetos estratégicos das Forças Armadas" }
          ]
        }
      ]
    }
  ];

  return (
    <>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="font-montserrat font-semibold text-lg text-lumen-blue flex items-center">
            <FileText className="w-5 h-5 mr-2 text-lumen-gold" />
            Tipo de contratação
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Informações herdadas do processo licitatório */}
          {inheritedData && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Informações do Processo Licitatório</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-medium text-gray-500">Número do Edital</Label>
                  <p className="text-sm text-gray-900 font-medium">{inheritedData.numeroEdital || 'Não informado'}</p>
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-500">Objeto da Contratação</Label>
                  <p className="text-sm text-gray-900">{inheritedData.objeto || 'Não informado'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tipo de Contratação Radio Group */}
          <div className="space-y-4">
            <RadioGroup
              value={data.tipoContratacao}
              onValueChange={(value: 'inexigibilidade' | 'dispensa') => {
                updateField('tipoContratacao', value);
              }}
              className="flex flex-row space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="inexigibilidade" id="inexigibilidade" />
                <Label htmlFor="inexigibilidade" className="text-sm font-medium">
                  INEXIGIBILIDADE DE LICITAÇÃO
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dispensa" id="dispensa" />
                <Label htmlFor="dispensa" className="text-sm font-medium">
                  DISPENSA DE LICITAÇÃO
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Tipo de Contratação e Fundamento Legal */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Fundamento legal *
            </Label>
            <Select value={data.tipoContratacaoFundamento} onValueChange={(value) => updateField('tipoContratacaoFundamento', value)}>
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Selecione o tipo de contratação e fundamento legal" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                {tiposContratacao
                  .filter(category => 
                    (data.tipoContratacao === 'inexigibilidade' && category.category.includes('Inexigibilidade')) ||
                    (data.tipoContratacao === 'dispensa' && category.category.includes('Dispensa'))
                  )
                  .map((category) => (
                    <div key={category.category}>
                      <div className="px-2 py-1.5 text-sm font-medium text-gray-900 bg-gray-100">
                        {category.category}
                      </div>
                      {category.subcategories ? (
                        category.subcategories.map((subcategory) => (
                          <div key={subcategory.title}>
                            <div className="px-2 py-1.5 text-sm font-medium text-gray-700 bg-gray-50">
                              {subcategory.title}
                            </div>
                            {subcategory.options.map((option) => (
                              <SelectItem key={option.value} value={option.value} className="pl-4">
                                {option.label}
                              </SelectItem>
                            ))}
                          </div>
                        ))
                      ) : (
                        category.options.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="pl-4">
                            {option.label}
                          </SelectItem>
                        ))
                      )}
                    </div>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Campos específicos para Inexigibilidade */}
          {data.tipoContratacao === 'inexigibilidade' && (
            <div className="space-y-4 mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-sm font-medium text-blue-800">Requisitos específicos para Inexigibilidade</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Justificativa da inviabilidade de competição *
                  </Label>
                  <textarea
                    value={data.justificativaInviabilidade || ''}
                    onChange={(e) => updateField('justificativaInviabilidade', e.target.value)}
                    className="w-full h-24 p-2 mt-1 border rounded-md"
                    placeholder="Descreva a justificativa da inviabilidade de competição..."
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Comprovação documental do enquadramento legal *
                  </Label>
                  <p className="text-sm text-[#CB991A] mb-2">Selecione um ou mais arquivos</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        multiple
                        required
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          if (files.length === 0) {
                            updateField('comprovacaoEnquadramento', null);
                          } else {
                            const currentFiles = Array.isArray(data.comprovacaoEnquadramento) 
                              ? data.comprovacaoEnquadramento 
                              : [];
                            updateField('comprovacaoEnquadramento', [...currentFiles, ...files]);
                          }
                        }}
                        className="hidden"
                        id="comprovacaoEnquadramentoInput"
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('comprovacaoEnquadramentoInput')?.click()}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-lumen-blue hover:bg-lumen-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lumen-blue"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Adicionar Arquivo
                      </button>
                    </div>
                    {data.comprovacaoEnquadramento && (
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-600">Arquivos selecionados:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {Array.isArray(data.comprovacaoEnquadramento) ? (
                            data.comprovacaoEnquadramento.map((file, index) => (
                              <li key={index} className="flex items-center justify-between gap-2 bg-gray-50 p-2 rounded">
                                <div className="flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-gray-500" />
                                  {file.name}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (Array.isArray(data.comprovacaoEnquadramento)) {
                                      const newFiles = [...data.comprovacaoEnquadramento];
                                      newFiles.splice(index, 1);
                                      updateField('comprovacaoEnquadramento', newFiles.length ? newFiles : null);
                                    }
                                  }}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </li>
                            ))
                          ) : (
                            <li className="flex items-center justify-between gap-2 bg-gray-50 p-2 rounded">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-gray-500" />
                                {data.comprovacaoEnquadramento.name}
                              </div>
                              <button
                                type="button"
                                onClick={() => updateField('comprovacaoEnquadramento', null)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Campos específicos para Dispensa */}
          {data.tipoContratacao === 'dispensa' && (
            <div className="space-y-4 mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-sm font-medium text-green-800">Requisitos específicos para Dispensa</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Justificativa da dispensa *
                  </Label>
                  <textarea
                    value={data.justificativaDispensa || ''}
                    onChange={(e) => updateField('justificativaDispensa', e.target.value)}
                    className="w-full h-24 p-2 mt-1 border rounded-md"
                    placeholder="Descreva a justificativa da dispensa..."
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Documentação comprobatória *
                  </Label>
                  <p className="text-sm text-[#CB991A] mb-2">Selecione um ou mais arquivos</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        multiple
                        required
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          if (files.length === 0) {
                            updateField('documentacaoDispensa', null);
                          } else {
                            const currentFiles = Array.isArray(data.documentacaoDispensa) 
                              ? data.documentacaoDispensa 
                              : [];
                            updateField('documentacaoDispensa', [...currentFiles, ...files]);
                          }
                        }}
                        className="hidden"
                        id="documentacaoDispensaInput"
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('documentacaoDispensaInput')?.click()}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-lumen-blue hover:bg-lumen-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lumen-blue"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Adicionar Arquivo
                      </button>
                    </div>
                    {data.documentacaoDispensa && (
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-600">Arquivos selecionados:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {Array.isArray(data.documentacaoDispensa) ? (
                            data.documentacaoDispensa.map((file, index) => (
                              <li key={index} className="flex items-center justify-between gap-2 bg-gray-50 p-2 rounded">
                                <div className="flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-gray-500" />
                                  {file.name}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (Array.isArray(data.documentacaoDispensa)) {
                                      const newFiles = [...data.documentacaoDispensa];
                                      newFiles.splice(index, 1);
                                      updateField('documentacaoDispensa', newFiles.length ? newFiles : null);
                                    }
                                  }}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </li>
                            ))
                          ) : (
                            <li className="flex items-center justify-between gap-2 bg-gray-50 p-2 rounded">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-gray-500" />
                                {data.documentacaoDispensa.name}
                              </div>
                              <button
                                type="button"
                                onClick={() => updateField('documentacaoDispensa', null)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L6 6M6 6l12 12" />
                                </svg>
                              </button>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Status da Seção */}
          {isSectionComplete && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <h4 className="font-medium text-green-800">Seção Completa</h4>
                  <p className="text-sm text-green-700">Todas as informações obrigatórias foram preenchidas.</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

    </>
  );
};

export default IdentificacaoContratacaoSection;
