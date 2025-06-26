import { Package, Edit, Trash2 } from "lucide-react";
import { useState, Dispatch, SetStateAction } from "react";
import { Item, useGestaoItens } from "@/hooks/Espada1/useGestaoItens";

interface GestaoItensTableProps {
  formatCurrency: (value: number) => string;
  showAddForm: boolean;
  setShowAddForm: Dispatch<SetStateAction<boolean>>;
}

export function GestaoItensTable({ showAddForm, setShowAddForm }: GestaoItensTableProps) {
  const { items, addItem, updateItem, removeItem, isLoading } = useGestaoItens<Item>('itens');
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [newItem, setNewItem] = useState<Omit<Item, 'id' | 'valorTotal'>>({
    descricao: "",
    catmat: "",
    unidade: "",
    quantidade: 0,
    valorUnitario: 0
  });

  const handleAddItem = () => {
    const item = {
      ...newItem,
      valorTotal: newItem.quantidade * newItem.valorUnitario
    };

    addItem(item);
    setNewItem({ descricao: "", catmat: "", unidade: "", quantidade: 0, valorUnitario: 0 });
    setShowAddForm(false);
  };

  const handleEditItem = (item: Item) => {
    setEditingItem(item);
  };

  const handleUpdateItem = () => {
    if (editingItem) {
      const updatedItem = {
        ...editingItem,
        valorTotal: editingItem.quantidade * editingItem.valorUnitario
      };
      updateItem(updatedItem);
      setEditingItem(null);
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <>
      {showAddForm && (
        <div className="p-4 mb-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="mb-3 text-sm font-medium">Adicionar Novo Item</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
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
                placeholder="CATMAT/CATSER"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
                value={newItem.catmat}
                onChange={(e) => setNewItem({...newItem, catmat: e.target.value})}
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
                placeholder="Valor Unitário"
                step="0.01"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
                value={newItem.valorUnitario || ''}
                onChange={(e) => setNewItem({...newItem, valorUnitario: parseFloat(e.target.value) || 0})}
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
          <h3 className="mb-3 text-sm font-medium">Editar Item</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
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
                placeholder="CATMAT/CATSER"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
                value={editingItem.catmat}
                onChange={(e) => setEditingItem({...editingItem, catmat: e.target.value})}
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
                placeholder="Valor Unitário"
                step="0.01"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lumen-blue"
                value={editingItem.valorUnitario || ''}
                onChange={(e) => setEditingItem({...editingItem, valorUnitario: parseFloat(e.target.value) || 0})}
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
              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Descrição</th>
              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">CATMAT/CATSER</th>
              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Unidade</th>
              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Quantidade</th>
              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Valor Unitário</th>
              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Valor Total</th>
              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item: any) => (
              <tr key={item.id}>
                <td className="px-4 py-3 text-sm">{item.descricao}</td>
                <td className="px-4 py-3 font-mono text-sm">{item.catmat}</td>
                <td className="px-4 py-3 text-sm">{item.unidade}</td>
                <td className="px-4 py-3 text-sm text-center">{item.quantidade}</td>
                <td className="px-4 py-3 text-sm text-center">{formatCurrency(item.valorUnitario)}</td>
                <td className="px-4 py-3 text-sm font-medium text-center">{formatCurrency(item.valorTotal)}</td>
                <td className="px-4 py-3 text-sm">
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
          <p>Nenhum item cadastrado</p>
          <p className="text-sm">Clique em "Adicionar Item" para começar</p>
        </div>
      )}
    </>
  );
}
