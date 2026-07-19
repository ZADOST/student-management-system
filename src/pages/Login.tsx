import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('student');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const { t } = useSettings();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
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
          <h2>{t('welcomeBack')}</h2>
          <p>{t('signInTo')}</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>{t('academicEmail')}</label>
            {/* Force LTR direction for typing English emails */}
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              dir="ltr"
              style={{ textAlign: 'start' }}
              placeholder="student@university.edu.iq"
              required 
            />
          </div>

          <div className="input-group">
            <label>{t('password')}</label>
            {/* Force LTR direction for typing passwords */}
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              dir="ltr"
              style={{ textAlign: 'start' }}
              required 
            />
          </div>

          <div className="input-group">
            <label>{t('testRole')}</label>
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
            {isSubmitting ? t('authenticating') : t('signInSecurely')}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;