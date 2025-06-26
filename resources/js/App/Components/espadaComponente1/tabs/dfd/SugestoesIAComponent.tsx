import { Shield, RefreshCw, X, Check, Sparkles, Plus } from "lucide-react";
import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatedTitle } from "@/Components/ui/AnimatedTitle";
import { useSuggestions, Suggestion } from "@/hooks/useSuggestions";

// Tipagem explícita para o contexto, ajuste conforme necessário
interface SugestoesIAContext {
  documentType?: string;
  unidade?: string;
  [key: string]: any;
}

interface SugestoesIAComponentProps {
  field: string;
  value: string;
  onChange: (value: string) => void;
  context: SugestoesIAContext;
  fieldType?: 'input' | 'textarea';
  rows?: number;
  placeholder?: string;
  readOnly?: boolean;
  onSelectSuggestion: (text: string) => void;
}

export function SugestoesIAComponent({ 
  field, 
  value, 
  onChange, 
  context, 
  fieldType = 'textarea',
  rows = 4,
  placeholder = "",
  readOnly = false
}: SugestoesIAComponentProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  // Ref para foco automático no modal
  const modalRef = useRef<HTMLDivElement>(null);
  // Busca sugestões apenas quando showSuggestions está true
  const { data: suggestions, isLoading, error, refetch } = useSuggestions(field, showSuggestions, value);

  // Foca no modal ao abrir
  useEffect(() => {
    if (showSuggestions && modalRef.current) {
      modalRef.current.focus();
    }
  }, [showSuggestions]);

  // Handler para solicitar sugestões (useCallback para performance)
  const handleRequestSuggestions = useCallback(async () => {
    setShowSuggestions(true);
    await refetch();
  }, [refetch]);

  // Handler para aplicar sugestão (substitui o texto)
  const handleApplySuggestion = useCallback((suggestion: Suggestion) => {
    onChange(suggestion.text);
    setShowSuggestions(false);
  }, [onChange]);

  // Handler para adicionar sugestão ao texto atual
  const handleAppendSuggestion = useCallback((suggestion: Suggestion) => {
    const currentText = value || '';
    const newText = currentText ? `${currentText}\n\n${suggestion.text}` : suggestion.text;
    onChange(newText);
    setShowSuggestions(false);
  }, [onChange, value]);

  // Handler para fechar o modal
  const handleCloseModal = useCallback(() => {
    setShowSuggestions(false);
  }, []);

  return (
    <div className="w-full">
      <div className="relative">
        {/* Campo de texto editável */}
        {fieldType === 'textarea' ? (
          <textarea
            className={`w-full px-3 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue transition-colors ${readOnly ? 'bg-gray-50' : ''}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            placeholder={placeholder}
            readOnly={readOnly}
          />
        ) : (
          <input
            type="text"
            className={`w-full px-3 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue transition-colors ${readOnly ? 'bg-gray-50' : ''}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            readOnly={readOnly}
          />
        )}
        {/* Botão para solicitar sugestões */}
        <button
          type="button"
          className="absolute transition-colors right-3 top-3 text-lumen-blue hover:text-lumen-gold"
          onClick={handleRequestSuggestions}
          disabled={isLoading || readOnly}
          title="Obter sugestões da LUX"
        >
          {isLoading ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <Shield className="w-5 h-5" />
          )}
        </button>
      </div>
      {/* Modal de sugestões IA */}
      {showSuggestions && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={handleCloseModal}
          aria-modal="true"
          role="dialog"
        >
          <div 
            ref={modalRef}
            tabIndex={-1}
            className="bg-gradient-to-b from-white to-gray-50/80 rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden transform transition-all duration-300 scale-100 opacity-100"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-6 py-4 bg-gradient-to-r from-lumen-blue via-[#0A3D62] to-[#1a5f7a] text-white flex justify-between items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="relative z-10 flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-lumen-gold via-[#E5C158] to-[#FFD700] rounded-xl flex items-center justify-center mr-4 shadow-lg transform hover:scale-110 transition-all duration-300 hover:shadow-lumen-gold/20 hover:rotate-6">
                  <Shield className="w-7 h-7 text-lumen-blue" />
                </div>
                <div>
                  <AnimatedTitle text="Sugestões LUX" />
                  <p className="flex items-center text-sm text-white/90">
                    <Sparkles className="w-4 h-4 mr-1 text-lumen-gold" />
                    Powered by Escudo LUX
                  </p>
                </div>
              </div>
              <button
                className="flex items-center justify-center w-10 h-10 transition-all duration-300 border rounded-xl bg-white/5 hover:bg-white/20 backdrop-blur-sm border-white/10 hover:border-white/30 hover:rotate-90 hover:scale-110 group"
                onClick={handleCloseModal}
                aria-label="Fechar sugestões"
              >
                <X className="w-5 h-5 transition-colors group-hover:text-lumen-gold" />
              </button>
            </div>
            <div className="p-6">
              {/* Tratamento de erro ao buscar sugestões */}
              {error ? (
                <div className="py-12 text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-red-100 to-red-50">
                    <X className="w-8 h-8 text-red-400" />
                  </div>
                  <p className="font-medium text-red-600">Erro ao buscar sugestões</p>
                  <p className="mt-1 text-sm text-red-400">Tente novamente em alguns instantes</p>
                </div>
              ) : isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 rounded-full border-lumen-blue/10 border-t-lumen-gold animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-lumen-gold animate-pulse" />
                    </div>
                  </div>
                  <p className="mt-4 text-gray-600 animate-pulse">Gerando sugestões...</p>
                </div>
              ) : suggestions && suggestions.length > 0 ? (
                <div className="space-y-4">
                  {suggestions.map((suggestion) => (
                    <div key={suggestion.id} 
                      className="group p-5 border-2 border-gray-100 rounded-xl hover:border-lumen-gold/30 hover:shadow-lg hover:shadow-lumen-gold/5 transition-all duration-300 hover:-translate-y-0.5 bg-gradient-to-br from-white to-gray-50/50"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed text-gray-800 transition-colors group-hover:text-gray-900">
                            {suggestion.text}
                          </p>
                          {suggestion.explanation && (
                            <div className="flex items-center p-2 mt-3 transition-all rounded-lg bg-gradient-to-r from-lumen-blue/5 to-transparent group-hover:from-lumen-blue/10">
                              <Sparkles className="w-4 h-4 mr-2 text-lumen-gold" />
                              <p className="text-xs text-gray-500">{suggestion.explanation}</p>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium bg-gradient-to-r from-lumen-blue to-[#1a5f7a] text-white px-3 py-1.5 rounded-full shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300">
                            {suggestion.confidence}%
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          className="px-4 py-2.5 bg-gradient-to-r from-lumen-blue via-[#0A3D62] to-[#1a5f7a] text-white rounded-xl text-sm flex items-center hover:shadow-lg hover:shadow-lumen-blue/20 transition-all duration-300 hover:scale-105 group/btn"
                          onClick={() => handleApplySuggestion(suggestion)}
                        >
                          <Check className="w-4 h-4 mr-2 transition-transform group-hover/btn:scale-110" />
                          <span className="relative">
                            <span className="relative z-10">Substituir</span>
                            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white/20 transform origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform"></span>
                          </span>
                        </button>
                        <button
                          className="px-4 py-2.5 border-2 border-lumen-blue text-lumen-blue rounded-xl text-sm hover:bg-lumen-blue/5 transition-all duration-300 flex items-center hover:scale-105 hover:shadow-lg hover:shadow-lumen-blue/10 group/btn"
                          onClick={() => handleAppendSuggestion(suggestion)}
                        >
                          <Plus className="w-4 h-4 mr-2 transition-transform group-hover/btn:scale-110" />
                          <span className="relative">
                            <span className="relative z-10">Adicionar</span>
                            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-lumen-blue/20 transform origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform"></span>
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-transform duration-300 transform rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 hover:rotate-6 group">
                    <Shield className="w-8 h-8 text-gray-300 transition-colors duration-300 group-hover:text-lumen-gold" />
                  </div>
                  <p className="font-medium text-gray-600">Nenhuma sugestão disponível</p>
                  <p className="mt-1 text-sm text-gray-400">Tente novamente em alguns instantes</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
