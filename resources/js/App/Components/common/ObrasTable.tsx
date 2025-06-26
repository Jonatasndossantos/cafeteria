import { Package, Edit, Trash2 } from "lucide-react";
import { useState, Dispatch, SetStateAction } from "react";
import { ObraItem, useGestaoItens } from "@/hooks/Espada1/useGestaoItens";

interface ObrasTableProps {
  formatCurrency: (value: number) => string;
  showAddForm: boolean;
  setShowAddForm: Dispatch<SetStateAction<boolean>>;
}

export function ObrasTable({ showAddForm, setShowAddForm }: ObrasTableProps) {
  const { items, addItem, updateItem, removeItem, isLoading } = useGestaoItens<ObraItem>('obras');
  const [editingItem, setEditingItem] = useState<ObraItem | null>(null);
  const [newItem, setNewItem] = useState<Omit<ObraItem, 'id' | 'total'>>({
    item: "",
    codigo: "",
    descricao: "",
    unidade: "",
    quantidade: 0,
    precoUnitario: 0,
    precoComBDI: 0
  });
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleAddItem = () => {
    const item = {
      ...newItem,
      total: newItem.quantidade * newItem.precoComBDI
    };
    addItem(item);
    setNewItem({
      item: "",
      codigo: "",
      descricao: "",
      unidade: "",
      quantidade: 0,
      precoUnitario: 0,
      precoComBDI: 0
    });
    setShowAddForm(false);
  };

  const handleEditItem = (item: ObraItem) => {
    setEditingItem(item);
  };

  const handleUpdateItem = () => {
    if (editingItem) {
      const updatedItem = {
        ...editingItem,
        total: editingItem.quantidade * editingItem.precoComBDI
      };
      updateItem(updatedItem);
      setEditingItem(null);
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      {showAddForm && (
        <div className="p-4 mb-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="mb-3 text-sm font-medium">Adicionar Nova Obra</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-8">
            <div>
              <input 
                type="text" 
                placeholder="Item"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
                value={newItem.item}
                onChange={(e) => setNewItem({...newItem, item: e.target.value})}
              />
            </div>
            <div>
              <input 
                type="text" 
                placeholder="Código"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
                value={newItem.codigo}
                onChange={(e) => setNewItem({...newItem, codigo: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <input 
                type="text" 
                placeholder="Descrição"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
                value={newItem.descricao}
                onChange={(e) => setNewItem({...newItem, descricao: e.target.value})}
              />
            </div>
            <div>
              <input 
                type="text" 
                placeholder="Unidade"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
                value={newItem.unidade}
                onChange={(e) => setNewItem({...newItem, unidade: e.target.value})}
              />
            </div>
            <div>
              <input 
                type="number" 
                placeholder="Quantidade"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
                value={newItem.quantidade || ''}
                onChange={(e) => setNewItem({...newItem, quantidade: parseFloat(e.target.value) || 0})}
              />
            </div>
            <div>
              <input 
                type="number" 
                placeholder="Preço Unitário"
                step="0.01"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
                value={newItem.precoUnitario || ''}
                onChange={(e) => setNewItem({...newItem, precoUnitario: parseFloat(e.target.value) || 0})}
              />
            </div>
            <div>
              <input 
                type="number" 
                placeholder="Preço com BDI"
                step="0.01"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
                value={newItem.precoComBDI || ''}
                onChange={(e) => setNewItem({...newItem, precoComBDI: parseFloat(e.target.value) || 0})}
              />
            </div>
          </div>
          <div className="flex justify-end mt-3 space-x-2">
            <button 
              className="px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={() => setShowAddForm(false)}
            >
              Cancelar
            </button>
            <button 
              className="px-3 py-1 text-sm text-white rounded-md bg-lumen-blue hover:bg-lumen-blue/90"
              onClick={handleAddItem}
            >
              Adicionar
            </button>
          </div>
        </div>
      )}

      {editingItem && (
        <div className="p-4 mb-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="mb-3 text-sm font-medium">Editar Obra</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-8">
            <div>
              <input 
                type="text" 
                placeholder="Item"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
                value={editingItem.item}
                onChange={(e) => setEditingItem({...editingItem, item: e.target.value})}
              />
            </div>
            <div>
              <input 
                type="text" 
                placeholder="Código"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
                value={editingItem.codigo}
                onChange={(e) => setEditingItem({...editingItem, codigo: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <input 
                type="text" 
                placeholder="Descrição"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
                value={editingItem.descricao}
                onChange={(e) => setEditingItem({...editingItem, descricao: e.target.value})}
              />
            </div>
            <div>
              <input 
                type="text" 
                placeholder="Unidade"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
                value={editingItem.unidade}
                onChange={(e) => setEditingItem({...editingItem, unidade: e.target.value})}
              />
            </div>
            <div>
              <input 
                type="number" 
                placeholder="Quantidade"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
                value={editingItem.quantidade || ''}
                onChange={(e) => setEditingItem({...editingItem, quantidade: parseFloat(e.target.value) || 0})}
              />
            </div>
            <div>
              <input 
                type="number" 
                placeholder="Preço Unitário"
                step="0.01"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
                value={editingItem.precoUnitario || ''}
                onChange={(e) => setEditingItem({...editingItem, precoUnitario: parseFloat(e.target.value) || 0})}
              />
            </div>
            <div>
              <input 
                type="number" 
                placeholder="Preço com BDI"
                step="0.01"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
                value={editingItem.precoComBDI || ''}
                onChange={(e) => setEditingItem({...editingItem, precoComBDI: parseFloat(e.target.value) || 0})}
              />
            </div>
          </div>
          <div className="flex justify-end mt-3 space-x-2">
            <button 
              className="px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={() => setEditingItem(null)}
            >
              Cancelar
            </button>
            <button 
              className="px-3 py-1 text-sm text-white rounded-md bg-lumen-blue hover:bg-lumen-blue/90"
              onClick={handleUpdateItem}
            >
              Salvar
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Item</th>
              <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Código</th>
              <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Descrição</th>
              <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Unid.</th>
              <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Quant.</th>
              <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Preço Unitário</th>
              <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Preço com BDI</th>
              <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Total</th>
              <th className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items?.map((item) => (
              <tr key={item.id}>
                <td className="px-3 py-3 text-sm">{item.item}</td>
                <td className="px-3 py-3 font-mono text-sm">{item.codigo}</td>
                <td className="px-3 py-3 text-sm">{item.descricao}</td>
                <td className="px-3 py-3 text-sm">{item.unidade}</td>
                <td className="px-3 py-3 text-sm text-right">{item.quantidade}</td>
                <td className="px-3 py-3 text-sm text-right">{formatCurrency(item.precoUnitario)}</td>
                <td className="px-3 py-3 text-sm text-right">{formatCurrency(item.precoComBDI)}</td>
                <td className="px-3 py-3 text-sm font-medium text-right">{formatCurrency(item.total)}</td>
                <td className="px-3 py-3 text-sm">
                  <div className="flex space-x-2">
                    <button 
                      className="text-lumen-blue hover:text-lumen-blue/80"
                      onClick={() => handleEditItem(item)}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {items.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          <Package className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p>Nenhuma obra cadastrada</p>
          <p className="text-sm">Clique em "Adicionar Obra" para começar</p>
        </div>
      )}
    </>
  );
} 