import React from 'react';
import { Head } from '@inertiajs/react';

interface PageLayoutProps {
    title: string;
    children: React.ReactNode;
    actions?: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ title, children, actions }) => {
    return (
        <>
            <Head title={title} />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    {actions && (
                        <div className="sm:flex sm:items-center mb-8">
                            <div className="sm:flex-auto">
                                <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
                            </div>
                            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                {actions}
                            </div>
                        </div>
                    )}
                    {children}
                </div>
            </div>
        </>
    );
}; 