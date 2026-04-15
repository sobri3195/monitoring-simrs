# PRD — Sistem Laporan Inti Faskes Puskesau TNI AU

## 1. Product Name
**Sistem Laporan Inti Faskes Puskesau TNI AU**

## 2. Latar Belakang
Puskesau membutuhkan sistem terpusat untuk menerima, memonitor, mereview, dan memvalidasi laporan inti dari RSAU serta FKTP/Klinik jajaran TNI AU.

Kondisi saat ini:
- pelaporan tersebar,
- format tidak seragam,
- rekap sulit dilakukan,
- status tindak lanjut sulit ditelusuri.

Sistem ini **bukan** SIMRS, **bukan** aplikasi operasional klinik, dan **bukan** aplikasi transaksi pasien. Fokus sistem:
- pelaporan berkala,
- monitoring progres,
- review/validasi berjenjang,
- rekap risiko, kendala, dan kebutuhan pendampingan.

## 3. Problem Statement
Masalah utama yang ingin diselesaikan:
- format laporan antar faskes tidak seragam,
- Puskesau sulit melihat siapa yang belum lapor,
- tindak lanjut dan kebutuhan bantuan tidak terdokumentasi rapi,
- sulit memantau progres implementasi sistem/aplikasi di lapangan,
- tidak ada audit trail jelas antara operator faskes, reviewer kotama, dan validator Puskesau.

## 4. Goals
Tujuan produk:
1. Menyediakan pelaporan periodik standar dari faskes ke Puskesau.
2. Menyediakan dashboard nasional untuk melihat status, progres, risiko, dan kebutuhan pendampingan.
3. Menyediakan workflow berjenjang:
   - Operator Faskes
   - Admin Kotama
   - Puskesau
4. Menyediakan riwayat laporan dan audit trail.
5. Menyediakan rekap nasional yang mudah dibaca pimpinan.

## 5. Non-Goals
Di luar cakupan:
- pendaftaran pasien,
- EMR / rekam medis,
- farmasi transaksi,
- rawat jalan/rawat inap operasional,
- kasir/billing,
- integrasi transaksi klinis real-time,
- manajemen inventori rumah sakit.

## 6. Target Users
### A. Operator Faskes
Mengisi draft, mengirim laporan, memperbarui data fasilitasnya sendiri.

### B. Admin Kotama
Mereview laporan faskes dalam jajarannya, memberi revisi, menyetujui ke level berikutnya.

### C. Super Admin / Validator Puskesau
Melihat rekap nasional, memvalidasi laporan yang telah direview, dan menetapkan prioritas pendampingan.

### D. Viewer Pimpinan
Hanya membaca dashboard, rekap, dan laporan final.

## 7. Core Use Cases
### Use Case 1 — Operator membuat laporan
Operator memilih periode laporan, mengisi form inti, menyimpan draft, lalu mengirim laporan.

### Use Case 2 — Kotama mereview
Admin Kotama membuka laporan yang masuk, memberi catatan, lalu memilih:
- Perlu Revisi
- Disetujui Kotama

### Use Case 3 — Puskesau memvalidasi
Puskesau membaca laporan yang sudah lolos review, memberi catatan final, lalu memilih:
- Tervalidasi Puskesau
- Eskalasi / Prioritas Pendampingan

### Use Case 4 — Pimpinan melihat dashboard
Pimpinan membuka dashboard untuk melihat:
- total laporan masuk,
- faskes belum lapor,
- risiko tinggi,
- kebutuhan pendampingan,
- progres nasional.

## 8. Scope Fitur Utama
### A. Master Data Faskes
Fungsi:
- menyimpan data RSAU/FKTP,
- mengelompokkan per kotama/jajaran,
- menyimpan PIC,
- menyimpan status aktif/nonaktif.

Kebutuhan:
- list faskes,
- filter per tipe,
- filter per kotama,
- detail profil faskes,
- histori laporan terkait.

### B. Manajemen Periode Laporan
Fungsi:
- membuat periode pelaporan bulanan/mingguan,
- menentukan tenggat,
- menandai periode aktif.

Kebutuhan:
- list periode,
- buka/tutup periode,
- due date pelaporan.

### C. Input Laporan Inti
Bagian form:
- Ringkasan umum
- Kesiapan
- Status sistem/aplikasi
- Integrasi
- Kendala dan risiko
- Tindak lanjut
- Lampiran

Kebutuhan:
- autosave draft,
- validasi field wajib,
- simpan draft,
- submit laporan,
- edit draft sebelum submit.

### D. Review Kotama
Kebutuhan:
- melihat laporan yang masuk dari jajaran,
- memberi catatan,
- ubah status ke Perlu Revisi,
- ubah status ke Disetujui Kotama.

### E. Validasi Puskesau
Kebutuhan:
- melihat semua laporan nasional,
- memvalidasi laporan hasil review,
- memberi catatan final,
- menandai prioritas pendampingan.

### F. Dashboard Nasional
KPI utama:
- total faskes,
- total RSAU,
- total FKTP,
- total laporan periode aktif,
- belum lapor,
- perlu revisi,
- tervalidasi,
- risiko tinggi,
- rata-rata progres.

Widget penting:
- status laporan per kotama,
- status implementasi,
- kebutuhan pendampingan,
- faskes belum update,
- daftar prioritas.

### G. Isu, Risiko, dan Dukungan
Kebutuhan:
- daftar isu per laporan,
- kategori isu,
- level risiko,
- tindak lanjut,
- status open/in progress/closed.

### H. Lampiran
Kebutuhan:
- unggah dokumen pendukung,
- simpan metadata file,
- tampilkan daftar lampiran per laporan.

### I. Audit Trail
Kebutuhan:
- siapa membuat,
- siapa submit,
- siapa review,
- siapa validasi,
- kapan status berubah.

## 9. Functional Requirements
### FR-01 Authentication & Authorization
- user login dengan email dan password,
- role-based access control,
- operator hanya boleh akses faskes miliknya.

### FR-02 Facility Management
- admin dapat melihat daftar faskes,
- admin dapat menambah/mengubah data master.

### FR-03 Reporting Workflow
Status laporan:
- Draft
- Dikirim
- Direview
- Perlu Revisi
- Disetujui Kotama
- Tervalidasi Puskesau

### FR-04 Review & Validation
- reviewer dapat memberi komentar,
- sistem menyimpan histori review/validasi.

### FR-05 Dashboard & Analytics
- sistem menampilkan agregasi per periode, per kotama, per tipe faskes.

### FR-06 Attachments
- pengguna dapat unggah lampiran,
- lampiran terhubung ke laporan.

### FR-07 Notifications
Notifikasi saat:
- periode dibuka,
- laporan perlu revisi,
- laporan disetujui,
- deadline mendekat.

## 10. Non-Functional Requirements
- responsive untuk desktop dan mobile,
- waktu buka dashboard < 3 detik untuk data skala nasional ringan,
- audit trail tidak boleh hilang,
- semua perubahan status harus terekam,
- role access wajib konsisten,
- backup database harian,
- koneksi aman via HTTPS,
- file upload tervalidasi tipe dan ukuran.

## 11. Success Metrics
- 90% faskes mengirim laporan tepat waktu,
- 100% laporan memiliki histori status,
- waktu rekap nasional turun signifikan dibanding manual,
- Puskesau dapat melihat belum lapor/risiko tinggi dalam 1 layar dashboard,
- rata-rata waktu review menurun.

## 12. MVP Definition
Versi MVP wajib berisi:
- login dan RBAC,
- master data faskes,
- periode laporan,
- input laporan inti,
- review kotama,
- validasi Puskesau,
- dashboard nasional,
- lampiran dasar,
- audit trail.
