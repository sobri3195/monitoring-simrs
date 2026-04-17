# Deployment Guide

## Prasyarat
- Node.js 20+
- npm 10+
- Akses ke platform deployment (contoh: Vercel)

## Variabel Environment
Gunakan `.env.example` sebagai referensi dasar.

Langkah:
1. Salin file: `cp .env.example .env`
2. Isi nilai sesuai environment.

Contoh variabel penting:
- `VITE_APP_NAME`
- `VITE_API_BASE_URL`
- `VITE_ENABLE_MOCK`

## Alur Build
```bash
npm ci
npm run lint
npm run test:unit
npm run build
```

## Branch Strategy Deployment
- `main` → Production
- `develop` → Staging/Preview
- `feature/*` → PR Preview

## Rollback Plan
Jika rilis bermasalah:
1. Identifikasi deployment terakhir yang stabil.
2. Rollback ke deployment stable di platform hosting.
3. Buat hotfix branch dari `main`.
4. Verifikasi smoke test:
   - Login/navigasi dashboard.
   - Tabel dan chart utama termuat.
   - Tidak ada error console kritikal.

## Checklist Rilis
- [ ] CI hijau (lint, unit test, build)
- [ ] CHANGELOG diperbarui
- [ ] Tidak ada secret hard-coded
- [ ] Verifikasi performa bundle (warning chunk ditinjau)
