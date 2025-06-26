import React, { useState } from 'react';
import { Building2 } from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import { MunicipalAlert } from './AlertComponents';

interface MunicipalToggleProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  alertMessage?: string;
}

const MunicipalToggle: React.FC<MunicipalToggleProps> = ({
  title,
  value,
  onChange,
  placeholder = "Inserir regulamentações específicas do município...",
  rows = 3,
  alertMessage = "Inserir regulamentações específicas conforme regulamentação local."
}) => {
  const [isEnabled, setIsEnabled] = useState(!!value);

  const handleToggle = () => {
    if (isEnabled) {
      // Desabilitar - limpar o valor
      onChange('');
      setIsEnabled(false);
    } else {
      // Habilitar - manter o valor atual ou usar placeholder
      setIsEnabled(true);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-gray-700 flex items-center">
          <Building2 className="w-4 h-4 mr-2 text-lumen-blue" />
          {title}
        </Label>
        <Button
          type="button"
          variant={isEnabled ? "default" : "outline"}
          size="sm"
          onClick={handleToggle}
          className={`text-xs ${
            isEnabled 
              ? 'bg-lumen-blue hover:bg-blue-700 text-white' 
              : 'border-lumen-blue text-lumen-blue hover:bg-blue-50'
          }`}
        >
          {isEnabled ? 'Desabilitar' : 'Habilitar'} Regulamentações Municipais
        </Button>
      </div>
      
      {isEnabled && (
        <div className="animate-fade-in">
          <Textarea 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            className="mt-1 border-blue-200 bg-blue-50 focus:border-lumen-blue"
            placeholder={placeholder}
          />
          <MunicipalAlert>{alertMessage}</MunicipalAlert>
        </div>
      )}
    </div>
  );
};

export default MunicipalToggle; 