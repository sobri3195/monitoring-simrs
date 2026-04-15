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
      </Routes>
    </AppLayout>
  );
};

export default App;
