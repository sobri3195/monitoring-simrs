const ReviewerNotesCard = ({ reviewerNotes, validatorNotes }) => (
  <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <h3 className="text-sm font-semibold text-slate-700">Catatan Review & Validasi</h3>
    <div className="mt-3 space-y-3 text-sm">
      <div className="rounded-lg bg-slate-50 p-3">
        <p className="mb-1 text-xs font-semibold uppercase text-slate-500">Reviewer Kotama</p>
        <p className="text-slate-700">{reviewerNotes || 'Belum ada catatan review.'}</p>
      </div>
      <div className="rounded-lg bg-slate-50 p-3">
        <p className="mb-1 text-xs font-semibold uppercase text-slate-500">Validator Puskesau</p>
        <p className="text-slate-700">{validatorNotes || 'Belum ada catatan validasi.'}</p>
      </div>
    </div>
  </section>
);

export default ReviewerNotesCard;
