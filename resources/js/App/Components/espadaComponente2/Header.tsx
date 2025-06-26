import { Shield, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-lumen-blue via-lumen-blue to-[#0D4B7C] text-white p-4 shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-10"></div>
      <div className="container mx-auto flex justify-between items-center relative z-10">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-lumen-gold to-[#E5C158] rounded-full flex items-center justify-center mr-6 shadow-lg transform hover:scale-105 transition-transform duration-200">
            <span className="text-lumen-blue font-bold text-2xl">L</span>
          </div>
          <h1 className="font-bold text-2xl tracking-tight">
            ESPADA 2
            <span className="block text-sm font-medium text-white/80 mt-0.5">ESTRATÉGIA DE CONTRATAÇÃO</span>
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-white/10 rounded-lg px-4 py-2.5 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 cursor-pointer group">
            <div className="w-8 h-8 bg-gradient-to-br from-lumen-gold to-[#E5C158] rounded-lg flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
              <Shield className="h-5 w-5 text-lumen-blue" />
            </div>
            <span className="text-sm">Escudo LUX</span>
          </div>
          <div className="flex items-center bg-white/10 rounded-lg px-4 py-2.5 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 cursor-pointer group">
            <div className="w-8 h-8 bg-gradient-to-br from-lumen-gold to-[#E5C158] rounded-lg flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
              <User className="h-5 w-5 text-lumen-blue" />
            </div>
            <span className="text-sm">João Silva</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
