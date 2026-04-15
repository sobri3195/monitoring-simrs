import SearchInput from './SearchInput';

const FilterBar = ({ search, setSearch, filters, setFilters, options }) => (
  <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3 md:flex-row md:items-center">
    <SearchInput value={search} onChange={setSearch} />
    {Object.entries(options).map(([key, vals]) => (
      <select
        key={key}
        value={filters[key] || ''}
        onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
      >
        <option value="">Semua {key}</option>
        {vals.map((val) => (
          <option key={val} value={val}>{val}</option>
        ))}
      </select>
    ))}
  </div>
);

export default FilterBar;
