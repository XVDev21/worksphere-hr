/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { LandingPage } from './pages/LandingPage';
import { About } from './pages/About';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import { DashboardLayout } from './components/DashboardLayout';
import { DashboardOverview } from './pages/DashboardOverview';
import { EmployeeManagement } from './pages/EmployeeManagement';
import { PayrollSystem } from './pages/PayrollSystem';
import { AttendanceManagement } from './pages/AttendanceManagement';
import { LeaveManagement } from './pages/LeaveManagement';
import { DepartmentManagement } from './pages/DepartmentManagement';
import { ReportsAnalytics } from './pages/ReportsAnalytics';
import { AIFeatures } from './pages/AIFeatures';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppProvider>
          <Router>
            <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <DashboardOverview />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/employees" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <EmployeeManagement />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/dashboard/departments" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <DepartmentManagement />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/dashboard/payroll" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <PayrollSystem />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/dashboard/attendance" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AttendanceManagement />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/dashboard/leaves" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <LeaveManagement />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/dashboard/reports" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ReportsAnalytics />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/dashboard/ai" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AIFeatures />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AppProvider>
    </ThemeProvider>
  </AuthProvider>
);
}

