export const ROLES = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  OPERATOR: 'Operator',
  VERIFIKATOR: 'Verifikator',
  VIEWER: 'Viewer',
};

export const MODULES = {
  USER_MANAGEMENT: 'user_management',
  MASTER_FASKES: 'master_faskes',
  LAPORAN_INTI: 'laporan_inti',
  REVIEW_KOTAMA: 'review_kotama',
  VALIDASI_PUSKESAU: 'validasi_puskesau',
  AUDIT_LOG: 'audit_log',
};

const crudPermissions = (moduleName) => [
  `${moduleName}.create`,
  `${moduleName}.read`,
  `${moduleName}.update`,
  `${moduleName}.delete`,
];

const workflowPermissions = (moduleName) => [
  `${moduleName}.approve`,
  `${moduleName}.reject`,
  `${moduleName}.export`,
];

export const PERMISSIONS = {
  ...Object.fromEntries(Object.values(MODULES).flatMap((moduleName) => [
    [moduleName.toUpperCase(), {
      CREATE: `${moduleName}.create`,
      READ: `${moduleName}.read`,
      UPDATE: `${moduleName}.update`,
      DELETE: `${moduleName}.delete`,
      APPROVE: `${moduleName}.approve`,
      REJECT: `${moduleName}.reject`,
      EXPORT: `${moduleName}.export`,
    }],
  ])),
};

export const ROLE_PERMISSION_MAP = {
  [ROLES.SUPER_ADMIN]: [
    ...crudPermissions(MODULES.USER_MANAGEMENT),
    ...workflowPermissions(MODULES.USER_MANAGEMENT),
    ...crudPermissions(MODULES.MASTER_FASKES),
    ...workflowPermissions(MODULES.MASTER_FASKES),
    ...crudPermissions(MODULES.LAPORAN_INTI),
    ...workflowPermissions(MODULES.LAPORAN_INTI),
    ...crudPermissions(MODULES.REVIEW_KOTAMA),
    ...workflowPermissions(MODULES.REVIEW_KOTAMA),
    ...crudPermissions(MODULES.VALIDASI_PUSKESAU),
    ...workflowPermissions(MODULES.VALIDASI_PUSKESAU),
    ...crudPermissions(MODULES.AUDIT_LOG),
    ...workflowPermissions(MODULES.AUDIT_LOG),
  ],
  [ROLES.ADMIN]: [
    ...crudPermissions(MODULES.USER_MANAGEMENT),
    MODULES.USER_MANAGEMENT + '.approve',
    MODULES.USER_MANAGEMENT + '.reject',
    MODULES.USER_MANAGEMENT + '.export',
    ...crudPermissions(MODULES.MASTER_FASKES),
    MODULES.MASTER_FASKES + '.export',
    ...crudPermissions(MODULES.LAPORAN_INTI),
    MODULES.LAPORAN_INTI + '.export',
    ...crudPermissions(MODULES.REVIEW_KOTAMA),
    ...workflowPermissions(MODULES.REVIEW_KOTAMA),
    MODULES.VALIDASI_PUSKESAU + '.read',
    MODULES.VALIDASI_PUSKESAU + '.export',
    MODULES.AUDIT_LOG + '.read',
    MODULES.AUDIT_LOG + '.export',
  ],
  [ROLES.OPERATOR]: [
    MODULES.LAPORAN_INTI + '.create',
    MODULES.LAPORAN_INTI + '.read',
    MODULES.LAPORAN_INTI + '.update',
    MODULES.LAPORAN_INTI + '.export',
    MODULES.MASTER_FASKES + '.read',
  ],
  [ROLES.VERIFIKATOR]: [
    MODULES.LAPORAN_INTI + '.read',
    MODULES.LAPORAN_INTI + '.approve',
    MODULES.LAPORAN_INTI + '.reject',
    MODULES.LAPORAN_INTI + '.export',
    ...crudPermissions(MODULES.REVIEW_KOTAMA),
    ...workflowPermissions(MODULES.REVIEW_KOTAMA),
    MODULES.VALIDASI_PUSKESAU + '.read',
    MODULES.VALIDASI_PUSKESAU + '.approve',
    MODULES.VALIDASI_PUSKESAU + '.reject',
    MODULES.VALIDASI_PUSKESAU + '.export',
    MODULES.AUDIT_LOG + '.read',
  ],
  [ROLES.VIEWER]: [
    MODULES.LAPORAN_INTI + '.read',
    MODULES.LAPORAN_INTI + '.export',
    MODULES.REVIEW_KOTAMA + '.read',
    MODULES.REVIEW_KOTAMA + '.export',
    MODULES.VALIDASI_PUSKESAU + '.read',
    MODULES.VALIDASI_PUSKESAU + '.export',
    MODULES.MASTER_FASKES + '.read',
  ],
};
