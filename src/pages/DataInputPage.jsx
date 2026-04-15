import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { STATUS_IMPLEMENTASI } from '../constants/appConstants';

const DataInputPage = () => {
  const { facilities, updateFacility, currentUser } = useAppStore();
  const [payload, setPayload] = useState({
    facilityId: facilities[0]?.id ?? '',
    statusImplementasi: facilities[0]?.statusImplementasi ?? STATUS_IMPLEMENTASI[0],
    progressPersen: facilities[0]?.progressPersen ?? 0,
    isuUtama: facilities[0]?.isuUtama ?? '',
    kebutuhanPendampingan: facilities[0]?.kebutuhanPendampingan ?? '',
    targetGoLive: facilities[0]?.targetGoLive ?? '',
  });
  const [message, setMessage] = useState('');

  const onChange = (key, value) => {
    setPayload((prev) => ({ ...prev, [key]: value }));
  };

  const onFacilityChange = (facilityId) => {
    const selected = facilities.find((f) => f.id === facilityId);
    if (!selected) return;

    setPayload({
      facilityId: selected.id,
      statusImplementasi: selected.statusImplementasi,
      progressPersen: selected.progressPersen,
      isuUtama: selected.isuUtama,
      kebutuhanPendampingan: selected.kebutuhanPendampingan,
      targetGoLive: selected.targetGoLive,
    });
    setMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    updateFacility(payload.facilityId, {
      statusImplementasi: payload.statusImplementasi,
      progressPersen: Number(payload.progressPersen),
      isuUtama: payload.isuUtama,
      kebutuhanPendampingan: payload.kebutuhanPendampingan,
      targetGoLive: payload.targetGoLive,
    });

    setMessage('Data berhasil disimpan.');
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="text-lg font-semibold text-brand-900">Input Data Monitoring</h2>
        <p className="text-sm text-slate-600">
          Halaman ini dipakai untuk input/update data progres implementasi oleh role non-admin Puskesau.
        </p>
        <p className="mt-2 text-xs text-slate-500">Login sebagai: {currentUser.name} ({currentUser.role})</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-slate-600">Faskes</span>
          <select
            value={payload.facilityId}
            onChange={(event) => onFacilityChange(event.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2"
          >
            {facilities.map((facility) => (
              <option key={facility.id} value={facility.id}>{facility.namaFaskes}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-slate-600">Status Implementasi</span>
          <select
            value={payload.statusImplementasi}
            onChange={(event) => onChange('statusImplementasi', event.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2"
          >
            {STATUS_IMPLEMENTASI.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-slate-600">Progress (%)</span>
          <input
            type="number"
            min="0"
            max="100"
            value={payload.progressPersen}
            onChange={(event) => onChange('progressPersen', event.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-slate-600">Target Go-Live</span>
          <input
            type="date"
            value={payload.targetGoLive}
            onChange={(event) => onChange('targetGoLive', event.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm md:col-span-2">
          <span className="text-slate-600">Isu Utama</span>
          <textarea
            value={payload.isuUtama}
            onChange={(event) => onChange('isuUtama', event.target.value)}
            rows={3}
            className="rounded-md border border-slate-300 px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm md:col-span-2">
          <span className="text-slate-600">Kebutuhan Pendampingan</span>
          <textarea
            value={payload.kebutuhanPendampingan}
            onChange={(event) => onChange('kebutuhanPendampingan', event.target.value)}
            rows={3}
            className="rounded-md border border-slate-300 px-3 py-2"
          />
        </label>

        <div className="md:col-span-2">
          <button type="submit" className="rounded-lg bg-brand-700 px-4 py-2 text-sm text-white">Simpan Data</button>
          {message ? <p className="mt-2 text-sm text-emerald-600">{message}</p> : null}
        </div>
      </form>
    </div>
  );
};

export default DataInputPage;
