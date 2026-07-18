import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('student'); // Mock selector for testing
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if they were trying to access a protected page before logging in
  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Mocking the login process. We pass selectedRole just to test different permissions.
      await login(email, password, selectedRole);
      
      // Send them to the dashboard that matches their role
      if (selectedRole === 'admin') navigate('/admin');
      else if (selectedRole === 'teacher') navigate('/teacher');
      else navigate('/student');
      
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">System Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded focus:ring focus:ring-blue-300"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded focus:ring focus:ring-blue-300"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Test Role As:</label>
            <select 
              value={selectedRole} 
              onChange={(e) => setSelectedRole(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;