import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DB } from '../services/db';

const Navbar: React.FC = () => {
  const [theme, setTheme] = useState(DB.getTheme());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    DB.setTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <nav className="navbar">
      <h2>ZAS Tech SMS</h2>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/students">Students</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/attendance">Attendance</Link>
        <button className="btn" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;