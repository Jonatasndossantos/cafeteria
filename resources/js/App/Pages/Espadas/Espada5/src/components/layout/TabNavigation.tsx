

import React from 'react';
import { Eye, Users, FileCheck, FileText, Upload } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

const TabNavigation = ({ activeTab, setActiveTab }: TabNavigationProps) => {
  const tabs = [
    { id: 'credenciamento', label: 'Regras para Credenciamento', icon: Users },
    { id: 'contratacao', label: 'Contratação Direta', icon: FileCheck },
    { id: 'edital', label: 'Elaboração do Edital', icon: FileText },
  ];

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
      <div className="container mx-auto">
        <nav className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`relative py-4 px-6 font-medium text-sm flex items-center transition-all duration-200 ${
                  activeTab === tab.id 
                    ? 'text-lumen-blue' 
                    : 'text-gray-600 hover:text-lumen-blue/80'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon className="w-4 h-4 mr-2" />
                <span className="relative z-10">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-lumen-gold via-lumen-gold to-[#E5C158] transform scale-x-100 transition-transform duration-200" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation;

