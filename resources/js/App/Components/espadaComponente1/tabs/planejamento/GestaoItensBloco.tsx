import { Plus, FileUp, FileDown, FileText } from "lucide-react";
import { CardGestaoItens } from "./CardGestaoItens";
import { GestaoItensTable } from "@/Components/common/GestaoItensTable";
import { useState } from "react";

export function GestaoItensBloco() {
  const [showAddForm, setShowAddForm] = useState(false);

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };
  return (
    <CardGestaoItens title="Gestão de Itens" totalValue={'R$ 0,00'}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button
            className="px-4 py-2.5 bg-lumen-blue text-white rounded-lg hover:bg-lumen-blue/90 shadow-md transition-all duration-200 font-medium text-sm flex items-center group"
            onClick={() => setShowAddForm(true)}
          >
            <Plus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Adicionar Item
          </button>
        </div>
      </div>

      <GestaoItensTable
        items={[]}
        onAddItem={() => {}}
        onRemoveItem={() => {}}
        formatCurrency={() => {}}
        showAddForm={showAddForm}
        setShowAddForm={setShowAddForm}
      />
    </CardGestaoItens>
  );
}
