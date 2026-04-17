const MonitoringFilterBar = ({ filters, onChange, periods = [], kotamaList = [], rsauOptions = [] }) => (
  <div className="grid gap-2 rounded-xl border border-slate-200 bg-white p-3 md:grid-cols-3 xl:grid-cols-6">
    <select className="rounded border px-2 py-2 text-sm" value={filters.periode} onChange={(e) => onChange('periode', e.target.value)}>
      <option value="ALL">Semua Periode</option>
      {periods.map((p) => <option key={p} value={p}>{p}</option>)}
    </select>
    <select className="rounded border px-2 py-2 text-sm" value={filters.kotama} onChange={(e) => onChange('kotama', e.target.value)}>
      <option value="ALL">Semua Kotama</option>
      {kotamaList.map((k) => <option key={k} value={k}>{k}</option>)}
    </select>
    <select className="rounded border px-2 py-2 text-sm" value={filters.statusUmum} onChange={(e) => onChange('statusUmum', e.target.value)}>
      <option value="ALL">Status Kepatuhan</option><option value="Patuh">Patuh</option><option value="Perlu Perhatian">Perlu Perhatian</option><option value="Tidak Patuh">Tidak Patuh</option>
    </select>
    <select className="rounded border px-2 py-2 text-sm" value={filters.statusLaporan} onChange={(e) => onChange('statusLaporan', e.target.value)}>
      <option value="ALL">Status Laporan</option><option value="Belum Lapor">Belum Lapor</option><option value="Draft">Draft</option><option value="Lengkap">Lengkap</option><option value="Perlu Revisi">Perlu Revisi</option>
    </select>
    <select className="rounded border px-2 py-2 text-sm" value={filters.riskLevel} onChange={(e) => onChange('riskLevel', e.target.value)}>
      <option value="ALL">Risiko</option><option value="Tinggi">Tinggi</option><option value="Sedang">Sedang</option><option value="Rendah">Rendah</option>
    </select>
    <select className="rounded border px-2 py-2 text-sm" value={filters.rsauId} onChange={(e) => onChange('rsauId', e.target.value)}>
      <option value="ALL">RSAU Tertentu</option>
      {rsauOptions.map((r) => <option key={r.id} value={r.id}>{r.namaFaskes}</option>)}
    </select>
  </div>
);

export default MonitoringFilterBar;
