import React from 'react';
import { StandardCard } from '@/Components/ui/standard-card';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import { CheckCircle, DollarSign } from 'lucide-react';
import { ContratacaoData } from '../../hooks/useContratacaoData';

interface CondicoesContratuaisSectionProps {
  data: ContratacaoData;
  updateField: (field: keyof ContratacaoData, value: any) => void;
}

const CondicoesContratuaisSection = ({ data, updateField }: CondicoesContratuaisSectionProps) => {
  // Verificar se seção está completa
  const isSectionComplete = data.registroPCA && 
    data.fonteDotacao && 
    data.prazoExecucao && 
    data.condicoesPagamento;

  return (
    <StandardCard 
      title="Planejamento e finanças"
      icon={DollarSign}
      className="shadow-md"
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Registro no PCA */}
          <div>
            <Label htmlFor="registroPCA" className="text-sm font-medium text-gray-700 mb-3 block">
              Registro no PCA *
            </Label>
            <Input
              id="registroPCA"
              value={data.registroPCA}
              onChange={(e) => updateField('registroPCA', e.target.value)}
              placeholder="Digite o número do registro no PCA"
              className="h-12"
            />
          </div>

          {/* Fonte e Dotação Orçamentária */}
          <div>
            <Label htmlFor="fonteDotacao" className="text-sm font-medium text-gray-700 mb-3 block">
              Fonte e Dotação Orçamentária *
            </Label>
            <Input
              id="fonteDotacao"
              value={data.fonteDotacao}
              onChange={(e) => updateField('fonteDotacao', e.target.value)}
              placeholder="Digite a fonte e dotação orçamentária"
              className="h-12"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Prazo de Execução */}
          <div>
            <Label htmlFor="prazoExecucao" className="text-sm font-medium text-gray-700 mb-3 block">
              Prazo de Execução *
            </Label>
            <Input
              id="prazoExecucao"
              type="date"
              value={data.prazoExecucao}
              onChange={(e) => updateField('prazoExecucao', e.target.value)}
              className="h-12"
            />
          </div>

          {/* Forma de Pagamento */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Forma de Pagamento *
            </Label>
            <Select value={data.formaPagamento} onValueChange={(value) => updateField('formaPagamento', value)}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Selecione a forma de pagamento" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="a-vista">À Vista</SelectItem>
                <SelectItem value="parcelado">Parcelado</SelectItem>
                <SelectItem value="milestone">Por Milestone</SelectItem>
                <SelectItem value="mensal">Mensal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Condições de Pagamento */}
        <div>
          <Label htmlFor="condicoesPagamento" className="text-sm font-medium text-gray-700 mb-3 block">
            Condições de Pagamento *
          </Label>
          <Textarea
            id="condicoesPagamento"
            value={data.condicoesPagamento}
            onChange={(e) => updateField('condicoesPagamento', e.target.value)}
            placeholder="Descreva o valor, as condições de pagamento, incluindo prazos, parcelas e critérios..."
            className="min-h-[100px] resize-y"
            maxLength={1000}
          />
        </div>

        {/* Obrigações das Partes */}
        <div>
          <Label htmlFor="obrigacoesPartes" className="text-sm font-medium text-gray-700 mb-3 block">
            Obrigações das Partes
          </Label>
          <Textarea
            id="obrigacoesPartes"
            value={data.obrigacoesPartes}
            onChange={(e) => updateField('obrigacoesPartes', e.target.value)}
            placeholder="Descreva as obrigações da contratada e da contratante..."
            className="min-h-[100px] resize-y"
            maxLength={1000}
          />
        </div>

        {/* Penalidades e Sanções */}
        <div>
          <Label htmlFor="penalidadesSancoes" className="text-sm font-medium text-gray-700 mb-3 block">
            Penalidades e Sanções
          </Label>
          <Textarea
            id="penalidadesSancoes"
            value={data.penalidadesSancoes}
            onChange={(e) => updateField('penalidadesSancoes', e.target.value)}
            placeholder="Descreva as penalidades e sanções aplicáveis em caso de descumprimento..."
            className="min-h-[100px] resize-y"
            maxLength={1000}
          />
        </div>

        {/* Orientações */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-medium text-blue-800 mb-3">Orientações para Planejamento e Finanças</h4>
          <ul className="text-sm text-blue-700 space-y-2">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
              <span>Verifique a disponibilidade orçamentária antes de iniciar o processo</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
              <span>Registre o processo no PCA conforme legislação aplicável</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
              <span>Defina prazos realistas para execução e pagamento</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
              <span>Estabeleça condições claras de pagamento e obrigações</span>
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
                <p className="text-sm text-green-700">Informações de planejamento e finanças preenchidas corretamente.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </StandardCard>
  );
};

export default CondicoesContratuaisSection;
