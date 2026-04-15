import { useMemo, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import FilterBar from '../components/FilterBar';
import FacilityTable from '../components/FacilityTable';
import { applyFacilityFilters } from './pageUtils';

const MonitoringPage = ({ jenisAplikasi }) => {
  const { facilities } = useAppStore();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});

  const data = useMemo(() => applyFacilityFilters(facilities.filter((f) => f.jenisAplikasi === jenisAplikasi), search, filters), [facilities, search, filters, jenisAplikasi]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
        Monitoring tahapan implementasi {jenisAplikasi} (progress modul, status, target vs realisasi go-live).
      </div>
      <FilterBar
        search={search}
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
        options={{ statusImplementasi: [...new Set(data.map((f) => f.statusImplementasi))], levelRisiko: ['Rendah', 'Sedang', 'Tinggi'] }}
      />
      <FacilityTable data={data} />
    </div>
  );
};

export default MonitoringPage;
