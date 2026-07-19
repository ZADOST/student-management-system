import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Import our pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard'; // <-- NEW IMPORT

// Mock components for the remaining dashboard
const Unauthorized = () => <div className="p-6 text-red-600 text-xl font-bold">403 - Unauthorized Access</div>;
const AdminDashboard = () => <div className="p-6 text-xl font-bold text-purple-700">Admin Dashboard - Full Access</div>;

// The Navigation Bar
const NavBar = () => {
  const { user, logout } = useAuth();
  
  return (
    <nav style={{ background: '#1f2937', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        {user?.role === 'admin' && <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>Admin Area</Link>}
        {user?.role === 'teacher' && <Link to="/teacher" style={{ color: 'white', textDecoration: 'none' }}>Teacher Area</Link>}
        {user?.role === 'student' && <Link to="/student" style={{ color: 'white', textDecoration: 'none' }}>My Portal</Link>}
      </div>
      <div>
        {user ? (
          <button onClick={logout} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
            Logout ({user.role})
          </button>
        ) : (
          <Link to="/login" style={{ background: '#3b82f6', color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '4px' }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <NavBar />
          <main>
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
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;