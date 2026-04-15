import { STATUS_IMPLEMENTASI } from '../constants/appConstants';

export const kotamaList = ['LAKNIS MABESAU', 'Kodau I', 'Kodau II', 'Kodau III', 'Kodiklatau', 'Koopsudnas', 'Balakpus', 'Korpasgat', 'BLU / PNBP'];
const vendors = ['MediCore', 'SatuSehat Integrator', 'AeroHealth Digital', 'Nusantara HealthTech'];
const integrationPool = ['Berhasil', 'On Progress', 'Belum Mulai', 'Gagal'];

const simrsModules = ['Pendaftaran','Rawat Jalan','IGD','Rawat Inap','Farmasi','Laboratorium','Radiologi','Rekam Medis','Billing/Kasir','Gudang/Logistik','Laporan Manajemen','Bridging BPJS','SATUSEHAT','LIS','RIS/PACS'];
const simKlinikModules = ['Registrasi','Poli Umum','Poli Gigi','Farmasi','Laboratorium Dasar','Billing','Laporan','Bridging PCare/BPJS','SATUSEHAT','Rujukan','Antrian'];

const rsauNames = [
'Lakesgilutau drg. R. Poerwanto (RSGM drg. K. Aryadhi)','RSAU dr. M. Hassan Toto','RSAU dr. Abdul Malik','RSAU dr. Sukirman','RSAU dr. M. Sutomo','RSAU dr. Hoediyono','RSAU dr. Yuniati Wisma Karyani','RSAU dr. Dody Sardjoto','RSAU Lanud Samsudin Noor','RSAU dr. Efrem/Efram Harsana','RSAU dr. Soemitro','RSAU dr. M. Moenir','Rumkit Lanud Dhomber','RSAU dr. Charles P. J. South','Rumkit Lanud El Tari','RSAU dr. Kresno','Rumkit Lanud Silas Papare','RSAU dr. Siswanto','RSAU dr. Norman T. Lubis','RSPAU dr. S. Hardjolukito','RSAU dr. E. Antariksa','RSAU dr. M. Salamun'
];

const fktpNames = [
'FKTP Denma Koopsudnas','FKTP Kosek I Medan','FKTP Denma Kodau I','FKTP Lanud Atang Sendjaja','FKTP Lanud Roesmin Nurjadin','FKTP Lanud Supadio (Ambara Asasta)','FKTP Lanud S. Suryadarma (Angkasa)','FKTP Lanud Husein Sastranegara','FKTP Lanud Soewondo (Flaminggo)','FKTP Lanud Sultan Iskandar Muda','FKTP Lanud Raden Sadjad','FKTP Lanud Sri Mulyono Herlambang','FKTP Lanud Sultan Sjahrir','FKTP Lanud Raja Haji Fisabilillah','FKTP Lanud Maimun Saleh','FKTP Lanud H.A.S. Hanandjoeddin','FKTP Lanud Wiriadinata','FKTP Lanud Pangeran M. Bun Yamin','FKTP Lanud Harry Hadisoemantri','FKTP Lanud Sugiri Sukani','FKTP Lanud Iskandar','FKTP Kosek II Makasar','FKTP Denma Kodau II','FKTP Lanud Iswahjudi (Pringgodani)','FKTP Lanud ABD Saleh (Garuda)','FKTP Lanud Sultan Hasanuddin (Pataraja)','FKTP Lanud Sam Ratulangi','FKTP Lanud El Tari','FKTP Lanud Muljono','FKTP Lanud Dhomber (Mulawarman)','FKTP Lanud I Gusti Ngurah Rai','FKTP Lanud Anang Busra','FKTP Lanud TGKH Zainudin Abdul Majid','FKTP Lanud Sjamsudin Noor','FKTP Lanud Haluoleo','FKTP Lanud Jenderal Besar Soedirman','FKTP Lanud Manuhua','FKTP Lanud Silas Papare','FKTP Lanud Leo Wattimena','FKTP Lanud Pattimura','FKTP Lanud Johannes Abraham Dimara','FKTP Lanud Dominicus Dumatubun','FKTP Lanud Yohanis Kapiyau','FKTP Denma Kodiklatau','FKTP Lanud Adisutjipto (Cendrawasih)','FKTP Lanud Adi Soemarmo (Colibri)','FKTP Lanud Sulaiman','FKTP Wingdik 700/Hanud','FKTP Wingdik 800/Pasgat','FKTP Denma Mabesau (YONKESAU)','FKTP Denma Akademi Angkatan Udara','FKTP Seskoau','FKTP Rajawali (Lakespra)','FKTP Dakota (Lakespra)','FKTP Lakesgilut (Dirgantara)','FKTP Lafiau','FKTP Mako Korpasgat','FKTP Sat Bravo 90 Korpasgat'
];

const makeFacility = (name, idx, tipeFaskes) => {
  const statusImplementasi = STATUS_IMPLEMENTASI[idx % STATUS_IMPLEMENTASI.length];
  const modTarget = tipeFaskes === 'RSAU' ? simrsModules.length : simKlinikModules.length;
  const modAktif = Math.min(modTarget, Math.max(1, (idx % modTarget) + Math.floor(modTarget / 3)));
  const progressPersen = Math.min(100, Math.round((modAktif / modTarget) * 100));
  const dateSeed = new Date(2026, (idx % 12), ((idx % 27) + 1));

  return {
    id: `${tipeFaskes.toLowerCase()}-${idx + 1}`,
    namaFaskes: name,
    tipeFaskes,
    kategori: tipeFaskes === 'RSAU' ? (idx % 3 === 0 ? 'BLU' : 'PNBP') : 'FKTP',
    kotama: kotamaList[idx % kotamaList.length],
    lanudSatuan: name.includes('Lanud') ? name.split('Lanud ')[1]?.replace(/\(.+\)/, '').trim() : `Satuan ${idx + 1}`,
    kelasRsTniAu: tipeFaskes === 'RSAU' ? ['A','B','C'][idx % 3] : null,
    kelasKemenkes: tipeFaskes === 'RSAU' ? ['I','II','III'][idx % 3] : null,
    statusImplementasi,
    progressPersen,
    jenisAplikasi: tipeFaskes === 'RSAU' ? 'SIMRS' : 'SIM Klinik',
    vendor: vendors[idx % vendors.length],
    modelHosting: ['Cloud', 'On Premise', 'Hybrid'][idx % 3],
    integrasiSatusehat: integrationPool[idx % 4],
    integrasiBPJS: integrationPool[(idx + 1) % 4],
    integrasiLIS: tipeFaskes === 'RSAU' ? integrationPool[(idx + 2) % 4] : 'Belum Mulai',
    integrasiRISPACS: tipeFaskes === 'RSAU' ? integrationPool[(idx + 3) % 4] : 'Belum Mulai',
    integrasiAntrian: integrationPool[(idx + 2) % 4],
    jumlahModulAktif: modAktif,
    jumlahModulTarget: modTarget,
    targetGoLive: new Date(dateSeed.getTime() + 1000 * 60 * 60 * 24 * 60).toISOString(),
    realisasiGoLive: ['Go Live', 'Stabilisasi', 'Selesai'].includes(statusImplementasi) ? new Date(dateSeed.getTime() + 1000 * 60 * 60 * 24 * 70).toISOString() : null,
    namaPIC: `Kol. Kes dr. PIC ${idx + 1}`,
    jabatanPIC: tipeFaskes === 'RSAU' ? 'Karumkit' : 'Kepala Klinik',
    kontakPIC: `08${String(1100000000 + idx).slice(0, 10)}`,
    levelRisiko: ['Rendah', 'Sedang', 'Tinggi'][idx % 3],
    isuUtama: idx % 3 === 0 ? 'Keterbatasan SDM IT' : idx % 3 === 1 ? 'Sinkronisasi data legacy' : 'Kesiapan infrastruktur jaringan',
    kebutuhanPendampingan: idx % 2 === 0 ? 'Pendampingan UAT dan training operator' : 'Pendampingan integrasi SATUSEHAT dan BPJS',
    lastUpdate: dateSeed.toISOString(),
    catatan: 'Monitoring mingguan oleh tim Puskesau dan kotama terkait.',
    modules: (tipeFaskes === 'RSAU' ? simrsModules : simKlinikModules).map((module, mIdx) => ({
      namaModul: module,
      aktif: mIdx < modAktif,
      status: mIdx < modAktif ? 'Aktif' : 'Belum Aktif',
    })),
    timeline: [
      { tanggal: new Date(dateSeed.getTime() - 1000 * 60 * 60 * 24 * 30).toISOString(), aktivitas: 'Kickoff implementasi', status: 'completed' },
      { tanggal: new Date(dateSeed.getTime() - 1000 * 60 * 60 * 24 * 15).toISOString(), aktivitas: 'Instalasi dan konfigurasi awal', status: 'completed' },
      { tanggal: dateSeed.toISOString(), aktivitas: 'Pendampingan modul prioritas', status: 'in-progress' },
      { tanggal: new Date(dateSeed.getTime() + 1000 * 60 * 60 * 24 * 25).toISOString(), aktivitas: 'Target UAT', status: 'planned' },
    ],
    issues: [
      {
        id: `issue-${tipeFaskes}-${idx + 1}`,
        title: 'Validasi master data pasien',
        severity: ['Low', 'Medium', 'High'][idx % 3],
        targetDate: new Date(dateSeed.getTime() + 1000 * 60 * 60 * 24 * 14).toISOString(),
        pic: `Tim IT ${name}`,
        status: ['open', 'on progress', 'closed'][idx % 3],
        recommendation: 'Lakukan cleansing data & mapping NIK terhadap SATUSEHAT.',
      },
    ],
  };
};

export const facilitiesSeed = [
  ...rsauNames.map((name, idx) => makeFacility(name, idx, 'RSAU')),
  ...fktpNames.map((name, idx) => makeFacility(name, idx + rsauNames.length, 'FKTP')),
];

export const usersSeed = [
  { id: 'u1', name: 'Super Admin Puskesau', role: 'Super Admin Puskesau', unit: 'Puskesau TNI AU' },
  { id: 'u2', name: 'Admin Kodau I', role: 'Admin Kotama', unit: 'Kodau I' },
  { id: 'u3', name: 'Operator RSAU', role: 'Operator Faskes', unit: 'RSAU dr. M. Hassan Toto' },
  { id: 'u4', name: 'Viewer Pimpinan', role: 'Viewer Pimpinan', unit: 'Mabesau' },
];

export const globalIssuesSeed = facilitiesSeed.flatMap((facility) => facility.issues.map((issue) => ({ ...issue, facilityId: facility.id, facilityName: facility.namaFaskes })));
