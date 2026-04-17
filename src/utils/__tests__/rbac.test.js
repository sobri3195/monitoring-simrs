import { describe, expect, it } from 'vitest';
import { MODULES, ROLES } from '../../constants/rbac';
import {
  canAccessRoute,
  getUserPermissions,
  hasAllPermissions,
  hasAnyPermission,
  hasPermission,
} from '../rbac';

describe('rbac utilities', () => {
  it('loads permission set from role map', () => {
    const user = { role: ROLES.VIEWER };

    expect(hasPermission(user, `${MODULES.LAPORAN_INTI}.read`)).toBe(true);
    expect(hasPermission(user, `${MODULES.LAPORAN_INTI}.update`)).toBe(false);
  });

  it('merges direct user permissions with role permissions', () => {
    const user = {
      role: ROLES.OPERATOR,
      permissions: [`${MODULES.AUDIT_LOG}.read`],
    };

    const permissions = getUserPermissions(user);

    expect(permissions).toContain(`${MODULES.LAPORAN_INTI}.create`);
    expect(permissions).toContain(`${MODULES.AUDIT_LOG}.read`);
  });

  it('supports any/all checks and route checks', () => {
    const user = { role: ROLES.VERIFIKATOR };

    expect(hasAnyPermission(user, [`${MODULES.LAPORAN_INTI}.delete`, `${MODULES.LAPORAN_INTI}.approve`])).toBe(true);
    expect(hasAllPermissions(user, [`${MODULES.LAPORAN_INTI}.approve`, `${MODULES.LAPORAN_INTI}.reject`])).toBe(true);
    expect(canAccessRoute(user, [`${MODULES.LAPORAN_INTI}.approve`])).toBe(true);
    expect(canAccessRoute(user, [`${MODULES.USER_MANAGEMENT}.delete`])).toBe(false);
  });
});
