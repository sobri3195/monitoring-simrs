import ComplianceStatusBadge from './ComplianceStatusBadge';

const RsaComplianceDetailCard = ({ facility, statusUmum, kendala, pendampingan }) => (
  <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <h3 className="text-sm font-semibold text-slate-700">Profil RSAU</h3>
    <p className="mt-2 text-lg font-semibold text-slate-800">{facility?.namaFaskes}</p>
    <p className="text-sm text-slate-600">{facility?.kotama} • Kelas {facility?.kelasRsTniAu || '-'}</p>
    <div className="mt-3"><ComplianceStatusBadge status={statusUmum} /></div>
    <p className="mt-3 text-sm text-slate-700"><span className="font-semibold">Kendala utama:</span> {kendala}</p>
    <p className="text-sm text-slate-700"><span className="font-semibold">Kebutuhan pendampingan:</span> {pendampingan}</p>
  </section>
);

export default RsaComplianceDetailCard;
