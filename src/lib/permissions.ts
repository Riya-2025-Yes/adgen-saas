export type Permission = 
  | 'manage:tenants'        // SystemAdmin only
  | 'manage:users'          // SystemAdmin, TenantAdmin
  | 'manage:settings'       // SystemAdmin, TenantAdmin
  | 'manage:campaigns'      // SystemAdmin, TenantAdmin, Marketer
  | 'view:campaigns'        // All roles
  | 'manage:templates'      // SystemAdmin, TenantAdmin
  | 'manage:brand-kit'      // SystemAdmin, TenantAdmin
  | 'manage:providers'      // SystemAdmin, TenantAdmin
  | 'view:analytics'        // SystemAdmin, TenantAdmin, Marketer
  | 'manage:white-label';   // SystemAdmin only

export const rolePermissions: Record<string, Permission[]> = {
  SystemAdmin: [
    'manage:tenants',
    'manage:users',
    'manage:settings',
    'manage:campaigns',
    'view:campaigns',
    'manage:templates',
    'manage:brand-kit',
    'manage:providers',
    'view:analytics',
    'manage:white-label',
  ],
  TenantAdmin: [
    'manage:users',
    'manage:settings',
    'manage:campaigns',
    'view:campaigns',
    'manage:templates',
    'manage:brand-kit',
    'manage:providers',
    'view:analytics',
  ],
  Marketer: [
    'manage:campaigns',
    'view:campaigns',
    'view:analytics',
  ],
  Viewer: [
    'view:campaigns',
  ],
};

export function hasPermission(role: string, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) || false;
}

export function canAccessRoute(role: string, path: string): boolean {
  // SystemAdmin routes
  if (path.startsWith('/system/')) {
    return role === 'SystemAdmin';
  }
  
  // Admin routes (SystemAdmin + TenantAdmin)
  if (path.startsWith('/admin/')) {
    return role === 'SystemAdmin' || role === 'TenantAdmin';
  }
  
  // Campaign routes (all except Viewer)
  if (path.startsWith('/campaigns/') && path !== '/campaigns') {
    return role !== 'Viewer';
  }
  
  return true; // Allow dashboard and view-only pages
}
