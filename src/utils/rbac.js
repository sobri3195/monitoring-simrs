import { ROLE_PERMISSION_MAP } from '../constants/rbac';

export const getUserPermissions = (user) => {
  if (!user?.role) return [];

  const rolePermissions = ROLE_PERMISSION_MAP[user.role] ?? [];
  const directPermissions = Array.isArray(user.permissions) ? user.permissions : [];

  return [...new Set([...rolePermissions, ...directPermissions])];
};

export const hasPermission = (user, permission) => getUserPermissions(user).includes(permission);

export const hasAnyPermission = (user, permissions = []) => permissions.some((permission) => hasPermission(user, permission));

export const hasAllPermissions = (user, permissions = []) => permissions.every((permission) => hasPermission(user, permission));

export const canAccessRoute = (user, requiredPermissions = []) => {
  if (!requiredPermissions.length) return true;
  return hasAllPermissions(user, requiredPermissions);
};
