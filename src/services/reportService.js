export const moduleStoreKeys = {
  inti: 'laporanPeriodikInti',
  bridging: 'laporanBridgingSatusehat',
  ppra: 'laporanPPRA',
  inmikp: 'laporanINMIKP',
  sirs: 'laporanSIRSKompetensi',
  keuangan: 'laporanKeuanganBulanan',
};

export const filterReportsByScope = ({ rows = [], period, facilityIds = [] }) => {
  const faskesIdSet = new Set(facilityIds);
  return rows.filter((item) => item.periode === period && faskesIdSet.has(item.faskesId));
};

export const getModuleReports = ({ store, module, period, facilityIds }) => {
  const key = moduleStoreKeys[module];
  return filterReportsByScope({ rows: store[key] || [], period, facilityIds });
};
