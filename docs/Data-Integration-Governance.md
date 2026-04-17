# Data Integration & Governance

## API Contract
- Gunakan OpenAPI untuk mendefinisikan endpoint integrasi.
- Versioning API: `/api/v1/*`.
- Semua perubahan kontrak harus backward compatible atau melalui versi baru.

## Mapping Field Antar Sistem
Contoh baseline mapping:
| SIMRS Field | SATUSEHAT/SIRS Field | Catatan |
|---|---|---|
| `facility_id` | `organization_id` | Wajib unik |
| `report_period` | `period` | Format YYYY-MM |
| `indicator_code` | `metric_code` | Gunakan kamus kode resmi |

## Validasi & Fallback
- Validasi schema sebelum kirim data.
- Simpan record gagal untuk retry.
- Catat alasan gagal (validation, network, auth).

## Retensi Data
- Data operasional: minimal 2 tahun.
- Audit log: minimal 1 tahun.
- Data sensitif: ikuti kebijakan instansi.

## Klasifikasi Data
- **Publik**: metadata non-sensitif.
- **Internal**: data operasional internal.
- **Terbatas**: data yang membutuhkan kontrol akses ketat.
