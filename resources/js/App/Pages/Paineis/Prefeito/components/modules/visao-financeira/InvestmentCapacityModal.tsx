
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Progress } from "@/Components/ui/progress";
import { Calculator, AlertTriangle, Info } from "lucide-react";

interface InvestmentCapacityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InvestmentCapacityModal = ({ open, onOpenChange }: InvestmentCapacityModalProps) => {
  // Dados mockados para demonstração
  const dadosCalculo = {
    rcl: 45_000_000,
    limitePessoal: 22_500_000, // 50% RCL
    gastoPessoal: 20_000_000,
    limiteSaude: 6_750_000, // 15% RCL
    gastoSaude: 7_200_000,
    limiteEducacao: 11_250_000, // 25% RCL
    gastoEducacao: 12_000_000,
    rpps: 2_000_000,
    vinculados: 8_000_000,
    capacidadeCalculada: 20_000_000
  };

  const format = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

  const calcularPercentual = (gasto: number, limite: number) => (gasto / limite) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Calculator className="w-6 h-6 text-blue-600" />
            Cálculo da Capacidade de Investimento
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-2">
          {/* Fórmula Principal */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">Fórmula Base</h3>
            <div className="font-mono text-sm bg-white p-3 rounded border">
              <span className="text-green-600">RCL</span> - 
              <span className="text-red-600"> Pessoal</span> - 
              <span className="text-orange-600"> Saúde</span> - 
              <span className="text-purple-600"> Educação</span> - 
              <span className="text-gray-600"> RPPS</span> - 
              <span className="text-cyan-600"> Vinculados</span> = 
              <span className="text-blue-600 font-bold"> Capacidade de Investimento</span>
            </div>
          </div>

          {/* Detalhamento dos Componentes */}
          <div className="grid gap-4">
            {/* RCL */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex justify-between items-center">
                <span className="font-medium text-green-800">Receita Corrente Líquida (RCL)</span>
                <span className="text-green-600 font-mono">{format(dadosCalculo.rcl)}</span>
              </div>
              <p className="text-xs text-green-700 mt-1">Base de cálculo para todos os limites da LRF</p>
            </div>

            {/* Pessoal */}
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-red-800">Despesa com Pessoal</span>
                <span className="text-red-600 font-mono">{format(dadosCalculo.gastoPessoal)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-red-700">Limite LRF (50% RCL)</span>
                <span className="text-red-600">{format(dadosCalculo.limitePessoal)}</span>
              </div>
              <Progress 
                value={calcularPercentual(dadosCalculo.gastoPessoal, dadosCalculo.limitePessoal)} 
                className="h-2" 
              />
              <p className="text-xs text-red-700 mt-1">
                {calcularPercentual(dadosCalculo.gastoPessoal, dadosCalculo.limitePessoal).toFixed(1)}% do limite utilizado
              </p>
            </div>

            {/* Saúde */}
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-orange-800">Aplicação em Saúde</span>
                <span className="text-orange-600 font-mono">{format(dadosCalculo.gastoSaude)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-orange-700">Mínimo Constitucional (15% RCL)</span>
                <span className="text-orange-600">{format(dadosCalculo.limiteSaude)}</span>
              </div>
              <Progress 
                value={calcularPercentual(dadosCalculo.gastoSaude, dadosCalculo.limiteSaude)} 
                className="h-2" 
              />
              <div className="flex items-center gap-1 mt-1">
                {dadosCalculo.gastoSaude > dadosCalculo.limiteSaude ? (
                  <AlertTriangle className="w-3 h-3 text-green-600" />
                ) : (
                  <Info className="w-3 h-3 text-orange-600" />
                )}
                <p className="text-xs text-orange-700">
                  {calcularPercentual(dadosCalculo.gastoSaude, dadosCalculo.limiteSaude).toFixed(1)}% aplicado
                </p>
              </div>
            </div>

            {/* Educação */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-purple-800">Aplicação em Educação</span>
                <span className="text-purple-600 font-mono">{format(dadosCalculo.gastoEducacao)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-purple-700">Mínimo Constitucional (25% RCL)</span>
                <span className="text-purple-600">{format(dadosCalculo.limiteEducacao)}</span>
              </div>
              <Progress 
                value={calcularPercentual(dadosCalculo.gastoEducacao, dadosCalculo.limiteEducacao)} 
                className="h-2" 
              />
              <div className="flex items-center gap-1 mt-1">
                {dadosCalculo.gastoEducacao > dadosCalculo.limiteEducacao ? (
                  <AlertTriangle className="w-3 h-3 text-green-600" />
                ) : (
                  <Info className="w-3 h-3 text-purple-600" />
                )}
                <p className="text-xs text-purple-700">
                  {calcularPercentual(dadosCalculo.gastoEducacao, dadosCalculo.limiteEducacao).toFixed(1)}% aplicado
                </p>
              </div>
            </div>

            {/* RPPS */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">RPPS (Previdência)</span>
                <span className="text-gray-600 font-mono">{format(dadosCalculo.rpps)}</span>
              </div>
              <p className="text-xs text-gray-700 mt-1">Regime Próprio de Previdência Social</p>
            </div>

            {/* Recursos Vinculados */}
            <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
              <div className="flex justify-between items-center">
                <span className="font-medium text-cyan-800">Recursos Vinculados</span>
                <span className="text-cyan-600 font-mono">{format(dadosCalculo.vinculados)}</span>
              </div>
              <p className="text-xs text-cyan-700 mt-1">Receitas com destinação específica</p>
            </div>
          </div>

          {/* Resultado Final */}
          <div className="bg-blue-100 p-6 rounded-lg border-2 border-blue-300">
            <div className="text-center">
              <h3 className="text-lg font-bold text-blue-800 mb-2">Capacidade de Investimento Disponível</h3>
              <div className="text-3xl font-mono text-blue-600 mb-2">
                {format(dadosCalculo.capacidadeCalculada)}
              </div>
              <p className="text-sm text-blue-700">
                Recursos livres para novos investimentos e projetos
              </p>
            </div>
          </div>

          {/* Observações */}
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h4 className="font-medium text-amber-800 mb-2">⚠️ Observações Importantes</h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Este cálculo considera apenas os limites constitucionais e da LRF</li>
              <li>• Compromissos assumidos (empenhos) reduzem a capacidade disponível</li>
              <li>• Receitas vinculadas não podem ser utilizadas livremente</li>
              <li>• Recomenda-se manter margem de segurança de 10-15%</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
