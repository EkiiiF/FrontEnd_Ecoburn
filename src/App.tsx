import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';
import MemberManagement from './components/pages/MemberManagement';
import BurningHistory from './components/pages/BurningHistory';
import Reports from './components/pages/Reports';
import MaintenanceLog from './components/pages/MaintenanceLog';
import Layout from './components/Layout';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <Layout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/members" element={<MemberManagement />} />
                  <Route path="/burning-history" element={<BurningHistory />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/maintenance" element={<MaintenanceLog />} />
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}
