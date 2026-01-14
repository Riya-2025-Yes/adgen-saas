'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    redirect('/login');
  }

  const userRole = session.user?.role || '';

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', roles: ['SystemAdmin', 'TenantAdmin', 'Marketer', 'Viewer'] },
    { name: 'Tenants', href: '/system/tenants', roles: ['SystemAdmin'] },
    { name: 'Users', href: '/admin/users', roles: ['SystemAdmin', 'TenantAdmin'] },
    { name: 'Campaigns', href: '/campaigns', roles: ['SystemAdmin', 'TenantAdmin', 'Marketer'] },
    { name: 'Templates', href: '/admin/templates', roles: ['SystemAdmin', 'TenantAdmin'] },
    { name: 'Brand Kits', href: '/admin/brand-kit', roles: ['SystemAdmin', 'TenantAdmin'] },
  ];

  const userNav = navigation.filter(item => item.roles.includes(userRole));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                AG
              </div>
              <span className="ml-3 text-xl font-semibold text-gray-900">AdGen SaaS</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">{session.user?.name}</span>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{userRole}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="text-sm text-gray-700 hover:text-gray-900"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-1">
            {userNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
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
