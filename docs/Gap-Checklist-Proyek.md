# Gap Checklist Proyek (Apa Saja yang Masih Kurang)

Dokumen ini diperbarui setelah baseline engineering diperbaiki.

## 1) Dokumentasi

### Sudah ada
- Arsitektur aplikasi (alur data, struktur folder, dan boundary modul): `docs/Arsitektur-Aplikasi.md`.
- Panduan kontribusi: `CONTRIBUTING.md`.
- Changelog: `CHANGELOG.md`.
- Lisensi proyek: `LICENSE`.
- Panduan deployment: `docs/Deployment-Guide.md`.

### Masih kurang
- Diagram arsitektur level enterprise (multi-system) lintas satuan/faskes.
- SOP rilis versi yang formal (RACI + approval matrix).

## 2) Quality & Testing

### Sudah ada
- Build pipeline lokal via Vite (`npm run build`).
- Unit test baseline dengan Vitest (`npm run test:unit`).
- Target coverage minimum 70% di konfigurasi Vitest.

### Masih kurang
- Integration/component test untuk halaman & komponen kritikal.
- End-to-end test untuk alur utama pengguna.
- Dashboard hasil coverage di CI.

## 3) Code Quality Tooling

### Sudah ada
- Linter ESLint + script `npm run lint`.
- Prettier + script `npm run format`.
- `.editorconfig` untuk konsistensi format.
- Pre-commit hook baseline (`.husky/pre-commit`) + lint-staged.

### Masih kurang
- Aturan lint React yang lebih ketat (`eslint-plugin-react`, hooks rules).
- Standarisasi import/order lint rules lintas modul.

## 4) CI/CD

### Sudah ada
- Workflow CI (`.github/workflows/ci.yml`) untuk install, lint, unit test, build.
- Quality gate otomatis melalui status CI di PR.
- Workflow release tagging manual (`.github/workflows/release-tag.yml`).

### Masih kurang
- Environment promotion otomatis (staging → production) dengan approval.
- Otomasi release notes berbasis changelog.

## 5) Keamanan & Operasional

### Sudah ada
- `.env.example` sebagai referensi environment.
- Security checklist: `docs/Security-Checklist.md`.

### Masih kurang
- Integrasi monitoring error runtime (mis. Sentry).
- Runbook insiden produksi + SLO/SLI operasional.
- Rencana backup/restore saat backend production aktif.

## 6) Produk & UX

### Sudah ada
- Baseline role matrix, state guideline, accessibility, dan KPI performa: `docs/UX-Quality-Guidelines.md`.

### Masih kurang
- Audit accessibility berbasis tooling (Lighthouse/axe) sebagai quality gate.
- Tracking web-vitals real-user monitoring per release.

## 7) Data & Integrasi

### Sudah ada
- Skema database PostgreSQL pada dokumentasi.
- Draft OpenAPI: `docs/openapi.yaml`.
- Data governance & mapping baseline: `docs/Data-Integration-Governance.md`.

### Masih kurang
- Kontrak API final dari backend produksi.
- Data quality rules yang executable (schema validation di pipeline).
- Strategi idempotency dan dead-letter queue untuk sinkronisasi data skala besar.

---

## Prioritas Rekomendasi Lanjutan
1. Tambah integration test untuk modul halaman prioritas.
2. Tambah E2E smoke test untuk alur utama.
3. Integrasikan error monitoring + web vitals RUM.
4. Finalisasi OpenAPI berdasarkan backend nyata.
