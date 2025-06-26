import React from 'react';
import { Shield, Sword, FileText, Book, User, Home, HelpCircle, ChevronRight } from 'lucide-react';
import type { Page } from '@inertiajs/core';
import { Link } from '@inertiajs/react';

interface WelcomeProps extends Page {
    canLogin: boolean;
    laravelVersion: string;
    phpVersion: string;
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a href={href} className="flex gap-2 items-center transition-colors duration-200 text-slate-300 hover:text-yellow-400">
            {children}
        </a>
    );
}

function DocumentCard({ title, icon: Icon }: { title: string; icon: React.ElementType }) {
    return (
        <div className="relative group">
            <div className="absolute inset-0 rounded-lg blur-xl transition-all duration-500 bg-yellow-500/20 group-hover:bg-yellow-500/30"></div>
            <div className="flex relative flex-col items-center p-8 rounded-lg border backdrop-blur-sm transition-all duration-300 bg-slate-800/50 border-slate-700 group-hover:border-yellow-500/50">
                <div className="text-yellow-500 transition-colors duration-200 group-hover:text-yellow-400 animate-pulse-slow">
                    <Icon size={40} />
                </div>
                <h3 className="mt-4 font-serif text-slate-200">{title}</h3>
                <div className="absolute -bottom-1 left-1/2 w-1/2 h-px bg-gradient-to-r from-transparent to-transparent -translate-x-1/2 via-yellow-500/50"></div>
            </div>
        </div>
    );
}

function Welcome({ canLogin, laravelVersion, phpVersion }: WelcomeProps) {
    return (
        <div className="min-h-screen font-sans bg-slate-900 text-slate-200">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 border-b backdrop-blur-sm bg-slate-900/80 border-slate-800">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex gap-2 items-center text-yellow-500">
                            <Shield className="animate-pulse" size={24} />
                            <span className="font-serif text-lg font-bold">LUMEN</span>
                        </div>
                        <div className="hidden gap-8 items-center md:flex">
                            {canLogin && (
                                <NavLink href="/login">
                                    <User size={18} /> Login
                                </NavLink>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="overflow-hidden relative px-4 py-32 sm:px-6 lg:px-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-yellow-500/10 via-slate-900/50 to-slate-900"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>

                <div className="relative mx-auto max-w-4xl text-center">
                    <div className="flex justify-center mb-12">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full blur-2xl bg-yellow-500/20 animate-pulse-slow"></div>
                            <Shield className="relative w-24 h-24 text-yellow-500 animate-pulse" />
                            <Sword className="absolute top-1/2 left-1/2 w-16 h-16 text-yellow-400 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <h1 className="mb-6 font-serif text-5xl font-bold tracking-tight sm:text-6xl text-slate-100">
                        LUMEN
                    </h1>

                    <p className="mb-8 font-serif text-2xl sm:text-3xl text-slate-300">
                        Document Generator for the Future of Public Administration
                    </p>

                    <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-slate-400">
                        Craft documents aligned with Brazil's Law 14.133/2021, with guaranteed compliance and visual excellence.
                    </p>

                    <div className="mb-12 font-serif text-lg text-yellow-500">
                        Where experience in public administration meets the intelligence of the future
                    </div>

                    <button className="flex relative gap-2 items-center px-8 py-4 mx-auto font-semibold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-lg shadow-lg transition-all duration-300 group text-slate-900 hover:shadow-yellow-500/25 hover:scale-105">
                        <div className="absolute inset-0 rounded-lg blur-xl transition-all duration-500 bg-yellow-400/20 group-hover:bg-yellow-400/30"></div>
                        <span className="relative">Start Document Creation</span>
                        <ChevronRight className="relative transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </section>

            {/* Documents Section */}
            <section className="overflow-hidden relative px-4 py-24 sm:px-6 lg:px-8">
                <div className="absolute inset-0 bg-slate-800/50"></div>
                <div className="relative mx-auto max-w-7xl">
                    <h2 className="mb-16 font-serif text-3xl font-bold text-center text-slate-100">
                        Essential Documents
                    </h2>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5">
                        <DocumentCard title="DFD" icon={FileText} />
                        <DocumentCard title="ETP" icon={FileText} />
                        <DocumentCard title="Termo de Referência" icon={Book} />
                        <DocumentCard title="Matriz de Riscos" icon={Shield} />
                        <DocumentCard title="Edital" icon={FileText} />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t bg-slate-900 border-slate-800">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-6 justify-between items-center md:flex-row">
                        <div className="flex gap-2 items-center text-yellow-500">
                            <Shield size={20} />
                            <span className="font-serif font-bold">LUMEN</span>
                        </div>

                        <div className="font-serif text-center text-slate-400 md:text-left">
                            Built under the guidance of Law 14.133/2021 — Plataforma LUMEN
                        </div>

                        <div className="flex gap-6 text-slate-400">
                            <a href="#" className="transition-colors hover:text-yellow-500">Terms</a>
                            <a href="#" className="transition-colors hover:text-yellow-500">Support</a>
                        </div>
                    </div>
                </div>
            </footer>

            <div className="mt-4 text-sm text-center text-slate-400">
                Laravel v{laravelVersion} (PHP v{phpVersion})
            </div>
        </div>
    );
}

export default Welcome;