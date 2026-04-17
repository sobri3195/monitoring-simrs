# Dashboard Monitoring Implementasi SIMRS & SIM Klinik Puskesau TNI AU

Aplikasi dashboard nasional berbasis **React 18 + Vite + Tailwind CSS** untuk memonitor progres implementasi SIMRS pada RSAU/RSPAU dan SIM Klinik pada FKTP/Klinik jajaran TNI AU.

## Tech Stack
- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React
- Recharts
- TanStack Table
- Zustand (state management)
- Mock local JSON + localStorage persistence

## Menjalankan proyek
```bash
npm install
npm run dev
```

## Script
```bash
npm run dev           # local development
npm run build         # production build
npm run preview       # preview build
npm run lint          # lint source files
npm run format        # format files using prettier
npm run test:unit     # unit tests with vitest
```

## Build production
```bash
npm run build
npm run preview
```

## Deploy Vercel
Sudah tersedia `vercel.json` untuk fallback routing SPA.

## Dokumen Produk & Engineering
- PRD: `docs/PRD-Sistem-Laporan-Inti-Faskes-Puskesau-TNI-AU.md`
- TSD: `docs/TSD-Sistem-Laporan-Inti-Faskes-Puskesau-TNI-AU.md`
- Database Schema PostgreSQL: `docs/database-schema-postgresql.sql`
- Arsitektur Aplikasi: `docs/Arsitektur-Aplikasi.md`
- Deployment Guide: `docs/Deployment-Guide.md`
- Security Checklist: `docs/Security-Checklist.md`
- UX Quality Guidelines: `docs/UX-Quality-Guidelines.md`
- Data Integration & Governance: `docs/Data-Integration-Governance.md`
- Draft OpenAPI: `docs/openapi.yaml`
- Gap Checklist: `docs/Gap-Checklist-Proyek.md`
