const PpraComplianceTable = ({ rows }) => (
  <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
    <table className="w-full text-sm"><thead className="bg-slate-50"><tr><th className="p-2 text-left">Faskes</th><th className="p-2 text-left">Status</th><th className="p-2 text-left">Tim</th><th className="p-2 text-left">Antibiogram</th><th className="p-2 text-left">Pendampingan</th></tr></thead>
      <tbody>{rows.map((r) => <tr key={r.id} className="border-t"><td className="p-2">{r.namaFaskes}</td><td className="p-2">{r.ppraStatusPelaporan}</td><td className="p-2">{r.ppraTimTersedia ? 'Aktif' : 'Belum'}</td><td className="p-2">{r.ppraAntibiogramTersedia ? 'Ada' : 'Tidak Ada'}</td><td className="p-2">{r.ppraKebutuhanPendampingan}</td></tr>)}</tbody></table>
  </div>
);
export default PpraComplianceTable;
