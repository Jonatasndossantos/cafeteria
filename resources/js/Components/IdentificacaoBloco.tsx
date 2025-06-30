import { Eye } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

import { usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { StandardCard } from '@/Components/ui/standard-card';

interface Setor {
  id: number;
  nome: string;
  sigla: string;
}

interface User {
  id: number;
  nome: string;
  cargo: string;
  cpf: string;
  matricula: string;
  email: string;
  celular?: string;
  setor?: {
    id: number;
    nome: string;
  };
}

interface PageProps {
  auth: {
    nome: string;
    cargo: string;
    setor: {
      id: number;
      nome: string;
      sigla: string;
    };
    [key: string]: any;
  };
  [key: string]: any;
}

export default function IdentificacaoBloco() {
  const { props } = usePage<PageProps>();
  const currentYear = new Date().getFullYear();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const idSetor = props.auth?.user?.setor?.id;
  
  const [formData, setFormData] = useState({
    numero_processo: `PA-${currentYear}/`,
    modalidade: '',
    tipo: '',
    data: new Date().toISOString().split('T')[0],
    numero_documento: `DOC-${currentYear}/${idSetor}`,
    objeto: '',
    setor_id: idSetor,
    status: 'Em andamento',
    tags: [],
    autenticidade: {
      nivel: 'Pendente',
      assinaturaDigital: false
    },
    valor: 0,
    is_draft: false,
    unidadeIniciadora: '',
    secretaria: idSetor?.toString() || '',
    statusPlanejamento: 'em_discussao',
    dataInicio: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      numero_processo: `PA-${currentYear}/${prev.unidadeIniciadora}`,
      secretaria: idSetor?.toString() || prev.secretaria
    }));
  }, [formData.unidadeIniciadora, currentYear, idSetor]);

  const { data: setores = [] } = useQuery({
    queryKey: ['setores'],
    queryFn: async () => {
      return props.setor;
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Prepare the data for submission
    const submitData = {
      ...formData,
      numero_processo: `PA-${currentYear}/${formData.unidadeIniciadora}`,
      setor_id: formData.secretaria || idSetor
    };

    router.post('/processos', submitData, {
      onSuccess: () => {
        setIsSubmitting(false);
      },
      onError: (errors) => {
        console.error('Erro ao salvar processo:', errors);
        setIsSubmitting(false);
      }
    });
  };

  const modalidades = [
    // 🔹 MODALIDADES TRADICIONAIS (Lei nº 14.133/2021 – Art. 28 e Art. 32)
    'Pregão Eletrônico - Art. 28, inc. I',
    'Pregão Presencial - Art. 28, inc. I',
    'Concorrência - Art. 28, inc. II',
    'Concurso - Art. 28, inc. III',
    'Leilão - Art. 28, inc. IV',
    'Diálogo Competitivo - Art. 28, inc. V',
    // 🔹 INSTRUMENTOS DIRETOS
    'Dispensa de Licitação - Art. 74 e Art. 75 da Lei 14.133/21',
    'Inexigibilidade de Licitação - Art. 74 e Art. 74-A da Lei 14.133/21',
    'Credenciamento',
    'Adesão à Ata (Carona) - Art. 86 a 88 da Lei 14.133/21 (Sistema de Registro de Preços - SRP)',
    // 🔹 TERCEIRO SETOR (Lei nº 13.019/2014 – MROSC)
    'Chamamento Público - Art. 23 a 27 da Lei 13.019/14',
    'Termo de Colaboração - Art. 16, inc. I da Lei 13.019/14',
    'Termo de Fomento - Art. 16, inc. II da Lei 13.019/14'
  ];

  const tipos = [
    'Obras',
    'Serviços Comuns',
    'Serviços Especializados',
    'Serviços de Engenharia',
    'Tecnologia da Informação (TIC)',
    'Locação de Bens',
    'Aquisição de Bens Permanentes',
    'Aquisição de Materiais de Consumo',
    'Obras e Serviços de Engenharia',
    'Parceria com OSC/Termo de Colaboração/Fomento',
    'Consultoria Técnica/Estudo Especializado'
  ];

  // Debug: Log formData to console
  console.log('formData:', formData);
  console.log('tipos array:', tipos);

  return (
    <StandardCard 
      title="Identificação da necessidade"
      icon={Eye}
      className="mb-6"
    >
      {/* Debug: Test div to verify rendering */}
      <div className="mb-4 p-2 bg-yellow-100 border border-yellow-400 rounded">
        <p className="text-sm">Debug: Campo tipo está sendo renderizado. Valor atual: {formData.tipo || 'vazio'}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Código do Documento *
          </label>
          <div className="flex gap-2">
            <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-600 min-w-[120px] flex items-center">
              PA-{currentYear}/
            </div>
            <input
              type="text"
              className="flex-1 px-3 py-2 transition-colors border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
              placeholder="00000"
              value={formData.unidadeIniciadora}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                setFormData(prev => ({ ...prev, unidadeIniciadora: value }));
              }}
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Tipo *
          </label>
          <Select
            value={formData.tipo}
            onValueChange={(value) => {
              console.log('Tipo selecionado:', value);
              setFormData(prev => ({ ...prev, tipo: value }));
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              {tipos.map((tipo) => (
                <SelectItem key={tipo} value={tipo}>
                  {tipo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Modalidade
          </label>
          <Select
            value={formData.modalidade}
            onValueChange={(value) => setFormData(prev => ({ ...prev, modalidade: value }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione a modalidade" />
            </SelectTrigger>
            <SelectContent>
              {/* Separador - Modalidades Tradicionais */}
              <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 bg-gray-50 border-t border-b border-gray-100">
                🔹 MODALIDADES TRADICIONAIS
              </div>
              <SelectItem value="Pregão Eletrônico - Art. 28, inc. I">Pregão Eletrônico - Art. 28, inc. I</SelectItem>
              <SelectItem value="Pregão Presencial - Art. 28, inc. I">Pregão Presencial - Art. 28, inc. I</SelectItem>
              <SelectItem value="Concorrência - Art. 28, inc. II">Concorrência - Art. 28, inc. II</SelectItem>
              <SelectItem value="Concurso - Art. 28, inc. III">Concurso - Art. 28, inc. III</SelectItem>
              <SelectItem value="Leilão - Art. 28, inc. IV">Leilão - Art. 28, inc. IV</SelectItem>
              <SelectItem value="Diálogo Competitivo - Art. 28, inc. V">Diálogo Competitivo - Art. 28, inc. V</SelectItem>
              
              {/* Separador - Instrumentos Diretos */}
              <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 bg-gray-50 border-t border-b border-gray-100">
                🔹 INSTRUMENTOS DIRETOS
              </div>
              <SelectItem value="Dispensa de Licitação - Art. 74 e Art. 75 da Lei 14.133/21">Dispensa de Licitação - Art. 74 e Art. 75 da Lei 14.133/21</SelectItem>
              <SelectItem value="Inexigibilidade de Licitação - Art. 74 e Art. 74-A da Lei 14.133/21">Inexigibilidade de Licitação - Art. 74 e Art. 74-A da Lei 14.133/21</SelectItem>
              <SelectItem value="Credenciamento">Credenciamento</SelectItem>
              <SelectItem value="Adesão à Ata (Carona) - Art. 86 a 88 da Lei 14.133/21 (Sistema de Registro de Preços - SRP)">Adesão à Ata (Carona) - Art. 86 a 88 da Lei 14.133/21 (Sistema de Registro de Preços - SRP)</SelectItem>
              
              {/* Separador - Terceiro Setor */}
              <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 bg-gray-50 border-t border-b border-gray-100">
                🔹 TERCEIRO SETOR (MROSC)
              </div>
              <SelectItem value="Chamamento Público - Art. 23 a 27 da Lei 13.019/14">Chamamento Público - Art. 23 a 27 da Lei 13.019/14</SelectItem>
              <SelectItem value="Termo de Colaboração - Art. 16, inc. I da Lei 13.019/14">Termo de Colaboração - Art. 16, inc. I da Lei 13.019/14</SelectItem>
              <SelectItem value="Termo de Fomento - Art. 16, inc. II da Lei 13.019/14">Termo de Fomento - Art. 16, inc. II da Lei 13.019/14</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Unidade/Setor *
          </label>
          <Select
            value={formData.secretaria}
            onValueChange={value => setFormData(prev => ({ ...prev, secretaria: value }))}
            disabled={true}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o órgão/unidade" />
            </SelectTrigger>
            <SelectContent>
              {setores?.map((option: Setor) => (
                <SelectItem key={option.id} value={option.id.toString()}>
                  {option.nome} ({option.sigla})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Responsável Setorial *
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              className="w-full px-3 py-2 transition-colors border border-gray-300 rounded-md bg-gray-50"
              placeholder="Nome"
              value={props.auth?.user?.nome || ''}
              readOnly
            />
            <input
              type="text"
              className="w-full px-3 py-2 transition-colors border border-gray-300 rounded-md bg-gray-50"
              placeholder="Cargo"
              value={props.auth?.user?.cargo || ''}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="descricao_necessidade" className="block mb-1 text-sm font-medium text-gray-700">
          Descrição da Necessidade *
        </label>
     
      </div>

      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Status do Planejamento *
          </label>
          <Select
            value={formData.statusPlanejamento}
            onValueChange={(value) => setFormData(prev => ({ ...prev, statusPlanejamento: value }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="em_discussao">Em Discussão</SelectItem>
              <SelectItem value="consolidada_dfd">Consolidada para DFD</SelectItem>
              <SelectItem value="arquivada">Arquivada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Data de Início
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 transition-colors border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
            value={formData.dataInicio}
            onChange={(e) => setFormData(prev => ({ ...prev, dataInicio: e.target.value }))}
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-4 py-2 bg-[#0A3D62] text-white rounded-md hover:bg-[#CB991A] transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </StandardCard>
  );
}

