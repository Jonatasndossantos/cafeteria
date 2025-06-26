import { CheckCircle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useEspada1 } from "@hooks/Espada1/useEspada1";

interface Criterio {
  criterio: string;
  motivo?: string;
}

interface Elegibilidade {
  elegivel: boolean;
  motivo: string;
  criteriosAtendidos: Criterio[];
  criteriosNaoAtendidos: Criterio[];
  baseNormativa: string;
}

interface AnaliseDFDSimplificadoComponentProps {
  formData: any;
  onRouteChange: (useSimplified: boolean) => void;
}

export function AnaliseDFDSimplificadoComponent({ formData, onRouteChange }: AnaliseDFDSimplificadoComponentProps) {
  const [loading, setLoading] = useState(false);
  const [elegibilidade, setElegibilidade] = useState<Elegibilidade | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const { updateTipo } = useEspada1();

  // Análise automática quando o Componente carrega
  useEffect(() => {
    analisarElegibilidade();
  }, []);

  const analisarElegibilidade = async () => {
    setLoading(true);
    try {
      // Simula chamada à API da LUX para análise de elegibilidade
      setTimeout(() => {
        // Obter valor total dos itens com null check
        const valorTotal = formData?.itens?.reduce((total: number, item: any) => {
          if (!item) return total;
          return total + (item.valorTotal || 0);
        }, 0) || 0;

        const mockElegibilidade: Elegibilidade = {
          elegivel: valorTotal <= 50000,
          motivo: valorTotal <= 50000
            ? 'Todos os critérios para DFD simplificado foram atendidos.'
            : 'Um ou mais critérios para DFD simplificado não foram atendidos.',
          criteriosAtendidos: valorTotal <= 50000 ? [
            { criterio: 'Valor dentro do limite de dispensa (até R$ 50.000,00)' },
            { criterio: 'Objeto com repetitividade ou previsibilidade' },
            { criterio: 'Risco baixo à administração' },
            { criterio: 'Demanda recorrente e padronizada no PCA' }
          ] : [
            { criterio: 'Objeto com repetitividade ou previsibilidade' },
            { criterio: 'Risco baixo à administração' }
          ],
          criteriosNaoAtendidos: valorTotal > 50000 ? [
            {
              criterio: 'Valor dentro do limite de dispensa',
              motivo: `Valor (R$ ${valorTotal?.toFixed(2)}) excede o limite de R$ 50.000,00`
            }
          ] : [],
          baseNormativa: 'Lei 14.133/21, Art. 18 e 20'
        };

        setElegibilidade(mockElegibilidade);
        setLoading(false);
      }, 2000);
    } catch (err) {
      console.error('Erro ao analisar elegibilidade:', err);
      // Em caso de erro, assume DFD completo por segurança
      setElegibilidade({
        elegivel: false,
        motivo: 'Erro na análise de elegibilidade. Por segurança, recomenda-se o DFD completo.',
        criteriosAtendidos: [],
        criteriosNaoAtendidos: [],
        baseNormativa: 'Lei 14.133/21'
      });
      setLoading(false);
    }
  };

  const handleRouteSelection = (useSimplified: boolean) => {
    // Atualiza o tipo no hook useEspada1
    updateTipo(useSimplified ? 'simplificada' : 'completa');

    // Notifica o componente pai sobre a mudança de rota
    onRouteChange(useSimplified);

    // Registra a decisão para fins de auditoria
    console.log('Rota selecionada:', useSimplified ? 'DFD Simplificado' : 'DFD Completo');
  };

  if (loading) {
    return (
      <div className="flex items-center p-4 mb-6 border rounded-lg bg-amber-50 border-lumen-gold/30">
        <svg className="w-5 h-5 mr-3 animate-spin text-lumen-gold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-amber-800">Analisando elegibilidade para DFD simplificado...</span>
      </div>
    );
  }

  if (!elegibilidade) {
    return null;
  }

  return (
    <div className={`border rounded-lg p-4 mb-6 ${elegibilidade.elegivel ? 'bg-amber-50 border-lumen-gold/30' : 'bg-blue-50 border-blue-200'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          {elegibilidade.elegivel ? (
            <CheckCircle className="w-6 h-6 text-lumen-gold mr-2 mt-0.5" />
          ) : (
            <AlertCircle className="w-6 h-6 text-blue-500 mr-2 mt-0.5" />
          )}
          <div>
            <h3 className={`font-medium ${elegibilidade.elegivel ? 'text-amber-800' : 'text-blue-800'}`}>
              {elegibilidade.elegivel ? 'Esta demanda é elegível para DFD simplificado' : 'Esta demanda requer DFD completo'}
            </h3>
            <p className={`text-sm mt-1 ${elegibilidade.elegivel ? 'text-amber-700' : 'text-blue-700'}`}>
              {elegibilidade.motivo}
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Base normativa: {elegibilidade.baseNormativa}
            </p>
          </div>
        </div>

        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>

      {showDetails && (
        <div className="pt-3 mt-4 border-t border-gray-200">
          <div className="space-y-3">
            {elegibilidade.criteriosAtendidos.length > 0 && (
              <div>
                <h4 className="mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">Critérios Atendidos</h4>
                <ul className="space-y-1">
                  {elegibilidade.criteriosAtendidos.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-lumen-gold mr-1.5 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item.criterio}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {elegibilidade.criteriosNaoAtendidos.length > 0 && (
              <div>
                <h4 className="mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">Critérios Não Atendidos</h4>
                <ul className="space-y-1">
                  {elegibilidade.criteriosNaoAtendidos.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <AlertCircle className="w-4 h-4 text-red-500 mr-1.5 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-sm">{item.criterio}</span>
                        {item.motivo && <p className="text-xs text-gray-500 mt-0.5">{item.motivo}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between pt-3 mt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          Selecione o tipo de DFD para esta demanda:
        </div>
        <div className="space-x-3">
          <button
            className={`px-3 py-1 rounded text-sm ${elegibilidade.elegivel ? 'bg-lumen-gold text-white hover:bg-lumen-gold/90' : 'border border-lumen-gold text-lumen-gold hover:bg-amber-50'}`}
            onClick={() => handleRouteSelection(true)}
          >
            DFD Simplificado
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${!elegibilidade.elegivel ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-blue-600 text-blue-600 hover:bg-blue-50'}`}
            onClick={() => handleRouteSelection(false)}
          >
            DFD Completo
          </button>
        </div>
      </div>
    </div>
  );
}
