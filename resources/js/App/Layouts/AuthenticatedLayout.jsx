import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Header } from '@/Components/Header';
import { Footer } from '@/Components/Footer';
import { Sidebar } from '@/Components/Sidebar';

export default function AuthenticatedLayout({ children}) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const user = usePage().props.auth.user;
    //const isAdmin = user?.role === 'admin';
    const isAdmin = true;

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header />
            <div className="flex flex-1">
                <Sidebar 
                    isCollapsed={isSidebarCollapsed} 
                    onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    isAdmin={isAdmin}
                />
                <main className="flex-grow">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
}
