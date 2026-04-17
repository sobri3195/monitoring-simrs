# UX Quality Guidelines

## Role & Permission Matrix (Baseline)
| Fitur | Admin Pusat | Admin Faskes | Viewer |
|---|---|---|---|
| Lihat dashboard | ✅ | ✅ | ✅ |
| Input/update data | ✅ | ✅ (scope faskes) | ❌ |
| Kelola user | ✅ | ❌ | ❌ |
| Export laporan | ✅ | ✅ | ✅ |

## Empty / Loading / Error State
- **Empty**: tampilkan alasan data kosong + CTA jelas.
- **Loading**: gunakan skeleton/spinner konsisten.
- **Error**: pesan human-readable + tombol coba lagi.

## Accessibility Baseline
- Kontras warna minimal WCAG AA.
- Semua aksi penting dapat diakses keyboard.
- Gunakan label/ARIA pada input, tombol ikon, dan tabel interaktif.
- Pastikan fokus terlihat jelas saat tab navigation.

## KPI Performa Frontend
- JS bundle awal target < 400KB gzip (jangka menengah).
- LCP < 2.5s, CLS < 0.1, INP < 200ms (target web vitals).
- Pantau warning chunk-size dari Vite saat build.
