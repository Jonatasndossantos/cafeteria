import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StandardCardProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export function StandardCard({ title, icon: Icon, children, className = '' }: StandardCardProps) {
  return (
    <div className={`bg-white shadow-lg border-2 border-[#0A3D62]/20 ${className}`}>
      <div className="bg-gradient-to-r from-[#0A3D62]/10 to-transparent border-b border-[#0A3D62]/20 p-4">
        <h2 className="font-montserrat font-semibold text-xl text-[#0A3D62] flex items-center">
          {Icon && <Icon className="w-6 h-6 mr-3 text-[#CB991A]" />}
          {title}
        </h2>
      </div>
      <div className="space-y-6 p-6">
        {children}
      </div>
    </div>
  );
} 