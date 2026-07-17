import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import { ToastProvider } from './components/ToastProvider';
import { WorkspaceProvider } from './features/workspace/WorkspaceContext';
import PortalPage from './pages/PortalPage';
import DashboardPage from './pages/DashboardPage';
import MarketingPage from './pages/MarketingPage';
import KnowledgePage from './pages/KnowledgePage';
import EventsPage from './pages/EventsPage';
import AINotificationReportPage from './pages/AINotificationReportPage';

export default function App() {
  return (
    <ToastProvider>
      <WorkspaceProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<PortalPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="marketing" element={<MarketingPage />} />
            <Route path="knowledge" element={<KnowledgePage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="ai-notifications/:reportId" element={<AINotificationReportPage />} />
          </Route>
        </Routes>
      </WorkspaceProvider>
    </ToastProvider>
  );
}
