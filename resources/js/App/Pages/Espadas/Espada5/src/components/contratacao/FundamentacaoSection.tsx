import React from 'react';
import { StandardCard } from '@/Components/ui/standard-card';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { ContratacaoData } from '../../hooks/useContratacaoData';
import { Input } from '@/Components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/Components/ui/select';

interface FundamentacaoSectionProps {
  data: ContratacaoData;
  updateField: (field: keyof ContratacaoData, value: any) => void;
}

const FundamentacaoSection = ({ data, updateField }: FundamentacaoSectionProps) => {
  const isInexigibilidade = data.tipoContratacao === 'inexigibilidade';
  const isDispensa = data.tipoContratacao === 'dispensa';
  
  // Verificar se seção está completa
  const isSectionComplete = data.justificativaContratacao.length >= 200 && 
    data.fundamentacaoTecnica.length >= 200 &&
    data.descricaoObjeto.length >= 200 &&
    ((isInexigibilidade && data.razaoEscolhaFornecedor.length >= 100) ||
     (isDispensa && (data.justificativaDispensa?.length || 0) >= 100));

  return (
    <StandardCard 
      title="Dados do Objeto"
      icon={FileText}
      className="shadow-md"
    >
      <div className="space-y-4">
        {/* Descrição Detalhada do Objeto */}
        <div>
          <Label htmlFor="descricaoObjeto" className="text-sm font-medium text-gray-700 mb-3 block">
            Descrição Detalhada do Objeto *
          </Label>
          <Textarea
            id="descricaoObjeto"
            value={data.descricaoObjeto}
            onChange={(e) => updateField('descricaoObjeto', e.target.value)}
            placeholder="Descreva detalhadamente o objeto da contratação, incluindo especificações técnicas, quantidades, prazos e demais requisitos necessários..."
            className="min-h-[100px] resize-y"
            maxLength={2000}
          />
          <div className="flex justify-between text-xs text-[#CB991A] mt-2">
            <span className={data.descricaoObjeto?.length >= 200 ? 'text-green-600' : 'text-[#CB991A]'}>
              Mínimo: 200 caracteres {data.descricaoObjeto?.length >= 200 ? '✓' : ''}
            </span>
            <span>{data.descricaoObjeto?.length || 0}/2000</span>
          </div>
        </div>

        {/* Fundamentação Técnica (ETP) */}
        <div>
          <Label htmlFor="fundamentacaoTecnica" className="text-sm font-medium text-gray-700 mb-3 block">
            Fundamentação Técnica (ETP) *
          </Label>
          <Textarea
            id="fundamentacaoTecnica"
            value={data.fundamentacaoTecnica}
            onChange={(e) => updateField('fundamentacaoTecnica', e.target.value)}
            placeholder="Descreva a fundamentação técnica que justifica a contratação, incluindo o Estudo Técnico Preliminar (ETP) ou Termo de Referência..."
            className="min-h-[100px] resize-y"
            maxLength={2000}
          />
          <div className="flex justify-between text-xs text-[#CB991A] mt-2">
            <span className={data.fundamentacaoTecnica?.length >= 200 ? 'text-green-600' : 'text-[#CB991A]'}>
              Mínimo: 200 caracteres {data.fundamentacaoTecnica?.length >= 200 ? '✓' : ''}
            </span>
            <span>{data.fundamentacaoTecnica?.length || 0}/2000</span>
          </div>
        </div>

        {/* Justificativa Legal */}
        <div>
          <Label htmlFor="justificativaContratacao" className="text-sm font-medium text-gray-700 mb-3 block">
            Justificativa Legal *
          </Label>
          <Textarea
            id="justificativaContratacao"
            value={data.justificativaContratacao}
            onChange={(e) => updateField('justificativaContratacao', e.target.value)}
            placeholder="Descreva detalhadamente a justificativa legal para a contratação direta, incluindo os motivos que fundamentam a dispensa ou inexigibilidade de licitação..."
            className="min-h-[100px] resize-y"
            maxLength={2000}
          />
          <div className="flex justify-between text-xs text-[#CB991A] mt-2">
            <span className={data.justificativaContratacao.length >= 200 ? 'text-green-600' : 'text-[#CB991A]'}>
              Mínimo: 200 caracteres {data.justificativaContratacao.length >= 200 ? '✓' : ''}
            </span>
            <span>{data.justificativaContratacao.length}/2000</span>
          </div>
        </div>

        {/* Local de Entrega e Prazo Estimado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="localEntrega" className="text-sm font-medium text-gray-700 mb-3 block">
              Local de entrega e execução *
            </Label>
            <Input
              id="localEntrega"
              value={data.localEntrega || ''}
              onChange={(e) => updateField('localEntrega', e.target.value)}
              placeholder="Descreva o local de entrega e execução do objeto..."
              className="h-12"
            />
          </div>
          <div>
            <Label htmlFor="prazoEstimado" className="text-sm font-medium text-gray-700 mb-3 block">
              Prazo estimado *
            </Label>
            <div className="flex gap-4">
              <Input
                type="number"
                id="prazoEstimado"
                value={data.prazoEstimado || ''}
                onChange={(e) => updateField('prazoEstimado', e.target.value)}
                placeholder="Digite o prazo"
                className="h-12"
                min="1"
              />
              <Select 
                value={data.unidadePrazo || 'dias'} 
                onValueChange={(value) => updateField('unidadePrazo', value)}
              >
                <SelectTrigger className="h-12 w-[120px]">
                  <SelectValue placeholder="Unidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="horas">Horas</SelectItem>
                  <SelectItem value="dias">Dias</SelectItem>
                  <SelectItem value="meses">Meses</SelectItem>
                  <SelectItem value="anos">Anos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Razão da Escolha do Fornecedor - Condicional para Inexigibilidade */}
        {isInexigibilidade && (
          <div>
            <Label htmlFor="razaoEscolhaFornecedor" className="text-sm font-medium text-gray-700 mb-3 block">
              Razão da Escolha do Fornecedor *
            </Label>
            <Textarea
              id="razaoEscolhaFornecedor"
              value={data.razaoEscolhaFornecedor}
              onChange={(e) => updateField('razaoEscolhaFornecedor', e.target.value)}
              placeholder="Para casos de inexigibilidade, descreva os motivos específicos que justificam a escolha deste fornecedor em particular, incluindo a comprovação de exclusividade ou notório saber..."
              className="min-h-[100px] resize-y"
              maxLength={1500}
            />
            <div className="flex justify-between text-xs text-[#CB991A] mt-2">
              <span className="text-orange-600">Campo obrigatório para inexigibilidade</span>
              <span>{data.razaoEscolhaFornecedor.length}/1500</span>
            </div>
          </div>
        )}

        {/* Justificativa da Dispensa - Condicional para Dispensa */}
        {isDispensa && (
          <div>
            <Label htmlFor="justificativaDispensa" className="text-sm font-medium text-gray-700 mb-3 block">
              Justificativa da Dispensa *
            </Label>
            <Textarea
              id="justificativaDispensa"
              value={data.justificativaDispensa || ''}
              onChange={(e) => updateField('justificativaDispensa', e.target.value)}
              placeholder="Para casos de dispensa, descreva os motivos específicos que justificam a dispensa de licitação, incluindo a fundamentação legal e documentação comprobatória..."
              className="min-h-[100px] resize-y"
              maxLength={1500}
            />
            <div className="flex justify-between text-xs text-[#CB991A] mt-2">
              <span className="text-orange-600">Campo obrigatório para dispensa</span>
              <span>{data.justificativaDispensa?.length || 0}/1500</span>
            </div>
          </div>
        )}

        {/* Orientações Legais */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-medium text-blue-800 mb-3">Orientações para Fundamentação</h4>
          <ul className="text-sm text-blue-700 space-y-2">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
              <span><strong>Descrição do Objeto:</strong> Detalhe todas as especificações técnicas, quantidades e requisitos</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
              <span><strong>Fundamentação Técnica:</strong> Inclua ETP, TR ou Projeto Básico conforme o caso</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
              <span><strong>Justificativa Legal:</strong> Cite a legislação aplicável e precedentes, se houver</span>
            </li>
            {isInexigibilidade && (
              <>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span><strong>Inexigibilidade (Art. 74):</strong> Comprove a inviabilidade de competição e justifique a escolha do fornecedor</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span><strong>Documentação:</strong> Anexe documentos que comprovem a exclusividade ou notório saber</span>
                </li>
              </>
            )}
            {isDispensa && (
              <>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span><strong>Dispensa (Art. 75):</strong> Demonstre que a situação se enquadra em um dos incisos do art. 75</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span><strong>Valores:</strong> Verifique se o valor está dentro dos limites (R$ 118.266,50 para obras ou R$ 59.133,27 para outros serviços)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span><strong>Documentação:</strong> Anexe documentos que comprovem a situação de dispensa</span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Status da Seção */}
        {isSectionComplete && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <h4 className="font-medium text-green-800">Seção Completa</h4>
                <p className="text-sm text-green-700">Fundamentação adequadamente detalhada.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </StandardCard>
  );
};

export default FundamentacaoSection;
