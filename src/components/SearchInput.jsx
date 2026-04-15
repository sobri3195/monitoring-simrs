import { Search } from 'lucide-react';

const SearchInput = ({ value, onChange, placeholder = 'Cari fasilitas...' }) => (
  <div className="relative w-full md:w-72">
    <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm focus:border-brand-500 focus:outline-none"
      placeholder={placeholder}
    />
  </div>
);

export default SearchInput;
