import React from 'react';
import { StandardCard } from '@/Components/ui/standard-card';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { CheckCircle, Paperclip, Upload, FileText } from 'lucide-react';
import { ContratacaoData } from '../../hooks/useContratacaoData';

interface DocumentacaoSectionProps {
  data: ContratacaoData;
  updateField: (field: keyof ContratacaoData, value: any) => void;
}

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

const DocumentacaoSection = ({ data, updateField }: DocumentacaoSectionProps) => {
  const isInexigibilidade = data.tipoContratacao === 'inexigibilidade';
  const isDispensa = data.tipoContratacao === 'dispensa';

  // Verificar se seção está completa
  const isSectionComplete = 
    ((isInexigibilidade && data.comprovacaoEnquadramento) ||
     (isDispensa && data.documentacaoDispensa));

  // Função para encontrar o label do fundamento legal selecionado
  const getFundamentoLabel = (value: string) => {
    for (const category of tiposContratacao) {
      if (category.subcategories) {
        for (const subcategory of category.subcategories) {
          const option = subcategory.options.find(opt => opt.value === value);
          if (option) return option.label;
        }
      } else {
        const option = category.options.find(opt => opt.value === value);
        if (option) return option.label;
      }
    }
    return null;
  };

  // Função para obter os documentos necessários baseados no fundamento legal
  const getDocumentosNecessarios = (fundamentoValue: string) => {
    const documentosGerais = [
      "CNPJ ativo (comprovado via Receita Federal)",
      "Prova de regularidade fiscal e trabalhista (INSS, FGTS, Receita)",
      "Proposta comercial assinada",
      "Conta bancária vinculada",
      "Contrato social ou documento equivalente",
      "Certidão negativa de falência",
      "Atestados de capacidade técnica (se aplicável)"
    ];

    const documentosEspecificos: { [key: string]: string[] } = {
      // Inexigibilidade - Art. 74
      "inexigibilidade-74-i": [
        "Declaração de exclusividade",
        "Prova de regularidade fiscal",
        "Proposta técnica/comercial",
        "Contrato social ou estatuto"
      ],
      "inexigibilidade-74-ii": [
        "Documentação exigida no edital (varia por caso)",
        "Prova de habilitação jurídica, fiscal, trabalhista e técnica",
        "Declaração de interesse em credenciamento"
      ],
      "inexigibilidade-74-iii": [
        "Portfólio técnico ou provas de notoriedade",
        "Proposta técnica/artística",
        "Representação legal (se for empresa ou agente)",
        "Certidões fiscais e trabalhistas"
      ],
      "inexigibilidade-74-iv": [
        "Currículo detalhado",
        "Comprovação de obras, publicações ou experiência relevante",
        "Proposta técnica e valores",
        "Certidões negativas"
      ],
      "inexigibilidade-74-v": [
        "Escritura/certidão do imóvel",
        "Certidão negativa de débitos fiscais",
        "Avaliação de valor de mercado",
        "Comprovação de titularidade"
      ],
      // Dispensa - Art. 75
      "dispensa-75-i": [
        "Proposta comercial",
        "Certidões fiscais e trabalhistas",
        "Dados bancários e CNPJ",
        "Declaração de regularidade com a Fazenda e o FGTS"
      ],
      "dispensa-75-ii": [
        "Proposta comercial",
        "Certidões fiscais e trabalhistas",
        "Dados bancários e CNPJ",
        "Declaração de regularidade com a Fazenda e o FGTS"
      ],
      "dispensa-75-iii": [
        "Proposta emergencial com prazos e preços",
        "Declaração de compromisso com prazos curtos",
        "Certidões fiscais (quando possível)",
        "CNPJ ativo e contrato social"
      ],
      "dispensa-75-iv": [
        "Proposta emergencial com prazos e preços",
        "Declaração de compromisso com prazos curtos",
        "Certidões fiscais (quando possível)",
        "CNPJ ativo e contrato social"
      ],
      "dispensa-75-v": [
        "Proposta emergencial com prazos e preços",
        "Declaração de compromisso com prazos curtos",
        "Certidões fiscais (quando possível)",
        "CNPJ ativo e contrato social"
      ],
      "dispensa-75-vi": [
        "Ato de registro da organização habilitada",
        "CNPJ e estatuto",
        "Prova de regularidade jurídica e fiscal"
      ],
      "dispensa-75-vii": [
        "Autorização do Ministério da Defesa",
        "Prova de capacidade técnica e legal",
        "CNPJ e proposta técnica"
      ],
      "dispensa-75-viii": [
        "Proposta com condições idênticas",
        "Prova de habilitação equivalente",
        "CNPJ, regularidade fiscal e trabalhista"
      ],
      "dispensa-75-ix": [
        "Proposta com condições idênticas",
        "Prova de habilitação equivalente",
        "CNPJ, regularidade fiscal e trabalhista"
      ],
      "dispensa-75-x": [
        "Transferência de tecnologia com instituição pública",
        "Prova de capacidade técnica e legal",
        "CNPJ e proposta técnica"
      ],
      "dispensa-75-xi": [
        "Ato de criação legal",
        "Estatuto",
        "Prova de regularidade fiscal",
        "Proposta formal assinada"
      ],
      "dispensa-75-xii": [
        "Ato de criação legal",
        "Estatuto",
        "Prova de regularidade fiscal",
        "Proposta formal assinada"
      ],
      "dispensa-75-xiii": [
        "Acordo internacional ou protocolo vigente",
        "Proposta ou memorando de entendimento",
        "Comprovação de representação legal"
      ],
      "dispensa-75-xiv": [
        "Proposta de doação com encargo",
        "Comprovação de capacidade técnica",
        "CNPJ e regularidade fiscal"
      ],
      "dispensa-75-xv": [
        "Proposta de PPP",
        "Comprovação de habilitação como parceiro",
        "Documentação jurídica, técnica, fiscal e financeira"
      ],
      "dispensa-75-xvi": [
        "Declaração de sigilo/confidencialidade",
        "Documentação legal restrita (avaliada internamente)",
        "Credenciamento especial (quando exigido)"
      ]
    };

    const documentosEspecificosDoFundamento = documentosEspecificos[fundamentoValue] || [];
    
    return {
      fundamento: getFundamentoLabel(fundamentoValue),
      documentosEspecificos: documentosEspecificosDoFundamento,
      documentosGerais: documentosGerais
    };
  };

  const handleFileChange = (field: keyof ContratacaoData, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) {
      updateField(field, null);
    } else {
      const currentFiles = Array.isArray(data[field]) 
        ? data[field] 
        : [];
      updateField(field, [...currentFiles, ...files]);
    }
  };

  const removeFile = (field: keyof ContratacaoData, index: number) => {
    if (Array.isArray(data[field])) {
      const newFiles = [...data[field]];
      newFiles.splice(index, 1);
      updateField(field, newFiles.length ? newFiles : null);
    }
  };

  return (
    <StandardCard 
      title="Documentos obrigatórios"
      icon={Paperclip}
      className="shadow-md"
    >
      <div className="space-y-4">
        {/* Documentos específicos para Inexigibilidade */}
        {isInexigibilidade && (
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Label htmlFor="comprovacaoEnquadramento" className="text-sm font-medium text-gray-700 mb-3 block">
                Comprovação do Enquadramento Legal *
              </Label>
              {data.tipoContratacaoFundamento && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-medium text-blue-800 mb-2">Fundamento Legal: {getFundamentoLabel(data.tipoContratacaoFundamento)}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-blue-700 mb-2">Documentos Específicos Necessários:</p>
                      <ul className="text-sm text-blue-600 space-y-1">
                        {getDocumentosNecessarios(data.tipoContratacaoFundamento).documentosEspecificos.map((doc, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-500 mr-2">🔹</span>
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-blue-700 mb-2">Documentos Gerais (Sempre Exigidos):</p>
                      <ul className="text-sm text-blue-600 space-y-1">
                        {getDocumentosNecessarios(data.tipoContratacaoFundamento).documentosGerais.map((doc, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-2">✅</span>
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              <p className="text-sm text-gray-500 mb-2">Selecione um ou mais arquivos</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    multiple
                    onChange={(e) => handleFileChange('comprovacaoEnquadramento', e)}
                    className="hidden"
                    id="comprovacaoEnquadramentoInput"
                    accept=".pdf,.doc,.docx"
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById('comprovacaoEnquadramentoInput')?.click()}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-lumen-blue hover:bg-lumen-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lumen-blue"
                  >
                    <Upload className="w-4 h-4 mr-1" />
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
                              onClick={() => removeFile('comprovacaoEnquadramento', index)}
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
              <p className="text-xs text-gray-500 mt-1">
                Documento que comprova a inviabilidade de competição (Art. 74)
              </p>
            </div>
          </div>
        )}

        {/* Documentos específicos para Dispensa */}
        {isDispensa && (
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Label htmlFor="documentacaoDispensa" className="text-sm font-medium text-gray-700 mb-3 block">
                Documentação da Dispensa *
              </Label>
              {data.tipoContratacaoFundamento && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-800 mb-2">Fundamento Legal: {getFundamentoLabel(data.tipoContratacaoFundamento)}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-green-700 mb-2">Documentos Específicos Necessários:</p>
                      <ul className="text-sm text-green-600 space-y-1">
                        {getDocumentosNecessarios(data.tipoContratacaoFundamento).documentosEspecificos.map((doc, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-2">🔹</span>
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-green-700 mb-2">Documentos Gerais (Sempre Exigidos):</p>
                      <ul className="text-sm text-green-600 space-y-1">
                        {getDocumentosNecessarios(data.tipoContratacaoFundamento).documentosGerais.map((doc, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-600 mr-2">✅</span>
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              <p className="text-sm text-gray-500 mb-2">Selecione um ou mais arquivos</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    multiple
                    onChange={(e) => handleFileChange('documentacaoDispensa', e)}
                    className="hidden"
                    id="documentacaoDispensaInput"
                    accept=".pdf,.doc,.docx"
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById('documentacaoDispensaInput')?.click()}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-lumen-blue hover:bg-lumen-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lumen-blue"
                  >
                    <Upload className="w-4 h-4 mr-1" />
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
                              onClick={() => removeFile('documentacaoDispensa', index)}
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
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Documento que comprova o enquadramento em uma das hipóteses do Art. 75
              </p>
            </div>
          </div>
        )}
      </div>
    </StandardCard>
  );
};

export default DocumentacaoSection;
