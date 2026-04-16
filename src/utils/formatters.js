import { STATUS_COLOR_MAP, WORKFLOW_STATUS_COLOR_MAP } from '../constants/appConstants';

export const formatDate = (value) => {
  if (!value) return '-';
  return new Date(value).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const formatPercent = (value) => `${Number(value || 0).toFixed(0)}%`;

export const statusClass = (status) => WORKFLOW_STATUS_COLOR_MAP[status] || STATUS_COLOR_MAP[status] || 'bg-slate-100 text-slate-700';

export const toTitleCase = (text) =>
  text
    ? text
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : '';
