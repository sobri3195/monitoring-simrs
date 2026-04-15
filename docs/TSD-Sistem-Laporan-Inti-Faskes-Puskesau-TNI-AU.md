# TSD — Technical Solution Design

## 3.1 Arsitektur yang Direkomendasikan

Arsitektur target untuk MVP hingga scale-up:

### Frontend
- React 18
- Vite
- TypeScript
- Tailwind CSS
- React Router DOM
- Zustand
- TanStack Query
- React Hook Form + Zod
- TanStack Table
- Recharts

### Backend
- Node.js + NestJS
- REST API
- PostgreSQL
- Prisma ORM
- JWT Auth
- Role-Based Access Control (RBAC)

### File Storage
- S3-compatible object storage / MinIO
- Alternatif MVP: Supabase Storage

### Deployment
- Web: Vercel
- API: VPS / Railway / Render / Cloud Run
- DB: PostgreSQL managed / self-hosted

## 3.2 High-Level Architecture

```text
[Browser]
   |
   v
[React Web App on Vercel]
   |
   v
[REST API - NestJS]
   |
   +---- [PostgreSQL]
   |
   +---- [Object Storage for attachments]
   |
   +---- [Email/Notification service - optional]
```

## 3.3 Modul Backend
- Auth Module
- Users Module
- Kotama Module
- Facilities Module
- Report Periods Module
- Reports Module
- Review & Validation Module
- Issues Module
- Attachments Module
- Dashboard Module
- Notifications Module
- Audit Log Module

## 3.4 Modul Frontend
- Authentication
- Dashboard
- Master Faskes
- Periode Laporan
- Input Laporan Saya
- Histori Laporan
- Review Kotama
- Validasi Puskesau
- Isu & Risiko
- Dokumen
- Reports / Rekap
- User Management
- Settings

## 3.5 RBAC Rules

### Super Admin Puskesau
- Full access
- CRUD master
- Validasi final
- Akses seluruh dashboard

### Admin Kotama
- Akses data Kotama sendiri
- Review laporan
- Approve / request revision

### Operator Faskes
- Akses data facility sendiri
- Create/update draft
- Submit report
- Lihat histori facility sendiri

### Viewer Pimpinan
- Read only
- Dashboard dan rekap

## 3.6 Status Flow

```text
DRAFT
  -> DIKIRIM
     -> DIREVIEW
        -> PERLU_REVISI -> DRAFT
        -> DISETUJUI_KOTAMA
             -> TERVALIDASI_PUSKESAU
```

## 3.7 API Design Ringkas

### Auth
- POST `/auth/login`
- GET `/auth/me`
- POST `/auth/logout`

### Users
- GET `/users`
- POST `/users`
- PATCH `/users/:id`

### Kotamas
- GET `/kotamas`
- POST `/kotamas`
- PATCH `/kotamas/:id`

### Facilities
- GET `/facilities`
- GET `/facilities/:id`
- POST `/facilities`
- PATCH `/facilities/:id`

### Report Periods
- GET `/report-periods`
- POST `/report-periods`
- PATCH `/report-periods/:id`
- POST `/report-periods/:id/open`
- POST `/report-periods/:id/close`

### Reports
- GET `/reports`
- GET `/reports/:id`
- POST `/reports`
- PATCH `/reports/:id`
- POST `/reports/:id/submit`
- POST `/reports/:id/request-revision`
- POST `/reports/:id/approve-kotama`
- POST `/reports/:id/validate-puskesau`

### Integrations & Checklists
- PUT `/reports/:id/integrations`
- PUT `/reports/:id/checklists`

### Issues
- GET `/reports/:id/issues`
- POST `/reports/:id/issues`
- PATCH `/issues/:id`
- DELETE `/issues/:id`

### Attachments
- POST `/reports/:id/attachments`
- DELETE `/attachments/:id`

### Dashboard
- GET `/dashboard/summary`
- GET `/dashboard/by-kotama`
- GET `/dashboard/risk`
- GET `/dashboard/report-compliance`

### Notifications
- GET `/notifications`
- POST `/notifications/:id/read`

## 3.8 Frontend Page Design

### Dashboard
- KPI cards
- Charts
- Overdue reports
- High-risk facilities
- Support demand summary

### Input Laporan
- Multi-step form
- Autosave
- Review summary card
- Validation errors

### Review Kotama
- Report queue
- Filters
- Detail with side-by-side comments

### Validasi Puskesau
- Approval board
- Priority tagging
- Final note

## 3.9 Validasi Bisnis
- Satu faskes hanya boleh punya satu laporan per periode
- Operator tidak boleh submit bila field wajib kosong
- Operator tidak boleh edit laporan setelah submit, kecuali dikembalikan revisi
- Admin Kotama hanya bisa review facility di Kotama-nya
- Viewer tidak boleh mengubah data
- Semua perubahan status harus masuk ke `report_status_histories`

## 3.10 Security
- Password hash dengan bcrypt/argon2
- JWT access token
- Refresh token opsional
- HTTPS only
- File upload whitelist mime type
- Max file size
- Rate limiting login
- Audit log untuk aksi sensitif

## 3.11 Logging & Observability
- Application logs
- API request logs
- Failed auth logs
- Upload error logs
- Monitoring basic: uptime, error rate, response time

## 3.12 Backup & Recovery
- Backup database harian
- Backup storage berkala
- Retention minimal 30 hari
- Export CSV untuk emergency reporting

## 3.13 Testing Strategy

### Unit Test
- Auth service
- Report status transition
- Permission guards

### Integration Test
- Create report
- Submit report
- Approve / request revision
- Validate report

### E2E
- Operator login -> draft -> submit
- Kotama review -> approve
- Puskesau validate -> dashboard updated

## 3.14 Technical Decisions

### Kenapa React + Vite
- Cepat untuk UI internal
- Ringan
- Mudah di-maintain

### Kenapa NestJS
- Struktur enterprise lebih rapi
- Cocok untuk RBAC, guards, DTO, validation

### Kenapa PostgreSQL
- Kuat untuk relational workflow
- Cocok untuk audit trail dan reporting

---

# 4) Development Stage

## Stage 0 — Discovery & Alignment
**Durasi:** 3–5 hari

**Output:**
- Finalisasi scope
- Daftar faskes
- Daftar role
- Definisi field laporan
- Alur approval final

**Deliverable:**
- PRD final
- Workflow final
- Daftar master Kotama dan fasilitas

## Stage 1 — UI Foundation & Project Setup
**Durasi:** 4–5 hari

**Output:**
- Setup monorepo
- Setup frontend Vite
- Setup backend NestJS
- Setup DB PostgreSQL
- Layout awal
- Sidebar
- Auth skeleton

**Deliverable:**
- Login page
- App layout
- Route guard
- Style system
- Env config

## Stage 2 — Master Data
**Durasi:** 4–6 hari

**Output:**
- CRUD Kotama
- CRUD fasilitas
- User management dasar
- Seed data awal RSAU/FKTP

**Deliverable:**
- Halaman Master Faskes
- API facilities
- Relasi user-facility/kotama

## Stage 3 — Reporting Period & Draft Laporan
**Durasi:** 5–7 hari

**Output:**
- Period management
- Create/edit report
- Autosave
- Checklist
- Integrations
- Issue form

**Deliverable:**
- Halaman Input Laporan Saya
- Halaman Histori Laporan
- API reports dasar

## Stage 4 — Review Kotama Workflow
**Durasi:** 4–5 hari

**Output:**
- Queue review
- Comments
- Request revision
- Approve Kotama

**Deliverable:**
- Halaman Review Kotama
- API transition status
- Status history entries

## Stage 5 — Validasi Puskesau
**Durasi:** 4–5 hari

**Output:**
- Queue validasi
- Final notes
- Validate
- Escalation tagging

**Deliverable:**
- Halaman Validasi Puskesau
- API final validation
- Dashboard data integrity

## Stage 6 — Dashboard & Rekap
**Durasi:** 5–7 hari

**Output:**
- KPI summary
- Charts
- Overdue reports
- Risk board
- Export CSV

**Deliverable:**
- Dashboard nasional
- Laporan per Kotama
- Laporan per tipe fasilitas

## Stage 7 — Attachments, Notifications, Audit Trail
**Durasi:** 4–6 hari

**Output:**
- Upload file
- Notifications
- Read/unread
- Audit trail UI

**Deliverable:**
- Dokumen per report
- Notifikasi sistem
- Histori status detail

## Stage 8 — QA, UAT, Hardening
**Durasi:** 5–7 hari

**Output:**
- Bug fixing
- Permission hardening
- Performance check
- UAT dengan data nyata terbatas

**Deliverable:**
- Release candidate
- UAT sign-off
- Deployment checklist

## Stage 9 — Deployment & Pilot
**Durasi:** 3–4 hari

**Output:**
- Deploy production/staging
- Import master data final
- Training operator terbatas
- Pilot beberapa faskes

**Deliverable:**
- Environment production
- SOP penggunaan
- Akun user awal

## Estimasi Total MVP
Sekitar **5–8 minggu**, tergantung:
- Jumlah developer
- Finalisasi requirement
- Kebutuhan upload file
- Kedalaman dashboard

## Prioritas Backlog

### Prioritas 1
- Auth
- RBAC
- Facilities
- Periods
- Reports
- Review
- Validation

### Prioritas 2
- Dashboard nasional
- Issue management
- Export CSV

### Prioritas 3
- Notifications
- Attachment storage
- Audit UI detail

### Prioritas 4
- Email reminders
- SLA tracking
- Advanced analytics

---

# 5) Project Structure Template

```text
puskesau-reporting/
├── apps/
│   ├── web/
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── providers/
│   │   │   │   ├── router/
│   │   │   │   └── store/
│   │   │   ├── assets/
│   │   │   ├── components/
│   │   │   │   ├── common/
│   │   │   │   ├── layout/
│   │   │   │   ├── forms/
│   │   │   │   ├── charts/
│   │   │   │   └── tables/
│   │   │   ├── features/
│   │   │   │   ├── auth/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── facilities/
│   │   │   │   ├── report-periods/
│   │   │   │   ├── reports/
│   │   │   │   ├── reviews/
│   │   │   │   ├── validations/
│   │   │   │   ├── issues/
│   │   │   │   ├── attachments/
│   │   │   │   ├── notifications/
│   │   │   │   └── users/
│   │   │   ├── hooks/
│   │   │   ├── lib/
│   │   │   ├── pages/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── facilities/
│   │   │   │   ├── reports/
│   │   │   │   ├── reviews/
│   │   │   │   ├── validations/
│   │   │   │   ├── settings/
│   │   │   │   └── users/
│   │   │   ├── services/
│   │   │   │   ├── api/
│   │   │   │   └── adapters/
│   │   │   ├── types/
│   │   │   ├── utils/
│   │   │   ├── constants/
│   │   │   ├── styles/
│   │   │   ├── main.tsx
│   │   │   └── vite-env.d.ts
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tailwind.config.ts
│   │   └── vite.config.ts
│   │
│   └── api/
│       ├── src/
│       │   ├── main.ts
│       │   ├── app.module.ts
│       │   ├── common/
│       │   │   ├── decorators/
│       │   │   ├── dto/
│       │   │   ├── enums/
│       │   │   ├── filters/
│       │   │   ├── guards/
│       │   │   ├── interceptors/
│       │   │   ├── pipes/
│       │   │   └── utils/
│       │   ├── config/
│       │   ├── prisma/
│       │   ├── modules/
│       │   │   ├── auth/
│       │   │   ├── users/
│       │   │   ├── kotamas/
│       │   │   ├── facilities/
│       │   │   ├── report-periods/
│       │   │   ├── reports/
│       │   │   ├── report-integrations/
│       │   │   ├── report-checklists/
│       │   │   ├── issues/
│       │   │   ├── attachments/
│       │   │   ├── reviews/
│       │   │   ├── dashboard/
│       │   │   ├── notifications/
│       │   │   └── audit-logs/
│       │   └── jobs/
│       │       ├── reminders/
│       │       └── cleanup/
│       ├── prisma/
│       │   ├── schema.prisma
│       │   ├── migrations/
│       │   └── seed.ts
│       ├── test/
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   ├── ui/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── theme/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── types/
│   │   ├── src/
│   │   │   ├── auth.ts
│   │   │   ├── facility.ts
│   │   │   ├── report.ts
│   │   │   ├── review.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── config/
│       ├── eslint/
│       ├── tsconfig/
│       └── package.json
│
├── docs/
│   ├── PRD.md
│   ├── TSD.md
│   ├── DATABASE_SCHEMA.md
│   ├── API_CONTRACT.md
│   ├── UAT_CHECKLIST.md
│   └── DEPLOYMENT.md
│
├── infra/
│   ├── docker/
│   ├── nginx/
│   ├── postgres/
│   └── scripts/
│
├── .env.example
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── README.md
└── .gitignore
```

## 5.1 Struktur Frontend yang Disarankan

`features/` dipisahkan per domain agar mudah scaling:
- auth
- dashboard
- facilities
- reports
- reviews
- validations

`services/api/` berisi wrapper API:
- `auth.api.ts`
- `facilities.api.ts`
- `reports.api.ts`
- `dashboard.api.ts`

`pages/` berisi route-level pages:
- `DashboardPage.tsx`
- `FacilityListPage.tsx`
- `MyReportPage.tsx`
- `ReviewKotamaPage.tsx`
- `ValidationPage.tsx`

## 5.2 Struktur Backend yang Disarankan

Setiap module NestJS minimal memiliki:
- controller
- service
- dto
- entity mapper (jika perlu)
- policy/permission guard (bila kompleks)

Contoh `modules/reports/`:

```text
modules/reports/
├── dto/
│   ├── create-report.dto.ts
│   ├── update-report.dto.ts
│   └── submit-report.dto.ts
├── reports.controller.ts
├── reports.service.ts
├── reports.module.ts
└── reports.repository.ts
```

## 5.3 Naming Convention
- Tabel database: snake_case
- File frontend: PascalCase untuk komponen, kebab-case untuk util/config
- DTO backend: `*.dto.ts`
- Enum bersama: simpan di `packages/types`
- Route frontend: kebab-case

## 5.4 Branching Convention
- `main`
- `develop`
- `feature/<nama-fitur>`
- `fix/<nama-bug>`
- `release/<versi>`

## 5.5 Template Environment Variables

```bash
# Web
VITE_API_BASE_URL=http://localhost:3000/api

# API
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/puskesau_reporting
JWT_SECRET=change_me
JWT_EXPIRES_IN=1d
STORAGE_ENDPOINT=http://localhost:9000
STORAGE_BUCKET=attachments
STORAGE_ACCESS_KEY=minio
STORAGE_SECRET_KEY=miniosecret
MAX_UPLOAD_SIZE_MB=10
```

## 5.6 Minimal Frontend Routes
- `/`
- `/dashboard`
- `/master-faskes`
- `/master-faskes/rsau`
- `/master-faskes/fktp`
- `/laporan/saya`
- `/laporan/input`
- `/laporan/:id`
- `/review-kotama`
- `/validasi-puskesau`
- `/issues-risiko`
- `/dokumen`
- `/reports`
- `/users`
- `/settings`
- `/faskes/:id`

## 5.7 Minimal Reusable Components
- AppLayout
- Sidebar
- Topbar
- StatCard
- StatusBadge
- RiskBadge
- ProgressBar
- DataTable
- FilterBar
- PeriodSelector
- ReportSummaryCard
- ReviewNotePanel
- AuditTrailTable
- AttachmentList
