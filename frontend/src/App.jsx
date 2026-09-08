import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MessageProvider } from './context/MessageContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

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
import FreelancerJobDetails from './pages/freelancer/JobDetails';
import ApplyJob from './pages/freelancer/ApplyJob';
import MyApplications from './pages/freelancer/MyApplications';
import ApplicationTracker from './pages/freelancer/ApplicationTracker';

import Messages from './pages/messages/Messages';
import Chat from './pages/messages/Chat';

import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageJobs from './pages/admin/ManageJobs';
import ManageApplications from './pages/admin/ManageApplications';
import Reports from './pages/admin/Reports';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MessageProvider>
          <Navbar />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/freelancer/browse-jobs" element={<BrowseJobs />} />
              <Route path="/freelancer/jobs/:id" element={<FreelancerJobDetails />} />
              <Route path="/freelancers" element={<BrowseFreelancers />} />

              {/* Client routes */}
              <Route path="/client/dashboard" element={<ProtectedRoute roles={['client']}><ClientDashboard /></ProtectedRoute>} />
              <Route path="/client/post-job" element={<ProtectedRoute roles={['client']}><PostJob /></ProtectedRoute>} />
              <Route path="/client/my-jobs" element={<ProtectedRoute roles={['client']}><MyJobs /></ProtectedRoute>} />
              <Route path="/client/jobs/:id" element={<ProtectedRoute roles={['client']}><ClientJobDetails /></ProtectedRoute>} />
              <Route path="/client/jobs/:id/applications" element={<ProtectedRoute roles={['client']}><ViewApplications /></ProtectedRoute>} />
              <Route path="/client/profile" element={<ProtectedRoute roles={['client']}><ClientProfile /></ProtectedRoute>} />

              {/* Freelancer routes */}
              <Route path="/freelancer/dashboard" element={<ProtectedRoute roles={['freelancer']}><FreelancerDashboard /></ProtectedRoute>} />
              <Route path="/freelancer/profile" element={<ProtectedRoute roles={['freelancer']}><FreelancerProfile /></ProtectedRoute>} />
              <Route path="/freelancer/jobs/:id/apply" element={<ProtectedRoute roles={['freelancer']}><ApplyJob /></ProtectedRoute>} />
              <Route path="/freelancer/my-applications" element={<ProtectedRoute roles={['freelancer']}><MyApplications /></ProtectedRoute>} />
              <Route path="/freelancer/application-tracker" element={<ProtectedRoute roles={['freelancer']}><ApplicationTracker /></ProtectedRoute>} />

              {/* Messaging (any authenticated user) */}
              <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
              <Route path="/messages/:userId" element={<ProtectedRoute><Chat /></ProtectedRoute>} />

              {/* Admin routes */}
              <Route path="/admin/dashboard" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute roles={['admin']}><ManageUsers /></ProtectedRoute>} />
              <Route path="/admin/jobs" element={<ProtectedRoute roles={['admin']}><ManageJobs /></ProtectedRoute>} />
              <Route path="/admin/applications" element={<ProtectedRoute roles={['admin']}><ManageApplications /></ProtectedRoute>} />
              <Route path="/admin/reports" element={<ProtectedRoute roles={['admin']}><Reports /></ProtectedRoute>} />

              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </MessageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}