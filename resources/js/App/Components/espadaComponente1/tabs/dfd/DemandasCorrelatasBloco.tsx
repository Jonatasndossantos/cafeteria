import { Link, RefreshCw } from "lucide-react";
import { SugestoesIAComponent } from "./SugestoesIAComponent";
import { useFormData } from "@/hooks/useFormData";
import { StandardCard } from "@/Components/ui/standard-card";
import { useState } from "react";

interface DemandaCorrelata {
  id: number;
  descricao: string;
  similaridade: number;
  status: string;
  unidade: string;
  valor: number;
}

export const DemandasCorrelatasBloco = () => {
  const { formData, updateField, getFieldValue } = useFormData();
  const [showFields, setShowFields] = useState(false);
  const [demandasEncontradas, setDemandasEncontradas] = useState<DemandaCorrelata[]>([]);
  const [loading, setLoading] = useState(false);

  const handleBuscaAutomatica = async () => {
    setLoading(true);
    try {
      // Simulando uma busca de demandas correlatas
      const mockDemandas: DemandaCorrelata[] = [
        {
          id: 1,
          descricao: "Aquisição de Equipamentos de Informática",
          similaridade: 85,
          status: "Em análise",
          unidade: "TI",
          valor: 150000
        },
        {
          id: 2,
          descricao: "Manutenção de Servidores",
          similaridade: 65,
          status: "Aprovado",
          unidade: "TI",
          valor: 80000
        }
      ];
      setDemandasEncontradas(mockDemandas);
    } catch (error) {
      console.error("Erro ao buscar demandas correlatas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StandardCard 
      title="Demandas Correlatas"
      icon={Link}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowFields(!showFields)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Possui vinculação com outras demandas
          </button>
          
          <button 
            className="px-3 py-1 border border-lumen-blue text-lumen-blue rounded-md hover:bg-gray-50 text-sm flex items-center"
            onClick={handleBuscaAutomatica}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
            Atualizar busca LUX
          </button>
        </div>

        {demandasEncontradas.length > 0 && (
          <div className="space-y-4">
            {demandasEncontradas.map((demanda) => (
              <div key={demanda.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{demanda.descricao}</h3>
                    <p className="text-sm text-gray-500">
                      {demanda.unidade} • {demanda.status}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      R$ {demanda.valor.toLocaleString('pt-BR')}
                    </p>
                    <p className="text-sm text-gray-500">
                      Similaridade: {demanda.similaridade}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showFields && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Justificativa da Vinculação *
              </label>
              <SugestoesIAComponent
                field="justificativa_vinculacao"
                value={getFieldValue('dfd.justificativaVinculacao') || ''}
                onChange={(value: string) => updateField('dfd.justificativaVinculacao', value)}
                context={formData}
                fieldType="textarea"
                rows={4}
                placeholder="Descreva a justificativa da vinculação..."
                onSelectSuggestion={(text: string) => updateField('dfd.justificativaVinculacao', text)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Impactos Esperados
              </label>
              <SugestoesIAComponent
                field="impactos_esperados"
                value={getFieldValue('dfd.impactosEsperados') || ''}
                onChange={(value: string) => updateField('dfd.impactosEsperados', value)}
                context={formData}
                fieldType="textarea"
                rows={4}
                placeholder="Descreva os impactos esperados..."
                onSelectSuggestion={(text: string) => updateField('dfd.impactosEsperados', text)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Riscos Preliminares
              </label>
              <SugestoesIAComponent
                field="riscos_preliminares"
                value={getFieldValue('dfd.riscosPreliminares') || ''}
                onChange={(value: string) => updateField('dfd.riscosPreliminares', value)}
                context={formData}
                fieldType="textarea"
                rows={4}
                placeholder="Descreva os riscos preliminares..."
                onSelectSuggestion={(text: string) => updateField('dfd.riscosPreliminares', text)}
              />
            </div>
          </>
        )}
      </div>
    </StandardCard>
  );
};
