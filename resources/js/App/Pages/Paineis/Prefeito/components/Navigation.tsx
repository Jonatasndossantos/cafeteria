
import React from 'react';
import { Button } from '@/Components/ui/button';

interface NavigationProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

export const Navigation = ({ activeModule, setActiveModule }: NavigationProps) => {
  const modules = [
    { 
      id: 'visao-geral', 
      label: 'Visão Geral', 
      icon: '🏠'
    },
    { 
      id: 'conformidade-legal', 
      label: 'Conformidade Legal', 
      icon: '⚖️'
    },
    { 
      id: 'visao-financeira', 
      label: 'Visão Financeira', 
      icon: '💰'
    },
    { 
      id: 'obras-convenios', 
      label: 'Obras & Convênios', 
      icon: '🚧'
    },
    { 
      id: 'emendas', 
      label: 'Emendas', 
      icon: '🎁'
    },
    { 
      id: 'secretarias', 
      label: 'Secretarias', 
      icon: '🏛️'
    },
    { 
      id: 'prioridades', 
      label: 'Prioridades', 
      icon: '🎯'
    }
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-lumen-gray-dark/30 sticky top-0 z-40 shadow-lg" aria-label="Navegação principal">
      <div className="container mx-auto px-6">
        <div className="flex items-center space-x-3 overflow-x-auto py-4">
          {modules.map((module) => (
            <Button
              key={module.id}
              variant={activeModule === module.id ? "default" : "ghost"}
              className={`
                relative whitespace-nowrap text-sm transition-all duration-300 group min-w-fit
                ${activeModule === module.id 
                  ? 'bg-gradient-to-r from-lumen-blue to-lumen-blue-dark text-white shadow-xl border-0 scale-105 font-semibold transform hover:scale-105' 
                  : 'text-lumen-blue/80 hover:text-lumen-blue hover:bg-gradient-to-r hover:from-lumen-gray/50 hover:to-white hover:scale-102 hover:shadow-md font-medium'
                }
                font-roboto px-4 py-3 rounded-xl hover:shadow-lg active:scale-95
              `}
              onClick={() => setActiveModule(module.id)}
              aria-current={activeModule === module.id ? "page" : undefined}
              aria-label={module.label}
            >
              <div className="flex items-center space-x-2.5">
                <span className="text-lg filter drop-shadow-sm" aria-hidden="true">
                  {module.icon}
                </span>
                <span className={`
                  leading-tight
                  ${activeModule === module.id ? 'font-semibold' : 'font-medium'}
                `}>
                  <span className="hidden sm:inline">{module.label}</span>
                  <span className="sm:hidden">
                    {module.label.split(' ')[0]}
                  </span>
                </span>
              </div>
              
              {/* Enhanced active indicator */}
              {activeModule === module.id && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1.5 bg-gradient-to-r from-lumen-gold to-lumen-gold-light rounded-full shadow-sm"></div>
              )}
              
              {/* Hover indicator for inactive tabs */}
              {activeModule !== module.id && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-lumen-blue rounded-full transition-all duration-300 group-hover:w-8"></div>
              )}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};
