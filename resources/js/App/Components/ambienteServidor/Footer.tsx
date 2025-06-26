
import React from 'react';

export const Footer = () => {
  return (
    <footer className="py-4 px-8 lg:px-16 bg-gradient-to-br from-[#020B1A] via-[#0A3D62] to-[#020B1A] relative">
      {/* Background Pattern igual ao da página principal */}
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-sm text-white hover:text-[#CB991A] transition-colors">
              Biblioteca de Modelos
            </a>
            <a href="#" className="text-sm text-white hover:text-[#CB991A] transition-colors">
              Suporte
            </a>
            <a href="#" className="text-sm text-white hover:text-[#CB991A] transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-sm text-white hover:text-[#CB991A] transition-colors">
              Logs de Transparência
            </a>
          </div>
          <div className="text-sm text-white/80">
            © {new Date().getFullYear()} LUMEN - Plataforma de Contratações Públicas
          </div>
        </div>
      </div>
    </footer>
  );
};
