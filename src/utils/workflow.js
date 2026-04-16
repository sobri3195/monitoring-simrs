import { WORKFLOW_STATUS_COLOR_MAP, WORKFLOW_TRANSITION_RULES } from '../constants/appConstants';

export const normalizeWorkflowStatus = (status) => {
  if (!status) return 'Draft';
  if (status === 'Lengkap') return 'Tervalidasi Puskesau';
  return status;
};

export const getWorkflowStatusClass = (status) => {
  const normalized = normalizeWorkflowStatus(status);
  return WORKFLOW_STATUS_COLOR_MAP[normalized] || 'bg-slate-100 text-slate-700';
};

export const getAllowedTransitions = (status) => {
  const normalized = normalizeWorkflowStatus(status);
  return WORKFLOW_TRANSITION_RULES[normalized] || [];
};

export const canTransitionTo = (fromStatus, toStatus) => getAllowedTransitions(fromStatus).includes(toStatus);
