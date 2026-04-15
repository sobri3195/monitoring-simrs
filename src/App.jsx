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
import { useAppStore } from './store/useAppStore';
import { isAdminPuskesau } from './utils/accessControl';

const ProtectedRoute = ({ allow, children }) => (allow ? children : <Navigate to="/input-data" replace />);

const App = () => {
  const { currentUser } = useAppStore();
  const adminAccess = isAdminPuskesau(currentUser);

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to={adminAccess ? '/dashboard' : '/input-data'} replace />} />
        <Route path="/input-data" element={<DataInputPage />} />

        <Route path="/dashboard" element={<ProtectedRoute allow={adminAccess}><DashboardPage /></ProtectedRoute>} />
        <Route path="/master-faskes" element={<ProtectedRoute allow={adminAccess}><MasterFaskesPage /></ProtectedRoute>} />
        <Route path="/master-faskes/rsau" element={<ProtectedRoute allow={adminAccess}><MasterFaskesPage tipe="RSAU" /></ProtectedRoute>} />
        <Route path="/master-faskes/fktp" element={<ProtectedRoute allow={adminAccess}><MasterFaskesPage tipe="FKTP" /></ProtectedRoute>} />
        <Route path="/monitoring/simrs" element={<ProtectedRoute allow={adminAccess}><MonitoringPage jenisAplikasi="SIMRS" /></ProtectedRoute>} />
        <Route path="/monitoring/sim-klinik" element={<ProtectedRoute allow={adminAccess}><MonitoringPage jenisAplikasi="SIM Klinik" /></ProtectedRoute>} />
        <Route path="/integrasi" element={<ProtectedRoute allow={adminAccess}><IntegrasiPage /></ProtectedRoute>} />
        <Route path="/timeline" element={<ProtectedRoute allow={adminAccess}><TimelinePage /></ProtectedRoute>} />
        <Route path="/issues" element={<ProtectedRoute allow={adminAccess}><IssuesPage /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute allow={adminAccess}><ReportsPage /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute allow={adminAccess}><UsersPage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute allow={adminAccess}><SettingsPage /></ProtectedRoute>} />
        <Route path="/faskes/:id" element={<ProtectedRoute allow={adminAccess}><FacilityDetailPage /></ProtectedRoute>} />

        <Route path="/bridging-satusehat" element={<ProtectedRoute allow={adminAccess}><BridgingSatusehatPage /></ProtectedRoute>} />
        <Route path="/bridging-satusehat/:id" element={<ProtectedRoute allow={adminAccess}><BridgingSatusehatDetailPage /></ProtectedRoute>} />
        <Route path="/ppra" element={<ProtectedRoute allow={adminAccess}><PpraPage /></ProtectedRoute>} />
        <Route path="/ppra/:id" element={<ProtectedRoute allow={adminAccess}><PpraDetailPage /></ProtectedRoute>} />
        <Route path="/inm-ikp" element={<ProtectedRoute allow={adminAccess}><InmIkpPage /></ProtectedRoute>} />
        <Route path="/inm-ikp/:id" element={<ProtectedRoute allow={adminAccess}><InmIkpDetailPage /></ProtectedRoute>} />
        <Route path="/sirs-kompetensi" element={<ProtectedRoute allow={adminAccess}><SirsKompetensiPage /></ProtectedRoute>} />
        <Route path="/sirs-kompetensi/:id" element={<ProtectedRoute allow={adminAccess}><SirsKompetensiDetailPage /></ProtectedRoute>} />
        <Route path="/keuangan-bulanan" element={<ProtectedRoute allow={adminAccess}><KeuanganBulananPage /></ProtectedRoute>} />
        <Route path="/keuangan-bulanan/:id" element={<ProtectedRoute allow={adminAccess}><KeuanganBulananDetailPage /></ProtectedRoute>} />
      </Routes>
    </AppLayout>
  );
};

export default App;
