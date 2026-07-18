import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentList from './pages/StudentList';

// Placeholder for other pages
const Dashboard = () => <div className="p-6 text-xl">System Dashboard Overview</div>;
const NotFound = () => <div className="p-6 text-xl text-red-500">404 - Page Not Found</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        {/* Main Navigation */}
        <nav className="bg-white shadow-md p-4">
          <div className="max-w-6xl mx-auto flex gap-6 font-semibold">
            <Link to="/" className="text-blue-600 hover:text-blue-800">Dashboard</Link>
            <Link to="/students" className="text-blue-600 hover:text-blue-800">Students</Link>
          </div>
        </nav>

        {/* Route Configuration */}
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;