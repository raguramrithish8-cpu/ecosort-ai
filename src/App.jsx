import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { ToastProvider } from './components/Toast';
import { NotificationProvider } from './components/NotificationContext';

import DashboardPage from './pages/DashboardPage';
import DetectionPage from './pages/DetectionPage';
import ClassificationPage from './pages/ClassificationPage';
import RecoveryPage from './pages/RecoveryPage';
import CircularPage from './pages/CircularPage';
import AnalyticsPage from './pages/AnalyticsPage';
import IoTPage from './pages/IoTPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

const pages = {
  dashboard: DashboardPage,
  detection: DetectionPage,
  classification: ClassificationPage,
  recovery: RecoveryPage,
  circular: CircularPage,
  analytics: AnalyticsPage,
  iot: IoTPage,
  reports: ReportsPage,
  settings: SettingsPage,
};

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const PageComponent = pages[activePage] || DashboardPage;

  return (
    <ToastProvider>
      <NotificationProvider>
        <div className="app-layout">
          <Sidebar active={activePage} onNav={setActivePage} />
          <div className="main-content">
            <Header page={activePage} onNavigate={setActivePage} />
            <main className="page-content">
              <PageComponent />
            </main>
          </div>
        </div>
      </NotificationProvider>
    </ToastProvider>
  );
}
