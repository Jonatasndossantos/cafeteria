
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { Badge } from '@/Components/ui/badge';

export const Header = () => {
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="bg-gradient-to-r from-lumen-blue to-lumen-blue-light text-white shadow-2xl relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 py-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              {/* Logo LUMEN */}
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-lumen-gold to-lumen-gold-light rounded-2xl flex items-center justify-center shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <span className="text-2xl font-bold text-lumen-blue font-montserrat">L</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <h1 className="text-3xl font-bold font-montserrat bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Painel do Prefeito
                </h1>
                <div className="flex items-center space-x-3">
                  <p className="text-blue-100 text-sm font-roboto">Plataforma LUMEN</p>
                  <Badge variant="outline" className="text-xs bg-lumen-gold text-lumen-blue border-lumen-gold">
                    v2024.1
                  </Badge>
                </div>
                <p className="text-blue-200 text-xs font-roboto italic">Inteligência estratégica da gestão municipal</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* Menu do Usuário */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-14 w-14 rounded-full bg-white/10 hover:bg-white/20 border-2 border-lumen-gold/50 transition-all duration-300">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg" alt="Prefeito" />
                    <AvatarFallback className="bg-lumen-gold text-lumen-blue font-bold font-montserrat text-lg">
                      PM
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 mt-2" align="end">
                <div className="px-4 py-3 border-b bg-gradient-to-r from-lumen-blue to-lumen-blue-light text-white rounded-t-md">
                  <p className="text-sm font-semibold font-montserrat">Prefeito Municipal</p>
                  <p className="text-xs text-blue-100 font-roboto">João Silva Santos</p>
                  <p className="text-xs text-blue-200 font-roboto">Mandato: 2021-2024</p>
                </div>
                <DropdownMenuItem className="font-roboto">👤 Meu Perfil</DropdownMenuItem>
                <DropdownMenuItem className="font-roboto">⚙️ Configurações</DropdownMenuItem>
                <DropdownMenuItem className="font-roboto">📊 Relatórios Executivos</DropdownMenuItem>
                <DropdownMenuItem className="font-roboto">🔒 Central de Segurança</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600 font-roboto">🚪 Sair do Sistema</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
