export const applyFacilityFilters = (facilities, search, filters = {}) =>
  facilities.filter((f) => {
    const passSearch = !search || f.namaFaskes.toLowerCase().includes(search.toLowerCase());
    const passFilter = Object.entries(filters).every(([k, v]) => !v || f[k] === v);
    return passSearch && passFilter;
  });
