import React from 'react';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'pesquisa', label: 'Pesquisa de Preços' },
    { id: 'rota', label: 'Decisão de Rota' },
    { id: 'etp', label: 'Estudo Técnico Preliminar (ETP)' }
  ];

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
      <div className="container mx-auto">
        <nav className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`relative py-4 px-6 font-medium text-sm transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'text-lumen-blue' 
                  : 'text-gray-600 hover:text-lumen-blue/80'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="relative z-10">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-lumen-gold via-lumen-gold to-[#E5C158] transform scale-x-100 transition-transform duration-200" />
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation;
