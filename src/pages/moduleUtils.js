export const byId = (arr, id) => arr.find((x) => x.id === id);

export const withFaskesName = (rows, masterFaskes) => rows.map((r) => ({
  ...r,
  namaFaskes: masterFaskes.find((f) => f.id === r.faskesId)?.namaFaskes || r.faskesId,
  kotama: masterFaskes.find((f) => f.id === r.faskesId)?.kotama || '-',
  tipeFaskes: masterFaskes.find((f) => f.id === r.faskesId)?.tipeFaskes || '-',
}));
