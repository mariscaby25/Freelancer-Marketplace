import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MessageProvider } from './context/MessageContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NavSidebar from './components/NavSidebar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

import ClientDashboard from './pages/client/ClientDashboard';
import PostJob from './pages/client/PostJob';
import MyJobs from './pages/client/MyJobs';
import ClientJobDetails from './pages/client/JobDetails';
import ViewApplications from './pages/client/ViewApplications';
import ClientProfile from './pages/client/ClientProfile';

import FreelancerDashboard from './pages/freelancer/FreelancerDashboard';
import FreelancerProfile from './pages/freelancer/FreelancerProfile';
import BrowseJobs from './pages/freelancer/BrowseJobs';
import BrowseFreelancers from './pages/freelancer/BrowseFreelancers';
import BrowseClients from './pages/freelancer/BrowseClients';
import FreelancerJobDetails from './pages/freelancer/JobDetails';
import ApplyJob from './pages/freelancer/ApplyJob';
import MyApplications from './pages/freelancer/MyApplications';
import ApplicationTracker from './pages/freelancer/ApplicationTracker';

import MessagesPage from './pages/messages/MessagesPage';

import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageJobs from './pages/admin/ManageJobs';
import ManageApplications from './pages/admin/ManageApplications';
import ManageFields from './pages/admin/ManageFields';
import Reports from './pages/admin/Reports';

function AppContent() {
  const { user } = useAuth();
  const showSidebar = user && (user.role === 'client' || user.role === 'freelancer');

  return (
    <>
      <Navbar />
      <div className="app-shell">
        {showSidebar && <NavSidebar />}
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/freelancer/browse-jobs" element={<BrowseJobs />} />
            <Route path="/freelancer/jobs/:id" element={<FreelancerJobDetails />} />
            <Route path="/freelancers" element={<BrowseFreelancers />} />
            <Route path="/clients" element={<BrowseClients />} />

            <Route path="/client/dashboard" element={<ProtectedRoute roles={['client']}><ClientDashboard /></ProtectedRoute>} />
            <Route path="/client/post-job" element={<ProtectedRoute roles={['client']}><PostJob /></ProtectedRoute>} />
            <Route path="/client/my-jobs" element={<ProtectedRoute roles={['client']}><MyJobs /></ProtectedRoute>} />
            <Route path="/client/jobs/:id" element={<ProtectedRoute roles={['client']}><ClientJobDetails /></ProtectedRoute>} />
            <Route path="/client/jobs/:id/applications" element={<ProtectedRoute roles={['client']}><ViewApplications /></ProtectedRoute>} />
            <Route path="/client/profile" element={<ProtectedRoute roles={['client']}><ClientProfile /></ProtectedRoute>} />

            <Route path="/freelancer/dashboard" element={<ProtectedRoute roles={['freelancer']}><FreelancerDashboard /></ProtectedRoute>} />
            <Route path="/freelancer/profile" element={<ProtectedRoute roles={['freelancer']}><FreelancerProfile /></ProtectedRoute>} />
            <Route path="/freelancer/jobs/:id/apply" element={<ProtectedRoute roles={['freelancer']}><ApplyJob /></ProtectedRoute>} />
            <Route path="/freelancer/my-applications" element={<ProtectedRoute roles={['freelancer']}><MyApplications /></ProtectedRoute>} />
            <Route path="/freelancer/application-tracker" element={<ProtectedRoute roles={['freelancer']}><ApplicationTracker /></ProtectedRoute>} />

            <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
            <Route path="/messages/:userId" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />

            <Route path="/admin/dashboard" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute roles={['admin']}><ManageUsers /></ProtectedRoute>} />
            <Route path="/admin/jobs" element={<ProtectedRoute roles={['admin']}><ManageJobs /></ProtectedRoute>} />
            <Route path="/admin/applications" element={<ProtectedRoute roles={['admin']}><ManageApplications /></ProtectedRoute>} />
            <Route path="/admin/fields" element={<ProtectedRoute roles={['admin']}><ManageFields /></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute roles={['admin']}><Reports /></ProtectedRoute>} />

            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MessageProvider>
          <AppContent />
        </MessageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}