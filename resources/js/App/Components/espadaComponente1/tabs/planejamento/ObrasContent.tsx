import { FileText, Plus, FileUp, FileDown } from "lucide-react";
import { CardGestaoItens } from "./CardGestaoItens";
import { useState } from "react";
import { ObrasTable } from "@/Components/common/ObrasTable";

export function ObrasContent() {
  const [items, setItems] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);


  const handleAddItem = (item: any) => {
    setItems([...items, item]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== Number(id)));
  };

  const getTotalValue = () => {
    return items.reduce((total, item) => total + item.total, 0);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <CardGestaoItens
      title="Planilha de Orçamento de Obras"
      totalValue={'R$ 0,00'}
      icon={<FileText className="w-5 h-5 mr-2 text-lumen-gold" />}
    >
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

      <ObrasTable
        items={[]}
        onAddItem={() => {}}
        onRemoveItem={() => {}}
        showAddForm={showAddForm}
        setShowAddForm={setShowAddForm}
      />
    </CardGestaoItens>
  );
}