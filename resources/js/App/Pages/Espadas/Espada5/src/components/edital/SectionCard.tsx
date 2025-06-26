import React from 'react';
import { StandardCard } from '@/Components/ui/standard-card';

interface SectionCardProps {
  number: string;
  title: string;
  icon: any;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ 
  number, 
  title, 
  icon: Icon, 
  children 
}) => (
  <StandardCard 
    title={`${number}. ${title}`}
    icon={Icon}
    className="shadow-md"
  >
    <div className="space-y-4">
      {children}
    </div>
  </StandardCard>
);

export default SectionCard;
