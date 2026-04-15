import { useMemo, useState } from 'react';
import FacilityTable from '../components/FacilityTable';
import FilterBar from '../components/FilterBar';
import EmptyState from '../components/EmptyState';
import { useAppStore } from '../store/useAppStore';
import { applyFacilityFilters } from './pageUtils';

const MasterFaskesPage = ({ tipe }) => {
  const { facilities } = useAppStore();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});

  const data = useMemo(() => {
    const base = tipe ? facilities.filter((f) => f.tipeFaskes === tipe) : facilities;
    return applyFacilityFilters(base, search, filters);
  }, [facilities, search, filters, tipe]);

  const options = {
    tipeFaskes: ['RSAU', 'FKTP'],
    kotama: [...new Set(facilities.map((f) => f.kotama))],
    statusImplementasi: [...new Set(facilities.map((f) => f.statusImplementasi))],
    vendor: [...new Set(facilities.map((f) => f.vendor))],
    levelRisiko: ['Rendah', 'Sedang', 'Tinggi'],
  };

  return (
    <div className="space-y-4">
      <FilterBar search={search} setSearch={setSearch} filters={filters} setFilters={setFilters} options={options} />
      {data.length ? <FacilityTable data={data} /> : <EmptyState />}
    </div>
  );
};

export default MasterFaskesPage;
