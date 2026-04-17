import {
  ADMIN_KOTAMA_ROLE,
  ADMIN_PUSKESAU_ROLE,
  OPERATOR_FASKES_ROLE,
  VIEWER_PIMPINAN_ROLE,
  VIEWER_MONITORING_ROLE,
} from '../constants/appConstants';

export const isAdminPuskesau = (user) => user?.role === ADMIN_PUSKESAU_ROLE;
export const isAdminKotama = (user) => user?.role === ADMIN_KOTAMA_ROLE;
export const isOperatorFaskes = (user) => user?.role === OPERATOR_FASKES_ROLE;
export const isViewerPimpinan = (user) => user?.role === VIEWER_PIMPINAN_ROLE || user?.role === VIEWER_MONITORING_ROLE;

export const hasRoleAccess = (user, allowedRoles = []) => allowedRoles.includes(user?.role);
