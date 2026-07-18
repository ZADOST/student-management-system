import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';

// Mock components for demonstration
const Unauthorized = () => <div className="p-6 text-red-600 text-xl font-bold">403 - Unauthorized Access</div>;
import StaticStudentList from './pages/StaticStudentList';
const PublicHome = () => <StaticStudentList />;
const AdminDashboard = () => <div className="p-6 text-xl font-bold text-purple-700">Admin Dashboard - Full Access</div>;
const TeacherDashboard = () => <div className="p-6 text-xl font-bold text-green-700">Teacher Dashboard - Gradebook Access</div>;
const StudentDashboard = () => <div className="p-6 text-xl font-bold text-blue-700">Student Dashboard - View Only</div>;

// A small navbar component to show conditional rendering based on auth state
const NavBar = () => {
  const { user, logout } = useAuth();
  
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="flex gap-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        {user?.role === 'admin' && <Link to="/admin" className="hover:text-gray-300">Admin Area</Link>}
        {user?.role === 'teacher' && <Link to="/teacher" className="hover:text-gray-300">Teacher Area</Link>}
        {user?.role === 'student' && <Link to="/student" className="hover:text-gray-300">My Portal</Link>}
      </div>
      <div>
        {user ? (
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout ({user.role})</button>
        ) : (
          <Link to="/login" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">Login</Link>
        )}
      </div>
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <NavBar />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<PublicHome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Protected Routes: ADMIN ONLY */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin" element={<AdminDashboard />} />
                {/* Add more admin routes here (e.g., /admin/settings) */}
              </Route>

              {/* Protected Routes: TEACHERS & ADMINS */}
              <Route element={<ProtectedRoute allowedRoles={['admin', 'teacher']} />}>
                <Route path="/teacher" element={<TeacherDashboard />} />
                {/* Teachers and admins can both access gradebooks, for example */}
              </Route>

              {/* Protected Routes: STUDENTS ONLY */}
              <Route element={<ProtectedRoute allowedRoles={['student']} />}>
                <Route path="/student" element={<StudentDashboard />} />
                {/* Add more student routes here (e.g., /student/schedule) */}
              </Route>
              
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;