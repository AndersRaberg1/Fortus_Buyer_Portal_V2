'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, FileText, Calculator, BarChart3 } from 'lucide-react';

const navItems = [
  { name: 'Hem', href: '/dashboard', icon: Home },
  { name: 'Fakturor', href: '/invoices', icon: FileText },
  { name: 'FortusFlex', href: '/fortusflex', icon: Calculator },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:fixed md:inset-y-0 md:left-0 md:top-16 md:w-64 lg:w-72 md:bg-white dark:md:bg-gray-800 md:shadow-2xl md:flex md:flex-col">
        <div className="p-8">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-4 px-6 py-4 rounded-xl text-lg font-medium transition-all ${
                    pathname === item.href
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="w-7 h-7" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile bottom bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-2xl md:hidden">
        <ul className="flex justify-around py-3">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                  pathname === item.href ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <item.icon className="w-8 h-8" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}