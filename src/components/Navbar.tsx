import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, language, changeLanguage, t } = useSettings();

  return (
    <nav className="elegant-nav glass-panel">
      <Link to="/" className="nav-brand">
        {t('systemName')}
      </Link>

      <div className="nav-links">
        <Link to="/" className="nav-item">{t('home')}</Link>
        {user?.role === 'admin' && <Link to="/admin" className="nav-item">{t('adminArea')}</Link>}
        {user?.role === 'teacher' && <Link to="/teacher" className="nav-item">{t('teacherArea')}</Link>}
        {user?.role === 'student' && <Link to="/student" className="nav-item">{t('myPortal')}</Link>}
      </div>

      <div className="settings-controls">
        <select 
          className="setting-select"
          value={language}
          onChange={(e) => changeLanguage(e.target.value as 'en' | 'ku' | 'ar')}
        >
          <option value="en">English</option>
          <option value="ku">کوردی (Sorani)</option>
          <option value="ar">العربية (Arabic)</option>
        </select>

        <button className="setting-select" onClick={toggleTheme} style={{ width: '40px' }}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        {user ? (
          <button onClick={logout} className="btn-primary" style={{ background: '#ef4444' }}>
            {t('logout')} ({user.role})
          </button>
        ) : (
          <Link to="/login" className="btn-primary">
            {t('login')}
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;