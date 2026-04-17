# Contributing Guide

Terima kasih sudah berkontribusi ke proyek **monitoring-simrs**.

## Branching Strategy
- `main`: branch produksi/stabil.
- `develop`: integrasi fitur aktif.
- `feature/<nama-fitur>`: pengembangan fitur baru.
- `fix/<nama-isu>`: perbaikan bug.
- `hotfix/<nama-isu>`: perbaikan darurat dari `main`.

## Standar Commit
Gunakan format commit konvensional:
- `feat:` fitur baru
- `fix:` perbaikan bug
- `docs:` perubahan dokumentasi
- `refactor:` refactor tanpa ubah behavior
- `test:` tambah/perbaiki test
- `chore:` tooling/dependency

Contoh:
```bash
git commit -m "feat: tambah filter status integrasi"
```

## Pull Request Checklist
Sebelum membuat PR, pastikan:
1. Kode berhasil di-build (`npm run build`).
2. Lint lolos (`npm run lint`).
3. Unit test lolos (`npm run test:unit`).
4. PR memiliki deskripsi perubahan, dampak, dan langkah verifikasi.
5. Jika ada perubahan UI signifikan, sertakan screenshot.

## Code Review Rules
- Minimal 1 reviewer menyetujui PR.
- Tidak boleh merge jika CI gagal.
- Komentar review harus ditindaklanjuti atau dijawab.
- Hindari PR terlalu besar; pecah per domain agar mudah ditinjau.

## Menjalankan Lokal
```bash
npm install
npm run dev
```

## Reporting Bug
Saat melaporkan bug, sertakan:
- Ringkasan masalah
- Langkah reproduksi
- Hasil aktual vs ekspektasi
- Screenshot/log (jika ada)
- Lingkungan (OS, browser, versi Node)
