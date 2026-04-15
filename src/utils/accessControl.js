import { ADMIN_PUSKESAU_ROLE } from '../constants/appConstants';

export const isAdminPuskesau = (user) => user?.role === ADMIN_PUSKESAU_ROLE;
