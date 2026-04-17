import { formatDateTime } from './formatters';

export const MODULE_KEYS = ['bridging', 'ppra', 'inmIkp', 'sirs', 'finance'];

export const COMPLIANCE_STATUS_ORDER = ['Belum Lapor', 'Draft', 'Lengkap', 'Perlu Revisi', 'Disetujui', 'Tervalidasi'];

export const getRiskLevel = (row, moduleKey) => {
  if (!row) return 'Sedang';
  if (moduleKey === 'bridging') {
    if (row.statusBridgingSatusehat === 'Terkendala' || row.jumlahDataGagalKirim > 10) return 'Tinggi';
    if (['Belum Mulai', 'Persiapan', 'Mapping Data'].includes(row.statusBridgingSatusehat)) return 'Sedang';
    return 'Rendah';
  }
  if (moduleKey === 'ppra') return !row.ppraTimTersedia || !row.ppraAntibiogramTersedia ? 'Tinggi' : 'Rendah';
  if (moduleKey === 'inmIkp') return row.inmPersenKelengkapan < 65 ? 'Tinggi' : row.inmPersenKelengkapan < 80 ? 'Sedang' : 'Rendah';
  if (moduleKey === 'sirs') return row.sirsStatusUpdate === 'Terkendala' ? 'Tinggi' : row.sirsStatusUpdate === 'Belum Update' ? 'Sedang' : 'Rendah';
  if (moduleKey === 'finance') return row.financePersenRealisasiAnggaran < 70 ? 'Tinggi' : row.financePersenRealisasiAnggaran < 80 ? 'Sedang' : 'Rendah';
  return 'Sedang';
};

export const getModuleStatus = (row, moduleKey) => {
  if (!row) return 'Belum Lapor';
  if (moduleKey === 'bridging') return row.statusPelaporan || 'Draft';
  if (moduleKey === 'ppra') return row.ppraStatusPelaporan || 'Draft';
  if (moduleKey === 'inmIkp') return row.inmIkpStatusPelaporan || 'Draft';
  if (moduleKey === 'sirs') return row.statusPelaporan || 'Draft';
  if (moduleKey === 'finance') return row.financeStatusPelaporan || 'Draft';
  return 'Draft';
};

export const computeOverallCompliance = (moduleRows) => {
  const statuses = MODULE_KEYS.map((k) => getModuleStatus(moduleRows[k], k));
  const risks = MODULE_KEYS.map((k) => getRiskLevel(moduleRows[k], k));
  const completedCount = statuses.filter((s) => ['Lengkap', 'Disetujui', 'Tervalidasi'].includes(s)).length;
  const revisionCount = statuses.filter((s) => s === 'Perlu Revisi').length;
  const notReportedCount = statuses.filter((s) => s === 'Belum Lapor').length;
  const highRiskCount = risks.filter((r) => r === 'Tinggi').length;

  const score = Math.max(0, Math.min(100, Math.round((completedCount / 5) * 100 - revisionCount * 8 - notReportedCount * 10 - highRiskCount * 6)));
  let statusUmum = 'Perlu Perhatian';
  if (score >= 85 && highRiskCount === 0 && notReportedCount === 0) statusUmum = 'Patuh';
  if (score < 60 || notReportedCount >= 2 || highRiskCount >= 2) statusUmum = 'Tidak Patuh';

  return {
    score,
    statusUmum,
    completedCount,
    revisionCount,
    notReportedCount,
    highRiskCount,
    risks,
    statuses,
  };
};

export const latestByFacility = (rows, period) => {
  const filtered = period && period !== 'ALL' ? rows.filter((row) => row.periode === period) : rows;
  return Object.values(filtered.reduce((acc, row) => {
    if (!acc[row.faskesId] || row.periode > acc[row.faskesId].periode) acc[row.faskesId] = row;
    return acc;
  }, {}));
};

export const exportToCsv = ({ filename, rows }) => {
  const escapedRows = rows.map((r) => r.map((cell) => {
    const value = cell === null || cell === undefined ? '' : String(cell);
    return `"${value.replaceAll('"', '""')}"`;
  }).join(','));
  const csv = escapedRows.join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
};

export const mergeAuditTrail = (moduleRows) => Object.values(moduleRows)
  .flatMap((row) => (row?.auditTrail || []).map((entry) => ({ ...entry, module: row.id.split('-')[0] })))
  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

export const buildLatestUpdateList = (moduleRows, facilitiesMap) => Object.entries(moduleRows)
  .filter(([, row]) => !!row)
  .map(([module, row]) => ({
    id: `${module}-${row.id}`,
    module,
    facilityName: facilitiesMap.get(row.faskesId)?.namaFaskes || row.faskesId,
    updateAt: row.lastUpdate,
    updater: row.inputBy || row.updatedBy || '-',
    note: row.reviewerNotes || row.validatorNotes || row.catatanBridging || row.financeCatatan || '-',
  }))
  .sort((a, b) => new Date(b.updateAt) - new Date(a.updateAt))
  .map((item) => ({ ...item, updateLabel: formatDateTime(item.updateAt) }));
