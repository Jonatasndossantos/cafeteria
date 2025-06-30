import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Header } from '@/Components/Header';
import { Sidebar } from '@/Components/Sidebar';

export default function AuthenticatedLayout({ children }) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const user = usePage().props.auth.user;
    //const isAdmin = user?.role === 'admin';
    const isAdmin = true;

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="flex pt-24 min-h-screen">
                <div className="w-56 shrink-0">
                    <Sidebar
                        isCollapsed={isSidebarCollapsed}
                        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        isAdmin={isAdmin}
                    />
                </div>
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
