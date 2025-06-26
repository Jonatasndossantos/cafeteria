import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    ClipboardList,
    FileText,
    Users,
    Settings,
    LogOut,
    UserCog,
    Building
} from 'lucide-react';

export const Sidebar = () => {
    const { auth } = usePage().props as any;

    return (
        <aside
            className="h-screen w-56 bg-gradient-to-b from-[#CDA77A] to-[#CDA77A] shadow-lg flex flex-col text-white"
        >
            <nav className="flex flex-col gap-y-2 mt-6 px-2 overflow-y-auto">
                <SidebarLink href="/painel-pedidos" icon={<ClipboardList />} label="Painel de Pedidos" />
                <SidebarLink href="/documentos" icon={<UserCog />} label="Ambiente do Funcionário" />
                <SidebarLink href="/gestao-usuarios" icon={<Users />} label="Gestão de Usuários" />
                <SidebarLink href="/gestao-usuarios" icon={<Building />} label="Gestão de Funcionários" />
                <SidebarLink href="/setores" icon={<Settings />} label="Gestão de Setores" />
                
            </nav>
        </aside>
    );
};

interface SidebarLinkProps {
    href: string;
    icon: React.ReactNode;
    label: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, icon, label }) => (
    <Link
        href={href}
        className="
            flex items-center px-4 py-2 rounded-lg
            transition-colors
            hover:bg-[#4E1F14]/20 hover:text-[#4E1F14] focus:outline-none focus:ring-2 focus:ring-[#4E1F14]
            group
        "
        tabIndex={0}
        aria-label={label}
    >
        <span className="text-white group-hover:text-[#4E1F14]">{icon}</span>
        <span className="ml-3 font-medium">{label}</span>
    </Link>
);

export default Sidebar;
