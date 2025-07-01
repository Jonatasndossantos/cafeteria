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
import axios from 'axios';

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
      const response = await axios.get('/api/setores-public');
      return response.data;
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
        // Redirecionar para a página de documentos após salvar com sucesso
        router.visit('/documentos');
      },
      onError: (errors) => {
        console.error('Erro ao salvar processo:', errors);
        setIsSubmitting(false);
      }
    });
  };


  const tipos = [
    'Produtos de Consumo',
    'Ingredientes Alimentares',
    'Materiais de Limpeza e Higiene',
    'Equipamentos e Utensílios',
    'Serviços',
    'Materiais Administrativos'
  ];

  // Debug: Log formData to console
  console.log('formData:', formData);
  console.log('tipos array:', tipos);
  console.log('setores carregados:', setores);

  return (
    <StandardCard 
      title="Identificação da necessidade"
      icon={Eye}
      className="mb-6"
    >

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Código da Solicitação *
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
            Valor *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
            <input
              type="number"
              step="0.01"
              min="0"
              className="w-full pl-10 pr-3 py-2 transition-colors border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
              placeholder="0,00"
              value={formData.valor}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                setFormData(prev => ({ ...prev, valor: value }));
              }}
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Data *
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 transition-colors border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
            value={formData.data}
            onChange={(e) => setFormData(prev => ({ ...prev, data: e.target.value }))}
            required
          />
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
                🔹 MODALIDADES
              </div>
              <SelectItem value="Compra Direta">Compra Direta</SelectItem>
              <SelectItem value="Cotação com Fornecedores (Orçamento)">Cotação com Fornecedores (Orçamento)</SelectItem>
              <SelectItem value="Contrato com Fornecedor Fixo">Contrato com Fornecedor Fixo</SelectItem>
              <SelectItem value="Requisição Emergencial">Requisição Emergencial</SelectItem>
              <SelectItem value="Compra Programada">Compra Programada</SelectItem>
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
        <textarea
          id="descricao_necessidade"
          className="w-full px-3 py-2 transition-colors border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
          rows={4}
          placeholder="Descreva detalhadamente a necessidade..."
          value={formData.objeto}
          onChange={(e) => setFormData(prev => ({ ...prev, objeto: e.target.value }))}
          required
        />
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

