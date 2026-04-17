const ValidationNotesCard = ({ notes }) => (
  <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <h3 className="text-sm font-semibold text-slate-700">Catatan Validator</h3>
    <p className="mt-2 text-sm text-slate-700">{notes || 'Belum ada catatan validator.'}</p>
  </section>
);

export default ValidationNotesCard;
