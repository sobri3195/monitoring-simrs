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

const App = () => (
  <AppLayout>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/master-faskes" element={<MasterFaskesPage />} />
      <Route path="/master-faskes/rsau" element={<MasterFaskesPage tipe="RSAU" />} />
      <Route path="/master-faskes/fktp" element={<MasterFaskesPage tipe="FKTP" />} />
      <Route path="/monitoring/simrs" element={<MonitoringPage jenisAplikasi="SIMRS" />} />
      <Route path="/monitoring/sim-klinik" element={<MonitoringPage jenisAplikasi="SIM Klinik" />} />
      <Route path="/integrasi" element={<IntegrasiPage />} />
      <Route path="/timeline" element={<TimelinePage />} />
      <Route path="/issues" element={<IssuesPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/faskes/:id" element={<FacilityDetailPage />} />
    </Routes>
  </AppLayout>
);

export default App;
