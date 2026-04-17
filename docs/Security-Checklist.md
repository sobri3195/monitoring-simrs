# Security Checklist

## Dependency & Supply Chain
- [ ] Jalankan `npm audit` secara berkala.
- [ ] Pin versi dependency kritikal jika perlu.
- [ ] Review dependency baru sebelum merge.

## Secret Management
- [ ] Jangan commit file `.env`.
- [ ] Gunakan secret manager pada CI/CD.
- [ ] Rotasi secret secara berkala.

## Secure Coding
- [ ] Hindari penyimpanan data sensitif di localStorage.
- [ ] Validasi dan sanitasi input pengguna.
- [ ] Tangani error tanpa mengekspos detail sensitif.

## Pipeline Security
- [ ] Aktifkan secret scanning pada repo.
- [ ] Batasi hak akses token CI/CD.
- [ ] Gunakan branch protection untuk `main`.

## Monitoring
- [ ] Integrasikan pelaporan error (mis. Sentry).
- [ ] Tetapkan SLA untuk triase isu keamanan.
