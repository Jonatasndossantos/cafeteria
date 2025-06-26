import React from 'react';
import { Info } from 'lucide-react';

interface InfoAlertProps {
  children: React.ReactNode;
}

const InfoAlert: React.FC<InfoAlertProps> = ({ children }) => {
  return (
    <div className="mt-2 flex items-center text-sm text-lumen-blue bg-blue-50 p-2 rounded-lg border border-blue-100">
      <Info className="w-4 h-4 mr-2 text-lumen-gold flex-shrink-0" />
      <span>{children}</span>
    </div>
  );
};

export default InfoAlert; 