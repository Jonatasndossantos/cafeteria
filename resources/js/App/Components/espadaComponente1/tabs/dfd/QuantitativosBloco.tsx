import { FileText, Plus } from "lucide-react";
import { useFormData } from "@/hooks/useFormData";
import { StandardCard } from "@/Components/ui/standard-card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

export function QuantitativosBloco() {
  const { formData, updateField, getFieldValue } = useFormData();

  const handleAddItem = () => {
    const currentItems = getFieldValue('dfd.itens') || [];
    const newItem = {
      id: Date.now(),
      descricao: '',
      quantidade: 1,
      valorUnitario: 0,
      valorTotal: 0
    };
    updateField('dfd.itens', [...currentItems, newItem]);
  };

  const handleRemoveItem = (id: number) => {
    const currentItems = getFieldValue('dfd.itens') || [];
    updateField('dfd.itens', currentItems.filter((item: any) => item.id !== id));
  };

  const handleUpdateItem = (id: number, field: string, value: any) => {
    const currentItems = getFieldValue('dfd.itens') || [];
    const updatedItems = currentItems.map((item: any) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantidade' || field === 'valorUnitario') {
          updatedItem.valorTotal = updatedItem.quantidade * updatedItem.valorUnitario;
        }
        return updatedItem;
      }
      return item;
    });
    updateField('dfd.itens', updatedItems);
  };

  const items = getFieldValue('dfd.itens') || [];
  const valorTotal = items.reduce((total: number, item: any) => total + (item.valorTotal || 0), 0);

  return (
    <StandardCard 
      title="Quantitativos"
      icon={FileText}
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-700">Itens</h3>
            <Button
              onClick={handleAddItem}
              variant="outline"
              size="sm"
              className="flex items-center"
            >
              <Plus className="w-4 h-4 mr-1" />
              Adicionar Item
            </Button>
        </div>

        <div className="space-y-4">
          {items.map((item: any) => (
            <div key={item.id} className="p-4 border rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição
                  </label>
                  <Input
                    value={item.descricao}
                    onChange={(e) => handleUpdateItem(item.id, 'descricao', e.target.value)}
                    placeholder="Descrição do item"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantidade
                  </label>
                  <Input
                    type="number"
                    value={item.quantidade}
                    onChange={(e) => handleUpdateItem(item.id, 'quantidade', Number(e.target.value))}
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valor Unitário
                  </label>
                  <Input
                    type="number"
                    value={item.valorUnitario}
                    onChange={(e) => handleUpdateItem(item.id, 'valorUnitario', Number(e.target.value))}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valor Total
                  </label>
                  <Input
                    value={item.valorTotal.toFixed(2)}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remover Item
                  </Button>
                </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">Valor Total Estimado</p>
            <p className="text-2xl font-bold text-lumen-blue">
              R$ {valorTotal.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </StandardCard>
  );
}
