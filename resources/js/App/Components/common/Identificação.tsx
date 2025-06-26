import { Input } from '@/Components/ui/input';
import { useIdentificacao } from '@/hooks/Espada1/useIdentificacao';
import { StandardCard } from '@/Components/ui/standard-card';
import { FileText } from 'lucide-react';

export function Identificacao() {
  const { identificacaoData, isLoading } = useIdentificacao();

  if (isLoading || !identificacaoData) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="w-8 h-8 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <StandardCard 
      title="Identificação"
      icon={FileText}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Identificação do documento atual */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Número do {identificacaoData.tipo}
          </label>
          <Input
            value={identificacaoData.numero}
            disabled
            className="text-sm bg-gray-100"
          />
        </div>

        {/* Vinculações */}
        {identificacaoData.vinculacoes.map((vinculacao, index) => (
          <div key={index}>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Vinculado ao {vinculacao.tipo}
            </label>
            <Input
              value={vinculacao.numero}
              disabled
              className="text-sm bg-gray-100"
            />
          </div>
        ))}

        {/* Objeto da Contratação */}
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Objeto da Contratação
          </label>
          <Input
            value={identificacaoData.objeto}
            disabled
            className="text-sm bg-gray-100"
          />
        </div>

        {/* Dados do Responsável */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Nome do Responsável
          </label>
          <Input
            value={identificacaoData.responsavel.nome}
            disabled
            className="text-sm bg-gray-100"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Cargo
          </label>
          <Input
            value={identificacaoData.responsavel.cargo}
            disabled
            className="text-sm bg-gray-100"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Setor
          </label>
          <Input
            value={identificacaoData.responsavel.setor}
            disabled
            className="text-sm bg-gray-100"
          />
        </div>

        {/* Fundamentação Legal */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Fundamentação legal
          </label>
          <Input
            value={identificacaoData.fundamentacaoLegal}
            disabled
            className="text-sm bg-gray-100"
          />
        </div>
      </div>
    </StandardCard>
  );
}
