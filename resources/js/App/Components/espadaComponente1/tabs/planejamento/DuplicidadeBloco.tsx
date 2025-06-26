import { Search, AlertTriangle, CheckCircle, Eye, Lightbulb } from "lucide-react";
import { useState, useEffect } from "react";
import { StandardCard } from '@/Components/ui/standard-card';

interface DemandaSimilar {
  id: number;
  descricao: string;
  unidade: string;
  similaridade: number;
  status: string;
  data: string;
}

export function DuplicidadeBloco() {
  const [loading, setLoading] = useState(false);
  const [demandasSimilares, setDemandasSimilares] = useState<DemandaSimilar[]>([]);
  const [analiseCompleta, setAnaliseCompleta] = useState(false);

  useEffect(() => {
    // Simula análise automática quando o Componente é carregado
    handleAnaliseAutomatica();
  }, []);

  const handleAnaliseAutomatica = async () => {
    setLoading(true);
    // Simula chamada à API da LUX
    setTimeout(() => {
      setDemandasSimilares([
        {
          id: 1,
          descricao: "Aquisição de equipamentos de informática para Secretaria de Saúde",
          unidade: "Secretaria de Saúde",
          similaridade: 85,
          status: "Em andamento",
          data: "2024-01-15"
        },
        {
          id: 2,
          descricao: "Compra de computadores para modernização administrativa",
          unidade: "Secretaria de Administração",
          similaridade: 73,
          status: "Planejada",
          data: "2024-02-10"
        }
      ]);
      setAnaliseCompleta(true);
      setLoading(false);
    }, 2000);
  };

  const getSimilaridadeColor = (similaridade: number) => {
    if (similaridade >= 80) return "text-red-600 bg-red-50";
    if (similaridade >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  return (
    <StandardCard 
      title="Verificação de Duplicidade"
      icon={Search}
      className="mb-6"
    >
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin h-8 w-8 text-lumen-blue mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <p className="text-gray-600 mb-2">LUX analisando possíveis duplicidades...</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-lumen-blue h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
            </div>
          </div>
        ) : analiseCompleta ? (
          <div className="space-y-4">
            {demandasSimilares.length > 0 ? (
              <>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
                    <span className="text-sm font-medium text-yellow-800">
                      LUX encontrou {demandasSimilares.length} demanda(s) similar(es)
                    </span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    Recomenda-se análise para possível consolidação ou coordenação entre unidades.
                  </p>
                </div>

                <div className="space-y-3">
                  {demandasSimilares.map((demanda) => (
                    <div key={demanda.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{demanda.descricao}</h4>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Unidade:</span> {demanda.unidade}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Status:</span> {demanda.status} • 
                            <span className="font-medium"> Data:</span> {demanda.data}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getSimilaridadeColor(demanda.similaridade)}`}>
                            {demanda.similaridade}% similar
                          </div>
                          <button className="text-lumen-blue hover:text-lumen-gold transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-lumen-blue">
                          <Lightbulb className="w-4 h-4 mr-1 text-lumen-gold" />
                          <span>Sugestão: Considere consolidar com esta demanda</span>
                        </div>
                        <button className="px-3 py-1 bg-lumen-blue text-white rounded-md hover:bg-lumen-blue/90 text-xs">
                          Propor Consolidação
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-medium text-green-800 mb-1">Nenhuma duplicidade encontrada</h3>
                <p className="text-sm text-green-700">
                  A LUX não identificou demandas similares no sistema. Esta demanda é única.
                </p>
              </div>
            )}
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button 
                className="px-4 py-2 border border-lumen-blue text-lumen-blue rounded-md hover:bg-gray-50 transition-colors text-sm flex items-center"
                onClick={handleAnaliseAutomatica}
              >
                <Search className="w-4 h-4 mr-2" />
                Reanalizar Duplicidades
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </StandardCard>
  );
}
