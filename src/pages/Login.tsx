import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('student');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Small artificial delay to show the button animation/state
      await new Promise(resolve => setTimeout(resolve, 800));
      
      await login(email, password, selectedRole);
      
      if (selectedRole === 'admin') navigate('/admin');
      else if (selectedRole === 'teacher') navigate('/teacher');
      else navigate('/student');
      
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to the Student Management System</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Academic Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              placeholder="e.g., student@university.edu.iq"
              required 
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              placeholder="Enter your secure password"
              required 
            />
          </div>

          <div className="input-group">
            <label>System Role (Test Mode)</label>
            <select 
              value={selectedRole} 
              onChange={(e) => setSelectedRole(e.target.value)}
              className="login-input"
            >
              <option value="student">Student Access</option>
              <option value="teacher">Faculty Access</option>
              <option value="admin">Administrator Access</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="login-btn-animated"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Authenticating...' : 'Sign In securely'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;