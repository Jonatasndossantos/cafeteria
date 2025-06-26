import React from 'react';
import { StandardCard } from '@/Components/ui/standard-card';
import { LucideIcon } from 'lucide-react';

interface TRBlockCardProps {
  title: string;
  icon: LucideIcon;
  isRequired: boolean;
  children: React.ReactNode;
  className?: string;
  description?: string;
  specificRequirements?: {
    requisitos?: string;
    sustentabilidade?: string;
  };
}

export const TRBlockCard: React.FC<TRBlockCardProps> = ({
  title,
  icon: Icon,
  isRequired,
  children,
  className = '',
  description,
  specificRequirements
}) => {
  return (
    <StandardCard 
      title={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Icon className="w-4 h-4 mr-2 text-lumen-gold" />
            <span>{title}</span>
          </div>
          {isRequired && (
            <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              Obrigatório
            </span>
          )}
        </div>
      }
      className={`hover:shadow-xl transition-all duration-200 ${className}`}
    >
      {description && (
        <div className="mb-4 text-sm text-gray-600">
          {description}
        </div>
      )}

      {specificRequirements && Object.keys(specificRequirements).length > 0 && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="text-sm font-medium text-green-800 mb-2">📌 Requisitos Específicos:</h4>
          <ul className="text-sm text-green-700 space-y-2">
            {specificRequirements.requisitos && (
              <li className="flex items-start">
                <svg className="w-4 h-4 mr-2 text-green-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span><strong>Requisitos:</strong> {specificRequirements.requisitos}</span>
              </li>
            )}
            {specificRequirements.sustentabilidade && (
              <li className="flex items-start">
                <svg className="w-4 h-4 mr-2 text-green-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span><strong>Sustentabilidade:</strong> {specificRequirements.sustentabilidade}</span>
              </li>
            )}
          </ul>
        </div>
      )}

      <div className="space-y-4">
        {children}
      </div>
    </StandardCard>
  );
};

export default TRBlockCard; 