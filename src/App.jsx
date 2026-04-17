import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import DashboardPage from './pages/DashboardPage';
import MasterFaskesPage from './pages/MasterFaskesPage';
import MonitoringPage from './pages/MonitoringPage';
import IntegrasiPage from './pages/IntegrasiPage';
import TimelinePage from './pages/TimelinePage';
import IssuesPage from './pages/IssuesPage';
import ReportsPage from './pages/ReportsPage';
import UsersPage from './pages/UsersPage';
import SettingsPage from './pages/SettingsPage';
import FacilityDetailPage from './pages/FacilityDetailPage';
import DataInputPage from './pages/DataInputPage';
import BridgingSatusehatPage from './pages/BridgingSatusehatPage';
import BridgingSatusehatDetailPage from './pages/BridgingSatusehatDetailPage';
import PpraPage from './pages/PpraPage';
import PpraDetailPage from './pages/PpraDetailPage';
import InmIkpPage from './pages/InmIkpPage';
import InmIkpDetailPage from './pages/InmIkpDetailPage';
import SirsKompetensiPage from './pages/SirsKompetensiPage';
import SirsKompetensiDetailPage from './pages/SirsKompetensiDetailPage';
import KeuanganBulananPage from './pages/KeuanganBulananPage';
import KeuanganBulananDetailPage from './pages/KeuanganBulananDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import MonitoringKepatuhanPage from './pages/MonitoringKepatuhanPage';
import RsauComplianceDetailPage from './pages/RsauComplianceDetailPage';
import { useAppStore } from './store/useAppStore';
import { hasRoleAccess, isAdminPuskesau, isViewerPimpinan } from './utils/accessControl';
import { ADMIN_KOTAMA_ROLE, ADMIN_PUSKESAU_ROLE, OPERATOR_FASKES_ROLE, VIEWER_MONITORING_ROLE, VIEWER_PIMPINAN_ROLE } from './constants/appConstants';

const ProtectedRoute = ({ allow, children }) => (allow ? children : <Navigate to="/input-data" replace />);

const App = () => {
  const { currentUser } = useAppStore();
  const adminAccess = isAdminPuskesau(currentUser);
  const viewerAccess = isViewerPimpinan(currentUser);
  const canAccessDashboard = hasRoleAccess(currentUser, [ADMIN_PUSKESAU_ROLE, ADMIN_KOTAMA_ROLE, VIEWER_PIMPINAN_ROLE, VIEWER_MONITORING_ROLE]);
  const canAccessReviewArea = hasRoleAccess(currentUser, [ADMIN_PUSKESAU_ROLE, ADMIN_KOTAMA_ROLE]);
  const canAccessValidationArea = hasRoleAccess(currentUser, [ADMIN_PUSKESAU_ROLE]);
  const canAccessNationalModules = hasRoleAccess(currentUser, [ADMIN_PUSKESAU_ROLE, ADMIN_KOTAMA_ROLE, VIEWER_PIMPINAN_ROLE, VIEWER_MONITORING_ROLE]);
  const canInputReport = hasRoleAccess(currentUser, [OPERATOR_FASKES_ROLE, ADMIN_PUSKESAU_ROLE, ADMIN_KOTAMA_ROLE]);

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to={canAccessDashboard ? '/dashboard' : '/input-data'} replace />} />
        <Route path="/input-data" element={<ProtectedRoute allow={canInputReport}><DataInputPage /></ProtectedRoute>} />

        <Route path="/dashboard" element={<ProtectedRoute allow={canAccessDashboard}><DashboardPage /></ProtectedRoute>} />
        <Route path="/master-faskes" element={<ProtectedRoute allow={canAccessNationalModules && !viewerAccess}><MasterFaskesPage /></ProtectedRoute>} />
        <Route path="/master-faskes/rsau" element={<ProtectedRoute allow={canAccessNationalModules && !viewerAccess}><MasterFaskesPage tipe="RSAU" /></ProtectedRoute>} />
        <Route path="/master-faskes/fktp" element={<ProtectedRoute allow={canAccessNationalModules && !viewerAccess}><MasterFaskesPage tipe="FKTP" /></ProtectedRoute>} />
        <Route path="/monitoring/simrs" element={<ProtectedRoute allow={canAccessNationalModules}><MonitoringPage jenisAplikasi="SIMRS" /></ProtectedRoute>} />
        <Route path="/monitoring/sim-klinik" element={<ProtectedRoute allow={canAccessNationalModules}><MonitoringPage jenisAplikasi="SIM Klinik" /></ProtectedRoute>} />
        <Route path="/integrasi" element={<ProtectedRoute allow={canAccessValidationArea}><IntegrasiPage /></ProtectedRoute>} />
        <Route path="/timeline" element={<ProtectedRoute allow={canInputReport}><TimelinePage /></ProtectedRoute>} />
        <Route path="/issues" element={<ProtectedRoute allow={canAccessNationalModules}><IssuesPage /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute allow={canAccessReviewArea}><ReportsPage /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute allow={adminAccess}><UsersPage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute allow={adminAccess}><SettingsPage /></ProtectedRoute>} />
        <Route path="/faskes/:id" element={<ProtectedRoute allow={canAccessNationalModules}><FacilityDetailPage /></ProtectedRoute>} />

        <Route path="/bridging-satusehat" element={<ProtectedRoute allow={canAccessNationalModules}><BridgingSatusehatPage /></ProtectedRoute>} />
        <Route path="/bridging-satusehat/:id" element={<ProtectedRoute allow={canAccessNationalModules}><BridgingSatusehatDetailPage /></ProtectedRoute>} />
        <Route path="/ppra" element={<ProtectedRoute allow={canAccessNationalModules}><PpraPage /></ProtectedRoute>} />
        <Route path="/ppra/:id" element={<ProtectedRoute allow={canAccessNationalModules}><PpraDetailPage /></ProtectedRoute>} />
        <Route path="/inm-ikp" element={<ProtectedRoute allow={canAccessNationalModules}><InmIkpPage /></ProtectedRoute>} />
        <Route path="/inm-ikp/:id" element={<ProtectedRoute allow={canAccessNationalModules}><InmIkpDetailPage /></ProtectedRoute>} />
        <Route path="/sirs-kompetensi" element={<ProtectedRoute allow={canAccessNationalModules}><SirsKompetensiPage /></ProtectedRoute>} />
        <Route path="/sirs-kompetensi/:id" element={<ProtectedRoute allow={canAccessNationalModules}><SirsKompetensiDetailPage /></ProtectedRoute>} />
        <Route path="/keuangan-bulanan" element={<ProtectedRoute allow={canAccessNationalModules}><KeuanganBulananPage /></ProtectedRoute>} />
        <Route path="/keuangan-bulanan/:id" element={<ProtectedRoute allow={canAccessNationalModules}><KeuanganBulananDetailPage /></ProtectedRoute>} />

        <Route path="/monitoring-kepatuhan" element={<ProtectedRoute allow={canAccessNationalModules}><MonitoringKepatuhanPage /></ProtectedRoute>} />
        <Route path="/monitoring-kepatuhan/bridging" element={<ProtectedRoute allow={canAccessNationalModules}><MonitoringKepatuhanPage /></ProtectedRoute>} />
        <Route path="/monitoring-kepatuhan/ppra" element={<ProtectedRoute allow={canAccessNationalModules}><MonitoringKepatuhanPage /></ProtectedRoute>} />
        <Route path="/monitoring-kepatuhan/inm-ikp" element={<ProtectedRoute allow={canAccessNationalModules}><MonitoringKepatuhanPage /></ProtectedRoute>} />
        <Route path="/monitoring-kepatuhan/sirs-kompetensi" element={<ProtectedRoute allow={canAccessNationalModules}><MonitoringKepatuhanPage /></ProtectedRoute>} />
        <Route path="/monitoring-kepatuhan/keuangan" element={<ProtectedRoute allow={canAccessNationalModules}><MonitoringKepatuhanPage /></ProtectedRoute>} />
        <Route path="/monitoring-kepatuhan/rsau/:id" element={<ProtectedRoute allow={canAccessNationalModules}><RsauComplianceDetailPage /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppLayout>
  );
};

export default App;
