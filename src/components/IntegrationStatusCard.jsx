const Item = ({ name, value }) => (
  <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
    <span className="text-sm text-slate-600">{name}</span>
    <span className="text-sm font-semibold text-brand-700">{value}</span>
  </div>
);

const IntegrationStatusCard = ({ facility }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4">
    <div className="mb-3 space-y-1">
      <h3 className="text-base font-semibold text-brand-900">Status Integrasi</h3>
      <p className="text-sm font-medium text-slate-800">{facility.namaFaskes}</p>
      <p className="text-xs text-slate-500">
        {facility.jenisAplikasi} · {facility.tipeFaskes}
      </p>
    </div>
    <div className="space-y-2">
      <Item name="SATUSEHAT" value={facility.integrasiSatusehat} />
      <Item name="BPJS / PCare" value={facility.integrasiBPJS} />
      <Item name="LIS" value={facility.integrasiLIS} />
      <Item name="RIS/PACS" value={facility.integrasiRISPACS} />
      <Item name="Antrian" value={facility.integrasiAntrian} />
    </div>
  </div>
);

export default IntegrationStatusCard;
