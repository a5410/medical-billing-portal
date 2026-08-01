import { useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import EpisodePage from './pages/EpisodePage';
import BillingPage from './pages/BillingPage';
import InsurancePage from './pages/InsurancePage';
import MessagesPage from './pages/MessagesPage';
import DocumentsPage from './pages/DocumentsPage';
import SupportPage from './pages/SupportPage';
import { scenarios } from './data/portalData';

export default function App() {
  const [scenarioKey, setScenarioKey] = useState('normal');
  const scenario = useMemo(() => scenarios[scenarioKey], [scenarioKey]);

  return (
    <Layout scenarioKey={scenarioKey} setScenarioKey={setScenarioKey} scenario={scenario}>
      <Routes>
        <Route path="/" element={<DashboardPage scenario={scenario} />} />
        <Route path="/episode" element={<EpisodePage scenario={scenario} />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/billing/:categoryId" element={<BillingPage />} />
        <Route path="/billing/:categoryId/:itemId" element={<BillingPage />} />
        <Route path="/insurance" element={<InsurancePage scenario={scenario} />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
