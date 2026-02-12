'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, Calculator, BarChart3 } from 'lucide-react';

const navItems = [
  { name: 'Hem', href: '/', icon: Home },
  { name: 'Fakturor', href: '/invoices', icon: FileText },
  { name: 'FortusFlex', href: '/fortusflex', icon: Calculator },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">Fortus</span>
            </Link>
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-gray-700 hover:text-primary hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
