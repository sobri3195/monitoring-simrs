const PpraChecklistPanel = ({ item }) => {
  const checklist = [
    ['Tim PPRA', item.ppraTimTersedia],
    ['SK PPRA', item.ppraSkTersedia],
    ['Panduan', item.ppraPanduanTersedia],
    ['Antibiogram', item.ppraAntibiogramTersedia],
    ['Audit Antibiotik', item.ppraAuditPenggunaanAntibiotik],
    ['Monitoring Kepatuhan', item.ppraMonitoringKepatuhan],
    ['Edukasi Rutin', item.ppraEdukasiRutin],
  ];
  return <div className="grid gap-2 sm:grid-cols-2">{checklist.map(([k, v]) => <div key={k} className="rounded bg-slate-50 px-3 py-2 text-sm">{k}: <span className="font-medium">{v ? 'Ya' : 'Tidak'}</span></div>)}</div>;
};
export default PpraChecklistPanel;
