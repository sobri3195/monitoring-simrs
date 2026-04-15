import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import FacilityDetailCard from '../components/FacilityDetailCard';
import TimelineList from '../components/TimelineList';
import IntegrationStatusCard from '../components/IntegrationStatusCard';
import IssueTable from '../components/IssueTable';

const FacilityDetailPage = () => {
  const { id } = useParams();
  const { facilities } = useAppStore();
  const facility = useMemo(() => facilities.find((f) => f.id === id), [facilities, id]);

  if (!facility) return <div className="rounded-xl bg-white p-4">Data fasilitas tidak ditemukan.</div>;

  const modulesInactive = facility.modules.filter((m) => !m.aktif).map((m) => m.namaModul).join(', ') || '-';

  return (
    <div className="space-y-4">
      <FacilityDetailCard facility={facility} />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 lg:col-span-2">
          <h3 className="mb-3 font-semibold text-brand-900">Timeline Implementasi</h3>
          <TimelineList timeline={facility.timeline} />
        </div>
        <IntegrationStatusCard facility={facility} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="mb-2 font-semibold text-brand-900">Checklist Kesiapan Go-Live</h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-slate-600">
            <li>Modul aktif: {facility.jumlahModulAktif}/{facility.jumlahModulTarget}</li>
            <li>Modul belum aktif: {modulesInactive}</li>
            <li>Isu utama: {facility.isuUtama}</li>
            <li>Kebutuhan pendampingan: {facility.kebutuhanPendampingan}</li>
          </ul>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="mb-2 font-semibold text-brand-900">Data Vendor dan PIC</h3>
          <p className="text-sm text-slate-600">Vendor: {facility.vendor}</p>
          <p className="text-sm text-slate-600">Hosting: {facility.modelHosting}</p>
          <p className="text-sm text-slate-600">PIC: {facility.namaPIC} ({facility.jabatanPIC})</p>
          <p className="text-sm text-slate-600">Kontak: {facility.kontakPIC}</p>
        </div>
      </div>
      <IssueTable data={facility.issues.map((issue) => ({ ...issue, facilityName: facility.namaFaskes }))} />
    </div>
  );
};

export default FacilityDetailPage;
