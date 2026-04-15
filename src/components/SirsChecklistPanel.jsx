const SirsChecklistPanel = ({ item }) => {
  const checks = [
    ['profil rumah sakit', item.sirsDataProfilRsLengkap],
    ['tempat tidur', item.sirsDataTempatTidurLengkap],
    ['SDM kesehatan', item.sirsDataSdMlengkap],
    ['layanan unggulan/kompetensi', item.sirsDataKompetensiLayananLengkap],
    ['layanan spesialistik', item.sirsDataLayananSpesialistikLengkap],
    ['sarana alat utama', item.sirsDataPeralatanLengkap],
    ['kesiapan rujukan', item.sirsDataRujukanLengkap],
  ];
  return <div className="grid gap-2 sm:grid-cols-2">{checks.map(([k, v]) => <div key={k} className="rounded bg-slate-50 p-2 text-sm">{k}: <b>{v ? 'Lengkap' : 'Belum'}</b></div>)}</div>;
};
export default SirsChecklistPanel;
