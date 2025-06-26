import React, { useState } from 'react';
import { Bell, LogOut } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import logoEspresso from "@/Components/brasaopref/espresso-damore.png"

interface Usuario {
  nome: string;
  setor: {
    nome: string;
  };
  cargo: string;
  perfilAcesso: string;
}

interface Notificacao {
  id: number;
  titulo: string;
  urgencia: string;
}

function useUsuario() {
    return (usePage().props.auth.user) as any;
  }


export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const usuario = useUsuario();
  const notificacoes = [];

  const obterIniciais = (nome: string) => {
    if (!nome) return 'U';
    return nome
      .split(' ')
      .map(parte => parte[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const handleUserClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Implementar lógica de logout aqui
    console.log('Logout clicked');
  };
  console.log(usuario);

  return (
    <header className="bg-gradient-to-r from-[#CDA77A] to-[#4E1F14] text-white">
      <div className="px-20 mx-auto">
        <div className="flex justify-between items-center py-4">
          <div className="flex gap-x-6 items-center">
            <Link href="/dashboard" className="shrink-0">
              <img
                src={logoEspresso}
                alt="Logo Espresso D'Amore"
                className="block object-cover w-20 h-20 rounded-full"
                aria-label="Logo Espresso D'Amore"
              />
            </Link>
          </div>

          <div className="flex gap-x-4 items-center">
            <button
              className="relative p-2 rounded-full hover:bg-[#4E1F14] transition-colors"
              aria-label="Notificações"
              tabIndex={0}
            >
              <Bell className="w-6 h-6" />
              {notificacoes.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#CDA77A] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {notificacoes.length > 9 ? '9+' : notificacoes.length}
                </span>
              )}
            </button>

            <Dropdown>
              <Dropdown.Trigger>
                <button className="flex items-center gap-x-2 text-right hover:bg-[#4E1F14] p-2 rounded transition-colors cursor-pointer">
                  <div>
                    <div className="font-medium hover:text-[#CDA77A] transition-colors">{usuario?.nome}</div>
                    <div className="text-xs opacity-80">{usuario?.setor?.nome} | {usuario?.cargo}</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#CDA77A] text-white font-bold flex items-center justify-center">
                    {obterIniciais(usuario?.nome)}
                  </div>
                </button>
              </Dropdown.Trigger>
              <Dropdown.Content align="right" width="48">
                <Dropdown.Link href={route('perfil')}>Perfil</Dropdown.Link>
                <Dropdown.Link href={route('ambienteServidor')}>Ambiente de Servidor</Dropdown.Link>
                {usuario?.perfilAcesso === 'admin' && (
                  <>
                    <Dropdown.Link href={route('gestao-usuarios.index')}>Gestão de Usuários</Dropdown.Link>
                    <Dropdown.Link href={route('setores.index')}>Gestão de Setores</Dropdown.Link>
                  </>
                )}

                  <Dropdown.Link
                    href={route('logout')}
                    method="post"
                    as="button"
                  >
                    <span className="flex items-center">
                      <LogOut className="mr-2 w-4 h-4" />
                      Sair
                    </span>
                  </Dropdown.Link>
                </Dropdown.Content>
              </Dropdown>
            </div>
        </div>
      </div>
    </header>
  );
};
