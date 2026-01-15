'use client';

import { useSession } from 'next-auth/react';
import { hasPermission, Permission, canAccessRoute } from '@/lib/permissions';

export function usePermissions() {
  const { data: session } = useSession();
  const role = session?.user?.role || 'Viewer';

  return {
    can: (permission: Permission) => hasPermission(role, permission),
    canAccess: (path: string) => canAccessRoute(role, path),
    role,
    isSystemAdmin: role === 'SystemAdmin',
    isTenantAdmin: role === 'TenantAdmin',
    isMarketer: role === 'Marketer',
    isViewer: role === 'Viewer',
  };
}
