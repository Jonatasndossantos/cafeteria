import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import VersiculoBiblico from '@/components/common/VersiculoBiblico';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#023E7D] via-[#0A3D62] to-[#001F3F] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo Section */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-block">
                        <ApplicationLogo className="h-48 w-48 fill-current text-white mx-auto animate-glow transition-transform duration-500" />
                    </Link>
                    <h1 className="mt-3 text-xl font-bold text-white font-inter">
                       PLATAFORMA LUMEN
                    </h1>
                    <p className="text-[#FFD700] text-lg font-medium mt-2 font-inter font-bold">
                        Plataforma de Gestão Pública Inteligente
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-gray-50 rounded-xl shadow-2xl p-6 border border-gray-200 shadow-black/60">
                    {children}
                </div>

                {/* Versículo Bíblico */}
                <VersiculoBiblico />

            </div>
        </div>
    );
}
