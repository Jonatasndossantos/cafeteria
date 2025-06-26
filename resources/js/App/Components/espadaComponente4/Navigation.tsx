import React from 'react';

interface NavigationProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
            <div className="container mx-auto">
                <nav className="flex">
                    <button 
                        className={`relative py-4 px-6 font-medium text-sm transition-all duration-200 ${
                            activeTab === 'matriz' 
                                ? 'text-lumen-blue' 
                                : 'text-gray-600 hover:text-lumen-blue/80'
                        }`}
                        onClick={() => setActiveTab('matriz')}
                    >
                        <span className="relative z-10">Matriz de Riscos</span>
                        {activeTab === 'matriz' && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-lumen-gold via-lumen-gold to-[#E5C158] transform scale-x-100 transition-transform duration-200" />
                        )}
                    </button>
                </nav>
            </div>
        </div>
    );
}; 