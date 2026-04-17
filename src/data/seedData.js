import { STATUS_IMPLEMENTASI, INTEGRATION_ITEM_STATUS } from '../constants/appConstants';

export const kotamaList = ['LAKNIS MABESAU', 'Kodau I', 'Kodau II', 'Kodau III', 'Kodiklatau', 'Koopsudnas', 'Balakpus', 'Korpasgat', 'BLU / PNBP'];
const vendors = ['MediCore', 'SatuSehat Integrator', 'AeroHealth Digital', 'Nusantara HealthTech'];

const rsauNames = [
  'Lakesgilutau drg. R. Poerwanto (RSGM drg. K. Aryadhi)', 'RSAU dr. M. Hassan Toto', 'RSAU dr. Abdul Malik', 'RSAU dr. Sukirman', 'RSAU dr. M. Sutomo',
  'RSAU dr. Hoediyono', 'RSAU dr. Yuniati Wisma Karyani', 'RSAU dr. Dody Sardjoto', 'RSAU Lanud Samsudin Noor', 'RSAU dr. Efrem/Efram Harsana',
  'RSAU dr. Soemitro', 'RSAU dr. M. Moenir', 'Rumkit Lanud Dhomber', 'RSAU dr. Charles P. J. South', 'Rumkit Lanud El Tari', 'RSAU dr. Kresno',
  'Rumkit Lanud Silas Papare', 'RSAU dr. Siswanto', 'RSAU dr. Norman T. Lubis', 'RSPAU dr. S. Hardjolukito', 'RSAU dr. E. Antariksa', 'RSAU dr. M. Salamun',
];

const fktpNames = [
  'FKTP Denma Koopsudnas', 'FKTP Kosek I Medan', 'FKTP Denma Kodau I', 'FKTP Lanud Atang Sendjaja', 'FKTP Lanud Roesmin Nurjadin', 'FKTP Lanud Supadio (Ambara Asasta)',
  'FKTP Lanud S. Suryadarma (Angkasa)', 'FKTP Lanud Husein Sastranegara', 'FKTP Lanud Soewondo (Flaminggo)', 'FKTP Lanud Sultan Iskandar Muda',
  'FKTP Lanud Raden Sadjad', 'FKTP Lanud Sri Mulyono Herlambang', 'FKTP Lanud Sultan Sjahrir', 'FKTP Lanud Raja Haji Fisabilillah', 'FKTP Lanud Maimun Saleh',
  'FKTP Lanud H.A.S. Hanandjoeddin', 'FKTP Lanud Wiriadinata', 'FKTP Lanud Pangeran M. Bun Yamin', 'FKTP Lanud Harry Hadisoemantri', 'FKTP Lanud Sugiri Sukani',
  'FKTP Lanud Iskandar', 'FKTP Kosek II Makasar', 'FKTP Denma Kodau II', 'FKTP Lanud Iswahjudi (Pringgodani)', 'FKTP Lanud ABD Saleh (Garuda)',
];

const createFacility = (name, idx, tipeFaskes) => ({
  id: `${tipeFaskes.toLowerCase()}-${idx + 1}`,
  namaFaskes: name,
  tipeFaskes,
  kategori: tipeFaskes === 'RSAU' ? (idx % 3 === 0 ? 'BLU' : 'PNBP') : 'FKTP',
  kotama: kotamaList[idx % kotamaList.length],
  lanudSatuan: name.includes('Lanud') ? name.split('Lanud ')[1]?.replace(/\(.+\)/, '').trim() : `Satuan ${idx + 1}`,
  kelasRsTniAu: tipeFaskes === 'RSAU' ? ['A', 'B', 'C'][idx % 3] : null,
  kelasKemenkes: tipeFaskes === 'RSAU' ? ['I', 'II', 'III'][idx % 3] : null,
  statusImplementasi: STATUS_IMPLEMENTASI[idx % STATUS_IMPLEMENTASI.length],
  progressPersen: 30 + (idx % 7) * 10,
  levelRisiko: ['Rendah', 'Sedang', 'Tinggi'][idx % 3],
  vendor: vendors[idx % vendors.length],
  jenisAplikasi: tipeFaskes === 'RSAU' ? 'SIMRS' : 'SIM Klinik',
  integrasiSatusehat: ['Berhasil', 'On Progress', 'Belum Mulai', 'Gagal'][idx % 4],
  integrasiBPJS: ['Berhasil', 'On Progress', 'Belum Mulai', 'Gagal'][(idx + 1) % 4],
  integrasiLIS: tipeFaskes === 'RSAU' ? ['Berhasil', 'On Progress', 'Belum Mulai', 'Gagal'][(idx + 2) % 4] : 'Belum Mulai',
  integrasiRISPACS: tipeFaskes === 'RSAU' ? ['Berhasil', 'On Progress', 'Belum Mulai', 'Gagal'][(idx + 3) % 4] : 'Belum Mulai',
  integrasiAntrian: ['Berhasil', 'On Progress', 'Belum Mulai', 'Gagal'][(idx + 2) % 4],
  jumlahModulAktif: 6 + (idx % 5),
  jumlahModulTarget: tipeFaskes === 'RSAU' ? 15 : 11,
  targetGoLive: new Date(2026, 5, (idx % 28) + 1).toISOString(),
  realisasiGoLive: idx % 4 === 0 ? new Date(2026, 6, (idx % 28) + 1).toISOString() : null,
  namaPIC: `Kol. Kes dr. PIC ${idx + 1}`,
  jabatanPIC: tipeFaskes === 'RSAU' ? 'Karumkit' : 'Kepala Klinik',
  kontakPIC: `08${String(1100000000 + idx).slice(0, 10)}`,
  lastUpdate: new Date(2026, idx % 4, (idx % 28) + 1).toISOString(),
  isuUtama: idx % 2 ? 'Sinkronisasi data belum konsisten' : 'Keterbatasan SDM pelaporan',
  kebutuhanPendampingan: 'Pendampingan validasi dan supervisi pelaporan.',
  catatan: 'Pelaporan periodik terintegrasi untuk monitoring dan rekap Puskesau.',
  modules: [{ namaModul: 'Pelaporan Inti', aktif: true, status: 'Aktif' }],
  timeline: [{ tanggal: new Date(2026, 0, (idx % 28) + 1).toISOString(), aktivitas: 'Pembuatan draft laporan', status: 'completed' }],
  issues: [{ id: `issue-${tipeFaskes}-${idx + 1}`, title: 'Validasi data periodik', severity: ['Low', 'Medium', 'High'][idx % 3], targetDate: new Date(2026, 3, (idx % 28) + 1).toISOString(), pic: `Tim IT ${name}`, status: ['open', 'on progress', 'closed'][idx % 3], recommendation: 'Lengkapi data dan lakukan review berjenjang.' }],
});

export const masterFaskesSeed = [
  ...rsauNames.map((name, idx) => createFacility(name, idx, 'RSAU')),
  ...fktpNames.map((name, idx) => createFacility(name, idx + rsauNames.length, 'FKTP')),
];

const periods = ['2026-01', '2026-02', '2026-03'];

const makeAuditTrail = (id, phaseDate) => [
  { id: `${id}-a1`, event: 'draft dibuat', timestamp: new Date(phaseDate).toISOString(), by: 'Operator Faskes' },
  { id: `${id}-a2`, event: 'data diperbarui', timestamp: new Date(new Date(phaseDate).getTime() + 3600000 * 24).toISOString(), by: 'Operator Faskes' },
  { id: `${id}-a3`, event: 'dikirim', timestamp: new Date(new Date(phaseDate).getTime() + 3600000 * 48).toISOString(), by: 'Operator Faskes' },
  { id: `${id}-a4`, event: 'direview', timestamp: new Date(new Date(phaseDate).getTime() + 3600000 * 72).toISOString(), by: 'Admin Kotama' },
  { id: `${id}-a5`, event: 'direvisi', timestamp: new Date(new Date(phaseDate).getTime() + 3600000 * 96).toISOString(), by: 'Operator Faskes' },
  { id: `${id}-a6`, event: 'disetujui', timestamp: new Date(new Date(phaseDate).getTime() + 3600000 * 120).toISOString(), by: 'Admin Kotama' },
  { id: `${id}-a7`, event: 'tervalidasi', timestamp: new Date(new Date(phaseDate).getTime() + 3600000 * 140).toISOString(), by: 'Puskesau' },
];

const bridgingProgress = ['Belum Mulai', 'Persiapan', 'Mapping Data', 'Pengembangan', 'Uji Koneksi', 'Uji Kirim Data', 'Pilot', 'Aktif Sebagian', 'Aktif Penuh', 'Terkendala'];
const laporanStatus = ['Belum Lapor', 'Draft', 'Lengkap', 'Perlu Revisi'];
const updateStatus = ['Belum Update', 'Sedang Update', 'Sudah Update', 'Perlu Verifikasi', 'Terkendala'];

export const laporanPeriodikIntiSeed = masterFaskesSeed.flatMap((f, idx) => periods.map((period, pIdx) => ({
  id: `report-${f.id}-${period}`,
  faskesId: f.id,
  periode: period,
  laporanIntiUtama: {
    statusPelaporan: laporanStatus[(idx + pIdx) % laporanStatus.length],
    kelengkapan: 60 + ((idx + pIdx) % 5) * 8,
    lastUpdate: new Date(2026, pIdx, (idx % 28) + 1).toISOString(),
  },
}))); 

const makeSubMeta = (reportId, idx, pIdx, status) => ({
  reportId,
  faskesId: masterFaskesSeed[idx].id,
  rsauId: masterFaskesSeed[idx].id,
  periode: periods[pIdx],
  statusPelaporan: status,
  statusKepatuhan: ['Patuh', 'Perlu Perhatian', 'Tidak Patuh'][(idx + pIdx) % 3],
  isLate: (idx + pIdx) % 4 === 0,
  riskLevel: ['Rendah', 'Sedang', 'Tinggi'][(idx + pIdx) % 3],
  lastUpdate: new Date(2026, pIdx, (idx % 28) + 1).toISOString(),
  inputBy: `Operator ${masterFaskesSeed[idx].namaFaskes}`,
  updatedBy: `Operator ${masterFaskesSeed[idx].namaFaskes}`,
  reviewerNotes: 'Review kotama: pastikan data dukung lampiran lengkap.',
  validatorNotes: 'Validasi puskesau: sesuai kaidah pelaporan inti.',
  auditTrail: makeAuditTrail(reportId, new Date(2026, pIdx, (idx % 28) + 1)),
});

export const laporanBridgingSatusehatSeed = laporanPeriodikIntiSeed.map((report, i) => {
  const idx = i % masterFaskesSeed.length;
  const pIdx = periods.indexOf(report.periode);
  const statusItem = INTEGRATION_ITEM_STATUS[(idx + pIdx) % INTEGRATION_ITEM_STATUS.length];
  return {
    ...makeSubMeta(report.id, idx, pIdx, laporanStatus[(idx + pIdx) % laporanStatus.length]),
    id: `bridging-${report.id}`,
    statusBridgingSatusehat: bridgingProgress[(idx + pIdx) % bridgingProgress.length],
    bridgingStatus: bridgingProgress[(idx + pIdx) % bridgingProgress.length],
    jenisSistemSumber: ['SIMRS', 'SIM Klinik', 'Aplikasi Vendor', 'Manual/Belum Ada'][(idx + pIdx) % 4],
    namaVendorBridging: vendors[idx % vendors.length],
    vendorSimrs: vendors[idx % vendors.length],
    statusKredensialSatusehat: ['Belum Ada', 'Pengajuan', 'Aktif', 'Perlu Pembaruan'][(idx + pIdx) % 4],
    statusOrganisasiFhir: statusItem,
    statusPractitionerFhir: INTEGRATION_ITEM_STATUS[(idx + pIdx + 1) % 6],
    statusLocationFhir: INTEGRATION_ITEM_STATUS[(idx + pIdx + 2) % 6],
    statusEncounterFhir: INTEGRATION_ITEM_STATUS[(idx + pIdx + 3) % 6],
    statusPatientSync: INTEGRATION_ITEM_STATUS[(idx + pIdx + 4) % 6],
    statusObservationSync: INTEGRATION_ITEM_STATUS[(idx + pIdx + 5) % 6],
    statusMedicationSync: INTEGRATION_ITEM_STATUS[(idx + pIdx) % 6],
    statusClaimSync: INTEGRATION_ITEM_STATUS[(idx + pIdx + 1) % 6],
    terakhirKirimDataSatusehat: new Date(2026, pIdx, (idx % 28) + 1).toISOString(),
    terakhirKirimData: new Date(2026, pIdx, (idx % 28) + 1).toISOString(),
    jumlahDataBerhasilKirim: 120 + (idx % 20) * 8,
    jumlahDataBerhasil: 120 + (idx % 20) * 8,
    jumlahDataGagalKirim: (idx + pIdx) % 9,
    jumlahDataGagal: (idx + pIdx) % 9,
    errorUtamaBridging: 'Token SATUSEHAT kadaluarsa periodik dan mapping coding belum konsisten.',
    errorUtama: 'Token SATUSEHAT kadaluarsa periodik dan mapping coding belum konsisten.',
    kebutuhanPendampinganBridging: 'Pendampingan UAT resource Encounter, Observation, dan Claim.',
    kebutuhanPendampingan: 'Pendampingan UAT resource Encounter, Observation, dan Claim.',
    targetAktifBridging: new Date(2026, pIdx + 2, 25).toISOString(),
    catatanBridging: 'Monitoring mingguan dengan dukungan kotama.',
  };
});

export const laporanPpraSeed = laporanPeriodikIntiSeed.map((report, i) => {
  const idx = i % masterFaskesSeed.length;
  const pIdx = periods.indexOf(report.periode);
  return {
    ...makeSubMeta(report.id, idx, pIdx, laporanStatus[(idx + pIdx + 1) % laporanStatus.length]),
    id: `ppra-${report.id}`,
    ppraStatusPelaporan: laporanStatus[(idx + pIdx + 1) % laporanStatus.length],
    ppraPeriode: report.periode,
    ppraTimTersedia: idx % 3 !== 0,
    ppraSkTersedia: idx % 4 !== 0,
    ppraPanduanTersedia: idx % 5 !== 0,
    ppraAntibiogramTersedia: idx % 4 !== 1,
    ppraAuditPenggunaanAntibiotik: idx % 3 !== 1,
    ppraMonitoringKepatuhan: idx % 2 === 0,
    ppraEdukasiRutin: idx % 2 === 1,
    ppraJumlahKasusMonitoring: 20 + (idx % 11) * 2,
    ppraJumlahPenggunaanAntibiotikRestriksi: 5 + (idx % 9),
    ppraTemuanUtama: 'Kepatuhan antibiotik empiris meningkat namun antibiogram belum rutin diupdate.',
    ppraMasalahUtama: 'Keterbatasan SDM farmasi klinik dan komite PPRA aktif.',
    ppraTindakLanjut: 'Jadwal audit bulanan dan penguatan edukasi klinisi.',
    ppraKebutuhanPendampingan: 'Pendampingan penyusunan antibiogram dan audit penggunaan antibiotik.',
    ppraLampiran: `lampiran-ppra-${report.id}.pdf`,
  };
});

export const laporanInmIkpSeed = laporanPeriodikIntiSeed.map((report, i) => {
  const idx = i % masterFaskesSeed.length;
  const pIdx = periods.indexOf(report.periode);
  return {
    ...makeSubMeta(report.id, idx, pIdx, laporanStatus[(idx + pIdx + 2) % laporanStatus.length]),
    id: `inmikp-${report.id}`,
    inmIkpStatusPelaporan: laporanStatus[(idx + pIdx + 2) % laporanStatus.length],
    inmIkpPeriode: report.periode,
    inmJumlahIndikatorDilaporkan: 10 + (idx % 6),
    inmJumlahIndikatorTarget: 15,
    inmPersenKelengkapan: Number((((10 + (idx % 6)) / 15) * 100).toFixed(1)),
    inmTemuanUtama: 'Beberapa indikator IKP terkait waktu tunggu belum memenuhi target.',
    inmMasalahUtama: 'Pelaporan unit belum konsisten pada akhir bulan.',
    inmTindakLanjut: 'Validasi data unit dan penguatan monitoring mingguan.',
    inmKebutuhanPendampingan: 'Pendampingan analisis mutu dan keselamatan pasien.',
    indikatorDinamis: [
      {
        id: `indikator-${report.id}-1`,
        reportId: report.id,
        jenisIndikator: 'INM',
        namaIndikator: 'Kepatuhan hand hygiene',
        kategoriIndikator: 'Keselamatan Pasien',
        satuan: '%',
        target: 85,
        capaian: 80 + (idx % 10),
        statusCapaian: 80 + (idx % 10) >= 85 ? 'Tercapai' : 'Belum Tercapai',
        analisisSingkat: 'Perlu penguatan supervisi di unit rawat inap.',
        tindakLanjut: 'Audit internal berkala.',
      },
      {
        id: `indikator-${report.id}-2`,
        reportId: report.id,
        jenisIndikator: 'IKP',
        namaIndikator: 'Waktu tunggu rawat jalan',
        kategoriIndikator: 'Mutu Pelayanan',
        satuan: 'menit',
        target: 60,
        capaian: 65 + (idx % 8),
        statusCapaian: 65 + (idx % 8) <= 60 ? 'Tercapai' : 'Belum Tercapai',
        analisisSingkat: 'Jam sibuk pagi memicu antrean tinggi.',
        tindakLanjut: 'Penataan jadwal pendaftaran.',
      },
    ],
  };
});

export const laporanSirsKompetensiSeed = laporanPeriodikIntiSeed.map((report, i) => {
  const idx = i % masterFaskesSeed.length;
  const pIdx = periods.indexOf(report.periode);
  return {
    ...makeSubMeta(report.id, idx, pIdx, laporanStatus[(idx + pIdx + 3) % laporanStatus.length]),
    id: `sirs-${report.id}`,
    sirsStatusUpdate: updateStatus[(idx + pIdx) % updateStatus.length],
    sirsPeriodeUpdate: report.periode,
    sirsTanggalUpdateTerakhir: new Date(2026, pIdx, (idx % 28) + 1).toISOString(),
    sirsPetugasUpdate: `Petugas SIRS ${idx + 1}`,
    sirsDataProfilRsLengkap: idx % 2 === 0,
    sirsDataTempatTidurLengkap: idx % 3 !== 0,
    sirsDataSdMlengkap: idx % 4 !== 0,
    sirsDataLayananSpesialistikLengkap: idx % 3 !== 1,
    sirsDataPeralatanLengkap: idx % 5 !== 2,
    sirsDataKompetensiLayananLengkap: idx % 4 !== 3,
    sirsDataRujukanLengkap: idx % 2 === 1,
    sirsMasalahUtama: 'Sinkronisasi data SDM kesehatan belum final.',
    sirsKebutuhanPendampingan: 'Pendampingan validasi kompetensi layanan.',
    sirsTargetPenyelesaian: new Date(2026, pIdx + 1, 22).toISOString(),
    sirsCatatan: 'Prioritas pada profil RS, SDM, layanan spesialistik.',
  };
});

export const laporanKeuanganBulananSeed = laporanPeriodikIntiSeed.map((report, i) => {
  const idx = i % masterFaskesSeed.length;
  const pIdx = periods.indexOf(report.periode);
  const pendapatan = 200000000 + idx * 2500000 + pIdx * 10000000;
  const belanjaOp = 110000000 + idx * 1500000;
  const belanjaModal = 30000000 + (idx % 5) * 3000000;
  return {
    ...makeSubMeta(report.id, idx, pIdx, laporanStatus[(idx + pIdx) % laporanStatus.length]),
    id: `finance-${report.id}`,
    financePeriodeBulan: Number(report.periode.split('-')[1]),
    financePeriodeTahun: Number(report.periode.split('-')[0]),
    financeStatusPelaporan: laporanStatus[(idx + pIdx) % laporanStatus.length],
    financeTotalPendapatan: pendapatan,
    financeTotalBelanjaOperasional: belanjaOp,
    financeTotalBelanjaModal: belanjaModal,
    financeTotalKlaim: 50000000 + idx * 400000,
    financeTotalPiutang: 20000000 + idx * 350000,
    financeTotalHutang: 12000000 + idx * 300000,
    financeSaldoAkhir: pendapatan - belanjaOp - belanjaModal,
    financePersenRealisasiAnggaran: 68 + (idx % 20),
    financeMasalahUtama: 'Klaim tertunda dan realisasi pengadaan triwulan berjalan.',
    financeRisikoUtama: 'Arus kas bulanan menurun pada fasilitas dengan klaim tertunda.',
    financeKebutuhanPendampingan: 'Pendampingan monitoring realisasi dan percepatan klaim.',
    financeCatatan: 'Ini ringkasan keuangan bulanan untuk monitoring, bukan akuntansi transaksi.',
    financeLampiran: `lampiran-keuangan-${report.id}.xlsx`,
    pendapatanLayanan: pendapatan * 0.65,
    pendapatanKlaim: pendapatan * 0.25,
    pendapatanLainnya: pendapatan * 0.1,
    belanjaPegawai: belanjaOp * 0.45,
    belanjaBarangJasa: belanjaOp * 0.35,
    belanjaPemeliharaan: belanjaOp * 0.2,
    belanjaInvestasi: belanjaModal,
  };
});

export const usersSeed = [
  { id: 'u1', name: 'Super Admin Puskesau', role: 'Super Admin Puskesau', unit: 'Puskesau TNI AU' },
  { id: 'u2', name: 'Admin Kodau I', role: 'Admin Kotama', unit: 'Kodau I' },
  { id: 'u3', name: 'Operator RSAU', role: 'Operator Faskes', unit: 'RSAU dr. M. Hassan Toto' },
  { id: 'u4', name: 'Viewer Pimpinan', role: 'Viewer Pimpinan', unit: 'Mabesau' },
  { id: 'u5', name: 'Staf Yankes Monitoring', role: 'Staf Yankes / Viewer Monitoring', unit: 'Puskesau TNI AU' },
];

export const facilitiesSeed = masterFaskesSeed;

export const globalIssuesSeed = masterFaskesSeed.map((f, idx) => ({
  id: `issue-${f.id}`,
  title: idx % 2 === 0 ? 'Keterlambatan pelaporan periodik lintas modul' : 'Validasi data belum sinkron antar submodul',
  severity: ['Low', 'Medium', 'High'][idx % 3],
  targetDate: new Date(2026, 3, (idx % 28) + 1).toISOString(),
  pic: `Tim Mutu ${f.namaFaskes}`,
  status: ['open', 'on progress', 'closed'][idx % 3],
  recommendation: 'Perkuat review berjenjang dan checklist kelengkapan pelaporan.',
  facilityId: f.id,
  facilityName: f.namaFaskes,
}));
