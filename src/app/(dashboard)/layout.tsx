'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

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
    { name: 'Dashboard', href: '/dashboard', roles: ['SystemAdmin', 'TenantAdmin', 'Marketer', 'Viewer'] },
    { name: 'Tenants', href: '/system/tenants', roles: ['SystemAdmin'] },
    { name: 'Users', href: '/admin/users', roles: ['SystemAdmin', 'TenantAdmin'] },
    { name: 'Campaigns', href: '/campaigns', roles: ['SystemAdmin', 'TenantAdmin', 'Marketer'] },
    { name: 'Templates', href: '/admin/templates', roles: ['SystemAdmin', 'TenantAdmin'] },
    { name: 'Brand Kits', href: '/admin/brand-kit', roles: ['SystemAdmin', 'TenantAdmin'] },
  ];

  const userRole = session.user?.role || 'Viewer';
  const filteredNav = navItems.filter(item => item.roles.includes(userRole));

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
                {userRole}
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
            {filteredNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
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
