const BridgingIssuePanel = ({ issue, support }) => (
  <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm">
    <p><span className="font-semibold">Kendala Utama:</span> {issue}</p>
    <p className="mt-2"><span className="font-semibold">Kebutuhan Pendampingan:</span> {support}</p>
  </div>
);

export default BridgingIssuePanel;
