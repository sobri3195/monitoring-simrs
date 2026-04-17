# RBAC Multiakses Level — Blueprint Implementasi

## Asumsi
1. Nama aplikasi menggunakan konteks repo ini: **Sistem Laporan Inti Faskes Puskesau TNI AU**.
2. Backend target: **Node.js (Express) + PostgreSQL + JWT**.
3. Frontend target: **React (Vite)**.
4. Modul utama yang diamankan:
   - Manajemen User
   - Master Faskes
   - Laporan Inti
   - Review Kotama
   - Validasi Puskesau
   - Audit Log

## Ringkasan Arsitektur (Singkat)
- **Authentication** memverifikasi identitas user (JWT access token + refresh token).
- **Authorization** berbasis **permission** (bukan sekadar role), dengan model tabel `roles`, `permissions`, `role_permissions`, dan (opsional) `user_permissions`.
- **Frontend guard** membatasi route dan aksi UI berdasarkan permission claims user.
- **Backend middleware** menolak akses jika permission tidak terpenuhi (deny by default).
- **Audit trail** mencatat siapa melakukan apa, kapan, di endpoint mana, IP, user-agent, status sukses/gagal.

## Matriks Akses per Role
Legenda: ✅=diizinkan, ❌=ditolak.

| Modul / Aksi | Super Admin | Admin | Operator | Verifikator | Viewer |
|---|---:|---:|---:|---:|---:|
| **Manajemen User - Create** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Manajemen User - Read** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Manajemen User - Update** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Manajemen User - Delete** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Manajemen User - Approve/Reject/Export** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Master Faskes - Create/Read/Update/Delete** | ✅ | ✅ | Read | ❌ | Read |
| **Master Faskes - Export** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Laporan Inti - Create** | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Laporan Inti - Read** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Laporan Inti - Update** | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Laporan Inti - Delete** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Laporan Inti - Approve/Reject** | ✅ | ❌ | ❌ | ✅ | ❌ |
| **Laporan Inti - Export** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Review Kotama - CRUD** | ✅ | ✅ | ❌ | ✅ | Read |
| **Review Kotama - Approve/Reject/Export** | ✅ | ✅ | ❌ | ✅ | Export |
| **Validasi Puskesau - Read** | ✅ | ✅ | ❌ | ✅ | ✅ |
| **Validasi Puskesau - Approve/Reject/Export** | ✅ | ❌ | ❌ | ✅ | Export |
| **Audit Log - Read/Export** | ✅ | ✅ | ❌ | Read | ❌ |

## Skema Database (DDL Tekstual)
```sql
CREATE TABLE roles (
  id BIGSERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  is_system BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE permissions (
  id BIGSERIAL PRIMARY KEY,
  code VARCHAR(100) UNIQUE NOT NULL, -- contoh: laporan_inti.approve
  module VARCHAR(100) NOT NULL,
  action VARCHAR(30) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  password_hash TEXT NOT NULL,
  role_id BIGINT NOT NULL REFERENCES roles(id),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE role_permissions (
  role_id BIGINT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id BIGINT NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE audit_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  user_email VARCHAR(255),
  action VARCHAR(100) NOT NULL,
  module VARCHAR(100) NOT NULL,
  resource_type VARCHAR(100),
  resource_id VARCHAR(100),
  request_method VARCHAR(10),
  request_path TEXT,
  status_code INT,
  is_success BOOLEAN NOT NULL,
  reason TEXT,
  ip_address INET,
  user_agent TEXT,
  request_id VARCHAR(100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_users_role_id ON users(role_id);
CREATE INDEX idx_permissions_module_action ON permissions(module, action);
CREATE INDEX idx_audit_logs_user_time ON audit_logs(user_id, created_at DESC);
CREATE INDEX idx_audit_logs_path_time ON audit_logs(request_path, created_at DESC);
```

## Seed Data Role & Permission (Contoh)
```sql
INSERT INTO roles(code, name) VALUES
('super_admin', 'Super Admin'),
('admin', 'Admin'),
('operator', 'Operator'),
('verifikator', 'Verifikator'),
('viewer', 'Viewer');

INSERT INTO permissions(code, module, action) VALUES
('laporan_inti.create','laporan_inti','create'),
('laporan_inti.read','laporan_inti','read'),
('laporan_inti.update','laporan_inti','update'),
('laporan_inti.delete','laporan_inti','delete'),
('laporan_inti.approve','laporan_inti','approve'),
('laporan_inti.reject','laporan_inti','reject'),
('laporan_inti.export','laporan_inti','export');

-- contoh mapping: verifikator hanya read + approve + reject + export
INSERT INTO role_permissions(role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.code IN (
  'laporan_inti.read',
  'laporan_inti.approve',
  'laporan_inti.reject',
  'laporan_inti.export'
)
WHERE r.code = 'verifikator';
```

## Contoh Implementasi Kode

### Backend (Express) — Permission Middleware
```js
// middleware/requirePermission.js
export const requirePermission = (...requiredPermissions) => {
  return (req, res, next) => {
    const user = req.user;
    const userPerms = new Set(user?.permissions ?? []);

    const isAllowed = requiredPermissions.every((perm) => userPerms.has(perm));

    if (!isAllowed) {
      req.auditContext = {
        isSuccess: false,
        reason: `Missing permission: ${requiredPermissions.join(', ')}`,
      };
      return res.status(403).json({ message: 'Forbidden' });
    }

    return next();
  };
};
```

### Backend — Proteksi Endpoint Berbasis Permission
```js
import { Router } from 'express';
import { requireAuth } from '../middleware/requireAuth.js';
import { requirePermission } from '../middleware/requirePermission.js';

const router = Router();

router.post(
  '/reports',
  requireAuth,
  requirePermission('laporan_inti.create'),
  createReportHandler,
);

router.post(
  '/reports/:id/approve',
  requireAuth,
  requirePermission('laporan_inti.approve'),
  approveReportHandler,
);

router.get(
  '/audit-logs',
  requireAuth,
  requirePermission('audit_log.read'),
  listAuditLogHandler,
);

export default router;
```

### Frontend (React) — Route Guard Berbasis Permission
```jsx
import PermissionGuard from '../components/PermissionGuard';

<Route
  path="/reports/:id/approve"
  element={(
    <PermissionGuard
      user={currentUser}
      require={['laporan_inti.approve']}
      fallbackPath="/dashboard"
    >
      <ReportApprovalPage />
    </PermissionGuard>
  )}
/>
```

### Frontend — Proteksi Tombol Aksi
```jsx
import { hasPermission } from '../utils/rbac';

const canApprove = hasPermission(currentUser, 'laporan_inti.approve');

<button disabled={!canApprove} onClick={approveReport}>
  Approve
</button>
```

## Strategi Audit Trail
1. Gunakan `request_id` per request (traceable lintas service).
2. Log minimum: `user_id`, `action`, `module`, `resource`, `status_code`, `ip`, `user_agent`, `created_at`.
3. Catat **attempt denied** (`403`) beserta alasan permission yang gagal.
4. Pisahkan log aplikasi dan audit keamanan, serta siapkan retensi (mis. 180 hari + arsip).
5. Lindungi audit log dari modifikasi oleh role non-privileged.

## Checklist Keamanan
- [x] **Least privilege**: role hanya diberi permission minimum.
- [x] **Deny by default**: endpoint tanpa permission mapping otomatis ditolak.
- [x] JWT short-lived access token (mis. 15 menit) + refresh token rotasi.
- [x] Session invalidation saat logout / reset password / role berubah.
- [x] Password hash kuat (Argon2id/bcrypt cost tinggi).
- [x] Rate limiting + lockout untuk brute-force.
- [x] CSRF protection bila pakai cookie auth.
- [x] Logging akses ditolak (`403`) dan alerting jika pola anomali.

## Checklist Testing
### Unit Test
- [x] Fungsi `hasPermission`, `hasAnyPermission`, `hasAllPermissions`.
- [x] Middleware `requirePermission` untuk skenario allow/deny.
- [x] Validasi parser permission claims dari JWT.

### Integration Test
- [x] Endpoint `POST /reports` gagal untuk Viewer, sukses untuk Operator.
- [x] Endpoint `POST /reports/:id/approve` hanya sukses untuk Verifikator/Super Admin.
- [x] Endpoint audit logs hanya role berizin.
- [x] Penolakan permission menghasilkan catatan di `audit_logs`.

### UAT per Role
- [x] **Super Admin**: seluruh modul + aksi approve/reject/export.
- [x] **Admin**: pengelolaan operasional, tanpa validasi final tertentu.
- [x] **Operator**: input & edit laporan milik unitnya sendiri.
- [x] **Verifikator**: review/approve/reject sesuai alur.
- [x] **Viewer**: read-only + export yang diizinkan.

## Trade-off Keputusan Desain
1. **RBAC + permission granular** lebih fleksibel daripada hardcoded role-check, namun butuh tabel mapping dan seed lebih kompleks.
2. Menaruh claim permission di JWT mempercepat authorization, tetapi perlu strategi invalidasi token saat role berubah.
3. Audit detail meningkatkan forensik/security posture, tetapi menambah beban storage dan perlu kebijakan retensi.
