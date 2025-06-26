import { List } from "lucide-react";
import { ReactNode } from "react";
import { useGestaoItens } from "@/hooks/Espada1/useGestaoItens";
import { StandardCard } from '@/Components/ui/standard-card';

interface CardGestaoItensProps {
  title: string;
  totalValue: string;
  children: ReactNode;
  icon?: ReactNode;
}

export function CardGestaoItens({ 
  title, 
  totalValue, 
  children, 
  icon = <List className="w-5 h-5 mr-2 text-lumen-gold" /> 
}: CardGestaoItensProps) {
  const { items, getTotalValue } = useGestaoItens('itens');
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <StandardCard 
      title={title}
      icon={List}
      className="mb-6"
    >
      <div className="flex justify-between items-center mb-6">
        <p className="text-xl font-semibold text-lumen-blue">
          {formatCurrency(getTotalValue())}
        </p>
      </div>
      
      {children}
    </StandardCard>
  );
} 