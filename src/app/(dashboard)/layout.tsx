'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import { usePermissions } from '@/hooks/usePermissions';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { canAccess, isSystemAdmin, isTenantAdmin, isMarketer } = usePermissions();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', show: true },
    { name: 'Tenants', href: '/system/tenants', show: isSystemAdmin },
    { name: 'White-Label', href: '/system/white-label', show: isSystemAdmin },
    { name: 'Users', href: '/admin/users', show: isSystemAdmin || isTenantAdmin },
    { name: 'Campaigns', href: '/campaigns', show: true },
    { name: 'Templates', href: '/admin/templates', show: isSystemAdmin || isTenantAdmin },
    { name: 'Brand Kit', href: '/admin/brand-kit', show: isSystemAdmin || isTenantAdmin },
    { name: 'Providers', href: '/admin/providers', show: isSystemAdmin || isTenantAdmin },
    { name: 'Assets', href: '/assets', show: isSystemAdmin || isTenantAdmin || isMarketer },
  ];

  const visibleNav = navItems.filter(item => item.show);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                  AG
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">AdGen SaaS</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">{session.user?.name}</span>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                {session.user?.role}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-1">
            {visibleNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
