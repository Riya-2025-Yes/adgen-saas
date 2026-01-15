'use client';

import { usePermissions } from '@/hooks/usePermissions';
import { Permission } from '@/lib/permissions';
import { ReactNode } from 'react';

interface CanProps {
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
}

export function Can({ permission, children, fallback = null }: CanProps) {
  const { can } = usePermissions();
  
  return can(permission) ? <>{children}</> : <>{fallback}</>;
}
