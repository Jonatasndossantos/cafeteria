import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    User,
    Shield,
    Briefcase,
    Book,
    HeartPulse,
    GraduationCap,
    Leaf,
    Users,
    Gavel,
    FileText,
    ClipboardList,
    FileCheck,
    Layers,
    FileSignature,
    FilePlus,
    FileMinus,
    Megaphone,
    Globe,
    Calendar,
    Ban
} from 'lucide-react';

export const Sidebar = () => {
    const { auth } = usePage().props as any;
    const isAdmin = auth?.user?.perfilAcesso === 'admin';

    return (
        <aside
            className="h-screen w-56 bg-gradient-to-b from-[#0A3D62] to-[#1B2A41] shadow-lg flex flex-col text-white"
        >
            {/* Topo: Nome LUMEN */}
            <div className="flex items-center px-4 py-5 border-b border-white/10">
                <span className="text-lg font-bold tracking-wide text-white">LUMEN</span>
            </div>

            {/* Navegação */}
            <nav className="flex flex-col gap-y-8 mt-6 px-2 overflow-y-auto">
                <SidebarSection title="GESTÃO PÚBLICA">
                    <SidebarLink href="/prefeito" icon={<User />} label="Prefeito" />
                    <SidebarLink href="/controle-interno" icon={<Shield />} label="Controle Interno" />
                    <SidebarLink href="/procuradoria-juridica" icon={<Gavel />} label="Procuradoria Jurídica" />
                    <SidebarLink href="/secretaria-administracao" icon={<Briefcase />} label="Secretaria de Administração" />
                    <SidebarLink href="/secretaria-saude" icon={<HeartPulse />} label="Secretaria de Saúde" />
                    <SidebarLink href="/secretaria-educacao" icon={<GraduationCap />} label="Secretaria de Educação e Cultura" />
                    <SidebarLink href="/secretaria-meio-ambiente" icon={<Leaf />} label="Secretaria de Meio Ambiente" />
                </SidebarSection>
                <SidebarSection title="PAINÉIS DE ATUAÇÃO">
                    <SidebarLink href="/agente-contratacao" icon={<Users />} label="Agente de Contratação" />
                    <SidebarLink href="/pregoeiro" icon={<User />} label="Pregoeiro" />
                    <SidebarLink href="/comissao-licitacao" icon={<Users />} label="Comissão de Licitação" />
                    <SidebarLink href="/gestao-contratos" icon={<FileText />} label="Gestão de Contratos" />
                </SidebarSection>
                <SidebarSection title="CONTRATAÇÕES">
                    <SidebarLink href="/espada1" icon={<ClipboardList />} label="Espada 1 – DFD (Demanda)" />
                    <SidebarLink href="/espada2" icon={<Book />} label="Espada 2 – ETP (Estudo Técnico Preliminar)" />
                    <SidebarLink href="/espada3" icon={<FileSignature />} label="Espada 3 – TR / Projeto Básico" />
                    <SidebarLink href="/espada4" icon={<Layers />} label="Espada 4 – Matriz de Riscos" />
                    <SidebarLink href="/espada5" icon={<FilePlus />} label="Espada 5 – Edital" />
                    <SidebarLink href="/espada6" icon={<FileCheck />} label="Espada 6 – Contrato / Aditivos / Apostilamentos" />
                    <SidebarLink href="/espada7" icon={<FileMinus />} label="Espada 7 – Recursos / Julgamento" />
                </SidebarSection>
                <SidebarSection title="TRANSPARÊNCIA">
                    <SidebarLink href="/ouvidoria" icon={<Megaphone />} label="Ouvidoria" />
                    <SidebarLink href="/portal-transparencia" icon={<Globe />} label="Portal da Transparência" />
                    <SidebarLink href="/pca" icon={<Calendar />} label="Plano Anual de Contratações (PCA)" />
                    <SidebarLink href="/sancoes-penalidades" icon={<Ban />} label="Sanções e Penalidades" />
                </SidebarSection>
            </nav>
        </aside>
    );
};

interface SidebarSectionProps {
    title: string;
    children: React.ReactNode;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, children }) => (
    <div>
        <div className="mb-2 px-2 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">{title}</div>
        <div className="flex flex-col gap-y-1">{children}</div>
    </div>
);

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
            hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]
            group
        "
        tabIndex={0}
        aria-label={label}
    >
        <span className="text-white group-hover:text-[#D4AF37]">{icon}</span>
        <span className="ml-3 font-medium">{label}</span>
    </Link>
);

export default Sidebar;
