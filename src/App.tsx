import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Application Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Fallback component
const Unauthorized = () => (
  <div style={{ padding: '2rem', color: 'red', textAlign: 'center', fontWeight: 'bold' }}>
    403 - Unauthorized Access
  </div>
);

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <Router>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: '1' }}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* Protected Routes: ADMIN ONLY */}
                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                </Route>

                {/* Protected Routes: TEACHERS & ADMINS */}
                <Route element={<ProtectedRoute allowedRoles={['admin', 'teacher']} />}>
                  <Route path="/teacher" element={<TeacherDashboard />} />
                </Route>

                {/* Protected Routes: STUDENTS ONLY */}
                <Route element={<ProtectedRoute allowedRoles={['student']} />}>
                  <Route path="/student" element={<StudentDashboard />} />
                </Route>
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;