import { useMemo, useState } from 'react';
import { useAppStore } from '../store/useAppStore';

const SettingsPage = () => {
  const { resetAppData, exportAppData, importAppData } = useAppStore();
  const [rawImport, setRawImport] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [copied, setCopied] = useState(false);

  const draftCount = useMemo(
    () => Object.keys(localStorage).filter((key) => key.startsWith('draft:')).length,
    [feedback],
  );

  const handleExport = async () => {
    try {
      await navigator.clipboard.writeText(exportAppData());
      setCopied(true);
      setFeedback({ type: 'success', message: 'Data berhasil diekspor ke clipboard.' });
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setFeedback({ type: 'error', message: 'Clipboard tidak tersedia. Silakan salin manual dari console.' });
      console.log(exportAppData());
    }
  };

  const handleImport = () => {
    const result = importAppData(rawImport);
    if (result.ok) {
      setFeedback({ type: 'success', message: 'Data berhasil diimpor.' });
      setRawImport('');
      return;
    }
    setFeedback({ type: 'error', message: result.message || 'Impor gagal.' });
  };

  const handleClearDraft = () => {
    const keys = Object.keys(localStorage).filter((key) => key.startsWith('draft:'));
    keys.forEach((key) => localStorage.removeItem(key));
    setFeedback({ type: 'success', message: `${keys.length} draft lokal berhasil dihapus.` });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="text-lg font-semibold text-brand-900">Pengaturan Data Aplikasi</h2>
        <p className="mt-2 text-sm text-slate-600">
          Kelola backup/restore data demo serta pembersihan draft lokal agar alur pelaporan tetap rapi.
        </p>
      </div>

      <section className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase text-slate-500">Backup</p>
          <p className="mt-1 text-sm text-slate-700">Ekspor seluruh state aplikasi ke clipboard.</p>
          <button className="mt-3 rounded-md bg-brand-700 px-3 py-2 text-sm text-white" onClick={handleExport}>
            {copied ? 'Tersalin' : 'Ekspor Data'}
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase text-slate-500">Draft Lokal</p>
          <p className="mt-1 text-sm text-slate-700">Draft tersimpan: <span className="font-semibold">{draftCount}</span></p>
          <button className="mt-3 rounded-md bg-amber-600 px-3 py-2 text-sm text-white" onClick={handleClearDraft}>
            Hapus Semua Draft
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase text-slate-500">Reset</p>
          <p className="mt-1 text-sm text-slate-700">Kembalikan seluruh data ke seed bawaan aplikasi.</p>
          <button className="mt-3 rounded-md bg-red-700 px-3 py-2 text-sm text-white" onClick={resetAppData}>
            Reset Data Aplikasi
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-700">Impor Data (JSON)</h3>
        <textarea
          rows={8}
          className="mt-2 w-full rounded-md border px-3 py-2 font-mono text-xs"
          value={rawImport}
          onChange={(e) => setRawImport(e.target.value)}
          placeholder="Tempel JSON hasil ekspor di sini..."
        />
        <button className="mt-3 rounded-md bg-emerald-700 px-3 py-2 text-sm text-white" onClick={handleImport}>
          Impor Data
        </button>
      </section>

      {feedback.message ? (
        <p className={`text-sm ${feedback.type === 'error' ? 'text-red-700' : 'text-emerald-700'}`}>{feedback.message}</p>
      ) : null}
    </div>
  );
};

export default SettingsPage;
