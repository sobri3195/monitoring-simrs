export const WORKFLOW_STEPS = [
  'Draft',
  'Dikirim',
  'Direview',
  'Perlu Revisi',
  'Disetujui Kotama',
  'Tervalidasi Puskesau',
];

export const COMPLETION_STATUS = {
  LOW: { label: '0-40% (Perlu perhatian)', className: 'text-red-700 bg-red-100' },
  MEDIUM: { label: '41-70% (Proses)', className: 'text-amber-700 bg-amber-100' },
  HIGH: { label: '71-100% (Baik)', className: 'text-emerald-700 bg-emerald-100' },
};

export const getCompletionState = (percentage) => {
  if (percentage <= 40) return COMPLETION_STATUS.LOW;
  if (percentage <= 70) return COMPLETION_STATUS.MEDIUM;
  return COMPLETION_STATUS.HIGH;
};
