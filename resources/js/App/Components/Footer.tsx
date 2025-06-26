import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-sm text-gray-600 hover:text-[#0A3D62] transition-colors">
              Biblioteca de Modelos
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-[#0A3D62] transition-colors">
              Suporte
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-[#0A3D62] transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-[#0A3D62] transition-colors">
              Logs de Transparência
            </a>
          </div>
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} LUMEN - Plataforma de Contratações Públicas
          </div>
        </div>
      </div>
    </footer>
  );
};
